/*
 * 与server 交互相关函数入口
 * */
//localStorage

(function($, owner) {
	var BaseURL= "http://121.42.10.15:8080/jelly_server/";
	var serURL = BaseURL + "doserver.php"; 
	var serImgURL = BaseURL + "doimg.php";
	var serHeadURL = BaseURL + "doHead.php";
	var serSMSURL = BaseURL + "SMSVerify.php";//短信url
	//var payURL= BaseURL + "pingpp/server/example/pay.php";//支付url
	var toPay = BaseURL + "topay.php";//支付url
	var nwaiting = null;
	var mask = mui.createMask(owner.OnMaskClose); //callback为用户点击蒙版时自动执行的回调；
	//var loginMask = mui.createMask(owner.OnmaskClose);

	owner.OnMaskClose = function() {
		if (nwaiting != null) {
			nwaiting.close();
			mask.close();
			nwaiting = null;
			return true; 
		} else
			return false;
	};
	/*
	 * 向服务器请求一个数据，使用post传递
	 * json，要请求的字符串 如果是json类型，用JSON.stringify（）转换
	 * isShowWait：是否显示等待框
	 * isShowMask:是否显示蒙板背景
	 * callback：回调函数，带一个参数（返回的json数据）
	 */
	owner.OnDoPostServerJson = function(json, isShowWait, isShowMask, callback) {
		jsonsrt = JSON.stringify(json);
//		console.log(jsonsrt);
		if (isShowWait) {
			if(nwaiting == null)
			{
				nwaiting = plus.nativeUI.showWaiting("加载中..."); //显示原生等待框
				if (isShowMask) {
					mask.show(); //显示遮罩	
				}
			}

		} else {
			nwaiting = null;
		}
		//ajax
		mui.ajax(serURL, {
			data: {
				jsons: jsonsrt
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为60秒；
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				if (isShowWait && nwaiting != null) {
					nwaiting.close();
					mask.close(); //显示遮罩
				}
				callback(data);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				if (isShowWait && nwaiting != null) {
					nwaiting.close();
					mask.close(); //显示遮罩
				}
//				plus.nativeUI.toast(type);
				plus.nativeUI.toast("网络连接失败，请检查网络");
			}
		});
	};

	
	//图片接口
	owner.OnDoPostServerJsonImg = function(json,imgs, isShowWait, isShowMask, callback) {
		jsonsrt = JSON.stringify(json);

		if (isShowWait) { 
			nwaiting = plus.nativeUI.showWaiting("加载中..."); //显示原生等待框	
			if (isShowMask) {
				mask.show(); //显示遮罩	
			}
		} else {
			nwaiting = null;
		}

		//ajax
		mui.ajax(serImgURL, {
			data: {
				jsons: jsonsrt,
				img0:imgs[0],
				img1:imgs[1],
				img2:imgs[2],
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为60秒；
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				if (isShowWait) {
					nwaiting.close();
					mask.close(); //显示遮罩
				}
				callback(data);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//console.log(type);
				if (isShowWait) {
					nwaiting.close();
					mask.close(); //显示遮罩
				}
				//plus.nativeUI.toast(type);
				plus.nativeUI.toast("网络连接失败，请检查网络");
			}
		});
	};
	
	//头像接口
	owner.OnDoPostServerJsonHead = function(json,img,isShowWait, isShowMask, callback) {
		jsonsrt = JSON.stringify(json);

		if (isShowWait) { 
			nwaiting = plus.nativeUI.showWaiting("加载中..."); //显示原生等待框	
			if (isShowMask) {
				mask.show(); //显示遮罩
			}
		} else {
			nwaiting = null;
		}

		//ajax
		mui.ajax(serHeadURL, {
			data: {
				jsons: jsonsrt,
				img:img
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 20000, //超时时间设置为60秒；
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				if (isShowWait) {
					nwaiting.close();
					mask.close(); //显示遮罩
				}
				callback(data);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//console.log(type);
				if (isShowWait) {
					nwaiting.close();
					mask.close(); //显示遮罩
				}
				//plus.nativeUI.toast(type);
				plus.nativeUI.toast("连接超时，请检查网络");
			}
		});
	};
	
	/*
	 * 向服务器请求支付订单
	 * money支付的钱
	 * payType 打开支付方式类型，目前只支持支付宝 type：1
	 * callback：回调函数，带一个参数（订单数据  最后32位为订单id,前面的是订单信息）
	 */
	owner.OnDoPostServerJsonToPay = function(json,callback) {
		jsonsrt = JSON.stringify(json);
		//ajax
		mui.ajax(toPay, {
			data: {
				jsons: jsonsrt
			},
			dataType: 'text', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为60秒；
			success: function(data) {
				callback(data);
			},
			error: function(xhr, type, errorThrown) {
				plus.nativeUI.toast("网络连接失败，请检查网络");
				//plus.nativeUI.toast(type);
			}
		});
	};
	
	/*
	 * 短信验证请求，使用post传递
	 * phone，要请求验证的手机号
	 * callback：回调函数，带一个参数（返回的json数据）
	 */
	owner.OnDoPostServerJsonSMS = function(phone, callback) {
		var smsInfo = {
			to: phone
		}
		jsonsrt = JSON.stringify(smsInfo);

		//ajax
		mui.ajax(serSMSURL, {
			data: {
				jsons: jsonsrt
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为60秒；
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否成功；
				callback(data);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//plus.nativeUI.toast(type);
				plus.nativeUI.toast("网络连接失败，请检查网络");
			}
		});
	};
	
	/*
	 * 短信验证请求，使用post传递
	 * phone，要请求验证的手机号
	 * callback：回调函数，带一个参数（返回的json数据）
	 */
	owner.OnDoPostJsonSMS = function(phone, callback) {
		var smsInfo = {
			appid: "11281",
			to: phone,
			project: "1AYvV4",
			signature:"80826ef5a9e86bd445e6ffb796173459"
		}
		

		//ajax
		mui.ajax("https://api.submail.cn/message/xsend.json", {
			data: {
				jsons: smsInfo
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为60秒；
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否成功；
				callback(data);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//plus.nativeUI.toast(type);
				plus.nativeUI.toast("网络出错");
			}
		});
	};
	
	/*
	 * 支付接口
	 * amount:总额（单位角）
	 * type：类型（1：约课，2:特殊课程，3：资料购买）
	 * id（type类型：1：subject_tab中id，2：special_tab中id，3：learn_materials_tab中id）
	 */
//	owner.OnPay = function(amount,type,id) {
//		pingpp_one.init({
//			app_id: 'pk_test_Wj540C0GuPaH8qjrr9SC0CyL', //该应用在 ping++ 的应用 ID
//			order_no: 'no1234567890', //订单在商户系统中的订单号
//			amount: amount, //订单价格，单位：人民币 分
//			// 壹收款页面上需要展示的渠道，数组，数组顺序即页面展示出的渠道的顺序
//			// upmp_wap 渠道在微信内部无法使用，若用户未安装银联手机支付控件，则无法调起支付
//			channel: ['alipay_wap', 'wx_pub', 'upacp_wap', 'yeepay_wap', 'jdpay_wap', 'bfb_wap'],
//			charge_url: payURL, //商户服务端创建订单的 url
//			charge_param: {
//				type: type,
//				id: id
//			}, //(可选，用户自定义参数，若存在自定义参数则壹收款会通过 POST 方法透传给 charge_url)
//			open_id: 'wx1234567890', //(可选，使用微信公众号支付时必须传入)
//			debug: true //(可选，debug 模式下会将 charge_url 的返回结果透传回来)
//		}, function(res) {
//			//debug 模式下获取 charge_url 的返回结果
//			if (res.debug && res.chargeUrlOutput) {
//				console.log(res.chargeUrlOutput);
//			}
//			if (!res.status) {
//				//处理错误
//				alert(res.msg);
//			} else {
//				//debug 模式下调用 charge_url 后会暂停，可以调用 pingpp_one.resume 方法继续执行
//				if (res.debug && !res.wxSuccess) {
//					if (confirm('当前为 debug 模式，是否继续支付？')) {
//						pingpp_one.resume();
//					}
//				}
//				//若微信公众号渠道需要使用壹收款的支付成功页面，则在这里进行成功回调，
//				//调用 pingpp_one.success 方法，你也可以自己定义回调函数
//				//其他渠道的处理方法请见第 2 节
//				else pingpp_one.success(function(res) {
//					if (!res.status) {
//						alert(res.msg);
//					}
//				}, function() {
//					//这里处理支付成功页面点击“继续购物”按钮触发的方法，
//					//例如：若你需要点击“继续购物”按钮跳转到你的购买页，
//					//则在该方法内写入 window.location.href = "你的购买页面 url"
//					window.location.href = 'login.html'; //示例
//				});
//			}
//		});
//	};
	
	//获取用户信息
		owner.GetUserInfo = function(){
			return JSON.parse(localStorage.getItem("userInfo"));
		};
		//修改用户信息
		owner.SetUserInfo = function(key, value){
			var info = this.GetUserInfo();
			info[key] = value;
			localStorage.setItem("userInfo", JSON.stringify(info));
		};
		
		//刷新页面  参数页面的id 
		owner.UpdateWebView = function(webID)
		{
			var opener =plus.webview.getWebviewById(webID);// plus.webview.currentWebview().opener();
//				var opener = mui.currentWebview.opener();
			if(opener == null)
			{
				mui.alert("ID not find!");
			}else{
				opener.reload(true);
			}
		};
		//返回并刷新  返回页面的id  PS：一般用于顶部导航栏的返回键刷新
		owner.UpdateBack = function(webID)
		{
			var old_back = mui.back;
			mui.back = function(){
				service.UpdateWebView(webID);
				old_back();
			}
		};
		/*
		 *返回图片物理地址
		 * strImg:图片逻辑地址
		 * doc:
		 * */
		owner.GetImgSrc = function(doc,strImg)
		{
			return BaseURL + doc + "/" + strImg;
		};
		owner.DownloadVersion = function(versionName)
		{
			return BaseURL + "version/" + versionName + ".apk";
		};
		
		/*
		 *是否显示动态遮罩和加载中
		 * */
		owner.showLoginMask = function()
		{
			mask.show();
			nwaiting = plus.nativeUI.showWaiting("加载中...");
		};
		owner.closeLoginMask = function()
		{
			mask.close();
			nwaiting.close();
		};
}(mui, window.service = {}));