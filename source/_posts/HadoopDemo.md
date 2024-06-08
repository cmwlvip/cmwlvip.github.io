---
title: Hadoop生态综合案例
comments: true
date: 2023-05-27 14:32:15
updated: 2023-06-15
sticky:
description:
categories: Hadoop
tags:
    - Hadoop
    - Hive
    - 大数据
cover: https://pic1.imgdb.cn/item/6366396d16f2c2beb1036f1c.jpg
top_img: https://pic1.imgdb.cn/item/6471a9abf024cca173ea48c5.jpg
---

## 关于Hadoop的使用

### 找不到或无法加载主类

{% note danger modern %}
`hadoop`执行`mapreduce`操作时报找不到或无法加载主类 `org.apache.hadoop.mapreduce.v2.app.MRAppMaster`
{% endnote %}

{% codeblock lang:shell %}
hadoop classpath
{% endcodeblock %}

修改`yarn-siet.xml`文件

{% codeblock lang:xml 'vi $HADOOP_HOME/etc/hadoop/yarn-site.xml' %}
<property>
	<name>yarn.application.classpath</name>
	<value>
		// 第一步的结果
	</value>
</property>

{% endcodeblock %}

## 词频统计

## 陌陌聊天数据分析

### 陌陌聊天数据分析案例需求

#### 背景介绍

陌陌作为聊天平台每天都会有大量的用户在线，会出现大量的聊天数据，通过对**聊天数据的统计分析**，可以更好的对用户构建精准的**用户画像**，为用户提供更好的服务以及实现`高ROI`的**平台运营推广**，给公司的发展决策提供精确的数据支撑。

![momo](2023-05-27-15-21-18.png)

#### 目标需求

**目标**
基于Hadoop和Hive实现聊天数据统计分析，构建**聊天数据分析报表**
![聊天数据分析报表](2023-05-27-15-22-28.png)

**需求**

- 统计今日**总消息量**
- 统计今日**每小时**消息量、发送和接收用户数
- 统计今日**各地区**发送消息数据量
- 统计今日发送消息和接收消息的**用户数**
- 统计今日**发送消息最多的Top10用户**
- 统计今日**接收消息最多的Top10用户**
- 统计发送人的**手机型号分布情况**
- 统计发送人的**设备操作系统分布情况**

#### 数据内容

- 数据大小：两个文件共14万条数据
- 列分隔符：制表符`\t`
- 数据字典及样例数据
![样例数据](2023-05-27-15-29-11.png)

### 基于Hive数仓使用SQL实现需求开发

#### 建库建表、加载数据

{% tabs data %}
<!-- tab 建库 -->
{% codeblock lang:sql %}
--如果数据库已存在就删除
-- cascade 表示级联删除，即同时删除依赖于该数据库的所有对象，如表、视图、函数等。这也是一个可选的语法，但建议在需要完全清除数据库时使用。
drop database if exists db_momo cascade;
--创建数据库
create database db_momo;
--切换数据库
use db_momo;
--列举数据库
show databases;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 建表 -->
{% codeblock lang:sql %}
--如果表已存在就删除
drop table if exists db_momo.tb_msg_source ;
--建表
create table db_momo.tb_msg_source
(
    msg_time string comment "消息发送时间",
    sender_name string comment "发送人昵称",
    sender_account string comment "发送人账号",
    sender_sex string comment "发送人性别",
    sender_ip string comment "发送人ip地址",
    sender_os string comment "发送人操作系统",
    sender_phonetype string comment "发送人手机型号",
    sender_network string comment "发送人网络类型",
    sender_gps string comment "发送人的GPS定位",
    receiver_name string comment "接收人昵称",
    receiver_ip string comment "接收人IP",
    receiver_account string comment "接收人账号",
    receiver_os string comment "接收人操作系统",
    receiver_phonetype string comment "接收人手机型号",
    receiver_network string comment "接收人网络类型",
    receiver_gps string comment "接收人的GPS定位",
    receiver_sex string comment "接收人性别",
    msg_type string comment "消息类型",
    distance string comment "双方距离",
    message string comment "消息内容"
)--指定分隔符为制表符
row format delimited
fields terminated by '\t';
{% endcodeblock %}
<!-- endtab -->

<!-- tab 准备数据 -->
HDFS上创建目录
{% codeblock lang:shell %}
hadoop fs -mkdir -p /momo/data
{% endcodeblock %}

上传到HDFS
{% codeblock lang:shell %}
hadoop fs -put /root/data/data1.tsv /momo/data/
hadoop fs -put /root/data/data2.tsv /momo/data/
{% endcodeblock %}

