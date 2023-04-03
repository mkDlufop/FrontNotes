---
title: Hello World
permalink: /html
---
[[toc]]

## 元素类型

HTML 元素指的是从开始标签（start tag）到结束标签（end tag）的所有代码。

元素类型：

1. **块内元素**。
   - 特点：
     - 自己独占一行。
     - 可以设置宽度、高度、边框、内外边距，默认宽度与父亲一致。
     - 容器内可以放行内块元素或者块级元素（文字类的元素内不能放块级元素）。
2. **行内元素**。
   - 特点：
     - 相邻的行内元素一行显示多个。
     - 不能设置宽度和高度，默认的宽度和高度就是它自身的高度和宽度。
     - 行内元素内部只能放文本或者行内元素（a 可以放块级元素）。
3. **行内块元素**。
   - 特点：
     - 默认宽度和高度是自身的宽度和高度。
     - 可以设置宽度和高度、内外边距。
     - 一行可以显示多个行内块元素，而且行内块元素之间有间隔。

## 常用标签

### div、span 标签

div 和 span 都是用来装内容的。

### 标题标签

h1~h6，一般用 h1~h3。

### 段落、换行标签、分割线

p、br、hr

### 图像标签（单标签）

img 常用的一些属性：

- `src=“绝对路径/相对路径”`
- `alt=“图片显示不出来的时候显示的文字”`
- `title=“鼠标移动到图片上显示的文字”`
- `srcset="xxx.png 2x"` 或 `srcset="xxx.png 128w"`：

   响应式页面中经常用到根据屏幕密度设置不同的图片。srcset 属性用于设置不同屏幕密度下，img 会自动加载不同的图片。`<img src="image-128.png" srcset="image-256.png 2x" />`：在屏幕密度为 1x 的情况下加载 image-128.png, 屏幕密度为 2x 时加载 image-256.png。
- `sizes="[media query] [length], [media query] [length] ... "`：

    `<img src="image-128.png" srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w" sizes="(max-width: 360px) 340px, 128px" />`，其中 srcset 指定图片的地址和对应的图片质量。sizes 用来设置图片的尺寸零界点。对于 srcset 中的 w 单位，可以理解成图片质量。如果可视区域小于这个质量的值，就可以使用。浏览器会自动选择一个最小的可用图片。sizes 就是指默认显示 128px, 如果视区宽度大于 360px, 则显示 340px。

### 超链接标签

a 常用的一些属性：

- `href=“跳转 url”`
  - **阻止 a 标签跳转**需要在 href 属性中添加`javascript:void(0);`或者`javascript:;`
- `target=“_self/_blank”`
  - target 为 "_blank"时，该链接会在新窗口中打开。
  - target 为 "_self"时，该链接会在当前窗口中打开。

#### 跳转到文件

```html
<!-- 浏览器能直接打开的文件 -->
<a href="./resource/自拍.jpg">看自拍</a>
<a href="./resource/小电影.mp4">看小电影</a>
<a href="./resource/小姐姐.gif">看小姐姐</a>
<a href="./resource/如何一夜暴富.pdf">点我一夜暴富</a>
<!-- 浏览器不能打开的文件，会自动触发下载 -->
<a href="./resource/内部资源.zip">内部资源</a>
<!-- 强制触发下载 -->
<a href="./resource/小电影.mp4" download="电影片段.mp4">下载电影</a>
```

> 注意1：若浏览器无法打开文件，则会引导用户下载。
> 注意2：若想强制触发下载，请使用 download 属性，属性值即为下载文件的名称。

#### 跳转到锚点

锚点 —— 即网页中的一个标记点。

使用方法：

- 第一步：设置锚点

  ```html
   <!-- 第一种方式：a标签配合name属性 -->
   <a name="test1"></a>
   <!-- 第二种方式：其他标签配合id属性 -->
   <h2 id="test2">我是一个位置</h2>
  ```

  > 注意：
  >
  > 1. 具有 href 属性的 a 标签是超链接，具有 name 属性的 a 标签是锚点。
  > 2. name 和 id 都是区分大小写的，且 id 最好别是数字开头。

- 第二步：跳转锚点

   ```html
   <!-- 跳转到test1锚点-->
   <a href="#test1">去test1锚点</a>
   <!-- 跳到本页面顶部 -->
   <a href="#">回到顶部</a>
   <!-- 跳转到其他页面锚点 -->
   <a href="demo.html#test1">去demo.html页面的test1锚点</a>
   <!-- 刷新本页面 -->
   <a href="">刷新本页面</a>
   <!-- 执行一段js,如果还不知道执行什么，可以留空，javascript:; -->
   <a href="javascript:alert(1);">点我弹窗</a>
   ```

