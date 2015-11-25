//dont-look-back
//by DOLLOR
~(function(global){
	"use strict";
	var obj,init;
	obj={};
	obj.enable = true
	init=function(){
		var lastHash=global.location.hash || "#";
		var preventBack=function(){
			var newhash = obj.getHash();
			if(obj.enable && newhash!==lastHash){
				if(newhash===lastHash+"#1"){
					setTimeout(function(){
						//global.location.hash=lastHash;
						history.go(1);
					},50)
				}
				else{
					obj.setHash(newhash);
				}
			}
		};
		if(history && history.pushState){
			history.pushState({},document.title,lastHash+"#3");
			history.pushState({},document.title,lastHash+"#2");
			history.pushState({},document.title,lastHash+"#1");
			history.pushState({},document.title,lastHash);
		}
		else{
			global.location.hash=lastHash+"#3";
			global.location.hash=lastHash+"#2";
			global.location.hash=lastHash+"#1";
			global.location.hash=lastHash;
		}
		obj.setHash=function(newhash){
			lastHash=newhash;
			global.location.hash=lastHash+"#3";
			global.location.hash=lastHash+"#2";
			global.location.hash=lastHash+"#1";
			global.location.hash=lastHash;
		};
		obj.getHash=function(){
			return global.location.hash || "#";
		};
		preventBack();
		global.onhashchange=preventBack;
	};
	//output
	if(!global.dlb){
		init();
		global.dlb=global.dlb || obj;
	}
})(window);