![上传到HDFS](2023-05-27-15-56-56.png)
<!-- endtab -->

<!-- tab 加载数据 -->
{% codeblock lang:sql %}
load data inpath '/momo/data/data1.tsv' into table db_momo.tb_msg_source;
load data inpath '/momo/data/data2.tsv' into table db_momo.tb_msg_source;
{% endcodeblock %}
![加载数据到表](2023-05-27-16-00-29.png)

验证结果
{% codeblock lang:sql %}
select msg_time,sender_name,sender_ip,sender_phonetype,receiver_name,receiver_network from tb_msg_source limit 10;
{% endcodeblock %}
![验证结果](2023-05-27-16-01-50.png)
<!-- endtab -->
{% endtabs %}

### ETL数据清洗

原始数据：聊天业务系统中导出的2021年11月01日一天24小时的用户聊天数据，以TSV文本形式存储在文件中

{% label 数据问题 red %}

- 问题1：当前数据中，有一些数据的字段为空，不是合法数据
{% codeblock lang:sql %}
select msg_time,sender_name,sender_gps from tb_msg_source where length(sender_gps) = 0 limit 10;
{% endcodeblock %}

- 问题2：需求中，需要统计每天、每个小时的消息量，但是数据中没有天和小时字段，只有整体时间字段，不好处理
{% codeblock lang:sql %}
select msg_time from tb_msg_source limit 10;
{% endcodeblock %}

- 问题3：需求中，需要对经度和维度构建地区的可视化地图，但是数据中GPS经纬度为一个字段，不好处理
{% codeblock lang:sql %}
select sender_gps from tb_msg_source limit 10;
{% endcodeblock %}

{% label ETL需求 red %}

- 需求1：对字段为空的不合法数据进行过滤
Where过滤
- 需求2：通过时间字段构建天和小时字段
Substr函数
- 需求3：从GPS的经纬度中提取经度和维度
Split函数
- 需求4：将ETL以后的结果保存到一张新的Hive表中
Create table …… as select ……

{% label ETL实现 red %}

{% codeblock lang:sql %}
--如果表已存在就删除
drop table if exists tb_msg_etl;
--将Select语句的结果保存到新表中
create table tb_msg_etl as
    select *,substr(msg_time,0,10) as dayinfo, substr(msg_time,12,2) as hourinfo, --获取天和小时
    split(sender_gps,",")[0] as sender_lng, split(sender_gps,",")[1] as sender_lat --提取经度纬度
from tb_msg_source
--过滤字段为空的数据
where length(sender_gps) > 0;
{% endcodeblock %}

{% label 查看结果 red %}

{% codeblock lang:sql %}
select msg_time,dayinfo,hourinfo,sender_gps,sender_lng,sender_lat from tb_msg_etl limit 10;
{% endcodeblock %}

![结果](2023-05-27-16-55-57.png)

### 需求指标统计

{% note pink 'fa-solid fa-question' modern %}

1. 实际开发中，拿到业务需求指标，如何下手？
2. SQL层面如何编写查询语句？
{% endnote %}

{% note blue 'fas fa-comment' modern %}

1. 正确解读业务需求，避免歧义
2. 确定待查询的数据表-->**from表**
3. 找出分析的维度-->**group by分组**的字段
4. 找出计算的指标-->**聚合**的字段
5. 其他细节点（过滤、排序等）
{% endnote %}

{% label 查询类SQL编写思路举例 green %}

- 表：t_user(id，name，age，sex，city)
- 需求：统计每个城市男女人数与男女平均年龄
- 分组字段：**每个城市**、**男女**
也就意味着同一个城市，性别相同的人应该分到同一组，因此这里需要根据两个字段进行分组
- 聚合字段：**人数**、**平均年龄**
`count(id)`就是统计每个分组中的条数-->人数
`avg(age)`就是统计每个分组中年龄的平均值-->平均年龄

{% label 需求指标统计 green %}

