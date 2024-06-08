---
title: Zookeeper部署
comments: true
date: 2023-03-27 15:05:04
updated: 2023-03-27
sticky:
categories: Hadoop
tags:
    - Hadoop
    - Zookeeper
cover: https://pic.imgdb.cn/item/642156eda682492fcc8b5b4e.jpg
---

## 环境准备

**Zookeeper**: 3.8.1

### 安装Zookeeper

从[Zookeeper](https://zookeeper.apache.org/)官网下载好安装包

{% codeblock lang:shell %}
tar -zxvf apache-zookeeper-3.8.1-bin.tar.gz -C /mysoft/
{% endcodeblock %}

### 配置环境变量

{% codeblock lang:sh vi /etc/profile %}
#ZooKeeper environment variables
export ZOOKEEPER_HOME=/mysoft/apache-zookeeper-3.8.1
export PATH=$PATH:$ZOOKEEPER_HOME/bin
{% endcodeblock %}

{% codeblock lang:shell 使环境变量生效 %}
source /etc/profile
{% endcodeblock %}

## Zookeeper全分布式

{% codeblock lang:shell %}
cd $ZOOKEEPER_HOME
cd conf/
{% endcodeblock %}

### 配置`zoo.cfg`

{% codeblock lang:shell %}
cp zoo_sample.cfg zoo.cfg
{% endcodeblock %}

**修改**`dataDir`
{% codeblock lang:sh vi zoo.cfg %}
dataDir=/mysoft/apache-zookeeper-3.8.1/zkData
{% endcodeblock %}

**添加如下内容**
{% codeblock lang:sh vi zoo.cfg %}
#cluser cinfiguration
server.1=hsq01:2888:3888
server.2=hsq02:2888:3888
server.3=hsq03:2888:3888
{% endcodeblock %}
{% note warning modern %}
端口号后面千万不要留有空格！！！
{% endnote %}

- 其中，“1” “2” “3”是`myid`，要求是1~255的整数；hsq01代表对应主机地址
- `2888`是`Leader`端口，负责和`Follower`进行通信
- `3888`是`Follower`端口，负责推选`Leader`

### 新建`dataDir`目录

{% codeblock lang:shell %}
mkdir /mysoft/apache-zookeeper-3.8.1/zkData
{% endcodeblock %}

**在该目录下新建文件**`myid`，并填写内容
{% codeblock lang:sh vi /mysoft/apache-zookeeper-3.8.1/zkData/myid %}
1
{% endcodeblock %}

### 将Zookeeper目录及Zookeeper环境分发到其他主机

{% codeblock lang:shell %}
for i in {2..3}; do scp -r /mysoft/apache-zookeeper-3.8.1/ hsq0$i:/mysoft/;done
for i in {2..3}; do scp /etc/profile hsq0$i:/etc/profile;done
{% endcodeblock %}

### 修改`myid`文件

- 02虚拟机改为`2`
- 03虚拟机改为`3`

### 使环境变量生效

每台虚拟机分别执行`source /etc/profile`

### 启动Zookeeper服务

{% codeblock lang:shell 每台虚拟机均要执行 %}
zkServer.sh start
{% endcodeblock %}

### 查看各虚拟机的Zookeeper服务启动状态

{% codeblock lang:shell %}
zkServer.sh status
{% endcodeblock %}

![01](2023-03-27-16-10-27.png)
![02](2023-03-27-16-11-04.png)
![03](2023-03-27-16-11-38.png)

### 启动和关闭Zookeeper集群

启动和关闭Zookeeper集群需要在每台虚拟机上启动和关闭Zookeeper服务器。如果使用的虚拟机很多，效率会非常低。
为了方便的使用Zookeeper集群，可以编写启动脚本`xzk.sh`。

**(1)在虚拟机hsq01的目录/usr/local/bin/下新建`xzk.sh`脚本文件**
{% codeblock lang:sh vi /usr/local/bin/xzk.sh %}
#! /bin/bash
cmd=$1
if [ $# -gt 1 ] ; then echo param must be 1 ; exit ; fi
for (( i=1 ; i<=3 ; i++ )) ; do
        tput setaf 5
        echo ============ hsq0$i $@ ============
        tput setaf 9
        ssh hsq0$i "source /etc/profile ; zkServer.sh $cmd"
done
{% endcodeblock %}

**(2)为`xzk.sh`脚本添加执行权限**
{% codeblock lang:shell %}
chmod u+x xzk.sh
{% endcodeblock %}

**(3)通过`xzk.sh`脚本的start和stop命令，就可以在虚拟机01上同时启动和关闭所有虚拟机的Zookeeper服务器**
{% codeblock lang:shell %}
xzk.sh start
xzk.sh stop
xzk.sh status
{% endcodeblock %}
![方便启动](2023-03-27-16-37-02.png)

![](2023-04-02-15-20-02.png)