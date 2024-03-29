---
title: 面试题_CSS
permalink: /interview_questions_CSS/
---
[[TOC]]

## CSS 基础

### 1. CSS 中可继承与不可继承属性有哪些？

- 不可继承属性：

  - display：元素的显示模式（块级、行内元素、行内块）

  - 文本属性：

    - vertical-align：垂直对齐方式

    - text-decoration：规定添加到文本的装饰（underline-line、line-through、overline）

    - text-shadow：文本阴影效果

    - white-space：空白符的处理

    - unicode-bidi：设置文本的方向

  - 盒子模型的属性

    - margin、padding、border、width、height

  - 背景属性

    - background、background-color、background-image、background-repeat、background-position、background-attachment

  - 定位属性

    - float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index

  - 生成内容属性

    - content、counter-reset、counter-increment

  - 轮廓样式属性

    - outline-style、outline-width、outline-color、outline

  - 页面样式属性

    - size、page-break-before、page-break-after

  - 声音样式属性

    - pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

- 可继承属性

  - 字体属性

    - font-family、font-size、font-weight、font-style

  - 文本属性

    - text-align、text-indent、line-height、word-spacing、letter-spacing、text-transform、color

  - 元素可见性

    - visibility：控制元素显示隐藏

  - 列表布局属性

    - list-style：列表风格，包括 list-style-type、list-style-image 等

  - 光标属性

    - cursor：光标显示为何种形态

### 2. link 和@import 的区别

- link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务；@import 属于 CSS 范畴，只能加载 CSS。

- link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载。

- link 是 XHTML 标签，无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持。

### 3. li 与 li 之间有看不见的空白间隔是什么原因引起的？如何解决？

- 原因：浏览器会把 inline 内联元素间的空白字符（空格、换行、Tab 等）渲染成一个空格。为了美观，通常是一个 `<li>` 放在一行，这导致 `<li>` 换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。

- 解决办法：

  - 为 `<li>` 设置 `float:left`。不足：有些容器是不能设置浮动，如左右切换的焦点图等。

  - 将所有 `<li>` 写在同一行。不足：代码不美观。

  - 将 `<ul>` 内的字符尺寸直接设为 0，即 `font-size:0`。不足： `<ul>`中的其他字符尺寸也被设为 0，需要额外重新设定其他字符尺寸，且在 Safari 浏览器依然会出现空白间隔。

  - 消除 `<ul>` 的字符间隔 `letter-spacing:-8px`。不足：这也设置了 `<li>` 内的字符间隔，因此需要将 `<li>` 内的字符间隔设为默认 `letter-spacing:normal`。

### 4. display:inline-block 什么时候会显示间隙？

- 有空格时会有间隙，可以删除空格解决；
- margin 正值时，可以让 margin 使用负值解决；
- 使用 font-size 时，可通过设置 font-size:0、letter-spacing（字母间距）、word-spacing（单词间距，中文无效）解决；

### 5. CSS 优化和提高性能的方法有哪些？

- 加载性能

  - css 压缩：将写好的 css 进行打包压缩，可以减小文件体积。

  - css 单一样式：当需要下边距和左边距的时候，很多时候会选择使用 margin:top 0 bottom 0；但 margin-bottom:bottom;margin-left:left; 执行效率会更高。

  - 减少使用 @import，建议使用 link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。

- 选择器性能

  - 关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS 选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；

  - 如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。

  - 避免使用通配规则，如 *{} 计算次数惊人，只对需要用到的元素进行选择。

  - 尽量少的去对标签进行选择，而是用 class。

  - 尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。

  - 了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。

- 渲染性能

  - 慎重使用高性能属性：浮动、定位。

  - 尽量减少页面重排、重绘。

  - 去除空规则：｛｝。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少 css 文档体积。

  - 属性值为 0 时，不加单位。

  - 属性值为浮动小数 0.**，可以省略小数点之前的 0。

  - 标准化各种浏览器前缀：带浏览器前缀的在前。标准属性在后。

  - 不使用 @import 前缀，它会影响 css 的加载速度。

  - 选择器优化嵌套，尽量避免层级过深。

  - css 雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。

  - 正确使用 display 的属性，由于 display 的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。

  - 不滥用 web 字体。对于中文网站来说 WebFonts 可能很陌生，国外却很流行。WebFonts 通常体积庞大，而且一些浏览器在下载 WebFonts 时会阻塞页面渲染损伤性能。

