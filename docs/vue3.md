---
title: Vue3
permalink: /vue3/
---

## 常用 Composition API

### 1. setup

1. setup 是 Vue3.0 中一个新的配置项，值为一个函数。
2. setup 是所有 Composition API（组合 API）“表演的舞台“。
3. 组件中所用到的：数据、方法等，均要配置在 setup 中。
4. setup 函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法，在模板中均可以直接使用。（重点关注）
   2. 若返回一个渲染函数：则可以自定义渲染内容。（了解）

       ```js
       import { h } from "vue";

       export default {
        name: "App";

        setup() {
          return () => h("h1", "setup 返回一个渲染函数。");
        }
       }
       ```

5. 注意：
   1. 尽量不要与 Vue2.x 配置混用
      - Vue2.x 配置（data、methods、computed...）中**可以访问到** setup 中的属性、方法。
      - 但在 setup 中**不能访问到** Vue2.x 配置（data、methods、computed...）。
      - 如果有重名，setup 优先。
   2. setup 可以返回一个 Promise 实例，但需要 Suspense 和异步组件的配合。

### 2. ref 函数

- 作用：定义一个响应式的数据
- 语法：`const xxx = ref(initValue)`
  - 创建一个包含响应式数据的**引用对象（reference 对象，简称 ref 对象）**
  - JS 中操作数据：`xxx.value`
  - 模板中读取数据：不需要 .value，直接`<div>{{xxx}}</div>`
- 备注：
  - 接收的数据可以是：基本类型，也可以是对象类型。
  - 基本类型的数据：响应式依然是靠`Object.defineProperty()`的`get`与`set`完成的。
  - 对象类型的数据：内部“求助”了 Vue3.0 中的一个新函数 -- `reactive`函数。

### 3. reactive 函数

- 作用：定义一个**对象类型**的响应式数据（基本类型别用它，用`ref`函数）
- 语法：`const 代理对象 = reactive(被代理的对象)`接受一个对象（或数组），返回一个**代理器对象（Proxy 的实例对象，简称 Proxy 对象）**
- reactive 定义的响应式数据是“深层次的“。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的。

### 4. Vue3.0 中的响应式原理

- 实现原理
  - 通过 Proxy（代理）：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的删除等。
  - 通过 Reflect（反射）：对被代理对象的属性进行操作。

### 5. reactive 对比 ref

- 从定义数据角度对比：
  - ref 用来定义：**基本数据类型**。
  - reactive 用来定义：**对象（或数组）类型数据**。
  - 备注：ref 也可以用来定义**对象（或数组）类型数据**，它内部会自动通过 reactive 转为**代理对象**。
- 从原理角度对比：
  - ref 通过`Object.defineProperty()`的 get 和 set 来实现响应式（数据劫持）。
  - reactive 通过使用 Proxy 来实现响应式（数据劫持），并通过 Reflect 操作**源对象**内部的数据。
- 从使用角度对比：
  - ref 定义的数据：操作数据需要 .value，读取数据时模板中直接读取**不需要** .value。
  - reactive 定义的数据：操作数据与读取数据**均不需要** .value。

### 6. setup 的两个注意点

- setup 执行的时机
  - 在 beforeCreate 之前执行一次，this 是 undifined。
- setup 的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接受了的属性。
  - context：上下文对象
    - attrs：值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性，相当于`this.$attrs`。
    - slots：收到的插槽内容，相当于`this.$slots`。
    - emit：分发自定义事件的函数，相当于`this.$emit`。

### 7. 计算属性与监视

1. computed 函数
   - 与 Vue2.x 中 computed 配置功能一致
   - 写法

      ```js
      import { computed } from 'vue'

      setup() {
        ...
        // 计算属性 -- 简写
        let fullName = computed(() => {
          return person.firstName + " " + person.lastName;
        });

        // 计算属性 -- 完整
        let fullName = computed({
          get(){
            return person.firstName + " " + person.lastName;
          },
          set(value) {
            const nameArr = value.split(" ");
            person.firstName = nameArr[0];
            person.lastName = nameArr[1];
          }
        });
      }
      ```

2. watch 函数

- 与 Vue2.x 中 watch 配置功能一致
- 注意：
  - 监视 reactive 定义的响应式数据时：oldValue 无法正确获取、强制开启了深度监视（deep 配置无效）
  - 监视 reactive 定义的响应式数据中某个属性（该属性为对象）时：deep 配置有效。

  ```js
  let sum = ref(0);
  let msg = ref("hello");
  let person = reactive({
    name: "zhang",
    age: 18,
    job: {
      j1: {
        salary: 20,
      }
    }
  });
  let p2 = ref({
    name: "li",
    age: 18,
  });

  // 情况一：监视 ref 定义的响应式数据
  watch(sum, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  }, { immediate: true });

  // 情况二：监视多个 ref 定义的响应式数据
  watch([sum, msg], (newValue, oldValue) => {
    console.log(newValue, oldValue);
  });

  // 监视 ref 定义的对象类型数据
  watch(p2.value, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  });
  watch(p2, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  }, { deep: true });

  /* 情况三：监视 reactive 定义的响应式数据
      若 watch 监视的是 reactive 定义的响应式数据，则无法正确获得 oldValue
      若 watch 监视的是 reactive 定义的响应式数据，则强制开启了深度监视
  */
  watch(person, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  }, { immediate: true, deep: false }); // 此处 deep 的配置无效

  // 情况四：监视 reactive 定义的响应式数据中的某个属性
  watch(() => person.name, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  }, { immediate: true, deep:true });

  // 情况五：监视 reactive 所定义的一个响应式数据中的某些属性
  watch([ () => person.name, () => person.age ], (newValue, oldValue) => {
    console.log(newValue, oldValue);
  }, { immediate: true, deep:true });

  // 特殊情况
  watch(() => person.job, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  }, { deep:true }); // 此处由于监视的是 reactive 所定义的对象中的某个属性，所以 deep 配置有效
  ```

