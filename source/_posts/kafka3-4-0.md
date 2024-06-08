---
title: Kafka
comments: true
date: 2023-05-08 00:01:28
updated: 2023-05-15
sticky:
categories: Hadoop
tags:
    - Hadoop
    - 大数据
    - Kafka
cover: https://pic2.imgdb.cn/item/645a5d440d2dde57777f32d1.jpg
---

{% note default modern %}
[Kafka命令行操作](#Kafka命令行操作)
{% endnote %}

## Kafka 概述

### Kafka定义

- Kafka传统定义：Kafka是一个**分布式**的基于**发布/订阅模式**的**消息队列**（MessageQueue），主要应用于**大数据实时处理领域**。
- 发布/订阅：消息的发布者不会将消息直接发送给特定的订阅者，而是**将发布的消息分为不同的类别**，订阅者**只接收感兴趣的消息**。
- Kafka最新定义： Kafka 是一个开源的**分布式事件流平台**（ Event StreamingPlatform），被数千家公司用于**高性能数据管道、流分析、数据集成和关键任务应用**。

![双十一购物](2023-05-08-00-32-43.png)
{% note info modern %}
为了更好理解，就拿双十一购物来说，数据量太大，Hadoop一时间处理不了，需要时间去缓冲，Kafka的作用就体现出来了
{% endnote %}

### 消息队列

目前企业中比较常见的消息队列产品主要有Kafka 、ActiveMQ、RabbitMQ、RocketMQ 等

在大数据场景主要采用`Kafka`作为消息队列。在JavaEE 开发中主要采用ActiveMQ、RabbitMQ、RocketMQ

#### 传统消息队列的应用场景

传统的消息队列的主要应用场景包括：**缓存/消峰**、**解耦**和**异步通信**。

{% tabs kafka %}
<!-- tab 缓存/消峰 -->
**缓冲/消峰**：有助于控制和优化数据流经过系统的速度，解决生产消息和消费消息的处理速度不一致的情况。

![缓冲/消峰](2023-05-08-00-49-38.png)
<!-- endtab -->

<!-- tab 解耦 -->
**解耦**：允许你独立的扩展或修改两边的处理过程，只要确保它们遵守同样的接口约束。

![解耦](2023-05-08-00-50-16.png)
<!-- endtab -->

<!-- tab 异步通信 -->
**异步通信**：允许用户把一个消息放入队列，但并不立即处理它，然后在需要的时候再去处理它们。

![异步通信](2023-05-08-00-51-00.png)
<!-- endtab -->

{% endtabs %}

#### 消息队列的两种模式

{% tabs twoPattern %}
<!-- tab 点对点模式 -->

- 消费者主动拉取数据，消息收到后清除消息

![点对点模式](2023-05-08-00-53-19.png)
<!-- endtab -->

<!-- tab 发布/订阅模式 -->

- 可以有多个topic主题（浏览、点赞、收藏、评论等）
- 消费者消费数据之后，不删除数据
- 每个消费者相互独立，都可以消费到数据

![发布/订阅模式](2023-05-08-00-56-19.png)
<!-- endtab -->
{% endtabs %}

### Kafka基础架构

![Kafka基础架构](2023-05-08-01-00-49.png)

1. `Producer`：消息生产者，就是向Kafka broker 发消息的客户端。
2. `Consumer`：消息消费者，向Kafka broker 取消息的客户端。
3. `Consumer Group（CG）`：消费者组，由多个consumer 组成。**消费者组内每个消费者负责消费不同分区的数据，一个分区只能由一个组内消费者消费；消费者组之间互不影响。**所有的消费者都属于某个消费者组，即**消费者组是逻辑上的一个订阅者**。
4. `Broker`：一台Kafka 服务器就是一个broker。一个集群由多个broker 组成。一个broker 可以容纳多个topic。
5. `Topic`：可以理解为一个队列，**生产者和消费者面向的都是一个topic**。
6. `Partition`：为了实现扩展性，一个非常大的topic 可以分布到多个broker（即服务器）上，**一个topic可以分为多个partition**，每个partition 是**一个有序的队列**。
7. `Replica`：副本。一个topic 的每个分区都有若干个副本，一个`Leader`和若干个`Follower`。
8. `Leader`：每个分区多个**副本的“主”**，生产者发送数据的对象，以及消费者消费数据的对象都是Leader。
9. `Follower`：每个分区多个**副本中的“从”**，实时从Leader 中同步数据，保持和Leader 数据的同步。Leader 发生故障时，某个Follower 会成为新的Leader。

## Kafka快速入门

### 安装部署

#### 环境准备

- Zookeeper: 3.8.1
- Kafka：3.4.0

#### 集群规划

| hsq01 | hsq02 | hsq03 |
| ---- | ----- | ------ |
| zk | zk | zk |
| kafka | kafka | kafka |

#### 集群部署

##### 安装Kafka

从[Kafka](https://kafka.apache.org/)官网下载好安装包

{% codeblock lang:shell %}
tar -zxvf kafka_2.12-3.4.0.tgz -C /mysoft/
{% endcodeblock %}

##### 配置环境变量

{% codeblock lang:sh vi /etc/profile %}
#Kafka enviroment variables
export KAFKA_HOME=/mysoft/kafka_2.12-3.4.0
export PATH=$PATH:$KAFKA_HOME/bin
{% endcodeblock %}

{% codeblock lang:shell 使环境变量生效 %}
source /etc/profile
{% endcodeblock %}

##### 配置`server.properties`

{% codeblock lang:shell %}
cd $KAFKA_HOME
cd config/
vi server.properties
{% endcodeblock %}

{% codeblock lang:sh mark:2,14,28 %}
#broker 的全局唯一编号，不能重复，只能是数字。
broker.id=0
#处理网络请求的线程数量
num.network.threads=3
#用来处理磁盘 IO 的线程数量
num.io.threads=8
#发送套接字的缓冲区大小
socket.send.buffer.bytes=102400
#接收套接字的缓冲区大小
socket.receive.buffer.bytes=102400
#请求套接字的缓冲区大小
socket.request.max.bytes=104857600
#kafka 运行日志数据存放的路径 ，路径不需要提前创建kafka自动帮你创建，可以配置多个磁盘路径，路径与路径之间可以用“,”分隔开
log.dirs=/mysoft/kafka_2.12-3.4.0/data
#topic 在当前 broker 上的分区个数
num.partitions=1
#用来恢复和清理 data 下数据的线程数量
num.recovery.threads.per.data.dir=1
#每个 topic 创建时的副本数，默认时 1 个副本
offsets.topic.replication.factor=1
#segment 文件保留的最长时间，超时将被删除
log.retention.hours=168
#每个 segment 文件 的大小，默认最大 1G
log.segment.bytes=1073741824
#检查过期数据的时间，默认 5 分钟检查一次是否数据过期
log.retention.check.interval.ms=300000
#配置连接 Zookeeper 集群地址（在 zk 根目录下创建 kafka ，方便管理）
zookeeper.connect=hsq01:2181,hsq02:2181,hsq03:2181/kafka
{% endcodeblock %}

##### 将Kafka目录及Kafka环境分发到其他主机

{% codeblock lang:shell %}
for i in {2..3}; do scp -r /mysoft/kafka_2.12-3.4.0/ hsq0$i:/mysoft/;done
for i in {2..3}; do scp /etc/profile hsq0$i:/etc/profile;done
{% endcodeblock %}

##### 修改另外两台虚拟机`server.properties`文件

- 02虚拟机`broker.id=1`
- 03虚拟机`broker.id=2`

{% note warning modern %}
`broker.id`不得重复 ，整个集群中唯一
{% endnote %}

##### 使环境变量生效

每台虚拟机分别执行`source /etc/profile`

##### 启动集群

- 先启动Zookeeper集群
{% note info modern %}
Zookeeper集群部署请前往 {% post_link zookeeper3-8-1 %}
{% endnote %}
{% codeblock lang:shell %}
xzk.sh start
{% endcodeblock %}

- 然后启动Kafka集群，依次在 `hsq01` `hsq02` `hsq03` 节点上启动 Kafka
{% codeblock lang:shell %}
cd $KAFKA_HOME
bin/kafka-server-start.sh -daemon config/server.properties
{% endcodeblock %}
{% note warning modern %}
`-daemon`指定`server .properties`参数时，一定要能够从当前路径到`server .properties`路径，否则Kafka不能成功开启
`jps`出现Kafka
{% endnote %}

- 关闭Kafka集群
{% codeblock lang:shell %}
kafka-server-stop.sh
{% endcodeblock %}

##### 启动和关闭Kafka集群脚本

启动和关闭`Kafka`集群需要在每台虚拟机上启动和关闭`Kafka`服务器。如果使用的虚拟机很多，效率会非常低。
为了方便的使用 Zookeeper 集群，可以编写启动脚本`kf.sh`。

**(1)在虚拟机`hsq01`的目录`/usr/local/bin/`下新建`kf.sh`脚本文件**
{% codeblock lang:shell %}
vi /usr/local/bin/kf.sh
{% endcodeblock %}

{% codeblock lang:sh %}
#! /bin/bash

case $1 in
"start"){
    for i in hsq01 hsq02 hsq03
    do
        tput setaf 5
        echo "============ start $i Kafka ============"
        tput setaf 9
        ssh $i "source /etc/profile ; kafka-server-start.sh -daemon $KAFKA_HOME/config/server.properties"
    done
};;
"stop"){
    for i in hsq01 hsq02 hsq03
    do
        tput setaf 1
        echo "============ stop $i Kafka ============"
        tput setaf 9
        ssh $i "source /etc/profile ; kafka-server-stop.sh"
    done
};;
esac
{% endcodeblock %}

