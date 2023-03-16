---
title: 路由
permalink: /vue_router/
---
[[TOC]]

## 路由

理解：一个路由（route）就是一组映射关系（key-value），多个路由需要路由器（router）进行管理。

前端路由：key 就是路径，value 就是组件。

### 基本使用

  1. 安装 vue-router，命令：`npm i vue-router`
  2. 应用插件：`Vue.use(VueRouter)`
  3. 编写 router 配置项：

     ```js
     import Vue from 'vue'
     // 引入 VueRouter
     import VueRouter from 'vue-router'
     // 使用 VueRouter
     Vue.use(VueRouter)
     
     // 引入路由组件
     import About from '../components/About'
     import Home from '../components/Home'
     
     // 创建 router 实例对象，去管理一组一组的路由规则
     const router = new VueRouter({
         routers: [
             {
                 path: '/about',
                 component: About,
             },
             {
                 path: '/home',
                 component: Home,
             }
       ]
     })
     
     // 暴露 router
     export default router
     ```

  4. 实现切换（active-class 可配置高亮样式）

     ```html
     <router-link active-class="active" to="/about">About</router-link>
     ```

  5. 指定展示位置
  
     ```html
     <router-view></router-view>
     ```

### 路由的几个注意点

  1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹。
  
  2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
  
  3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。
  
  4. 整个应用只有一个 router ，可以通过组件的`$router`属性获取到。

### 多级路由

  1. 配置路由规则，使用 children 配置项：
  
     ```js
     routers: [
         {
             path: '/about',
             component: About,
         },
         {
             path: '/home',
             component: Home,
             children: [ // 通过 children 配置子级路由
                 {
                     path: 'news', // 此处不要写：/news
                     component: News,
                 },
                 {
                     path: 'message', // 此处不要写：/message
                     component: Message,
                 },
             ]
         }
     ]
     ```
  
  2. 跳转（要写完整路径）
  
     ```html
     <router-link to="/home/news">News</router-link>
     ```

### 路由的 query 参数

  1. 传递参数
  
     ```html
     <!-- 跳转并携带 query 参数，to 的字符串写法 -->
     <router-link to="/home/message/detail?id=666&title=你好">跳转</router-link>
  
     <!-- 跳转并携带 query 参数，to 的对象写法 -->
     <router-link 
         :to="{
             path:'/home/message/detail',
             query: {
                 id: 666,
                 title: '你好'
             }
         }"
     >跳转</router-link>
     ```
  
  2. 接受参数
  
     ```js
     $route.query.id
     $route.query.title
     ```

### 命名路由

  1. 作用：可以简化路由的跳转
  
  2. 如何使用

     1. 给路由命名

         ```js
         {
          path: '/demo',
          component: Demo,
          children: [ 
           {
            path: 'test',
            component: Test,
            children: [
             {
              name: 'hello',
              path: 'welcome',
              component: Hello,
             }
            ]
           }
          ]
         }
         ```

     2. 简化跳转：

         ```html
         <!-- 简化前，需要写完整的路径 -->
         <router-link to="/demo/test/welcome">跳转</router-link>
     
         <!-- 简化后，直接通过名字跳转 -->
         <router-link :to="{name:'hello'}">跳转</router-link>
     
         <!-- 简化写法配合传递参数 -->
         <router-link 
          :to="{
           name:'hello',
           query: {
            id: 666,
            title: '你好'
           }
          }"
         >跳转</router-link>
         ```

### 路由的 params 参数

  1. 配置路由，声明接受 params 参数
  
     ```js
     {
      path: '/home',
      component: Home,
      children: [ 
       {
        path: 'news', 
        component: News,
       },
       {
        path: 'message', 
        component: Message,
        children: [
         {
          name: 'xiangqing',
          path: 'detail/:id?/:title?', // 使用占位符声明接受 params 参数。添加？，可指定 params 参数可传可不传
          component: Detail
         }
        ]
       },
      ]
     }
     ```
  
  2. 传递参数
  
     ```html
     <!-- 跳转并携带 params 参数，to 的字符串写法 -->
     <router-link to="/home/message/detail/666/你好">跳转</router-link>
     
     <!-- 跳转并携带 params 参数，to 的对象写法 -->
     <router-link 
      :to="{
       name:'xiangqing',
       params: {
        id: 666,
        title: '你好'
       }
      }"
     >跳转</router-link>
     ```

     **特别注意：路由携带`params`参数时，若使用`to`的对象写法，则不能使用`path`配置项，必须使用`name`配置！**
  
  3. 接受参数
  
     ```js
     $route.params.id
     $route.params.title
     ```
  
     params 和 query 的区别
        - params 参数：属于路径当中的一部分，在配置路由的时候，需要占位
        - query 参数：不属于路径当中的一部分，类似于 ajax 中的 queryString，不需要占位

