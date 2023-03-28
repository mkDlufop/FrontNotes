---
title: 面试题_CSS
permalink: /interview_questions_CSS/
---
[[TOC]]

## CSS 基础

1. CSS 中可继承与不可继承属性有哪些？

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

2. link 和@import 的区别

    - link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务；@import 属于 CSS 范畴，只能加载 CSS。

    - link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载。

    - link 是 XHTML 标签，无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持。

3. li 与 li 之间有看不见的空白间隔是什么原因引起的？如何解决？

    - 原因：浏览器会把 inline 内联元素间的空白字符（空格、换行、Tab 等）渲染成一个空格。为了美观，通常是一个 `<li>` 放在一行，这导致 `<li>` 换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。

    - 解决办法：

       （1）为 `<li>` 设置 `float:left`。不足：有些容器是不能设置浮动，如左右切换的焦点图等。

       （2）将所有 `<li>` 写在同一行。不足：代码不美观。

       （3）将 `<ul>` 内的字符尺寸直接设为 0，即 `font-size:0`。不足： `<ul>`中的其他字符尺寸也被设为 0，需要额外重新设定其他字符尺寸，且在 Safari 浏览器依然会出现空白间隔。

       （4）消除 `<ul>` 的字符间隔 `letter-spacing:-8px`，不足：这也设置了 `<li>` 内的字符间隔，因此需要将 `<li>` 内的字符间隔设为默认 `letter-spacing:normal`。

4. CSS 优化和提高性能的方法有哪些？

    - 加载性能

      - css 压缩：将写好的 css 进行打包压缩，可以减小文件体积。

      - css 单一样式：当需要下边距和左边距的时候，很多时候会选择使用 margin:top 0 bottom 0；但 margin-bottom:bottom;margin-left:left; 执行效率会更高。

      - 减少使用@import，建议使用 link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。

    - 选择器性能

      - 关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS 选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；

      - 如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。

      - 避免使用通配规则，如*{}计算次数惊人，只对需要用到的元素进行选择。

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

      - 不使用@import 前缀，它会影响 css 的加载速度。

      - 选择器优化嵌套，尽量避免层级过深。

      - css 雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。

      - 正确使用 display 的属性，由于 display 的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。

      - 不滥用 web 字体。对于中文网站来说 WebFonts 可能很陌生，国外却很流行。web fonts 通常体积庞大，而且一些浏览器在下载 web fonts 时会阻塞页面渲染损伤性能。

    - 可维护性

      - 将具有相同属性的样式抽离出来，整合并通过 class 在页面中进行使用，提高 css 的可维护性。

      - 样式与内容分离：将 css 代码定义到外部 css 中。

5. 单行、多行文本溢出隐藏

    - 单行文本溢出隐藏

      - white-space：nowrap；overflow：hidden；text-hidden：ellipsis；

    - 多行文本溢出隐藏

      - overflow：hidden；text-hidden：ellipsis；display:-webkit-box;（作为弹性伸缩盒子模型显示）-webkit-box-orient:vertical; （ 设置伸缩盒子的子元素排列方式：从上到下垂直排列）-webkit-line-clamp:3;       （ 显示的行数）

5，对 CSS 工程化的理解？

- CSS 工程化是为了解决以下问题

  - 宏观设计：CSS 代码如何组织、如何拆分、模块结构怎样设计？

  - 编码优化：怎样写出更好的 CSS？

  - 构建：如何处理我的 CSS，才能让它的打包结果最优？

  - 可维护性：代码写完了，如何最小化它后续的变更成本？如何确保任何一个同事都能轻松接手？

- 以下三个方向都是时下比较流行的、普适性非常好的 CSS 工程化实践

  - 预处理器：Less、 Sass 等；

  - 重要的工程化插件： PostCss；

  - Webpack loader 等 。

6， z-index 属性在什么情况下会失效？

- 通常 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。z-index 值越大就越是在上层。z-index 元素的 position 属性需要是 relative，absolute 或是 fixed。

- z-index 属性在下列情况下会失效：

  - 父元素 position 为 relative 时，子元素的 z-index 失效。解决：父元素 position 改为 absolute 或 static；

  - 元素没有设置 position 属性为非 static 属性，解决：设置该元素的 position 属性为 relative，absolute 或是 fixed 中的一种；

  - 元素在设置 z-index 的同时还设置了 float 浮动。解决：float 去除，改为 display：inline-block；

7， 常见的图片格式及使用场景

