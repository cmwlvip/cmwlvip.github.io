---
title: RDD
comments: true
date: 2023-05-17 09:43:41
updated: 2023-05-17
sticky:
description: Spark：3.3.2
categories: Spark
tags:
    - Spark
cover: https://pic.imgdb.cn/item/64219d12a682492fcc086ebb.jpg
---

{% note info modern %}
[参考](https://spark.apache.org/docs/latest/rdd-programming-guide.html)
{% endnote %}

## 概述

At a high level, every Spark application consists of a *driver program* that runs the user’s `main` function and executes(执行) various *parallel operations*(并行操作) on a cluster.  The main abstraction Spark provides is a **resilient distributed dataset (RDD)**, which is a collection of elements partitioned across the nodes of the cluster that can be operated on in parallel. RDDs are created by starting with a file in the Hadoop file system (or any other Hadoop-supported file system), or an existing Scala collection in the driver program, and transforming it. Users may also ask Spark to persist an RDD in memory, allowing it to be reused efficiently across parallel operations.Finally, RDDs automatically recover from node failures(节点故障).

A second abstraction in Spark is **shared variables**(共享变量) that can be used in parallel operations. By default, when Spark runs a function in parallel as a set of tasks on different nodes, it ships(运送) a copy of each variable used in the function to each task. Sometimes, a variable needs to be shared across tasks, or between tasks and the driver program. Spark supports two types of shared variables: *broadcast variables*(广播变量), which can be used to cache a value in memory on all nodes, and *accumulators*(累加器), which are variables that are only “added” to, such as counters and sums.

## 连接Spark

Spark 3.3.2 supports [lambda expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)(lambda表达式) for concisely writing functions, otherwise you can use the classes in the org.apache.spark.api.java.function package.

To write a Spark application in Java, you need to add a dependency on Spark.
![spark依赖](2023-03-26-21-18-09.png)

In addition, if you wish to access an HDFS cluster, you need to add a dependency on hadoop-client for your version of HDFS.
{% codeblock lang:xml "for example" %}
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-client</artifactId>
            <version>3.3.4</version>
        </dependency>
{% endcodeblock %}

Finally, you need to import some Spark classes into your program. 
{% codeblock lang:java %}
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.SparkConf;
{% endcodeblock %}

## spark初始化

{% note info modern %}
Spark程序必须做的第一件事是创建一个`JavaSparkContext`对象，它告诉Spark 如何访问集群。
{% endnote %}

The first thing a Spark program must do is to create a `JavaSparkContext` object, which tells Spark how to access a cluster. To create a `SparkContext` you first need to build a `SparkConf` object that contains information about your application.

{% codeblock lang:java %}
SparkConf conf = new SparkConf().setAppName(appName).setMaster(master);
JavaSparkContext sc = new JavaSparkContext(conf);
{% endcodeblock %}

The `appName` parameter is a name for your application to show on the cluster UI. `master` is a Spark, Mesos or YARN cluster URL, or a special “local” string to run in local mode. In practice, when running on a cluster, you will not want to hardcode master in the program, but rather launch the application with **spark-submit** and receive(接收) it there. However, for local testing and unit tests, you can pass “local” to run Spark in-process(在进程中).

### 使用Spark shell

In the Spark shell, a special interpreter-aware(解释器感知) **SparkContext** is already created for you, in the variable called `sc`. Making your own SparkContext will not work. You can set which master the context connects to using the `--master` argument, and you can add JARs to the classpath by passing a comma-separated list(逗号分隔列表) to the `--jars` argument. You can also add dependencies (e.g. Spark Packages) to your shell session by supplying a comma-separated list of Maven coordinates(坐标) to the `--packages` argument. Any additional repositories(存储库) where dependencies might exist (e.g. Sonatype) can be passed to the `--repositories` argument.

For example, to run bin/spark-shell on exactly four cores, use:
{% codeblock lang:shell %}
./bin/spark-shell --master local[4]
{% endcodeblock %}

Or, to also add `code.jar` to its classpath, use:
{% codeblock lang:shell %}
./bin/spark-shell --master local[4] --jars code.jar
{% endcodeblock %}

To include a dependency using Maven coordinates:

{% codeblock lang:shell %}
./bin/spark-shell --master local[4] --packages "org.example:example:0.1"
{% endcodeblock %}

For a complete list of options, run `spark-shell --help` .

## 弹性分布式数据集（RDD）

Spark revolves around(围绕) the concept of a **resilient distributed dataset (RDD)**, which is a fault-tolerant(容错) collection of elements that can be operated on in parallel.

There are two ways to create RDDs:

1. *parallelizing* an existing collection in your driver program
2. referencing a dataset in an external storage system
such as a shared filesystem, HDFS, HBase, or any data source offering a `Hadoop InputFormat` .

### 并行集合

Parallelized collections are created by calling JavaSparkContext’s `parallelize` method on an existing Collection in your driver program. The elements of the collection are copied to form a distributed dataset that can be operated on in parallel.

For example, here is how to create a parallelized collection holding the numbers 1 to 5:

{% codeblock lang:java %}
List<Integer> data = Arrays.asList(1, 2, 3, 4, 5);
JavaRDD<Integer> distData = sc.parallelize(data);
{% endcodeblock %}

Once created, the distributed dataset (distData) can be operated on in parallel.
For example, we might call `distData.reduce((a, b) -> a + b)` to add up the elements of the list.

One important parameter for parallel collections is the number of *partitions* to cut the dataset into. Spark will run one task for each partition of the cluster. Typically you want 2-4 partitions for each CPU in your cluster. Normally, Spark tries to set the number of partitions automatically based on your cluster. However, you can also set it manually(手动的) by passing it as a second parameter to parallelize (e.g. sc.parallelize(data, 10)). Note: some places in the code use the term slices (a synonym(同义词) for partitions) to maintain backward compatibility(向后兼容性).

### 外部数据集

Spark can create distributed datasets from any storage source supported by Hadoop, including your local file system, HDFS, Cassandra, HBase, Amazon S3, etc. Spark supports text files, SequenceFiles, and any other Hadoop `InputFormat`.

Text file RDDs can be created using **SparkContext**’s `textFile` method. This method takes a URI for the file (either a local path on the machine, or a hdfs://, s3a://, etc URI) and reads it as a collection of lines. Here is an example invocation:

{% codeblock lang:java %}
JavaRDD<String> distFile = sc.textFile("data.txt");
{% endcodeblock %}

Once created, distFile can be acted on by dataset operations.
For example, we can add up the sizes of all the lines using the map and reduce operations as follows: `distFile.map(s -> s.length()).reduce((a, b) -> a + b)` .

Some notes on reading files with Spark:

- If using a path on the local filesystem, the file must also be accessible at the same path on worker nodes. Either copy the file to all workers or use a network-mounted(网络安装的) shared file system.
- All of Spark’s file-based input methods, including textFile, support running on directories(目录), compressed files(压缩文件), and wildcards(通配符) as well. For example, you can use textFile`("/my/directory")`, textFile`("/my/directory/*.txt")`, and textFile`("/my/directory/*.gz")`.
- The `textFile` method also takes an optional second argument for controlling the number of partitions of the file.By default, Spark creates one partition for each block of the file (**blocks being 128MB by default in HDFS**),  but you can also ask for a higher number of partitions by passing a larger value. Note that you **cannot have fewer partitions than blocks**.

Apart from text files, Spark’s Java API also supports several **other data formats**:

- JavaSparkContext.`wholeTextFiles` lets you read a directory containing **multiple small text files**, and returns each of them as (filename, content) pairs. This is in contrast with `textFile`, which would return one record **per line** in each file.
- For SequenceFiles, use SparkContext’s `sequenceFile[K, V]` method where `K` and `V `are the types of key and values in the file. These should be subclasses of Hadoop’s Writable interface(接口), like IntWritable and Text.
- For other Hadoop InputFormats, you can use the JavaSparkContext.`hadoopRDD` method, which takes an arbitrary JobConf and input format class, key class and value class. Set these the same way you would for a Hadoop job with your input source(输入源). You can also use JavaSparkContext.`newAPIHadoopRDD` for InputFormats based on the “new” MapReduce API (org.apache.hadoop.mapreduce).
- JavaRDD.`saveAsObjectFile` and JavaSparkContext.`objectFile` support saving an RDD in a simple format consisting of serialized Java objects(序列化). While this is not as efficient as specialized formats like **Avro**, it offers an easy way to save any RDD.

### RDD操作

RDDs support two types of operations: **transformations**, which create a *new dataset* from an existing one, and **actions**, which return *a value* to the driver program after running a computation on the dataset.
For example, `map` is a **transformation** that passes each dataset element through a function and returns a new RDD representing(表示) the results. On the other hand, `reduce` is an **action** that aggregates(总数) all the elements of the RDD using some function and returns the final result to the driver program (although there is also a parallel `reduceByKey` that returns a distributed dataset).

All **transformations** in Spark are **lazy**, in that they do not compute their results right away. Instead, they just remember the transformations applied to some base dataset (e.g. a file). The **transformations** are only computed when an **action** requires a result to be returned to the driver program. This design enables Spark to run more efficiently. 
For example, we can realize that a dataset created through `map` will be used in a reduce and return only the result of the `reduce` to the driver, rather than the larger mapped dataset.

By default, each transformed RDD may be recomputed each time you run an action on it. you may also persist an RDD in memory using the `persist`(or `cache`) method,in which case Spark will keep the elements around on the cluster for much faster access the next time you query it. There is also support for persisting RDDs on disk(存盘), or replicated across multiple nodes.

#### 基本的

{% codeblock lang:java %}
JavaRDD<String> lines = sc.textFile("data.txt");
JavaRDD<Integer> lineLengths = lines.map(s -> s.length());
int totalLength = lineLengths.reduce((a, b) -> a + b);
{% endcodeblock %}

The first line defines a base RDD from an external file. This dataset is not loaded in memory or otherwise acted on: **lines is merely a pointer to the file**.
The second line defines lineLengths as the result of a map transformation. Again, lineLengths is not immediately computed, due to laziness.
Finally, we run `reduce`, which is an **action**. At this point Spark breaks the computation into tasks to run on separate machines, and each machine runs both its part of the `map` and a local reduction, returning only its answer to the driver program.

If we also wanted to use lineLengths again later, we could add:

{% codeblock lang:java %}
lineLengths.persist(StorageLevel.MEMORY_ONLY());
{% endcodeblock %}

before the `reduce`, which would cause lineLengths to be saved in memory after the first time it is computed.

#### 将函数传递给Spark

Spark’s API relies heavily on passing functions in the driver program to run on the cluster.In Java, functions are represented by classes implementing the interfaces in the `org.apache.spark.api.java.function` package. There are two ways to create such functions:

- Implement the Function interfaces in your own class, either as an anonymous inner class(匿名内部类) or a named one, and pass an instance(实例) of it to Spark.
- Use `lambda expressions` to concisely(简明) define an implementation.

While much of this guide uses `lambda syntax` for conciseness, it is easy to use all the same APIs in long-form. For example, we could have written our code above as follows:

{% codeblock lang:java %}
JavaRDD<String> lines = sc.textFile("data.txt");
JavaRDD<Integer> lineLengths = lines.map(new Function<String, Integer>() {
  public Integer call(String s) { return s.length(); }
});
int totalLength = lineLengths.reduce(new Function2<Integer, Integer, Integer>() {
  public Integer call(Integer a, Integer b) { return a + b; }
});
{% endcodeblock %}

Or, if writing the functions inline(内联) is unwieldy:

{% codeblock lang:java %}
class GetLength implements Function<String, Integer> {
  public Integer call(String s) { return s.length(); }
}
class Sum implements Function2<Integer, Integer, Integer> {
  public Integer call(Integer a, Integer b) { return a + b; }
}

JavaRDD<String> lines = sc.textFile("data.txt");
JavaRDD<Integer> lineLengths = lines.map(new GetLength());
int totalLength = lineLengths.reduce(new Sum());
{% endcodeblock %}

Note that anonymous inner classes in Java can also access variables in the enclosing scope(封闭范围) as long as they are marked `final`. Spark will ship copies of these variables to each worker node as it does for other languages.

#### 理解闭包

One of the harder things about Spark is understanding the scope and life cycle of variables and methods when executing code across a cluster. RDD operations that modify(修改) variables outside of their scope can be a frequent source of confusion(混乱根源). In the example below we’ll look at code that uses `foreach()` to increment(增加) a counter, but similar issues can occur for other operations as well.

##### Example

Consider the naive(天真) RDD element sum below, which may behave differently depending on whether execution is happening within the same JVM. A common example of this is when running Spark in local mode (--master = local[n]) versus(与对比) deploying a Spark application to a cluster (e.g. via spark-submit to YARN):

{% codeblock lang:java %}
int counter = 0;
JavaRDD<Integer> rdd = sc.parallelize(data);

// Wrong: Don't do this!!
rdd.foreach(x -> counter += x);

println("Counter value: " + counter);
{% endcodeblock %}

##### 本地模式vs集群模式

The behavior of the above code is undefined, and may not work as intended. To execute jobs, Spark breaks up the processing of RDD operations into tasks, each of which is executed by an executor. Prior(事先) to execution, Spark computes the task’s **closure**(闭包). The closure is those variables and methods which must be visible for the executor to perform its computations on the RDD (in this case `foreach()`). This closure is serialized and sent to each executor.

The variables within the closure sent to each executor are now copies and thus, when counter is referenced within the `foreach` function, it’s no longer the counter on the driver node. There is still a counter in the memory of the driver node but this is no longer visible to the executors! The executors only see the copy from the serialized closure. Thus, the final value of counter will still be zero since all operations on counter were referencing the value within the serialized closure.

In local mode, in some circumstances, the `foreach` function will actually execute within the same JVM as the driver and will reference the same original counter, and may actually update it.

To ensure well-defined behavior in these sorts of scenarios(场景，设想) one should use an `Accumulator`. `Accumulators` in Spark are used specifically to provide a mechanism(机制) for safely updating a variable when execution is split up across worker nodes in a cluster. The `Accumulators` section of this guide discusses these in more detail.

In general, closures - constructs like loops or locally defined methods, should not be used to mutate(转换) some global state.  Spark does not define or guarantee the behavior of mutations(突变行为) to objects referenced from outside of closures. **Some code that does this may work in local mode, but that’s just by accident and such code will not behave as expected in distributed mode.**Use an Accumulator instead if some global aggregation is needed.

##### 打印RDD元素

Another common idiom(习惯) is attempting to print out the elements of an RDD using `rdd.foreach(println)` or `rdd.map(println)` . On a single machine, this will generate the expected output and print all the RDD’s elements. However, in cluster mode, the output to stdout(标准输出) being called by the executors is now writing to the executor’s stdout instead, not the one on the driver, so stdout on the driver won’t show these! To print all elements on the driver, one can use the `collect()` method to first bring the RDD to the driver node thus: `rdd.collect().foreach(println)` . This can cause the driver to run out of memory, though, because `collect()` fetches the entire RDD to a single machine; if you only need to print a few elements of the RDD, a safer approach is to use the `take()`: `rdd.take(100).foreach(println)` .

#### 使用键值对

While most Spark operations work on RDDs containing any type of objects, a few special operations are only available on RDDs of key-value pairs. The most common ones are distributed “shuffle” operations, such as grouping or aggregating the elements by a key.

In Java, key-value pairs are represented using the `scala.Tuple2` class from the Scala standard library. You can simply call `new Tuple2(a, b)` to create a tuple, and access its fields later with `tuple._1()` and `tuple._2()` .

RDDs of key-value pairs are represented by the J`avaPairRDD` class. You can construct JavaPairRDDs from JavaRDDs using special versions of the map operations, like `mapToPair` and `flatMapToPair` .  The JavaPairRDD will have both standard RDD functions and special key-value ones.

For example, the following code uses the `reduceByKey` operation on key-value pairs to count how many times each line of text occurs in a file:

{% codeblock lang:java %}
JavaRDD<String> lines = sc.textFile("data.txt");
JavaPairRDD<String, Integer> pairs = lines.mapToPair(s -> new Tuple2(s, 1));
JavaPairRDD<String, Integer> counts = pairs.reduceByKey((a, b) -> a + b);
{% endcodeblock %}

We could also use `counts.sortByKey()`, for example, to sort the pairs alphabetically(按字母顺序), and finally `counts.collect()` to bring them back to the driver program as an array of objects.

{% note warning modern %}
when using custom objects as the key in key-value pair operations, you must be sure that a custom `equals()` method is accompanied with(带有) a matching `hashCode()` method.
{% endnote %}

#### Transformations

The following table lists some of the common transformations supported by Spark.

| Transformation | Meaning |
| ----------- | ----- |
| | |

## 共享变量