/* 
    函数节流：在一个单位时间内，只能触发一次函数。
            如果这个单位时间内触发多次函数，只有一次生效。
    
    适用场景：
        1. 鼠标的点击事件，比如mousedown只触发一次。
        2. 监听滚动事件，比如是否滑到底部自动加载更多，用throttle判断。
        3. 比如游戏中发射子弹的频率(1秒发射一颗)。
    例子：
    window.onscroll = throttle(function(...args) {console.log('scroll', args)}, 2000);
*/

function throttle(fn, delay) {
    let timer;
    return function(...args) {
        if(!timer) {
            timer = setTimeout(() => {
        	fn.call(this, args);
        	timer = undefined;
            }, delay);
        }
    }
}

export default throttle;