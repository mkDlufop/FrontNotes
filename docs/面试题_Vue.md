---
title: 面试题_Vue
permalink: /interview_questions_Vue/
---

## Vue 基础

### 1. v-if 和 v-show 的区别？

- 手段

  v-if 是动态的向 DOM 树内添加或者删除 DOM 元素；v-show 是通过设置 DOM 元素的 display 样式属性控制显隐。

- 编译过程

  v-if 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show 只是简单的基于 css 切换。

- 编译条件

  v-if 是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译；v-show 是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且 DOM 元素保留。

- 性能消耗

  v-if 有更高的切换消耗；v-show 有更高的初始渲染消耗。

- 使用场景

  v-if 适合不大可能改变；v-show 适合频繁切换。

### 2. 如何理解 MVVM的？

- MVVM 是 Model-View-ViewModel  的缩写。

   M: 模型（Model）: data 中的数据。

   V: 视图（View）: 模板代码。

   VM: 视图模型（ViewModel）: Vue 实例。
- 核心是提供对 View 和 ViewModel 的双向数据绑定。当数据改变的时候，ViewModel 能监听到数据的变化，自动更新视图，当用户操作视图的时候，ViewModel 也可以监听到视图的变化，然后通知数据进行改动，这就实现了双向数据绑定。ViewModel 通过双向数据绑定把 View 和 Model 连接起来，它们之间的同步是自动的，不需要人为干涉，所以我们只需要关注业务逻辑即可，不需要操作 DOM，同时也不需要关注数据的状态问题，因为它是由 MVVM 统一管理。

### 3. 使用 Object.defineProperty() 来进行数据劫持有什么缺点？

在对一些属性进行操作时，使用这种方法无法拦截，比如通过下标方式修改数组数据或者给对象新增属性，这都不能触发组件的重新渲染，因为 Object.defineProperty 不能拦截到这些操作。

更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是 Vue 内部通过重写函数的方式解决了这个问题。

### 4. Vue 中的 key 值的作用是什么？

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素。

- 第一种情况是 v-if 中使用 key。由于 Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。因此当使用 v-if 来实现元素切换的时候，如果切换前后含有相同类型的元素，那么这个元素就会被复用。如果是相同的 input 元素，那么切换前后用户的输入不会被清除掉，这样是不符合需求的。因此可以通过使用 key 来唯一的标识一个元素，这个情况下，使用 key 的元素不会被复用。这个时候 key 的作用是用来标识一个独立的元素。
- 第二种情况是 v-for 中使用 key。用 v-for 更新已渲染过的元素列表时，它默认使用“就地复用”的策略。如果数据项的顺序发生了改变，Vue 不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处的每个元素。因此通过为每个列表项提供一个 key 值，来以便 Vue 跟踪元素的身份，从而高效的实现复用。这个时候 key 的作用是为了高效的更新渲染虚拟 DOM。

Vue 为了更高效的渲染元素，会尽可能的复用元素，而非从头渲染，key 可以为节点打标记，而非简单的复用节点。当数据发生变化时，Vue 会根据【新数据】生成【新的虚拟 DOM】, 随后Vue进行【新虚拟 DOM】与【旧虚拟 DOM】的差异比较，比较规则。

- 旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key
  - 若虚拟 DOM 中内容没变, 直接使用之前的真实 DOM；
  - 若虚拟 DOM 中内容变了, 则生成新的真实 DOM，随后替换掉页面中之前的真实 DOM。
- 旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key
  - 创建新的真实 DOM，随后渲染到到页面。

### 5. v-if 和 v-for 哪个优先级更高？如果同时出现，应如何优化？

vue2.0 版本中 v-for 优先于 v-if 被解析，如果同时出现，每次渲染都会先执行循环再判断条件，无论如何循环都不可避免，浪费了性能。要避免出现这种情况，则在外层嵌套 template，在这一层进行 v-if 判断，然后在内部进行 v-for 循环。如果条件出现在循环内部，可通过计算属性提前过滤掉那些不需要显示的项。

3.x 版本中 v-if 总是优先于 v-for 生效。

### 6. v-model 的实现原理

vue 中 v-model 可以实现数据的双向绑定，但是为什么这个指令就可以实现数据的双向绑定呢？其实 v-model 是 vue 的一个语法糖。即利用 v-model 绑定数据后，既绑定了数据，又添加了一个 input 事件监听。

例如：

```html
<input v-model="text">
<!--等价于：-->
<input :value="text" @input="text = $event.target.value">
```

### 7. 常见的 Vue 性能优化方法