- 可维护性

  - 将具有相同属性的样式抽离出来，整合并通过 class 在页面中进行使用，提高 css 的可维护性。

  - 样式与内容分离：将 css 代码定义到外部 css 中。

### 6. 单行、多行文本溢出隐藏

- 单行文本溢出隐藏

  - `white-space: nowrap;`
  - `overflow: hidden;`
  - `text-hidden: ellipsis;`

- 多行文本溢出隐藏

  - `overflow: hidden;`
  - `text-hidden: ellipsis;`
  - `display: -webkit-box;`（作为弹性伸缩盒子模型显示）
  - `-webkit-box-orient: vertical;` （ 设置伸缩盒子的子元素排列方式：从上到下垂直排列）
  - `-webkit-line-clamp: 3;`（显示的行数）

### 7. 对 CSS 工程化的理解？

- CSS 工程化是为了解决以下问题：

  - 宏观设计：CSS 代码如何组织、如何拆分、模块结构怎样设计？

  - 编码优化：怎样写出更好的 CSS？

  - 构建：如何处理我的 CSS，才能让它的打包结果最优？

  - 可维护性：代码写完了，如何最小化它后续的变更成本？如何确保任何一个同事都能轻松接手？

- 以下三个方向都是时下比较流行的、普适性非常好的 CSS 工程化实践：

  - 预处理器：Less、 Sass 等；

  - 重要的工程化插件： PostCss；

  - Webpack loader 等 。

基于这三个方向，可以衍生出一些具有典型意义的子问题，这里我们逐个来看：

- 预处理器：为什么要用预处理器？它的出现是为了解决什么问题？

   预处理器，其实就是 CSS 世界的“轮子”。预处理器支持我们写一种类似 CSS、但实际并不是 CSS 的语言，然后把它编译成 CSS 代码。

   那为什么写 CSS 代码写得好好的，偏偏要转去写“类 CSS”呢？这就和本来用 JS 也可以实现所有功能，但最后却写 React 的 jsx 或者 Vue 的模板语法一样——为了爽！要想知道有了预处理器有多爽，首先要知道的是传统 CSS 有多不爽。随着前端业务复杂度的提高，前端工程中对 CSS 提出了以下的诉求：
   1. 宏观设计上：我们希望能优化 CSS 文件的目录结构，对现有的 CSS 文件实现复用；
   2. 编码优化上：我们希望能写出结构清晰、简明易懂的 CSS，需要它具有一目了然的嵌套层级关系，而不是无差别的一铺到底写法；我们希望它具有变量特征、计算能力、循环能力等等更强的可编程性，这样我们可以少写一些无用的代码；
   3. 可维护性上：更强的可编程性意味着更优质的代码结构，实现复用意味着更简单的目录结构和更强的拓展能力，这两点如果能做到，自然会带来更强的可维护性。
   这三点是传统 CSS 所做不到的，也正是预处理器所解决掉的问题。预处理器普遍会具备这样的特性：
      - 嵌套代码的能力，通过嵌套来反映不同 css 属性之间的层级关系 ；
      - 支持定义 css 变量；
      - 提供计算函数；
      - 允许对代码片段进行 extend 和 mixin；
      - 支持循环语句的使用；
      - 支持将 CSS 文件模块化，实现复用。
- PostCss：PostCss 是如何工作的？我们在什么场景下会使用 PostCss？

   PostCss 仍然是一个对 CSS 进行解析和处理的工具，它会对 CSS 做这样的事情：

   它和预处理器的不同就在于，预处理器处理的是类CSS，而 PostCss 处理的就是 CSS 本身。Babel 可以将高版本的 JS 代码转换为低版本的 JS 代码。PostCss 做的是类似的事情：它可以编译尚未被浏览器广泛支持的先进的 CSS 语法，还可以自动为一些需要额外兼容的语法增加前缀。更强的是，由于 PostCss 有着强大的插件机制，支持各种各样的扩展，极大地强化了 CSS 的能力。
   PostCss 在业务中的使用场景非常多：
  - 提高 CSS 代码的可读性：PostCss 其实可以做类似预处理器能做的工作；
  - 当我们的 CSS 代码需要适配低版本浏览器时，PostCss 的 Autoprefixer 插件可以帮助我们自动增加浏览器前缀；
  - 允许我们编写面向未来的 CSS：PostCss 能够帮助我们编译 CSS next 代码；
