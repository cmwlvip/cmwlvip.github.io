---
title: NVM
date: 2022-11-24 15:42:25
updated: 2022-11-24
description: NVM —— Node.js 版本管理器
categories: npm
tags:
    - nvm
    - Node.js
keywords:
    - nvm
    - Node.js
cover: /2022/11/24/NVM/nvm.png
top_img: 
---

## nvm是什么

nvm全英文也叫node.js version management，是**一个nodejs的版本管理工具**。nvm和n都是node.js版本管理工具，为了解决node.js各种版本存在不兼容现象可以通过它可以**安装和切换不同版本**的`node.js`。

## nvm安装

[nvm下载](https://github.com/coreybutler/nvm-windows/releases)

……

## nvm命令

{% note info modern %}
管理员身份下执行
{% endnote %}

### 查看nvm版本

```shell
nvm version
```

`version` **可简化为** `v`

### 开启node.js版本管理

```shell
nvm on
```

### 关闭node.js版本管理

```shell
nvm off
```

### 查看nvm安装路径

```shell
nvm root [path]
```

可选参数`path`,使用表示设置路径

### 查看已安装的Node.js版本

```shell
nvm list
```

`list`**可简化为**`ls`

### 查看所有远程线上可以安装的版本

```shell
nvm list available
```

### 安装最新稳定版Node.js

```shell
nvm install latest
```

### 安装指定版本

```shell
nvm install 版本号
```

### 切换Node.js版本

```shell
nvm use 版本号
```

### 卸载指定版本

```shell
nvm uninstall 版本号
```