1. BMP，是无损的、既支持索引色也支持直接色的点阵图。这种图片格式几乎没有对数据进行压缩，所以 BMP 格式的图片通常是较大的文件。
2. GIF，是无损的、采用索引色的点阵图。采用 LZW 压缩算法进行编码。文件小，是 GIF 格式的优点，同时，GIF 格式还具有支持动画以及透明的优点。但是 GIF 格式仅支持 8bit 的索引色，所以 GIF 格式适用于对色彩要求不高同时需要文件体积较小的场景。
3. JPG（JPEG） ，是有损的、采用直接色的点阵图。JPEG 的图片的优点是采用了直接色，得益于更丰富的色彩，JPEG 非常适合用来存储照片，与 GIF 相比，JPEG 不适合用来存储企业 Logo、线框类的图。因为有损压缩会导致图片模糊，而直接色的选用，又会导致图片文件较 GIF 更大。
4. PNG-8，是无损的、使用索引色的点阵图。PNG 是一种比较新的图片格式，PNG-8 是非常好的 GIF 格式替代者，在可能的情况下，应该尽可能的使用 PNG-8 而不是 GIF，因为在相同的图片效果下，PNG-8 具有更小的文件体积。除此之外，PNG-8 还支持透明度的调节，而 GIF 并不支持。除非需要动画的支持，否则没有理由使用 GIF 而不是 PNG-8。
5. PNG-24，是无损的、使用直接色的点阵图。PNG-24 的优点在于它压缩了图片的数据，使得同样效果的图片，PNG-24 格式的文件大小要比 BMP 小得多。当然，PNG24 的图片还是要比 JPEG、GIF、PNG-8 大得多。
6. SVG，是无损的矢量图。SVG 是矢量图意味着 SVG 图片由直线和曲线以及绘制它们的方法组成。当放大 SVG 图片时，看到的还是线和曲线，而不会出现像素点。SVG 图片在放大时，不会失真，所以它适合用来绘制 Logo、Icon 等。
7. WebP，是谷歌开发的一种新图片格式，WebP 是同时支持有损和无损压缩的、使用直接色的点阵图

## 页面布局

1. 水平垂直居中的实现

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

   - grid 布局

       父容器设置为`display: grid; place-items: center;`

2. 水平居中的实现

   - 对于**行内元素**：`text-align: center;`

   - 对于确定宽度的**块级元素**：

     - `margin: 0 auto;`

     - 父元素需开启相对定位，`position: absolute; left: 50%; margin-left: - 宽度/2 px`

   - 对于宽度未知的**块级元素**：

     - 使用 table 标签（或者将块级元素设置为`display: table`)，再给该标签设置`margin-left: auto; margin-right: auto;`

     - `display: inline-block; text-align: center;`

     - 父元素需开启相对定位，`position: absolute; left: 50%; transform: translateX(-50%);`
     - flex 布局使用`justify-content: center;`

3. 垂直居中的实现

   - 父盒子设置相对定位，子盒子`position: absolute; top: 0; bottom: 0; margin: auto 0;`（适用于子盒子有高度）

   - 父盒子设置相对定位，子盒子`position: absolute; top: 50%; transform: translateY(-50%);`（可以不知道子盒子的高度）

4. 两栏布局的实现

   一般两栏布局指的是左边一栏宽度固定，右边一栏宽度自适应。

   - [左侧浮动 + 右侧 margin-left](../测试代码/css/两栏布局的实现(左侧绝对定位+右侧 margin-left).html)：给父容器一个高度；左边盒子宽度给 200px，高度 100%，左浮动；右边盒子 margin-left：200px，宽度 auto，高度 100%。

   - [左侧浮动+右侧 BFC](./测试代码/css/两栏布局的实现（左侧浮动+右侧 BFC).html)：给父容器一个高度，左侧的盒子宽度 200px，高度 100%，左浮动，右侧的盒子高度 100%，overflow：hidden 触发 BFC。

   - [flex 布局](./测试代码/css/两栏布局的实现 (flex 布局）.html)：父容器给一个高度，display：flex；左侧盒子给一个宽度 200px，高度 100%，右侧盒子宽度 100%，flex：1。

   - [左侧绝对定位+右侧 margin-left](./测试代码/css/两栏布局的实现（左侧浮动+右侧 margin-left).html)：父容器给一个高度，position：relative；左侧盒子给一个宽度 200px，高度 100%，position：absolute，top：0；left：0；右侧盒子 margin-left：200px，高度 100%。

   - [右侧绝对定位+右侧定位 left](./测试代码/css/两栏布局的实现（右侧绝对定位+右侧定位 left)%20.html)：父容器给一个高度，position：relative；左侧盒子宽度 200px，高度 100%；右侧盒子高度 100%，position：absolute，top：0；right：0；bottom：0；left：200px；

