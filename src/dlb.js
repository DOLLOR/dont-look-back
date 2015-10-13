//dont-look-back
//by DOLLOR
~(function(global){
	"use strict";
	var obj,init;
	obj={};
	init=function(){
		var lastHash=global.location.hash || "#####";
		var preventBack=function(){
			if(global.location.hash!==lastHash){
				//global.location.href=""+global.location.pathname;
				setTimeout(function(){
					global.location.hash=lastHash;
				},50)
			}
		};
		//global.open(lastHash,"_self");
		if(history && history.pushState){
			history.pushState({},document.title,lastHash+"##");
			history.pushState({},document.title,"###");
		}
		else{
			global.location.hash=lastHash+"##";
			global.location.hash="###";
		}
		preventBack();
		global.onhashchange=preventBack;
		obj.setHash=function(newhash){
			lastHash=newhash;
			global.location.hash="##";
		};
		obj.getHash=function(){
			return global.location.hash;
		};
	};
	//output
	if(!global.dlb){
		init();
		global.dlb=global.dlb || obj;
	}
})(window);
