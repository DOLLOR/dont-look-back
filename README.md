# dont-look-back
disable the back button on a web page

让网页不能后退

## 概述 Outline
The forward/back button can change the hash of url. We can listen to the changing of the hash.

前进后退按钮会使得URL的hash变化。我们可以监听URL的hash值变化。

According to those, we can do something, which make it impossiable for user to navigate to the last page with the back button.That may be useful when processing form data.

针对这个原理，做一些处理，使得用户无法通过后退按钮返回上一页。这在处理表单的时候也许会有用。

## 使用 How to
Incude the js file, and it will work automatically. But **if you want to change the url hash**, use the api below.

载入JS文件即生效。**需要改变URL的hash值时**，请用以下方法。

```js
	dlb.setHash("#newHashValue");
	var h = dlb.getHash();
```
