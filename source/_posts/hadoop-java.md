---
title: Java与Hadoop
comments: true
date: 2023-03-23 20:28:48
updated: 2023-03-27
sticky:
description: 通过Java API使用Hadoop
categories: Hadoop
tags:
    - Hadoop
    - Java
    - IDEA
    - Git
cover: https://pic.imgdb.cn/item/642157d0a682492fcc8d0a06.png
---

## Git在IDEA中的使用

所建立的项目不在根目录下，可如下配置仓库根目录
![git配置](2023-03-23-23-02-06.png)

## Maven

`Maven`是通过项目对象模型文件`pom.xml`来管理项目的构建、报告和文档的工具。
**Maven是一种项目管理工具。**

### IDEA新建Maven项目

1. 创建新项目（新建的项目下就是一个模块）
![新建项目](2023-03-23-20-40-48.png)
新建的`Maven`项目有一个`pom.xml`文件，内容如下：
{% codeblock lang:xml %}
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>javaHadoop</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
</project>
{% endcodeblock %}

2. 新建模块并进行相关设置
![右键单击项目名称](2023-03-23-20-46-17.png)
![新建模块](2023-03-23-20-51-46.png)
创建模块完成后会在模块下新生成一个`pom.xml`文件
{% codeblock lang:xml %}
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>javaHadoop</artifactId>
        <groupId>org.example</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.qf</groupId>
    <artifactId>testHDFS</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
</project>
{% endcodeblock %}

## Java程序使用HDFS

### 新建项目并配置pom.xml文件

如果已有`Maven`项目，可新建模块，并配置模块下`pom.xml`文件，也可以直接新建项目，配置项目下的`pom.xml`文件。

（这里）新建`testHDFS`模块，并配置模块下`pom.xml`文件。
{% codeblock lang:xml 添加如下配置项 %}
    <groupId>com.qf</groupId>           <!--组织名-->
    <artifactId>testHDFS</artifactId>   <!--项目名-->
    <dependencies>
        <!-- Hadoop客户端依赖，该依赖包含HDFS的相关依赖 -->
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-client</artifactId>
            <version>3.3.4</version>
        </dependency>
        <!-- 单元测试的依赖 -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
        </dependency>
    </dependencies>
{% endcodeblock %}
点击构建按钮进行构建即可。
![构建](2023-03-23-21-28-08.png)

新建Java类
![新建Java类目录结构](2023-03-23-21-36-30.png)

### 基本功能实现

{% codeblock lang:java 用到的包 %}
package com.qf;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import java.io.IOException;
{% endcodeblock %}

#### 将数据写入HDFS文件

{% codeblock lang:java %}
//将数据写入HDFS文件
    public static  void writeToHDFS() throws IOException {
        //创建配置文件对象
        Configuration conf = new Configuration();
        //给配置文件设置HDFS文件默认入口
        conf.set("fs.defaultFS", "hdfs://192.168.56.201:9000");
        //通过传入的配置参数得到FileSystem
        FileSystem fs = FileSystem.get(conf);
        //获取HDFS上的 /1.txt 的绝对路径，/1.txt 是存在的也可以是不存在的
        Path p = new Path("/1.txt");
        //FileSystem 通过 create() 方法获得输出流（FSDataOutputStream）
        FSDataOutputStream fos = fs.create(p, true, 1024);
        //通过输出流将内容写入 1.txt 文件
        fos.write("这是我在window用java API下写入的".getBytes());
        //关闭输出流
        fos.close();
    }
{% endcodeblock %}

在web界面查看，若文件内容一致，则操作成功
![web界面查看](2023-03-23-21-52-06.png)

#### 读取HDFS文件

{% codeblock lang:java %}
//读取HDFS文件
    public static void readHDFSFile() throws IOException {
        //创建配置对象
        Configuration conf = new Configuration();
        //设置HDFS文件系统的网络地址和端口号
        conf.set("fs.defaultFS", "hdfs://192.168.56.201:9000");
        //通过配置获取文件系统
        FileSystem fs = FileSystem.get(conf);
        //获取HDFS上的 /1.txt 的绝对路径
        Path p = new Path("/1.txt");
        //通过 FileSystem 的open() 方法获得数据输入流
        FSDataInputStream fis = fs.open(p);
        //分配 1024 字节的内存给 buf （分配1024个字节的缓冲区）
        byte[] buf = new byte[1024];
        int len = 0;
        //循环读取文件到内容到缓冲区，读到文件末尾结束（结束标识符为-1）
        while ((len = fis.read(buf)) != -1) {
            //输出读取的文件内容到控制台
            System.out.println(new String(buf, 0, len));
        }
    }
{% endcodeblock %}
![运行成功](2023-03-23-21-58-08.png)

