---
title: 面试题_JS
permalink: /interview_questions_JS/
---

## 数据类型

### 1. `Object.is(value1, value2)` 与比较操作符 “ === ”、” == “ 的区别？

- 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。

- 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。

- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。

  ```js
  console.log(-0 === +0); // true 
  console.log(NaN === NaN); // false
  console.log(Object.is(-0, +0)); // false
  console.log(Object.is(NaN, NaN)); // true 
  ```

### 2. 如何判断一个对象是空对象？

- `console.log(JSON.stringify({}) == '{}'); // true`
- `console.log(Object.keys({}).length <= 0); // true`

### 3. 0.1 + 0.2 != 0.3

现象：

```js
console.log(0.1 + 0.2); // => 0.30000000000000004
```

原因：

我们在对浮点数进行运算的过程中，需要将十进制转换成二进制。十进制小数转为二进制的规则如下：

> 对小数点以后的数乘以 2，取结果的整数部分（不是 1 就是 0），然后再用小数部分再乘以 2，再取结果的整数部分……以此类推，直到小数部分为 0 或者位数已经够了就 OK 了。然后把取的整数部分按先后次序排列

根据上面的规则，最后 0.1 的表示如下：

`0.000110011001100110011（0011 无限循环）……`

所以说，精度丢失并不是语言的问题，而是浮点数存储本身固有的缺陷。

JavaScript 是以 64 位双精度浮点数存储所有 Number 类型值，按照 IEEE754 规范，0.1 的二进制数只保留 52 位有效数字，即

`1.100110011001100110011001100110011001100110011001101 * 2^(-4)`

同理，0.2 的二进制数为

`1.100110011001100110011001100110011001100110011001101 * 2^(-3)`

这样在进制之间的转换中精度已经损失。运算的时候如下

```js
0.00011001100110011001100110011001100110011001100110011010
+0.00110011001100110011001100110011001100110011001100110100
------------------------------------------------------------
=0.01001100110011001100110011001100110011001100110011001110
```

所以导致了最后的计算结果中 `0.1 + 0.2 !== 0.3`

解决方案：

- 将数字转成整数

  ```js
  function add(num1, num2) {
   const num1Digits = (num1.toString().split('.')[1] || '').length;
   const num2Digits = (num2.toString().split('.')[1] || '').length;
   const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
   return (num1 * baseNum + num2 * baseNum) / baseNum;
  }
  ```

- ES6 在 Number 对象上新增了一个极小的常量`Number.EPSILON`

  ```js
  Number.EPSILON
  // 2.220446049250313e-16
  Number.EPSILON.toFixed(20)
  // "0.00000000000000022204"
  ```

  引入一个这么小的量，目的在于为浮点数计算设置一个误差范围，如果误差能够小于 Number.EPSILON，我们就可以认为结果是可靠的。

  ```js
  function withinErrorMargin (left, right) {
      return Math.abs(left - right) < Number.EPSILON
  }
  withinErrorMargin(0.1+0.2, 0.3)
  ```

### 4. 引用类型和包装类型的区别？

引用类型和包装类型的主要区别就是对象的生存期，使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中，而自基本类型则只存在于一行代码的执行瞬间，然后立即被销毁，这意味着我们不能在运行时为基本类型添加属性和方法。

## JS 基础

### 1. Map 和 Object 的区别

- 同名碰撞

  对象其实就是在堆开辟了一块内存，其实 Map 的键存的就是这块内存的地址。只要地址不一样，就是两个不同的键，这就解决了同名属性的碰撞问题，而传统的 Object 显然做不到这一点。

  ```js
  let m = new Map();
  m.set({}, 1);
  m.set({}, 2);
  console.log(m); // Map { {} => 1, {} => 2 }
  
  let o = new Object();
  o['a'] = 1;
  o['a'] = 2;
  console.log(o); // { a: 2 }
  ```

- 键的类型

  - Map 的键可以是任意值，包括函数、对象或任意基本类型。

  - Object 的键必须是 String 或是 Symbol。

- 键的顺序

  - Map 中的 key 是有序的。因此，当迭代的时候， Map 对象以插入的顺序返回键值。

  - Object 的键是无序的

- Size

  - Map 的键值对个数可以轻易地通过 size 属性获取

  - Object 的键值对个数只能手动计算

- 迭代

  - Map 是 iterable 的，所以可以直接被迭代，可用 for...of 遍历

  - Object 不是 iterable，不可以被迭代，不能用 for...of 遍历

### 2. JavaScript 类数组对象的定义？

一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length 属性值，代表可接收的参数个数。

- 常见的类数组转换为数组的方法：

  - `Array.prototype.slice.call(arrayLike);`：通过 call 调用数组的 slice 方法来实现转换

  - `Array.prototype.splice.call(arrayLike, 0);`：通过 call 调用数组的 splice 方法来实现转换

  - `Array.prototype.concat.apply([], arrayLike);`：通过 apply 调用数组的 concat 方法来实现转换

  - `Array.from(arrayLike);`：通过 Array.from 方法来实现转换

    `Array.from()` 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

  - 使用展开运算符将类数组转化成数组

### 3. 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组？

  arguments 是一个对象，它的属性是从 0 开始依次递增的数字，还有 callee 和 length 等属性，与数组相似；但是它却没有数组常见的方法属性，如 forEach, reduce 等，所以叫它们类数组。

  遍历类数组：

- 使用 call 和 apply 方法。

   ```js
   function foo() {
     Array.prototype.forEach.call(arguments, e => console.log(e));
   }
   ```

