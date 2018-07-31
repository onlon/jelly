/****************************************************************
 * 返回键退出程序
 * 1秒内，连续两次按返回键，则退出应用
 ****************************************************************/
function BackQuitApp() {
	var backFirst = null;
	this.QuitApp = function() {
		//首次按键，提示‘再按一次退出应用’
		if (!backFirst) {
			backFirst = new Date().getTime();
			mui.toast('再按一次退出应用程序');
			setTimeout(function() {
				backFirst = null;
			}, 1000);
		} else {
			if ((new Date()).getTime() - backFirst < 1000) {
				plus.runtime.quit();
			}
		}
	}
};