//dont-look-back
//by DOLLOR
~(function(global){
	"use strict";
	var obj,init;
	obj={};
	obj.enable=true;
	init=function(){
		//封装改变hash方法
		obj.changeHashTo=function(newhash){
			newhash="#"+newhash;
			if(history && history.pushState){
				if(newhash!=="#"){
					history.pushState({},document.title,newhash);
				}
				else{
					history.pushState({},document.title,
						location.href.split("#")[0]
					);
				}
			}
			else{
				global.location.hash=newhash;
			}
		};
		//加倍改变
		obj.changeManyTimes=function(newhash){
			obj.changeHashTo(newhash+"#dlb3");
			obj.changeHashTo(newhash+"#dlb2");
			obj.changeHashTo(newhash+"#dlb1");
			obj.changeHashTo(newhash);
		};
		//保存旧的并设置新的
		obj.setHash=function(newhash){
			obj.lastHash=newhash;
			obj.changeManyTimes(obj.lastHash);
		};
		obj.getHash=function(){
			var hash=global.location.hash;
			if(hash[0]==="#"){
				hash=hash.slice(1);
			}
			return hash;
		};
		//响应并阻止后退
		obj.preventBack=function(){
			//获取改变后的hash
			var newhash = obj.getHash();
			//检查是否启用且hash是否变了
			if(obj.enable && newhash!==obj.lastHash){
				//检查是后退还是前进
				//if(newhash===obj.lastHash+"#dlb1"){
				if(newhash.match(/\#dlb[1-3]$/)){
					setTimeout(function(){
						history.go(1);
					},50);
				}
				else{
					obj.setHash(newhash);
				}
			}else if(!obj.enable){
				if(newhash.match(/\#dlb[1-3]$/)){
					//如果回到防后退hash，继续后退
					setTimeout(function(){
						history.go(-1);
					},50);
				}else if(newhash===obj.lastHash){
					//如果回到最初的hash，再后退一次
					setTimeout(function(){
						history.go(-1);
					},50);
				}else{
					//完成后退步骤
					obj.lastHash=newhash;
				}
			}
		};
		//当前想保持的hash
		obj.lastHash=obj.getHash();

		obj.changeManyTimes(obj.lastHash);
		obj.preventBack();
		if(global.addEventListener){
			global.addEventListener("hashchange",obj.preventBack);
		}
		else if(global.attachEvent){
			global.attachEvent("onhashchange",obj.preventBack);
		}
		else{
			global.onhashchange=obj.preventBack;
		}
	};
	//output
	init();
	// Node.js
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = obj;
	}
	// AMD / RequireJS
	else if (typeof define !== 'undefined' && define.amd) {
		define([], function () {
			return obj;
		});
	}
	// included directly via <script> tag
	//else {
		global.dlb = obj;
	//}
})(window);