**(2)为`kf.sh`脚本添加执行权限**
{% codeblock lang:shell %}
cd /usr/local/bin/
chmod u+x kf.sh
{% endcodeblock %}

**(3)通过`kf.sh`脚本的`start`和`stop`命令，就可以在虚拟机01上同时启动和关闭所有虚拟机的Kafka**
{% codeblock lang:shell %}
kf.sh start
kf.sh stop
{% endcodeblock %}
![同过脚本启动与关闭](2023-05-08-23-41-55.png)

{% note warning modern %}
停止Kafka 集群时，一定要等 Kafka 所有节点进程全部停止后再停止 Zookeeper集群。因为 Zookeeper 集群当中记录着 Kafka 集群相关信息，Zookeeper 集群一旦先停止，Kafka 集群就没有办法再获取停止进程的信息，只能手动杀死 Kafka 进程了。
{% endnote %}

### Kafka命令行操作

#### 主题命令行操作

**1)查看操作主题命令参数**
{% codeblock lang:shell %}
kafka-topics.sh
{% endcodeblock %}

| 参数 | 描述 |
| ---- | ---- |
| `--bootstrap-server <String: server to connect to>` | 连接的 Kafka Broker主机名称和端口号 |
| `--topic <String: topic>` | 操作的topic名称 |
| `--create` | 创建主题 |
| `--delete` | 删除主题 |
| `--alter` | 修改主题 |
| `--ist` | 查看所有主题 |
| `--describe` | 查看主题详细描述 |
| `--partitions <Integer: # of partitions>` | 设置分区数 |
| `--replication-factor <Integer: replication factor>` | 设置分区副本 |
| `--config <String: name=value>` | 更新系统默认的配置 |

**2)查看当前服务器中的所有topic**
{% codeblock lang:shell %}
kafka-topics.sh --bootstrap-server hsq01:9092 --list
{% endcodeblock %}

**3)创建`first`topic**
{% codeblock lang:shell %}
kafka-topics.sh --bootstrap-server hsq01:9092 --create --partitions 1 --replication-factor 3 --topic first
{% endcodeblock %}

- `--topic`定义 topic 名
- `--replication-factor` 定义副本数，不指定默认为1
- `--partitions` 定义分区数，不指定默认为1

**4)查看`first`主题的详情**
{% codeblock lang:shell %}
kafka-topics.sh --bootstrap-server hsq01:9092 --describe --topic first
{% endcodeblock %}

**5)修改分区数**
{% codeblock lang:shell %}
kafka-topics.sh --bootstrap-server hsq01:9092 --alter --topic first --partitions 3
{% endcodeblock %}

修改后再次查看详情可观察变化

{% note warning modern %}
分区数只能增加，不能减少
{% endnote %}

**6)删除topic**
{% codeblock lang:shell %}
kafka-topics.sh --bootstrap-server hsq01:9092 --delete --topic first
{% endcodeblock %}

#### 生产者命令行操作

**1)查看操作生产者命令参数**
{% codeblock lang:shell %}
kafka-console-producer.sh
{% endcodeblock %}

| 参数 | 描述 |
| ---- | ---- |
| `--bootstrap-server<String: server to connect to>` | 连接的 Kafka Broker主机名称和端口号 |
| `--topic <String: topic>` | 操作的topic名称|

**2)发送消息**
{% codeblock lang:shell %}
kafka-console-producer.sh --bootstrap-server hsq01:9092 --topic first
{% endcodeblock %}

#### 消费者命令行操作

**查看操作消费者命令参数**
{% codeblock lang:shell %}
kafka-console-consumer.sh
{% endcodeblock %}

| 参数 | 描述 |
| ---- | ---- |
| `--bootstrap-server<String: server to connect to>` | 连接的 Kafka Broker主机名称和端口号 |
| `--topic <String: topic>` | 操作的topic名称|
| `--from-beginning` | 从头开始消费 |
| `--group <String: consumer group id>` | 指定消费者组名称 |

**1)消费`first`主题中的数据**
{% codeblock lang:shell %}
kafka-console-consumer.sh --bootstrap-server hsq01:9092 --topic first
{% endcodeblock %}

**2)把主题中所有的数据都读取出来（包括历史数据）**
{% codeblock lang: %}
kafka-console-consumer.sh --bootstrap-server hsq01:9092 --from-beginning --topic first
{% endcodeblock %}

## Kafka生产者

### 生产者消息发送流程

#### 发送原理

在消息发送的过程中，涉及到**两个线程——`main`线程和`Sender`线程**。在`main`线程中创建了一个**双端队列`RecordAccumulator`**。main 线程将消息发送给RecordAccumulator，Sender 线程不断从RecordAccumulator中拉取消息发送到Kafka Broker。

![发送流程](2023-05-11-11-54-45.png)

#### 生产者重要参数列表

| 参数名称 | 描述 |
| --- | ---- |
| `bootstrap.servers` | 生产者连接集群所需的broker地址清单。例如hsq01:9092,hsq02:9092,hsq03:9092，可以设置1 个或者多个，中间用逗号隔开(不需要所有的broker地址，因为生产者从给定的 broker 里查找到其他 broker 信息) |
| `key.serializer` 和 `value.serializer` | 指定发送消息的 key 和 value 的序列化类型，一定要写全类名 |
| `buffer.memory` | RecordAccumulator缓冲区总大小，**默认32m** |
| `batch.size` | 缓冲区一批数据最大值，**默认16k**，适当增加该值，可以提高吞吐量，但是如果该值设置太大，会导致数据传输延迟增加 |
| `linger.ms` | 如果数据迟迟未达到batch.size，sender等待 linger.time 之后就会发送数据，单位 ms ，**默认值是0ms** ，表示没有延迟。 生产环境建议该值大小为 5—100ms 之间 |
| `acks` | 0：生产者发送过来的数据，不需要等数据落盘应答<br>1：生产者发送过来的数据 Leader 收到数据后应答<br>-1 (all)：生产者发送过来的数据 Leader+ 和 isr 队列里面的所有节点收齐数据后应答<br> **默认值是-1** ，**-1和all是等价的** |
| `max.in.flight.requests.per.connection` | 允许最多没有返回 ack 的次数，**默认为5**，开启幂等性要保证该值是1-5的数字 |
| `retries` | 当消息发送出现错误的时候，系统会重发消息，retries表示重试次数，**默认是int最大值：2147483647**，如果设置了重试，还想保证消息的有序性，需要设置MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION=1，否则在重试此失败消息的时候，其他的消息可能发送成功了 |
| `retry.backoff.ms` | 两次重试之间的时间间隔，默认是 100ms |
| `enable.idempotence` | 是否开启幂等性，**默认true**  |
| `compression.type` | 生产者发送的所有数据的压缩方式，**默认是none**，也就是不压缩<br>支持压缩类型:`none`、`gzip`、`snappy`、`lz4`和`zstd` |

### 异步发送API

#### 普通异步发送

**需求：**创建 Kafka 生产者，采用异步的方式发送到 Kafka Broker

![异步发送流程](2023-05-11-14-13-34.png)

{% blockquote %}
代码编写
{% endblockquote %}

1.创建Maven项目
2.导入依赖
{% codeblock lang:xml %}
<dependencies>
    <dependency>
        <groupId>org.apache.kafka</groupId>
        <artifactId>kafka-clients</artifactId>
        <version>3.4.0</version>
    </dependency>
</dependencies>
{% endcodeblock %}

3.创建包名：`com.hsq.kafka.producer`
4.编写不带回调函数的API代码
{% codeblock lang:java 导包 %}
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;
{% endcodeblock %}
{% codeblock lang:java %}
public class CustomProducer {
    public static void main(String[] args) {
        //1. 创建kafka 生产者的配置对象
        Properties properties = new Properties();
        String topicName="first";
        //2. 给kafka 配置对象添加配置信息：bootstrap.servers
        //连接集群 bootstrap.servers
        properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,"hsq01:9092");
        // key,value 序列化（必须）：key.serializer，value.serializer
        //指定对应的key和value的序列化类型 key.serializer
        properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
        //properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer .class.getName());//和上面语句等价，一般使用这种形式
        properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,StringSerializer.class.getName());
        //3. 创建 kafka 生产者对象
        KafkaProducer<String, String> kafkaProducer = new KafkaProducer<>(properties);
        //4. 调用 send 方法发送消息
        for (int i=0;i<5;i++){
            kafkaProducer.send(new ProducerRecord<>(topicName,"test\t"+i));
        }
        //5. 关闭资源
        kafkaProducer.close();
    }
}
{% endcodeblock %}

{% blockquote %}
测试结果
{% endblockquote %}