#### 唤起指定应用

```html
<!-- 唤起设备拨号 -->
<a href="tel:10010">电话联系</a>
<!-- 唤起设备发送邮件 -->
<a href="mailto:10010@qq.com">邮件联系</a>
<!-- 唤起设备发送短信 -->
<a href="sms:10086">短信联系</a>
```

### 表格标签

```html
<table border="1">
    <!-- 表格标题 -->
    <caption>表格标题</caption>
    <!-- 表格头部 -->
    <thead>
        <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
        </tr>
    </thead>
    <!-- 表格主体 -->
    <tbody>
        <tr>
            <!-- rowspan 跨行合并/colspan 跨列合并 -->
            <th rowspan="3">table</td>
            <th>month</td>
            <th>savings</td>
        </tr>
        <tr>
            <!-- align=“center/left/right” -->
            <td align="right">Jau</td>
            <td align="right">70</td>
        </tr>
        <tr>
            <td align="right">sum</td>
            <td align="right">70</td>
        </tr>
    </tbody>
    <!-- 表格脚注 -->
    <tfoot>
        <tr>
            <td></td>
            <td></td>
            <td>共计：4人</td>
        </tr>
    </tfoot>
</table>
```

常用属性：

| 标签名 | 标签语义 | 常用属性 |
| - | - | - |
| table | 表格 | width ：设置表格宽度。<br />height ：设置表格最小高度，表格最终高度可能比设置的值大。<br />border ：设置表格边框宽度。<br />cellspacing ： 设置单元格之间的间距。 |
| thead | 表格头部 | height ：设置表格头部高度。<br/>align ： 设置单元格的水平对齐方式，可选值如下：<br/>1. left ：左对齐<br/>2. center ：中间对齐<br/>3. right ：右对齐<br/>valign ：设置单元格的垂直对齐方式，可选值如下：<br/>1. top ：顶部对齐<br/>2. middle ：中间对齐<br/>3. bottom ：底部对齐 |
| tbody | 表格主体 | 常用属性与 thead 相同。 |
| tr | 行 | 常用属性与 thead 相同。 |
| tfoot | 表格脚注 | 常用属性与 thead 相同。 |
| td | 普通单元格 | width ：设置单元格的宽度，同列所有单元格全都受影响。<br/>heigth ：设置单元格的高度，同行所有单元格全都受影响。<br/>align ：设置单元格的水平对齐方式。<br/>valign ：设置单元格的垂直对齐方式。<br/>rowspan ：指定要跨的行数。<br/>colspan ：指定要跨的列数。 |
| th | 表头单元格 | 常用属性与 td 相同。  |

> 注意：
>
> 1. \<table> 元素的 border 属性可以控制表格边框，但 border 值的大小，并不控制单元格边框的宽度，只能控制表格最外侧边框的宽度，这个问题如何解决？—— 后期靠 CSS 控制。
> 2. 默认情况下，每列的宽度，得看这一列单元格最长的那个文字。
> 3. 给某个 th 或 td 设置了宽度之后，他们所在的那一列的宽度就确定了。
> 4. 给某个 th 或 td 设置了高度之后，他们所在的那一行的高度就确定了。

### 表单标签

```html
<form action="/demo.html" id="form1" method="POST">
    <label for="fname">名字：</label>
    <input type="text" name="fname" value="张三" checked placeholder="请输入 First name" id="fname"><br/>
    性别：
    <input type="radio" name="sex" value="male" checked>男
    <input type="radio" name="sex" value="female">女<br/>
    爱好：
    <input type="checkbox" name="hobby" value="football" checked>足球
    <input type="checkbox" name="hobby" value="song">唱歌
    <input type="checkbox" name="hobby" value="game">玩游戏<br/>
    来自：<input type="text" list="from">
    <datalist id="from">
        <option value="蒙德">蒙德</option>
        <option value="璃月">璃月</option>
        <option value="稻妻">稻妻</option>
    </datalist><br/>
    身高：
    <select multiple="multiple" size="2">
        <option value="tall">高</option>
        <option value="medium" selected>中</option>
        <option value="short">矮</option>
    </select><br/>
    <textarea rows="10" cols="30" name="msg"></textarea><br/>
    <details>
        <summary>有疑问？</summary>
        <p>别紧张，这只是一个测试而已。</p>
    </details>
    <input type="submit" value="提交">
</form>
```

