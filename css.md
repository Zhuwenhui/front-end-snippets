####	👋通过:ROOT进行CSS变量的定义



#####	1⃣️:root常用方式一
```css
:root{
	--main-color:red;
	--pane-padding:5px 42px;
}


h1{
	background-color:var(--main-color);
	width: 100%;
	height: 100%;
	padding: var(--pane-padding);
}
```

#####	2⃣️禁止浏览器弹出右菜单
```js
document.oncontextmenu = function() {
	return false;
}		
```

