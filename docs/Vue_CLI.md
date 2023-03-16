---
title: Vue CLI
permalink: /vue_cli/
---
[[TOC]]

## 使用 Vue CLI

### **关于不同版本的 Vue:**

1. vue.js 与 vue.runtime.xxx.js 的区别：

    （1）.vue.js 是完整版的 Vue，包含：核心功能+模板解析器
    （2）.vue.runtime.xxx.js 是运行版的 Vue，只包含：核心功能；没有模板解析器。

2. 因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 配置项，需要使用 render 函数接收到的 createElement 函数去指定具体内容。

### vue.config.js 配置文件

1. 使用`vue inspect > output.js`可以查看到 Vue 脚手架的默认配置。

2. 使用 vue.config.js 可以对脚手架进行个性化定制。

### 总结 TodoList 案例

1. 组件化编码流程：

    1. 拆分静态组件：组件要按照功能点拆分，命名不要与 html 元素冲突。
    2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
        - （1）一个组件在用：放在组件自身即可。
        - （2）一些组件在用：放在他们共同的父组件上（状态提升）。
    3. 实现交互：从绑定事件开始。

2. 使用 v-model 时要切记：v-model 绑定的值不能是 props 传过来的值，因为 props 是不可以修改的。

### nextTick

1. 语法：`this.$nextTick（回调函数）`

2. 作用：在下一次 DOM 更新结束后执行其指定的回调

3. 什么时候用：当改变数据后，要基于更新后的新 DOM 进行某些操作时，要在 nextTick 所指定的回调函数中执行。

## 注意事项

|  | vuex（默认版本 4) | vue-router（默认版本 4) |
| --- | --- | --- |
| vue2 | 3 | 3 |
| vue3 | 4 | 4 |