- Webpack 能处理 CSS 吗？如何实现？

   Webpack 能处理 CSS 吗：
  - Webpack 在裸奔的状态下，是不能处理 CSS 的，Webpack 本身是一个面向 JavaScript 且只能处理 JavaScript 代码的模块化打包工具；
  - Webpack 在 loader 的辅助下，是可以处理 CSS 的。

   如何用 Webpack 实现对 CSS 的处理：
  - Webpack 中操作 CSS 需要使用的两个关键的 loader：css-loader 和 style-loader
  - 注意，答出“用什么”有时候可能还不够，面试官会怀疑你是不是在背答案，所以你还需要了解每个 loader 都做了什么事情：
    - css-loader：导入 CSS 模块，对 CSS 代码进行编译处理；
    - style-loader：创建style标签，把 CSS 内容写入标签。

  在实际使用中，css-loader 的执行顺序一定要安排在 style-loader 的前面。因为只有完成了编译过程，才可以对 css 代码进行插入；若提前插入了未编译的代码，那么 webpack 是无法理解这坨东西的，它会无情报错。

### 8. z-index 属性在什么情况下会失效？

- 通常 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。z-index 值越大就越是在上层。z-index 元素的 position 属性需要是 relative，absolute 或是 fixed。

- z-index 属性在下列情况下会失效：

  - 父元素 position 为 relative 时，子元素的 z-index 失效。解决：父元素 position 改为 absolute 或 static；

  - 元素没有设置 position 属性为非 static 属性，解决：设置该元素的 position 属性为 relative，absolute 或是 fixed 中的一种；

  - 元素在设置 z-index 的同时还设置了 float 浮动。解决：float 去除，改为 `display: inline-block;`

### 9. 常见的图片格式及使用场景

1. JPG：
   - 概述：扩展名为 .jpg 或 .jpeg ，是一种**有损**的压缩格式（把肉眼不容易观察出来的细节丢弃了）。
   - 主要特点：**支持的颜色丰富**、**占用空间较小**、不支持透明背景、不支持动态图。
   - 使用场景：**对图片细节没有极高要求**的场景，例如：网站的产品宣传图等 。
2. PNG：
   - 概述：扩展名为 .png ，是一种**无损**的压缩格式，能够更高质量的保存图片。
   - 主要特点：**支持的颜色丰富**、占用空间略大、**支持透明背景**、不支持动态图。
   - 使用场景：1，**想让图片有透明背景**；2，**想更高质量的呈现图片**；例如 ：公司 logo 图、重要配图等。
3. BMP：
   - 概述：扩展名为 .bmp ，**不进行压缩**的一种格式，在最大程度上保留图片更多的细节。
   - 主要特点：**支持的颜色丰富**、**保留的细节更多**、占用空间极大、不支持透明背景、不支持动
   - 态图。
   - 使用场景：**对图片细节要求极高**的场景，例如：一些大型游戏中的图片 。（网页中很少使
用）
4. GIF：
   - 概述：扩展名为 .gif ，仅支持256种颜色，色彩呈现不是很完整。
   - 主要特点：支持的颜色较少、**占用空间小**、**支持简单透明背景**、**支持动态图**。
   - 使用场景：网页中的动态图片。
5. WebP：
   - 概述：扩展名为 .webp ，谷歌推出的一种格式，专门用来在网页中呈现图片。
   - 主要特点：具备上述几种格式的优点，但兼容性不太好，一旦使用务必要解决兼容性问题。
      - 在无损压缩的情况下，相同质量的 WebP 图片，文件大小要比 PNG 小 26%；
      - 在有损压缩的情况下，具有相同图片精度的 WebP 图片，文件大小要比 JPEG 小 25%~34%；
      - WebP 图片格式支持图片透明度，一个无损压缩的 WebP 图片，如果要支持透明度只需要 22%的格外文件大小。
   - 使用场景：网页中的各种图片。
