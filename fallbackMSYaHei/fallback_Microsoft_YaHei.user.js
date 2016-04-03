// ==UserScript==
// @name         fallback Microsoft YaHei
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';


// load jQuery when it's not included in original website
if(!window.jQuery)
{
   var script = document.createElement('script');
   script.type = "text/javascript";
   script.src = "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.1.min.js";
   document.getElementsByTagName('head')[0].appendChild(script);
}

jQuery(document).ready(function($){
	var myFont = "Microsoft YaHei";
	$("*").each(function(index) {
		var fontFamily = $(this).css("font-family");
		if (fontFamily.indexOf(myFont) < 0) {
			$(this).css("font-family", fontFamily + ", " + myFont);
		}
	});
});
