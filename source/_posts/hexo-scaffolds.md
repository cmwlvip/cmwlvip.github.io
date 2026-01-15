---
title: Hexo脚手架(scaffolds)
comments: false
toc_style_simple: false
date: 2026-01-14 12:20:59
updated: 2026-01-14 12:20:59
description: scaffolds📁 —— Hexo的“模板工厂”
categories: 
    - Hexo
tags:
    - Hexo
sticky:
cover: 
top_img: /img/top_img002.jpg
---

## 📁`scaffolds`文件夹结构

`scaffolds`文件夹下这三个模板文件构成了Hexo的内容创建基石，通过简单的命令行操作就能生成结构一致、格式规范的内容文件，大大提升了博客写作的效率和质量！

如果说`scaffolds` 是Hexo的“模板工厂”，而 `hexo new` 系列命令就是调用这个工厂的生产线！

{% codeblock lang:text %}
scaffolds/
├── draft.md    # 草稿模板
├── post.md     # 文章模板
└── page.md     # 页面模板
{% endcodeblock %}

默认内容

```markdown
---
title: {{ title }}
date: {{ date }}
tags:
---
```

## 📄`post.md`文章模板

最常用的模板，用于创建博客文章。

{% codeblock lang:bash %}
hexo new "文章标题"(引号可省略)
{% endcodeblock %}

{% note default modern %}
{% post_link hello-world '<b>第一次使用Hexo发布文章</b>' false %}
{% endnote %}

首先，`hexo new title`将新文章建立在`source/_posts`目录下，然后，`hexo generate`时会把Markdown文件编译成HTML页面存放在`public`目录下，之后`hexo deploy`把`public`目录下所有文章部署到Github。

这种方式往往存在一些弊端：首先，若我们编辑的文章尚未完成，通过`hexo deploy`部署后会在网页上出现未完成的文章，这是我们不希望看到的；其次，随着编写文章的增多，在`source/_posts`目录下文件数量增多，每次寻找未编写完成的长文章未免有些麻烦。对于长文章而言通过建立**文章草稿(draft)**也许是更好的选择。

## 📝`draft.md`草稿模板

### 创建为草稿

{% codeblock lang:bash %}
hexo new draft "文章标题"
{% endcodeblock %}

这会在 `source/_drafts` 目录下创建一个草稿文件。

### 查看草稿

要预览草稿，需要启动服务器时加上 `--draft` 参数：
{% codeblock lang:bash %}
hexo server --draft
{% endcodeblock %}

### 发布草稿

当你想发布时，将草稿移动到正式文章：
{% codeblock lang:bash %}
hexo publish title
{% endcodeblock %}

或者简写为：

{% codeblock lang:bash %}
hexo p title
{% endcodeblock %}

草稿会从 `source/_drafts` 移动到 `source/_posts` 目录。

## 🏠`page.md`页面模板

用于创建独立页面（如关于、归档、分类等）。

{% codeblock lang:bash %}
hexo new page about
{% endcodeblock %}

## 📊 Hexo三模板对比表

| 特性 | draft.md | post.md | page.md |
| ---- | -------- | ------- | ------- |
| **生成命令** | `hexo new draft <title>` | `hexo new <title>` | `hexo new page <title>` |
| **简写命令** | `hexo n draft <title>` | `hexo n <title>` | `hexo n page <title>` |
| **存储目录** | `source/_drafts/` | `source/_posts/` | `source/<页面名>/` |
| **生成文件** | `source/_drafts/标题.md` | `source/_posts/标题.md` | `source/页面名/index.md` |
| **是否发布** | ❌ 不生成到`public/` | ✅ 生成到`public/` | ✅ 生成到`public/` |
| **访问URL** | 无（不可访问） | `/年/月/日/标题/` | `/页面名/` |
| **默认布局** | `draft` | `post` | `page` |
| **典型用途** | 草稿、未完成文章、灵感记录 | 博客正文、技术文章 | 独立页面（关于、归档、标签等） |
| **Front-matter** | 简单 | 完整 | 简洁 |
| **URL路径** | 无 | `/year/month/day/title/` | `/页面名/` |

{% note info modern %}
📌 **重要提醒**

1. 模板修改后，只影响新建的文件
2. 已有文件不会自动更新到新模板
3. 模板支持所有合法的`Front-matter`格式
4. 草稿(draft)发布时，`post.md`未预设的`Front-matter`会从`draft.md`继承，`post.md`已预设的`Front-matter`以`post.md`为准！
{% endnote %}