<form action="/demo.html" id="form1" method="POST">
    <label for="fname">名字：</label>
    <input type="text" name="fname" value="张三" checked placeholder="请输入 First name" id="fname"><br/>
    性别：
    <input type="radio" name="sex" value="male" checked>男
    <input type="radio" name="sex" value="female">女<br/>
    爱好：
    <input type="checkbox" name="hobby" value="football" checked>足球
    <input type="checkbox" name="hobby" value="song">唱歌
    <input type="checkbox" name="hobby" value="game">玩游戏<br/>
    来自：<input type="text" list="from">
    <datalist id="from">
        <option value="蒙德">蒙德</option>
        <option value="璃月">璃月</option>
        <option value="稻妻">稻妻</option>
    </datalist><br/>
    身高：
    <select multiple="multiple" size="2">
        <option value="tall">高</option>
        <option value="medium" selected="selected">中</option>
        <option value="short">矮</option>
    </select><br/>
    <textarea rows="10" cols="30" name="msg"></textarea><br/>
    <details>
        <summary>有疑问？</summary>
        <p>别紧张，这只是一个测试而已。</p>
    </details>
    <input type="submit" value="提交">
</form>

1. form 元素
    常用属性：
    - action ：用于指定表单的提交地址。
    - target ：用于控制表单提交后，如何打开页面，常用值如下：
        - _self ：在本窗口打开。
        - _blank ：在新窗口打开。
    - method ：用于控制表单的提交方式。
    - HTML5新增：novalidate：如果给 form 标签设置了该属性，表单提交的时候不再进行验证。
2. input 元素
   常用属性：
   - type
     - text：文本；radio：单选；password：密码；button：按钮；checkbox：多选
     - file：文件；image：图片；submit：提交；reset：重置；hidden：隐藏
     - HTML5 新增：number：数字；tel：电话；search：搜索；email：邮箱；url：地址；date：年月日；time：时分秒；month：月；week：周；time：时间；color：生成颜色选择表单；range：范围
   - name：input 名称【radio 单选及 checkbox 多选的 name 要一致】。如果要正确地提交表单，每个输入字段必须设置一个 name 属性。
   - value：规定 input 里面的值。
      - 对于输入框：指定默认输入的值；
      - 对于单选和复选框：实际提交的数据；
      - 对于按钮：显示按钮文字。
   - checked：规定在页面加载时应该被预先选定的 \<input> 元素。
   - maxlength：规定输入字段的最大长度。
   - required：表示该输入项必填， 适用于除按钮外其他表单控件。
   - placeholder：提示文字（注意：不是默认值， value 是默认值），适用于文字输入类的表单控件。
   - HTML5 新增表单属性：required ；placeholder； autofocus ；autocomplete（=on/off）； multiple； pattern=" " 里面写入想要的正则模式，例如手机号 pattern="^(+86)?\d{10}$" ；
   - disabled： 设置表单控件不可用。

3. textarea 文本框元素
    常用属性：
    - name： 指定数据名称。
    - rows： 指定默认显示的行数，影响文本域的高度。
    - cols： 指定默认显示的列数，影响文本域的宽度。
    - disabled： 设置表单控件不可用。

#### 常用表单控件

1. 文本输入框：

    ```html
    <input type="text">
    ```

    常用属性如下：
    - name 属性：数据的名称。
    - value 属性：输入框的默认输入值。
    - maxlength 属性：输入框最大可输入长度。

2. 密码输入框：

    ```html
    <input type="password">
    ```

    常用属性如下：
    - name 属性：数据的名称。
    - value 属性：输入框的默认输入值（一般不用，无意义）。
    - maxlength 属性：输入框最大可输入长度。

3. 单选框

    ```html
    <input type="radio" name="sex" value="female">女
    <input type="radio" name="sex" value="male">男
    ```

    常用属性如下：
    - name 属性：数据的名称，注意：想要单选效果，多个 radio 的 name 属性值要保持一致。
    - value 属性：提交的数据值。
    - checked 属性：让该单选按钮默认选中。

4. 复选框

    ```html
    <input type="checkbox" name="hobby" value="smoke">抽烟
    <input type="checkbox" name="hobby" value="drink">喝酒
    <input type="checkbox" name="hobby" value="perm">烫头
    ```

    常用属性如下：：
    - name 属性：数据的名称。
    - value 属性：提交的数据值。
    - checked 属性：让该复选框默认选中。