### 路由的 props 配置

作用：让路由组件更方便的收到参数

```js
{
 name; 'xiangqing',
 path: 'detail/id',
 componnet: Detail,
 
 // 第一种写法：props 值为对象，该对象中所有的 key-value 的组合最终都会通过 props 传给 Detail 组件
 // props: {a: 900}

 // 第二种写法：props 值为布尔值，布尔值为 true，则把路由收到的所有 params 参数通过 props 传给 Detail 组件
 // props: true
 
 // 第三种写法；props 值为函数，该函数返回的对象中每一组 key-value 都会通过 props 传给 Detail 组件
 props($route) {
  return {
   id: $route.query.id,
   title: $route.query.title
  }
 }
}
```

```js
// 组件中接受参数

props: ['id', 'title'],
```

### router-link 标签的 replace 属性

  1. 作用：控制路由跳转时操作浏览器历史记录的模式。

  2. 浏览器的历史记录有两种写入方式：分别为`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录，路由跳转时候默认为`push`。

  3. 开启`replace`模式：`<router-link replace … >News</router-link>`

### 编程式路由导航

  1. 作用：不借助`<router-link>`实现路由跳转，让路由跳转更加灵活。
  
  2. 具体编码：
  
     ```js
     // $router 的两个 API
     //    字符串形式
     this.$router.push("/xiangqing/666/你好")
     //    对象形式
     this.$router.push({
      name:'xiangqing',
      params: {
       id: 666,
       title: '你好'
      }
     })
  
     this.$router.replace({
      name:'xiangqing',
      params: {
       id: 666,
       title: '你好'
      }
     })
  
     this.$router.forward() // 前进
     this.$router.back() // 后退
     this.$router.go(3) // 前进 3 步
     ```

### 缓存路由组件

  1. 作用：让不展示的路由组件保持挂载，不被销毁。
  
  2. 具体编码：
  
     ```html
     <keep-alive include="News">  <!-- News 为组件名 -->
         <router-view></router-view>
     </keep-alive>
     ```

### 两个新的生命周期钩子

  1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
  
  2. 具体名字：
  
     1. `activated`路由组件被激活时触发。
  
     2. `deactivated`路由组件未激活时触发。

### 导航守卫

  1. 作用：对路由进行权限控制。
  
  2. 分类：全局守卫、路由独享的守卫、组件内的守卫
  
  3. 全局守卫
  
     ```js
     // 全局前置守卫，初始化时执行，每次路由切换前执行
     router.beforeEach((to,from,next) => {
      if(to.meta.isAuth) { // 判断当前路由是否需要进行权限控制
       if(localStorage.getItem('school') === 'atguigu') {
        next(); // 放行
       } else {
        alert('暂无权限查看')
       }
      } else {
       next()
      }
     })
  
     // 全局后置守卫，初始化时执行，每次路由切换后执行
     router.afterEach((to,from) => {
      if(to.meta.title) {
       document.title = to.meta.title;
      } else {
       document.title = 'demo';
      }
     })
     ```
  
  4. 路由独享的守卫
  
     ```js
     children:[
      {
       name: 'xinwen',
       path： 'news',
       component: News,
       meta: {isAuth:true,title:'新闻'},
       beforeEnter(to,from,next) {
        if(to.meta.isAuth) { // 判断当前路由是否需要进行权限控制
         if(localStorage.getItem('school') === 'atguigu') {
          next(); // 放行
         } else {
          alert('暂无权限查看')
         }
        } else {
         next()
        }
       }
      }
     ]
     ```
  
  5. 组件内守卫
  
     ```js
     methods: {
      // 进入守卫，通过路由规则，进入该组件时被调用
      beforeRouteEnter(to,from,next) {
       if(to.meta.isAuth) { // 判断当前路由是否需要进行权限控制
        if(localStorage.getItem('school') === 'atguigu') {
         next(); // 放行
        } else {
         alert('暂无权限查看')
        }
       } else {
        next()
       }
      },
      // 离开守卫，通过路由规则，离开该组件时被调用
      beforeRouteLeave(to,from,next) {
       next()
      },
     }
     ```

### 路由器的两种工作模式

  1. 对于一个 url 来说，什么是 hash 值？  **#及其后面的内容就是 hash 值**。
  
  2. hash 值不会包含在 HTTP 请求中，即：hash 值不会带给服务器。
  
  3. hash 模式：
  
     1. 地址中永远带着#号，不美观。
  
     2. 若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记为不合法。
  
     3. 兼容性较好。
  
  4. history 模式：
  
     1. 地址干净，美观。
  
     2. 兼容性和 hash 模式相比略差。
  
     3. 应用部署上线时需要后端人员支持，解决刷新页面服务器 404 的问题。

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
