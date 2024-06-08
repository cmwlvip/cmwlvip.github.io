---
title: Butterfly
date: 2023-02-21 15:11:10
updated: 2023-03-02
tags:
    - Hexo
    - Butterfly
categories: Hexo
copyright: false
description: <b>Hexo Butterfly</b>主题使用文档整理<br>学会尊重他人劳动成果—学习来源：<a href="https://butterfly.js.org/">Butterfly</a>
cover: https://pic.imgdb.cn/item/6664117b5e6d1bfa055c008b.jpg
---

{% note default modern %}
<b>Hexo Butterfly</b>主题使用文档整理
学会尊重他人劳动成果—学习来源：<a href="https://butterfly.js.org/">Butterfly</a>
{% endnote %}

---

## 建议

{% note modern %}
不要把个人需要的文件/图片放在主题`source`文件夹里，因为在升级主题的过程中，可能会把文件覆盖删除了。
在Hexo根目录的`source`文件夹里，创建一个文件夹来放置个人文件/图片。
引用文件直接为`/文件夹名称/文件名`
{% endnote %}

## Front-matter

**Front-matter**是**markdown**文件最上方以 `---` 分隔的区域

{% codeblock lang:markdown %}
---
title:
date:
tags:
---
{% endcodeblock %}

- Page Front-matter 用于`页面`配置
- Post Front-matter 用于`文章页`配置

### Page Front-matter

| 写法 | 解释 |
| ---- | --- |
| title | 【必需】页面标题 |
| date | 【必需】页面创建日期 |
| type | 【必需】标签、分类和友情链接三个页面需要配置 |
| updated | 【可选】页面更新日期 |
| description | 【可选】页面描述 |
| keywords | 【可选】页面关键字 |
| comments | 【可选】显示页面评论模块(默认 true) |
| top_img | 【可选】页面顶部图片 |
| mathjax | 【可选】显示mathjax(当设置mathjax的per_page: false时，才需要配置，默认 false) |
| katex | 【可选】显示katex(当设置katex的per_page: false时，才需要配置，默认 false) |
| aside | 【可选】显示侧边栏 (默认 true) |
| aplayer | 【可选】在需要的页面加载aplayer的js和css,请参考文章下面的音乐配置 |
| highlight_shrink | 【可选】配置代码框是否展开(true/false)(默认为设置中highlight_shrink的配置) |

### Post Front-matter

