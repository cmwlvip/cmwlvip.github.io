---
title: Spark部署与快速入门
comments: true
date: 2023-03-27 11:07:28
updated: 2023-05-17
sticky:
categories: Spark
tags:
    - Spark

cover: https://pic.imgdb.cn/item/64219d12a682492fcc086ebb.jpg
---

## 环境准备

Spark: 3.3.2

### 安装Spark

从[Spark](https://spark.apache.org/)官网[下载](https://spark.apache.org/downloads.html)好安装包
![Spark官网](2023-03-27-11-15-31.png)
{% codeblock lang:shell %}
tar -zxvf spark-3.3.2-bin-hadoop3.tgz -C /mysoft/
{% endcodeblock %}

### 配置环境变量

{% codeblock lang:sh vi /etc/profile %}
#Spark enviroment variables
export SPARK_HOME=/mysoft/spark-3.3.2-bin-hadoop3/
export PATH=$PATH:$SPARK_HOME/bin
{% endcodeblock %}

{% codeblock lang:shell 使环境变量生效 %}
source /etc/profile
{% endcodeblock %}

## Standalone集群模式

{% codeblock lang:shell %}
cd $SPARK_HOME
cd conf/
{% endcodeblock %}

### 配置`spark-env.sh`

{% codeblock lang:shell %}
cp spark-env.sh.template spark-env.sh
{% endcodeblock %}

{% codeblock lang:sh vi spark-env.sh %}
export JAVA_HOME=/usr/local/jdk1.8.0_341
export HADOOP_CONF_DIR=/usr/local/hadoop-3.3.4/etc/hadoop
export SPARK_MASTER_HOST=hsq01
export SPARK_MASTER_PORT=7077
export SPARK_WORKER_CORES=1
export SPARK_WOEKER_INSTANCES=1
{% endcodeblock %}

{% note info modern %}
虚拟机内存默认2G+,若比较小，需要把`worker`的内存和`executor`内存降低成900M或者更低
{% codeblock lang:sh %}
export SPARK_EXECUTOR_MEMORY=512M
export SPARK_WORKER_MEMORY=512M
export SPARK_DRIVER_MEMORY=512M
{% endcodeblock %}
{% endnote %}

### 配置`workers`

{% codeblock lang:shell %}
cp workers.template workers
{% endcodeblock %}

{% codeblock lang:sh vi workers %}
hsq01
hsq02
hsq03
{% endcodeblock %}

{% note info modern %}
把localhost删掉
{% endnote %}

### 将Spark目录及Spark环境分发到其他节点

{% codeblock lang:shell %}
for i in {2..3}; do scp -r /mysoft/spark-3.3.2-bin-hadoop3/ hsq0$i:/mysoft/;done
for i in {2..3}; do scp /etc/profile hsq0$i:/etc/profile;done
{% endcodeblock %}

### 启动Spark集群(standalone模式)

{% codeblock lang:shell %}
cd $SPARK_HOME
sbin/start-all.sh
{% endcodeblock %}

{% blockquote %}
使用 [hsq01:8081](http://hsq01:8081) 在 web 界面查看
{% endblockquote %}
![web查看](2023-03-27-18-16-49.png)

### 启用HA功能

{% label 修改`spark-env.sh` pink %}
把`export SPARK_MASTER_HOST=hsq01`和`export SPARK_MASTER_PORT=7077`前面加#注释掉

添加如下内容
{% codeblock lang:sh vi spark-env.sh %}
export SPARK_DAEMON_JAVA_OPTS="-Dspark.deploy.recoveryMode=ZOOKEEPER -Dspark.deploy.zookeeper.url=hsq01:2181,hsq02:2181,hsq03:2181 -Dspark.deploy.zookeeper.dir=/spark"
{% endcodeblock %}

{% label 分发到其他节点 pink %}
{% codeblock lang:shell %}
for i in {2..3}; do scp /mysoft/spark-3.3.2-bin-hadoop3/conf/spark-env.sh hsq0$i:/mysoft/spark-3.3.2-bin-hadoop3/conf/spark-env.sh;done
{% endcodeblock %}

{% label 重启spark集群 pink %}
{% codeblock lang:shell spark关了重新启动一下 %}
sbin/stop-all.sh
sbin/start-all.sh
{% endcodeblock %}

三个节点`jps`查看是否有`QuorumPeerMain`
否则重启`Zookeeper`

{% label 查看HA是否配置成功 pink %}
{% codeblock lang:shell 仅对hsq01 %}
zkCli.sh
ls /
ls /spark -s
quit
{% endcodeblock %}
![同时看到spark和zookeeper才算成功](2023-03-27-19-48-55.png)

{% label 设置备用主机 pink %}
{% codeblock lang:shell 仅对hsq02 %}
cd $SPARK_HOME
sbin/start-master.sh
tail -n 100 /mysoft/spark-3.3.2-bin-hadoop3//logs/spark-root-org.apache.spark.deploy.master.Master-1-hsq02.out
{% endcodeblock %}
![找到端口号](2023-03-27-19-58-54.png)
![备用主机网页查看](2023-03-27-19-56-42.png)

{% label 宕机测试 pink %}
**测试`hsq01`的master进程宕机（此时`hsq02`是备用主机）**
{% codeblock lang:shell  %}
jps
kill -9 (master端口号)
{% endcodeblock %}
不断刷新浏览器页面，此时`hsq01`的页面已经无法打开，`hsq02`的要多刷新几次（等一会儿）
![hsq02web查看](2023-03-27-20-11-12.png)
也就是此时`hsq02`（备用主机）完全继承了原先主机`hsq01`的功能！

{% label 检测能否还原 pink %}
{% codeblock lang:shell 对hsq01 %}
cd $SPARK_HOME
sbin/start-master.sh
{% endcodeblock %}

发现无论怎么刷新网页都是回不去的，也就是说此时原先的备用主机（hsq02 STANDBY）变成了实质上的主机，而原先的主机（hsq01 ALIVE）变成了实质上的备用主机，**继承的功能并不会随原主机的恢复而还回去！**这就是spark集群的特点。

### 例程——程蒙特卡洛计算圆周率

{% codeblock lang:shell %}
bin/spark-submit --master spark://hsq01:7077,hsq02:7077,hsq03:7077 --class org.apache.spark.examples.SparkPi  /mysoft/spark-3.3.2-bin-hadoop3/examples/jars/spark-examples_2.12-3.3.2.jar 10000
{% endcodeblock %}
![运算圆周率](2023-03-27-20-47-23.png)
在网页上查看（谁是现在实质上的主机master就观察谁）
![web查看作业](2023-03-27-20-46-43.png)

{% hideBlock 问：master和worker有什么区别，运行例程必须要在master上吗？ %}
答：不是这样的。
master只是管理作业的和产生运行调度表的，实际运行是在各个worker中excutor进程完成的，不用管哪个master是alive（实质上的主机）了,系统会自动找到alive的master并提交任务的。
更进一步来讲，上面**启用HA功能**只是为了测试方便，所以只弄了两台`hsq01`,`hsq02`，本来这段代码中间应该是`--master spark://hsq01:7077,hsq02:7077` 但是真实情况是会连`hsq03`也要写进去的（其中一台是alive，其他全是standby），所有都写的好处在于不去指定，让系统自己找，因为作为客户端大多数时候是没有权限去查看spark的状态的。
{% endhideBlock %}

## Quick Start

### 使用Spark-Shell进行交互式分析

#### 基本使用

Spark’s shell provides a simple way to learn the API, as well as a powerful tool to analyze data interactively.

{% codeblock lang:shell %}
cd $SPARK_HOME
./bin/spark-shell
{% endcodeblock %}

![spark-shell](2023-05-16-23-37-46.png)

Spark’s primary abstraction is a distributed collection of items called a Dataset. Datasets can be created from Hadoop InputFormats (such as HDFS files) or by transforming other Datasets. Let’s make a new Dataset from the text of the README file in the Spark source directory:

{% codeblock lang:scala %}
val textFile = spark.read.textFile("file:///mysoft/spark-3.3.2-bin-hadoop3/README.md")
{% endcodeblock %}

![用文件创建数据集](2023-05-16-23-56-33.png)

You can get values from Dataset directly, by calling some actions, or transform the Dataset to get a new one. For more details, please read the [API doc](https://spark.apache.org/docs/latest/api/scala/org/apache/spark/sql/Dataset.html).

{% codeblock lang:scala  %}
textFile.count() //Number of items in this Dataset
{% endcodeblock %}

{% codeblock lang:scala %}
textFile.first() // First item in this Dataset
{% endcodeblock %}

Now let’s transform this Dataset into a new one. We call filter to return a new Dataset with a subset of the items in the file.

{% codeblock lang:scala %}
val linesWithSpark = textFile.filter(line => line.contains("Spark"))
{% endcodeblock %}

We can chain together transformations and actions(转换和操作可以一起):

{% codeblock lang:scala %}
textFile.filter(line => line.contains("Spark")).count() // How many lines contain "Spark"?
{% endcodeblock %}

#### 更多`Dataset`操作

Dataset actions and transformations can be used for more complex computations. If we want to find the line with the most words:

{% codeblock lang:scala %}
textFile.map(line => line.split(" ").size).reduce((a, b) => if (a > b) a else b)
{% endcodeblock %}

This first maps a line to an integer value, creating a new Dataset.
reduce is called on that Dataset to find the largest word count.
The arguments to map and reduce are Scala function literals (closures)(Scala语言（闭包）), and can use any language feature or Scala/Java library.
For example, we can easily call functions declared elsewhere. We’ll use `Math.max()` function to make this code easier to understand:

{% codeblock lang:scala %}
import java.lang.Math
textFile.map(line => line.split(" ").size).reduce((a, b) => Math.max(a, b))
{% endcodeblock %}

One common data flow pattern is MapReduce, as popularized by Hadoop. Spark can implement MapReduce flows easily:
{% codeblock lang:scala %}
val wordCounts = textFile.flatMap(line => line.split(" ")).groupByKey(identity).count()
{% endcodeblock %}

Here, we call flatMap to transform a Dataset of lines to a Dataset of words, and then combine groupByKey and count to compute the per-word counts in the file as a Dataset of (String, Long) pairs.
To collect the word counts in our shell, we can call collect:

{% codeblock lang:scala %}
wordCounts.collect()
{% endcodeblock %}

#### Caching(缓存)

Spark also supports pulling data sets into a cluster-wide in-memory cache. This is very useful when data is accessed repeatedly, such as when querying a small “hot” dataset or when running an iterative algorithm(迭代算法) like PageRank. As a simple example, let’s mark our linesWithSpark dataset to be cached:

{% codeblock lang:scala %}
linesWithSpark.cache()
linesWithSpark.count()
{% endcodeblock %}

It may seem silly to use Spark to explore and cache a 100-line text file. The interesting part is that these same functions can be used on very large data sets, even when they are striped across tens or hundreds of nodes. You can also do this interactively(交互) by connecting `bin/spark-shell` to a cluster, as described in the RDD programming guide.

### 创建属于自己的应用

Suppose we wish to write a self-contained application using the Spark API. We will walk through a simple application in Scala (with sbt), Java (with Maven), and Python (pip).

This example will use `Maven` to compile an application JAR, but any similar build system will work.

This program just counts the number of lines containing ‘a’ and the number containing ‘b’ in the Spark `README.md`.
Unlike the earlier examples with the Spark shell, which initializes its own SparkSession, we initialize a SparkSession as part of the program.

To build the program, we also write a Maven `pom.xml` file that lists Spark as a dependency. Note that Spark artifacts(构件) are tagged with a Scala version.

{% codeblock lang:xml %}
    <dependencies>
        <dependency> <!-- Spark dependency -->
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-sql_2.12</artifactId>
            <version>3.3.2</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
{% endcodeblock %}

{% codeblock lang:java %}
package com.hsq;

import org.apache.spark.api.java.function.FilterFunction;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.SparkSession;

public class SimpleApp {
    public static void main(String[] args) {
        //默认HDFS,所以加上file:///
        String logFile = "file:///mysoft/spark-3.3.2-bin-hadoop3//README.md"; // Should be some file on your system
        SparkSession spark = SparkSession.builder().appName("Simple Application").getOrCreate();
        Dataset<String> logData = spark.read().textFile(logFile).cache();

        long numAs = logData.filter((FilterFunction<String>) s -> s.contains("a")).count();
        long numBs = logData.filter((FilterFunction<String>) s -> s.contains("b")).count();

        System.out.println("包含a的行数为: " + numAs + ", 包含b的行数为: " + numBs);

        spark.stop();
    }
}
{% endcodeblock %}

Now, we can package the application using Maven and execute it with `./bin/spark-submit`.

{% codeblock lang:shell %}
bin/spark-submit --master spark://hsq01:7077,hsq02:7077,hsq03:7077 --class "com.hsq.SimpleApp" testSpark-1.0-SNAPSHOT.jar
{% endcodeblock %}

![得到结果](2023-05-17-09-17-01.png)

### 多元的选择

最后，Spark在示例目录中包含几个示例（Scala，Java，Python，R）。可以按如下方式运行它们：
{% codeblock lang:shell %}
#For Scala and Java, use run-example:
./bin/run-example SparkPi

#For Python examples, use spark-submit directly:
./bin/spark-submit examples/src/main/python/pi.py

#For R examples, use spark-submit directly:
./bin/spark-submit examples/src/main/r/dataframe.R（执行不了）
{% endcodeblock %}

![./bin/run-example SparkPi](2023-05-17-09-28-14.png)
![./bin/spark-submit examples/src/main/python/pi.py](2023-05-17-09-29-02.png)