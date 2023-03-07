- [元素类型](#元素类型)
- [常用标签](#常用标签)
  - [div、span 标签](#divspan-标签)
  - [标题标签](#标题标签)
  - [段落、换行标签、分割线](#段落换行标签分割线)
  - [图像标签（单标签）](#图像标签单标签)
  - [超链接标签](#超链接标签)
  - [表格标签](#表格标签)
  - [表单标签](#表单标签)
  - [文本标签](#文本标签)
  - [有序列表、无序列表和定义列表标签](#有序列表无序列表和定义列表标签)
  - [语义化标签](#语义化标签)
  - [音频、视频标签](#音频视频标签)
  - [meta 标签](#meta-标签)

[TOC]

# 元素类型

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

# 常用标签

## div、span 标签

div 和 span 都是用来装内容的。

## 标题标签

h1~h6，一般用 h1~h3。

## 段落、换行标签、分割线

p、br、hr

## 图像标签（单标签）

img 常用的一些属性。

- src=“绝对路径 url/相对路径 url”
- alt=“图片显示不出来的时候显示的文字”
- title=“鼠标移动到图片上显示的文字”

## 超链接标签

a 常用的一些属性：

- href=“跳转 url”
  - **阻止、<a>标签跳转**需要在 href 属性中添加`javascript:void(0);`或者`javascript:;`
- target=“_self/\_blank”
  - target 为 "_blank"时，该链接会在新窗口中打开。
  - target 为 "_self"时，该链接会在当前窗口中打开。

## 表格标签

```html
<table border="1">
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
</table>
```

## 表单标签

```html
<form action="/demo.html" id="form1" method="POST">
    <label for="fname">名字：</label>
    <input type="text" name="fname" value="张三" checked placeholder="请输入 First name" id="fname"><br/>
    性别：
    <input type="radio" name="sex" value="male" checked>男
    <input type="radio" name="sex" value="female">女<br/>
    身高：
    <select multiple="multiple" size="2">
        <option value="tall">高</option>
        <option value="medium" selected="selected">中</option>
        <option value="short">矮</option>
    </select><br/>
    <textarea rows="10" cols="30" name="msg"></textarea><br/>
    <input type="submit" value="提交">
</form>
```

1. input 元素

   属性：

   - type
     - text：文本；radio：单选；password：密码；button：按钮；checkbox：多选
     - file：文件；image：图片；submit：提交；reset：重置；hidden：隐藏
     - H5 新增：number：数字；tel：电话；search：搜索；email：邮箱；url：地址；date：年月日；time：时分秒；month：月；week：周；time：时间；color：生成颜色选择表单；range：范围
   - name：input 名称【radio 单选及 checkbox 多选的 name 要一致】。如果要正确地提交表单，每个输入字段必须设置一个 name 属性。
   - value：规定 input 里面的值
   - checked：规定在页面加载时应该被预先选定的 \<input> 元素。
   - maxlength：规定输入字段的最大长度
   - H5 新增表单属性：required ；placeholder； autofocus ；autocomplete（=on/off）； multiple； pattern=" " 里面写入想要的正则模式，例如手机号 pattern="^(+86)?\d{10}$" ；

2. select 下拉表单元素

   属性：

   - \<option>的 selected 属性。`selected=“selected”`表示当前 option 默认选中。
   - `multiple=“multiple”`表示支持多选 option（按住 ctrl）
   - `size=“2”`展示两个 option 选项

3. textarea 文本框元素

## 文本标签

<em>em 标签：表</em>示一段内容中的着重点。

<strong>strong 标签：表示一个内容的重要性。</strong>

<i>i 标签：斜体。表示另一种叙述方式，画外音 / 分类学名词 / 外来语片段 / 舞台指示 / 船名 / ...</i>

<b>b 标签：加粗。表示某种需要引起注意却又没有其他额外语义的内容，摘要中的关键词 / 评介中的产品名称 / 文章的开篇内容 ...</b>

<small>small 标签：small 标签中的内容会比它的父元素中的文字要小一点。免责声明 / 许可证声明 / 注意事项 / ...</small>

<s>s 标签：不再只是「带删除线的文字」。表示不再准确或不再相关的内容。与 del 元素含义不同。</s>

<u>u 标签：不再只是「带下划线的文字」。表示用非文本进行的标注的内容。中文专名（专名包括人名、地名、朝代名、国名、机构名等，大陆已较少使用，在英语中通常首字母大写） / 拼写检查的错误内容 / ...</u>

<cite>cite 标签：加书名号的内容可以使用 cite 标签，表示参考的内容，书 / 论文 / 散文 / 电影 / 歌曲 / 电视节目 / 画作 / ...。</cite>示例如右：<cite>《HTML》</cite>

<abbr title="其 title 属性的含义为所写的全称">abbr 标签：建议在用户不熟悉的缩写词汇第一次出现时用 abbr + title 进行语义标注，帮助其理解。</abbr>

<q>q 标签：表示一个短的引用（行内引用）。</q>示例如右：<q>HTML</q>

<blockquote>blockquote 标签：表示一个长引用（块级引用）。</blockquote>

sup 标签：用于定义上标。示例如右：百科<sup>1</sup>

sub 标签：用于定义下标。示例如右：H<sub>2</sub>O

<del>del 标签：表示一个删除的内容。</del>示例如右：<del>19.82</del>

<ins>ins 标签：表示一个插入的内容。</ins>

<kdd>kdd 标签：表示用户输入的内容 / 按键。</kdd>

<samp>samp 标签：表示计算机程序的输出。</samp>

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

## 有序列表、无序列表和定义列表标签

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

<dl>
    <dt>定义列表</dt>
    <dd>用来对一些词汇或者内容进行定义。</dd>
</dl>

## 语义化标签

- header：定义文档的页眉（头部）；
- nav：定义导航链接的部分；
- artical：定义文章内容；
- section：定义文档中的节（section、区段）；
- aside：定义其所处内容之外的内容（侧边）；
- footer：定义文档或节的页脚（底部）；

## 音频、视频标签

1. 音频标签：audio

   常用属性：

   - src=“url 路径”
   - controls：控件
   - autoplay：自动播放
   - loop：循环播放

2. 视频标签：video

   常用属性：

   - src=“url 路径”
   - width=“100px” height=“100px“
   - autoplay：自动播放
   - loop：循环播放
   - preload=none/auto 预加载（选择 autoplay 之后忽略这一项）
   - poster=”等待加载的图片 url“
   - muted：静音播放

## meta 标签

```html
<meta charset="UTF-8" >
<meta name="keywords" content="HTML5,CSS"/>
<meta name="description" content="页面描述内容" />
<meta http-equiv="refresh" content="秒数；url=目标路径"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /><!-- 适配移动端，可以控制视口的大小和比例 -->
```

Reference:

[Semantic HTML](https://justineo.github.io/slideshows/semantic-html/#/)