5. 三栏布局的实现

   三栏布局一般指的是页面中一共有三栏，左右两栏宽度固定，中间自适应的布局。

   - [左右绝对定位+中间 margin](../测试代码/css/三栏布局的实现（左右绝对定位+中间 margin).html)：给父容器一个高度，position：relative；左侧盒子和右侧盒子宽度 200px，高度 100%，左侧盒子左侧绝对定位，右侧盒子右侧绝对定位（position：absolute）中间盒子高度 100%，margin：0 200px；

   - [flex 布局](./测试代码/css/三栏布局的实现 (flex 布局）.html)：父容器给一个高度，display：flex；左侧和右侧盒子高度 100%，宽度 200px；中间盒子高度 100%，flex：1；

   - [两侧浮动+中间 margin（中间盒子结构要写在最后）](./测试代码/css/三栏布局的实现（左右绝对定位+中间 margin).html)：父容器给一个高度；左右盒子宽度 200px，高度 100%，左边左浮动，右边右浮动，中间的盒子 margin：0 200px；高度 100%

   - [圣杯布局：父盒子 padding+三个盒子浮动+左右盒子相对定位并负边距（中间结构盒子要放在最前边）](./测试代码/css/三栏布局的实现 (（圣杯布局）父盒子 padding+三个盒子浮动+左右盒子相对定位并负边距）.html)

   - [双飞翼布局：三个盒子浮动+中间盒子左右 margin 留位+左右负边距（中间结构盒子要放在最前边）](./测试代码/css/三栏布局的实现 (（双飞翼布局）三个盒子浮动+中间盒子左右 margin 留位+左右负边距）.html)

6. 品字布局的实现

   - [margin： 0 auto；+ 浮动](./测试代码/css/品字布局的实现 (margin 设为 0auto+浮动）.html)：设置三个 div 宽和高，第一个 div margin： 0 auto；后两个 div 浮动使其一行显示，然后通过 margin-left 以及 transform：translate 实现布局，（padding 和 margin 若是百分比则是以父亲的宽度为准）。

   - [margin： 0 auto； + inline-block](./测试代码/css/品字布局的实现 (margin 设为 0auto+inline-block).html)：设置三个 div 宽和高，第一个 div margin： 0 auto；后两个 divdisplay：inline-block 使其一行显示，然后通过 margin-left 以及 transform：translate 实现布局，（padding 和 margin 若是百分比则是以父亲的宽度为准）。

7. 九宫格布局的实现

   - [float](./测试代码/css/九宫格布局的实现 (float).html)：给 ul 设定宽和高（需计算：比如 330\*330），每个 li 宽和高（100*100）并且设置左浮动，每个 limargin-right：10px；margin-bottom：10px；

   - [flex](./测试代码/css/九宫格布局的实现 (flex).html)：给 ul 设定宽和高（330\*330），display：flex；flex-wrap：wrap；justify-content：space-around；align-items：center；，每个 li 给定宽和高（100*100）

   - [inline-block](./测试代码/css/九宫格布局的实现 (inline-block).html)：给 ul 设定宽和高（需计算：比如 330\*330）每个 li 宽和高（100*100）并且设置 display：inline-block；每个 limargin-right： 10px；margin-bottom：10px；

   - [table](./测试代码/css/九宫格布局的实现 (table).html)：给 ul 设定宽高（340\*340），display: table；border-spacing: 10px；每个 li 设置 display: talbe-row，li 里的每个 div 设置 display: table-cell。

8. [边框九宫格的实现](./测试代码/css/边框九宫格的实现。html)

9. 使用 `display: inline-block;`会产生什么问题？

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

10. margin 负值问题

- margin-top 元素自身会向上移动，同时会影响下方的元素会向上移动；
- margin-botom 元素自身不会位移，但是会减少自身供 css 读取的高度，从而影响下方的元素会向上移动。
- margin-left 元素自身会向左移动，同时会影响其它元素；
- margin-right 元素自身不会位移，但是会减少自身供 css 读取的宽度，从而影响右侧的元素会向左移动；

11. 常见的布局方法有哪些？它们的优缺点是什么？

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