#### 从Windows系统下上传文件到HDFS

{% codeblock lang:java %}
//上传文件到HDFS
    public  static void putFile() throws IOException{
        Configuration conf =new Configuration();
        conf.set("fs.defaultFS","hdfs://192.168.56.201:9000");
        FileSystem fs=FileSystem.get(conf);
        //文件上传到HDFS上的位置
        Path p=new Path("/");
        //待上传文件1.sh在Windows系统的绝对路径，此处需要提前在Windows系统下D盘下新建1.sh文件，并写入 “文件上传成功！”
        Path p2=new Path("file:///D:/1.sh");
        //从本地（Windows系统）上传文件到HDFS
        fs.copyFromLocalFile(p2,p);
        fs.close();
    }
{% endcodeblock %}
![运行成功](2023-03-23-22-02-18.png)

## Java与MapReduce

### MapReduce编程模型

MapReduce编程的一般思路

1. 输入一系列键值对`(K1,V1)`。
2. 通过`map()`方法和`reduce()`方法处理输入的键值对。
   1. 用`map()`方法将`(K1,V1)`处理成`list(K2,V2)`的形式。
   2. 用`reduce()`方法将`(K2,list(V2))`处理成`list(K3,V3)`的形式。

**(1)实现Mapper**
{% codeblock lang:java %}
public class MyMapper extends Mapper ... {
    //重写 map() 方法
}
{% endcodeblock %}

**(2)实现Reducer**
{% codeblock lang:java %}
import org.apache.hadoop.mapreduce.Reducer;

public class MyReducer extends Reducer ... {
    //重写 reduce() 方法
}
{% endcodeblock %}

**(3)创建MapReduce作业**
{% codeblock lang:java %}
package com.qf;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

import java.io.IOException;

