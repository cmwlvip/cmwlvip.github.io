---
title: HBase三种搭建方式
comments: true
date: 2023-03-15 10:26:10
updated: 2023-03-27
description: Hbase三种搭建方式
sticky:
categories: Hadoop
tags:
    - Hadoop
    - Hbase
cover: https://pic.imgdb.cn/item/64120132ebf10e5d533c6ba9.jpg
---

{% note default modern %}
`Hbase`底层仍然依赖`HDFS`来作为其物理存储，并且还需要`Zookeeper`协助提供部分配置服务，包括维护元信息和命名空间
{% endnote %}

## 环境准备

Hadoop集群：3.3.4
Zookeeper集群：3.8.1
Hbase: hbase-3.0.0-alpha-3

### 安装Hbase

从[Hbase](https://hbase.apache.org/)官网下载好安装包

{% codeblock lang:shell %}
tar -zxvf hbase-3.0.0-alpha-3-bin.tar.gz -C /mysoft/
{% endcodeblock %}

### 配置环境变量

配置hbase路径
{% codeblock lang:sh vi /etc/profile %}
#Hbase enviroment variables
export HBASE_HOME=/mysoft/hbase-3.0.0-alpha-3
export PATH=$PATH:$HBASE_HOME/bin
{% endcodeblock %}

{% codeblock lang:shell 使环境变量生效 %}
source /etc/profile
{% endcodeblock %}

## 单机（独立）模式

默认模式，HBase不使用HDFS，它使用本地文件系统，他在同一个`JVM`中运行所有HBase守护进程和本地Zookeeper。Zookeeper绑定到一个众所周知的端口。

### 配置`hbase-env.sh`文件

编辑hbase/conf下hbase-env.sh，设置`JAVA_HOME`

{% codeblock lang:sh vi hbase-env.sh %}
export JAVA_HOME=/usr/local/jdk1.8.0_341/
{% endcodeblock %}

### 配置`hbase-site.xml`文件

编辑hbase/conf下hbase-site.xml中，仅需要指定hbase和Zookeeper写数据的本地路径，默认在/tmp下创建新的目录。

{% codeblock lang:xml %}
<configuration>
  <property>
    <name>hbase.rootdir</name>
    <value>file:///root/data/hbase/data</value>
  </property>
  <property>
    <name>hbase.zookeeper.property.dataDir</name>
    <value>/root/data/hbase/zookeeper</value>
  </property>
  <property>
    <name>hbase.unsafe.stream.capability.enforce</name>
    <value>false</value>
  </property>
</configuration>
{% endcodeblock %}

### 单机（独立）模式启动

启动：`start-hbase.sh`
关闭：`stop-hbase.sh`

{% blockquote %}
jps查看进程
{% endblockquote %}
![jps查看](2023-03-15-10-45-37.png)

{% blockquote %}
使用[hsq01:16010](http://hsq01:16010)在web界面查看
{% endblockquote %}
![web查看](2023-03-15-10-45-01.png)

## 伪分布式模式

伪分布式模式只是单个主机上运行的完全分布式模式。在HBASE上使用此配置测试源和原型设计。请勿将此配置用于生产。

### 配置`hbase-site.xml`文件

{% codeblock lang:xml %}
<property>
  <name>hbase.cluster.distributed</name>
  <value>true</value>
</property>
{% endcodeblock %}

更改`hbase.rootdir`

{% codeblock lang:xml %}
<property>
  <name>hbase.rootdir</name>
  <value>hdfs://hsq01:9000/data/hbase/data</value>
</property>
{% endcodeblock %}

{% note warning modern %}
应与Hadoop集群中`fs.defaultFS`中的配置一致，否则没有HMaster,关闭时出现no hbase master found
{% endnote %}

指定`zookeeper`写的目录

{% codeblock lang:xml %}
<property>
  <name>hbase.zookeeper.property.dataDir</name>
  <value>/root/data/hbase/zookeeper1/</value>
</property>
{% endcodeblock %}

注意：由于HBase要使用HDFS的客户端，HDFS客户端的配置必须让hbase看到并使用。有三种方式做到这一点：

1. 在hbase-env.sh中，将HADOOP_CONF_DIR添加到HBASE_CLASSPATH环境变量中，HADOOP_CONF_DIR指向HADOOP的etc/hadoop目录。
2. 拷贝hdfs-site.xml到HBASE_HOME/conf，当然，最好是做一个符号链接。
3. 如果HDFS客户端配置很少，可以直接添加到hbase-site.xml中。

### 伪分布式模式启动

{% blockquote %}
启动
{% endblockquote %}

- 开启Hadoop集群`start-all.sh`
- `start-hbase.sh`

{% blockquote %}
jps查看进程
{% endblockquote %}
![jps查看](2023-03-16-14-22-17.png)

{% blockquote %}
使用[hsq01:9870](http://hsq01:9870)和[hsq01:16010](http://hsq01:16010)在web界面查看
{% endblockquote %}
![web下查看hbase.rootdir](2023-03-16-00-30-29.png)
![web下查看hbase](2023-03-16-14-25-38.png)

## 完全分布式搭建

### 配置`hbase-env.sh`文件

{% codeblock lang:sh 设置使用外部zookeeper %}
HABSE_MANAGES_ZK=false
{% endcodeblock %}

### 配置`hbase-site.xml`文件

{% codeblock lang:xml %}
<property>
  <name>hbase.cluster.distributed</name>
  <value>true</value>
</property>
<property>
  <name>hbase.rootdir</name>
  <value>hdfs://hsq01:9000/data/hbase/data1</value>
</property>
<property>
  <!-- 默认端口号可以不写，也可以添加：node2:2181,node3:2181,node4:2181 -->
  <name>hbase.zookeeper.quorum</name>
  <value>hsq01:2181,hsq02:2181,hsq03:2181</value>
</property>
<property>
  <!-- 可以不配置 -->
  <name>hbase.zookeeper.property.dataDir</name>
  <value>/root/data/hbase/zookeeper2/</value>#zookeeper配置时存放数据的路径
</property>
{% endcodeblock %}

{% note info danger %}
启动Hbase后当web界面只有一个节点启动，添加下面的配置一般可以解决
{% endnote %}
{% codeblock lang:xml %}
<!--hbase 结点之间时间不一致造成regionserver启动失败 ，增大容忍度-->
<property>
    <name>hbase.master.maxclockskew</name>
    <value>100000000</value>
</property>
{% endcodeblock %}

### 拷贝`hdfs.site.xml`和`core.site.xml`

因为hbase需要读取Hadoop的`hdfs.site.xml`和`core.site.xml`当中的文件信息，所以需要进行此操作，使用软连接亦可

{% codeblock lang:shell %}
cp $HADOOP_HOME/etc/hadoop/hdfs-site.xml $HBASE_HOME/conf/hdfs-site.xml
cp $HADOOP_HOME/etc/hadoop/core-site.xml $HBASE_HOME/conf/core-site.xml
{% endcodeblock %}

### 配置`regionserver`文件

{% codeblock lang:shell %}
cd $HBASE_HOME
cd conf
vi regionservers
{% endcodeblock %}

**输入要运行`regionserver`的主机名**
{% codeblock lang:sh %}
hsq01
hsq02
hsq03
{% endcodeblock %}

###  配置`backup-masters`文件

HBase 支持运行多个 master 节点，因此不会出现单点故障的问题，但只能有一个活动的管理节点（active master），其余为备用节点（backup master），一般设置一个备用节点即可
{% codeblock lang:sh  vi backup-masters %}
hsq02
{% endcodeblock %}

### 将hbase目录以及hbase环境分发到其他主机

{% codeblock lang:shell %}
scp -r /mysoft/hbase-3.0.0-alpha-3/ hsq02:/mysoft/
scp -r /mysoft/hbase-3.0.0-alpha-3/ hsq03:/mysoft/

scp /etc/profile hsq02:/etc/profile
scp /etc/profile hsq03:/etc/profile
{% endcodeblock %}

### 完全分布式模式启动

{% blockquote %}
启动
{% endblockquote %}

- 开启Hadoop集群`start-all.sh`
- 开启zookeeper集群`zkServer.sh start`
- `start-hbase.sh`

{% blockquote %}
jps查看进程
{% endblockquote %}
{% inlineImg 2023-03-16-16-02-09.png 200px %}{% inlineImg 2023-03-16-16-03-55.png 200px %}{% inlineImg 2023-03-16-16-03-42.png 200px %}

{% blockquote %}
使用[hsq01:9870](http://hsq01:9870)和[hsq01:16010](http://hsq01:16010)在web界面查看
{% endblockquote %}
![web下查看hbase.rootdirs](2023-03-16-16-08-11.png)
![web界面查看hbase](2023-03-16-15-49-00.png)

## 搭建过程中遇到的问题

{% note danger modern %}
Class path contains multiple SLF4J bindings.
{% endnote %}

原因：无效变量名
错误：找不到或无法加载主类，可能是Hadoop和Hbase包冲突所致或者 Hadoop 中的配置文件与 Hbase 不兼容。
解决方法： Hbase 自带是有 Hadoop 中的依赖文件的，我们让 Hbase 不使用本地 Hadoop 中的文件，使用自带的配置文件即可。
这时只需要将配置文件`hbase-env.sh`中最后一行的该代码`export HBASE_DISABLE_HADOOP_CLASSPATH_LOOKUP=“true”`前面的#删掉即可。

{% codeblock lang:sh vi hbase-env.sh %}
export HBASE_DISABLE_HADOOP_CLASSPATH_LOOKUP="true"
{% endcodeblock %}

{% note danger modern %}
![stop-hbase.sh关闭不了](2023-03-16-01-00-54.png)
{% endnote %}

{% codeblock lang:shell %}
hbase-daemon.sh stop master
stop-hbase.sh
{% endcodeblock %}