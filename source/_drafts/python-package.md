---
title: Python使用
top_img: /img/top_img.jpg
date: 2026-05-31 09:58:58
tags: 
- Python
categories: Python
description: Python安装的那些包
sticky:
cover:
---


## Python基本指令

### 查看python版本

{% codeblock lang:bash %}
python -V
{% endcodeblock %}

or

{% codeblock lang:bash %}
python --version
{% endcodeblock %}

### 查看安装的包

列出所有安装的包

{% codeblock lang:bash %}
pip list
{% endcodeblock %}

查看指定的包

{% codeblock lang:bash %}
pip show <name>
{% endcodeblock %}

## 包的安装

### 直接安装

{% codeblock lang:bash %}
pip install <name>
{% endcodeblock %}

### 镜像

安装太慢，试试镜像安装吧！

#### 镜像源

>镜像可能会失效

- [清华大学镜像源](https://pypi.tuna.tsinghua.edu.cn/simple)`https://pypi.tuna.tsinghua.edu.cn/simple`
- [中科大镜像源](https://mirrors.ustc.edu.cn/pypi/simple/)`https://mirrors.ustc.edu.cn/pypi/simple/`
- [华为云镜像源](https://mirrors.huaweicloud.com/repository/pypi/simple)`https://mirrors.huaweicloud.com/repository/pypi/simple`
- [阿里云镜像源](https://mirrors.aliyun.com/pypi/simple/)`https://mirrors.aliyun.com/pypi/simple/`

#### 镜像的使用

{% codeblock lang:bash %}
pip install <name> -i https://pypi.tuna.tsinghua.edu.cn/simple
{% endcodeblock %}