5. 隐藏域

    ```html
    <input type="hidden" name="tag" value="100">
    ```

    用户不可见的一个输入区域，作用是： 提交表单的时候，携带一些固定的数据。
    - name 属性：指定数据的名称。
    - value 属性：指定的是真正提交的数据。

6. 提交按钮

    ```html
    <input type="submit" value="点我提交表单">
    <button>点我提交表单</button>
    ```

    注意：
    1. button 标签 type 属性的默认值是 submit 。
    2. button 不要指定 name 属性
    3. input 标签编写的按钮，使用 value 属性指定按钮文字。

7. 重置按钮

    ```html
    <input type="reset" value="点我重置">
    <button type="reset">点我重置</button>
    ```

    注意点：
    1. button 不要指定 name 属性
    2. input 标签编写的按钮，使用 value 属性指定按钮文字。

8. 普通按钮

    ```html
    <input type="button" value="普通按钮">
    <button type="button">普通按钮</button>
    ```

    注意点：普通按钮的 type 值为 button ，若不写 type 值是 submit 会引起表单的提交。

9. 文本域

    ```html
    <textarea name="msg" rows="22" cols="3">我是文本域</textarea>
    ```

    常用属性如下：
    1. rows 属性：指定默认显示的行数，会影响文本域的高度。
    2. cols 属性：指定默认显示的列数，会影响文本域的宽度。
    3. 不能编写 type 属性，其他属性，与普通文本输入框一致。

10. 下拉框

    ```html
    <select name="from">
        <option value="黑">黑龙江</option>
        <option value="辽">辽宁</option>
        <option value="吉">吉林</option>
        <option value="粤" selected>广东</option>
    </select>
    ```

    常用属性及注意事项：
    1. name 属性：指定数据的名称。
    2. option 标签设置 value 属性， 如果没有 value 属性，提交的数据是 option 中间的文字；如果设置了 value 属性，提交的数据就是 value 的值（建议设置 value 属性）
    3. option 标签设置了 selected 属性，表示默认选中。

11. 自动补全框

     ```html
        <input type="text" list="mydata">
        <datalist id="mydata">
            <option value="深入理解计算机系统">深入理解计算机系统</option>
            <option value="计算机组成原理">计算机组成原理</option>
        </datalist>
     ```

    数据列表会使用 list 属性绑定至一个 \<input> 元素（如 text 或 email 输入类型），该属性的取值就是要绑定的数据列表的 id 值。

#### 禁用表单控件

给表单控件的标签设置 disabled 既可禁用表单控件。
> input 、 textarea 、 button 、 select 、 option 都可以设置 disabled 属性。

#### label 标签

label 标签可与表单控件相关联，关联之后点击文字，与之对应的表单控件就会获取焦点。
两种与 label 关联方式如下：

1. 让 label 标签的 for 属性的值等于表单控件的 id 。
2. 把表单控件套在 label 标签的里面。

### 文本标签

<em>em 标签：</em>表示一段内容中的着重点。

```html
<em>em 标签：</em>表示一段内容中的着重点。
```

<strong>strong 标签：表示一个内容的重要性，（语气比 em 要强）。</strong>

```html
<strong>strong 标签：表示一个内容的重要性，（语气比 em 要强）。</strong>
```

<i>i 标签：斜体。表示另一种叙述方式，画外音 / 分类学名词 / 外来语片段 / 舞台指示 / 船名 / ...</i>

```html
<i>i 标签：斜体。表示另一种叙述方式，画外音 / 分类学名词 / 外来语片段 / 舞台指示 / 船名 / ...</i>
```

<b>b 标签：加粗。表示某种需要引起注意却又没有其他额外语义的内容，摘要中的关键词 / 评介中的产品名称 / 文章的开篇内容 ...</b>

```html
<b>b 标签：加粗。表示某种需要引起注意却又没有其他额外语义的内容，摘要中的关键词 / 评介中的产品名称 / 文章的开篇内容 ...</b>
```

<small>small 标签：small 标签中的内容会比它的父元素中的文字要小一点。免责声明 / 许可证声明 / 注意事项 / ...</small>

```html
<small>small 标签：small 标签中的内容会比它的父元素中的文字要小一点。免责声明 / 许可证声明 / 注意事项 / ...</small>
```

<s>s 标签：不再只是「带删除线的文字」。表示不再准确或不再相关的内容。与 del 元素含义不同。</s>

