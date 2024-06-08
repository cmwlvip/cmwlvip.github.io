---
title: VirtualBox虚拟机磁盘扩容
comments: true
date: 2023-06-10 19:35:23
updated: 2023-06-10
sticky:
description:
categories: VirtualBox
tags:
    - VirtualBox
    - Linux
cover: https://pic.imgdb.cn/item/648456981ddac507cc049e1e.jpg
top_img: https://pic.imgdb.cn/item/648467521ddac507cc1acdee.jpg
---

{% note warning modern %}
扩容只能增加，不能减少。
{% endnote %}

## 修改VirtualBox配置

打开VirtualBox，虚机应处于关闭状态，左上角点管理 → 虚拟介质管理。

![设置更多的空间](2023-06-07-15-51-40.png)

## 修改虚拟机配置

### 查看磁盘分区

{% codeblock lang:shell %}
fdisk -l
{% endcodeblock %}

{% note info modern %}
`fdisk -l`是一个用于列出系统磁盘分区信息的命令。其中，`fdisk`是Linux/Unix下的一个用于磁盘分区管理的工具，`-l`选项表示列出分区信息。执行该命令可以**查看系统中所有硬盘和分区的详细信息**，包括硬盘的设备文件名、分区大小、分区类型等等。该信息对于管理磁盘、安装操作系统或者调整分区大小等操作非常有用。
{% endnote %}

![查看磁盘](2023-06-07-16-02-22.png)

可以看到磁盘已经扩容到指定内存(32G),但是`/dev/mapper/cl-root`依然只有之前分配的那么多(13.4G)

### 使用fdisk分区管理工具

{% codeblock lang:shell %}
fdisk /dev/sda
{% endcodeblock %}

{% note info modern %}
执行该命令会**进入`fdisk`分区管理工具的交互式界面**，可以在该界面下进行分区、删除分区、编辑分区和写入分区表等操作。但是需要注意，该工具操作比较复杂，需要特别小心，以避免误操作导致数据丢失或系统无法启动的风险。
{% endnote %}

输入的指令依次为`n`→`p` → `3` → `回车` → `回车` → `t` → `3` → `8e` → `w`

在Linux/Unix下使用fdisk分区管理工具时的几点说明

- 输入`n`表示创建一个新的分区
- 输入`t`表示更改分区的系统标识符
- 输入`8e`表示将分区类型更改为`Linux LVM`（Logical Volume Manager）分区。LVM是一种逻辑卷管理技术，允许在多个硬盘上创建一个或多个逻辑卷，将它们组合成一个或多个卷组，并提供对卷组的动态划分、扩展、缩小等操作，从而灵活地管理磁盘空间。
- 输入`w`表示将所做的更改写入分区表中并退出fdisk命令工具。当对分区进行创建、删除、编辑、修改属性等操作后，需要使用`w`命令将更改写入分区表，以使更改生效。如果没有使用这个命令，更改将不会被保存。在输入`w`命令之前，建议先检查所做的更改，确保不会覆盖或删除已有的分区或文件系统数据，避免数据丢失的风险。

![进入fdisk分区管理工具的交互式界面](2023-06-07-16-10-52.png)

步骤完成以后，重启虚拟机(`reboot`)

### 查看分区结果

{% codeblock lang:shell %}
fdisk -l
{% endcodeblock %}

可以看到创建了一个新分区`/dev/sda3`

![多了sda3分区](2023-06-07-16-18-51.png)

### 将新分配的磁盘空间作为物理卷

将新分配的磁盘空间作为物理卷

{% codeblock lang:shell %}
pvcreate /dev/sda3
{% endcodeblock %}

{% note info modern %}
在Linux/Unix下，`pvcreate`命令用于**将一个物理硬盘或分区初始化为物理卷**（Physical Volume）以供LVM使用。其中"/dev/sda3"表示要初始化的物理硬盘或分区名。执行该命令时，LVM会在指定物理硬盘或分区上创建LVM专用的Header和Metadata区域，以便后续在该物理硬盘或分区上创建逻辑卷。在执行这个命令之前，请务必确认指定的物理硬盘或分区没有保存重要数据，因为执行`pvcreate`操作时会清空该硬盘或分区上的所有数据，避免造成数据丢失的风险。
{% endnote %}
![成功](2023-06-07-16-35-27.png)

