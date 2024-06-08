---
title: Java环境变量配置（多版本）
comments: true
date: 2023-05-09 23:29:03
updated: 2023-05-26
sticky:
categories: Java
tags:
    - Java
cover: https://pic2.imgdb.cn/item/645b35d50d2dde5777454474.webp
---

## 需求

近两年，Java 版本升级频繁，论是尝鲜新特性，还是由于项目升级/兼容需要，我们可能都要面临管理多个 Java 版本的情况。

## 设置环境变量

计算机->属性->高级系统设置->环境变量->用户变量

{% note info modern %}
一般修改用户环境变量即可，修改系统变量也行
{% endnote %}

新建用户变量`JAVA_HOME`

![JAVA_HOME](2023-05-10-00-08-37.png)

新建用户变量`JAVA_HOME`+版本号
这里用的是`1.8`版本Java变量名字就为`JAVA_HOME1.8`，变量值为Java安装路径
![JAVA_HOME1.8](2023-05-10-00-12-20.png)

![编辑用户变量Path路径](2023-05-10-00-02-04.png)

## 实现版本切换

`win`+`R`打开`cmd`

{% note warning modern %}
修改后都是要重新打开新的`cmd`才能生效，再用命令`java -version`查看修改后版本
{% endnote %}

### 修改用户变量

{% codeblock lang:cmd %}
setx JAVA_HOME %JAVA_HOME1.8%
{% endcodeblock %}

{% note warning modern %}
路径中带有空格时，所以最好用双引号把变量和值都包裹起来
{% endnote %}

{% codeblock lang:cmd %}
setx "JAVA_HOME" "%JAVA_HOME1.8%"
{% endcodeblock %}

### 修改系统变量

{% note info modern %}
上诉代码修改的是用户环境变量，如果需要更改系统环境变量，需要加`/m`
{% endnote %}

{% codeblock lang:cmd %}
setx "JAVA_HOME" "%JAVA_HOME1.8%" /m
{% endcodeblock %}

{% note warning modern %}
需要注意的是，需要以管理员的身份打开`cmd`，否则同样没有修该权限
![以管理员身份运行](2023-05-10-00-26-28.png)
{% endnote %}