①在hsq02上开启 Kafka 消费者
{% codeblock lang:shell %}
kafka-console-consumer.sh --bootstrap-server hsq01:9092 --topic first
{% endcodeblock %}

②在 IDEA 中执行代码，观察hsq02控制台中是否接收到消息
![收到消息](2023-05-11-14-48-00.png)

#### 带回调函数的异步发送

回调函数会在 producer 收到 ack 时调用，为异步调用，该方法有两个参数，分别是元数据信息（ RecordMetadata 和 异常信息（ Exception ）），如果 Exception 为 null ，说明消息发送成功，如果 Exception 不为 null ，说明消息发送失败。

![带回调函数的异步发送流程](2023-05-11-14-55-16.png)
{% note warning modern %}
消息发送失败会自动重试，不需要我们在回调函数中手动重试。
{% endnote %}

{% blockquote %}
编写代码
{% endblockquote %}

{% codeblock lang:java %}
//4. 调用 send 方法发送消息
for (int i=0;i<5;i++){
    kafkaProducer.send(new ProducerRecord<>(topicName, "test\t" + i), new Callback() {
        @Override
        public void onCompletion(RecordMetadata recordMetadata, Exception e) {
            if (e==null){
                System.out.println("主题："+recordMetadata.topic()+"分区："+recordMetadata.partition());
            }
        }s
    });
}
{% endcodeblock %}

{% blockquote %}
测试结果
{% endblockquote %}

①在hsq02上开启 Kafka 消费者
②在IDEA 中执行代码，观察hsq02控制台中是否接收到消息
③在IDEA 控制台观察回调信息
![IDEA 控制台观察回调信息](2023-05-11-15-00-12.png)

### 同步发送API

![同步发送流程](2023-05-11-15-05-02.png)

{% note info modern %}
只需在异步发送的基础上，再调用一下get()方法即可，并添加异常处理即可。
{% endnote %}

{% codeblock lang:java mark:3 %}
//4. 调用 send 方法发送消息
for (int i=0;i<5;i++){
    kafkaProducer.send(new ProducerRecord<>(topicName,"test\t"+i)).get();
}
{% endcodeblock %}

{% note info modern %}
结果于表面并无区别
{% endnote %}

### 生产者分区

#### 分区好处

- **便于合理使用存储资源**，每个Partition在一个Broker上存储，可以把海量的数据按照分区切割成一块一块数据存储在多台Broker上。合理控制分区的任务，可以实现**负载均衡**的效果。
- **提高并行度**，生产者可以以分区为单位**发送数据**；消费者可以以分区为单位进行**消费数据**。

![分区](2023-05-11-15-14-30.png)

#### 生产者发送消息的分区策略

##### 默认的分区器DefaultPartitioner

- If a partition is specified in the record, use it
- If no partition is specified but a key is present choose a partition based on a hash of the key
- If no partition or key is present choose the sticky partition that changes when the batch is full.

![默认的分区器](2023-05-11-15-34-17.png)

{% tabs DefaultPartitioner %}
<!-- tab 测试一 -->
**将数据发往指定partition**的情况下，例如，将所有数据发往分区1 中。
{% codeblock lang:java mark:4 %}
//4. 调用 send 方法发送消息
for (int i=0;i<5;i++){
    // 指定数据发送到 1 号分区， key 为空 IDEA 中 ctrl + p 查看参数）
    kafkaProducer.send(new ProducerRecord<>(topicName,1,"","test\t" + i), new Callback() {
        @Override
        public void onCompletion(RecordMetadata recordMetadata, Exception e) {
            if (e==null){
                System.out.println("主题："+recordMetadata.topic()+"分区："+recordMetadata.partition());
            }
        }
    });
}
{% endcodeblock %}

![结果](2023-05-11-15-42-55.png)
<!-- endtab -->

<!-- tab 测试二 -->
**没有指明partition值但有key的情况下**，将 key 的 hash 值与 topic 的 partition 数进行取余得到 partition 值。
{% codeblock lang:java mark:4 %}
//4. 调用 send 方法发送消息
for (int i=0;i<5;i++){
    // 依次指定 key 值为 a,b,f ，数据 key 的 hash 值与 3 个分区求余，分别发往 1 、 2 、 0
    kafkaProducer.send(new ProducerRecord<>(topicName,"a","test\t" + i), new Callback() {
        @Override
        public void onCompletion(RecordMetadata recordMetadata, Exception e) {
            if (e==null){
                System.out.println("主题："+recordMetadata.topic()+"分区："+recordMetadata.partition());
            }
        }
    });
}
{% endcodeblock %}

- `key="a"`时，在控制台查看结果
{% codeblock lang:plaintext %}
主题：first分区：1
主题：first分区：1
主题：first分区：1
主题：first分区：1
主题：first分区：1
{% endcodeblock %}
- `key="b"`时，在控制台查看结果
{% codeblock lang:plaintext %}
主题：first分区：2
主题：first分区：2
主题：first分区：2
主题：first分区：2
主题：first分区：2
{% endcodeblock %}
- `key="f"`时，在控制台查看结果
{% codeblock lang:plaintext %}
主题：first分区：0
主题：first分区：0
主题：first分区：0
主题：first分区：0
主题：first分区：0
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

#### 自定义分区器

可以根据需求，重新实现分区器。

{% blockquote %}
需求
{% endblockquote %}

实现一个分区器实现，发送过来的数据中如果包含test，就发往0号分区，不包含test，就发往1号分区。

{% blockquote %}
编写代码
{% endblockquote %}

- 定义类实现Partitioner接口
- 重写partition方法

{% codeblock lang:java %}
package com.hsq.kafka.producer;

import org.apache.kafka.clients.producer.Partitioner;
import org.apache.kafka.common.Cluster;

import java.util.Map;

public class MyPartitioner implements Partitioner {
    //topic 主题
    //key 消息的 key
    //keyBytes 消息的 key 序列化后的字节数组
    //value 消息的 value
    //valueBytes 消息的 value 序列化后的字节数组
    //cluster 集群元数据可以查看分区信息
    @Override
    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
        // 获取消息
        String msgValue = value.toString();
        // 创建 partition
        int partition;
        // 判断消息是否包含test
        if(msgValue.contains("test")){
            partition = 0;
        }else {
            partition=1;
        }
        // 返回分区号
        return partition;
    }
    // 关闭资源
    @Override
    public void close() {
    }
    // 配置方法
    @Override
    public void configure(Map<String, ?> map) {
    }
}
{% endcodeblock %}

{% blockquote %}
使用分区器的方法 ，在生产者的配置中添加分 区器参数
{% endblockquote %}

{% codeblock lang:java %}
// 添加自定义分区器
properties.put(ProducerConfig.PARTITIONER_CLASS_CONFIG,MyPartitioner.class);
{% endcodeblock %}

### 生产经验——生产者如何提高吞吐量

![生产者如何提高吞吐量](2023-05-12-00-00-35.png)

{% codeblock lang:java 可添加入下配置项 %}
// RecordAccumulator：缓冲区大小，默认32M：buffer.memory
properties.put(ProducerConfig.BUFFER_MEMORY_CONFIG,33554432);
// batch.size：批次大小，默认16K
properties.put(ProducerConfig.BATCH_SIZE_CONFIG, 16384);
// linger.ms：等待时间，默认0
properties.put(ProducerConfig.LINGER_MS_CONFIG, 1);
// compression.type 压缩，默认 none ，可配置值 gzip 、 snappy 、lz4 和 zstd
properties.put(ProducerConfig.COMPRESSION_TYPE_CONFIG,"snappy");
{% endcodeblock %}

### 生产经验——数据可靠性

![ACK应答级别](2023-05-12-00-12-17.png)

{% note pink 'fas fa-question' modern %}
Leader收到数据，所有Follower都开始同步数据，但有一个Follower，因为某种故障，迟迟不能与Leader进行同步，那这个问题怎么解决呢？
{% endnote %}

{% note blue 'fas fa-comment' modern %}
**Leader维护了一个动态的in-sync replica set（ISR），意为和Leader保持同步的Follower+Leader集合(leader：0，isr:0,1,2)**。
如果Follower长时间未向Leader发送通信请求或同步数据，则该Follower将被踢出ISR。该时间阈值由**replica.lag.time.max.ms参数设定，默认30s**。例如2超时，(leader:0, isr:0,1)。
**这样就不用等长期联系不上或者已经故障的节点。**
{% endnote %}

数据可靠性分析：

如果分区副本设置为1个，或者ISR里应答的最小副本数量（min.insync.replicas 默认为1）设置为1，和ack=1的效果是一样的，仍然有丢数的风险`（leader：0，isr:0）`。

{% note info modern %}
**数据完全可靠条件= ACK级别设置为-1 + 分区副本大于等于2 + ISR里应答的最小副本数量大于等于2**
{% endnote %}

可靠性总结：

- acks=0，生产者发送过来数据就不管了，可靠性差，效率高；
- acks=1，生产者发送过来数据Leader应答，可靠性中等，效率中等；
- acks=-1，生产者发送过来数据Leader和ISR队列里面所有Follwer应答，可靠性高，效率低；在生产环境中，acks=0很少使用；acks=1，一般用于传输普通日志，允许丢个别数据；acks=-1，一般用于传输和钱相关的数据，对可靠性要求比较高的场景。

