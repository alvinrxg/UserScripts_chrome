// ==UserScript==
// @name           douban timezone
// @namespace      https://github.com/alvinrxg/douban_timezone
// @description    douban timezone
// @include        http://*.douban.com/*
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// ==/UserScript==

console.log("==== douban timezone started  ====");

// function testCSS(prop) {
    // return prop in document.documentElement.style;
// }
// var MONTH = testCSS('MozBoxSizing') ? 0 : 1;
// var MONTH = 1;

var p1 = /\d+-\d+-\d+\s+\d+:\d+:\d+/;
var p2 = /\d+-\d+\s+\d+:\d+/;
var p3 = /\d+-\d+-\d+\s+\d+:\d+/;
var year = new Date();	// for the time now.
// console.log(year);

function calcTime(db_time, p) {
	var Y, M, D, h, m, s;
	var db;
	Y= db_time.match(/^(\d{4})-/);
	M = (p === p2) ? db_time.match(/^(\d+)-/) : db_time.match(/-(\d+)-/);
	D = db_time.match(/-(\d+) /);
	h = db_time.match(/ (\d+):/);
	m = db_time.match(/:(\d+):?/);
	s = db_time.match(/:(\d+)$/);

	if (p === p1) {
		db = new Date(Y[1], M[1] - 1, D[1], h[1], m[1], s[1]);
	}
	else if (p === p2) {
		db = new Date(new Date().getFullYear(), M[1] - 1, D[1], h[1], m[1]);
	}
	else if (p === p3) {
		db = new Date(Y[1], M[1] - 1, D[1], h[1], m[1]);
	}

	// console.log("old time = " + db);
	var z = db.getTime() - 3600000 * (8 + db.getTimezoneOffset() / 60);
	var l = new Date(z);
	// console.log("new time = " + l);
	var r = String("0" + (l.getMonth() + 1).toString()).slice(-2) + "-" + String("0" + l.getDate().toString()).slice(-2);

	if (p === p1 || p === p3) {
		r = (db.getFullYear() === year.getFullYear()) ? r : l.getFullYear() + "-" + r;
		r += " " + l.toTimeString().replace(/\s*GMT\S+/, "");
	}
	else {
		r += " " + l.toTimeString().replace(/:\d+\s*GMT\S+/, "");
	}
	return r;
}

function work(di, p) {
	if (di.hasAttribute("title")) {
		// console.log("here, work, title");
		if (p.test(di.getAttribute("title"))) {
			var r = calcTime(di.getAttribute("title").match(p) + "", p);
			di.innerHTML = di.innerHTML.replace(/>.*<\//, ">" + r + "</");
		}
	}
	else if (p.test(di.innerHTML)) {
		// console.log("here, work, NO title");
		var r = calcTime(di.innerHTML.match(p) + "", p);
		di.innerHTML = di.innerHTML.replace(p, r);
	}
}

function match_classname(classname, p) {
	var dd = document.getElementsByClassName(classname);
	if (dd.length > 0) {
		// console.log("work now for " + dd.length + " objects");
		for (var i in dd) {
			if (isNaN(i)) {continue;}
			work(dd[i], p);
		}
	}
}

function match_tag(node, p) {
	var dd = document.getElementsByTagName(node);
	if (dd.length > 0) {
		// console.log("work now for " + dd.length + " objects");
		for (var i in dd) {
			if (isNaN(i)) {continue;}
			work(dd[i], p);
		}
	}
}

function match_parent_classname(classname, pa, p) {
	var dd = document.getElementsByClassName(classname);
	if (dd.length > 0) {
		for (var i in dd) {
			if (isNaN(i)) {continue;}
			if (dd[i].parentNode.nodeName == pa && dd[i].innerHTML.length < 30) {
				work(dd[i], p);
			}
		}
	}
}


// www.douban.com/*
if (/com\/update\/|\/status/.test(location.href)) {
	match_classname("created_at", p1);
}
else if (/com\/note|photos\/photo/.test(location.href)) {
	match_classname("pl", p1);
	match_classname("author", p1);
}
else if (/group\/topic/.test(location.href)) {
	match_classname("color-green", p1);
	match_tag("h4", p1);
}
else if (/group\/\S+/.test(location.href)) {
	match_classname("time", p2);
}
else if (/doumail/.test(location.href)) {
	match_classname("pl", p3);
}
else if (/people\/|photos\/album/.test(location.href)) {
	match_parent_classname("pl", "DIV", p1);
	match_parent_classname("pl", "LI", p2);
}

// site.douban.com
else if (/com\/widget\//.test(location.href)) {
	match_classname("datetime", p1);
	match_classname("author", p1);
}
else if (/site\..*\/room/.test(location.href)) {
	match_classname("datetime", p1);
}
else if (/site.douban/.test(location.href)) {
	match_classname("date", p3);
	match_classname("datetime", p2);
}
else if (/.*discussion\//.test(location.href)) {
	match_classname("mn", p1);
	match_tag("h4", p1);
}
// book.douban.com
else if (/book.*subject\//.test(location.href)) {
	match_classname("pl", p1);
	match_classname("datetime", p3);
}
// book & movie
else if (/.*\/review\//.test(location.href)) {
	match_classname("mn", p1);
	match_classname("pl", p1);
}

// // // read.douban.com
// // // ABORT
// // // OR ADD LATER, WITH NEW ALGORITHMUS
// else if (/read.*review\//.test(location.href)/) {
	// match_classname("time", )
// }

console.log("==== douban timezone finished ====");