- Array.from 方法将类数组转化成数组。

  ```js
  function foo() {
    const arrArgs = Array.from(arguments);
    arrArgs.forEach( e => console.log(e));
  }
  ```

- 使用展开运算符将类数组转化成数组。

  ```js
  function foo() {
    const arrArgs = [...arguments];
    arrArgs.forEach( e => console.log(e));
  }
  ```

### 4. Unicode、UTF-8、UTF-16、UTF-32 的区别？

- Unicode 是编码字符集（字符集），而 UTF-8、UTF-16、UTF-32 是字符集编码（编码规则）；

- UTF-16 使用变长码元序列的编码方式，相较于定长码元序列的 UTF-32 算法更复杂，甚至比同样是变长码元序列的 UTF-8 也更为复杂，因为其引入了独特的代理对这样的代理机制；

- UTF-8 需要判断每个字节中的开头标志信息，所以如果某个字节在传送过程中出错了，就会导致后面的字节也会解析出错；而 UTF-16 不会判断开头标志，即使错也只会错一个字符，所以容错能力教强；

- 如果字符内容全部英文或英文与其他文字混合，但英文占绝大部分，那么用 UTF-8 就比 UTF-16 节省了很多空间；而如果字符内容全部是中文这样类似的字符或者混合字符中中文占绝大多数，那么 UTF-16 就占优势了，可以节省很多空间。

### 5. ES6 模块与 CommonJS 模块有什么异同？

- 不同点：

  - 1.CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

  - 2.CommonJS 模块的 require() 是同步加载模块，ES6 模块的 import 命令是异步加载。

  - 3.CommonJS 是对模块的浅拷贝，ES6 Module 是对模块的引入，即 ES6 Module 只存只读，不能改变其值，具体点就是指针指向不能变，类似 const 。

  - 4.import 的接口是 read-only（只读状态），不能修改其变量值。 即不能修改其变量的指针指向，但可以改变变量内部指针指向。可以对 commonJS 重新赋值（改变指针指向），但是对 ES6 Module 赋值会编译报错。

- 相同点：

  - CommonJS 和 ES6 Module 都可以对引⼊的对象进⾏赋值，即对对象内部属性的值进⾏改变。

### 6. for...in 和 for...of 的区别？

- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链
  > for…of 是 ES6 新增的遍历方式，允许遍历一个含有 iterator 接口的数据结构（数组、字符串、Map、Set、类数组对象【伪数组】等，注意：对象没有 iterator）并且返回各项的值
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性（包括原型链上可枚举的属性），for…of 只返回数组的下标对应的属性值

### 7. 如何实现深拷贝？

- `JSON.stringify()`

  JSON.parse(JSON.stringify(obj)) 是目前比较常用的深拷贝方法之一，它的原理就是利用 JSON.stringify 将 js 对象序列化（JSON 字符串），再使用 JSON.parse 来反序列化（还原）js 对象。

  这个方法可以简单粗暴的实现深拷贝，但是还存在问题，拷贝的对象中如果有函数，undefined，symbol，当使用过 JSON.stringify() 进行处理之后，都会消失。

  ```js
  let obj1 = { a: 1 };
  let obj2 = JSON.parse(JSON.stringify(obj1));
  console.log(obj1 === obj2); // false
  ```

- 函数库 lodash 的_.cloneDeep() 方法

- 手写实现深拷贝函数

  ```js
  function deepCopy(obj) {
    if(!obj || typeof obj !== "object") return;
    let newObj = Array.isArray(obj) ? [] : {};
    for(key in obj) {
      if(obj.hasOwnProperty(key)){
        newObj[key] =
          typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
      }
    }
    return newObj;
  }
  ```

### 8. `(a == 1 && a == 2 && a == 3)`有可能是 true 吗？

- 方案一：重写 toString() 或 valueOf()

  ```js
  let a = {  
      i: 1,  
      toString: function () {    
          return a.i++;  
      }
  }
  console.log(a == 1 && a == 2 && a == 3); // true
  ```

- 方案二：数组

  数组的 toString 接口默认调用数组的 join 方法，重写 join 方法。定义 a 为数字，每次比较时就会调用 toString() 方法，我们把数组的 shift 方法覆盖 toString 即可：

  ```js
  let a = [1,2,3];
  a.toString = a.shift;
  console.log(a == 1 && a == 2 && a == 3); // true
  ```

  当然把 toString 改为 valueOf 也是一样效果：

  ```js
  let a = [1,2,3];
  a. valueOf  = a.shift;
  console.log(a == 1 && a == 2 && a == 3); // true
  ```

- 方案三：使用 Object.defineProperty()

  Object.defineProperty() 用于定义对象中的属性，接收三个参数：object 对象、对象中的属性，属性描述符。属性描述符中 get: 访问该属性时自动调用。

  ```js
  var  _a = 1;
  Object.defineProperty(this,'a',{  
      get:function(){    
          return _a++  
      }
  })
  console.log(a===1 && a===2 && a===3)//true
  ```

## 异步编程

### 1. 什么是回调函数？回调函数有什么缺点？如何解决回调地狱问题？

- 回调函数是一个作为变量传递给另一个函数的函数，它在主体函数执行完之后再执行

- 缺点：

  - 回调函数有一个致命的弱点，就是容易写出回调地狱（Callback hell）。层层嵌套的回调函数的操作叫做回调地狱。

  - 不能使用 try catch 捕获错误

  - 不能直接 return

- 如何解决回调地狱问题：

  - Promise

  - async/await