{% codeblock lang:java %}
// 设置 acks
properties.put(ProducerConfig.ACKS_CONFIG , "all");
// 重试次数 retries ，默认是 int 最大值， 2147483647
properties.put( ProducerConfig.RETRIES_CONFIG ,3);
{% endcodeblock %}

数据重复分析：

![数据重复分析](2023-05-12-00-55-41.png)

### 生产经验——数据去重

#### 数据传递语义

- 至少一次（At Least Once）=**ACK级别设置为-1 + 分区副本大于等于2 + ISR里应答的最小副本数量大于等于2**
- 最多一次（AtMost Once）= **ACK级别设置为0**
- 总结：
  - At Least Once可以保证数据不丢失，但是**不能保证数据不重复**
  - At Most Once可以保证数据不重复，但是**不能保证数据不丢失**
- 精确一次（Exactly Once）：对于一些非常重要的信息，比如和钱相关的数据，要求数据**既不能重复也不丢失**

{% note info modern %}
Kafka 0.11版本以后，引入了一项重大特性：**幂等性**和**事务**。
{% endnote %}

#### 幂等性

##### 幂等性原理

**幂等性**就是指Producer不论向Broker发送多少次重复数据，Broker端都只会持久化一条，保证了不重复。
{% note info modern %}
精确一次（Exactly Once） = 幂等性+ 至少一次（ ack=-1 + 分区副本数>=2 + ISR最小副本数量>=2）
{% endnote %}

**重复数据的判断标准**：具有`<PID, Partition, SeqNumber>`相同主键的消息提交时，Broker只会持久化一条。其中PID是Kafka每次重启都会分配一个新的；Partition 表示分区号；Sequence Number是单调自增的。
所以幂等性**只能保证的是在单分区单会话内不重复**。
![幂等性](2023-05-12-01-31-23.png)

##### 如何使用幂等性

开启参数`enable.idempotence`默认为`true`，`false`关闭。

#### 生产者事务

##### Kafka事务原理

{% note warning modern %}
开启事务，必须开启幂等性。
{% endnote %}
![Kafka事务原理](2023-05-12-01-34-07.png)

{% note info modern %}
幂等性不能跨多个分区运作，而事务可以弥补这个缺陷。
事务可以保证对多个分区写入操作的原子性（要么全部成功，要么全部失败）。
从生产者角度，通过事务，Kafka可以保证跨生产者会话的消息幂等发送，以及跨生产者会话的事务恢复
{% endnote %}

##### 如何开启事务

**Kafka 的事务一共有如下5 个API**
{% codeblock lang:java %}

{% endcodeblock %}

### 生产经验——数据有序

![数据有序](2023-05-12-01-36-40.png)

### 生产经验——数据乱序

1. kafka在1.x版本之前保证数据单分区有序，条件如下：
`max.in.flight.requests.per.connection=1`（不需要考虑是否开启幂等性）
2. kafka在1.x及以后版本保证数据单分区有序，条件如下：
    - 未开启幂等性
    `max.in.flight.requests.per.connection`需要设置为1
    - 开启幂等性
    `max.in.flight.requests.per.connection`需要设置小于等于5
    原因说明：因为在kafka1.x以后，启用幂等后，kafka服务端会缓存producer发来的最近5个request的元数据，故无论如何，都可以保证最近5个request的数据都是有序的。
![原因说明](2023-05-12-01-37-43.png)

## Kafka Broker

## Kafka消费者

### Kafka消费方式

![Kafka消费方式](2023-05-15-10-23-58.png)

- pull（拉）模式：consumer采用从broker中主动拉取数据。**Kafka采用这种方式**。
- push（推）模式：Kafka没有采用这种方式，因为由broker决定消息发送速率，很难适应所有消费者的消费速率。例如推送的速度是50m/s，Consumer1、Consumer2就来不及处理消息。

{% note info modern %}
pull模式不足之处是，如果Kafka没有数据，消费者可能会陷入循环中，一直返回空数据。
{% endnote %}

### Kafka消费者工作流程

#### 消费者总体工作流程

![消费者总体工作流程](2023-05-15-10-26-08.png)

#### 消费者组原理

Consumer Group（CG）：消费者组，由多个consumer组成。形成一个消费者组的条件，是所有消费者的groupid相同。

- **消费者组内每个消费者负责消费不同分区的数据，一个分区只能由一个组内消费者消费**。
- 如果向消费组中添加更多的消费者，**超过主题分区数量，则有一部分消费者就会闲置，不会接收任何消息**。
- **消费者组之间互不影响**。所有的消费者都属于某个消费者组，即消费者组是逻辑上的一个订阅者。

![消费者组](2023-05-15-10-29-34.png)
![消费者组](2023-05-15-10-32-26.png)

coordinator：辅助实现消费者组的初始化和分区的分配。
coordinator节点选择 = **groupid的hashcode值 % 50（ __consumer_offsets的分区数量）**
例如： groupid的hashcode值 = 1，1% 50 = 1，那么 __consumer_offsets 主题的1号分区，在哪个broker上，就选择这个节点的coordinator作为这个消费者组的老大。消费者组下的所有的消费者提交offset的时候就往这个分区去提交offset。
![消费者组初始化流程](2023-05-15-10-36-34.png)

![消费者组详细消费流程](2023-05-15-10-40-49.png)

#### 消费者重要参数

| 参数 | 描述 |
| ----- | ---- |
| `bootstrap.servers` | 向Kafka集群建立初始连接用到的host/port列表 |
| `key.deserializer`<br>`value.deserializer` | 指定接收消息的 key 和 value 的反序列化类型，一定要写全类名 |
| `group.id` | 标记消费者所属的消费者组 |
| `enable.auto.commit` | **默认值为true**，消费者会自动周期性地向服务器提交偏移量 |
| `auto.commit.interval.ms` |  如果设置了enable.auto.commit的值为 true， 则该值定义了消费者偏移量向 Kafka 提交的频率，默认**5s** |
| `auto.offset.reset` |  当Kafka中没有初始偏移量或当前偏移量在服务器中不存在（如，数据被删除了），该如何处理？<br>earliest：自动重置偏移量到最早的偏移量<br>**latest：默认，自动重置偏移量为最新的偏移量**<br>none：如果消费组原来的（previous）偏移量不存在，则向消费者抛异常<br>anything：向消费者抛异常 |
| `offsets.topic.num.partitions` | `__consumer_offsets`的分区数，**默认是50个分区** |
| `heartbeat.interval.ms` | Kafka 消费者和 coordinator 之间的心跳时间，默认3s。该条目的值必须小于`session.timeout.ms` ，也不应该高于`session.timeout.ms`的1/3。 |
| `session.timeout.ms` | Kafka 消费者和 coordinator 之间连接超时时间，默认45s。超过该值，该消费者被移除，消费者组执行再平衡 |
| `max.poll.interval.ms` |  消费者处理消息的最大时长，默认是 5 分钟。超过该值，该消费者被移除，消费者组执行再平衡|
| `fetch.min.bytes` | **默认1个字节**。消费者获取服务器端一批消息最小的字节数 |
| `fetch.max.wait.ms` | **默认500ms**。如果没有从服务器端获取到一批数据的最小字节数。该时间到，仍然会返回数据|
| `fetch.max.bytes` | **默认Default: 52428800（50 m）**。消费者获取服务器端一批消息最大的字节数。如果服务器端一批次的数据大于该值（50m）仍然可以拉取回来这批数据，因此，这不是一个绝对 最 大 值 。 一 批 次 的 大 小 受 **message.max.bytes （ broker config）** or **max.message.bytes （topic config）**影响 |
| `max.poll.records` | 一次 poll 拉取数据返回消息的最大条数，**默认是500条** |

### 消费者API

#### 独立消费者案例（订阅主题）

**需求：**创建一个独立消费者，消费first主题中数据。
![独立消费者（订阅主题）](2023-05-15-16-22-39.png)

{% note warning modern %}
在消费者API代码中必须配置消费者组id。命令行启动消费者不填写消费者组id会被自动填写随机的消费者组id。
{% endnote %}

{% blockquote %}
代码编写
{% endblockquote %}

创建包名：`com.hsq.kafka.consumer`
{% codeblock lang:java 导包 %}
package com.hsq.kafka.consumer;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Properties;
{% endcodeblock %}

{% codeblock lang:java %}
    public static void main(String[] args) {
        // 1.创建消费者的配置对象
        Properties properties = new Properties();
        // 2.给消费者配置对象添加参数
        properties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "hsq01:9092");
        // 配置序列化 必须
        properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        // 配置消费者组（组名任意起名） 必须
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "test");
        // 创建消费者对象
        KafkaConsumer<String, String> kafkaConsumer = new KafkaConsumer<String, String>(properties);
        // 注册要消费的主题（可以消费多个主题）
        ArrayList<String> topics = new ArrayList<>();
        topics.add("first");
        kafkaConsumer.subscribe(topics);
        // 拉取数据打印
        while (true) {
        // 设置 1s 中消费一批数据
            ConsumerRecords<String, String> consumerRecords = kafkaConsumer.poll(Duration.ofSeconds(1));
            // 打印消费到的数据
            for (ConsumerRecord<String, String> consumerRecord : consumerRecords) {
                System.out.println(consumerRecord);
            }
        }
    }
{% endcodeblock %}

