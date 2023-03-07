/*
    函数防抖：在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，
        则重新计时。

    使用场景：
        1. search 搜索，用户不断输入值时，用防抖来节约 Ajax 请求，
        也就是输入框事件。
        2. window 触发 resize 时，不断的调整浏览器窗口大小会不断
        的触发这个事件，用防抖来让其只触发一次。
        3. 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖。
        4. 文本编辑器实时保存，当无任何更改操作一秒后进行保存。
    例子： 
    window.onresize = debounce(function(...args) {console.log('resize', args)}, 2000)
*/

function debounce(fn, delay) {
	let timer;
	return function(...args) {
		if(timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn.call(this, args);
		}, delay);
	}
}

export default debounce;