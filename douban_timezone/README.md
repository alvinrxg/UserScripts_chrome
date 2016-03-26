douban timezone 豆瓣时区
================================

GM/userscript<br />
chrome/chromium => Tampermonkey tested.<br />
firefox (strict)=> Greasemonkey tested.


TODO:
-------------------------
* need to be much more simple


what is done
-------------------------
* www.douban.com		done
* site.douban.com		done
* book.douban.com		done
* read.douban.com		abort
* movie.douban.com		done
* music.douban.com		done
* www.douban.com/location	eh, well, here i can't implement for this place.



known bugs
-------------------------
* daylight save time bug inside javascript
	German => 2012-10-28, but javascript makes 2012-10-21...
	won't be fixed


and some more(TODO)
-------------------------
pay attention to some short time formats:
* short: 10-25 12:23
* what will it be last year? still 10-25 12:23?  or 2011-10-25 12:23 ?