### 向卷组中添加物理卷

首先查看root所在卷组，找到 root 所属卷组名 (这里是`cl`)

{% codeblock lang:shell %}
vgdisplay -v
{% endcodeblock %}

{% note info modern %}
在Linux/Unix下，`vgdisplay`命令用于**显示LVM的卷组信息**，包括卷组名称、物理卷数量、逻辑卷数量、卷组大小、卷组状态等信息。而使用`-v`选项，可以输出更为详细的信息，包括各个物理卷和逻辑卷的详细信息，例如卷名、卷类型、卷大小、卷状态、剩余空间等等。这些信息有助于管理员了解卷组的使用情况，诊断LVM问题以及执行相关的LVM管理任务。
{% endnote %}
![找到root所属卷组名(这里是cl)](2023-06-07-16-30-56.png)

{% codeblock lang:shell %}
vgextend cl /dev/sda3
{% endcodeblock %}

{% note info modern %}
在Linux/Unix下，`vgextend`命令用于**向一个已存在的卷组（Volume Group）中添加物理卷（Physical Volume）**，以扩展卷组的存储容量。
{% endnote %}

在这里，查看可知LVM卷组名为`cl`，现在向其中添加`/dev/sda3`这块物理硬盘，使用`vgextend cl /dev/sda3`命令后，LVM会将新的物理硬盘初始化为物理卷，并将其添加到名为`cl`的卷组中，从而扩展了卷组的存储容量。

### 扩展逻辑卷

使用指令扩展逻辑卷`cl/root`

{% codeblock lang:shell %}
lvextend /dev/cl/root /dev/sda3
{% endcodeblock %}

{% note info modern %}
在Linux/Unix操作系统下，`lvextend`命令用于**扩展逻辑卷（Logical Volume）的存储容量**。在执行该命令时，需要指定要扩展的逻辑卷名称和要扩展到的物理卷名称，格式为 `lvextend [选项] <逻辑卷名称> <物理卷名称>` 。
使用`-l`选项可以指定扩展后逻辑卷的大小，使用`-L`选项可以指定要增加的存储空间量，使用`-r`选项可以自动扩展文件系统以适应新大小等等。
{% endnote %}

### 扩展XFS文件系统

{% codeblock lang:shell %}
xfs_growfs /dev/cl/root
{% endcodeblock %}

{% note info modern %}
在Linux/Unix操作系统下，`xfs_growfs`命令用于**扩展XFS文件系统（一种常用的文件系统类型）的大小**。在执行该命令时，需要指定要扩展的文件系统所在的逻辑卷名称或设备文件名，格式为`xfs_growfs [选项] <逻辑卷名称或设备文件名>` 。
{% endnote %}

这里将位于`/dev/cl/root`逻辑卷上的XFS文件系统扩展到整个逻辑卷的大小，使用了`xfs_growfs /dev/cl/root`命令。执行此命令后，XFS文件系统会占用整个逻辑卷的存储容量，从而有效地扩展了文件系统的大小。
**需要注意的是**，在执行这个命令之前必须先通过`lvextend`命令将逻辑卷的大小扩展到需要的大小。只有当逻辑卷的大小增加之后，文件系统才能够占用更多的存储空间。

![扩展成功](2023-06-07-16-44-56.png)

### 查看扩容结果

{% codeblock lang:shell %}
df -h
{% endcodeblock %}

{% note info modern %}
在Linux/Unix下，`df`**用于查看文件系统已使用和可用的磁盘空间大小**。执行该命令时，会列出系统中所有可用的文件系统以及它们的磁盘空间使用情况，格式为`df [选项]`。
`-h`选项表示将磁盘空间大小以较人性化的方式进行显示，以便更易于理解。当使用`-h`选项时，磁盘空间大小将使用KB、MB、GB等单位进行显示，而不是以字节为单位进行显示。
{% endnote %}

![扩容成功](2023-06-07-16-46-45.png)

![使用"fdisk -l"指令也可以查看到扩容成功了](2023-06-07-16-48-49.png)