{% blockquote %}
测试
{% endblockquote %}

1.在IDEA中执行消费者程序。
2.在Kafka集群控制台，创建Kafka生产者，并输入数据。
{% codeblock lang:shell %}
kafka-console-producer.sh --bootstrap-server hsq01:9092 --topic first
{% endcodeblock %}
![创建Kafka生产者](2023-05-15-16-48-10.png)
3.在IDEA控制台观察接收到的数据。
![收到数据](2023-05-15-16-49-16.png)

#### 独立消费者案例（订阅分区）

**需求：**创建一个独立消费者，消费`first`主题`0`号分区的数据。
![独立消费者案例（订阅分区）](2023-05-15-16-51-07.png)

{% blockquote %}
代码实现
{% endblockquote %}

{% codeblock lang:java %}
import org.apache.kafka.common.TopicPartition;

        // 消费某个主题的某个分区数据
        ArrayList<TopicPartition> topicPartitions = new ArrayList<>();
        topicPartitions.add(new TopicPartition("first", 0));
        kafkaConsumer.assign(topicPartitions);
        // 注册要消费的主题（可以消费多个主题）
//        ArrayList<String> topics = new ArrayList<>();
//        topics.add("first");
//        kafkaConsumer.subscribe(topics);
{% endcodeblock %}

{% blockquote %}
测试
{% endblockquote %}

1.在IDEA中执行消费者程序。
2.在 IDEA 中执行生产者程序`CustomProducerCallbackPartitions()`在控制台观察生成几个0号分区的数据和几个其他区数据。
3.在 IDEA 控制台，观察接收到的数据，只能消费到 0 号分区数据表示正确。

#### 消费者组案例

**需求：**测试同一个主题的分区数据只能由一个消费者组中的一个消费。
![消费者组案例](2023-05-15-17-31-27.png)

复制一份基础消费者(CustomConsumer)的代码(CustomConsumer1)，在 IDEA 中同时启动，即可启动同一个消费者组中的两个消费者。
启动代码中的生产者发送消息(3个不同分区)，在 IDEA 控制台即可看到两个消费者在消费不同分区的数据
如果重新发送到一个全新的主题中，由于默认创建的主题分区数为 1，可以看到只能有一个消费者消费到数据。

### 生产经验——分区的分配以及再平衡

1. 一个consumer group中有多个consumer组成，一个 topic有多个partition组成，现在的问题是，**到底由哪个consumer来消费哪个partition的数据**。
2. Kafka有四种主流的分区分配策略： `Range`、`RoundRobin`、`Sticky`、`CooperativeSticky`。
可以通过配置参数`partition.assignment.strategy`，修改分区的分配策略。默认策略是`Range + CooperativeSticky`。Kafka可以同时使用多个分区分配策略。

![分区的分配](2023-05-15-21-19-36.png)

| 参数 | 描述 |
| ---- | ---- |
| `heartbeat.interval.ms` | Kafka 消费者和 coordinator 之间的心跳时间，**默认3s**。该条目的值必须小于`session.timeout.ms`，也不应该高于`session.timeout.ms`的1/3 |
| `session.timeout.ms` | Kafka 消费者和 coordinator 之间连接超时时间，**默认45s**。超过该值，该消费者被移除，消费者组执行再平衡 |
| `max.poll.interval.ms` | 消费者处理消息的最大时长，**默认是5分钟**。超过该值，该消费者被移除，消费者组执行再平衡 |
| `partition.assignment.strategy` | 消费者分分配策略，默认策略是`Range + CooperativeSticky`。Kafka 可以同时使用多个分区分配策略。可以选择的策略包括 ： Range 、 RoundRobin 、 Sticky 、CooperativeSticky |

#### Range以及再平衡

{% blockquote %}
Range分区策略原理
{% endblockquote %}

![分区分配策略之Range](2023-05-15-21-30-11.png)

- Range 是对每个 topic 而言的。
首先对同一个 topic 里面的**分区按照序号进行排序**，并对**消费者按照字母顺序进行排序**。
假如现在有 7 个分区，3 个消费者，排序后的分区将会是0,1,2,3,4,5,6；消费者排序完之后将会是C0,C1,C2。

- 通过**partitions数/consumer数**来决定每个消费者应该消费几个分区。**如果除不尽，那么前面几个消费者将会多消费1个分区。**
例如，7/3 = 2 余 1 ，除不尽，那么消费者C0便会多消费一个分区。 8/3=2余2，除不尽，那么C0和C1分别多消费一个。

- **注意**：如果只是针对1个topic而言，C0消费者多消费1个分区影响不是很大。但是如果有N多个topic，那么针对每个topic，消费者C0都将多消费1个分区，topic越多，C0消费的分区会比其他消费者明显多消费N个分区。
**容易产生数据倾斜！**

{% blockquote %}
Range分区分配策略案例
{% endblockquote %}

1.修改主题`first`为7个分区
{% codeblock lang:shell %}
kafka-topics.sh --bootstrap-server hsq01:9092 --alter --topic first --partitions 7
{% endcodeblock %}

2.复制`CustomConsumer`类，这样可以由三个消费者`CustomConsumer`、`CustomConsumer1`、`CustomConsumer2` 组成消费者组，组名都为“test”，同时启动 3 个消费者。

3.启动`CustomProducerCallbackPartitions`生产者，发送500条消息，随机发送到不同的分区。
{% codeblock lang:java mark:2,4,12 %}
        for (int i=0;i<500;i++){
            int num=(int)(Math.random()*7);
            // 指定数据发送到随机分区
            kafkaProducer.send(new ProducerRecord<>(topicName,num,"","test\t" + i), new Callback() {
                @Override
                public void onCompletion(RecordMetadata recordMetadata, Exception e) {
                    if (e==null){
                        System.out.println("主题："+recordMetadata.topic()+"分区："+recordMetadata.partition());
                    }
                }
            });
            Thread.sleep(2);
        }
{% endcodeblock %}

4.观察3个消费者分别消费哪些分区的数据。
![消费0，1，2](2023-05-15-22-05-07.png)
![消费3，4](2023-05-15-22-06-09.png)
![消费5，6](2023-05-15-22-05-50.png)

{% blockquote %}
Range分区分配再平衡案例
{% endblockquote %}

**1.停止掉 0 号消费者，快速重新发送消息观看结果（45s以内，越快越好）。**
2号消费者：消费 3、4 号分区数据。
1号消费者：消费 5、6 号分区数据。
0号消费者的任务会**整体被分配**到 1 号消费者或者 2 号消费者。

{% note info modern %}
0号消费者挂掉后，消费者组需要按照超时时间 45s 来判断它是否退出，所以需要等待，时间到了 45s 后，判断它真的退出就会把任务分配给其他 broker 执行。
{% endnote %}

**2.再次重新发送消息观看结果（45s 以后）。**
1号消费者：消费 0、1、2、3 号分区数据。
2号消费者：消费 4、5、6 号分区数据。

{% note info modern %}
消费者 0 已经被踢出消费者组，所以重新按照 range 方式分配
{% endnote %}

#### RoundRobin以及再平衡

{% blockquote %}
RoundRobin分区策略原理
{% endblockquote %}

![分区分配策略之RoundRobin](2023-05-15-22-18-04.png)

- RoundRobin 针对集群中**所有Topic而言**。
- RoundRobin 轮询分区策略，是**把所有的partition和所有的consumer都列出来**，然后**按照hashcode进行排序**，最后通过**轮询算法**来分配partition 给到各个消费者。

{% blockquote %}
RoundRobin分区分配策略案例
{% endblockquote %}

1.依次在`CustomConsumer`、`CustomConsumer1`、`CustomConsumer2` 三个消费者代码中修改分区分配策略为**RoundRobin**，同时消费者组id改为`test1`。
{% codeblock lang:java %}
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "test1");
        // 修改分区分配策略
        properties.put(ConsumerConfig.PARTITION_ASSIGNMENT_STRATEGY_CONFIG, "org.apache.kafka.clients.consumer.RoundRobinAssignor");
{% endcodeblock %}

2.重启 3 个消费者，重复发送消息的步骤，观察分区结果。
![消费0，3，6](2023-05-15-22-27-51.png)
![消费1，4](2023-05-15-22-28-20.png)
![消费2，5](2023-05-15-22-29-06.png)

{% blockquote %}
RoundRobin分区分配再平衡案例
{% endblockquote %}

**1.停止掉0号消费者，快速重新发送消息观看结果（45s 以内，越快越好）。**
1 号消费者：消费 1、4 号分区数据
2 号消费者：消费 2、5 号分区数据
0 号消费者的任务会**按照 RoundRobin 的方式，把数据轮询分成 `0 、6` 和 `3` 号分区数据，分别**由 1 号消费者或者 2 号消费者消费。

{% note info modern %}
0 号消费者挂掉后，消费者组需要按照超时时间 45s 来判断它是否退出，所以需要等待，时间到了 45s 后，判断它真的退出就会把任务分配给其他 broker 执行。
{% endnote %}

