//dont-look-back
//by DOLLOR
~(function(global){
	"use strict";
	var obj,init;
	obj={};
	obj.enable=true
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
				global.location.hash=newhash
			}
		};
		//加倍改变
		obj.changeManyTimes=function(newhash){
			obj.changeHashTo(newhash+"#3");
			obj.changeHashTo(newhash+"#2");
			obj.changeHashTo(newhash+"#1");
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
			//检查hash是否变了
			if(obj.enable && newhash!==obj.lastHash){
				//检查是后退还是前进
				if(newhash===obj.lastHash+"#1"){
					setTimeout(function(){
						history.go(1);
					},50)
				}
				else{
					obj.setHash(newhash);
				}
			}
		};
		//当前想保持的hash
		obj.lastHash=obj.getHash();

		obj.changeManyTimes(obj.lastHash);
		obj.preventBack();
		if(global.addEventListener){
			global.addEventListener("hashchange",function(ev){
				obj.preventBack();
			});
		}
		else if(global.attachEvent){
			global.attachEvent("onhashchange",function(ev){
				obj.preventBack();
			});
		}
		else{
			//global.onhashchange=obj.preventBack;
		}
	};
	//output
	if(!global.dlb){
		init();
		global.dlb=global.dlb || obj;
	}
})(window);
