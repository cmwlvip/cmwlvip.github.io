---
title: windows docket安装
tags:
  - docker
categories: docker
comments: false
toc_style_simple: false
top_img: /img/top_img00X.jpg
date: 2026-07-21 18:40:21
updated: 2026-07-21 18:40:21
description:
sticky:
cover:
---


## windows设置

功能-> 启用或关闭Windows功能

![2026-06-25-09-50-41.png](docker-install/2026-06-25-09-50-41.png)

- 适用于Linux 的 Windows 子系统
- 虚拟机平台

重启电脑，在命令提示符窗口输入以下指令：

```cmd
wsl --set-default-version 2
wsl --update --web-download
```

![2026-06-25-10-00-07.png](docker-install/2026-06-25-10-00-07.png)

## 安装docker

[docker](https://www.docker.com/products/docker-desktop/) 安装包下载好以后安装即可

如果想指定安装目录，管理员身份用命令提示符窗口进入下载的包的目录

```cmd
start /w "" "Docker Desktop Installer.exe" install --installation-dir=D:\dev\Docker
```

![2026-06-25-10-24-28.png](docker-install/2026-06-25-10-24-28.png)

`close and log out` 会重新登录Windows

![2026-06-25-10-30-37.png](docker-install/2026-06-25-10-30-37.png)

`dock run hello-world` 出现以下界面表示docker安装成功

![2026-06-25-10-51-42.png](docker-install/2026-06-25-10-51-42.png)