```html
<s>s 标签：不再只是「带删除线的文字」。表示不再准确或不再相关的内容。与 del 元素含义不同。</s>
```

<u>u 标签：不再只是「带下划线的文字」。表示用非文本进行的标注的内容。中文专名（专名包括人名、地名、朝代名、国名、机构名等，大陆已较少使用，在英语中通常首字母大写） / 拼写检查的错误内容 / ...</u>

```html
<u>u 标签：不再只是「带下划线的文字」。表示用非文本进行的标注的内容。中文专名（专名包括人名、地名、朝代名、国名、机构名等，大陆已较少使用，在英语中通常首字母大写） / 拼写检查的错误内容 / ...</u>
```

<cite>cite 标签：加书名号的内容可以使用 cite 标签，表示参考的内容，书 / 论文 / 散文 / 电影 / 歌曲 / 电视节目 / 画作 / ...。</cite>示例如右：<cite>《HTML》</cite>

```html
<cite>cite 标签：加书名号的内容可以使用 cite 标签，表示参考的内容，书 / 论文 / 散文 / 电影 / 歌曲 / 电视节目 / 画作 / ...。</cite>示例如右：<cite>《HTML》</cite>
```

<abbr title="其 title 属性的含义为所写的全称">abbr 标签：建议在用户不熟悉的缩写词汇第一次出现时用 abbr + title 进行语义标注，帮助其理解。</abbr>

```html
<abbr title="其 title 属性的含义为所写的全称">abbr 标签：建议在用户不熟悉的缩写词汇第一次出现时用 abbr + title 进行语义标注，帮助其理解。</abbr>
```

<q>q 标签：表示一个短的引用（行内引用）。</q>示例如右：<q>HTML</q>

```html
<q>q 标签：表示一个短的引用（行内引用）。</q>示例如右：<q>HTML</q>
```

<blockquote>blockquote 标签：表示一个长引用（块级引用）。</blockquote>

```html
<blockquote>blockquote 标签：表示一个长引用（块级引用）。</blockquote>
```

sup 标签：用于定义上标。示例如右：百科<sup>1</sup>

```html
sup 标签：用于定义上标。示例如右：百科<sup>1</sup>
```

sub 标签：用于定义下标。示例如右：H<sub>2</sub>O

```html
sub 标签：用于定义下标。示例如右：H<sub>2</sub>O
```

<del>del 标签：表示一个删除的内容。</del>示例如右：<del>19.82</del>

```html
<del>del 标签：表示一个删除的内容。</del>示例如右：<del>19.82</del>
```

<ins>ins 标签：表示一个插入的内容。</ins>

```html
<ins>ins 标签：表示一个插入的内容。</ins>
```

<kbd>kbd 标签：表示用户输入的内容 / 按键。</kbd>

```html
<kbd>kdd 标签：表示用户输入的内容 / 按键。</kbd>
```

<samp>samp 标签：表示计算机程序的输出。</samp>

```html
<samp>samp 标签：表示计算机程序的输出。</samp>
```

<pre>
    <code>
    // pre 是一个预格式标签，会将代码中的格式保留。
    // code 标签用来表示代码。
    // 一般将 pre 和 code 结合使用来表示一段代码。
    function demo() {
            console.log('demo');
    }
    </code>
</pre>

文本注音：
<ruby>
    <span>魑魅魍魉</span>
    <rt>chī mèi wǎng liǎng </rt>
</ruby>

```html
<ruby>
    <span>魑魅魍魉</span>
    <rt>chī mèi wǎng liǎng </rt>
</ruby>
```

mark 标签：W3C 建议 <mark>mark</mark> 用于<mark>标记搜索结果中的关键字</mark>。

```html
mark 标签：W3C 建议 <mark>mark</mark> 用于<mark>标记搜索结果中的关键字</mark>。
```

### 有序列表、无序列表和自定义列表标签

<ul type="square">
    无序列表。
    <li>
        ul 标签的 type 属性可以设置为以下一种：
        <ul>
            <li>disc，默认值，实心的圆点。</li>
            <li>square，实心的方块。</li>
            <li>circle，空心的圆。</li>
        </ul>
    </li>
    <li>去掉项目符号：为 ul 标签添加一个样式，list-style: none。</li>
</ul>

```html
<ul type="square">
    无序列表。
    <li>
        ul 标签的 type 属性可以设置为以下一种：
        <ul>
            <li>disc，默认值，实心的圆点。</li>
            <li>square，实心的方块。</li>
            <li>circle，空心的圆。</li>
        </ul>
    </li>
    <li>去掉项目符号：为 ul 标签添加一个样式，list-style: none。</li>
</ul>
```

