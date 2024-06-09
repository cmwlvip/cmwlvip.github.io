---
title: hexo-plugins
date: 2023-02-23 12:22:55
updated: 2024-06-09
tags: 
    - Hexo
    - Butterfly
categories: Hexo
description: 记录一些使用过的Hexo插件
cover: https://pic1.imgdb.cn/item/63676da116f2c2beb11fa14a.png
top_img: https://pic.imgdb.cn/item/63f9b264f144a010070a34c0.jpg
---


## 音乐(hexo-tag-aplayer)

音乐界面使用了插件 `hexo-tag-aplayer`

### hexo-tag-aplayer下载

{% codeblock lang:bash %}
npm install --save hexo-tag-aplayer
{% endcodeblock %}

### hexo-tag-aplayer基本使用

```markdown
{% aplayer title author url [picture_url, narrow, autoplay, width:xxx, lrc:xxx] %}
```

使用参考插件[文档](https://github.com/MoePlayer/hexo-tag-aplayer/blob/master/docs/README-zh_cn.md)

{% note danger modern %}
不知道怎么错了，搞不定！！ 加载本地音乐就没成功过！！！
{% endnote %}

但是3.0新版本的Aplayer已经支持`MeingJS`了，**MetingJS**是基于Meting API 的 APlayer 衍生播放器，引入 MetingJS 后，播放器将支持对于 QQ音乐、网易云音乐、虾米、酷狗、百度等平台的音乐播放。

### Meing JS支持(3.0 新功能)

修改Hexo配置文件`_config.yml`
{% codeblock lang:yaml %}
aplayer:
  meting: true
{% endcodeblock %}

接着就可以通过 `{% meting ...%}` 在文章中使用 MetingJS 播放器了：

{% label "简单示例(id,server,type)" green %}

```markdown
{% meting "0009DtA34CLrKk" "tencent" "song" %}
```

{% meting "0009DtA34CLrKk" "tencent" "song" %}

{% label 进阶示例 green %}

```markdown
{% meting "0009DtA34CLrKk" "tencent" "song" "autoplay" "mutex:false" "preload:none" "theme:#ad7a86"%}
```

{% meting "0009DtA34CLrKk" "tencent" "song" "autoplay" "mutex:false" "preload:none" "theme:#ad7a86"%}

有关 `{% meting %}` 的选项列表如下:

| 选项 | 默认值 | 描述 |
| ---- | ----- | ---- |
| id | **必须值** | 歌曲 id / 播放列表 id / 相册 id / 搜索关键字 |
| server | **必须值** | 音乐平台: `netease` ,`tencent`, `kugou`, `xiami`, `baidu` |
| type | **必须值** | `song`, `playlist`, `album`, `search`, `artist` |
| fixed | `false` | 开启固定模式，加入`fixed`开启固定（左下角）用于全局 |
| mini | `false` | 开启迷你模式，加入`mini`开启，只有小图标呈现 |
| loop | `all` | 列表循环模式：`all`, `one`,`none` |
| order | `list` | 列表播放模式： `list`, `random`|
| volume | 0.7 | 播放器音量 |
| lrctype | 0 | 歌词格式类型，好像不为0会没有歌词 |
| listfolded | `false` | 指定音乐播放列表是否折叠 |
| storagename | `metingjs` | LocalStorage 中存储播放器设定的键名 |
| autoplay | `true` | 自动播放，移动端浏览器暂时不支持此功能，加`autoplay`表示自动播放 |
| mutex | `true` | 该选项开启时，如果同页面有其他 aplayer 播放，点击播放，其他播放器会暂停 |
| listmaxheight | `340px` | 播放列表的最大长度 |
| preload | `auto` | 音乐文件预载入模式(进度条)，可选项： `none`, `metadata`, `auto` |
| theme | `#ad7a86` | 播放器风格色彩设置 |

### 添加全局吸底Aplayer

#### 简述

如果想使用aplayer，很多人都会推荐安装 [hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer) 这款插件。这款插件通过 Hexo 独有的标签外挂，我们可以很方便的写入一些参数，插件就会帮我们生成对应的 html。如果你只是使用一些简单的功能，其实无需使用到这个插件，只需以 html 格式书写就行，不用插件去转换。

**For example：**
如果使用插件，在 markdown 中要这样写

```markdown
{% meting "000PeZCQ1i4XVs" "tencent" "artist" "theme:#3F51B5" "mutex:true" "preload:auto" %}
```

会被插件渲染为
{% codeblock lang:html %}
<div id="aplayer-uxAIfEUs" class="aplayer aplayer-tag-marker meting-tag-marker" data-id="000PeZCQ1i4XVs" data-server="tencent" data-type="artist" data-mode="circulation" data-autoplay="false" data-mutex="true" data-listmaxheight="340px" data-preload="auto" data-theme="#3F51B5"></div>
{% endcodeblock %}

{% note info modern %}
如果我们不想使用插件，就需要在markdown中用html的格式书写，同时把主题配置文件中的`aplayerInject`开启
{% endnote %}

{% codeblock lang:markdown %}
<div class="aplayer" data-id="000PeZCQ1i4XVs" data-server="tencent" data-type="artist" data-mutex="true" data-preload="auto" data-theme="#3F51B5"></div>
{% endcodeblock %}

#### 关闭`asset_inject`

由于需要全局都插入 aplayer 和 meting 资源，为了防止插入重复的资源，需要把 asset_inject 设为 `false`

修改`Hexo配置文件`
{% codeblock lang:yaml %}
aplayer:
  meting: true
  asset_inject: false
{% endcodeblock %}

#### 开启主题的`aplayerInject`

修改`主题配置文件`
{% codeblock lang:yaml %}
# Inject the css and script (aplayer/meting)
aplayerInject:
  enable: true
  per_page: true
{% endcodeblock %}

#### 插入 Aplayer html

把 `aplayer`代码 插入到主题配置文件的 `inject.bottom` 去
{% codeblock lang:yaml %}
inject:
 head:
 bottom:
    - <div class="aplayer no-destroy" data-id="8332009741" data-server="tencent" data-type="playlist" data-fixed="true" data-mini="true" data-autoplay="false" > </div>
{% endcodeblock %}

{% note info modern %}
参数使用同上面aplayer标签参数，只是前面加上`data-`即可
{% endnote %}

运行 Hexo 就可以看到网页左下角出现了 Aplayer

最后，如果你想切换页面时，音乐不会中断。设置`主题配置文件`的`pjax: true`

## 评论

{% tabs comment %}
<!-- tab 通用设置 -->
支持双评论显示，只需要配置两个评论（第一个为默认显示）

{% codeblock lang:yaml %}
comments:
  # Up to two comments system, the first will be shown as default
  # Choose: Disqus/Disqusjs/Livere/Gitalk/Valine/Waline/Utterances/Facebook Comments/Twikoo
  use: Valine,Disqus
  text: true # Display the comment name next to the button
  # lazyload: The comment system will be load when comment element enters the browser's viewport.
  # If you set it to true, the comment count will be invalid
  lazyload: true
  count: true # Display comment count in top_img
  card_post_count: false # Display comment count in Home Page
{% endcodeblock %}

| 参数 | 解释 |
| ---- | ---- |
| use | 使用的评论（请注意，最多支持两个，如果不需要请留空）<br>注意：双评论不能是 Disqus 和 Disqusjs 一起，由于其共用同一个 ID，会出错 |
| text | 是否显示评论服务商的名字 |
| lazyload | 是否为评论开启lazyload，开启后，只有滚动到评论位置时才会加载评论所需要的资源（开启 lazyload 后，评论数将不显示） |
| count | 是否在文章顶部显示评论数<br>livere、Giscus 和 utterances 不支持评论数显示 |
| card_post_count | 是否在首页文章卡片显示评论数<br>gitalk、livere 、Giscus 和 utterances 不支持评论数显示|

<!-- endtab -->

<!-- tab Twikoo -->
`Twikoo`是一个简洁、安全、无后端的静态网站评论系统，基于[腾讯云](https://cloud.tencent.com/)开发。

具体如何配置评论，请查看[Twikoo文档](https://twikoo.js.org/quick-start.html#vercel-部署)

只需要把获取到的 `环境ID (envId)` 填写到配置上去就行

修改`主题配置文件`
{% codeblock lang:yaml %}
twikoo:
  envId:
  region:
  visitor: false
  option:
{% endcodeblock %}

| 参数 | 解释 |
| ---- | ---- |
| envId | 环境 ID（配置好的评论系统网址）这里我用的是[Vercel](https://vercel.com/)部署 |
| region | 环境地域，默认为 ap-shanghai，如果您的环境地域不是上海，需传此参数 |
| visitor | 是否显示文章閲读数 |
| option | 可选配置 |

{% note info modern %}
开启 visitor 后，文章页的访问人数将改为`Twikoo`提供，而不是 **不蒜子**
{% endnote %}

![Twikoo](2023-03-02-21-02-53.png)
<!-- endtab -->

<!-- tab Waline -->
`Waline`是一款从 Valine 衍生的带后端评论系统。可以将 Waline 等价成 With backend Valine。

具体配置参考[waline文档](https://waline.js.org/)，这里我用的是[Vercel](https://vercel.com/)部署

修改`主题配置文件`
{% codeblock lang:yaml %}
waline:
  serverURL: # Waline server address url
  bg: # waline background
  pageview: false
  option:
{% endcodeblock %}

{% note info modern %}
开启 visitor 后，文章页的访问人数将改为`Waline`提供，而不是 **不蒜子**
{% endnote %}
![Waline](2023-03-02-21-10-19.png)
<!-- endtab -->

<!-- tab livere(来比力) -->
注册[来必力](https://livere.com/)，配置你自己的来必力设置，然后在`Butterfly`里开启它。

修改`主题配置文件`
{% codeblock lang:yaml %}
livere:
  uid:
{% endcodeblock %}

![livere.id](2023-02-25-17-39-46.png)
<!-- endtab -->

{% endtabs %}

## hexo-douban

一个在 [Hexo](https://hexo.io/) 页面中嵌入豆瓣个人主页的小插件。

### 配置

将配置文件写入站点的配置文件 `_config.yml` 里(不是主题的配置文件)。

{% gist 848ffcc4fd6769d0b24e48f951f504f6 m %}
{% gist 848ffcc4fd6769d0b24e48f951f504f6 [filename] %}