6. base64 格式：
   - 本质：一串特殊的文本，要通过浏览器打开，传统看图应用通常无法打开。
   - 原理：把图片进行 base64 编码，形成一串文本。
   - 如何生成：靠一些工具或网站。
   - 如何使用：直接作为 img 标签的 src 属性的值即可，并且不受文件位置的影响。
   - 使用场景：一些较小的图片，或者需要和网页一起加载的图片。
7. SVG，是无损的矢量图。SVG 是矢量图意味着 SVG 图片由直线和曲线以及绘制它们的方法组成。当放大 SVG 图片时，看到的还是线和曲线，而不会出现像素点。SVG 图片在放大时，不会失真，所以它适合用来绘制 logo、icon 等。

### 10. 为什么有时候⽤ translate 来改变位置⽽不是定位？

translate 是 transform 属性的⼀个值。改变 transform 或 opacity 不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。⽽改变绝对定位会触发重新布局，进⽽触发重绘和复合。

transform 使浏览器为元素创建⼀个 GPU 图层，但改变绝对定位会使⽤到 CPU。 因此 translate() 更⾼效，可以缩短平滑动画的绘制时间。 ⽽ translate 改变位置时，元素依然会占据其原始空间，绝对定位就不会发⽣这种情况。translate 不会影响其他元素的位置，而绝对定位会脱标，从而影响其他元素的位置。

### 11. 行内块的幽灵空白问题

产生原因：行内块元素与文本的基线对齐，而文本的基线与文本最底端之间是有一定距离的。例如，一个 div 中放一个 img 和一段文字，显示的页面中图片底部会有一小部分空白的地方。

解决方案：

- 给行行内块设置 vertical ，值不为 baseline 即可，设置为 middel 、 bottom 、top 均可。
- 若父元素中只有一张图片，设置图片为`display: block`。
- 给父元素设置`font-size: 0`。如果该行内块内部还有文本，则需单独设置 fontsize 。

## 页面布局

### 1. 水平垂直居中的实现

- 绝对定位 + transform（可以不知道子盒子宽度和高度）

   父亲给一个高度，`position: relative;`

   子盒子`position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`

- 绝对定位 + margin:auto（适用于子盒子有宽度和高度）

   父容器给一个高度，`position: relative;`

   子容器有宽度和高度，`position：absolute; top: 0; right: 0; bottom: 0; left: 0; margin: auto;`

- 绝对定位 + margin 负值（适用于已知子盒子宽度和高度）

   父容器给一个高度，`position: relative;`

   子盒子绝对定位，`top: 50%; left: 50%; margin-top: - 高度/2 px; margin-left: - 宽度/2 px`

- flex 布局

   父容器给一个高度，`display: flex; justify-content: center; align-items: center;`

- flex + margin

   父容器开启 flex 布局，随后子元素设置为：`margin: auto`

- grid 布局

   父容器设置为`display: grid; place-items: center;`

### 2. 水平居中的实现

即让子元素，在父亲中水平居中。

- 若子元素为**行内元素、行内块元素**，给父元素加上：`text-align: center`。

- 若子元素为确定宽度的**块级元素**：

  - 给子元素加上：`margin: 0 auto;`

  - 父元素开启相对定位，子元素设置为：`position: absolute; left: 50%; margin-left: - 宽度/2 px`

- 对于宽度未知的**块级元素**：

  - 使用 table 标签（或者将块级元素设置为`display: table`），再给该标签设置`margin-left: auto; margin-right: auto;`

  - `display: inline-block; text-align: center;`

  - 父元素开启相对定位，子元素设置为：`position: absolute; left: 50%; transform: translateX(-50%);`

### 3. 垂直居中的实现

即让子元素，在父亲中 垂直居中。

- 父盒子设置相对定位，子盒子`position: absolute; top: 0; bottom: 0; margin: auto 0;`

- 父盒子设置相对定位，子盒子`position: absolute; top: 50%; transform: translateY(-50%);`

- 若子元素为块元素，给子元素加上：margin-top，值为：(父元素 content －子元素盒子总高) / 2。

- 若子元素为行内元素、行内块元素，让父元素的 height = line-height ，每个子元素都加上： `vertical-align: middle;`。（若想绝对垂直居中，父元素 font-size 设置为 0 。）

### 4. 两栏布局的实现