根据[目标需求](#目标需求)

{% tabs target %}
<!-- tab 指标1 -->
统计**今日**消息`总量`

{% codeblock lang:sql %}
--保存结果表
create table if not exists tb_rs_total_msg_cnt comment "今日消息总量"
as
select dayinfo,count(*) as total_msg_cnt from tb_msg_etl group by dayinfo;

select * from tb_rs_total_msg_cnt;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 指标2 -->
统计**每小时**`消息量`、`发送`和接`收用户数`

{% codeblock lang:sql %}
--保存结果表
create table if not exists tb_rs_hour_msg_cnt comment "每小时消息量趋势"
as
select dayinfo,hourinfo,count(*) as total_msg_cnt,count(distinct sender_account) as sender_usr_cnt,count(distinct receiver_account) as receiver_usr_cnt
from tb_msg_etl group by dayinfo,hourinfo;

select * from tb_rs_hour_msg_cnt;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 指标3 -->
统计**今日各地区**`发送消息总量`

{% codeblock lang:sql %}
--保存结果表
create table if not exists tb_rs_loc_cnt comment "今日各地区发送消息总量"
as
select dayinfo,sender_gps,cast(sender_lng as double) as longitude,cast(sender_lat as double) as latitude,count(*) as total_msg_cnt
from tb_msg_etl group by dayinfo,sender_gps,sender_lng,sender_lat;

select * from tb_rs_loc_cnt;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 指标4 -->
统计**今日**`发送`和`接收用户人数`

{% codeblock lang:sql %}
--保存结果表
create table if not exists tb_rs_usr_cnt comment "今日发送消息人数、接受消息人数"
as
select dayinfo,count(distinct sender_account) as sender_usr_cnt,count(distinct receiver_account) as receiver_usr_cnt
from tb_msg_etl group by dayinfo;

select * from tb_rs_usr_cnt;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 指标5 -->
统计`发送消息`条数最多的Top10**用户**

{% codeblock lang:sql %}
--保存结果表
create table if not exists tb_rs_susr_top10 comment "发送消息条数最多的Top10用户"
as
select dayinfo,sender_name as username,count(*) as sender_msg_cnt
from tb_msg_etl group by dayinfo,sender_name order by sender_msg_cnt desc limit 10;

select * from tb_rs_susr_top10;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 指标6 -->
统计`接收消息`条数最多的Top10**用户**

{% codeblock lang:sql %}
--保存结果表
create table if not exists tb_rs_rusr_top10 comment "接受消息条数最多的Top10用户"
as
select dayinfo,receiver_name as username,count(*) as receiver_msg_cnt
from tb_msg_etl group by dayinfo,receiver_name order by receiver_msg_cnt desc limit 10;

select * from tb_rs_rusr_top10;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 指标7 -->
统计`发送人`的**手机型号**分布情况

{% codeblock lang:sql %}
--保存结果表
create table if not exists tb_rs_sender_phone comment "发送人的手机型号分布"
as
select dayinfo,sender_phonetype,count(distinct sender_account) as cnt
from tb_msg_etl group by dayinfo,sender_phonetype;

select * from tb_rs_sender_phone limit 10;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 指标8 -->
统计`发送人`的**操作系统**分布

{% codeblock lang:sql %}
--保存结果表
create table if not exists tb_rs_sender_os comment "发送人的OS分布"
as
select dayinfo,sender_os,count(distinct sender_account) as cnt
from tb_msg_etl group by dayinfo,sender_os;

select * from tb_rs_sender_os limit 10;
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

### 基于FineBI实现可视化报表

#### FineBI的介绍

FineBI 是帆软软件有限公司推出的一款**商业智能**（Business Intelligence）产品。FineBI 是定位于自助大数据分析的BI 工具，能够帮助企业的业务人员和数据分析师，开展以问题导向的探索式分析。

![FineBI商业智能](2023-05-27-18-01-13.png)

FineBI的特点

- 通过**多人协作**来实现最终的可视化构建
- 不需要通过复杂代码来实现开发，通过**可视化操作**实现开发
- 适合于**各种**数据可视化的**应用场景**
- 支持**各种常见的分析图表和各种数据源**
- 支持处理**大数据**

![了解FineBI](2023-05-27-18-03-25.png)

#### FineBI安装

##### 环境要求

FineBI支持安装在主流操作系统上，但对操作系统的CPU、JDK版本、内存等均有要求，目前的系统要求如下：

- Windows（仅支持64位）：
  - 系统：windows7或更高版本
  - JDK：JDK1.8及以上（Oracle）
  - CPU：Intel Core i3-4代 或更快的处理器
  - 内存：4G或以上
  - 磁盘：至少2G可用空间

- Mac（64位）：
  - 系统：MacOS10或更高版本
  - JDK：JDK1.8及以上（Oracle）
  - CPU：Intel Core i3-4代 或更快的处理器
  - 内存：4G或以上
  - 磁盘：至少2G可用空间

##### 下载与安装

从[FineBI官网](https://www.fanruan.com/)下载好安装程序
下载对应版本
![找到下载入口](2023-05-27-13-50-04.png)
![这里下载Windows版本](2023-05-27-13-50-26.png)
傻瓜式安装。。。
![最大内存单位，最低设置2048](2023-05-27-13-54-15.png)

- 如果笔记本内存高于8G，建议设置为4096
- 如果笔记本内存是8G，建议设置为3072
- 如果笔记本内存是4GB，只能是2048

##### 运行FineBI

![点击获取激活码](2023-05-27-14-03-56.png)
![输入手机号](2023-05-27-14-04-57.png)
![完善个人信息](2023-05-27-14-06-53.png)
![填写最后一步](2023-05-27-14-08-59.png)

点击免费试用获取激活码

![使用FinBI](2023-05-27-14-13-33.png)
![设置管理员账号](2023-05-27-14-15-18.png)
![选择直接登录](2023-05-27-14-18-31.png)
![登录](2023-05-27-14-19-34.png)
![登录成功](2023-05-27-14-21-15.png)

##### 关闭FineBI

![关闭FineBI](2023-05-27-14-21-51.png)
![关闭FineBI](2023-05-27-14-22-08.png)

#### FineBI配置数据源及数据准备

[FineBI与Hive集成的官方文档](https://help.fanruan.com/finebi/doc-view-301.html)

{% label 驱动配置 red %}

- 问题：如果使用FineBI连接Hive，读取Hive的数据表，需要在FineBI中添加Hive的驱动jar包
- 解决：将Hive的驱动jar包放入FineBI的lib目录下
- step1：找到提供的【Hive连接驱动】
![Hive连接驱动](2023-05-27-22-23-11.png)
- step2：将这些文件放入FineBI的安装目录下的：`webapps\webroot\WEB-INF\lib`目录中

{% label 插件安装 red %}

- 问题：我们**自己放的Hive驱动包会与FineBI自带的驱动包产生冲突**，导致FineBI无法识别我们自己的驱动包
- 解决：安装FineBI官方提供的**驱动包隔离插件**
- step1：找到隔离插件
![隔离插件](2023-05-27-22-25-56.png)
- step2：安装插件
![安装插件](2023-05-27-22-26-40.png)
- step3：重启FineBI

{% label 构建连接 red %}

1. 新建连接
![新建Hive连接](2023-05-27-22-30-56.png)
2. 配置连接
![配置连接](2023-05-27-22-32-03.png)
3. 测试连接
![连接成功](2023-05-27-22-33-17.png)
4. 保存连接

{% label 数据准备 red %}

`公共数据`栏添加数据库表即可看到数据库里所有的表了。

![公共数据栏](2023-05-27-22-35-58.png)
![添加需要分析的表](2023-05-27-22-36-29.png)

#### FineBI构建可视化报表

`我的分析`新建**分析主题**添加需要分析的数据即可开启可视化之旅！

![新建分析主题](2023-05-27-22-43-05.png)

点击要编辑的**分析主题**就会在新窗口打开，方可构建可视化报表。

然后就可以在最下方新建“组件”与“仪表板”了

![分析主题编辑窗口](2023-05-27-22-46-59.png)

![可在仪表板导航栏编辑样式](2023-05-27-22-49-16.png)

![仪表板那可以决定是否显示标题](2023-05-27-22-56-10.png)

{% label 常用图表 red %}

{% tabs table %}
<!-- tab kpi指标卡(动态文本) -->
![关联指标，编辑文本](2023-05-27-22-53-39.png)
![设置好字体颜色等](2023-05-27-23-09-10.png)

添加**总消息数**，**总发送消息人数**和**总接收消息人数**
<!-- endtab -->

<!-- tab 地图 -->
![关联地理角色](2023-05-27-23-22-50.png)
![选择点地图，并指定经度纬度](2023-05-27-23-23-30.png)

实现**今日各地区发送消息总量**可视化
<!-- endtab -->

<!-- tab 雷达图 -->
![选择折线雷达图，并拖入指标](2023-05-28-00-00-58.png)

实现**今日发送消息最多用户Top10**可视化
<!-- endtab -->

<!-- tab 柱形图 -->
![选择多系列柱形图，并拖入指标](2023-05-28-00-08-50.png)

实现**今日接收消息最多用户Top10**可视化
<!-- endtab -->

<!-- tab 环饼状图 -->
![选择玫瑰图，并拖入指标](2023-05-28-00-20-53.png)

实现**发送用户操作系统占比**可视化
<!-- endtab -->

<!-- tab 词汇云图 -->
![选择词云，并拖入指标](2023-05-28-00-27-34.png)

实现**发送用户手机型号分布**可视化
<!-- endtab -->

<!-- tab 折线图 -->
![选择多系列折线图，并拖入指标](2023-05-28-00-43-20.png)

实现**每小时趋势图**可视化
<!-- endtab -->
{% endtabs %}

![报表预览](2023-05-28-00-50-28.png)
