---
title: Hexo Built-in Tag Plugins (Hexo内置标签外挂)
date: 2022-11-03 14:08:31
updated: 2022-11-27
sticky: 
categories: Hexo
tags:
    - Hexo
    - Butterfly
keywords:
    - Hexo
    - Butterfly

cover: https://pic1.imgdb.cn/item/6364a40416f2c2beb1303eee.jpg

---

Tag plugins are different from post tags. They are ported from Octopress and provide a useful way for you to quickly add specific content to your posts.

## 标签外挂（Butterfly Tag Plugins）

{% note info flat %}
标签外挂是Hexo独有的功能，并不是标准的Markdown格式。

以下的写法，只适用于Butterfly主题，用在其它主题上不会有效果，甚至可能会报错。使用前请留意!
{% endnote %}

{% note info warning %}
标签外挂虽然能为主题带来一些额外的功能和UI方面的强化，但是，标签外挂也有明显的限制，使用时请留意。
{% endnote %}

### Note (Bootstrap Callout)

引导标注。

{% tabs Note %}
<!-- tab 通用设置 -->
移植于next主题，并进行修改。

修改 `主题配置文件`

```yaml
note:
  # Note tag style values:
  #  - simple    bs-callout old alert style. Default.
  #  - modern    bs-callout new (v2-v3) alert style.
  #  - flat      flat callout style with background, like on Mozilla or StackOverflow.
  #  - disabled  disable all CSS styles import of note tag.
  style: simple
  icons: false
  border_radius: 3
  # Offset lighter of background in % for modern and flat styles (modern: -12 | 12; flat: -18 | 6).
  # Offset also applied to label tag variables. This option can work with disabled note tag.
  light_bg_offset: 0
```

`icons`和`light_bg_offset`只对方法一生效

Note 标签外挂有两种用法
<!-- endtab -->

<!-- tab 用法一 -->
```Markdown
{% note [class] [no-icon] [style] %}
Any content (support inline tags too.io).
{% endnote %}
```

| option | description |
| ------ | ----------- |
| `class` | [可选]标识，不同的标识有不同的配色<br>(default / primary / success / info / warning / danger ) |
| `no-icon` | [可选]不显示 icon |
| `style` | [可选]可以覆盖配置中的 style<br>(simple/modern/flat/disabled ) |

**For example.**

{% tabs note style %}
<!-- tab simple -->
```Markdown
{% note simple %}
默认 提示块标签
{% endnote %}

{% note default simple %}
default 提示块标签
{% endnote %}

{% note primary simple %}
primary 提示块标签
{% endnote %}

{% note success simple %}
success 提示块标签
{% endnote %}

{% note info simple %}
info 提示块标签
{% endnote %}

{% note warning simple %}
warning 提示块标签
{% endnote %}

{% note danger simple %}
danger 提示块标签
{% endnote %}
```

{% note simple %}
默认 提示块标签
{% endnote %}

{% note default simple %}
default 提示块标签
{% endnote %}

{% note primary simple %}
primary 提示块标签
{% endnote %}

{% note success simple %}
success 提示块标签
{% endnote %}

{% note info simple %}
info 提示块标签
{% endnote %}

{% note warning simple %}
warning 提示块标签
{% endnote %}

{% note danger simple %}
danger 提示块标签
{% endnote %}
<!-- endtab -->

<!-- tab modern -->
```Markdown
{% note modern %}
默认 提示块标签
{% endnote %}

{% note default modern %}
default 提示块标签
{% endnote %}

{% note primary modern %}
primary 提示块标签
{% endnote %}

{% note success modern %}
success 提示块标签
{% endnote %}

{% note info modern %}
info 提示块标签
{% endnote %}

{% note warning modern %}
warning 提示块标签
{% endnote %}

{% note danger modern %}
danger 提示块标签
{% endnote %}
```

{% note modern %}
默认 提示块标签
{% endnote %}

{% note default modern %}
default 提示块标签
{% endnote %}

{% note primary modern %}
primary 提示块标签
{% endnote %}

{% note success modern %}
success 提示块标签
{% endnote %}

{% note info modern %}
info 提示块标签
{% endnote %}

{% note warning modern %}
warning 提示块标签
{% endnote %}

{% note danger modern %}
danger 提示块标签
{% endnote %}
<!-- endtab -->

<!-- tab flat -->
```Markdown
{% note flat %}
默认 提示块标签
{% endnote %}

{% note default flat %}
default 提示块标签
{% endnote %}

{% note primary flat %}
primary 提示块标签
{% endnote %}

{% note success flat %}
success 提示块标签
{% endnote %}

{% note info flat %}
info 提示块标签
{% endnote %}

{% note warning flat %}
warning 提示块标签
{% endnote %}

{% note danger flat %}
danger 提示块标签
{% endnote %}
```