一般两栏布局指的是左边一栏宽度固定，右边一栏宽度自适应。

- [左侧浮动 + 右侧 margin-left](../测试代码/css/两栏布局的实现（左侧绝对定位+右侧 margin-left).html)：给父容器一个高度；左边盒子宽度给 200px，高度 100%，左浮动；右边盒子 margin-left：200px，宽度 auto，高度 100%。

- [左侧浮动+右侧 BFC](./测试代码/css/两栏布局的实现（左侧浮动+右侧 BFC).html)：给父容器一个高度，左侧的盒子宽度 200px，高度 100%，左浮动，右侧的盒子高度 100%，overflow：hidden 触发 BFC。

- [flex 布局](./测试代码/css/两栏布局的实现 (flex 布局）.html)：父容器给一个高度，display：flex；左侧盒子给一个宽度 200px，高度 100%，右侧盒子宽度 100%，flex：1。

- [左侧绝对定位+右侧 margin-left](./测试代码/css/两栏布局的实现（左侧浮动+右侧 margin-left).html)：父容器给一个高度，position：relative；左侧盒子给一个宽度 200px，高度 100%，position：absolute，top：0；left：0；右侧盒子 margin-left：200px，高度 100%。

- [右侧绝对定位+右侧定位 left](./测试代码/css/两栏布局的实现（右侧绝对定位+右侧定位 left)%20.html)：父容器给一个高度，position：relative；左侧盒子宽度 200px，高度 100%；右侧盒子高度 100%，position：absolute，top：0；right：0；bottom：0；left：200px；

### 5. 三栏布局的实现

   三栏布局一般指的是页面中一共有三栏，左右两栏宽度固定，中间自适应的布局。

- [左右绝对定位+中间 margin](../测试代码/css/三栏布局的实现（左右绝对定位+中间 margin).html)：给父容器一个高度，position：relative；左侧盒子和右侧盒子宽度 200px，高度 100%，左侧盒子左侧绝对定位，右侧盒子右侧绝对定位（position：absolute）中间盒子高度 100%，margin：0 200px；

- [flex 布局](./测试代码/css/三栏布局的实现 (flex 布局）.html)：父容器给一个高度，display：flex；左侧和右侧盒子高度 100%，宽度 200px；中间盒子高度 100%，flex：1；

- [两侧浮动+中间 margin（中间盒子结构要写在最后）](./测试代码/css/三栏布局的实现（左右绝对定位+中间 margin).html)：父容器给一个高度；左右盒子宽度 200px，高度 100%，左边左浮动，右边右浮动，中间的盒子 margin：0 200px；高度 100%