<ol>
    有序列表
    <li>
        ol 标签的 type 属性可以设置为以下一种：
        <ol>
            <li>默认值，使用阿拉伯数字。</li>
            <li>a/A，采用小写或大写字母作为序号。</li>
            <li>i/I，采用小写或大写罗马数字作为序号。</li>
        </ol>
    </li>
</ol>

```html
<ol>
    有序列表
    <li>
        ol 标签的 type 属性可以设置为以下一种：
        <ol>
            <li>默认值，使用阿拉伯数字。</li>
            <li>a/A，采用小写或大写字母作为序号。</li>
            <li>i/I，采用小写或大写罗马数字作为序号。</li>
        </ol>
    </li>
</ol>
```

<dl>
    <dt>自定义列表</dt>
    <dd>用来对一些词汇或者内容进行定义。</dd>
</dl>

```html
<dl>
    <dt>自定义列表</dt>
    <dd>用来对一些词汇或者内容进行定义。</dd>
    <dt>术语名称</dt>
    <dd>术语描述 1</dd>
    <dd>术语描述 2</dd>
</dl>
```

### 语义化标签

- header：定义文档的页眉（头部）；
- nav：定义导航链接的部分；
- article：定义文章内容；
- section：定义文档中的节（section、区段）；
- aside：定义其所处内容之外的内容（侧边）；
- footer：定义文档或节的页脚（底部）；

> 关于 article 和 section ：
>
> 1. artical 里面可以有多个 section 。
> 2. section 强调的是分段或分块，如果你想将一块内容分成几段的时候，可使用 section 元
> 素。
> 3. article 比 section 更强调独立性，一块内容如果比较独立、比较完整，应该使用 article 元素。

### 音频、视频标签

1. 音频标签：audio

   常用属性：

   - src="url 路径（音频地址）"
   - controls：控件
   - autoplay：自动播放
   - muted：音频静音
   - loop：循环播放
   - preload=auto / metadata / none
      音频预加载，如果使用 autoplay ，则忽略该属性。
     - none : 不预加载音频。
     - metadata : 仅预先获取音频的元数据（例如长度）。
     - auto : 可以下载整个音频文件，即使用户不希望使用它。

2. 视频标签：video

   常用属性：

   - src=“url 路径（视频地址）”
   - width=“100px” height=“100px“
   - controls：控件
   - muted：静音播放
   - autoplay：自动播放
   - loop：循环播放
   - preload=auto / metadata / none
      视频预加载，如果使用 autoplay ，则忽略该属性。
      - none : 不预加载视频。
      - metadata : 仅预先获取视频的元数据（例如长度）。
      - auto : 可以下载整个视频文件，即使用户不希望使用它。
   - poster=”等待加载的图片 url（视频封面）“

### meta 标签

```html
<!--用来描述 HTML 文档的编码类型-->
<meta charset="UTF-8" >
<!--页面关键词-->
<meta name="keywords" content="HTML5,CSS"/>
<!--页面描述-->
<meta name="description" content="页面描述内容" />
<!--页面重定向和刷新-->
<meta http-equiv="refresh" content="秒数；url=目标路径"/>
<!-- 
    适配移动端，可以控制视口的大小和比例。content 参数有以下几种：
        width：宽度(数值/device-width)
        height：高度(数值/device-height)
        initial-scale ：初始缩放比例
        maximum-scale ：最大缩放比例
        minimum-scale ：最小缩放比例
        user-scalable ：是否允许用户缩放(yes/no）
-->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<!--
    搜索引擎索引方式。content 参数有以下几种：
        index：允许机器人索引此页面（默认）。
        noindex：要求机器人不索引此页面。
        follow：允许机器人跟随此页面上的链接（默认）。
        nofollow：要求机器人不跟随此页面上的链接。
        all：与 index, follow 等价。
        none：与 noindex, nofollow 等价。
        noarchive：要求搜索引擎不缓存页面内容。
        nocache：noarchive 的替代名称。
-->
<meta name="robots" content="index,follow" />
<!--配置网页作者-->
<meta name="author" content="mkDlufop">
<!--配置定义网页版权信息-->
<meta name="copyright" content="2023-2027©版权所有">
```

Reference:

[Semantic HTML](https://justineo.github.io/slideshows/semantic-html/##/)
