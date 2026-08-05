---
title: pyenv
top_img: /img/top_img.jpg
date: 2026-05-30 13:33:56
tags:
categories:
description:
sticky:
cover:
---
## 为什么使用pyenv

pyenv 是一个简单的 Python 版本管理工具。它能让用户轻松地在不同的 Python 版本之间切换。

## 快速开始

用指令下载 pyenv-win 官方安装程序 → 自动安装 → 装在你的用户目录 `C:\Users\你的用户名\.pyenv`下 → 自动配置环境变量

打开终端 `PowerShell`运行以下指令

{% codeblock lang: bash %}
Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"
{% endcodeblock %}

> 若遇到问题**无法加载文件 C:\Users\XXX\install-pyenv-win.ps1，因为在此系统上禁止运行脚本***，可执行指令 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`解决。

当然，你不想安装在该目录也可以，只需要把 `..pyenv`文件夹剪切到指定文件夹，重新配置环境变量即可。

**桌面右键 此电脑 → 属性 → 高级系统设置 →  环境变量。**

{% codeblock lang:bash %}
PYENV = D:\dev\pyenv\.pyenv\pyenv-win
PYENV_HOME = D:\dev\pyenv\.pyenv\pyenv-win
PYENV_ROOT = D:\dev\pyenv\.pyenv\pyenv-win
{% endcodeblock %}

编辑Path，加入

{% codeblock lang:bash %}
D:\dev\pyenv\.pyenv\pyenv-win\bin
D:\dev\pyenv\.pyenv\pyenv-win\shims
{% endcodeblock %}

重新打开终端 `PowerShell`运行以下指令即可检测有没有安装成功。

{% codeblock lang:bash %}
pyenv --version
{% endcodeblock %}

## pyenv 的基本使用

1. 列出所有可用版本
   {% codeblock lang:bash %}
   pyenv install -l
   {% endcodeblock %}
2. 安装特定版本
   {% codeblock lang:bash %}
   pyenv install `<version>`
   {% endcodeblock %}
3. 将某个 Python 版本设置为全局版本。
   {% codeblock lang:bash %}
   pyenv global `<version>`
   {% endcodeblock %}
4. 列出所有已安装的版本，当前使用版本带 "*"
   {% codeblock lang:bash %}
   pyenv versions
   {% endcodeblock %}
5. 显示当前 Python 版本及其来源
   {% codeblock lang:bash %}
   pyenv version
   {% endcodeblock %}
6. 卸载指定版本
   {% codeblock lang:bash %}
   pyenv uninstall `<version>`
   {% endcodeblock %}

## 安装问题

下载速度太慢，直接把想要的文件（例：python-3.10.11-amd64.exe）下载好，拖进 `.pyenv/pyenv-win` 目录下的 `install_cache` 文件夹，再执行上面的安装命令，即可安装对应的版本。

### 镜像网站

- [清华大学](https://mirrors.tuna.tsinghua.edu.cn/python/)
- [华为云](https://mirrors.huaweicloud.com/python/)

## 更多详情

{% blockquote @pyenv-win https://pyenv-win.github.io/pyenv-win/ 参考文档 %}
[pyenv-win](https://github.com/pyenv-win/pyenv-win)
{% endblockquote %}