- [圣杯布局：父盒子 padding+三个盒子浮动+左右盒子相对定位并负边距（中间结构盒子要放在最前边）](./测试代码/css/三栏布局的实现 (（圣杯布局）父盒子 padding+三个盒子浮动+左右盒子相对定位并负边距）.html)

- [双飞翼布局：三个盒子浮动+中间盒子左右 margin 留位+左右负边距（中间结构盒子要放在最前边）](./测试代码/css/三栏布局的实现 (（双飞翼布局）三个盒子浮动+中间盒子左右 margin 留位+左右负边距）.html)

### 6. 品字布局的实现

- [margin： 0 auto；+ 浮动](./测试代码/css/品字布局的实现 (margin 设为 0auto+浮动）.html)：设置三个 div 宽和高，第一个 div margin： 0 auto；后两个 div 浮动使其一行显示，然后通过 margin-left 以及 transform：translate 实现布局，（padding 和 margin 若是百分比则是以父亲的宽度为准）。

- [margin： 0 auto； + inline-block](./测试代码/css/品字布局的实现 (margin 设为 0auto+inline-block).html)：设置三个 div 宽和高，第一个 div margin： 0 auto；后两个 divdisplay：inline-block 使其一行显示，然后通过 margin-left 以及 transform：translate 实现布局，（padding 和 margin 若是百分比则是以父亲的宽度为准）。

### 7. 九宫格布局的实现

- [float](./测试代码/css/九宫格布局的实现 (float).html)：给 ul 设定宽和高（需计算：比如 330\*330），每个 li 宽和高（100*100）并且设置左浮动，每个 limargin-right：10px；margin-bottom：10px；

- [flex](./测试代码/css/九宫格布局的实现 (flex).html)：给 ul 设定宽和高（330\*330），display：flex；flex-wrap：wrap；justify-content：space-around；align-items：center；，每个 li 给定宽和高（100*100）

- [inline-block](./测试代码/css/九宫格布局的实现 (inline-block).html)：给 ul 设定宽和高（需计算：比如 330\*330）每个 li 宽和高（100*100）并且设置 display：inline-block；每个 limargin-right： 10px；margin-bottom：10px；

- [table](./测试代码/css/九宫格布局的实现 (table).html)：给 ul 设定宽高（340\*340），display: table；border-spacing: 10px；每个 li 设置 display: talbe-row，li 里的每个 div 设置 display: table-cell。

### 8. [边框九宫格的实现](./测试代码/css/边框九宫格的实现。html)

### 9. 使用 `display: inline-block;`会产生什么问题？

问题：两个`display: inline-block;`元素并列放在一起，它们之间会产生空格。

产生空格的原因：元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据 CSS 中 white-space 属性的处理方式（默认是 normal，合并多余空白），原来 HTML 代码中的回车换行被转成一个空白符，在字体不为 0 的情况下，空白符占据一定宽度，所以 inline-block 的元素之间就出现了空隙。

解决方案：

- 将子元素标签的结束符和下一个标签的开始符写在同一行或把所有子标签写在同一行。

   ```html
  <div>
    <div>
      左盒子
    </div><div>
      右盒子
    </div>
  </div>
  ```

- 父元素中设置`font-size: 0;`，在子元素上重新设置正确的 font-size。

### 10. margin 负值问题

- margin-top 元素自身会向上移动，同时会影响下方的元素会向上移动；
- margin-botom 元素自身不会位移，但是会减少自身供 css 读取的高度，从而影响下方的元素会向上移动。
- margin-left 元素自身会向左移动，同时会影响其它元素；
- margin-right 元素自身不会位移，但是会减少自身供 css 读取的宽度，从而影响右侧的元素会向左移动；

### 11. 常见的布局方法有哪些？它们的优缺点是什么？

- 浮动：

     优点：兼容性好。
     缺点：浮动会脱离标准文档流，因此要清除浮动。我们解决好这个问题即可。

- 绝对定位

     优点：快捷。
     缺点：导致子元素也脱离了标准文档流，可实用性差。

- flex 布局（CSS3 中出现的）

     优点：解决上面两个方法的不足，flex 布局比较完美。移动端基本用 flex 布局。

- 网格布局（grid）

     CSS3 中引入的布局，很好用。代码量简化了很多。

## 场景应用

### 1. 实现一个三角形

关键是利用 border 这个属性来实现。

```css
div {
  width: 0;
  height: 0;
  border: 100px solid transparent;
  border-top-color: red;
}
```

<div style="width: 0;
  height: 0;
  border: 100px solid transparent;
  border-top-color: red;"></div>

### 2. 实现一个扇形

用 CSS 实现扇形的思路和三角形基本一致。

```css
/* 扇形 */
div {
  width: 0;
  height: 0;
  border: 100px solid transparent;
  border-radius: 100px;
  border-top-color: red;
}
```

  <div style="width: 0;
  height: 0;
  border: 100px solid transparent;
  border-radius: 100px;
  border-top-color: red;"></div>

```css
/* 圆 */
div {
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 50%;
}
```

<div style="width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 50%;"></div>

### 3. 实现一个宽高自适应的正方形

```css
/* vw 方式 */
.square {
  width: 10%;
  height: 10vw;
  background: tomato;
}
```

```css
/* 利用元素的 margin/padding 百分比是相对父元素 width 的性质来实现 */
.square {
  width: 20%;
  height: 0;
  padding-top: 20%;
  background: orange;

}
```

```css
/* 利用子元素的 margin-top 的值来实现 */
.square {
  width: 30%;
  overflow: hidden;
  background: yellow;
}
.square::after {
  content: "";
  display: block;
  margin-top: 100%;

}
```

### 4. 画一条 0.5px 的线

- 采用 transform: scale() 的方式：`transform: scale(0.5, 0.5);`
- 采用 meta viewport 的方式：`<meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"/>`