- 路由懒加载
- keep-alive 缓存页面
- 使用 v-show 复用 DOM
- v-for 遍历避免同时使用 v-if
- 长列表滚动到可视区域动态加载
- 图片懒加载
- 第三方插件按需引入
- SSR（服务端渲染）

## Vue Router

### 1. Vue Router 跳转和 location.href 有什么区别？

使用 location.href= ‘/url’ 来跳转，简单方便，但是刷新了页面。

引进 Vue Router，然后使用 router.push( ‘/url’ ) 来跳转，无刷新页面，静态跳转。使用了 diff 算法，实现了按需加载，减少了 dom 的消耗。使用 router 跳转底层是用 history.pushState()。

### 2. 如何获取页面的hash变化？

- 监听 $route 的变化

   ```js
   watch: {
    $route: {
      handler: function(val, oldVal) {
        console.log(val);
      },
      deep: true;
    }
   }
   ```

- `window.location.hash` 读取#值。

   `window.location.hash` 的值可读可写，读取来判断状态是否改变，写入时可以在不重载网页的前提下，添加一条历史访问记录。

### 3. 路由传递参数（对象写法） path 是否可以结合 params 参数一起使用？ 

即：`this.$router.push({ path: '/search', params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() }, });`

这会报错，不能这样写。

### 4. 如何指定 params 参数 可传可不传？ 

即：`this.$router.push({ name: "search", query: { k: this.keyword.toUpperCase() }, });`

配置路由时，path 上加个 ? 号，代表可传参数也可不传；若不加 ? ，则 URL 会出现问题。

```js
{
  path: "/search/:keyword?",
  component: Search,
  meta: {show:true},
  // 对象形式路由传递参数
  name: "search",
},
```

### 5. params 参数 可以传递也可以不传递，但是如果传递是空串，如何解决？ 

即：`this.$router.push({name:"search",params:{keyWord:''},query:{k:this.keyWord}})`

可以使用 undefined 来解决 params 参数可以传递也可不传递（空的字符串）。

```js
this.$router.push({
  name: "search",
  params: { keyword: '' || undefined },
  query: { k: this.keyword.toUpperCase() },
});
```

### 6. 路由组件能不能传递 props 数据？

可以。三种写法：

```js
{
  path: "/search/:keyword",
  component: Search,
  meta: { show: true },
  // 对象形式路由传递参数
  name: "search",
  // 路由组件能不能传递 props 数据？
  // 1、布尔值写法，但是这种方法只能传递 params 参数
  // props: true,
  // 2、对象写法：额外给路由组件传递一些 props
  // props: { a: 1, b: 2 },
  // 函数写法（常用）: 可以 params 参数、query 参数，通过 props 传递给路由组件
  props: ($route) => {
      return {keyword: $route.params.keyword, k: $route.query.k};
  }
},
```

```html
<template>
  <div>
    <h1>params 参数---{{ $route.params.keyword }}</h1>
    <h1>query 参数---{{ $route.query.k }}</h1>
    <h1>props 数据---{{ keyword }}</h1>
    <!-- <h1>props 数据---{{ a }}--{{ b }}</h1> -->
  </div>
</template>

<script>

export default { 
  name: '',
  props: ['keyword', 'a', 'b'],
}
```

## Vue 3.0

### 1. Vue3.0 有什么更新

- 监测机制的改变
  - 3.0 将带来基于代理 Proxy 的 observer 实现，提供全语言覆盖的反应性跟踪。
  - 消除了 Vue2.x 当中基于 Object.defineProperty 的实现所存在的。
    - 检测属性的添加和删除；
    - 检测数组索引和长度的变更；
    - 支持 Map、Set、WeakMap 和 WeakSet。
- 模板
  - 作用域插槽，Vue2.x 的机制导致作用域插槽变了，父组件会重新渲染，而 3.0 把作用域插槽改成了函数的方式，这样只会影响子组件的重新渲染，提升了渲染的性能。
  - 同时，对于 render 函数的方面，3.0 也进行一系列更改来方便习惯直接使用 api 来生成 vdom 。
- 对象式的组件声明方式
  - Vue2.x 中的组件是通过声明的方式传入一系列 option，和 TypeScript 的结合需要通过一些装饰器的方式来做，虽然能实现功能，但是比较麻烦。
  - 3.0 修改了组件的声明方式，这样使得和 TypeScript 的结合变得很容易。
- 其它方面的更改
  - 支持自定义渲染器，从而使得 weex 可以通过自定义渲染器的方式来扩展，而不是直接 fork 源码来改的方式。
  - 支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。
  - 基于 tree shaking 优化，提供了更多的内置功能。