| 写法 | 解释 |
| ---- | --- |
| title | 【必需】文章标题 |
| date | 【必需】文章创建日期 |
| updated | 【可选】文章更新日期|
| tags | 【可选】文章标签 |
| categories | 【可选】文章分类 |
| keywords | 【可选】文章关键字 |
| description | 【可选】文章描述 |
| top_img | 【可选】文章顶部图片 |
| cover | 【可选】文章缩略图(**如果没有设置top_img,文章页顶部将显示缩略图**，可设为false/图片地址/留空) |
| comments | 【可选】显示文章评论模块(默认 true) |
| toc | 【可选】显示文章TOC(默认为设置中toc的enable配置) |
| toc_number | 【可选】显示toc_number(默认为设置中toc的number配置) |
| toc_style_simple | 【可选】显示 toc 简洁模式 |
| copyright | 【可选】显示文章版权模块(默认为设置中post_copyright的enable配置) |
| copyright_author | 【可选】文章版权模块的`文章作者` |
| copyright_author_href | 【可选】文章版权模块的`文章作者`链接 |
| copyright_url | 【可选】文章版权模块的`文章链接`链接 |
| copyright_info | 【可选】文章版权模块的`版权声明`文字 |
| mathjax | 【可选】显示mathjax(当设置mathjax的per_page: false时，才需要配置，默认 false) |
| katex | 【可选】显示katex(当设置katex的per_page: false时，才需要配置，默认 false) |
| aplayer | 【可选】在需要的页面加载aplayer的js和css,请参考文章下面的音乐 配置 |
| highlight_shrink | 【可选】配置代码框是否展开(true/false)(默认为设置中highlight_shrink的配置) |
| aside | 【可选】显示侧边栏 (默认 true) |
| sticky | 【可选】[文章置顶](#文章置顶) |

## 页面

### 标签页

1. 前往你的 Hexo 博客的根目录
2. 输入`hexo new page tags`
3. 找到`source/tags/index.md`文件
4. 修改这个文件：
**记得添加** `type: "tags"`

{% codeblock lang:markdown %}
---
title: 标签
date: 2018-01-05 00:00:00
type: "tags"
orderby: random
order: 1
---
{% endcodeblock %}

| 参数 | 解释 |
| ---- | ---- |
| type | 【必须】页面类型，必须为`tags` |
| orderby | 【可选】排序方式 ：random/name/length |
| order | 【可选】排序次序： 1, asc for ascending; -1, desc for descending |

### 分类页

1. 前往你的 Hexo 博客的根目录
2. 输入`hexo new page categories`
3. 找到`source/categories/index.md`文件
4. 修改这个文件：
**记得添加** `type: "categories"`

{% codeblock lang:markdown %}
---
title: 分类
date: 2018-01-05 00:00:00
type: "categories"
---
{% endcodeblock %}

### 友情链接

为你的博客创建一个友情链接！

#### 创建友情链接页面

1. 前往你的 Hexo 博客的根目录
2. 输入`hexo new page link`
3. 找到`source/link/index.md`文件
4. 修改这个文件：
**记得添加** `type: "link"`

{% codeblock lang:markdown %}
---
title: 友情链接
date: 2018-06-07 22:17:49
type: "link"
---
{% endcodeblock %}

#### 友情链接添加

{% tabs link %}
<!-- tab 本地生成 -->
在Hexo博客目录中的`source/_data`（如果没有 _data 文件夹，请自行创建），创建一个文件`link.yml`
{% codeblock lang:yml %}
- class_name: 那些人，那些事
  class_desc: 软件开发往往是这样：最开始的 90% 代码占用了开始的 90% 的开发时间；剩下 10% 代码同样需要 90% 的开发时间
  link_list:
    - name: CSDN
      link: https://www.csdn.net/
      # 图标
      avatar: https://pic.imgdb.cn/item/637ee66616f2c2beb1556f7b.png
      descr: 专业开发者社区

- class_name: blog
  class_desc: Hexo 博客搭建
  link_list:
    - name: Hexo
      link: https://hexo.io/zh-cn/
      # 图标
      avatar: https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg
      descr: 快速、简单且强大的博客框架
    - name: hexo-douban
      link: https://github.com/mythsman/hexo-douban
      avatar: https://pic.imgdb.cn/item/637ee2bf16f2c2beb150ee17.png
      descr: 一个在 Hexo 页面中嵌入豆瓣个人主页的小插件
{% endcodeblock %}
`class_name`和 `class_desc`支持 html 格式书写，如不需要，也可以留空。
<!-- endtab -->
<!-- tab 远程拉取 -->
{% note info modern %}
从 `4.0.0` 开始，支持从远程加载友情链接，远程拉取只支持 `json`
{% endnote %}

{% note warning modern %}
选择远程加载后，本地生成的方法会无效
{% endnote %}

在 `source/link/index.md` 这个文件的 front-matter 添加远程链接
{% codeblock lang:markdown %}
flink_url: xxxxx
{% endcodeblock %}

Json格式如下
{% codeblock lang:json %}
[
  {
    "class_name": "友情链接",
    "class_desc": "那些人，那些事",
    "link_list": [
      {
        "name": "Hexo",
        "link": "https://hexo.io/zh-tw/",
        "avatar": "https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg",
        "descr": "快速、简单且强大的网志框架"
      }
    ]
  },
  {
    "class_name": "网站",
    "class_desc": "值得推荐的网站",
    "link_list": [
      {
        "name": "Youtube",
        "link": "https://www.youtube.com/",
        "avatar": "https://i.loli.net/2020/05/14/9ZkGg8v3azHJfM1.png",
        "descr": "视频网站"
      },
      {
        "name": "Weibo",
        "link": "https://www.weibo.com/",
        "avatar": "https://i.loli.net/2020/05/14/TLJBum386vcnI1P.png",
        "descr": "中国最大社交分享平台"
      },
      {
        "name": "Twitter",
        "link": "https://twitter.com/",
        "avatar": "https://i.loli.net/2020/05/14/5VyHPQqR6LWF39a.png",
        "descr": "社交分享平台"
      }
    ]
  }
]
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

#### 友情链接界面设置

{% note info modern %}
由 `2.2.0` 起，友情链接界面可以由用户自己自定义，只需要在友情链接的md档设置就行，以普通的Markdown格式书写。
{% endnote %}

### 图库

图库页面只是普通的页面，你只需要`hexo n page xxxxx`创建你的页面就行

然后使用标签外挂[gallery](https://cmwlvip.github.io/2022/11/03/HexoTagPlugins/#Gallery%E7%9B%B8%E5%86%8C%E5%9B%BE%E5%BA%93)

#### 子页面

子页面也是普通的页面，你只需要`hexo n page xxxxx`创建你的页面就行

然后使用标签外挂[gallery](https://cmwlvip.github.io/2022/11/03/HexoTagPlugins/#Gallery%E7%9B%B8%E5%86%8C%E5%9B%BE%E5%BA%93)

{% note pink 'fas fa-sitemap' modern %}
如果你想要使用 `/photo/ohmygirl` 这样的链接显示你的图片内容
你可以把创建好的`ohmygirl`整个文件夹移到`photo`文件夹里去
{% endnote %}

### 404页面

主题内置了一个简单的404页面，可在设置中开启

{% note info modern %}
本地预览时，访问出错的网站是不会跳到404页面的。

如需本地预览，请访问`http://localhost:4000/404.html`
{% endnote %}

{% codeblock lang:yaml %}
# A simple 404 page
error_404:
  enable: true
  subtitle: "页面没有找到"
  background: 
{% endcodeblock %}

![404](hexo-theme-butterfly-docs-error404.png)

## 语言

修改站点**根目录**配置文件`_config.yml`

主题支持三种语言

- default(en)
- zh-CN(简体中文)
- zh-TW(简体中文)

### 网站资料

修改网站各种资料，例如标题、副标题和邮箱等个人资料，请修改博客**根目录**的`_config.yml`

## 导航菜单

修改 `主题配置文件`

{% codeblock lang:yaml %}
menu:
  Home: / || fas fa-home
  List||fas fa-list:
    Archives: /archives/ || fas fa-archive
    Tags: /tags/ || fas fa-tags
    Categories: /categories/ || fas fa-folder-open
  Fun||fas fa-heart-pulse:
    Book: /books/ || fas fa-book-open
    Movie: /movies/ || fas fa-video
    Game: /games/ || fab fa-steam
  Link: /link/ || fas fa-link
  About: /about/ || fas fa-heart
{% endcodeblock %}

必须是 `/xxx/`，后面`||`分开，然后写图标名

如果不希望显示图标，图标名可不写

{% note warning modern %}
导航的文字可自行更改
{% endnote %}

## 代码

{% note warning modern %}
代码块中的所有功能只适用于 Hexo 自带的代码渲染
如果使用第三方的渲染器，不一定会有效
{% endnote %}

### 代码高亮主题

{% tabs code %}
<!-- tab 默认主题 -->
`Butterfly`支持6种代码高亮样式：

- darker
- pale night
- light
- ocean
- mac
- mac light

修改 `主题配置文件`
{% codeblock lang:yaml %}
highlight_theme: light
{% endcodeblock %}

{% blockquote %}
dark
{% endblockquote %}
![dark](hexo-theme-butterfly-doc-code-darker.png)

{% blockquote %}
pale night
{% endblockquote %}
![pale night](hexo-theme-butterfly-doc-code-pale-night.png)

{% blockquote %}
light
{% endblockquote %}
![light](hexo-theme-butterfly-doc-code-light.png)

{% blockquote %}
ocean
{% endblockquote %}
![ocean](hexo-theme-butterfly-doc-highlight-ocean.png)

{% blockquote %}
mac
{% endblockquote %}
![mac](hexo-theme-butterfly-doc-highlight-mac.png)

{% blockquote %}
mac light
{% endblockquote %}
![mac light](hexo-theme-butterfly-docs-mac-light.png)
<!-- endtab -->

<!-- tab 自定义主题 -->

<!-- endtab -->
{% endtabs %}

### 代码复制

主题支持代码复制功能

修改 `主题配置文件`

{% codeblock lang:yaml %}
highlight_copy: true
{% endcodeblock %}

### 代码框展开/关闭

在默认情况下，代码框自动展开，可设置是否所有代码框都关闭状态，点击`>`可展开代码

- true全部代码框不展开，需点击`>`打开
- false 代码框展开，有`>`点击按钮 
- none 不显示`>`按钮

修改 `主题配置文件`
{% codeblock lang:yaml %}
highlight_shrink: true #代码框不展开，需点击 '>' 打开
{% endcodeblock %}

{% note info modern %}
你也可以在post/page页对应的markdown文件front-matter添加highlight_shrink来独立配置。

当**主题配置文件**中的 `highlight_shrink` 设为true时，可在front-matter添加`highlight_shrink: false`来单独配置文章展开代码框。

当**主题配置文件**中的 `highlight_shrink` 设为false时，可在front-matter添加`highlight_shrink: true`来单独配置文章收缩代码框。
{% endnote %}

### 代码换行

**在默认情况下，Hexo在编译的时候不会实现代码自动换行。**如果你不希望在代码块的区域里有横向滚动条的话，那么可以考虑开启这个功能。

修改 `主题配置文件`
{% codeblock lang:yaml %}
code_word_wrap: true
{% endcodeblock %}

如果你是使用 highlight 渲染，需要找到你站点的 Hexo 配置文件`_config.yml`，将`line_number`改成`false`:
{% codeblock lang:yaml %}
highlight:
  enable: true
  line_number: false # <- 改这里
  auto_detect: false
  tab_replace:
{% endcodeblock %}

如果你是使用 prismjs 渲染，需要找到你站点的 Hexo 配置文件`_config.yml`，将`line_number`改成`false`:
{% codeblock lang:yaml %}
prismjs:
  enable: false
  preprocess: true
  line_number: false # <- 改这里
  tab_replace: ''
{% endcodeblock %}

### 代码高度限制

可配置代码高度限制，超出的部分会隐藏，并显示展开按钮。
{% codeblock lang:yaml %}
highlight_height_limit: false # unit: px
{% endcodeblock %}

{% note warning modern %}

1. 单位是`px`，直接添加数字，如 400
2. 实际限制高度为 `highlight_height_limit + 30 px` ，多增加 30px 限制，目的是避免代码高度只超出highlight_height_limit 一点时，出现展开按钮，展开没内容。
3. 不适用于隐藏后的代码块（ css 设置 display: none）
{% endnote %}

![代码高度限制](hexo-theme-butterfly-docs-highlight-heigh-limit.gif)

https://fontawesome.com/search

## 社交图标

Butterfly支持[font-awesome v6](https://fontawesome.com/icons?from=io)图标.

书写格式 `图标名：url || 描述性文字`
{% codeblock lang:yaml %}
social:
  fab fa-github: https://github.com/xxxxx || Github
  fas fa-envelope: mailto:xxxxxx@gmail.com || Email
{% endcodeblock %}

## 主页文章节选(自动节选和文章页description)

因为主题UI的关系，`主页文章节选`只支持`自动节选`和`文章页description`。

在`butterfly`里，有四种可供选择

1. **description**： 只显示description
2. **both**： 优先选择description，如果没有配置description，则显示自动节选的内容
3. **auto_excerpt**：只显示自动节选
4. **false**： 不显示文章内容

修改`主题配置文件`
{% codeblock lang:yaml %}
index_post_content:
  method: 3
  length: 500 # if you set method to 2 or 3, the length need to config
{% endcodeblock %}
`description`在[front-matter](#Front-matter)里添加

## 顶部图

{% note info modern %}
如果不要显示顶部图，可直接配置 `disable_top_img: true`
{% endnote %}

{% note primary modern %}
顶部图的获取顺序，如果都没有配置，则不显示顶部图。

1. 页面顶部图的获取顺序：
`各自配置的 top_img > 配置文件的 default_top_img`
2. 文章页顶部图的获取顺序：
`各自配置的 top_img > cover > 配置文件的 default_top_img`
{% endnote %}

| 配置 | 解释 |
| --- | ---- |
| index_img | 主页的 top_img |
| default_top_img | 默认的 top_img，当页面的 top_img 没有配置时，会显示 default_top_img |
| archive_img | 归档页面的 top_img |
| tag_img | tag 子页面 的 默认 top_img |
| tag_per_img | tag 子页面的 top_img，可配置每个 tag 的 top_img |
| category_img | category 子页面 的 默认 top_img |
| category_per_img | category 子页面的 top_img，可配置每个 category 的 top_img |

其它页面 （tags/categories/自建页面）和 文章页 的 `top_img` ，请到对应的 md 页面设置`front-matter`中的`top_img`

以上所有的 top_img 可配置以下值

| 配置的值 | 效果 |
| -------- |---- |
| 留空 | 显示默认的 top_img（如有），否则显示默认的顔色<br>（文章页top_img留空的话，会显示 cover 的值）|
| img链接 | 图片的链接，显示所配置的图片 |
| 顔色(<br>**HEX值** - #0000FF<br>**RGB值** - rgb(0,0,255)<br>**顔色单词** - orange<br>**渐变色** - linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%)<br>）| 对应的顔色 |
| transparent | 透明 |
| false | 不显示 top_img |

{% note success modern %}
`tag_per_img` 和 `category_per_img`可对 tag 和 category 进行单独的配置
{% endnote %}

并不推荐为每个 tag 和每个 category 都配置不同的顶部图，因为配置太多会拖慢生成速度

{% codeblock lang:yaml ForExample %}
tag_per_img：
  Hexo: https://xxxxxx.png
  Java: java.png
 
category_per_img：
  随想: 1.png
  推荐: 2.png
{% endcodeblock %}

{% tabs top %}
<!-- tab top_img: orange -->
![orange](theme-butterfly-docs-top-img-orange.png)
<!-- endtab -->
<!-- tab top_img: 'linear-gradient(20deg, #0062be, #925696, #cc426e, #fb0347)' -->
![渐变色](theme-butterfly-docs-top-img-color.png)
<!-- endtab -->
{% endtabs %}

## 文章置顶

【推荐】`hexo-generator-index`从 2.0.0 开始，已经支持文章置顶功能。
直接在文章的[front-matter](#Front-matter)区域里添加`sticky: 1`属性来把这篇文章置顶。
{% note info modern %}
数值越大，置顶的优先级越大
{% endnote %}

## 文章封面

文章的 markdown 文档上,在 [front-matter](#Front-matter) 添加 `cover` ,并填上要显示的图片地址。

如果不配置 `cover`,可以设置显示默认的 `cover`。

如果不想在首页显示cover, 可以设置为 `false`。

{% note primary modern %}
文章封面的获取顺序 `Front-matter 的 cover` > 配置文件的 `default_cover` > `false`
{% endnote %}

修改`主题配置文件`
{% codeblock lang:yaml %}
cover:
  # 是否显示文章封面
  index_enable: true
  aside_enable: true
  archives_enable: true
  # 封面显示的位置
  # 三个值可配置 left , right , both
  position: both
  # 当没有设置cover时，默认的封面显示
  default_cover: 
{% endcodeblock %}

| 参数 | 解释 |
| ----- | ---- |
| index_enable | 主页是否显示文章封面图 |
| aside_enable | 侧栏是否显示文章封面图 |
| archives_enable | 归档页面是否显示文章封面图 |
| position | 主页卡片文章封面的显示位置<br>- left：全部显示在左边<br>- right：全部显示在右边<br>- both：封面位置以左右左右轮流显示 |
| default_cover	 | 默认的 cover, 可配置图片链接/顔色/渐变色等 |

当配置多张图片时,会随机选择一张作为cover.此时写法应为
{% codeblock lang:yaml %}
default_cover:
   - https://file.crazywong.com/gh/jerryc127/CDN@latest/cover/default_bg.png
  - https://file.crazywong.com/gh/jerryc127/CDN@latest/cover/default_bg2.png
  - https://file.crazywong.com/gh/jerryc127/CDN@latest/cover/default_bg3.png
{% endcodeblock %}

## 文章页相关配置

### 文章meta显示

这个选项是用来显示文章的相关信息的。

修改`主题配置文件`
{% codeblock lang:yaml %}
post_meta:
  page:
    date_type: both # created or updated or both 主页文章日期是创建日或者更新日或都显示
    date_format: relative # date/relative 显示日期还是相对日期
    categories: true # true or false 主页是否显示分类
    tags: true # true or false 主页是否显示标签
    label: true # true or false 显示描述性文字
  post:
    date_type: both # created or updated or both 文章页日期是创建日或者更新日或都显示
    date_format: relative # date/relative 显示日期还是相对日期
    categories: true # true or false 文章页是否显示分类
    tags: true # true or false 文章页是否显示标签
    label: true # true or false 显示描述性文字
{% endcodeblock %}

### 文章版权

为博客文章展示文章版权和许可协议。

修改`主题配置文件`
{% codeblock lang: %}
post_copyright:
  enable: true
  decode: false
  author_href:
  license: CC BY-NC-SA 4.0
  license_url: https://creativecommons.org/licenses/by-nc-sa/4.0/
{% endcodeblock %}
由于`Hexo 4.1`开始，默认对网址进行解码，以至于如果是中文网址，会被解码，可设置`decode: true`来显示中文网址。

如果有文章（例如：转载文章）不需要显示版权，可以在文章[Front-matter](#Front-matter)单独设置
{% codeblock lang:yaml %}
copyright: false
{% endcodeblock %}

从`3.0.0`开始，支持对单独文章设置版权信息，可以在文章Front-matter单独设置
{% codeblock lang:markdown %}
copyright_author: xxxx
copyright_author_href: https://xxxxxx.com
copyright_url: https://xxxxxx.com
copyright_info: 此文章版权归xxxxx所有，如有转载，请注明来自原作者
{% endcodeblock %}

### 文章打赏

在每篇文章的结尾，可以添加打赏按钮。相关二维码可以自行配置。

对于没有提供二维码的，可配置一张软件的icon图片，然后在link上添加相应的打赏链接。用户点击图片就会跳转到链接去。

link可以不写，会默认为图片的链接。

修改`主题配置文件`

{% codeblock lang:yaml %}
reward:
  enable: true
  QR_code:
    - img: /img/wechat.jpg
      link:
      text: 微信
    - img: /img/alipay.jpg
      link:
      text: 支付宝
{% endcodeblock %}

### TOC

在文章页，会有一个目录，用于显示TOC。
修改`主题配置文件`

{% codeblock lang:yaml %}
toc:
  post: true
  page: true
  number: true
  expand: false
  style_simple: false # for post
  scroll_percent: true
{% endcodeblock %}

| 属性 | 解释 |
| ---- | ---- |
| post | 文章页是否显示 TOC |
| page | 普通页面是否显示 TOC |
| number | 是否显示章节数 |
| expand | 是否展开 TOC |
| style_simple | 简洁模式（侧边栏只显示 TOC, 只对文章页有效 ）|
| scroll_percent | 是否显示滚动进度百分比 |

#### 为特定的文章配置

在你的文章`md`文件的头部，加入`toc_number`和`toc`，并配置`true`或者`false`即可。

主题会优先判断文章Markdown的Front-matter是否有配置，如有，则以Front-matter的配置为准。否则，以**主题配置文件**中的配置为准

### 相关文章

{% note warning modern %}
当文章封面设置为 false 时，或者没有获取到封面配置，相关文章背景将会显示主题色。
{% endnote %}

相关文章推荐的原理是根据文章tags的比重来推荐

修改`主题配置文件`
{% codeblock lang:yaml %}
related_post:
  enable: true
  limit: 6 # 显示推荐文章数目
  date_type: created # or created or updated 文章日期显示创建日或者更新日
{% endcodeblock %}

### 文章过期提醒

可设置是否显示文章过期提醒，以更新时间为基准。

修改`主题配置文件`
{% codeblock lang:yaml %}
# Displays outdated notice for a post (文章过期提醒)
noticeOutdate:
  enable: true
  style: flat # style: simple/flat
  limit_day: 365 # When will it be shown
  position: top # position: top/bottom
  message_prev: It has been
  message_next: days since the last update, the content of the article may be outdated.
{% endcodeblock %}

| 属性 | 解释 |
| ---- | ----- |
| limit_day | 距离更新时间多少天才显示文章过期提醒 |
| message_prev | 天数之前的文字 |
| message_next | 天数之后的文字 |

{% blockquote %}
style: flat
{% endblockquote %}
![flat](hexo-theme-butteffly-docs-outdate-flat.png)

{% blockquote %}
style: simple
{% endblockquote %}
![simple](hexo-theme-butterfly-docs-outdated-simple.png)

### 文章编辑按钮

在文章标题旁边显示一个编辑按钮，点击会跳转到对应的链接去。
{% codeblock lang:yaml %}
# Post edit
# Easily browse and edit blog source code online.
post_edit:
  enable: false
  # url: https://github.com/user-name/repo-name/edit/branch-name/subdirectory-name/
  # For example: https://github.com/jerryc127/butterfly.js.org/edit/main/source/
  url:
{% endcodeblock %}

### 文章分页按钮

{% note warning modern %}
当文章封面设置为 false 时，或者没有获取到封面配置，分页背景将会显示主题色。
{% endnote %}

可设置分页的逻辑，也可以关闭分页显示
{% codeblock lang:yaml %}
# post_pagination (分页)
# value: 1 || 2 || false
# 1: The 'next post' will link to old post
# 2: The 'next post' will link to new post
# false: disable pagination
post_pagination: false
{% endcodeblock %}

| 参数 | 解释 |
| ---- | ---- |
| post_pagination: false | 关闭分页按钮 |
| post_pagination: 1 | 下一篇显示的是旧文章 |
| post_pagination: 2 | 下一篇显示的是新文章 |

## 页面锚点

开启页面锚点后，当你在进行滚动时，**页面链接会根据标题ID进行替换**
(注意: 每替换一次，会留下一个历史记录。所以如果一篇文章有很多锚点的话，网页的历史记录会很多。)

修改`主题配置文件`
{% codeblock lang:yaml %}
# anchor
# when you scroll in post , the url will update according to header id.
anchor:
  button:
    enable: false
    always_show: false
    icon: # the unicode value of Font Awesome icon, such as '\3423'
  auto_update: false # when you scroll in post, the URL will update according to header id.
{% endcodeblock %}

## 头像

修改`主题配置文件`
{% codeblock lang:yaml %}
avatar:
  img: /img/avatar.png
  effect: true # 头像会一直转圈
{% endcodeblock %}

## 图片描述

可开启图片Figcaption**描述文字显示**

描述文字优先显示图片的 title 属性，然后是 alt 属性

修改`主题配置文件`
{% codeblock lang:yaml %}
photofigcaption: true
{% endcodeblock %}

## 复制相关配置

可配置网站是否可以复制、复制的内容是否添加版权信息
{% codeblock lang:yaml %}
# copy settings
# copyright: Add the copyright information after copied content (复制的内容后面加上版权信息)
copy:
  enable: true
  copyright:
    enable: true
    limit_count: 50
{% endcodeblock %}

| 参数 | 解释 |
| ---- | --- |
| enable | 是否开启网站复制权限 |
| copyright	| 复制的内容后面加上版权信息 |
| enable | 是否开启复制版权信息添加 |
| limit_count	 | 字数限制，当复制文字大于这个字数限制时，将在复制的内容后面加上版权信息|

## Footer 设置

### 博客年份

`since`是一个来展示你站点起始时间的选项。它位于页面的最底部。

修改`主题配置文件`
{% codeblock lang:yaml %}
footer:
  owner:
    enable: true
    since: 2018
{% endcodeblock %}

### 页脚自定义文本

`custom_text`是一个给你用来在页脚自定义文本的选项。通常你可以在这里写声明文本等。支持 HTML。

修改`主题配置文件`
{% codeblock lang:yaml %}
custom_text: Hi, welcome to my <a href="https://butterfly.js.org/">blog</a>!
{% endcodeblock %}

对于部分人需要写 ICP 的，也可以写在`custom_text`里
{% codeblock lang:yaml %}
custom_text: <a href="icp链接"><img class="icp-icon" src="icp图片"><span>备案号：xxxxxx</span></a>
{% endcodeblock %}

## 右下角按钮

### 简繁转换

简体繁体互换

右下角会有简繁转换按钮。

修改`主题配置文件`

{% codeblock lang:yaml %}
translate:
  enable: true
  # 默认按钮显示文字(网站是简体，应设置为'default: 繁')
  default: 简
  #网站默认语言，1: 繁体中文, 2: 简体中文
  defaultEncoding: 1
  #延迟时间,若不在前, 要设定延迟翻译时间, 如100表示100ms,默认为0
  translateDelay: 0
  #当文字是简体时，按钮显示的文字
  msgToTraditionalChinese: "繁"
  #当文字是繁体时，按钮显示的文字
  msgToSimplifiedChinese: "简"
{% endcodeblock %}

### 夜间模式

右下角会有夜间模式按钮

修改`主题配置文件`
{% codeblock lang:yaml %}
# dark mode
darkmode:
  enable: true
  # dark mode和 light mode切换按钮
  button: true
  autoChangeMode: false
{% endcodeblock %}

| autoChangeMode值 | 解释 |
| -------------- | ---- |
| 1 | 跟随系统而变化，不支持的浏览器/系统将按照时间晚上6点到早上6点之间切换为 dark mode |
| 2 | 只按照时间 晚上6点到早上6点之间切换为 dark mode,其余时间为light mode |
| false | 取消自动切换 |

### 阅读模式

阅读模式下会去掉除文章以外的内容，避免干扰阅读。

只会出现在文章页面，右下脚会有阅读模式按钮。

修改`主题配置文件`
{% codeblock lang:yaml %}
readmode: true
{% endcodeblock %}

### 滚动状态百分比

修改`主题配置文件`
{% codeblock lang:yaml %}
# show scroll percent in scroll-to-top button
rightside_scroll_percent: true
{% endcodeblock %}

### 按钮排序

{% codeblock lang:yaml %}
# Don't modify the following settings unless you know how they work (非必要请不要修改 )
# Choose: readmode,translate,darkmode,hideAside,toc,chat,comment
# Don't repeat 不要重复
rightside_item_order:
  enable: false
  hide: # readmode,translate,darkmode,hideAside
  show: # toc,chat,comment
{% endcodeblock %}

{% note warning modern %}
不要重复
{% endnote %}

## 侧边栏设置

### 侧边排版

可自行决定哪个项目需要显示，可决定位置，也可以设置不显示侧边栏。

修改`主题配置文件`
{% codeblock lang:yaml %}
aside:
  enable: true
  hide: false
  button: true (true左下角单双栏按钮开启)
  mobile: true # display on mobile
  position: right # left or right(决定侧边栏在左还是在右)
  display:
    archive: true
    tag: true
    category: true
  card_author:
    enable: true
    description:
    button:
      enable: true
      icon: fab fa-github
      text: Follow Me
      link: https://github.com/xxxxxx
  card_announcement:
    enable: true
    content: This is my Blog
  card_recent_post:
    enable: true
    limit: 5 # if set 0 will show all
    sort: date # date or updated
    sort_order: # Don't modify the setting unless you know how it works
  card_categories:
    enable: true
    limit: 8 # if set 0 will show all
    expand: none # none/true/false
    sort_order: # Don't modify the setting unless you know how it works
  card_tags:
    enable: true (true彩色标签)
    limit: 40 # if set 0 will show all
    color: false
    orderby: random # Order of tags, random/name/length
    order: 1 # Sort of order. 1, asc for ascending; -1, desc for descending
    sort_order: # Don't modify the setting unless you know how it works
  card_archives:
    enable: true
    type: monthly # yearly or monthly
    format: MMMM YYYY # eg: YYYY年MM月
    order: -1 # Sort of order. 1, asc for ascending; -1, desc for descending
    limit: 8 # if set 0 will show all
    sort_order: # Don't modify the setting unless you know how it works
  card_webinfo:
    enable: true
    post_count: true
    last_push_date: true
    sort_order: # Don't modify the setting unless you know how it works
{% endcodeblock %}

### 访问人数 busuanzi (UV 和 PV)

访问 [busuanzi官方网站](http://busuanzi.ibruce.info/)查看更多的介绍。

修改`主题配置文件`
{% codeblock lang:yaml %}
busuanzi:
  site_uv: true
  site_pv: true
  page_pv: true
{% endcodeblock %}

{% note info modern %}
如果需要修改 busuanzi 的 CDN 链接，可通过 主题配置文件 的 CDN 中的 option 进行修改
{% endnote %}
{% codeblock lang:yaml %}
CDN:
  option:
  	busuanzi: xxxxxxxxx
{% endcodeblock %}

### 运行时间

网页已运行时间

修改`主题配置文件`
{% codeblock lang:yaml %}
runtimeshow:
  enable: true
  publish_date: 6/7/2018 00:00:00  
  ##网页开通时间
  #格式: 月/日/年 时间
  #也可以写成 年/月/日 时间
{% endcodeblock %}

### 最新评论

{% note primary modern %}
最新评论只会在刷新时才会去读取，并不会实时变化

最新评论只会在刷新时才会去读取，并不会实时变化

由于 API 有 访问次数限制，为了避免调用太多，主题默认存取期限为 10 分钟。也就是説，调用后资料会存在 localStorage 里，10分钟内刷新网站只会去 localStorage 读取资料。 10 分钟期限一过，刷新页面时才会去调取 API 读取新的数据。（ 3.6.0 新增了 `storage` 配置，可自行配置缓存时间）
{% endnote %}

在侧边栏显示最新评论板块

修改`主题配置文件`
{% codeblock lang:yaml %}
# Aside widget - Newest Comments
newest_comments:
  enable: true
  sort_order: # Don't modify the setting unless you know how it works
  limit: 6
  storage: 10 # unit: mins, save data to localStorage
  avatar: true
{% endcodeblock %}

| 配置 | 解释 |
| ---- | ---- |
| limit | 显示的数量 |
| storage | 设置缓存时间，单位 分钟 |
| avatar | 是否显示头像 |

### 自定义添加栏目

## 扩展

{% note default modern %}
以下插件的使用可前往{% post_link hexo-plugins %}

- 音乐
- 评论
{% endnote %}

[更多](https://butterfly.js.org/posts/4073eda)

## 网站优化

[更多](https://butterfly.js.org/posts/ceeb73f)