{% note flat %}
默认 提示块标签
{% endnote %}

{% note default flat %}
default 提示块标签
{% endnote %}

{% note primary flat %}
primary 提示块标签
{% endnote %}

{% note success flat %}
success 提示块标签
{% endnote %}

{% note info flat %}
info 提示块标签
{% endnote %}

{% note warning flat %}
warning 提示块标签
{% endnote %}

{% note danger flat %}
danger 提示块标签
{% endnote %}
<!-- endtab -->

<!-- tab disabled -->
```Markdown
{% note disabled %}
默认 提示块标签
{% endnote %}

{% note default disabled %}
default 提示块标签
{% endnote %}

{% note primary disabled %}
primary 提示块标签
{% endnote %}

{% note success disabled %}
success 提示块标签
{% endnote %}

{% note info disabled %}
info 提示块标签
{% endnote %}

{% note warning disabled %}
warning 提示块标签
{% endnote %}

{% note danger disabled %}
danger 提示块标签
{% endnote %}
```

{% note disabled %}
默认 提示块标签
{% endnote %}

{% note default disabled %}
default 提示块标签
{% endnote %}

{% note primary disabled %}
primary 提示块标签
{% endnote %}

{% note success disabled %}
success 提示块标签
{% endnote %}

{% note info disabled %}
info 提示块标签
{% endnote %}

{% note warning disabled %}
warning 提示块标签
{% endnote %}

{% note danger disabled %}
danger 提示块标签
{% endnote %}
<!-- endtab -->

<!-- tab no-icon -->
```Markdown
{% note no-icon %}
默认 提示块标签
{% endnote %}

{% note default no-icon %}
default 提示块标签
{% endnote %}

{% note primary no-icon %}
primary 提示块标签
{% endnote %}

{% note success no-icon %}
success 提示块标签
{% endnote %}

{% note info no-icon %}
info 提示块标签
{% endnote %}

{% note warning no-icon %}
warning 提示块标签
{% endnote %}

{% note danger no-icon %}
danger 提示块标签
{% endnote %}
```

{% note no-icon %}
默认 提示块标签
{% endnote %}

{% note default no-icon %}
default 提示块标签
{% endnote %}

{% note primary no-icon %}
primary 提示块标签
{% endnote %}

{% note success no-icon %}
success 提示块标签
{% endnote %}

{% note info no-icon %}
info 提示块标签
{% endnote %}

{% note warning no-icon %}
warning 提示块标签
{% endnote %}

{% note danger no-icon %}
danger 提示块标签
{% endnote %}
<!-- endtab -->
{% endtabs %}
<!-- endtab -->

<!-- tab 用法二（自定义icon）-->
{% blockquote %}
3.2.0 以上版本支持
{% endblockquote %}

```Markdown
{% note [color] [icon] [style] %}
Any content (support inline tags too.io).
{% endnote %}
```

