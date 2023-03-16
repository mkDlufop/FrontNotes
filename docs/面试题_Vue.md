---
title: 面试题_Vue
permalink: /interview_questions_Vue/
---

## Vue 核心

使用 Object.defineProperty() 来进行数据劫持有什么缺点？

- 在对一些属性进行操作时，使用这种方法无法拦截，比如通过下标方式修改数组数据或者给对象新增属性，这都不能触发组件的重新渲染，因为 Object.defineProperty 不能拦截到这些操作。更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是 Vue 内部通过重写函数的方式解决了这个问题。

v-if 和 v-show 的区别？

- 手段

  v-if 是动态的向 DOM 树内添加或者删除 DOM 元素；v-show 是通过设置 DOM 元素的 display 样式属性控制显隐

- 编译过程

  v-if 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show 只是简单的基于 css 切换

- 编译条件

  v-if 是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译；v-show 是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且 DOM 元素保留

- 性能消耗

  v-if 有更高的切换消耗；v-show 有更高的初始渲染消耗

- 使用场景

  v-if 适合不大可能改变；v-show 适合频繁切换

## Vue Router

## 路由传参

- 路由传递参数（对象写法） path 是否可以结合 params 参数一起使用？ 即：
  `this.$router.push({ path: '/search', params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() }, });`

  > 答：报错，不能。
- 如何指定 params 参数 可传可不传？ 即：

  `this.$router.push({ name: "search", query: { k: this.keyword.toUpperCase() }, });`

  > 答：配置路由时，path 上加个 ? 号，代表可传参数也可不传；若不加 ? ，则 URL 会出现问题。
  >
  > ```js
  > {
  >   path: "/search/:keyword?",
  >   component: Search,
  >   meta: {show:true},
  >   // 对象形式路由传递参数
  >   name: "search",
  > },
  > ```

- params 参数 可以传递也可以不传递，但是如果传递是空串，如何解决？ 即：
   `this.$router.push({name:"search",params:{keyWord:''},query:{k:this.keyWord}})`
  > 答：可以使用 undefined 来解决 params 参数可以传递也可不传递（空的字符串）
  >
  > ```js
  > this.$router.push({
  >   name: "search",
  >   params: { keyword: '' || undefined },
  >   query: { k: this.keyword.toUpperCase() },
  > });
  > ```

- 路由组件能不能传递 props 数据？
  > 可以。三种写法：
  >
  > ```js
  > {
  >   path: "/search/:keyword",
  >   component: Search,
  >   meta: { show: true },
  >   // 对象形式路由传递参数
  >   name: "search",
  >   // 路由组件能不能传递 props 数据？
  >   // 1、布尔值写法，但是这种方法只能传递 params 参数
  >   // props: true,
  >   // 2、对象写法：额外给路由组件传递一些 props
  >   // props: { a: 1, b: 2 },
  >   // 函数写法（常用）: 可以 params 参数、query 参数，通过 props 传递给路由组件
  >   props: ($route) => {
  >       return {keyword: $route.params.keyword, k: $route.query.k};
  >   }
  > },
  > ```
  >
  > ```html
  > <template>
  >   <div>
  >     <h1>params 参数---{{ $route.params.keyword }}</h1>
  >     <h1>query 参数---{{ $route.query.k }}</h1>
  >     <h1>props 数据---{{ keyword }}</h1>
  >     <!-- <h1>props 数据---{{ a }}--{{ b }}</h1> -->
  >   </div>
  > </template>
  > 
  > <script>
  > 
  > export default { 
  >   name: '',
  >   props: ['keyword', 'a', 'b'],
  > }
  > ```
