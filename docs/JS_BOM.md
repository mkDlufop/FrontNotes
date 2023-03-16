---
title: BOM
permalink: /js_bom/
---
[[TOC]]

## 1.BOM 简介

BOM（Browser Object Model）即浏览器对象模型，它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是 window。

从根本上讲，BOM 只是处理浏览器窗口和框架；但人们习惯上也把所有针对浏览器的 JavaScript 扩展算作 BOM 的一部分。

`window`:

- `document`

- `location`

- `navigation`

- `screen`

- `history`

## 2.window 对象的

### 常用属性

- `window.innerHeight`： 浏览器可视区的高度。

### 常用事件

1. 窗口加载事件

   - `window.onload = function() {};` 或者 `window.addEventListener("load", function() {});`
     window.onload 是窗口（页面）加载事件，当文档内容完全加载完成后会触发事件（包括图像、脚本文件、CSS 文件）。

   - `document.addEventListener('DOMContentLoaded', function() {});`

     DOMContentLoaded 事件触发时，仅当 DOM 加载完成，不包括样式、图片、flash 等。

     IE9 以上才支持。

     如果页面的图片很多的话，从用户访问到 onload 触发可能需要比较长的时间，交互效果就不能实现，必然影响用户的体验，此时用 DOMContentLoaded 事件比较合适。

2. 调整窗口大小事件

   `window.onresize = function() {};` 或 `window.addEventListener("resize",function() {});`

   window.onresize 是调整窗口大小加载事件，当触发时就调用的处理函数。

## 3. 定时器

- `window.setTimeout（回调函数，[延迟的毫秒数]);`

  setTimeout() 方法用于设置一个定时器，该定时器在定时器到期后执行回调函数。

- `window.clearTimeout(timeoutID);`
  clearTimeout() 方法用来取消先前通过调用 setTimeout() 建立的定时器。timeoutID 是定时器的标识符。

- `window.setInterval（回调函数，[延迟的毫秒数]);`
  setInterval() 方法重复调用回调函数，每隔规定时间，就去调用一次回调函数。

- `window.clearInterval(intervalID);`
  clearInterval() 方法用来取消先前通过调用 setInterval() 建立的定时器。intervalID 是定时器的标识符。

## 4.JS 执行机制

- 同步和异步

  - 同步任务

    同步任务都在主线程上执行，形成一个执行栈。
  - 异步任务

    异步任务是通过回调函数实现的。

    一般而言，异步任务有三种类型：

    - 1、普通事件，如 click、resize 等。

    - 2、资源加载，如 load、error 等。

    - 3、定时器，包括 setInterval、setTimeout 等。

- 宏任务和微任务

  宏任务分为同步任务和异步任务。同时普通任务队列和延迟任务队列中的任务都属于宏任务。延迟队列专门处理如`setTimeout`/`setInterval`这样的定时器的回调任务。宏队列里放的是一系列宏任务。

  `宏队列：[宏任务 1，宏任务 2，...]`

  微任务有：Promise 的回调等。微队列里放的是一系列微任务。

  `微队列：[微任务 1，微任务 2，...]`

  规则：每次要执行宏队列里的一个任务之前，先看微队列里是否有待执行的微任务

    1. 如果有，先执微任务

    2. 如果没有，按照宏队列里任务的顺序，依次执行

- JS 执行机制

  1. 一开始整段脚本作为第一个宏任务来执行。
  2. 把同步代码直接压入执行栈进行执行。宏任务的异步任务进入宏任务队列，微任务进入微任务队列。
  3. 当前宏任务执行完出队，检查微任务队列，如果有则依次执行，直到微任务队列为空。
  4. 执行宏队列队首新的宏任务，回到 2，依次循环，直到宏任务和微任务队列都为空。

   一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行。

  由于主线程不断的重复获得任务、执行任务、再获得任务、再执行，所以这种机制被称为事件循环（event loop）。

## 5.location 对象

| location 对象属性  | 返回值                                |
| ----------------- | ------------------------------------- |
| location.href     | 获取或设置整个 URL                     |
| location.host     | 返回主机（域名）                      |
| location.port     | 返回端口号                            |
| location.pathname | 返回路径                              |
| location.search   | 返回参数                              |
| location.hash     | 返回片段   #后面内容  常见于链接 锚点 |

| location 对象方法        | 返回值                                                       |
| ----------------------- | ------------------------------------------------------------ |
| location.assign('URL')  | 跟 href 一样，可以跳转页面（也可以重定向页面）                 |
| location.replace('URL') | 替换当前页面，因为不记录历史，所以不能后退页面               |
| location.reload()       | 重新加载页面，相当于刷新按钮或 F5 。如果参数是 true，强制刷新 ctrl  + F5 |

## 6.navigator 对象

navigator 对象包含有关浏览器的信息。

## 7.history 对象

| history 对象方法 | 作用                                                    |
| --------------- | ------------------------------------------------------- |
| back()          | 后退                                                    |
| forward()       | 前进                                                    |
| go（参数）        | 前进或后退    go(1) 前进一个页面    go(-1) 后退一个页面 |