| option | description |
| ------ | ---------- |
| `color` | [可选]顔色<br>(default / blue / pink / red / purple / orange / green) |
| `icon` | [可选]可配置自定义 icon (只支持 [fontawesome](http://www.fontawesome.com.cn/faicons/) 图标, 也可以配置 no-icon )
| `style` | [可选] 可以覆盖配置中的 style<br>(simple/modern/flat/disabled) |

**For example.**

{% tabs note style_color %}
<!-- tab simple -->
```Markdown
{% note 'fab fa-cc-visa' simple %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' simple %}
2021年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' simple %}
小心开车 安全至上
{% endnote %}
{% note red 'fas fa-fan' simple%}
这是三片呢？还是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' simple %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' simple %}
剪刀石头布
{% endnote %}
{% note green 'fab fa-internet-explorer' simple %}
前端最讨厌的浏览器
{% endnote %}
```

{% note 'fab fa-cc-visa' simple %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' simple %}
2021年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' simple %}
小心开车 安全至上
{% endnote %}
{% note red 'fas fa-fan' simple%}
这是三片呢？还是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' simple %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' simple %}
剪刀石头布
{% endnote %}
{% note green 'fab fa-internet-explorer' simple %}
前端最讨厌的浏览器
{% endnote %}
<!-- endtab -->

<!-- tab modern -->
```Markdown
{% note 'fab fa-cc-visa' modern %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' modern %}
2021年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' modern %}
小心开车 安全至上
{% endnote %}
{% note red 'fas fa-fan' modern%}
这是三片呢？还是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' modern %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' modern %}
剪刀石头布
{% endnote %}
{% note green 'fab fa-internet-explorer' modern %}
前端最讨厌的浏览器
{% endnote %}
```

{% note 'fab fa-cc-visa' modern %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' modern %}
2021年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' modern %}
小心开车 安全至上
{% endnote %}
{% note red 'fas fa-fan' modern%}
这是三片呢？还是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' modern %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' modern %}
剪刀石头布
{% endnote %}
{% note green 'fab fa-internet-explorer' modern %}
前端最讨厌的浏览器
{% endnote %}
<!-- endtab -->

<!-- tab flat -->
```Markdown
{% note 'fab fa-cc-visa' flat %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' flat %}
2021年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' flat %}
小心开车 安全至上
{% endnote %}
{% note red 'fas fa-fan' flat%}
这是三片呢？还是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' flat %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' flat %}
剪刀石头布
{% endnote %}
{% note green 'fab fa-internet-explorer' flat %}
前端最讨厌的浏览器
{% endnote %}
```

{% note 'fab fa-cc-visa' flat %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' flat %}
2021年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' flat %}
小心开车 安全至上
{% endnote %}
{% note red 'fas fa-fan' flat%}
这是三片呢？还是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' flat %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' flat %}
剪刀石头布
{% endnote %}
{% note green 'fab fa-internet-explorer' flat %}
前端最讨厌的浏览器
{% endnote %}
<!-- endtab  -->

<!-- tab disabled -->
```Markdown
{% note 'fab fa-cc-visa' disabled %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' disabled %}
2021年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' disabled %}
小心开车 安全至上
{% endnote %}
{% note red 'fas fa-fan' disabled %}
这是三片呢？还是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' disabled %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' disabled %}
剪刀石头布
{% endnote %}
{% note green 'fab fa-internet-explorer' disabled %}
前端最讨厌的浏览器
{% endnote %}
```

{% note 'fab fa-cc-visa' disabled %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' disabled %}
2021年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' disabled %}
小心开车 安全至上
{% endnote %}
{% note red 'fas fa-fan' disabled %}
这是三片呢？还是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' disabled %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' disabled %}
剪刀石头布
{% endnote %}
{% note green 'fab fa-internet-explorer' disabled %}
前端最讨厌的浏览器
{% endnote %}
<!-- endtab -->

<!-- tab no-icon -->
```Markdown
{% note no-icon %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue no-icon %}
2021年快到了....
{% endnote %}
{% note pink no-icon %}
小心开车 安全至上
{% endnote %}
{% note red no-icon %}
这是三片呢？还是四片？
{% endnote %}
{% note orange no-icon %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple no-icon %}
剪刀石头布
{% endnote %}
{% note green no-icon %}
前端最讨厌的浏览器
{% endnote %}
```

{% note no-icon %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue no-icon %}
2021年快到了....
{% endnote %}
{% note pink no-icon %}
小心开车 安全至上
{% endnote %}
{% note red no-icon %}
这是三片呢？还是四片？
{% endnote %}
{% note orange no-icon %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple no-icon %}
剪刀石头布
{% endnote %}
{% note green no-icon %}
前端最讨厌的浏览器
{% endnote %}
<!-- endtab -->
{% endtabs %}
<!-- endtab -->

{% endtabs %}

### Gallery相册图库

> 2.0.0以上提供

一个图库集合。
写法

```plaintext
<div class="gallery-group-main">
{% galleryGroup name description link img-url %}
{% galleryGroup name description link img-url %}
{% galleryGroup name description link img-url %}
</div>
```

| options | description |
| ------- | -----------|
| `name` | 图库名字 |
| `description` | 图片描述 |
| `link` | 链接到对应相册的地址 |
| `img-url` | 图库封面的地址 |

For example:

```Markdown
<div class="gallery-group-main">
{% galleryGroup '貂蝉' '貂蝉壁纸' '/Gallery/貂蝉' https://pic1.imgdb.cn/item/6364a58416f2c2beb131f2c6.jpg %}
{% galleryGroup '壁纸' '收藏的一些壁纸' '/Gallery/wallpaper' https://i.loli.net/2019/11/10/T7Mu8Aod3egmC4Q.png %}
{% galleryGroup 'OH MY GIRL' '关于OH MY GIRL的图片' '/Gallery/ohmygirl' https://i.loli.net/2019/12/25/hOqbQ3BIwa6KWpo.jpg %}
</div>
```

<div class="gallery-group-main">
{% galleryGroup '貂蝉' '貂蝉壁纸' '/Gallery/貂蝉' https://pic1.imgdb.cn/item/6364a58416f2c2beb131f2c6.jpg %}
{% galleryGroup '壁纸' '收藏的一些壁纸' '/Gallery/wallpaper' https://i.loli.net/2019/11/10/T7Mu8Aod3egmC4Q.png %}
{% galleryGroup 'OH MY GIRL' '关于OH MY GIRL的图片' '/Gallery/ohmygirl' https://i.loli.net/2019/12/25/hOqbQ3BIwa6KWpo.jpg %}
<!-- {% galleryGroup '漫威' '关于漫威的图片' '/Gallery/marvel' https://i.loli.net/2019/12/25/8t97aVlp4hgyBGu.jpg %} -->
</div>

### Gallery相册

> 2.0.0以上提供

区别于旧版的Gallery相册,新的Gallery相册会自动根据图片长度进行排版，书写也更加方便，与markdown格式一样。可根据需要插入到相应的md。
The usage

```Markdown
{% gallery %}
markdown 图片格式
{% endgallery %}
```

For example

```Markdown
{% gallery %}
![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)
![](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)
![](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)
![](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)
![](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)
![](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)
![](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)
![](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg)
{% endgallery %}
```

{% gallery %}
![1](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)
![2](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)
![3](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)
![4](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)
![5](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)
![6](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)
![7](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)
![8](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg)
{% endgallery %}

### tag-hide

> 2.2.0以上提供

{% note warning flat %}
请注意，tag-hide内的标签外挂content内都不建议有h1 - h6 等标题。因为Toc会把隐藏内容标题也显示出来，而且当滚动屏幕时，如果隐藏内容没有显示出来，会导致Toc的滚动出现异常。
{% endnote %}
{% note warning flat %}
隐藏代码块应使用[code代码块](#代码块)，使用反引号代码块会报错
{% endnote %}
如果你想把一些文字、内容隐藏起来，并提供按钮让用户点击显示。可以使用这个标签外挂。

{% tabs tag-hide %}
<!-- tab Inline -->
`inline` 在文本里面添加按钮隐藏内容，只限文字
( content不能包含英文逗号，可用`&sbquo;`)

```Markdown
{% hideInline content,display,bg,color %}
```

| option | description |
| ----- | ---------- |
| `content` | 文本内容 |
| `display` | [可选]按钮显示的文字 |
| `bg` | [可选]按钮的背景颜色 |
| `color` | [可选]按钮的文字颜色 |

For example

```Markdown
哪个英文字母最酷？ {% hideInline 因为西装裤(C装酷),查看答案,#FF7242,#fff %}

门里站着一个人? {% hideInline 闪 %}
```

哪个英文字母最酷？  <span class="hide-inline"><button type="button" class="hide-button" style="background-color: #FF7242;color: #fff">查看答案</button><span class="hide-content">因为西装裤(C装酷)</span>

门里站着一个人? <span class="hide-inline"><button type="button" class="hide-button" style="">Click</button><span class="hide-content">闪</span>
<!-- endtab -->

<!-- tab Block -->
`block` 独立的block隐藏内容，可以隐藏很多内容，包括图片，代码块等等

( display 不能包含英文逗号，可用`&sbquo;`)

```Markdown
{% hideBlock display,bg,color %}
content
{% endhideBlock %}
```

| option | description |
| ----- | ---------- |
| `content` | 文本内容 |
| `display` | [可选]按钮显示的文字 |
| `bg` | [可选]按钮的背景颜色 |
| `color` | [可选]按钮的文字颜色 |

For example

```Markdown
查看答案
{% hideBlock 查看答案 %}
傻子，怎么可能有答案
{% endhideBlock %}
```

查看答案
{% hideBlock 查看答案 %}
傻子，怎么可能有答案
{% endhideBlock %}
<!-- endtab -->

<!-- tab Toggle -->
> 2.3.0以上支持

如果你需要展示的内容太多，可以把它隐藏在收缩框里，需要时再把它展开。

( display 不能包含英文逗号，可用`&sbquo;`)

```Markdown
{% hideToggle display,bg,color %}
content
{% endhideToggle %}
```

For example

```Markdown
{% hideToggle Butterfly安装方法 %}
在你的博客根目录里

git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/Butterfly

如果想要安装比较新的dev分支，可以

git clone -b dev https://github.com/jerryc127/hexo-theme-butterfly.git themes/Butterfly

{% endhideToggle %}
```

{% hideToggle Butterfly安装方法 %}
在你的博客根目录里

git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/Butterfly

如果想要安装比较新的dev分支，可以

git clone -b dev https://github.com/jerryc127/hexo-theme-butterfly.git themes/Butterfly

{% endhideToggle %}
<!-- endtab -->
{% endtabs %}

### mermaid

使用mermaid标签可以绘制Flowchart（流程图）、Sequence diagram（时序图 ）、Class Diagram（类别图）、State Diagram（状态图）、Gantt（甘特图）和Pie Chart（圆形图），具体可以查看[mermaid文档](https://mermaid-js.github.io/mermaid/#/)
修改 `主题配置文件`

```yml
# mermaid
# see https://github.com/mermaid-js/mermaid
mermaid:
  enable: true
  # built-in themes: default/forest/dark/neutral
  theme:
    light: default
    dark: dark
```

The usage

```Markdown
{% mermaid %}
内容
{% endmermaid %}
```

For example

```Markdown
{% mermaid %}
pie
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
{% endmermaid %}
```

{% mermaid %}
pie
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
{% endmermaid %}

### Tabs

移植于next主题

The usage

```Markdown
{% tabs Unique name, [index] %}
<!-- tab [Tab caption] [@icon] -->
Any content (support inline tags too).
<!-- endtab -->
{% endtabs %}

Unique name   : Unique name of tabs block tag without comma.
                Will be used in #id's as prefix for each tab with their index numbers.
                If there are whitespaces in name, for generate #id all whitespaces will replaced by dashes.
                Only for current url of post/page must be unique!
[index]       : Index number of active tab.
                If not specified, first tab (1) will be selected.
                If index is -1, no tab will be selected. It's will be something like spoiler.
                Optional parameter.
[Tab caption] : Caption of current tab.
                If not caption specified, unique name with tab index suffix will be used as caption of tab.
                If not caption specified, but specified icon, caption will empty.
                Optional parameter.
[@icon]       : FontAwesome icon name (full-name, look like 'fas fa-font')
                Can be specified with or without space; e.g. 'Tab caption @icon' similar to 'Tab caption@icon'.
                Optional parameter.
```

| option | description |
| ------ | ------------ |
| `Unique name` | 不带逗号且唯一名称的 Tabs block。<br>将在#id中用作每个 Tab 索引号的前缀。<br>如果名称中有空格，对于生成#id所有空格都将替换为短划线。<br>仅对于当前 post/page 的网址必须是唯一的！|
| `index` | 活动 Tab 的索引号。<br>如果未指定，将选择第1个 Tab。<br>如果索引为 -1，则不会选择任何选项卡。这将是类似剧透的东西。<br>[可选参数] |
| `Tab caption` | 当前 Tab 的标题。<br>如果未指定标题，则`Unique name` 和索引作为后缀 将是 Tab 的标题。<br>[可选参数] |
| `@icon` | FontAwesome 图标名称  (全名, look like 'fas fa-font') <br>可以指定带或不带空格；e.g. 'Tab caption @icon' similar to 'Tab caption@icon'.<br>更多图标请参考 [Font Awesome 中文网](http://www.fontawesome.com.cn/faicons/)<br>[可选参数] |

> Demo 1-预设选择第一个

```Markdown
{% tabs test1 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}
```

{% tabs test1 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}

> Demo 2-预设选择tabs

```Markdown
{% tabs test2, 3 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}
```

{% tabs test2, 3 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}

> Demo 3 - 没有预设值

```Markdown
{% tabs test3, -1 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}
```

{% tabs test3, -1 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}

> Demo 4 - 自定义Tab名 + 只有icon + icon和Tab名

```Markdown
{% tabs test4 %}
<!-- tab 第一个Tab -->
**tab名字为第一个Tab**
<!-- endtab -->

<!-- tab @fab fa-apple-pay -->
**只有图标 没有Tab名字**
<!-- endtab -->

<!-- tab 炸弹@fas fa-bomb -->
**名字+icon**
<!-- endtab -->
{% endtabs %}
```

{% tabs test4 %}
<!-- tab 第一个Tab -->
**tab名字为第一个Tab。**
<!-- endtab -->

<!-- tab @fab fa-apple-pay -->
**只有图标 没有Tab名字。**
<!-- endtab -->

<!-- tab 炸弹@fas fa-bomb -->
**名字 + icon。**
<!-- endtab -->
{% endtabs %}

> Demo 5-Tab nest tab
{% tabs For example %}
<!-- tab 出师表 -->
臣亮言：先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍衞之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
宫中府中，俱为一体；陟罚臧否，不宜异同：若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理；不宜偏私，使内外异法也。
侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下：愚以为宫中之事，事无大小，悉以谘之，然后施行，必能裨补阙漏，有所广益。
将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰“能”，是以众议举宠为督：愚以为营中之事，悉以谘之，必能使行阵和睦，优劣得所。
亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未嘗不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之、信之，则汉室之隆，可计日而待也。
臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，谘臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间：尔来二十有一年矣。
先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐託付不效，以伤先帝之明；故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸兇，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。
愿陛下託臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以谘诹善道，察纳雅言，深追先帝遗诏。臣不胜受恩感激。
今当远离，临表涕零，不知所言。
<!-- endtab -->

<!-- tab 图库 -->
{% gallery %}
![1](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)
![2](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)
![3](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)
![4](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)
![5](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)
![6](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)
![7](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)
![8](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg)
{% endgallery %}
<!-- endtab -->

<!-- tab 李白 -->
李白（701年5月19日－762年11月30日），字太白，号青莲居士，中国唐朝诗人，自言祖籍陇西成纪（今甘肃省天水市秦安县），先世西凉武昭王李暠之后，与李唐皇室同宗。幼时内迁，寄籍剑南道绵州（今四川省江油市青莲镇）。另外，郭沫若研究认为李白出生于吉尔吉斯碎叶河上的碎叶城，属唐安西都护府（今楚河州托克马克市），该説有一定影响。有「诗仙」、「诗侠」、「酒仙」、「谪仙人」等称唿，活跃于盛唐，为杰出的浪漫主义诗人。与杜甫合称「李杜」。被贺知章惊唿为「天上谪仙」。
{% tabs 李白 %}
<!-- tab 行路难 -->
金樽清酒斗十千，玉盘珍羞值万钱。
停杯投箸不能食，拔剑四顾心茫然。
欲渡黄河冰塞川，将登太行雪暗天。
閒来垂钓碧溪上，忽复乘舟梦日边。
行路难，行路难，多歧路，今安在？
长风破浪会有时，直挂云帆济沧海。
大道如青天，我独不得出。
羞逐长安社中儿，赤鸡白狗赌梨慄。
弹剑作歌奏苦声，曳裾王门不称情。
淮阴市井笑韩信，汉朝公卿忌贾生。
君不见昔时燕家重郭隗，拥篲折节无嫌猜。
剧辛乐毅感恩分，输肝剖胆效英才。
昭王白骨萦蔓草，谁人更扫黄金台？
行路难，归去来！
有耳莫洗颍川水，有口莫食首阳蕨。
含光混世贵无名，何用孤高比云月？
吾观自古贤达人，功成不退皆殒身。
子胥既弃吴江上，屈原终投湘水滨。
陆机雄才岂自保，李斯税驾苦不早。
华亭鹤唳讵可闻，上蔡苍鹰何足道。
君不见吴中张翰称达生，秋风忽忆江东行。
且乐生前一杯酒，何须身后千载名！
<!-- endtab -->

<!-- tab 将进酒 -->
君不见，黄河之水天上来，
奔流到海不复回？
君不见，高堂明镜悲白髮，
朝如青丝暮成雪？
人生得意须尽欢，
莫使金樽空对月。
天生我材必有用，
千金散尽还复来。
烹羊宰牛且为乐，
会须一饮三百杯。
岑夫子，丹丘生，
将进酒，君莫停。
与君歌一曲，
请君为我侧耳听：
钟鼓馔玉不足贵，
但愿长醉不愿醒。
古来圣贤皆寂寞，
惟有饮者留其名。
陈王昔时宴平乐，
斗酒十千恣欢嚯。
主人何为言小钱？
径须沽取对君酌。
五花马，千金裘。
唿儿将出换美酒，
与尔同销万古愁。
<!-- endtab -->

<!-- tab 清平调 -->
《清平调词三首》是唐代大诗人李白的组诗作品，共三首七言乐府诗。第一首从空间角度写，以牡丹花比杨贵妃的美艳；第二首从时间角度写，表现杨贵妃的受宠幸；第三首总承一、二两首，把牡丹和杨贵妃与君王糅合，融为一体。全诗构思精巧，辞藻艳丽，将花与人浑融在一起写，描绘出人花交映、迷离恍惚的景象，显示了诗人高超的艺术功力。
{% tabs 清平调 %}
<!-- tab 清平调（一） -->
云想衣裳花想容，春风拂槛露华浓；
若非羣玉山头见，会向瑶台月下逢。
<!-- endtab -->清

<!-- tab 清平调（二） -->
一枝红艳露凝香，云雨巫山空断肠。
借问汉宫谁得似？可怜飞燕倚新粧。
<!-- endtab -->

<!-- tab 清平调（三） -->
名花倾国两相欢，常得君王带笑看。
解识春风无限恨，沉香亨北倚阑千。
<!-- endtab -->
{% endtabs %}
<!-- endtab -->
{% endtabs %}
<!-- endtab -->
{% endtabs %}

### Button

> 3.0以上适用

The usage

```Markdown
{% btn [url],[text],[icon],[color] [style] [layout] [position] [size] %}
```

| option | description |
| ------ | -----------|
| `url` | 链接 |
| `text` | 按钮文字 |
| `icon` | [可选]图标 |
| `color` | [可选]改变按钮背景顔色(默认style时);改变按钮字体和边框顔色(style:outline时) default/blue/pink/red/purple/orange/green |
| `style` | [可选]按钮样式 实心(default) outline/留空 |
| `layout` | [可选]按钮佈局 line(default) block/留空 |
| `position` | [可选]按钮位置 前提：(layout:block) left(default) center/right/留空 |
| `size` | [可选]按钮大小 larger/留空 |

For example

```Markdown
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,larger %}
```

This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,larger %}

```Markdown
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block center larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block right outline larger %}
```

{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block center larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block right outline larger %}

**more than one button in center.**

```Markdown
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,blue larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,pink larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,red larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,purple larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,orange larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,green larger %}
```

{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,blue larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,pink larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,red larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,purple larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,orange larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,green larger %}

```Markdown
<div class="btn-center">
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline blue larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline pink larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline red larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline purple larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline orange larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline green larger %}
</div>
```

<div class="btn-center">
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline blue larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline pink larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline red larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline purple larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline orange larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline green larger %}
</div>

### inlineImg

主题中的图片都是默认以`块级元素`显示，如果你想以`内联元素`显示，可以使用这个标签外挂。

```Markdown
{% inlineImg [src] [height] %}
```

| option | description |
| ------ | -----------|
| `src` | 图片链接 |
| `height` | [可选]图片高度限制 |

For example

```Markdown
你看我长得漂亮不

![](https://i.loli.net/2021/03/19/2P6ivUGsdaEXSFI.png)

我觉得很漂亮 {% inlineImg https://i.loli.net/2021/03/19/5M4jUB3ynq7ePgw.png 150px %}
```

你看我长得漂亮不

![pic](https://i.loli.net/2021/03/19/2P6ivUGsdaEXSFI.png)

我觉得很漂亮 {% inlineImg https://i.loli.net/2021/03/19/5M4jUB3ynq7ePgw.png 150px %}

### label

> 3.7.5 及以上版本适用

高亮所需的文字

```Markdown
{% label text color %}
```

| option | description |
| ------ | -----------|
| `text` | 文字 |
| `color` | [可选]背景颜色<br> default/blue/pink/red/purple/orange/green |

For example

```Markdown
臣亮言：{% label 先帝 %}创业未半，而{% label 中道崩殂 blue %}。今天下三分，{% label 益州疲敝 pink %}，此诚{% label 危急存亡之秋 red %}也！然侍衞之臣，不懈于内；{% label 忠志之士 purple %}，忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气；不宜妄自菲薄，引喻失义，以塞忠谏之路也。
宫中、府中，俱为一体；陟罚臧否，不宜异同。若有{% label 作奸 orange %}、{% label 犯科 green %}，及为忠善者，宜付有司，论其刑赏，以昭陛下平明之治；不宜偏私，使内外异法也。
```

臣亮言：{% label 先帝 %}创业未半，而{% label 中道崩殂 blue %}。今天下三分，{% label 益州疲敝 pink %}，此诚{% label 危急存亡之秋 red %}也！然侍衞之臣，不懈于内；{% label 忠志之士 purple %}，忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气；不宜妄自菲薄，引喻失义，以塞忠谏之路也。

宫中、府中，俱为一体；陟罚臧否，不宜异同。若有{% label 作奸 orange %}、{% label 犯科 green %}，及为忠善者，宜付有司，论其刑赏，以昭陛下平明之治；不宜偏私，使内外异法也。

### timeline

> 4.0.0 以上支持

```Markdown
{% timeline title,color %}
<!-- timeline title -->
xxxxx
<!-- endtimeline -->
<!-- timeline title -->
xxxxx
<!-- endtimeline -->
{% endtimeline %}
```

| option | description |
| ----- | ----------|
| `title` | 标题/时间线 |
| `color` | timeline 颜色<br>default(留空) / blue / pink / red / purple / orange / green |

For example

```Markdown
{% timeline 2022 %}
<!-- timeline 01-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}
```

{% timeline 2022 %}
<!-- timeline 01-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}

```Markdown
{% timeline 2022,blue %}
<!-- timeline 01-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}
```

{% timeline 2022,blue %}
<!-- timeline 01-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}

```Markdown
{% timeline 2022,pink %}
<!-- timeline 01-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}
```

{% timeline 2022,pink %}
<!-- timeline 01-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}

### flink

> 4.1.0 支持

可在任何界面插入类似友情链接列表效果

内容格式与友情链接界面一样，支持 yml 格式

```Markdown
{% flink %}
xxxxxx
{% endflink %}
```

For example

```Markdown
{% flink %}
- class_name: 友情链接
  class_desc: 那些人，那些事
  link_list:
    - name: Hexo
      link: https://hexo.io/zh-tw/
      avatar: https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg
      descr: 快速、简单且强大的网志框架

- class_name: 网站
  class_desc: 值得推荐的网站
  link_list:
    - name: Youtube
      link: https://www.youtube.com/
      avatar: https://i.loli.net/2020/05/14/9ZkGg8v3azHJfM1.png
      descr: 视频网站
    - name: Weibo
      link: https://www.weibo.com/
      avatar: https://i.loli.net/2020/05/14/TLJBum386vcnI1P.png
      descr: 中国最大社交分享平台
    - name: Twitter
      link: https://twitter.com/
      avatar: https://i.loli.net/2020/05/14/5VyHPQqR6LWF39a.png
      descr: 社交分享平台
{% endflink %}
```

{% flink %}
- class_name: 友情链接
  class_desc: 那些人，那些事
  link_list:
    - name: Hexo
      link: https://hexo.io/zh-tw/
      avatar: https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg
      descr: 快速、简单且强大的网志框架

- class_name: 网站
  class_desc: 值得推荐的网站
  link_list:
    - name: Youtube
      link: https://www.youtube.com/
      avatar: https://i.loli.net/2020/05/14/9ZkGg8v3azHJfM1.png
      descr: 视频网站
    - name: Weibo
      link: https://www.weibo.com/
      avatar: https://i.loli.net/2020/05/14/TLJBum386vcnI1P.png
      descr: 中国最大社交分享平台
    - name: Twitter
      link: https://twitter.com/
      avatar: https://i.loli.net/2020/05/14/5VyHPQqR6LWF39a.png
      descr: 社交分享平台
{% endflink %}

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

其他可选操作 e.g. `line_number:false`

| Extra Options | Description | Default |
| :-----------: | :---------: | :------: |
| `line_number` | 显示行号 | true |
| `highlight` | 启用代码高亮 | true |
| `first_line` | 指定第一行号 | 1 |
| `mark` | 突出显示特定行，每个值用逗号分隔。使用短划线指定数字范围。  e.g `mark:1,4-7,10` 会高亮第 1, 4 到 7 以及第 10行。 | |
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
{% codeblock _.compact http://underscorejs.org/#compact Underscore.js mark:1 line_number:false wrap:false %}
_.compact([0, 1, false, 2, '', 3]);
=> [1, 2, 3]
{% endcodeblock %}
```

{% codeblock _.compact http://underscorejs.org/#compact Underscore.js mark:1 line_number:false wrap:false %}
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

```plaintext
{% jsfiddle shorttag [tabs] [skin] [width] [height] %}
```

好像加载不出来

## Gist

```plaintext
{% gist gist_id [filename] %}
```

还不明白怎么用

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

{% img [png] /HexoTagPlugins/hexo.png 160 90 '"图片标题和鼠标放上时显示" "图片没有正常加载时显示"' %}

## Link

在文章插入链接，并自动给外部链接添加`target="_blank"`属性。

```plaintext
{% link text url [external] [title] %}
```

**tip:[external]不知道是什么**
{% link 百度一下 https://www.baidu.com 不知道这是什么 title %}

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

```plaintext
{% youtube video_id %}
```

id在url中

## Vimeo

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

```plaintext
{% asset_path filename %}
{% asset_img filename [title] %}
{% asset_link filename [title] [escape] %}
```

好像是使用文章中出现的资源，
不知道怎么用

## Raw

如果某些内容导致帖子出现处理问题，请使用原始标记包装它以避免呈现错误。

```plaintext
{% raw %}
content
{% endraw %}
```