**2.再次重新发送消息观看结果（45s 以后）。**
1 号消费者：消费 0、2、4、6 号分区数据
2 号消费者：消费 1、3、5 号分区数据

{% note info modern %}
消费者 0 已经被踢出消费者组，所以重新按照 RoundRobin 方式分配
{% endnote %}

#### Sticky以及再平衡

**粘性分区定义：**可以理解为分配的结果带有“粘性的”。即在执行一次新的分配之前，考虑上一次分配的结果，尽量少的调整分配的变动，可以节省大量的开销。

粘性分区是 Kafka 从 0.11.x 版本开始引入这种分配策略，**首先会尽量均衡的放置分区到消费者上面**，在出现同一消费者组内消费者出现问题的时候，会**尽量保持原有分配的分区不变化**。

{% blockquote %}
Sticky分区分配策略案例
{% endblockquote %}

1.依次在`CustomConsumer`、`CustomConsumer1`、`CustomConsumer2` 三个消费者代码中修改分区分配策略为**Sticky**，同时消费者组id改为`test2`。
{% codeblock lang:java %}
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "test2");
        // 修改分区分配策略
        ArrayList<String> strategies = new ArrayList<>();
        strategies.add("org.apache.kafka.clients.consumer.StickyAssignor");
        properties.put(ConsumerConfig.PARTITION_ASSIGNMENT_STRATEGY_CONFIG, strategies);
{% endcodeblock %}

2.重启 3 个消费者，重复发送消息的步骤，观察分区结果。
![消费1，0](2023-05-15-23-42-10.png)
![消费4，5，6](2023-05-15-23-42-47.png)
![消费2，3](2023-05-15-23-43-15.png)

{% note warning modern %}
有点像随机的Range分区分配策略，但是是均匀分配，哪个消费者具体消费哪个分区不确定，这里仅仅是一次实验结果
{% endnote %}

{% blockquote %}
Sticky分区分配再平衡案例
{% endblockquote %}

**1.停止掉 0 号消费者，快速重新发送消息观看结果（45s 以内，越快越好）。**
1 号消费者：消费 4、5、6 号分区数据。
2 号消费者：消费 2、3 号分区数据。
0 号消费者的任务会**按照粘性规则，尽可能均衡的随机分成 0 和 1 号分区数据，分别由** 1 号消费者或者 2 号消费者消费。

{% note info modern %}
0 号消费者挂掉后，消费者组需要按照超时时间 45s 来判断它是否退出，所以需要等待，时间到了 45s 后，判断它真的退出就会把任务分配给其他 broker 执行。
{% endnote %}

**2.再次重新发送消息观看结果（45s 以后）。**
1 号消费者：消费 4、5、6、1 号分区数据。
2 号消费者：消费 2、3、0 号分区数据。

{% note info modern %}
消费者 0 已经被踢出消费者组，所以重新按照粘性方式分配。
{% endnote %}

### offset位移

#### offset的默认维护位置

![offset的默认维护位置](2023-05-15-23-56-53.png)

__consumer_offsets 主题里面采用 key 和 value 的方式存储数据。key 是 group.id+topic+分区号，value 就是当前 offset 的值。每隔一段时间，kafka 内部会对这个 topic 进行compact，也就是每个 `group.id+topic+分区号` 就保留最新数据。

{% label 消费offset案例 pink %}

0) **思想：**`__consumer_offsets` 为 Kafka 中的 topic，那就可以通过消费者进行消费。

1) 官网中`exclude.internal.topics`默认为`true`,是这样描述的(It is always possible to explicitly subscribe to an internal topic.)也就是**始终可以显式订阅内部主题。**

2) 查看消费者消费主题`__consumer_offsets`
{% codeblock lang:shell %}
kafka-console-consumer.sh --topic __consumer_offsets --bootstrap-server hsq01:9092 --consumer.config config/consumer.properties --formatter"kafka.coordinator.group.GroupMetadataManager\$OffsetsMessageFormatter" --from-beginning
{% endcodeblock %}
![可以查看到之前的消费情况](2023-05-16-00-35-28.png)

#### 自动提交offset

为了使我们能够专注于自己的业务逻辑，Kafka提供了自动提交offset的功能。
自动提交offset的相关参数：

- `enable.auto.commit`：是否开启自动提交offset功能消，费者会自动周期性地向服务器提交偏移量，默认是true
- `auto.commit.interval.ms`：定义了消费者偏移量向Kafka提交的频率，默认是5s

![自动提交offset](2023-05-16-00-40-30.png)

{% codeblock lang:java %}
        // 是否自动提交 offset
        properties.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, true);
        // 提交 offset 的时间周期 1 000 ms ，默认 5s
        properties.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, 1000);
{% endcodeblock %}

#### 手动提交offset

虽然自动提交offset十分简单便利，但由于其是基于时间提交的，开发人员难以把握offset提交的时机。因此Kafka还提供了手动提交offset的API。
手动提交offset的方法有两种：分别是**commitSync（同步提交）**和**commitAsync（异步提交）**。两者的相同点是，都会**将本次提交的一批数据最高的偏移量提交**；不同点是，**同步提交阻塞当前线程**，一直到提交成功，并且会自动失败重试（由不可控因素导致，也会出现提交失败）；而**异步提交则没有失败重试机制，故有可能提交失败**。

- commitSync（同步提交）：**必须等待offset提交完毕，再去消费下一批数据**
- commitAsync（异步提交） ：**发送完提交offset请求后，就开始消费下一批数据了**

![手动提交offset](2023-05-16-00-51-51.png)

{% tabs CustomConsumerByHand %}
<!-- tab commitSync（同步提交） -->
由于同步提交offset 有失败重试机制，故更加可靠，但是由于一直等待提交结果，提交的效率比较低。

{% codeblock lang:java mark:2,13 %}
        // 是否自动提交 offset
        properties.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);

        // 拉取数据打印
        while (true) {
        // 设置 1s 中消费一批数据
            ConsumerRecords<String, String> consumerRecords = kafkaConsumer.poll(Duration.ofSeconds(1));
            // 打印消费到的数据
            for (ConsumerRecord<String, String> consumerRecord : consumerRecords) {
                System.out.println(consumerRecord);
            }
            // 同步提交 offset
            kafkaConsumer.commitSync();
        }
{% endcodeblock %}
<!-- endtab -->

<!-- tab commitAsync（异步提交） -->
虽然同步提交offset 更可靠一些，但是由于其会阻塞当前线程，直到提交成功。因此吞吐量会受到很大的影响。因此更多的情况下，会选用异步提交 offset 的方式。

{% codeblock lang:java mark:2,13 %}
        // 是否自动提交 offset
        properties.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);

        // 拉取数据打印
        while (true) {
        // 设置 1s 中消费一批数据
            ConsumerRecords<String, String> consumerRecords = kafkaConsumer.poll(Duration.ofSeconds(1));
            // 打印消费到的数据
            for (ConsumerRecord<String, String> consumerRecord : consumerRecords) {
                System.out.println(consumerRecord);
            }
            // 同步提交 offset
            kafkaConsumer.commitAsync();
        }
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

#### 指定Offset消费

`auto.offset.reset` = `earliest | latest | none` **默认是 latest**。
当 Kafka 中没有初始偏移量（消费者组第一次消费）或服务器上不再存在当前偏移量时（例如该数据已被删除），该怎么办？

![偏移量](2023-05-16-14-09-10.png)

1. `earliest`：自动将偏移量重置为最早的偏移量，`--from-beginning`。
2. `latest`（默认值）：自动将偏移量重置为最新偏移量。
3. `none`：如果未找到消费者组的先前偏移量，则向消费者抛出异常。
4. 任意指定 offset 位移开始消费

{% codeblock lang:java 导包 %}
package com.hsq.kafka.consumer;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.StringDeserializer;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;
{% endcodeblock %}

{% codeblock lang:java mark:18-27 %}
public class CustomConsumerSeek {
    public static void main(String[] args) {
        // 1.创建消费者的配置对象
        Properties properties = new Properties();
        // 2.给消费者配置对象添加参数
        properties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "hsq01:9092");
        // 配置序列化 必须
        properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        // 配置消费者组（组名任意起名） 必须
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "demo");
        // 创建消费者对象
        KafkaConsumer<String, String> kafkaConsumer = new KafkaConsumer<>(properties);
        // 注册要消费的主题（可以消费多个主题）
        ArrayList<String> topics = new ArrayList<>();
        topics.add("first");
        kafkaConsumer.subscribe(topics);
        Set<TopicPartition> assignment= new HashSet<>();
        while (assignment.size() == 0) {
            kafkaConsumer.poll(Duration.ofSeconds(1));
            // 获取消费者分区分配信息（有了分区分配信息才能开始消费）
            assignment = kafkaConsumer.assignment();
        }
        // 遍历所有分区，并指定 offset 从 700 的位置开始消费
        for (TopicPartition tp: assignment) {
            kafkaConsumer.seek(tp, 700);
        }
        // 拉取数据打印
        while (true) {
        // 设置 1s 中消费一批数据
            ConsumerRecords<String, String> consumerRecords = kafkaConsumer.poll(Duration.ofSeconds(1));
            // 打印消费到的数据
            for (ConsumerRecord<String, String> consumerRecord : consumerRecords) {
                System.out.println(consumerRecord);
            }
        }
    }
}
{% endcodeblock %}

