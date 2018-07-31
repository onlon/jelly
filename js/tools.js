/*
 * 工具集合 
 * */
//localStorage

(function($, owner) {
	
	//字符串格式化
	owner.StringFormatDemo = function(){
		String.prototype.format = function(args) {
		    var result = this;
		    if (arguments.length < 1) {
		        return result;
		    }
		    
		    var data = arguments;       //如果模板参数是数组
		    if (arguments.length == 1 && typeof (args) == "object") {
		        //如果模板参数是对象
		        data = args;
		    }
		    for (var key in data) {
		        var value = data[key];
		        if (undefined != value) {
		            result = result.replace("{" + key + "}", value);
		        }
			}
		    return result;
		}
	};
	
	//判断手机号是否正确
	owner.isPhone = function(phone)
 	{
 		if(phone){
 			var partten = /^1[3,4,5,7,8]\d{9}$/;
	      	if(partten.test(phone) && phone.length == 11){
	           	return true;
	      	}
 		}
 		return false;
 	};
	
	owner.stateColor = function(number){
		switch(number){
			case 0:
				return "red";
				break;
			case 1:
				return "#FFBC00";
				break;
			case 2:
				return "#00DB00";
				break;
			case 3:
				return "#FF4D4D";
				break;
			case 4:
				return "#47CDE8";
				break;
			case 5:
				return "#00DB00";
				break;
			case 6:
				return "#FF4D4D";
				break;
			case 7:
				return "#FF4D4D";
				break;
		}
	};
	
	owner.stateConvertType = function(number){
		switch(number){
			case 0:
				return "未支付";
				break;
			case 1:
				return "待接受";
				break;
			case 2:
				return "进行中";
				break;
			case 3:
				return "已取消";
				break;
			case 4:
				return "待确认";
				break;
			case 5:
				return "已完成";
				break;
			case 6:
				return "订单失效";
				break;
			case 7:
				return "订单过期";
				break;
		}
	};
	
	owner.stateConvertColor = function(number){
		switch(number){
			case 1:
				return "#FFBC00";
				break;
			case 2:
				return "#00DB00";
				break;
			case 4:
				return "#47CDE8";
				break;
		}
	};
	
	owner.numConvertType = function(number){
		switch(number){
			case 1:
				return "寄取快递";
				break;
			case 2:
				return "食学占座";
				break;
			case 3:
				return "送取洗衣";
				break;
			case 4:
				return "代购帮买";
				break;
			case 5:
				return "出行拼车";
				break;
			case 6:
				return "办公学习";
				break;
			case 7:
				return "其他";
				break;
		}
	};
	
	owner.typeConvertNum = function(type){
		switch(type){
			case "寄取快递":
				return 1;
				break;
			case "食堂占座":
				return 2;
				break;
			case "送取洗衣":
				return 3;
				break;
			case "代购帮买":
				return 4;
				break;
			case "出行拼车":
				return 5;
				break;
			case "办公学习":
				return 6;
				break;
			case "其他":
				return 7;
				break;
		}
	}
	owner.isLogin = function(){
		return localStorage.getItem("isLogin");
	}
	//刷新页面  参数页面的id 
	owner.UpdateWebView = function(webID){
		var opener =plus.webview.getWebviewById(webID);
		if(opener == null){
			mui.alert("ID not find!");
		}else{
			opener.reload(true);
		}
	};
	//返回并刷新  返回页面的id
	owner.UpdateBack = function(webID){
		var old_back = mui.back;
		mui.back = function(){
			tools.UpdateWebView(webID);
			old_back();
		}
	};
	
	//默认头像
	owner.DefaultAvatar = "images/home_task_avatar.png";
	
	//性别
	owner.ConvertSex = function(sex){
		switch(sex){
			case 0:
				return "man";
				break;
			case 1:
				return "woman";
				break;
		}
	};
	
	owner.resultError = function(result){
		switch(result){
			case -3:
				plus.nativeUI.toast("手机号不存在");
				break;
			case -4:
				plus.nativeUI.toast("密码错误");
				break;
			case -5:
				plus.nativeUI.toast("手机号已存在");
				break;
			case -7:
				plus.nativeUI.toast("任务被别人接受啦");
				break;
			case -8:
				plus.nativeUI.toast("任务已被冻结");
				break;
			case -9:
				plus.nativeUI.toast("订单超时未支付，已过期");
				break;
			case -11:
				plus.nativeUI.toast("任务已过期");
				break;
			default:
				plus.nativeUI.toast("请求失败，请检查你的网络");
				break;
		}
	}
	
	owner.ChangeStr2Date = function(str) {
	　　return new Date(Date.parse(str.replace(/-/g, "/")));
	}
	
	owner.jsonSort = function(jsonData){
		var js = jsonData;
		js.sort(function (a, b) {
		　　return b.publish_date - a.publish_date;
		}); 
		mui.each(js,function(index,item){
			console.log(item.publish_date);
		});
	}
	
	owner.jSort = function (filed, rev, primer) {
	    rev = (rev) ? -1 : 1;
	    return function (a, b) {
	        a = a[filed];
	        b = b[filed];
	        if (typeof (primer) != 'undefined') {
	            a = primer(a);
	            b = primer(b);
	        }
	        if (a < b) { return rev * -1; }
	        if (a > b) { return rev * 1; }
	        return 1;
	    }
	};
	owner.appealTypeConvertNum = function(type){
		switch(type){
			case "接受者未履行要求":
				return 1;
				break;
			case "发布者未履行要求":
				return 2;
				break;
			case "其他":
				return 3;
				break;
		}
	}
}(mui, window.tools = {}));