public class MyApp {
    public static void main(String[] args) throws IOException, InterruptedException, ClassNotFoundException {
        //1.新建配置对象，为 配置对象设置文件系统
        Configuration conf=new Configuration();
        conf.set("fs.defaultFS", "hdfs://192.168.56.201:9000");//通过构建jar包实现，这行可以不要
        //2.设置Job属性
        Job job=Job.getInstance(conf);  //通过Configuration获得Job实例
        job.setJobName("MyApp");    //为Job命名
        job.setJarByClass(MyApp.class); //为Job运行设置主类
        //3.设置数据输入路径
        Path inPath =new Path(args[0]);
        FileInputFormat.addInputPath(job,inPath);
        //4.设置Job执行的Mapper类和输出K-V类型
        job.setMapperClass(MyMapper.class);
        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(IntWritable.class);
        //5.设置执行的Reducer类和输出K-V类型
        job.setReducerClass(MyReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setMapOutputValueClass(IntWritable.class);
        //6.设置数据输出路径
        Path outPath=new Path(args[1]);
        FileOutputFormat.setOutputPath(job,outPath);
        //7.MepReduce作业完成后退出系统
        System.exit(job.waitForCompletion(true)?0:1);
    }
}
{% endcodeblock %}

### MapReduce编程案例——WordCount

**(1)配置MapReduce开发环境**
{% codeblock lang:xml %}
    <dependencies>
        <!-- Hadoop客户端依赖，该依赖包含HDFS的相关依赖 -->
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-client</artifactId>
            <version>3.3.4</version>
        </dependency>
        <!-- 单元测试的依赖 -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
        </dependency>
    </dependencies>
{% endcodeblock %}

**(2)实现Mapper**
{% codeblock lang:java 导包 %}
package com.qf.words;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;
{% endcodeblock %}
{% codeblock lang:java %}
public class MyMapper extends Mapper<LongWritable,Text,Text, IntWritable> {
    Text word =new Text();
    IntWritable one =new IntWritable(1);
    @Override
    protected void map(LongWritable key,Text value,Context context) throws IOException, InterruptedException {
        //1.以行为单位，对数据进行处理
        String line=value.toString();
        //2.以空格为分隔符，对单词进行拆分
        String[] words=line.split(" ");
        //3.迭代数组，将输出的K-V对存入context
        for (String s:words){
            word.set(s);
            context.write(word,one);
        }
    }
}
{% endcodeblock %}

**(3)实现Reducer**
{% codeblock lang:java 导包 %}
package com.qf.words;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.IOException;
{% endcodeblock %}
{% codeblock lang:java %}
public class MyReducer extends Reducer<Text, IntWritable,Text,IntWritable> {
    @Override
    protected void reduce(Text key,Iterable<IntWritable> values,Context context) throws IOException, InterruptedException {
        //1.定义一个计数器
        Integer counter = 0;
        //2.迭代数组，将输出的K-V对存入context
        for (IntWritable value:values){
            counter+=value.get();
        }
        context.write(key,new IntWritable(counter));
    }
}
{% endcodeblock %}

**(4)创建MapReduce作业**
{% codeblock lang:java 导包 %}
package com.qf.words;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
{% endcodeblock %}
{% codeblock lang:java WordCountApp.java %}
public class WordCountApp{
    public static void main(String[] args) throws Exception {
        if (args==null || args.length<2){
            throw new Exception("参数不足，需要两个参数");
        }
        //1.新建配置对象，为 配置对象设置文件系统
        Configuration conf=new Configuration();
        //2.设置Job属性
        Job job=Job.getInstance(conf,"WordCountApp");  //通过Configuration获得Job实例
        job.setJarByClass(WordCountApp.class); //为Job运行设置主类
        //3.设置数据输入路径
        Path inPath =new Path(args[0]);
        FileInputFormat.addInputPath(job,inPath);
        //4.设置Job执行的Mapper类和输出K-V类型
        job.setMapperClass(MyMapper.class);
        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(IntWritable.class);
        //5.设置执行的Reducer类和输出K-V类型
        job.setReducerClass(MyReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setMapOutputValueClass(IntWritable.class);
        //6.设置数据输出路径
        Path outPath=new Path(args[1]);
        FileOutputFormat.setOutputPath(job,outPath);
        //7.MepReduce作业完成后退出系统
        System.exit(job.waitForCompletion(true)?0:1);
    }
}
{% endcodeblock %}

#### 将程序打包成jar包

![打包成jar包](2023-03-26-10-52-50.png)

{% note info modern %}
点击`package`即可实现程序打包，如果需要重新打包，则先点击`clean`
{% endnote %}

{% codeblock lang:log 执行日志 %}
D:\ProgramFiles\Java1.8\bin\java.exe -Dmaven.multiModuleProjectDirectory=D:\Code\Code\Java\javaHadoop\testHDFS "-Dmaven.home=D:\Program Files\JetBrains\IntelliJ IDEA 2022.2.1\plugins\maven\lib\maven3" "-Dclassworlds.conf=D:\Program Files\JetBrains\IntelliJ IDEA 2022.2.1\plugins\maven\lib\maven3\bin\m2.conf" "-Dmaven.ext.class.path=D:\Program Files\JetBrains\IntelliJ IDEA 2022.2.1\plugins\maven\lib\maven-event-listener.jar" "-javaagent:D:\Program Files\JetBrains\IntelliJ IDEA 2022.2.1\lib\idea_rt.jar=58341:D:\Program Files\JetBrains\IntelliJ IDEA 2022.2.1\bin" -Dfile.encoding=UTF-8 -classpath "D:\Program Files\JetBrains\IntelliJ IDEA 2022.2.1\plugins\maven\lib\maven3\boot\plexus-classworlds-2.6.0.jar;D:\Program Files\JetBrains\IntelliJ IDEA 2022.2.1\plugins\maven\lib\maven3\boot\plexus-classworlds.license" org.codehaus.classworlds.Launcher -Didea.version=2022.2.1 package
[INFO] Scanning for projects...
[INFO] 
[INFO] --------------------------< com.qf:testHDFS >---------------------------
[INFO] Building testHDFS 1.0-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ testHDFS ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Copying 0 resource
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ testHDFS ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 6 source files to D:\Code\Code\Java\javaHadoop\testHDFS\target\classes
[INFO] 
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ testHDFS ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory D:\Code\Code\Java\javaHadoop\testHDFS\src\test\resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ testHDFS ---
[INFO] Nothing to compile - all classes are up to date
[INFO] 
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ testHDFS ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ testHDFS ---
[INFO] Building jar: D:\Code\Code\Java\javaHadoop\testHDFS\target\testHDFS-1.0-SNAPSHOT.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  3.541 s
[INFO] Finished at: 2023-03-26T10:54:56+08:00
[INFO] ------------------------------------------------------------------------

进程已结束,退出代码0
{% endcodeblock %}

![打包后的jar包出现在target文件夹下](2023-03-26-10-57-30.png)

更改jar包名称(本案例中可改为`wordCount.jar`)将jar包拖至虚拟机(hsq01)中。

{% codeblock lang:shell 运行MapReduce作业常用格式 %}
jar jar Jar包 完整包名类名 待处理HDFS上绝对路径 文件处理后在HDFS上存放的路径
{% endcodeblock %}

{% codeblock lang:txt 测试文件word.txt %}
hadoop hive
hive hbase
flume sqoop
{% endcodeblock %}

{% codeblock lang:shell 启动Hadoop集群上传测试文件至HDFS %}
hadoop fs -put word.txt /
{% endcodeblock %}

{% codeblock lang:shell 在本案例中 %}
hadoop jar wordCount.jar com.qf.words.WordCountApp /word.txt /outdata
{% endcodeblock %}

{% codeblock lang:log 程序执行日志 %}
[root@hsq01 ~]# hadoop jar wordCount.jar com.qf.words.WordCountApp /word.txt /outdata
2023-03-26 11:15:07,520 INFO client.DefaultNoHARMFailoverProxyProvider: Connecting to ResourceManager at hsq01/192.168.56.201:8032
2023-03-26 11:15:08,412 WARN mapreduce.JobResourceUploader: Hadoop command-line option parsing not performed. Implement the Tool interface and execute your application with ToolRunner to remedy this.
2023-03-26 11:15:08,488 INFO mapreduce.JobResourceUploader: Disabling Erasure Coding for path: /tmp/hadoop-yarn/staging/root/.staging/job_1679800440436_0001
2023-03-26 11:15:08,900 INFO input.FileInputFormat: Total input files to process : 1
2023-03-26 11:15:09,054 INFO mapreduce.JobSubmitter: number of splits:1
2023-03-26 11:15:09,439 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_1679800440436_0001
2023-03-26 11:15:09,439 INFO mapreduce.JobSubmitter: Executing with tokens: []
2023-03-26 11:15:09,667 INFO conf.Configuration: resource-types.xml not found
2023-03-26 11:15:09,667 INFO resource.ResourceUtils: Unable to find 'resource-types.xml'.
2023-03-26 11:15:10,205 INFO impl.YarnClientImpl: Submitted application application_1679800440436_0001
2023-03-26 11:15:10,267 INFO mapreduce.Job: The url to track the job: http://hsq01:8088/proxy/application_1679800440436_0001/
2023-03-26 11:15:10,268 INFO mapreduce.Job: Running job: job_1679800440436_0001
2023-03-26 11:15:21,570 INFO mapreduce.Job: Job job_1679800440436_0001 running in uber mode : false
2023-03-26 11:15:21,571 INFO mapreduce.Job:  map 0% reduce 0%
2023-03-26 11:15:30,025 INFO mapreduce.Job:  map 100% reduce 0%
2023-03-26 11:15:38,160 INFO mapreduce.Job:  map 100% reduce 100%
2023-03-26 11:15:39,184 INFO mapreduce.Job: Job job_1679800440436_0001 completed successfully
2023-03-26 11:15:39,315 INFO mapreduce.Job: Counters: 54
        File System Counters
                FILE: Number of bytes read=77
                FILE: Number of bytes written=552231
                FILE: Number of read operations=0
                FILE: Number of large read operations=0
                FILE: Number of write operations=0
                HDFS: Number of bytes read=126
                HDFS: Number of bytes written=40
                HDFS: Number of read operations=8
                HDFS: Number of large read operations=0
                HDFS: Number of write operations=2
                HDFS: Number of bytes read erasure-coded=0
        Job Counters
                Launched map tasks=1
                Launched reduce tasks=1
                Data-local map tasks=1
                Total time spent by all maps in occupied slots (ms)=5825
                Total time spent by all reduces in occupied slots (ms)=5549
                Total time spent by all map tasks (ms)=5825
                Total time spent by all reduce tasks (ms)=5549
                Total vcore-milliseconds taken by all map tasks=5825
                Total vcore-milliseconds taken by all reduce tasks=5549
                Total megabyte-milliseconds taken by all map tasks=5964800
                Total megabyte-milliseconds taken by all reduce tasks=5682176
        Map-Reduce Framework
                Map input records=3
                Map output records=6
                Map output bytes=59
                Map output materialized bytes=77
                Input split bytes=91
                Combine input records=0
                Combine output records=0
                Reduce input groups=5
                Reduce shuffle bytes=77
                Reduce input records=6
                Reduce output records=5
                Spilled Records=12
                Shuffled Maps =1
                Failed Shuffles=0
                Merged Map outputs=1
                GC time elapsed (ms)=203
                CPU time spent (ms)=1120
                Physical memory (bytes) snapshot=339787776
                Virtual memory (bytes) snapshot=5115379712
                Total committed heap usage (bytes)=165810176
                Peak Map Physical memory (bytes)=217137152
                Peak Map Virtual memory (bytes)=2553217024
                Peak Reduce Physical memory (bytes)=122650624
                Peak Reduce Virtual memory (bytes)=2562162688
        Shuffle Errors
                BAD_ID=0
                CONNECTION=0
                IO_ERROR=0
                WRONG_LENGTH=0
                WRONG_MAP=0
                WRONG_REDUCE=0
        File Input Format Counters
                Bytes Read=35
        File Output Format Counters
                Bytes Written=40
{% endcodeblock %}

![HDFS系统中出现输出目录](2023-03-26-11-18-46.png)
下载`part-r-00000`查看结果
![查看结果](2023-03-26-11-21-39.png)
{% codeblock lang:plaintext part-r-00000 %}
flume	1
hadoop	1
hbase	1
hive	2
sqoop	1
{% endcodeblock %}
![yarn集群Web界面查看](2023-03-26-11-16-45.png)

## 项目——气象数据分析

### 数据格式

{% codeblock lang:txt %}
0169501360999992018010100004+52970+122530FM-12+043399999V0201401N00101026001C9004700199-02041-02321102941ADDAA124001531AJ100003100000099GA1081+026001101GA2999+999999101GA3999+999999101GE19MSL   +99999+99999GF108991081999026001999999MA1999999097051MD1210061-0101REMSYN004BUFR
0165501360999992018010103004+52970+122530FM-12+043399999V0201101N0010122000199004900199-01651-02051102921ADDAJ100079100070099AY171031AY201031GA1021+026001101GA2999+999999101GA3999+999999101GE19MSL   +99999+99999GF102991021999026001999999MD1210021+9999MW1001REMSYN004BUFR
{% endcodeblock %}

## 项目——交通卡口表

### 卡口表数据格式

{% codeblock lang:txt %}
道路编号,设备编号,设备名称,部门编码,部门名称,x坐标,y坐标,启用时间,,
600312009000,42050006500001000503,高新-大连路汕头路口南向北,420500060000,宜昌支队高新区大队,111.33272,30.70787,2020-04-15,,
600312009000,42050006500002000503,高新-大连路汕头路口南向北卡口,420500060000,宜昌支队高新区大队,111.33273,30.70791,2020-04-15,,
{% endcodeblock %}

### JavaAPI操作Hbase

#### 新建项目并配置pom.xml文件

{% codeblock lang:xml %}
    <groupId>com.qf</groupId>
    <artifactId>testHbase</artifactId>
    <dependencies>
        <dependency>
            <groupId>org.apache.hbase</groupId>
            <artifactId>hbase-client</artifactId>
            <version>2.5.3</version>
        </dependency>
        <dependency>
            <groupId>org.apache.hbase</groupId>
            <artifactId>hbase-server</artifactId>
            <version>2.5.3</version>
        </dependency>
        <!-- 单元测试的依赖 -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
        </dependency>
    </dependencies>
{% endcodeblock %}

{% codeblock lang:java 导包 %}
package com.qf;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.hbase.Cell;
import org.apache.hadoop.hbase.CellUtil;
import org.apache.hadoop.hbase.HBaseConfiguration;
//import org.apache.hadoop.hbase.HColumnDescriptor;//已弃用
//import org.apache.hadoop.hbase.HTableDescriptor;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.util.Bytes;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Iterator;
import java.util.List;
{% endcodeblock %}

#### 创建表

{% codeblock lang:java %}
    public static void createTable(){
        //创建Hbase连接对象
        Configuration conf= HBaseConfiguration.create();
        //获取zookeeper配置
        conf.set("fs.defaultFS", "hdfs://192.168.56.201:9000");
        conf.set("hbase.zookeeper.quorum", "192.168.56.201,192.168.56.202,192.168.56.203");
        try{
            //建立与Hbase的连接
            Connection conn = ConnectionFactory.createConnection(conf);
            Admin admin=conn.getAdmin();
            //设置表名称
            TableName tableName=TableName.valueOf("test");
            System.out.println("连接：" + conn + "-HMaster:"+admin);
            //判断表是否存在，如果存在就删除
            if(admin.tableExists(tableName)){
                if(admin.isTableEnabled(tableName)){
                    admin.disableTable(tableName);
                }
                admin.deleteTable(tableName);
            }
            //创建HTableDescriptor对象，并添加表名称
            //`org.apache.hadoop.hbase.HTableDescriptor' 已被弃用
//        HTableDescriptor table= new HTableDescriptor(tableName);
            //创建HColumnDescriptor对象，并添加列簇名称
            //'org.apache.hadoop.hbase.HColumnDescriptor' 已被弃用
//        HColumnDescriptor cf1=new HColumnDescriptor("cf1");
//        HColumnDescriptor cf2=new HColumnDescriptor("cf2");
            ColumnFamilyDescriptor columnFamily1= ColumnFamilyDescriptorBuilder
                    .newBuilder(Bytes.toBytes("cf1"))
                    .build();
            ColumnFamilyDescriptor columnFamily2=ColumnFamilyDescriptorBuilder
                    .newBuilder(Bytes.toBytes("cf2"))
                    .build();
            TableDescriptor table=TableDescriptorBuilder
                    .newBuilder(tableName)
                    .setColumnFamily(columnFamily1)
                    .setColumnFamily(columnFamily2)
                    .build();
            //创建表
            admin.createTable(table);
            TableName[] tableNames=admin.listTableNames();
            //查看所有的表
            for (TableName tablesName:tableNames){
                System.out.println(tablesName);
            }
            conn.close();
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
{% endcodeblock %}

#### 写数据

{% codeblock lang:java %}
    public static void addData(){
        //获取Hadoop相关配置
        Configuration hadoopConf = new Configuration();
        hadoopConf.set("fs.defaultFS", "hdfs://192.168.56.201:9000");
        Configuration conf = HBaseConfiguration.create();
        //获取zookeeper配置
        conf.set("fs.defaultFS", "hdfs://192.168.56.201:9000");
        conf.set("hbase.zookeeper.quorum", "192.168.56.201,192.168.56.202,192.168.56.203");
        try{
            FileSystem fs=FileSystem.get(hadoopConf);
            Path path=new Path("/transport/transport.csv");
            FSDataInputStream in =fs.open(path);
            BufferedReader br=new BufferedReader(new InputStreamReader(in,"GBK"));
    //            BufferedReader br=new BufferedReader(new InputStreamReader(in));
            String line;
            // 配置HBase连接
            Connection conn = ConnectionFactory.createConnection(conf);
            Table table = conn.getTable(TableName.valueOf("transport"));
            br.readLine();//读取第一行
            int n=1;
            while((line=br.readLine())!=null){
                String[] arr=line.split(",");
                // 创建一个Put实例
                Put put = new Put(Bytes.toBytes(String.valueOf(n)));
                // 添加列族和列名、值
                put.addColumn(Bytes.toBytes("cf1"), Bytes.toBytes("roadId"), Bytes.toBytes(arr[0]));
                put.addColumn(Bytes.toBytes("cf1"), Bytes.toBytes("deviceId"), Bytes.toBytes(arr[1]));
                put.addColumn(Bytes.toBytes("cf1"), Bytes.toBytes("deviceName"), Bytes.toBytes(arr[2]));
                put.addColumn(Bytes.toBytes("cf1"), Bytes.toBytes("departmentId"), Bytes.toBytes(arr[3]));
                put.addColumn(Bytes.toBytes("cf1"), Bytes.toBytes("departmentName"), Bytes.toBytes(arr[4]));

                put.addColumn(Bytes.toBytes("cf2"), Bytes.toBytes("x"), Bytes.toBytes(arr[5]));
                put.addColumn(Bytes.toBytes("cf2"), Bytes.toBytes("y"), Bytes.toBytes(arr[6]));
                put.addColumn(Bytes.toBytes("cf2"), Bytes.toBytes("time"), Bytes.toBytes(arr[7]));
                try{
                    put.addColumn(Bytes.toBytes("cf2"), Bytes.toBytes("other"), Bytes.toBytes(arr[8]));
                } catch (Exception e){
                    put.addColumn(Bytes.toBytes("cf2"), Bytes.toBytes("other"), Bytes.toBytes("null"));
                }
                table.put(put);
                n++;
                System.out.println(arr[0]+"\t"+arr[1]+"\t"+arr[2]+"\t"+arr[3]+"\t"+arr[4]+"\t"+arr[5]+"\t"+arr[6]+"\t"+arr[7]);
            }
            table.close();
            conn.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
{% endcodeblock %}

#### 读数据

{% codeblock lang:java %}
    public static void readData(){
        //获取Hadoop相关配置
        Configuration hadoopConf = new Configuration();
        hadoopConf.set("fs.defaultFS", "hdfs://192.168.56.201:9000");
        Configuration conf = HBaseConfiguration.create();
        //获取zookeeper配置
        conf.set("fs.defaultFS", "hdfs://192.168.56.201:9000");
        conf.set("hbase.zookeeper.quorum", "192.168.56.201,192.168.56.202,192.168.56.203");
        try{
            // 配置HBase连接
            Connection conn = ConnectionFactory.createConnection(conf);
            //获取表对象
            Table table = conn.getTable(TableName.valueOf("transport"));
            //创建Scan对象
            Scan scan=new Scan();
            //通过扫描器得到结果集
            ResultScanner rs =table.getScanner(scan);
//            //得到迭代器
//            Iterator<Result> it= rs.iterator();
//            printData(it);
            printNeedData(rs, "cf2".getBytes(),Bytes.toBytes("time"));
            table.close();
            conn.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
{% endcodeblock %}
{% codeblock lang:java 迭代读取 %}
    //迭代输出每行的所有数据
    public static void printData(Iterator<Result> it){
        while (it.hasNext()){
            Result next=it.next();
            List<Cell> cells=next.listCells();
            for (Cell cell:cells){
                String row=Bytes.toString(CellUtil.cloneRow(cell));
                String cf=Bytes.toString(CellUtil.cloneFamily(cell));
                String qualifier=Bytes.toString(CellUtil.cloneQualifier(cell));
                String value=Bytes.toString(CellUtil.cloneValue(cell));
                System.out.println(row+","+cf+":"+qualifier+","+value);
            }
        }
    }
{% endcodeblock %}
{% codeblock lang:java 读取指定簇与列 %}
    //输出指定簇、列
    public static void  printNeedData(ResultScanner rs,byte[] columnFamily, byte[] qualifier) throws IOException {
        for (Result result = rs.next(); result != null; result = rs.next()) {
            String date = new String(result.getValue(columnFamily, qualifier));
            System.out.println(date);
        }
    }
{% endcodeblock %}

### 问题

{% note waring modern %}
Hbase建表报错:`ERROR: org.apache.hadoop.hbase.PleaseHoldException: Master is initializing`
{% endnote %}

![ERROR](2023-03-26-16-16-26.png)

解决办法：

1. 删除HDFS中存在的Hbase(Hbase配置中`hbase.rootdir`路径)
2. 删除zookeeper中存在的Hbase
    1. zkCli.sh
    2. deleteall /hbase(rmr /hbase)

{% note info modern %}
如果在使用ZooKeeper客户端命令行界面时，输入 `rmr /hbase` 出现 rmr 命令不存在的情况，可能是因为当前版本的ZooKeeper已经将 rmr 命令从命令行界面中删除。
{% endnote %}