{% note warning modern %}
每次执行完，需要修改消费者组名
{% endnote %}

#### 指定时间消费

**需求**：在生产环境中，会遇到最近消费的几个小时数据异常，想重新按照时间消费。例如要求按照时间消费前一天的数据，怎么处理？

{% codeblock lang:java 导包 %}
package com.hsq.kafka.consumer;

import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.StringDeserializer;

import java.time.Duration;
import java.util.*;
{% endcodeblock %}

{% codeblock lang:java mark:18-38 %}
public class CustomConsumerForTime {
    public static void main(String[] args) {
        // 1.创建消费者的配置对象
        Properties properties = new Properties();
        // 2.给消费者配置对象添加参数
        properties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "hsq01:9092");
        // 配置序列化 必须
        properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        // 配置消费者组（组名任意起名） 必须
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "demo1");
        // 创建消费者对象
        KafkaConsumer<String, String> kafkaConsumer = new KafkaConsumer<>(properties);
        // 注册要消费的主题（可以消费多个主题）
        ArrayList<String> topics = new ArrayList<>();
        topics.add("first");
        kafkaConsumer.subscribe(topics);
        Set<TopicPartition> assignment= new HashSet<>();
        while (assignment.size() == 0) {
            kafkaConsumer.poll(Duration.ofSeconds(1));
            // 获取消费者分区分配信息（有了分区分配信息才能开始消费）
            assignment = kafkaConsumer.assignment();
        }
        HashMap<TopicPartition, Long> timestampToSearch = new HashMap<>();
        // 封装集合存储，每个分区对应一天前的数据
        for (TopicPartition topicPartition : assignment) {
            timestampToSearch.put(topicPartition, System.currentTimeMillis() - 1 * 24 * 3600 * 1000);
        }
        // 获取从 1 天前开始消费的每个分区的 offset
        Map<TopicPartition, OffsetAndTimestamp> offsets = kafkaConsumer.offsetsForTimes(timestampToSearch);
        // 遍历每个分区，对每个分区设置消费时间。
        for (TopicPartition topicPartition: assignment) {
            OffsetAndTimestamp offsetAndTimestamp = offsets.get(topicPartition);
            // 根据时间指定开始消费的位置
            if (offsetAndTimestamp != null) {
                kafkaConsumer.seek(topicPartition, offsetAndTimestamp.offset());
            }
        }
        // 3.（消费）拉取数据打印
        while (true) {
        // 设置 1s 中消费一批数据
            ConsumerRecords<String, String> consumerRecords = kafkaConsumer.poll(Duration.ofSeconds(1));
            // 打印消费到的数据
            for (ConsumerRecord<String, String> consumerRecord : consumerRecords) {
                System.out.println(consumerRecord);
            }
        }
    }
}
{% endcodeblock %}

#### 漏消费和重复消费

**重复消费：**已经消费了数据，但是offset没提交。
**漏消费：**先提交offset后消费，有可能会造成数据的漏消费。

{% tabs consumerProblem %}
<!-- tab 重复消费 -->
自动提交offset引起。

![重复消费](2023-05-16-14-43-23.png)
<!-- endtab -->

<!-- tab 漏消费 -->
设置offset为手动提交，当offset被提交时，数据还在内存中未落盘，此时刚好消费者线程被kill掉，那么offset已经提交，但是数据未处理，导致这部分内存中的数据丢失。

![漏消费](2023-05-16-14-44-29.png)
<!-- endtab -->
{% endtabs %}

思考：怎么能做到既不漏消费也不重复消费呢？详看消费者事务

### 生产经验——消费者事务

如果想完成Consumer端的精准一次性消费，那么需要**Kafka消费端将消费过程和提交offset过程做原子绑定** 。此时我们需要将 Kafka 的 offset 保存到支持事务的自定义介质（比如MySQL）。
![消费者事务](2023-05-16-14-47-35.png)

### 生产经验——数据积压（消费者如何提高吞吐量）

1. 如果是Kafka消费能力不足，则可以考虑增加Topic的分区数，并且同时提升消费组的消费者数量，**消费者数=分区数**。（两者缺一不可）
2. 如果是下游的数据处理不及时：**提高每批次拉取的数量**。批次拉取数据过少（拉取数据/处理时间 < 生产速度），使处理的数据小于生产的数据，也会造成数据积压。

![消费者如何提高吞吐量](2023-05-16-14-50-33.png)

| 参数名称 | 描述 |
| ---- | ------ |
| `fetch.max.bytes` | 默认**Default: 52428800（50 m）**。消费者获取服务器端一批消息最大的字节数。如果服务器端一批次的数据大于该值（50m）仍然可以拉取回来这批数据，因此，这不是一个绝对最大值。一批次的大小受`message.max.bytes`（broker config）or `max.message.bytes`（topic config）影响 |
| `max.poll.records` | 一次poll 拉取数据返回消息的最大条数，**默认是 500 条** |

## Kafka-Eagle监控

Kafka-Eagle 框架可以监控 Kafka 集群的整体运行情况，在生产环境中经常使用。

### MySQL环境准备

Kafka-Eagle 的安装依赖于 MySQL，MySQL 主要用来存储可视化展示的数据。

### Kafka环境准备

1.Kafka集群处于关闭状态

2.修改`$KAFKA_HOME/bin/kafka-server-start.sh`
{% codeblock lang:shell %}
vi $KAFKA_HOME/bin/kafka-server-start.sh
{% endcodeblock %}

{% codeblock lang:sh 找到如下部分 %}
if [ "x$KAFKA_HEAP_OPTS" = "x" ]; then
    export KAFKA_HEAP_OPTS="-Xmx1G -Xms1G"
fi
{% endcodeblock %}

{% codeblock lang:shell 修改为 %}
if [ "x$KAFKA_HEAP_OPTS" = "x" ]; then
    export KAFKA_HEAP_OPTS="-server -Xms2G -Xmx2G -XX:PermSize=128m -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:ParallelGCThreads=8 -XX:ConcGCThreads=5 -XX:InitiatingHeapOccupancyPercent=70"
    export JMX_PORT="9999"
    #export KAFKA_HEAP_OPTS="-Xmx1G -Xms1G"
fi
{% endcodeblock %}

3.分发到其他节点
{% codeblock lang:sh %}
for i in {2..3}; do scp -r /mysoft/kafka_2.12-3.4.0/bin/kafka-server-start.sh hsq0$i:/mysoft/kafka_2.12-3.4.0/bin/kafka-server-start.sh;done
{% endcodeblock %}

### Kafka-Eagle安装

#### 下载Kafka-Eagle并解压

