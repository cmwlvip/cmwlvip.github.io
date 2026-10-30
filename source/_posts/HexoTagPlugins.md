---
title: Hexo Built-in Tag Plugins (Hexo内置标签外挂)
date: 2022-11-03 14:08:31
updated: 2026-10-30
sticky: 
categories: Hexo
tags:
    - Hexo
keywords:
    - Hexo

cover: https://pic1.imgdb.cn/item/6364a40416f2c2beb1303eee.jpg

---

Tag plugins are different from post tags. They are ported from Octopress and provide a useful way for you to quickly add specific content to your posts. You can check out [the Hexo official docs](https://hexo.io/docs/) for more.

## 引用块

在文章中插入引言，可包含作者、来源、和标题。
别名：quote

```plaintext
{% blockquote [author[, source]] [link] [source_link_title] %}
content
{% endblockquote %}
```

例子1：没有提供参数，只是普通输出

```plaintext
{% blockquote %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit lacus ut purus iaculis feugiat. Sed nec tempor elit, quis aliquam neque. Curabitur sed diam eget dolor fermentum semper at eu lorem.
{% endblockquote %}
```

{% blockquote %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit lacus ut purus iaculis feugiat. Sed nec tempor elit, quis aliquam neque. Curabitur sed diam eget dolor fermentum semper at eu lorem.
{% endblockquote %}

例子2：引用书上的句子

```plaintext
{% blockquote David Levithan, Wide Awake %}
Do not just seek happiness for yourself. Seek happiness for all. Through kindness. Through mercy.
{% endblockquote %}
```

{% blockquote David Levithan, Wide Awake %}
Do not just seek happiness for yourself. Seek happiness for all. Through kindness. Through mercy.
{% endblockquote %}

例子3：引用Twitter

```plaintext
{% blockquote @DevDocs https://twitter.com/devdocs/status/356095192085962752 %}
NEW: DevDocs now comes with syntax highlighting. http://devdocs.io
{% endblockquote %}
```

{% blockquote @DevDocs https://twitter.com/devdocs/status/356095192085962752 %}
NEW: DevDocs now comes with syntax highlighting. http://devdocs.io
{% endblockquote %}

例子4：引用网络上的文章

```plaintext
{% blockquote Seth Godin http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html Welcome to Island Marketing %}
Every interaction is both precious and an opportunity to delight.
{% endblockquote %}
```

{% blockquote Seth Godin http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html Welcome to Island Marketing %}
Every interaction is both precious and an opportunity to delight.
{% endblockquote %}

## 代码块

别名：code

```plaintext
{% codeblock [title] [lang:language] [url] [link text] [additional options] %}
code snippet
{% endcodeblock %}
```

以 `option:value` 的格式指定额外选项，e.g. `line_number:false`

| Extra Options | Description | Default |
| :-----------: | :---------: | :------: |
| `line_number` | 显示行号 | true |
| `line_threshold	` | 只有代码块的行数超过该阈值，才显示行数 | 0 |
| `highlight` | 启用代码高亮 | true |
| `first_line` | 指定第一行号 | 1 |
| `mark` | 突出显示特定行，每个值用逗号分隔。使用短划线指定数字范围。  e.g. `mark:1,4-7,10` 会高亮第 1, 4 到 7 以及第 10行。 | |
| `wrap` | 将代码块包装在`<table>` | true |

例子1：普通代码块

```plaintext
{% codeblock %}
alert('Hello World!');
{% endcodeblock %}
```

{% codeblock %}
alert('Hello World!');
{% endcodeblock %}

例子2：指定语言

```plaintext
{% codeblock lang:objc %}
[rectangle setX: 10 y: 10 width: 20 height: 20];
{% endcodeblock %}
```

{% codeblock lang:objc %}
[rectangle setX: 10 y: 10 width: 20 height: 20];
{% endcodeblock %}

例子3：附加说明

```plaintext
{% codeblock Array.map %}
array.map(callback[, thisArg])
{% endcodeblock %}
```

{% codeblock Array.map %}
array.map(callback[, thisArg])
{% endcodeblock %}

例子4：附加说明和网址

```plaintext
{% codeblock _.compact http://underscorejs.org/#compact Underscore.js mark:1 line_number:false %}
_.compact([0, 1, false, 2, '', 3]);
=> [1, 2, 3]
{% endcodeblock %}
```

{% codeblock _.compact http://underscorejs.org/#compact Underscore.js mark:1 line_number:false %}
_.compact([0, 1, false, 2, '', 3]);
=> [1, 2, 3]
{% endcodeblock %}

## 反引号代码块

这与使用代码块相同，但使用三个反引号来分隔块。
\``` [language] [title] [url] [link text] code snippet ```

## Pull 引用

```plaintext
{% pullquote [class] %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
{% endpullquote %}
```

### Left

{% pullquote left %}
裸体一旦成为艺术，便是最圣洁的。
{% endpullquote %}
年华错落了我们邂逅在光阴下的姻缘，流连的心缘漂泊在红尘里渐渐漂白了岁月的眷恋。凄凉却冷眼观望着繁华三千长长的画卷，生命流淌的岁岁年年婉转着你我一世的情深缘劫。
光阴的花开了谢，那生生世世的牵伴天荒地老也无怨。不死心的缘情缘劫放纵心愿予你的心缘无眠的抒写爱的誓言。你的一切总让我忘情的留恋，萦绕在心底的歌经久的吟唱着我爱你的无悔无边，就算爱你爱得心碎也无怨无怯。流走的时光在成长的年华烂漫青涩心愿间莹舞，裂开的心尖流淌着玫瑰香艳的红尘恒古牵恋。

### Right

{% pullquote right %}
道德一旦沦为虚伪，便是最下流的。
{% endpullquote %}
年华错落了我们邂逅在光阴下的姻缘，流连的心缘漂泊在红尘里渐渐漂白了岁月的眷恋。凄凉却冷眼观望着繁华三千长长的画卷，生命流淌的岁岁年年婉转着你我一世的情深缘劫。
光阴的花开了谢，那生生世世的牵伴天荒地老也无怨。不死心的缘情缘劫放纵心愿予你的心缘无眠的抒写爱的誓言。你的一切总让我忘情的留恋，萦绕在心底的歌经久的吟唱着我爱你的无悔无边，就算爱你爱得心碎也无怨无怯。流走的时光在成长的年华烂漫青涩心愿间莹舞，裂开的心尖流淌着玫瑰香艳的红尘恒古牵恋。

## jsFiddle

> 该标签在 Hexo 7.0.0 中被删除。 如果你正在使用 `v7.0.0+`，请使用 [hexo-tag-embed](https://github.com/hexojs/hexo-tag-embed) 替代。

`jsFiddle`标签用于在 Hexo 文章中嵌入 [JSFiddle](https://jsfiddle.net/) 的示例代码。
[Jsfiddle](https://jsfiddle.net/)是一个在线的前端代码编辑和分享工具，它允许用户编写 `HTML`、`CSS` 和 `JavaScript` 代码，并实时预览代码的运行结果。用户可以在 Jsfiddle 上创建自己的代码示例，然后将链接分享给其他人或嵌入到网页中。

```plaintext
{% jsfiddle shorttag [tabs] [skin] [width] [height] %}
```

| option | description | example |
| --- | --- | --- |
| `shorttag` | [必需]指定 JSFiddle 示例的短代码，代码位于`JSFiddle`示例的`URL`中 |  `{% jsfiddle 0bokL4h3 %}` |
| `tabs` | [可选]`"html,css,js,result"` 的组合，同时也指定了顺序，默认显示所有（四个）选项卡 | `{% jsfiddle 0bokL4h3 html,css,result %}` |
| `skin` | [可选] JSFiddle 的外观皮肤， `light`（浅色）或 `dark`（深色）。默认`light` | `{% jsfiddle 0bokL4h3 html,css,js,result dark %}` |
| `width` | [可选]指定 JSFiddle 示例的宽度，像素值或百分比值 | `{% jsfiddle 0bokL4h3 html,css,js,result dark 80% %}`<br>(见下图) |
| `height` | [可选]指定 JSFiddle 示例的高度，像素值或百分比值 | `{% jsfiddle 0bokL4h3 html,css,result dark 300 50% %}` |

{% jsfiddle 0bokL4h3 html,css,js,result dark 80% %}

## Gist

> 该标签在 Hexo 7.0.0 中被删除。 如果你正在使用 `v7.0.0+`，请使用 [hexo-tag-embed](https://github.com/hexojs/hexo-tag-embed) 替代。

`GitHub Gist`是 GitHub 提供的一个在线代码托管服务，允许用户轻松地分享和嵌入代码片段。
每个代码片段称为一个`Gist`，可以包含单个文件或多个文件。用户可以在 Gist 中分享代码、笔记、片段或任何其他文本内容，并且可以选择将其公开或保留私密。
![在GitHub创建一个Gist](2024-06-09-15-24-11.png)

```plaintext
{% gist gist_id [filename] %}
```

{% gist 848ffcc4fd6769d0b24e48f951f504f6 %}

## iframe

```plaintext
{% iframe url [width] [height] %}
```

```plaintext
{% iframe 'https://cmwlvip.github.io/' 100% 300px %}
```

{% iframe 'https://cmwlvip.github.io/' 100% 300px %}

## Image

```plaintext
{% img [class names] /path/to/image [width] [height] '"title text" "alt text"' %}
```

**tip:图片宽高不要带px**。
**For example.**

```markdown
{% img [png] /HexoTagPlugins/hexo.png 160 90 '"图片标题和鼠标放上时显示" "图片没有正常加载时显示"' %}
```

{% img [png] /HexoTagPlugins/hexo.png 160 90 '"hexo.png" "图片没有正常加载时显示"' %}

{% note info modern %}
`Image`图片标签外挂路径用的是**相对路径**。
{% endnote %}

## Link

在文章插入链接，并自动给外部链接添加`target="_blank"`属性。

```plaintext
{% link text url [external] [title] %}
```

`external` 是一个可选参数，用于指示链接是否为外部链接。
实际上,在 `Hexo` 中使用 `{% link %}` 标签时，添加 `external` 参数并不会有特别大的影响，因为 `Hexo` 默认并不会对外部链接做特殊处理。这个参数可能更多地是为了标记链接的属性，而不是改变其行为。

{% link 百度一下 https://www.baidu.com  百度一下，你就知道 %}

## Include Code

在`source/downloads/code`文件夹中插入代码片段。可以通过配置中的`code_dir`选项指定文件夹位置。

```plaintext
{% include_code [title] [lang:language] [from:line] [to:line] path/to/file %}
```

例子1：嵌入全部内容test.js

```plaintext
{% include_code lang:javascript test.js %}
```

例子2：嵌入仅第三行

```plaintext
{% include_code lang:javascript from:3 to:3 test.js %}
```

例子3：嵌入5到8行

```plaintext
{% include_code lang:javascript from:5 to:8 test.js %}
```

例子4：嵌入5到末尾行

```plaintext
{% include_code lang:javascript from:5 test.js %}
```

例子5：嵌入首行到第8行

```plaintext
{% include_code lang:javascript to:8 test.js %}
```

## YouTube

> 该标签在 Hexo 7.0.0 中被删除。 如果你正在使用 `v7.0.0+`，请使用 [hexo-tag-embed](https://github.com/hexojs/hexo-tag-embed) 替代。

```plaintext
{% youtube video_id %}
```

id在url中

## Vimeo

> 该标签在 Hexo 7.0.0 中被删除。 如果你正在使用 `v7.0.0+`，请使用 [hexo-tag-embed](https://github.com/hexojs/hexo-tag-embed) 替代。

Vimeo 是一个视频分享平台，类似于 YouTube。

```plaintext
{% vimeo video_id [width] [height] %}
```

## Include Posts

包括指向其他帖子的链接。

```plaintext
{% post_path filename %}
{% post_link filename [title] [escape] %}
```

使用此标记时，可以忽略永久链接和文件夹信息，例如语言和日期。
例如: `{% post_link my %}`。
只要帖子的文件名 `my.md`，这将起作用,即使帖子位于`Source/posts/2015-02-my-family-holiday`，并且具有永久链接`2018/en/my`。
您可以自定义要显示的文本，而不是显示帖子的标题。不支持在 Markdown 语法 []\() 中使用post_path。
默认情况下，帖子的标题和自定义文本会被转义。您可以使用转义选项禁用转义。

**For example.**

{% tabs Include Posts %}
<!-- tab 显示贴子的标题 -->
```Markdown
{% post_link TheCharmOfMarkdown %}
```

{% post_link TheCharmOfMarkdown %}
<!-- endtab -->

<!-- tab 显示自定义文本 -->
```Markdown
{% post_link TheCharmOfMarkdown 'Markdown 的魅力' %}
```

{% post_link TheCharmOfMarkdown 'Markdown 的魅力' %}
<!-- endtab -->

<!-- tab (escape)转义标题 -->
```Markdown
{% post_link HexoTagPlugins 'How to use <b> tag in title' %}
```

{% post_link HexoTagPlugins 'How to use <b> tag in title' %}
<!-- endtab -->

<!-- tab 不转义标题 -->
```Markdown
{% post_link HexoTagPlugins '<b>bold</b> custom title' false %}
```

{% post_link HexoTagPlugins '<b>bold</b> custom title' false %}
<!-- endtab -->
{% endtabs %}

## Include Assets

引用本文章的资源，与[资源文件夹](https://hexo.io/zh-cn/docs/asset-folders)一起使用。

```plaintext
{% asset_path filename %}
{% asset_img [class names] slug [width] [height] [title text [alt text]] %}
{% asset_link filename [title] [escape] %}
```

`hexo.png`位于{% post_link HexoTagPlugins %} **(本文章)** 资源文件夹`HexoTagPlugins`下。

{% note info danger %}
值得注意的是：

- 大概是从 `Hexo 5` 开始，[hexo-asset-image](https://github.com/xcodebuild/hexo-asset-image) 已无效，由于图片路径中有**时间格式**导致`hexo-asset-image`不能正确转换图片路径。可以使用[hexo-asset-img](https://github.com/yiyungent/hexo-asset-img)。
- 高版本中无需使用 `asset_img` 标签插件就可以在 [markdown中嵌入图片](https://hexo.io/zh-cn/docs/asset-folders#%E4%BD%BF%E7%94%A8-Markdown-%E5%B5%8C%E5%85%A5%E5%9B%BE%E7%89%87)，使用`![](image.jpg)`方式插入图片便能正常显示，使用该方式需要开启资源文件夹`post_asset_folder: true`。
{% endnote %}

{% tabs Assets %}
<!-- tab asset_path -->
```Markdown
{% asset_path hexo.png %}
```

{% asset_path hexo.png %}
<!-- endtab -->

<!-- tab asset_img -->
**默认（无选项）**
{% raw %}
`{% asset_img hexo.png %}`
{% endraw %}
{% codeblock line_number:false wrap:false %}
<img src="/2022/11/03/HexoTagPlugins/hexo.png" class="">
{% endcodeblock %}

**自定义class属性**
{% raw %}
`{% asset_img post-image hexo.png %}`
{% endraw %}
{% codeblock line_number:false wrap:false %}
<img src="/2022/11/03/HexoTagPlugins/hexo.png" class="post-image">
{% endcodeblock %}

**展示尺寸**
{% raw %}
`{% asset_img hexo.png 500 400 %}`
{% endraw %}
{% codeblock line_number:false wrap:false %}
<img src="/2022/11/03/HexoTagPlugins/hexo.png" class="" width="500" height="400">
{% endcodeblock %}

**title 和 alt 属性**
{% raw %}
`{% asset_img hexo.png "title'alt'" %}`
{% endraw %}
{% codeblock line_number:false wrap:false %}
<img src="/2022/11/03/HexoTagPlugins/hexo.png" class="" title="title" alt="alt">
{% endcodeblock %}
<!-- endtab -->

<!-- tab asset_link -->
```Markdown
{% asset_link hexo.png '下载hexo.png' %}
```

{% asset_link hexo.png '下载hexo.png' %}
<!-- endtab -->
{% endtabs %}

## Raw

如果某些内容导致帖子出现处理问题，请使用原始标记包装它以避免呈现错误。

```plaintext
{% raw %}
content
{% endraw %}
```