3. watchEffect 函数

   - watch 的套路是：既要指明监视的属性，也要指明监视的回调。
   - watchEffect 的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。
   - watchEffect 有点像 computed：
     - 但 computed 注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
     - 而 watchEffect 更注重的是过程（回调函数的函数体），所以不用写返回值。

   ```js
   // watchEffect 所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
   watchEffect(() => {
    const x1 = sum.value;
    const x2 = person.age;
    console.log("watchEffect配置的回调执行了");
   });
   ```

### 9. 自定义 hook 函数

- 什么是 hook？-- 本质上是一个函数，把 setup 函数中使用的 Composition API 进行了封装。
- 类似于 Vue2.x 中的 mixin。
- 自定义 hook 的优势：复用代码，让 setup 中的逻辑更清楚易懂。

### 10. toRef

- 作用：创建一个 ref 对象，其 value 值指向另一个对象中的某个属性。
- 语法：`const name = toRef(person, 'name')`
- 应用：要将响应式对象中的某个属性单独提供给外部使用时。
- 拓展：`toRefs` 与 `toRef` 功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`

## 其他 Composition API

### 1. shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理。
- 什么时候使用？
  - 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ===> shallowReactive。
  - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象来替换（意思是直接修改属性，数据不变，用新对象替换，数据会变成新对象） ===> shallowRef。

### 2. readonly 与 shallowReadonly

- readonly：让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景：不希望数据被修改时。

### 3. toRaw 与 markRaw

- toRaw：
  - 作用：将一个由`reactive`生成的**响应式对象**转为**普通对象**（传入由 ref 生成的响应式对象，toRaw 会返回 undifined）。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景：
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

### 4. customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。
- 实现防抖效果：

   ```html
   <template>
    <input type="text" v-model="keyword">
    <h3>{{keyword}}</h3>
   </template>

   <script>
    import { ref, customRef } from 'vue';

    export default {
      name: 'Demo',
      setup() {
        // 自定义一个 ref
        function myRef(value, delay) {
          let timer;
          return customRef((track, trigger) => {
            return {
              get() {
                track(); // 通知 Vue 追踪 value 的变化
                return value;
              },
              set(newValue) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                 value = newValue;
                 trigger(); // 通知 Vue 去重新解析模板 
                }, delay);
              }
            }
          });
        }
      }

      let keyword = myRef('hello', 500);

      return { keyword };
    }
   </script>
   ```

### 5. provide 与 inject

- 作用：实现**祖与后代组件间**通信。
- 套路：父组件有一个`provide`选项来提供数据，子组件有一个`inject`选项来开始使用这些数据。
- 具体写法：
   1. 祖组件中：

       ```js
       setup() {
        ...
        let car = reactive({ name: 'benz', price: '40w' });
        provide('car', car);
       }
       ```

   2. 后代组件中：

       ```js
       setup(props, context) {
        ...
        const car = inject('car');
        return { car };
        ...
       }
       ```

### 6. 响应式数据的判断

- `isRef`：检查一个值是否为一个 ref 对象。
- `isReactive`：检查一个对象是否由`reactive`创建的响应式代理。
- `isReadonly`：检查一个对象是否由`reactive`创建的只读代理。
- `isProxy`：检查一个对象是否由`reactive`或`readonly`方法创建的代理。

## 新的组件

### 1. Fragment

- 在 Vue2 中：组件必须要有一个根标签。
- 在 Vue3 中：组件可以么有根标签，内部会将多个标签包含在一个 Fragment 虚拟元素中。
- 好处：减少标签层级，减小内存占用。

### 2. Teleport

- 什么是 Teleport？-- `Teleport` 是一种能够将我们的**组件 html 结构**移动到指定位置的技术。

   ```html
   <teleport to="移动位置">
    <div>
    </div>
   </teleport>
   ```

### 3. Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验。
- 使用步骤：
  - 异步引用组件

     ```js
     import { defineAsyncComponent } from 'vue'
     const Child = defineAsyncComponent(() => import('./components/Child.vue'));
     ```

  - 使用 `Suspense` 包裹组件，并配置好 `default` 和 `fallbak`

     ```html
     <template>
       <div class="app">
         <h3>App组件</h3>
         <Suspense>
           <template v-slot:default>
             <Child />
           </template>
           <template v-slot:fallback>
             <h3>加载中。。。</h3>
           </template>
         </Suspense>
       </div>
     </template>
     ```