从[Kafka-Eagle](https://www.kafka-eagle.org/)官网下载好安装包

版本：3.0.1

{% codeblock lang:shell %}
tar -zxvf kafka-eagle-bin-3.0.1.tar.gz -C /mysoft/
cd kafka-eagle-bin-3.0.1/
tar -zxvf efak-web-3.0.1-bin.tar.gz -C /mysoft/
{% endcodeblock %}

#### 配置Kafka-Eagle环境变量

{% codeblock lang:shell vi /etc/profile %}
#Kafka-Eagle enviroment variables
export KE_HOME=/mysoft/efak-web-3.0.1/
export PATH=$PATH:$KE_HOME/bin
{% endcodeblock %}

{% codeblock lang:shell 使环境变量生效 %}
source /etc/profile
{% endcodeblock %}

#### 修改配置文件`system-config.properties`

{% codeblock lang:shell %}
cd $KE_HOME
cd config/
vi system-config.properties
{% endcodeblock %}

{% codeblock lang:sh mark:5,6,25,30,34,95-98 %}
######################################
#multi zookeeper & kafka cluster list
#Settings prefixed with 'kafka.eagle.' will be deprecated, use 'efak.'instead
#####################################
efak.zk.cluster.alias=cluster1
cluster1.zk.list=hsq01:2181,hsq02:2181,hsq03:2181/kafka
######################################
#zookeeper enable acl
######################################
cluster1.zk.acl.enable=false
cluster1.zk.acl.schema=digest
cluster1.zk.acl.username=test
cluster1.zk.acl.password=test123
######################################
#broker size online list
######################################
cluster1.efak.broker.size=20
######################################
#zk client thread limit
######################################
kafka.zk.limit.size=32
######################################
#EFAK webui port
######################################
efak.webui.port=8048
######################################
#kafka jmx acl and ssl authenticate
######################################
cluster1.efak.jmx.acl=false
cluster1.efak.jmx.user=keadmin
cluster1.efak.jmx.password=keadmin123
cluster1.efak.jmx.ssl=false
cluster1.efak.jmx.truststore.location=/data/ssl/certificates/kafka.truststore
cluster1.efak.jmx.truststore.password=ke123456
######################################
#kafka offset storage
######################################
#offset 保存在 kafka
cluster1.efak.offset.storage=kafka
######################################
#kafka jmx uri
######################################
cluster1.efak.jmx.uri=service:jmx:rmi:///jndi/rmi://%s/jmxrmi
######################################
#kafka metrics, 15 days by default
######################################
efak.metrics.charts=true
efak.metrics.retain=15
######################################
#kafka sql topic records max
######################################
efak.sql.topic.records.max=5000
efak.sql.topic.preview.records.max=10
######################################
#delete kafka topic token
######################################
efak.topic.token=keadmin
######################################
#kafka sasl authenticate
######################################
cluster1.efak.sasl.enable=false
cluster1.efak.sasl.protocol=SASL_PLAINTEXT
cluster1.efak.sasl.mechanism=SCRAM-SHA-256
cluster1.efak.sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="kafka" password="kafka-eagle";
cluster1.efak.sasl.client.id=
cluster1.efak.blacklist.topics=
cluster1.efak.sasl.cgroup.enable=false
cluster1.efak.sasl.cgroup.topics=
cluster2.efak.sasl.enable=false
cluster2.efak.sasl.protocol=SASL_PLAINTEXT
cluster2.efak.sasl.mechanism=PLAIN
cluster2.efak.sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="kafka" password="kafka-eagle";
cluster2.efak.sasl.client.id=
cluster2.efak.blacklist.topics=
cluster2.efak.sasl.cgroup.enable=false
cluster2.efak.sasl.cgroup.topics=
######################################
#kafka ssl authenticate
######################################
cluster3.efak.ssl.enable=false
cluster3.efak.ssl.protocol=SSL
cluster3.efak.ssl.truststore.location=
cluster3.efak.ssl.truststore.password=
cluster3.efak.ssl.keystore.location=
cluster3.efak.ssl.keystore.password=
cluster3.efak.ssl.key.password=
cluster3.efak.ssl.endpoint.identification.algorithm=https
cluster3.efak.blacklist.topics=
cluster3.efak.ssl.cgroup.enable=false
cluster3.efak.ssl.cgroup.topics=
######################################
#kafka sqlite jdbc driver address
######################################
#配置 mysql 连接
efak.driver=com.mysql.jdbc.Driver
efak.url=jdbc:mysql://hsq01:3306/ke?useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull
efak.username=root
efak.password=hadoop #(mysql密码)
######################################
#kafka mysql jdbc driver address
######################################
#efak.driver=com.mysql.cj.jdbc.Driver
#efak.url=jdbc:mysql://127.0.0.1:3306/ke?useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull
#efak.username=root
#efak.password=123456
{% endcodeblock %}

#### 启动Kafka-Eagle

{% note warning modern %}
启动之前需要先启动 **Zookeeper集群** 以及 **Kafka集群**
{% endnote %}

{% codeblock lang:shell %}
ke.sh start
{% endcodeblock %}

![成功启动](2023-05-16-16-30-03.png)

#### 停止Kafka-Eagle

{% codeblock lang:shell %}
ke.sh stop
{% endcodeblock %}

### Kafka-Eagle页面操作

#### 登录页面查看监控数据

使用如下端口号进行查看[http://hsq01:8048](http://hsq01:8048)
![登录](2023-05-16-16-15-05.png)
![http://hsq01:8048/tv](2023-05-16-16-12-10.png)
![dashboard](2023-05-16-16-14-19.png)

## Kafka-Kraft模式

### Kafka-Kraft架构

![Kafka-Kraft架构](2023-05-16-08-40-00.png)

左图为 Kafka 现有架构，元数据在 zookeeper 中，运行时动态选举 controller，由 controller 进行 Kafka 集群管理。右图为 kraft 模式架构（实验性），不再依赖 zookeeper 集群，而是用三台 controller 节点代替 zookeeper，元数据保存在 controller 中，由 controller 直接进行 Kafka 集群管理。
这样做的好处有以下几个：

- Kafka 不再依赖外部框架，而是能够独立运行；
- controller 管理集群时，不再需要从 zookeeper 中先读取数据，集群性能上升；
- 由于不依赖 zookeeper，集群扩展时不再受到 zookeeper 读写能力限制；
- controller 不再动态选举，而是由配置文件规定。这样我们可以有针对性的加强 controller 节点的配置，而不是像以前一样对随机 controller 节点的高负载束手无策。

### Kafka-Kraft集群部署

**1.再次解压一份 kafka 安装包**
{% note warning modern %}
第一次解压kafka安装包没有更改目录名的需要先更改(`mv kafka_2.12-3.4.0/ tempname`)，然后（**第二次解压重名后**）再改回去(`mv tempname/ kafka_2.12-3.4.0`)，不然会覆盖之前kafka目录，需要特别注意！！！
{% endnote %}

{% codeblock lang:shell %}
tar -zxvf kafka_2.12-3.4.0.tgz -C /mysoft/
{% endcodeblock %}

**2.重命名为 `kafka2`**
{% codeblock lang:shell %}
cd /mysoft/
mv kafka_2.12-3.4.0/ kafka2
{% endcodeblock %}

**3.配置 `server.properties`**
{% codeblock lang:shell %}
vi /mysoft/kafka2/config/kraft/server.properties
{% endcodeblock %}

{% codeblock lang:sh mark:2,4,6,12,18 %}
#kafka 的角色（controller 相当于主机、broker 节点相当于从机，主机类似 zk 功能）
process.roles=broker, controller
#节点 ID
node.id=1
#全 Controller 列表
controller.quorum.voters=1@hsq01:9093,2@hsq02:9093,3@hsq03:9093
#不同服务器绑定的端口
listeners=PLAINTEXT://:9092,CONTROLLER://:9093
#broker 服务协议别名
inter.broker.listener.name=PLAINTEXT
#broker 对外暴露的地址
advertised.Listeners=PLAINTEXT://hsq01:9092
#controller 服务协议别名
controller.listener.names=CONTROLLER
#协议别名到安全协议的映射
listener.security.protocol.map=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,SSL:SSL,SASL_PLAINTEXT:SASL_PLAINTEXT,SASL_SSL:SASL_SSL
#kafka 数据存储目录
log.dirs=/mysoft/kafka2/data
{% endcodeblock %}

**4.分发`kafka2`**
{% codeblock lang:shell %}
for i in {2..3}; do scp -r /mysoft/kafka2/ hsq0$i:/mysoft/;done
{% endcodeblock %}

**5.修改另外两台虚拟机/kraft/目录下`server.properties`文件**

- 02虚拟机`node.id=2`(值需要和`controller.quorum.voters`对应)
- 03虚拟机`node.id=3`
- 修改相应的`advertised.Listeners`地址

**6.初始化集群数据目录**
①首先生成存储目录唯一ID。
{% codeblock lang:shell %}
cd /mysoft/kafka2/
bin/kafka-storage.sh random-uuid
#生成的ID
PGJfeKfaSC62jnDsnFV6VQ
{% endcodeblock %}

②用该ID格式化kafka存储目录（**三台节点**）。
{% codeblock lang:shell %}
bin/kafka-storage.sh format -t PGJfeKfaSC62jnDsnFV6VQ -c /mysoft/kafka2/config/kraft/server.properties
{% endcodeblock %}
![用该ID格式化kafka存储目录](2023-05-16-09-41-56.png)

**7.启动kafka集群（三台节点）**
{% codeblock lang:shell %}
bin/kafka-server-start.sh -daemon config/kraft/server.properties
{% endcodeblock %}

**8.停止kafka集群**
{% codeblock lang:shell %}
bin/kafka-server-stop.sh
{% endcodeblock %}

### Kafka-Kraft集群启动停止脚本

**(1) 在虚拟机`hsq01`的目录`/usr/local/bin/`下新建`kf2.sh`脚本文件**
{% codeblock lang:shell %}
vi /usr/local/bin/kf2.sh
{% endcodeblock %}

{% codeblock lang:sh %}
#! /bin/bash

case $1 in
"start"){
    for i in hsq01 hsq02 hsq03
    do
        tput setaf 5
        echo "============ start $i Kafka-Kraft集群 ============"
        tput setaf 9
        ssh $i "source /etc/profile ; /mysoft/kafka2/bin/kafka-server-start.sh -daemon /mysoft/kafka2/config/kraft/server.properties"
    done
};;
"stop"){
    for i in hsq01 hsq02 hsq03
    do
        tput setaf 1
        echo "============ stop $i Kafka-Kraft集群 ============"
        tput setaf 9
        ssh $i "source /etc/profile ; /mysoft/kafka2/bin/kafka-server-stop.sh"
    done
};;
esac
{% endcodeblock %}

**(2)为`kf2.sh`脚本添加执行权限**
{% codeblock lang:shell %}
cd /usr/local/bin/
chmod u+x kf2.sh
{% endcodeblock %}

**(3)启动集群命令**
{% codeblock lang:shell %}
kf2.sh start
{% endcodeblock %}

**(4)关闭集群命令**
{% codeblock lang:shell %}
kf2.sh stop
{% endcodeblock %}

![启动与关闭集群](2023-05-16-10-34-51.png)

{% note danger modern %}
（因为之前配置过kafka环境变量，指令易冲突，需要特别注意，注意执行`cd /mysoft/kafka2`再使用`bin/`+指令）两种模式都部署就容易出现问题，所以两种模式部署一种即可
{% endnote %}
