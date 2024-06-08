---
title: C#
date: 2022-11-25 00:22:35
updated: 2023-01-06
description: C# 程序设计基础入门
categories: C#
tags:
    - C#
keywords:
    - C#
cover: /2022/11/25/CSharp/CSharp.png
top_img: https://pic.imgdb.cn/item/6386f12116f2c2beb10bb24e.jpg
---

{% note info flat %}

```c#
using System;
namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
```

{% endnote %}

{% note info flat %}

```C#
#region
#endregion
```

可以使代码折叠，仍会执行
{% endnote %}

{% note default flat %}
[Visual Studio 2019程序调试](#程序调试)
{% endnote %}

## C\#开发入门

### .NET 基础知识

#### .NET Framework

{% pullquote right %}
![.NET Framework体系结构](2022-12-02-19-41-49.png)
{% endpullquote %}
.NET Framework 是微软公司为开发应用程序而创建的一个**全新的、集成的、面向对象的**开发平台。使用.NET Framework 可以创建桌面应用程序、Web应用程序和其他各种类型的应用程序。

.NET Framework 位于操作系统和应用程序之间，负责管理在.NET Framework 上运行的各种应用程序。也就是说 **.NET应用程序不依赖于操作系统，只依赖于.NET Framework**。
.NET Framework核心部分：

- **公共语言运行库**(Common Language Runtime, CLR): 它位于.NET Framework的最底层，主要负责管理.NET应用程序的编译、运行以及一些基础服务，它为.NET应用程序提供了一个虚拟运行环境。同时CLR 还负责为应用程序提供内存分配、线程管理以及垃圾回收等服务，并且负责对代码进行安全检查，以保证代码正常运行。
- **.NET Framework的基础类库**(Base Class Library, BCL): 它是微软公司提出的一组标准库，如集合类，可以提供给.NET Framework所有语言使用。当安装.NET Framework时，所有的基础类库被部署到全局程序集缓存(Global Assembly Cache, GAC)，所以不需要再工程中引用任何基础类库，它们会被自动引用。

除此之外，.NET Framework还包括 Window 窗体、ASP.NET、ADD.NET 等模块，这些模块用于开发各种各样的应用程序，如桌面应用程序，网络应用程序。企业级应用程序。

#### C\#语言

C#是微软公司在2000年6月发布的一种全新的、简单的、安全的、面向对象的程序设计语言，它专门用于开发 .NET 应用，从根本上保证了 C＃与 .NET Framework 的完美结合。 C#不仅吸收了 C++、 Visual Basic 、 Delphi , Java 等语言的优点，体现了当今最新的字设计技术的功能和精华，而且继承了 C 语言的语法风格、 C++ 的面向对象特性。 C#的主要特点如下。

1. **面向对象**
C# 是由 C 和 C++衍生出来的面向对象的编程语言，因此它具有面向对象的一切特性（封装、继承和多态）。C# 在继承 C 语言和 C++强大功能的同时去掉了一些它们的复杂特性（例如没有宏和模板，不允许多重继承）正是由于 C# 面向对象的卓越设计，使它成为构建各类组件的理想之选。

2. **语言简洁**
在默认的情况下，C#的代码在 .NET Framework 提供的“可操纵”环境下运行，使得程序不能直接访问内存地址空间，因此不再提供对指针类型的支持，从而使 C# 程序更加健壮。另外，C#不再使用 C++中的操作符（例如`::` `->` `.,`)，它只支持一个操作符`.`，对于程序员来说，现在需要理解的仅是名字的嵌套而已。

3. **与 Web 的紧密结合**
.NET 中新的应用程序开发模型意味着越来越多的解决方案需要与 Web 标准相统一，例如超文本标记语言（ Hypertext Markup Language , HTML ）。现有的一些开发工具不能与 Web 紧密结合，简易对象访问协议（ Simple Object Access Protocol , SOAP ）的使用使 C#克服了这一缺陷，大规模保层次的分布式开发从此
成为可能。
由于有了 Web 服务框架的帮助，对程序员来说，网络服务看起来就像是 C# 的本地对象。程序员们能沙利用他们已有的面向对象的知识与技巧开发 Web 服务，仅需要便用简单的 C#语言结构， C# 组件就能够万便地被 Web 服务所使用，并允许它们通过 Internet 被运行在任何操作系统上的任何语言所调用。例如， XMl 已经成为网络中数据结构传递的标准，为了提高效率， C# 直接将 XML 数据映射成为结构，这样就可以伟众地处理各种数据。

### 开发环境搭建

Visual Studio 2019

……

### 编写C\#程序

1. **新建项目**
新建C#项目有两种：①**控制台应用程序**(一个用于创建可在Windows、Linux、和macOS上的.NET Core运行的命令行应用程序的项目)②**控制台应用(.NET Framework)**(用于创建命令行应用程序的项目)
![新建c#项目](2023-01-06-15-22-50.png)
{% note warning modern %}
需要注意的是，**控制台应用(.NET Framework)**项目程序中一般需要添加`Console.ReadKey();`，用于暂停程序，而**控制台应用程序**项目不添加也能看到调程序试信息。
{% endnote %}

1. **编写程序代码**
{% codeblock lang:c# %}
using System;
namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
{% endcodeblock %}

### 运行原理

![运行原理](2022-12-02-20-51-01.png)

- 程序在运行过程分为两个时期，分别是编译期和运行期。
- **编译期**：CLR对C#代码进行**第一次编译**，将编写的代码编译成`.dll`文件或`.exe`文件。此时代码被编译为中间语言
- **运行期**：CLR会针对目前特定的硬件环境使用**即时编译**（JIT）,也就是将中间语言编译成为本机代码并执行。在运行期，CLR把将编译过后的代码放入一个**缓冲区**中。下次使用相同的代码时，就直接从缓冲区调用。也就是说**相同代码只编译一次**，提高了程序运行的速度。

## C\# 编程基础

### C\# 基本语法

#### C\#代码基本格式

```c#
[修饰符] class 类名{
    程序代码
}
```

1. 每行的最后都必须用分号（英文格式）`;`结束。
2. C# 严格区分大小写。
3. 为了便于阅读，通常使用缩进格式，但这不是必须的。

#### C\#中的注释

1. **单行注释** `//`
2. **多行注释** 用`/*`开头，以`*/`结尾
3. **文档注释**

##### 文档注释

文档注释用于对类或方法进行说明和描述。在类或方法前连续输入3个`/`，就会自动生成对应的文档注释，需要手动填写类或方法的描述信息，来完成文档注释。
{% codeblock lang:C# %}
/// <summary>
///
/// </summary>
static void Add(){
}
{% endcodeblock %}
上述代码中的`<summary>`标签用于对共有类型的类、方法、属性或字段进行注释。其他常用的文档注释标签如下：

| 标签 | 表示含义 |
| ---- | ------- |
| `<param>` | 描述方法或构造函数的参数 |
| `<include>` | 包括来自外部文件的XML |
| `<returns>` | 描述方法的返回值 |
| `<value>` | 描述属性 |
| `<example>`| 表示所含时示例 |
| `<exception>`| 标识方法可能引发异常 |

#### C\#中的标识符

- 标识符可以由**任意顺序的大小写字母、数字、下划线(_)和@符号**组成
- 不能以数字开头
- 如果包含@，那么@必须放在首位
- 不能是C#中的关键字

**建议遵循的规范**。

- 类名、方法名、属性名：**大驼峰命名法**（也叫帕斯卡(Pascal)命名法）
- 字段名、变量名：**小驼峰命名法**
- 常量名所有字母大写，单词之间下划线连接
- 尽量使用有意义的英文单词定义标识符

{% note info modern %}
在C#中，标识符的组成部分也可以是汉字或中文
{% endnote %}

#### C\#中的关键字

也称作保留字

```plaintext
abstract  do        in        protected   true
as        double    int       public      try
base      else      interface readonly    typeof
bool      enum      internal  ref         uint
break     event     is        return      ulong
byte      explicit  lock      sbyte       unchecked
case      extern    long      sealed      unsafe
catch     false     namespace short       ushort
char      finally   new       sizeof      using
checked   fixed     null      stackalloc  virtual
class     float     object    static      void
const     for       operator  string      volatile
continue  foreach   out       struct      while
decimal   goto      override  switch
default   if        params    this
delegate  implicit  private   throw
```

- **所有的关键字都是小写**
- **程序中的标识符不能以关键字命名**

#### C\#中的常量

##### 整型常量

整型常量：整型常量是整数类型的数据，有二进制、八进制、十进制和十六进制4种表示形式。

1. 二进制：由数字0 和1 组成的数字序列。如01000000、10000001。
2. 八进制：以`0`开头并且其后由0 ~7之间（包括0和7）的整数组成的数字序列，如：0342。
3. 十进制：数字0~9之间（包括0和9）的整数组成的数字序列。如：198。
4. 十六进制：以`0x`或者`0X`开头并且其后由0~9、A~F(包括0和9、A和F)组成的数字序列，如0x25AF。

##### 浮点数常量

就是在数学中用到的小数。

- float单精度浮点数：后面以`F`或`f`结尾。
- double双精度浮点数：后面以以`D`或`d`结尾。
- **当在使用浮点数时也可以在结尾处不加任何的后缀，此时虚拟机会默认为double双精度浮点数**。

##### 字符常量

用于表示一个字符，一个字符常量要用一对英文半角格式的**单引号**（' '）引起来，他可以是英文字母、数字、标点符号以及由转义序列来表示的特殊字符(\u00000空格字符)。

##### 字符串常量

用于表示一串连续的字符，一个字符串常量要用一对英文半角格式的**双引号**（“ ”）引起来。

##### 布尔常量

- `true`
- `false`

##### null常量

null 常量只有一个null，表示对象的引用为空。

{% note info flat %}
特殊字符——反斜杠(`\`)
在字符常量中，反斜杠(`\`)是一个特殊的字符，被称为**转义字符**，作用是**用来转义后面的一个字符**。

| 转义字符 | 描述 |
| ------- | ---- |
| `\r` | 回车 |
| `\n` | 换行 |
| `\t` | 制表符 相当于【Tab】键 |
| `\b` | 退格符号，相当于【Backspace】键 |
| `\'` | 转义单引号 |
| `\"` | 转义双引号 |
| `\\` | 转义反斜杠 |
{% endnote %}

{% note info flat %}
**十进制转二进制**
就是用**短除法**除以2取余数的过程。把要转换的数，除以2，得到商和余数，将商继续除以2，直到商为0。最后所有余数从下往上排列得到二进制数。
{% endnote %}

{% note info flat %}
**二进制转十进制**
从右往左用二进制位上的每个数去乘以2的对应次方，右边第一位乘以2的0次方，最后相加。
{% endnote %}

{% note info flat %}
**二进制转八进制**
从右往左三位三位看，最后结果以`0`开头
**二进制转十六进制**
从右往左四位四位看，最后结果以`0x`或`0X`开头
{% endnote %}

### C\#中的变量

#### 变量的定义

变量实际上就是一个临时存放数据的地方。

#### 变量的数据类型

**C#是一门强类型编程语言**，对变量的数据类型具有严格的限定。
在C#中，变量的数据类型分为两大类，**值类型**和**引用类型**。
![变量的数据类型](2022-12-03-00-06-48.png)
![浮点型取整范围](2022-12-03-00-10-37.png)

#### 变量的类型转换

1. 自动类型转换
2. 强制类型转换

![变量的类型转换](2022-12-03-00-12-41.png)

#### 变量的作用域

- 变量需要在他的作用范围内才可以被使用，这个作用范围称为变量的作用域。
- 程序中，变量一定会被定义在某一对大括号中，该大括号所包含的代码区域便是这个变量的作用域。

### C\#中的运算符

#### 算术运算符

| 运算符 | 描述 |
| ----- | ---- |
| `+` | 正号 / 加 |
| `-` | 负号 / 减 |
| `*` | 乘 |
| `/` | 除 |
| `%` | 取模 |
| `++` | 自增 |
| `--` | 自减 |

- 区分`i++`与`++i`。
- 除法运算，当除数与被除数都为整数时，结果为整数；有小数，得到结果也会是小数。
- 取模运算，运算结果的正负取决于被模数(`%`左边的数)符号，与模数的符号无关。

#### 赋值运算符

| 运算符 | 描述 |
| ----- | ---- |
| `=` | 赋值 |
| `+=` | 加等于 |
| `-=` | 减等于 |
| `*=` | 乘等于 |
| `/=` | 除等于 |
| `%=` | 模等于 |

在C#中可以通过一条赋值语句对多个变量进行赋值。
{% codeblock lang:C# %}
int x, y, z;
x = y = z = 5;
{% endcodeblock %}

#### 比较运算符

| 运算符 | 描述 |
| ----- | ---- |
| `==` | 等于 |
| `!=` | 不等于 |
| `<` | 小于 |
| `>` | 大于 |
| `<=` | 小于等于 |
| `>=` | 大于等于 |

{% note warning modern %}
在使用比较运算符时，`==`容易误写成`=`
{% endnote %}

#### 逻辑运算符

| 运算符 | 描述 |
| ----- | ---- |
| `&` | 与 |
| &#124; | 或 |
| `^` | 异或 |
| `!` | 非 |
| `&&` | 短路与 |
| &#124;&#124; | 短路或 |

#### 位运算符

**是针对二进制数的每一位进行运算的符号，他是专门针对数字0和1进行操作的。**

| 运算符 | 描述 | 运算 |
| ----- | ---- | ----- |
| `&` | 按位与 | 如果两个二进制的相应位都为1，结果为1，否则为0 |
| &#124; | 按位或 | 有1则1，全0为0 |
| `~` | 取反 | 只针对一个数操作，二进制位是0，则取反值为1；如果是1，则取反值为0 |
| `^` | 按位异或 | 一样为0；相异为1 |
| `<<` | 左移（尖的方向移动） | 右边补0，左边舍去 |
| `>>` | 右移 | 右边舍去，左边正数补0，负数补1 |

#### 运算符的优先级

在对一些比较复杂的表达式进行运算时，要明确表达式中所有运算符参与运算的先后顺序，我们把这种顺序称作运算符的优先级。
![运算符的优先级](2022-12-03-00-41-11.png)

### 选择结构语句

#### if条件语句

1. if语句
2. if...else语句
3. if...else if...else语句

##### 三元运算符

```C#
判断条件 ? 表达式1 : 表达式2
```

#### switch 语句

```C#
switch(表达式){
    case 目标值1:
        执行语句1
        break;
    case 目标值2:
        执行语句2
        break;
    ......
    case 目标值n:
        break;
    default:
        执行语句n
        break;
}
```

### 循环结构语句

#### while 循环语句

```c#
while(循环条件){
    执行语句
}
```

#### do...while 循环语句

```c#
do{
    执行语句
}while(循环条件);
```

{% note info modern %}
循环会无条件执行一次
{% endnote %}

#### for 循环语句

```c#
for(初始化表达式;循环条件;操作表达式){
    执行语句
}
```

#### 跳转语句(break、goto、continue)

1. break 语句
跳出循环
2. continue 语句
跳出本次循环
3. goto 语句
{% codeblock lang:c# %}
using System;
namespace Program{
    class Program{
        static void Main(string[] args){
            int i,j;
            for(i=1;i<=9;i++){
                for(j=1;j<=i;j++){
                    if(i>4){
                        goto end;
                    }
                    Console.Write("*");
                }
                Console.WriteLine();
            }
        end: Console.ReadKey();
        }
    }
}
{% endcodeblock %}

#### 循环嵌套

### 方法

#### 什么是方法

方法就是一个功能的集合，可以把程序中的某段具有特殊功能的代码段提取出来

```c#
[访问权限修饰符] [其他修饰符] 返回值类型 方法名(行参列表){
    方法体
}
```

- 方法里面不能有方法
- 一个方法的执行需要调用这个方法
- 一个方法可以被多次调用
- 方法的执行 **栈结构**

#### 方法的重载

在C#中，**由方法名和参数列表（参数的类型和顺序）组成的部分称为方法签名**。
判断是否构成重载，只需要比较方法签名。

### 数组

数组是一个容器，用来储存一系列的相兼容的数据类型的变量。

#### 数组的定义

```c#
int[] array1=new int[10];
int[] array2=new int[5]={1,2,3,4,5}; //元素不能多也不能少
int[] array3=new int[]={1,2,3};
int[] array={1,2,3,4,5};
```

#### 数组的常见操作

1. 数组遍历
2. 数组最值
3. 数组排序

#### 多维数组

```c#
int[,] array=new int[3,4];
int[,] array1=new int[3,4]{{1,2,3,4},{1,2,3,4},{1,2,3,4},};
int[,] array2={{1,2,3,4},{1,2,3,4},{1,2,3,4},};
```

### 程序调试

#### 设置断点

- 在程序的调试过程中，需要对程序中某些数据的变化情况进行观察，才能分析出程序出错的原因，这时就需要为程序设置断点。
- 断点可以让正在运行的程序在需要的地方中断，当再次运行程序时，程序会在断点处暂停，方便观察程序中的数据。
- 添加断点的两种方式：
  1. 左击代码左边的灰色区域即可，断点插入成功后左侧会有彩色圆点出现，并且插入断点后的代码会高亮显示。
  ![插入断点后的代码](2023-01-06-16-01-38.png)
  2. 在某行代码处右击鼠标，在弹出的快捷菜单中，选择“断点”选项，然后选择“插入断点”即可。
  ![通过快捷菜单插入断点](2023-01-06-16-03-51.png)
- 删除断点：
  1. 左击代码左侧已插入的彩色圆点，即可删除断点
  2. 在断点上右击选择【删除断点】选项。

#### 单步调试

- 单步调试：当程序出现Bug时，通常采用的是一步一步跟踪程序执行的流程，根据变量的值，找到错误的原因的方法。
- 单步调试分为逐语句(快捷键【F11】)和逐过程(快捷建【F12】)。
- 逐语句调试会进入方法内部调试，单步执行方法体中的每一行代码，逐过程调试不会进入方法体内部，而是把方法当做一行代码来执行。
- 开启单步调试：在代码中设置断点后，在工具栏中选择【Debug】模式，并单击启动按钮，开启程序调试功能。
- 调试按钮的作用{% inlineImg 2023-01-06-16-09-16.png 100px %}
  - 全部中断：该按钮可以将正在执行的程序全部中断，快捷建【Ctrl+Alt+Break】。
  - 停止调试：该按钮用于停止调试程序，快捷建【Shift+F5】。
  - 重新启动：该按钮用于重新启动程序调试，快捷键【Ctrl+Shift+F5】。
  - 显示下一条语句：该按钮用于显示下一条执行的语句，快捷键【Alt+数字键*】。
  - 逐语句：该按钮可以让程序按照逐语句进行调试，快捷键【F11】。
  - 逐过程：该按钮可以让程序按照逐过程进行调试，快捷键【F10】。
  - 跳出：该按钮用于跳出正在执行的程序，快捷键【Shift+F11】。

- 当使用【逐语句】和【逐过程】按钮进行单步调试，调试信息会显示在【自动窗口】、【局部变量】和【监视1】窗口中，具体信息如下：
  - 【自动窗口】：自动根据当前选中对象显示其调试信息。
  - 【局部变量窗口】：只显示当前帧的局部变量信息。
  - 【监视1窗口】：检索用户自己添加的变量信息。

#### 观察变量

观察变量值的方法：

- 使用【自动窗口】查看变量的值
可以在【自动窗口】中查看到当前代码中`变量的名称`、`值`和`类型`
![使用【自动窗口】查看变量的值](2023-01-06-16-33-47.png)

- 使用【局部变量】窗口查看变量的值
可以在【局部变量】窗口中查看到当前运行代码中之前所有`变量的名称`、`值`和`类型`
![使用【局部变量】窗口查看变量的值](2023-01-06-16-33-15.png)

- 使用鼠标悬停的办法监视变量的值
查看变量当前值时，可以把鼠标指针移动到当前变量所在位置，观察变量的值，这种方法方便快捷，最常用
![使用鼠标悬停的办法监视变量的值](2023-01-06-16-32-49.png)

- 使用【监视1】窗口查看变量的值
单击【监视1】窗口，双击【添加要监视的项】写入要查看的变量
![使用【监视1】窗口查看变量的值](2023-01-06-16-32-18.png)

- 使用【即时窗口】查看变量的值
菜单栏选择【调试】→【窗口】→【即时】可打开【即时窗口】
在【即时窗口】中直接输入已运行的变量名，按【Enter】即可查看变量的值，也可以在变量名前加上`&`查看变量的地址和值
![使用【即时窗口】查看变量的值](2023-01-06-16-31-43.png)

#### 条件断点

- 条件断点可以快速定位到需要调试的循环次数，提高调试效率。
- 使用条件断点调试程序的步骤如下所示：
  1. 首先为需要中断的代码添加断点，然后右击断点，在弹出框中单击【条件（C）】按钮。
  2. 勾选【条件】选项，将条件表达式的值设置为`为true`，设置中断表达式设置为`i==2`（举例），此时完成断点设置，启动调试。
  ![条件断点](2023-01-06-16-55-18.png)

## 面向对象基础

### 面向对象的概念

**面向过程**与**面向对象**都是一种看待问题，解决问题的思维方式。

- 面向过程：着眼点在于问题是怎么解决的，然后亲历亲为的去解决这个问题
- 面向对象：着眼点在于找到一个能够帮助我们解决问题的实体，然后委托这个实体来解决问题

{% note info modern %}
面向对象的三大特征：**封装性**、**继承性**、**多态性**。
{% endnote %}

### 类和对象

对象：具有一定的功能，能够帮助解决特定问题的实体，就是对象。
类：一系列具有相同的功能和特征的对象的集合。

#### 类的定义

`class`
遵循大驼峰命名法

{% note info modern %}
在C#中，定义在类中的变量被称为**字段**，定义在方法中的变量被称为**局部变量**。
字段：用来描述这个类所有对象共有的特征
方法：用来描述这个类共有的行为
{% endnote %}

#### 对象的创建与使用

```c#
类名 对象名称 =new 类名();
```

#### 类的设计

#### 属性

> 在程序中，使用属性封装字段时，需要将字段访问级别设为private，并通过属性的get访问器和set访问器来对字段进行读写操作，从而保证类内部数据安全。

{% tabs 属性 %}
<!-- tab 读写属性 -->

```c#
public [数据类型] [属性名]{
    get{ //返回参数值}
    set{ //设置隐式参数value给字段赋值 }
}
```

**For example**：

```c#
class Person{
    private int age = 10;
    public int Age  //自动属性
    { 
        get;
        set;
    }
    public void Say()
    {
        Console.WriteLine("我今年"+ this.Age + "岁了");
    }
}
```

<!-- endtab -->

<!-- tab 只读属性 -->

```c#
public [数据类型] [属性名]{
    get{ //返回参数值}
}
```

<!-- endtab -->

<!-- tab 只写属性 -->

```c#
public [数据类型] [属性名]{
    set{ //设置隐式参数value给字段赋值 }
}
```

<!-- endtab -->
{% endtabs %}

### 访问权限修饰符

| 访问权限修饰符 | 描述 |
| ------------ | ---- |
| `public` | 最高访问级别，访问不受限制 |
| `protected` | 保护访问级别，受保护的成员可由自身及派生类访问 |
| `internal` | 内部访问级别，只有在同一程序集中，内部类型或者成员才可以访问 |
| `protected internal` | 内部保护级别，访问仅限于当前程序集，可以由自身及派生类访问 |
| `private` | 私有访问，最低访问级别，私有成员只有在它们的类和结构中才可以访问 |

### 构造方法

> 构造方法用于实例化对象

#### 构造方法的定义

在一个类中定义的方法同时满足以下3个条件，就是一个构造方法：

1. 方法名于类名相同
2. 方法名前面没有返回值类型的声明
3. 方法中不能使用return语句返回一个值

#### 构造方法的重载

与普通方法一样，构造方法也可以重载。
如果一个类中没有定义构造方法，系统将会自动创建一个默认的构造方法。

### 关键字 this

1. this访问属性
2. this调用成员方法
3. this调用构造方法
{% codeblock lang:c# %}
using System;
namespace ConsoleApp2
{
    class Class1
    {
        static void Main(string[] args)
        {
            Console.WriteLine("程序运行结果：");
            Class1 demo1 = new Class1("huang", 20);
            /*程序运行
             * 无参的构造方法
                一个有参数的构造方法
                两个参数的构造方法
             */
        }
        public Class1()
        {
            Console.WriteLine("无参的构造方法");
        }
        public Class1(string name) : this()   //通过关键字this 调用无参的构造方法
        {
            Console.WriteLine("一个有参数的构造方法");
        }
        public Class1(string name, int age) : this("a")    //通过this调用带一个参数的构造方法
        {
            Console.WriteLine("两个参数的构造方法");
        }
    }
}
{% endcodeblock %}

### 垃圾回收

在C#中，当一个对象成为垃圾对象后仍会占用内存空间，时间一长2，就会导致内存不足。
为了清除这些无用的垃圾对象，释放一定的内存空间，C#中引入了垃圾回收机制。
在这种机制下，不需要过多关心垃圾对象的回收问题，.Net运行环境会启动垃圾回收器将这些垃圾从内存中释放，从而是程序获得更多内存空间。
除了等待运行环境自动垃圾回收，还可以通过`GC.Collect()`方法来通知运行环境立即进行垃圾回收。

```c#
using System;

namespace ConsoleApp3
{
    class Student
    {
        public string name;
        public Student()
        {
            Console.WriteLine("Student类创建成功");
        }
        ~Student()  //析构函数，在对象被销毁自动调用
        {
            Console.WriteLine(name + "：资源被回收");
        }
        static void Main(string[] args)
        {
            Student s1 = new Student();
            Student s2 = new Student();
            s1.name = "s1";
            s2.name = "s2";
            s1 = null;
            Console.WriteLine("执行GC.Collect方法：");
            GC.Collect();
            Console.ReadKey();
            /*运行结果
            Student类创建成功
            Student类创建成功
            执行GC.Collect方法：
            s1：资源被回收
            */
        }
    }
}
```

#### 析构函数

语法`~`。
析构函数在对象被销毁自动调用。

### 关键字Static

{% note info modern %}

- 静态成员是属于类的，访问的时候用到类来访问
- 非静态成员是属于对象的，访问的时候用对象来访问

{% endnote %}

#### 静态字段

#### 静态属性

```c#
class Person{
    private static int age = 10;
    public static int Age  //自动属性
    { 
        get;
        set;
    }
    public void Say()
    {
        Console.WriteLine("我今年"+ Person.Age + "岁了");
    }
}
```

#### 静态方法

也是用类名访问。

#### 静态类

当类中的成员全部是静态成员时，就可以把这个类声明为静态类。
声明静态类需要在关键字`class`前加上`static`。

#### 静态构造方法

- 静态构造方法的作用是初始化静态成员
- 一个类只能有一个构造方法
- 该静态构造方法没有任何其他修饰符，也没有参数
- 可以被定义在静态类或非静态类中
- 静态构造方法会在程序创建第一实例或引用任何静态成员之前，完成类中静态成员的初始化

{% note warning modern %}
静态构造方法只能为静态字段赋值
{% endnote %}

#### 单例模式

单例模式是C#中的一种设计模式，它是指在设计一个类时，需要保证整个程序在运行期间只存在一个实例对象。

```c#
namespace ConsoleApp2
{
    class SingleClass
    {
        //声明一个静态的SingleClass类的变量来引用唯一的对象
        private static SingleClass singleInstance;
        //创建私有的无参构造方法，使外部无法调用这个类的构造方法
        private SingleClass() { }
        //创建静态的方法，创建此类唯一的对象
        public static SingleClass SingleMethod()
        {
            if (singleInstance==null)
            {
                singleInstance = new SingleClass();//调用私有的构造方法创建该实例
            }
            return singleInstance;
        }
    }
}
```

```c#
static void Main(string[] args){
    //用SingleMethod()方法创建SingleClass对象
    SingleClass s1 = SingleClass.SingleMethod();
    SingleClass s2 = SingleClass.SingleMethod();
    //比较变量s1与s2中存的地址是否相同
    if (s1==s2)
    {
        Console.WriteLine("这就是单例模式");
    }
}
```

### 嵌套类

在C#中，可以将类定义在一个类的内部，被包含的类称作**嵌套类**，而包含嵌套类的类就称作**外部类**。

- 外部类与嵌套类的非静态成员可以重名
- 嵌套类中不能声明静态成员，但嵌套类可以直接引用外部类的静态成员
- 作用域之外需要使用类似`Outer.类名`的完整限定名方式

### 匿名类

有时候某个类的实例只会用到一次，这时可以使用**匿名类**的方式创建实例，即**无需显示定义一个类，就可以将一组只读属性封装到单个对象中**。

```c#
static void Main(string[] args)
{
    //匿名类
    //创建匿名对象
    var Child = new { Name = "Lucy", Age = 3, Sex = '女' };
    //控制台输出匿名对象
    Console.WriteLine("我的名字是：{0}，性别为：{1}，年龄是：{2}", Child.Name, Child.Sex, Child.Age);

}
//程序运行结果：
//我的名字是：Lucy，性别为：女，年龄是：3
```

### 对象初始化器

在一个类中，通常使用构造方法来为属性赋值，当一个类中的属性过多时，不可能为每种情况都创建一个构造方法，此时就可以使用对象的初始化器来为属性赋值

```c#
类名 变量名=new 类名(){属性名=值,属性名=值……}
```

**For example**:

```c#
namespace ConsoleApp2
{
    class Program
    {
        class Person{
            int age;
            public int Age{
                set{age=value;}
                get{return age;}
            }
            string name;
            public string Name{
                set{name=value;}
                get{return name;}
            }
        }
        static void Main(string[] args){
            Person p=new Person(){Name="Lucy",Age=18};
             Console.WriteLine("我的名字是：{0}，年龄是：{1}", p.Name,p.Age);
        }
    }
}
```

## 面向对象高级

### 类的继承

#### 继承的概念

如果多个类中具有相同的属性和方法，可以把它们提取出来，封装成一个新的类。
这个类称作**父类**/**基类**/**超类**
关系：**子类继承父类**

```c#
class 子类类名:父类类名{}
```

- 子类拥有父类的所有字段、属性和方法
- 构造方法不可以被继承
- 一个类可以有多个子类，但只能有一个父类
- 多层继承是可以的，即一个类在继承另一个类的同时还可以被其他类继承。例如，C类继承B类，B类继承A类，此时C类也可以称作A类的子类
- **在C#中，所有的类都直接或间接的继承`Object`类**

#### 构造方法的执行过程

初始化实例成员`→`调用父类的构造方法`→`调用自身的构造方法

#### 隐藏基类方法

子类在继承父类时可以对父类成员进行扩展，如果子类中出现与父类同名的方法，那么在调用程序时就不能明确该方法是属于父类还是子类，这时应该使用关键字`new`隐藏基类方法。

```c#
using System;
namespace ConsoleApp2
{
    class Animal
    {
        public void Shout()
        {
            Console.WriteLine("动物的叫声");
        }
    }
    class Dog : Animal
    {
        public new void Shout()//与父类方法重名
        {
            Console.WriteLine("汪……");
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
             Dog dog = new Dog();
            dog.Shout();
        }
    }
}
```

#### 拆箱与装箱

在实际开发过程中，某些方法的参数类型为引用类型，如果调用时传入的是数值类型，此时需要进行**装箱**操作。
当一个方法的返回值类型为数值类型时。实际上该方法的返回值类型为引用类型，此时需要进行**拆箱**操作。

{% note info modern %}

- 装修就是将数值类型转换为引用类型
- 拆箱就是将引用类型转换为数值类型

{% endnote %}

```c#
using System;
namespace ConsoleApp2
{
    class Program
    {
        static void Main(string[] args)
        {
            int num = 100;
            //将int类型的变量赋值给object类型的变量obj，发生装箱操作
            object obj = num;
            Console.WriteLine("obj对象的值为{0}", obj);
            //将object类型的对象obj赋值给int类型的变量num，发生拆箱操作
            num = (int)obj;
            Console.WriteLine("变量num的值为{0}", num);
            //程序运行结果：
            //obj对象的值为100
            //变量num的值为100
        }
    }
}
```

### 关键字sealed

- 关键字sealed可以修饰类也可以修饰方法
- 被关键字sealed修饰的类被称为**密封类**（不能派生子类）
- 被关键字sealed修饰的方法在**子类中不能重写**

#### 关键字sealed修饰类

在C#中，使用关键字`sealed`修饰的类不可以被继承。

#### 关键字sealed修饰方法

### 多态

{% note info modern %}
父类的引用可以指向子类对象
{% endnote %}

#### 重写父类的方法

- 虚函数 使用virtual修饰
- 虚函数可以被子类隐藏，也可以被子类重写
- 非虚函数只能被子类隐藏
- 重写关键字：`override`

#### 多态的实现

```c#
using System;
namespace ConsoleApp
{
    class Animal
    {
        public virtual void Shout()
        {
            Console.WriteLine("动物的叫声");
        }
    }
    class Dog : Animal
    {
        public override void Shout()
        {
            Console.WriteLine("汪……");
        }
    }
    class Cat : Animal
    {
        public override void Shout()
        {
            Console.WriteLine("喵……");
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Animal an1 = new Cat();
            Animal an2 = new Dog();
            animalShout(an1);
            animalShout(an2);
        }
        public static void animalShout(Animal an)
        {
            an.Shout();
        }
    }
}
```

#### 关键字base

当子类重写父类的方法后，子类对象将无法直接调用父类被重写的方法。
此时就需要`base`关键字

1. 调用父类的字段和方法
{% codeblock lang:c# %}
base.字段名
base.方法名(参数列表)
{% endcodeblock %}
2. 调用父类的构造方法
{% codeblock lang:c# %}
class A{}
class B : A{
    public B():base()
}
{% endcodeblock %}

#### 里氏转换原则

实现子类父类转换

1. 子类对象可以直接赋值给父类变量（向上转型）
{% codeblock lang:c# %}
Animal an = new Cat();
{% endcodeblock %}
    - 隐式转换
    - 肯定会成功
    - 向上转型成功后将不能再使用子类特有的字段
2. 父类对象赋值给子类变量需要进行强制类型转换（向下转型）
    - 显示转换，需要强制转换，前面添加括号，括号中指定将父类类型转为的子类类型，推荐使用`as`
    - 不一定成功，转型失败得到null
    - 在向下转型前，使用`is`关键字判断

```c#
using System;
namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Animal animal = new Dog();//子类Dog指向父类animal
            //使用关键字is判断animal变量是否可以转换为Dog类型
            bool result = animal is Dog;
            if (result)
            {
                Console.WriteLine("animal变量能转换为Dog类型");
            }
            else
            {
                Console.WriteLine("animal变量不能转换为Dog类型");
            }
            //Dog dog = (Dog)animal;    //使用()强制转换
            //使用as关键字
            Dog dog = animal as Dog;
            if (dog!=null)
            {
                Console.WriteLine("animal变量是Dog类型，并且能转化为Dog类型对象");
            }
            else
            {
                Console.WriteLine("转换失败");
            }
            //程序运行结果：
            //animal变量能转换为Dog类型
            //animal变量是Dog类型，并且能转化为Dog类型对象
        }
    }
}
```

#### Object类

{% note info modern %}
在C#中提供了一个Object类，它是所有类的父类，每个类都直接或间接的继承该类
{% endnote %}

### 抽象类和接口类

#### 抽象类

- C#允许在定义方法时不写方法体（**只有声明没有实现**）
- 不含方法体的方法就是**抽象方法**，用关键字`abstract`修饰
- 当一个类中包含抽象方法，该类也必须使用`abstract`修饰，这样的类就是**抽象类**
- 抽象类不能实例化对象

{% note warning modern %}
包含抽象方法的类必须声明为抽象类，但是抽象类可以不包含抽象方法
{% endnote %}
{% note warning modern %}
非抽象类继承抽象类，需要实现父类所有的抽象方法
{% endnote %}

#### 接口

- 定义接口时使用`interface`关键字
- 一个类可以实现多个接口
- 接口中的方法不是抽象方法
- 接口中的方法不能有访问权限，默认使用`public static final`
- 抽象类实现接口，可以把接口实现为抽象方法
- 接口中的方法可以实现为虚方法

{% note info modern %}
如果一个类的后面既有父类也有接口，一定是父类在前
{% endnote %}

### 异常

#### 什么是异常finally

异常的类型有多种，每个类型都代表这个指定的异常类型，所有的异常都继承自`Exception`类。

#### try...catch和finally

```c#
try{
    //程序代码块
}catch(ExceptionType e){
    //对异常的处理
}
```

1. 一般的catch代码块
{% codeblock lang:c# %}
catch{
    //对异常的处理
}
{% endcodeblock %}
2. 特定catch代码块
{% codeblock lang:c# %}
catch(Exceptiontype){
    //对异常的处理
}
{% endcodeblock %}
3. 特定对象的catch代码块
{% codeblock lang:c# %}
catch(Exceptiontype e){
    //对异常的处理
}
{% endcodeblock %}

在程序中可以使用多个catch代码块对异常进行捕获，但只有一个catch代码块可以捕获到异常，并对异常进行处理。

```c#
using System;
namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                int num1 = 10;
                int num2 = 0;
                int num3 = num1 / num2;
                Console.WriteLine("num3=" + num3);
            }
            catch (DivideByZeroException e)
            {
                //Message 属性用于解释异常的原因
                Console.WriteLine("已处理异常信息：" + e.Message);
            }
            catch (SystemException)
            {
                Console.WriteLine("已经处理系统异常");
            }
            catch
            {
                Console.WriteLine("已处理异常");
            }
            finally
            {
                Console.WriteLine("无论是否发生异常，finally代码块一定执行");
            }
        }
    }
}
```

{% note warning modern %}
在程序中使用异常语句，`try`代码块是必须有的，而`catch`代码块和`finally`代码块必须要有一个。
无论是否发生异常，finally代码块一定执行
{% endnote %}

#### 关键字throw

关键字`throw`用于抛出异常对象。

```c#
using System;
namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            throw new Exception("这是一个异常");
        }
    }
}
```

![throw](2022-11-26-20-55-47.png)

{% note info modern %}
在实际开发中`throw`和`try...catch`总是配合使用。
{% endnote %}

### 命名空间与程序集

#### 命名空间

C#中引入了命名空间的概念，可以将命名空间理解为程序定义的一个目录，使用命名空间可以有效避免类名冲突的问题。
{% codeblock lang:c# %}
namespace Example{
      Class Animal{
            void Shout(){
                Console.WriteLine("动物的叫声");
            }
      }
}
{% endcodeblock %}
{% note info modern %}
`namespace`表示命名空间的关键字，`Example`表示命名空间的名称
{% endnote %}

在实例化对象、调用方法、属性时都要使用“**命名空间名.成员**”的方式来引用。
{% codeblock lang:c# %}
static void Main(string[] args){
    Example.Animal animal= new Example.Animal();
}
{% endcodeblock %}

由于使用完全限定名的方式不利于程序代码的阅读，而且会导致代码的冗余，C#中可以使用关键字`using`添加对命名空间的引用，这样程序在调用其他命名空间的类时，就无需使用完整的限定名，直接调用即可。
{% codeblock lang:c# %}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Example;   //引用命名空间
namespace Test{
    class Test{
        static void Main(string[] args){
            Animal animal=new Animal();
        }
    }
}
{% endcodeblock %}

#### 程序集

- 目前所有程序使用的都是自己的类，但是在许多项目中可能会用到其他程序中的类，此时就需要使用程序集（扩展名为 .dll ）
- 所谓的程序集就是包含一个或多个类型的定义文件和资源文件的集合，该程序集中的文件可以被其他程序使用
- 程序集文件可分为四个部分，分别是**程序集清单**、**元数据**、**CIL**、**资源集**
  - **程序集清单**：包含描述该程序集中各元素彼此如何关联的数据集合，还包含指定该程序集的版本信息、安全标识所需的元数据、定义该程序集的范围以及解析对资源和类应用所需的元数据。
  - **元数据**：提供有关程序集中定义的类型信息，包括类型的名称、基类和类型所实现的接口等。
  - **CIL**：程序类型中所有的中间代码。
  - **资源集**：诸如位图、指针、静态文本等。

1. **创建类库**
新建项目，将项目添加到C#项目解决方案
![类库](2023-01-04-18-29-58.png)
![添加到解决方案](2023-01-04-18-37-08.png)
![目标框架](2023-01-04-18-37-42.png)

2. **编写代码**
创建项目之后，项目中默认类名为`Class1.cs`，在该类中添加代码
{% codeblock lang:c# %}
using System;
namespace ClassLibrary1
{
    public class Class1
    {
        public void Print()
        {
            Console.WriteLine("引用程序集ClassLibrary1.dll");
            Console.ReadKey();
        }
    }
}
{% endcodeblock %}
运行程序，就可以在项目路径`\bin\Debug\netstandard2.0` 目录中生成一个`ClassLibrary1.dll`程序集

3. **引用程序集**
在解决方案中创建一个**控制台应用(.NET Framework)**，选中该项目中的【引用】选项，右键单击选中【添加引用(R)...】，弹出一个【引用管理器】窗口，选择上面生成的程序集即可。
{% inlineImg 2023-01-04-21-53-19.png 200px %}{% inlineImg 2023-01-04-21-56-23.png 300px %}

4. **使用程序集中的类**
在项目中通过关键字using引入程序集`ClassLibrary1.dll`，此时就可以调用`Class1`中的类。
{% codeblock lang:c# %}
using System;
using ClassLibrary1;
//这是控制台应用
namespace ConsoleApp3
{
    class Program
    {
        static void Main(string[] args)
        {
            Class1 test = new Class1();
            test.Print();
            Console.ReadKey();
        }
    }
}
{% endcodeblock %}
运行结果为“**引用程序集ClassLibrary1.dll**”则表明程序集成功引用，并调用了该程序集中`类Class1中的Print()`方法。

## 集合

### 集合概述

C#中的集合就像一个容器专门用于存储C#类的对象。

- C#中的集合分为**泛型集合**和**非泛型集合**，二者均实现了`IEnumerable` 接口
- **泛型集合**位于`System.Collections.Generic` 命名空间中，只能存储同一类型的对象，最常见的是`List<T>`泛型集合和`Dictionary<TKey,TValue>`泛型集合。
- **非泛型集合**位于`System.Collections`命名空间中，可以存储多种类型的对象，其中最常见的是`ArrayList`集合和`Hashtable`集合。
- C#中提供了丰富的集合类。
![集合的继承体系](2023-01-03-21-56-51.png)
图中列出了程序中常用的一些集合类。其中，虚线框里填写的都是接口类型，而实线框里填写的都是具体的实现类。

### 非泛型集合

#### ArrayList集合

`ArrayList`集合就像是一个收纳盒，它可以容纳不同类型的对象。例如，可以将int、string、object等类型的对象同时加入到`ArrayList`集合中。
ArrayList集合的常用方法如下：

| 方法 | 说明 |
| ---- | ---- |
| int Add(object value) | 将元素添加到ArrayList集合 |
| void AddRange(ICollection c) | 将集合或者数组添加到ArrayList集合 |
| void Clear() | 从ArrayList中移除所有元素 |
| bool Contains(object item) | 判断某元素是否在ArrayList中 |
| int IndexOf(object value) | 查找指定元素，并返回该元素在ArrayList中第一个匹配项的索引 |
| void Insert(int index,object value) | 将元素插入ArrayList的指定索引处 |
| int LastIndexOf(object value) | 查找指定元素，并返回该元素在ArrayList中最后一个匹配项的索引 |
| void Remove(object obj) | 从ArrayList中移除指定元素的第一个匹配项 |
| void RemoveAt(int index) | 从ArrayList中移除指定索引处的元素 |
| void Reverse() | 将整个ArrayList中元素的顺序反转 |
| void Sort() | 对整个ArrayList中的元素进行排序(默认小到大) |

1. **添加元素**
调用ArrayList对象的`Add()`方法、`AddRange()`方法、`Insert()`方法来添加元素
{% codeblock lang:c# %}
using System;
using System.Collections;
namespace Program{
    class Program{
        static void Main(string[] args){
            ArrayList arr1 = new ArrayList();//创建 ArrayList 集合
            //使用不同的方法向集合中添加多个元素
            arr1.Add(666);
            arr1.AddRange(new ArrayList() { "张三", "李四" });
            arr1.Insert(2, 'a');
            ErgodicArr(arr1);
            //使用Count属性获取元素个数
            Console.WriteLine("arr1的实际长度为：" + arr1.Count);
            //使用Capacity属性获取集合的容量
            Console.WriteLine("arr1的容量为：" + arr1.Capacity);
        }
        static void ErgodicArr(ArrayList arr)
        {
            for (int i = 0; i < arr.Count; i++)
            {
                Console.WriteLine(arr[i]);
            }
            Console.WriteLine();
        }
        //666
        //张三
        //a
        //李四
        //
        //arr1的实际长度为：4
        //arr1的容量为：4
    }
}
{% endcodeblock %}
   - 需要注意的是，集合的长度就是元素的个数，集合的容量是随集合长度变化而变化的。如果集合的长度在1~4之间，容量的值就是4。如果集合的实际长度在5~8之间，那容量的值就变为8。以此类推，ArrayList的容量值总是以`4`为基本单位递增或递减。
   - 使用Insert()方法向集合中添加元素时，允许插入元素的索引值比集合的最大索引值大1，如果元素的索引值超过集合的最大索引值且范围在1以上(`arr.Insert(arr.Count+1,"异常")`)，编译时就会报异常。

2. **删除元素**
调用ArrayList的`Remove()`方法或`RemoveAt()`方法或`Clear()`方法删除元素
{% codeblock lang:c# %}
using System;
using System.Collections;
namespace Program{
    class Program{
        static void Main(string[] args){
            ArrayList arr1 = new ArrayList();
            //将新建的集合对象添加到arr1集合的末尾
            arr1.AddRange(new ArrayList() { "张三","李四","王五"});
            ErgodicArr(arr1);//1. 添加元素中有定义
            arr1.Remove("张三"); //从集合中移除指定元素的第一个匹配项
            ErgodicArr(arr1);
            arr1.RemoveAt(0);   //从集合中移除指定索引位置的元素
            ErgodicArr(arr1);
            arr1.Clear();   //删除集合中的所有元素
            Console.WriteLine("arr1的实际长度为：" + arr1.Count);
            Console.WriteLine("arr1的容量为：" + arr1.Capacity);
        }
    }
}
//张三
//李四
//王五
//
//李四
//王五
//
//王五
//
//arr1的实际长度为：0
//arr1的容量为：4
{% endcodeblock %}

3. **修改元素**
{% codeblock lang:c# %}
using System;
using System.Collections;
namespace Program{
    class Program{
        static void Main(string[] args){
             ArrayList arr1 = new ArrayList(new ArrayList() { "张三","李四","王五"});
            Console.WriteLine("修改前的元素：");
            ErgodicArr(arr1);//1. 添加元素中有定义
            arr1[0] = 1;
            arr1[1] = 2;
            arr1[2] = 3;
            Console.WriteLine("修改后的元素：");
            ErgodicArr(arr1);
        }
    }
}
//修改前的元素：
//张三
//李四
//王五
//
//修改后的元素：
//1
//2
//3
{% endcodeblock %}

4. **查询元素**
调用`IndexOf()`方法或`LastIndexOf()`方法查询指定元素的索引，调用`Contains()`方法判断集合中是否存在某个元素
{% codeblock lang:c# %}
using System;
using System.Collections;
namespace Program{
    class Program{
        static void Main(string[] args){
            ArrayList arr1 = new ArrayList(new ArrayList() { 1, 2, 3, 1 });
            //查找指定元素，并返回该元素在集合中第一个匹配项的索引
            int index = arr1.IndexOf(1);
            Console.WriteLine("集合中第一个1的索引值为：" + index);
            //查找指定元素，并返回该元素在集合中的最后一个匹配项的索引
            int lastIndex = arr1.LastIndexOf(1);
            Console.WriteLine("集合中最后一个1的索引值为：" + lastIndex);
            //判断元素是否在集合中
            bool result = arr1.Contains(2);
            Console.WriteLine("集合中是否包含元素2：" + result);
            //对集合中的元素按照默认顺序进行排序
            arr1.Sort();
            ErgodicArr(arr1);
        }
        static void ErgodicArr(ArrayList arr)
        {
            for (int i = 0; i < arr.Count; i++)
            {
                Console.Write(arr[i]+" ");
            }
            Console.WriteLine();
        }
        //集合中第一个1的索引值为：0
        //集合中最后一个1的索引值为：3
        //集合中是否包含元素2：True
        //1 1 2 3
    }
}
{% endcodeblock %}

##### 通过foreach循环遍历ArrayList集合

{% codeblock lang:c# %}
foreach (var item in collection){
    执行语句;
}
{% endcodeblock %}

item变量用于存储每次遍历的元素，默认情况下item为var类型，in为关键字，collection表示被遍历的集合。

{% note warning modern %}
foreach循环只能对遍历的元素进行读操作，而且只能单向遍历，也就是一个元素在整个foreach循环中只能被访问一次，因此在遍历集合中的元素时可以优先选择foreach循环，如果需要修改或多次访问集合中某个元素时，考虑使用for循环。
{% endnote %}

#### Hashtable集合

在ArrayList集合中查询某个元素时，是从索引为0的元素逐一查询的，这就好像是在一本没有目录的字典中查询某个汉字一样，查询效率非常低。

C#中提供了一个Hashtable集合，该集合又被称为键值对集合，所谓键就类似于字典中的目录，值就类似于字典中的具体汉字信息，键与值是一一对应的关系，通过唯一的键能找到对应的值，因此Hashtable集合的这种特性大大提高了查询元素的效率。

Hashtable集合中的常用方法如下：

| 方法 | 说明 |
| ---- | ----- |
| void Add(object key,object value) | 将带有指定键和值的元素添加到Hashtable集合中 |
| void Clear() | 从Hashtable集合中移除所有元素 |
| bool Contains(object key) | 判断Hashtable集合中是否包含指定的键 |
| bool ContainsValue(object value) | 判断Hashtable集合是否包含指定的值 |
| void Remove(object key) | 从Hashtable集合中移除带有指定键的元素 |

{% codeblock lang:c# %}
using System;
using System.Collections;
namespace Program{
    class Program{
        static void Main(string[] args){
            Hashtable ht = new Hashtable();//创建Hashtable集合
            ht.Add(1, "张三");
            ht.Add('A', "李四");
            ht.Add("BB", "王五");
            ErgodicHash(ht);
            ht.Remove("BB");//移除键为"BB"的元素
            ErgodicHash(ht);
            ht.Clear(); //移除ht中的所有元素
            Console.WriteLine("集合ht中元素的个数：" + ht.Count);
        }
        static void ErgodicHash(Hashtable ht)
        {
            foreach (object key in ht.Keys)
            {
                Console.WriteLine(key + ":" + ht[key]);
            }
            Console.WriteLine();
        }
    }
}
{% endcodeblock %}

{% note warning modern %}
Hashtable集合中的键和值的默认类型都是object，因此可以向该集合的键和值中添加任意类型的对象。
{% endnote %}

##### Hashtable集合的多种遍历方式

{% codeblock lang:C# %}
using System;
using System.Collections;
namespace Program{
    class Program{
        static void Main(string[] args){
            Hashtable ht = new Hashtable();//创建Hashtable集合
            ht.Add(1, "张三");
            ht.Add('A', "李四");
            ht.Add("BB", "王五");
            //使用foreach语句来循环遍历集合中的值
            foreach (object value in ht.Values)
            {
                Console.WriteLine("当前遍历到的值为：" + value);
            }
            //使用foreach语句来循环遍历集合对象本身
            foreach (DictionaryEntry dicEn in ht)
            {
                Console.WriteLine(dicEn.Key + ":" + dicEn.Value);
            }
            //当前遍历到的值为：李四
            //当前遍历到的值为：王五
            //当前遍历到的值为：张三
            //A:李四
            //BB:王五
            //1:张三
        }
    }
}
{% endcodeblock %}

{% note warning modern %}
在遍历集合对象时，集合对象的类型是DictionaryEntry，通过该类型的对象dicEn可以获取集合中的键与值。
{% endnote %}

### 泛型集合

#### List&lt;T&gt;泛型集合

C#提供了一个`List<T>`泛型集合，该集合不仅具备`ArrayList`集合的功能，而且还可以保证`List<T>`集合只能添加同类型元素，不会出现类型转换的问题。

{% codeblock lang:c# %}
using System;
using System.Collections.Generic;
namespace Program{
    class Program{
        static void Main(string[] args){
            //创建一个List<string>泛型集合
            List<string> list = new List<string>();
            //向List<string>集合中添加3个string类型元素
            list.Add("Apple");
            list.Add("Banana");
            list.Add("Orange");
            foreach (string item in list)
            {
                Console.Write(item + " ");
            }
        }
    }
}
{% endcodeblock %}

#### Dictionary&lt;TKey,TValue&gt;泛型集合

`Hashtable`集合中的键与值在默认情况下都是object类型，这使得在取值时不可避免的遇到类型转换的问题。为了解决这个问题，C#中提供了泛型集合`Dictionary<Tkey,TValue>`，该集合中的键与值都只能是一种类型。

{% codeblock lang:c# %}
using System;
using System.Collections.Generic;
namespace Program{
    class Program{
        static void Main(string[] args){
            Dictionary<int, string> dic = new Dictionary<int, string>();
            dic.Add(1, "张三");
            dic.Add(2, "李四");
            dic.Add(3, "王五");
            //通过遍历集合中的键获取对应的值
            foreach (int key in dic.Keys)
            {
                Console.WriteLine(key + ":" + dic[key]);
            }
            Console.WriteLine();
            //从集合中移除指定的键值
            dic.Remove(2);
            //通过遍历键值对的方式来获取键与值
            foreach (KeyValuePair<int,string> kv in dic)
            {
                Console.WriteLine(kv.Key + ":" + kv.Value);
            }
        }
    }
}
{% endcodeblock %}

{% note warning modern %}
集合`Dictionary<TKey,TValue>`中的键值对类型为`KeyValuePair<int,string>`，通过该类型的对象就可以获取集合中的键和值
{% endnote %}

#### 自定义泛型

在程序开发中，如果泛型集合`List<T>`与`Dictionary<TKey,TValue>`都不能满足实际需求，此时还可以自定义泛型。自定义泛型可以根据不同需求，灵活的设计集合中的属性和方法。

{% codeblock lang:c# %}
[修饰符] class类名<类型占位符>{
      程序代码
}
{% endcodeblock %}

通过自定义泛型格式可以看出，自定义泛型与普通类的语法格式相似，唯一的区别是多了一个类型占位符，类型占位符通常用T来表示。

{% codeblock lang:c# %}
using System;
namespace Program{
    class Program{
        static void Main(string[] args){
            //创建自定义泛型对象myClass
            MyClass<string> myClass = new MyClass<string>();
            myClass.Add("张三");
            Console.WriteLine("自定义泛型中的元素：" + myClass.Get());
        }
    }
    //自定义泛型MyClass<T>
    class MyClass<T> {
        T myElement; //定义一个T类型字段
        //创建Add()方法，指定参数类型为T
        public void Add(T elem)
        {
            this.myElement = elem;
        }
        //创建Get()方法，指定返回类型为T
        public T Get()
        {
            return this.myElement;
        }
    }
}
{% endcodeblock %}

## WinForm窗体

### 创建WinFrom窗体

1. 创建项目
![创建WinFrom窗体](2022-11-26-21-41-40.png)

2. 向窗体中添加控件
选中导航栏中的【视图】→【工具箱】**快捷键**`Ctrl+Alt+X`
![向窗体中添加控件](2022-11-26-22-30-39.png)

3. 运行结果
单击工具栏中的**启动按钮**或者按快捷键`F5`启动程序，显示窗体的运行结果
![运行结果](2022-11-26-22-35-50.png)
之所以出现这样的结果，是因为当程序运行时，系统首先查找`Program.cs`文件中的`Application.Run()`方法，该方法就**是窗体程序的入口**，该方法中**传递的参数是运行程序后首先出现的窗体对象**。

### Windows窗体应用程序结构

{% pullquote right %}
![Windows窗体应用程序结构](2022-11-26-22-38-18.png)
{% endpullquote %}

- `Properties`:用于设置项目的属性
- `引用`:用于设置对其他项目命名空间的引用
- `App.config`:用于设置数据库的配置信息
- `Form1.cs`:用于设置窗体的界面以及编写逻辑代码
- `Form1.Designer.cs`:用于在窗体类中自动生成控件的初始化代码
- `Form1.resx`:只有在创建控件对象或为控件注册事件时才会出现，用于存放窗体中使用的资源信息
- `Program.cs`:用来设置项目运行时的主窗体

在WinFrom窗体应用程序中，最常用的文件为`Form1.cs`、`Form1.Designer.cs`、`Program.cs`

{% tabs WinForm %}
<!-- tab Form1.cs -->
- `Form1.cs`文件本身由`Form.cs[设计]`与`Form1.cs逻辑代码`两个部分构成
- `Form.cs[设计]`用于设计窗体
- `Form1.cs逻辑代码`用于存放交互功能的逻辑代码

{% note info modern %}
切换：
右键单击`Form1.cs`文件 →【查看代码】
右击单击`Form1.cs`文件 →【查看设计器】
{% endnote %}
<!-- endtab -->

<!-- tab Form1.Designer.cs -->
```c#
namespace WindowsFormsApp1
{
    partial class Form1
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }
        #region Windows 窗体设计器生成的代码
        #endregion
        private System.Windows.Forms.Label label1;
    }
}
```

在`Form1.Designer.cs`的末尾，自动生成了一行代码，表示`Form1`窗体中添加了一个名称为`label1`的文本
<!-- endtab -->

<!-- tab Program.cs -->
```c#
using System;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    static class Program
    {
        /// <summary>
        /// 应用程序的主入口点。
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }
    }
}
```
<!-- endtab -->
{% endtabs %}

### WinForm窗体属性

窗体常用属性：

| 属性 | 描述 | 可选参数 |
| ---- | ---- | ------ |
| `Size` | 窗体的宽高 |
| `MinimumSize` | 窗体最小宽高 |
| `MaximumSize` | 窗体最大宽高 |
| `Text` | 窗体标题栏上显示的内容 | `string` |
| `StartPosition` | 窗体第一次出现的位置 |`CenterParent`:设置窗体在父窗体居中显示<br>`CenterScreen`:设置窗体在当前显示窗口居中<br>`Manual`:窗体位置由Location属性指定<br>`WindowsDefaultBounds`:设置窗体为Windows系统默认位置<br>`WindowsDefaultLocation`:和前者差不多
| `FormBoarderStyle` | 窗体的边框和标题栏的外观和行为 |
| `Icon` | 窗体的系统菜单框中显示的图标 | 图标资源格式必须为`.ico` |
| `IsMdiContainer` | 窗体是否为MDI容器 |
| `BackgroundImage` | 窗体背景图像 | 【本地资源】 or 【项目文件资源】<br> 项目资源文件导入的图片保存到项目资源文件`Resources`文件夹中<br>本地资源方式设置的背景图片保存在`Form1.resx` 文件中 |
| `BackgroundImageLayout` | 窗体的背景布局 |
| `MaximizeBox` | 是否显示窗体最大化按钮，默认`True` | `True` or `False` |
| `MinimizeBox` | 是否显示窗体最小化按钮，默认`True` | `True` or `False` |
| `Cursor` | 鼠标在窗体上的形状 ||

### WinFrom 窗体的事件

Windows 是事件驱动的操作系统，对From(窗体)类的任何交互都是基于事件来实现的。

| 事件 | 描述 |
| ---- | ---- |
| `Load` | 窗体加载时被触发 |
| `MouseClick` | 鼠标单击事件 |
| `MouseDoubleClick` | 鼠标双击事件 |
| `MouseMove` | 窗体移动鼠标事件 |
| `KeyDown` | 键盘按下事件 |
| `KeyUp` | 键盘释放时触发事件 |
| `FormClosing` | 窗体关闭时事件 |

{% note info modern %}
在【属性】窗口单击⚡图标，列出窗体所有事件
{% endnote %}

#### 设置FormClosing事件

设置名称`Form1Closing`
双击进入事件方法中

```c#
/// <summary>
/// 窗体关闭时触发
/// </summary>
/// <param name="sender">表示事件源，这里指发起该事件的对象关闭按钮</param>
/// <param name="e">事件所携带的信息</param>
private void Form1Closing(object sender, FormClosingEventArgs e)
{
    //MessageBox.Show()方法显示具有文本、标题和按钮的消息框
    if (MessageBox.Show("是否关闭窗体？","询问",MessageBoxButtons.YesNo)==DialogResult.Yes)
    {
        e.Cancel = false;   //关闭窗体
    }
    else
    {
        e.Cancel = true;    //取消关闭
    }
}
```

### MDI窗体

#### MDI窗体的概念

**单文档窗体**(Single Document InterFace,SDI)，SDI窗体只能在窗体中显示一个文档。
如果需要在一个窗体中打开多个文档，需要使用**多文档窗体**(Multiple-Document Interface,MDI)。
MDI窗体用于在一个窗体中同时显示多个文档，每个文档显示在各自的窗体中。

#### 设置MDI窗体

1. 设置父窗体
将`IsMdiContainer`属性值设置为`True`

2. 设置子窗体
通过设置窗体的`MdiParent`属性将该窗体设置为子窗体
{% codeblock lang:c# %}
 private void Form2_Load(object sender, EventArgs e)
        {
            Form1 form1 = new Form1();  //创建Form1窗体对象
            form1.MdiParent = this;     //将Form1窗体设置为子窗体
            form1.Show();               //调用Show()方法显示Form1窗体
            Form3 form3 = new Form3();
            form3.MdiParent = this;
            form3.Show();
        }
{% endcodeblock %}

#### MDI子窗体的排列

使用Form 类的`LayoutMdi(MdiLayout value)`方法排列多文档界面父窗体中的子窗体。
MdiLayout枚举用于指定MDI父窗体中子窗体的布局

| 枚举成员 | 描述 | Show() |
| ------- | ---- |---- |
| `Cascade` | 所有MDI子窗体均层叠在MDI父窗体工作区内 | ![Cascade层叠](2022-11-27-10-50-58.png) |
| `TileHorizontal` | 所有MDI子窗体均水平平铺在MDI父窗体工作区内 | ![TileHorizontal水平平铺](2022-11-27-10-54-28.png) |
| `TileVertical` | 所有MDI子窗体均垂直平铺在MDI父窗体工作区内 | ![TileVertical垂直平铺](2022-11-27-10-57-08.png) |

{% label 1.创建程序 pink %}
创建项目名为`MDISort`的**Windows窗体应用程序**。
{% label 2.设置父窗体 pink %}

- `Text`:Form_MDIParent
- `Name`:Form_MDIParent
- `IsMdiContainer`:`True`

{% label 3.在父窗体中添加菜单栏 pink %}

- 添加【菜单和工具栏】→【MenuStrip】控件
- 设置4个横向菜单项的文本为“显示子窗体”“水平平铺”“垂直平铺”“层叠平铺”
- Name属性分别为`ShowSubform` `HorizontalTile` `VerticalTile` `StackedTiling`

{% label 4.在项目中添加子窗体 pink %}

添加3个子窗体，命名为 `Form_ChildOne.cs` `Form_ChildTwo.cs` `Form_ChildThree.cs`

{% label 5.实现【显示子窗体】菜单项功能 pink %}
设置`Click`单击事件**ShowSubform_Click()**

```c#
private void ShowSubform_click(object sender, EventArgs e)
{
    //显示Form_ChildOne窗体
    Form_ChildOne form_ChildOne = new Form_ChildOne();
    form_ChildOne.MdiParent = this;
    form_ChildOne.Show();
    //显示Form_ChildTwo窗体
    Form_ChildTwo form_ChildTwo =new Form_ChildTwo();
    form_ChildTwo.MdiParent = this;
    form_ChildTwo.Show();
    //显示Form_ChildThree窗体
    Form_ChildThree form_ChildThree = new Form_ChildThree();
    form_ChildThree.MdiParent = this;
    form_ChildThree.Show();
}
```  

{% label 6.实现排列子窗体功能 pink %}

- 设置【水平平铺】`Click`单击事件**HorizontalTile_Click()**
- 设置【垂直平铺】`Click`单击事件**VerticalTile_Click()**
- 设置【层叠平铺】`Click`单击事件**StackedTiling_Click()**

{% codeblock lang:c# %}
private void HorizontalTile_Click(object sender, EventArgs e)
{
    //调用LayoutMdi()方法，实现在MDI父窗体排列子窗体的功能
    LayoutMdi(MdiLayout.TileHorizontal);
}
private void VerticalTile_Click(object sender, EventArgs e)
{
    LayoutMdi(MdiLayout.TileVertical);
}
private void StackedTiling_Click(object sender, EventArgs e)
{
    LayoutMdi(MdiLayout.Cascade);
}
{% endcodeblock %}

## WinForm控件

### WinForm简单控件

#### 控件的常用属性与事件

{% note info modern %}
在C#中，所有控件都直接或间接的继承自`Control`类
{% endnote %}

| 属性 | 描述 |
| ---- | ---- |
| `Name` | 控件对象名称 |
| `Text` | 控件关联文本|
| `Visible` | 控件可见性 |
| `BackColor` | 控件背景颜色 |
| `Cursor` | 移至控件指针样式 |
| `Dock` | 定义要绑定到容器的控件边框 |
| `Enabled` | 是否启用控件 |
| `Font` | 控件中文本的字体 |
| `ForeColor` | 控件的前景色，用于显示文本 |
| `Size` | 控件的大小（像素） |
| `Tag` |  与对象关联的用户定义数据 |
| `TextAlign` | 控件文本对齐方式 |

| 事件 | 描述 |
| ---- | ---- |
| `Click` | 控件单击事件 |
| `MouseEnter` | 鼠标进入控件可见部分发生 |
| `MouseLeave` | 鼠标离开控件可见部分发生 |
| `BackColorChanged` | 在控件的`BackColor`属性值更改时发生 |
| `FontChanged` | 在控件的`Font`属性值更改时发生 |

#### Button控件、TextBox控件、Label控件

登录窗体

{% hideToggle 登录窗体 %}
**1.创建项目**

- 项目名称：Login
- 项目类型:Windows窗体应用程序

**2.认识工具箱窗口**
【视图】→【工具箱】(`Ctrl+Alt+X`)
【工具箱】对WinForm的所有控件进行了分类
![【工具箱】对WinForm的所有控件进行了分类](2022-11-27-11-27-06.png)

**3.设计登录窗体**
自定义布局

**4.实现登录功能**
{% codeblock lang:c# %}
private void LoginClick(object sender, EventArgs e)
{
    //判断输入的用户名和密码是否为空
    if (!string.IsNullOrEmpty(textName.Text) && !string.IsNullOrEmpty(textPassword.Text))
    {
        //用户名为test，密码为123，则登录成功
        if (textName.Text=="test"&& textPassword.Text=="123")
        {
            MessageBox.Show("登录成功!");
        }
        else
        {
            MessageBox.Show("用户名或者密码错误!");
            textPassword.Text = "";
        }
    }
    else
    {
        MessageBox.Show("用户名或密码不能为空！");
    }
}
{% endcodeblock %}
`IsNullOrEmpty()`方法判断文本框是否为空。

**5.运行程序，验证登录功能**
`F5`

{% endhideToggle %}

#### RichTextBox控件

**RichTextBox控件**允许用户输入和编辑文本，提供和比**TextBox控件**更高级的格式属性。

| 属性 | 描述 |
| ---- | ---- |
| `Multiline` | 控制文本是否可以跨行显示 |
| `ScrollBars` | 设置滚动条的显示样式，`Multiline`：`True`,才会显示滚动条样式|
| `SelectionFont` | 获取或设置字体大小和样式 |
| `SelectionColor` | 获取或设置字体的颜色 |
| `SelectionBullet` | 将选定的段落设置为项目符号列表的格式 |
| `SelectionIndent` | 获取或设置以像素为单位的长度作为缩进量，对所选内容排版 |

`ScrollBars` 属性有7个属性值

| 属性值 | 描述 |
| ---- | ------ |
| `Both` | 只有当文本超过控件的宽度或长度时，才显示水平滚动条或垂直关东条，或两个滚动条都显示 |
| `None` | 从不显示任何类型的滚动条 |
| `Horizontal` | 当文本超过控件的宽度时，显示水平滚动条，必须将`WordWrap`属性（多行编辑控件是否自动换行）的值为false，才会出现这种情况 |
| `Vertical` | 只有文本超过控件高度时，才会显示垂直滚动条 |
| `ForcedHorizontal` | `WordWrap`:`false`,显示水平滚动条，文本未超过控件宽度时，滚动条显示为浅灰色 |
| `ForcedVertical` | 始终显示垂直滚动条，文本未超过控件宽度时，滚动条显示为浅灰色|
| `ForcedBoth` | 始终显示垂直滚动条，`WordWrap`:`false`,显示水平滚动条，文本未超过控件宽度时，滚动条显示为浅灰色 |

{% note info modern %}
**RichTextBox控件**中不仅可以显示普通文本，还可以显示**超链接**，超链接的样式为下划线形式
{% endnote %}

{% hideToggle RichTextBox控件用法 %}
**1.创建项目**

- 项目名称：RichTextBox
- 项目类型:Windows窗体应用程序

**2.设计项目的窗体**
步骤

- 修改`Form1.cs`文件名为`RichTextBox.cs`
- `Text`:有格式文本框
- 添加**RichTextBox控件**
- 控件`Multiline`:`True`
- `ScrollBars`:`Both`
- `WordWrap`(自动换行):`False`

**3.在RichTextBox控件添加超链接**
设置**窗体**的`Load`事件`RichTextBox_Load()`
{% codeblock lang:c# %}
private void RichTextBox_Load(object sender, EventArgs e)
{
    Font font1 = new Font("宋体", 8, FontStyle.Bold);
    richTextBox1.SelectionFont = font1;
    richTextBox1.SelectionColor = Color.Red;
    richTextBox1.AppendText(
        "百度：https://www.baidu.com \n" +
        "CSDN：https://www.csdn.net \n" +
        "网易：https://www.163.com \n");
    Font font2 = new Font("楷体", 9, FontStyle.Bold);
    richTextBox1.SelectionFont = font2;
    richTextBox1.SelectionColor = Color.Green;
    richTextBox1.AppendText(
        "腾讯：https://www.qq.com \n" +
        "qq空间：https://www.qzone.com");
}
{% endcodeblock %}

**4.开启超链接**
设置**RichTextBox控件**的`LinkClicked`（单击文本中的超链接时发生）事件`RichTextBox_LinkClicked()`
{% codeblock lang:c# %}
using System.Drawing;
private void RichTextBox_LinkClicked(object sender, LinkClickedEventArgs e)
{
    Process.Start(e.LinkText);
}
{% endcodeblock %}

**5.运行程序，验证登录功能**
`F5`
{% endhideToggle %}

#### CheckBox控件、RadioButton控件

- **CheckBox（复选框）**，可以被同时选中
- **RadioButton（单选按钮）**多个RadioButton控件位于同一组，只能有一个被选中
- 二者都只有选中或未选中两种状态

{% hideToggle 注册窗体 %}
**1.创建项目**

- 项目名称：Register
- 项目类型:Windows窗体应用程序

**2.设计项目的窗体**
步骤

- 修改`Form1.cs`文件名为`RegisterForm.cs`
- `Text`:注册
- 添加4个**Label控件**，设置`Text`：“账户""密码”“性别”“爱好”
- 添加2个**TextBox控件**用于数账户与密码
- “性别”添加2个**RadioButton控件**，设置`Text`：“男♂”“女♀”
- “爱好”添加3个**CheckBox控件**，设置`Text`：“篮球🏀”“游泳🏊‍”“看书📕”
- 添加2个**Button控件**，设置`Text`：“注册”“重置”

**3.实现窗体的加载事件**
设置窗体的`Load`事件`RegisterForm_Load()`
{% codeblock lang:c# %}
private void RegisterForm_Load(object sender, EventArgs e)
{
    //窗体在加载时设置radioButton_Man值为true
    radioButton_Man.Checked = true;
}
{% endcodeblock %}

**4.实现注册功能**
设置“注册”按钮的`Click`事件`Register_Click()`
{% codeblock lang:c# %}
private void Register_Click(object sender, EventArgs e)
{
    //设置标记变量
    bool flag = false;
    //遍历窗体中所有控件
    foreach (Control item in this.Controls)
    {
        //判断当前控件是否为空
        if (string.IsNullOrEmpty(item.Text))
        {
            flag = true;
        }
    }
    if (flag == true)
    {
        MessageBox.Show("请确定已填写全部信息！");
    }
    else
    {
        MessageBox.Show("注册成功");
    }
}
{% endcodeblock %}

**5.实现重置用户信息的功能**
设置“重置”按钮的`Click`事件`Reset_Click()`
{% codeblock lang:c# %}
private void Reset_Click(object sender, EventArgs e)
{
    //遍历窗体中所有控件
    foreach (Control item in this.Controls)
    {
        if(item is TextBox)
        {
            item.Text = "";
        }
        else if (item is RadioButton)
        {
            radioButton_Man.Checked = true;
        }
        else if (item is CheckBox)
        {
            CheckBox check = (CheckBox)item;
            check.Checked = false;
        }
    }
}
{% endcodeblock %}

**6.运行程序，验证注册和重置功能**
`F5`
{% endhideToggle %}

#### GroupBox容器

**GroupBox容器**可以使窗体的布局整齐、美观，对窗体中的控件进行统一管理。

需求：由于窗体中所有的**RadioButton控件**只能选中一个，因此，无法完成两个题的解答，解决这个问题可以使用**GroupBox容器**实现。

{% hideToggle GroupBox的使用 %}
**1.创建项目**

- 项目名称：GroupBox
- 项目类型:Windows窗体应用程序

**2.设计容器窗体**
步骤

- 修改`Form1.cs`文件名为`GroupBoxForm.cs`
- `Text`:容器
- 添加2个**GroupBox容器**，设置`Text`：“题目一""题目二”
- 题目自定义

**3.运行程序，验证容器的分组功能**
`F5`
{% endhideToggle %}

#### TreeView控件

- 在程序开发中，经常需要设计树状结构目录，例如Windows中资源管理器
- **TreeView（树状图）控件**就是以树状结构显示数据
- 在**TreeView控件**中每个节点都有一个与之相关的`TreeNode`对象
- 每个`TreeNode`对象都包含一个`Nodes`属性和一个`Level`属性
- `Nodes`表示TreeNode对象的集合
- `Level`用于获取TreeNode对象在控件中的深度（深度从0开始）

{% hideToggle TreeView的使用 %}
**1.创建项目**

- 项目名称：TreeView
- 项目类型:Windows窗体应用程序

**2.设计【树状图】窗体**
步骤

- 修改`Form1.cs`文件名为`TreeViewForm.cs`
- `Text`:树状图
- 添加1个**TreeView控件**，单击该控件【属性】窗口中`Nodes`属性下的**编辑节点**—→【TreeNode编辑器】界面
- 添加节点与子节点

**3.实现【树状图】船体的加载功能**
通过设置【树状图】窗体的`Load`事件`TreeViewForm_Load()`
{% codeblock lang:c# %}
private void TreeViewForm_Load(object sender, EventArgs e)
{
    //ExpandAll()用于展开所有树节点
    treeView1.ExpandAll();
}
{% endcodeblock %}

**4.实现TreeView控件更改选定内容的功能**
通过设置**TreeView控件**的`AfterSelect`(更改选定内容)事件`treeView1_AfterSelect()`
{% codeblock lang:c# %}
private void treeView1_AfterSelect(object sender, TreeViewEventArgs e)
{
    if (treeView1.SelectedNode.Level!=0)
    {
        //获取当前TreeView控件中被选中的树节点的Text属性
        string text = treeView1.SelectedNode.Text;
        string parentText = treeView1.SelectedNode.Parent.Text;
        MessageBox.Show("您现在单击到的是：" + parentText + text);
    }
}
{% endcodeblock %}
**5.运行程序**
`F5`
{% endhideToggle %}

#### Timer控件

**Timer控件**用于周期性执行某个操作。

| 属性 | 描述 |
| ---- | ---- |
| `Enabled` | 获取或设置计时器是否正运行 |
| `Interval` | 用于设置**Timer控件**执行一次的间隔时间（毫秒为单位）|

| 方法 | 描述 |
| ---- | ---- |
| `Start` | 启动计时器 |
| `Stop` | 停止计时器 |

{% hideToggle Timer控件的使用 %}
**1.创建项目**

- 项目名称：Timer
- 项目类型:Windows窗体应用程序

**2.设计窗体界面**
步骤

- 修改`Form1.cs`文件名为`TimerForm.cs`
- `Text`:双色球选号器
- 添加9个**Label控件**，设置其中2个`Text`：“红球”“蓝球”；另外7个`Text`：“00”`padding`:`10,10,10,10`
- 添加2个**Button控件**作为【开始】【停止】按钮
- 添加**Timer控件**，设置`Interval`:200

**3.实现双色球选号的功能**
设置按钮`Click`事件
{% codeblock lang:c# %}
private void button_Start_Click(object sender, EventArgs e)
{
    timer1.Start();
}
private void timer1_Tick(object sender, EventArgs e)
{
    Random random = new Random();
    label3.Text = random.Next(1, 33).ToString("00");
    label4.Text = random.Next(1, 33).ToString("00");
    label5.Text = random.Next(1, 33).ToString("00");
    label6.Text = random.Next(1, 33).ToString("00");
    label7.Text = random.Next(1, 33).ToString("00");
    label8.Text = random.Next(1, 33).ToString("00");
    label9.Text = random.Next(1, 33).ToString("00");
}
private void button_Stop_Click(object sender, EventArgs e)
{
    timer1.Stop();
}
{% endcodeblock %}
**4.运行程序**
`F5`
{% endhideToggle %}

#### ProgressBar控件

- **ProgressBar控件**用于表示进度条
- `Value`表示进度条当前位置
- `Minimum`表示进度条范围下限
- `Maximum`表示进度条范围上限

{% hideToggle ProgressBar的使用 %}
**1.创建项目**

- 项目名称：ProgressBar
- 项目类型:Windows窗体应用程序

**2.设计窗体界面**
步骤

- 修改`Form1.cs`文件名为`ProgressBarForm.cs`
- `Text`:英雄血条
- 添加1个**Label控件**，设置`Text`：“英雄血条”
- 添加**ProgressBar控件**设置`Name`:pbBlood,`Minimum`:0,`Maximum`:100
- 添加1个**Label控件**，设置`Text`：“血量”,`Name`:labelBlood
- 添加2个**Button控件**作为【加血】【减血】按钮

**3.实现窗体加载功能**
设置窗体`Load`事件
{% codeblock lang:c# %}
private void ProgressBarForm_Load(object sender, EventArgs e)
{
    //窗体加载时获取当前的血量值
    labelBlood.Text = pbBlood.Value.ToString();
}
{% endcodeblock %}

**4.实现加血功能**
{% codeblock lang:c# %}
private void button1_Click(object sender, EventArgs e)
{
    //当血量小于最大值时，血量增加5
    if (pbBlood.Value < pbBlood.Maximum)
    {
        pbBlood.Value += 5;
    }
    else
    {
        MessageBox.Show("英雄血已经加满！");
    }
    labelBlood.Text = pbBlood.Value.ToString();
}
{% endcodeblock %}

**5.实现减血功能**
{% codeblock lang: %}
private void button2_Click(object sender, EventArgs e)
{
    if (pbBlood.Value > pbBlood.Minimum)
    {
        pbBlood.Value -= 5;
    }
    else
    {
        MessageBox.Show("英雄死亡！");
    }
    labelBlood.Text = pbBlood.Value.ToString();
}
{% endcodeblock %}

**6.运行程序**
`F5`
{% endhideToggle %}

### WinForm列表和数据控件

WinForm中的列表和数据控件包括**ListBox列表框**、**ComboBox下拉列表框**、**ListView列表**和**DataGridView数据控件**。

#### ListBox控件

ListBox控件又成为列表框，他用于显示选项列表，用户可以从中选择一项或多项，如果列表中选项的总数超过可以显示的总数，则控件会自动添加滚动条。

**1.在ListBox控件中添加和移除项。**
在ListBox列表框中选项的集合通过Items属性表示，该属性提供了一个`Add()`方法，用于向ListBox列表框中添加数据，另外，Items属性也提供了一个`RemoveAt()`方法，用于删除在ListBox列表框选中的数据。

{% codeblock lang:c# 向ListBox控件中添加选项 %}
listBox1.Items.Add(“华为手机”);
listBox1.Items.Add(“小米手机”);
listBox1.Items.Add(“Oppo手机”);
listBox1.Items.Add(“荣耀手机”);
listBox1.Items.Add(“魅族手机”);
listBox1.Items.Add(“Vivo手机”);
{% endcodeblock %}

删除**ListBox控件**中选中项
{% codeblock lang:c# Button控件Click事件 %}
//获取到ListBox控件中被选中项的从零开始的索引
int index = listBox1.SelectedIndex;
listBox1.Items.RemoveAt(index);
{% endcodeblock %}
**2.创建显示滚动条的列表控件**

- 通过设置**ListBox控件**的`HorizontalScrollbar`属性和`ScrollAlwaysVisible`属性的值可以使列表框显示滚动条。
- 如果将`HorizontalScrollbar`属性设置为True，则显示水平滚动条，如果设置为False，则不显示水平滚动条。
- 如果将`ScrollAlwaysVisible`属性设置为true，则会显示垂直滚动条，如果设置为False，，则不显示垂直滚动条。

{% codeblock lang:c# 使ListBox控件显示水平和垂直方向的滚动条
 %}
listBox1.HorizontalScrollbar = true;   //使列表框水平滑动
listBox1.ScrollAlwaysVisible = true;   //使列表框垂直滑动
{% endcodeblock %}
**3.在ListBox列表框选择多项**
在ListBox列表框中选择多个选项的操作是通过设置`SelectionMode`属性的值实现的，`SelectionMode`属性值是`SelectionMode`**枚举**成员之一，默认为`SelectionMode.One`。	

|枚举成员 | 描述 |
| ------ | ---- |
| `MultiExtended` | 可以选择多项，并且可使用【Shift】键、【Ctrl】键以选择内容 |
| `MultiSimple` | 可以选择多项 |
| `None` | 无法选择项 |
| `One`| 只能选择一项 |

{% codeblock lang:c# 实现在控件中选择多个项，并且用户可使用SHIFT键、CTRL键和方向键选择内容的功能
 %}
listBox1.SelectionMode = SelectionMode.MultiExtended;
{% endcodeblock %}

#### ComboBox控件

与ListBox相比，ComboBox下拉列表框也是用来显示列表的，不同的是，它主要用于在下拉组合框中显示数据，并且**该列表框中的选项只能被选中一个**。

{% hideToggle ComboBox控件 %}
**1.创建项目**

- 项目名称：ComboBox
- 项目类型:Windows窗体应用程序

**2.设计窗体界面**
步骤

- 修改`Form1.cs`文件名为`ComboBoxForm.cs`
- `Text`:省市选择
- 添加一个Label控件，设置`Text`:请选择所在城市
- 添加2个ComboBox控件，设置`Name`:"cmbProvince""cmbCity"用于表示省市

**3.实现窗体的加载事件**
{% codeblock lang:【省市选择】窗体Load事件 %}
private void ComboBoxForm_Load(object sender, EventArgs e)
{
    //向cmbProvince中添加下拉列表项河北省、湖北省
    cmbProvince.Items.AddRange(new string[] { "河北省", "湖北省" });
    //设置当前选定项的索引
    cmbProvince.SelectedIndex = 0;
}
{% endcodeblock %}

**4.实现更改下拉框的选项功能**
{% codeblock lang:c# 【cmbProvince下拉列表框】SelectedIndexChanged事件 %}
private void cmbProvince_SelectedIndexChanged(object sender, EventArgs e)
{
    //清除下拉框列表中的选项
    cmbCity.Items.Clear();
    //选中项的索引为0时展开河北省下的子节点
    if (cmbProvince.SelectedIndex==0)
    {
        //向cmbCity的Tag属性中添加所需数据
        cmbCity.Tag = "0";
        cmbCity.Items.AddRange(new string[] { "唐山市", "石家庄市", "邯郸市" });
        cmbCity.SelectedIndex = 0;
    }
    //选中项的索引为1时展开湖北省下的子节点
    if (cmbProvince.SelectedIndex == 1)
    {
        //向cmbCity的Tag属性中添加所需数据
        cmbCity.Tag = "1";
        cmbCity.Items.AddRange(new string[] { "武汉市", "荆州市", "十堰市" });
        cmbCity.SelectedIndex = 0;
    }
}
{% endcodeblock %}
{% endhideToggle %}

**5.运行程序**
`F5`

#### ListView控件

**ListView控件**又称为列表视图控件，他主要用于显示带图标的项列表，项列表中可以显示大图标、小图标和数据。

**1.ListView控件中添加项**
需要用到Items(控件中所有项的集合)属性的`Add()`方法，该方法主要用于将项添加到Items集合中。
{% codeblock lang:c# %}
public virtual ListViewItem Add(ListViewItem value)
{% endcodeblock %}

**2.ListView控件中移除项**
ListView控件中移除项：移除ListView控件中项时可以使用Items属性的`RemoveAt()`方法或者`Clear()`方法，其中`RemoveAt()`方法用于移除指定的项，而`Clear ()`方法用于从集合中移除所有项。
{% codeblock lang:c# %}
listView1.Items.RemoveAt(2);
listView1.Items.Clear();
{% endcodeblock %}

{% note warning modern %}
如果要移除ListView控件的所有项和列，需要使用**ListView控件的Clear()方法**，而**Items属性的Clear()方法**只能移除Items属性集合中的所有项。
{% endnote %}

**3.选择ListView控件中的项**
选择ListView控件中的项时可以使用`Selected`属性(bool)，该属性主要用于获取或设置一个值，该值指示是否选定此项。
{% codeblock lang:c# %}
//调用Selected属性选中ListView的第2项
listView1.Items[1].Selected = true; 
{% endcodeblock %}
**4.ListView的五种视图：LargeIcon视图、SmallIcon视图、List视图、Details视图和Tile视图**

| 视图 | 描述 | Show |
| --- | ---- | ----- |
| Details视图 | 可以显示任意的列，但只有第一列可以包含一个小图标和标签，其他的列项只能显示文字信息，有列表头。 | ![Details视图](2022-11-30-18-02-26.png) |
| LargeIcon视图 | 每个项都显示一个最大化图标，在他的下面有一个标签。 | ![LargeIcon视图](2022-11-30-18-03-09.png) |
| SmallIcon视图 | 每个项都显示一个小图标，在他的右边有一个标签。 | ![SmallIcon视图](2022-11-30-18-03-56.png) |
| List视图 | 每个项都显示一个小图标，在他的右边有一个标签。各项排列在列中，没有列标头。 | ![List视图](2022-11-30-18-04-24.png) |
| Tile | 每个项都显示为一个完整大小的图标，在他的右边带项标签和子项信息。（只有Window XP和Windows Server 2003系列支持）||

**5.ListView控件分组**
通过设置ListView控件中各个项的`System.Windows.Forms.ListViewItem.Group`属性，可以向组分配项或在组移动项。

{% codeblock lang:c# 将ListView控件的第一项分配到第一个组中 %}
listView1.Items[0].Group = listView1.Groups[0];
{% endcodeblock %}

{% hideToggle ListView控件的使用 %}
**1.创建项目**

- 项目名称：ListView
- 项目类型:Windows窗体应用程序

**2.设计窗体界面**
步骤

- 修改`Form1.cs`文件名为`ListViewForm.cs`
- `Text`:列表视图
- 添加1个ListView控件用于显示列表视图
- 添加1个ImageList控件，用于管理由其他控件（例如ListView、TreeView）使用的图像集合
- 添加5个Button控件，设置`Text`:"Details""SmallIcon""List""LargeIcon""分组"

**3.在ImageList控件中添加图片**
单击该控件右上角按钮选择图像添加即可

**4.实现Details视图功能**
{% codeblock lang:c# %}
private void button1_Click(object sender, EventArgs e)
{
    listView1.Clear();
    listView1.ShowGroups= false;
    //设置项在ListView控件中的显示方式为Details视图
    this.listView1.View = View.Details;
    //添加列标题
    //第一个参数表示列标题文本信息，第二个参数表示标题初始化宽度，第三个参数表示列对齐方式
    this.listView1.Columns.Add("列标题1", 100, HorizontalAlignment.Center);
    this.listView1.Columns.Add("列标题2", 100, HorizontalAlignment.Center);
    this.listView1.Columns.Add("列标题3", 100, HorizontalAlignment.Center);
    listView1.SmallImageList = imageList1;
    //添加数据项
    //数据更新，UI暂时挂起，直到EndUpdate绘制控件
    //可有效避免闪烁并大大提高加载速度
    this.listView1.BeginUpdate();
    for(int i = 0; i < 10; i++)
    {
        ListViewItem item = new ListViewItem();
        item.Text = "subitem" + i;
        item.SubItems.Add("第2列，第" + i + "行");
        item.SubItems.Add("第3列，第" + i + "行");
        item.ImageIndex = i;
        this.listView1.Items.Add(item);
    }
    this.listView1.EndUpdate();//结束数据处理，UI界面一次性绘制
}
{% endcodeblock %}

**5.实现SmallIcon视图功能**
{% codeblock lang:c# %}
private void button2_Click(object sender, EventArgs e)
{
    listView1.Clear();
    listView1.ShowGroups = false;
    this.listView1.View = View.SmallIcon;
    this.listView1.SmallImageList = imageList1;
    this.listView1.BeginUpdate();
    for (int i = 0; i < 10; i++)
    {
        ListViewItem item = new ListViewItem();
        item.ImageIndex = i;
        item.Text = "item" + i;
        listView1.Items.Add(item);
    }
    this.listView1.EndUpdate();
}
{% endcodeblock %}

**6.实现List视图功能**
{% codeblock lang:c# %}
private void button3_Click(object sender, EventArgs e)
{
    listView1.Clear();
    listView1.ShowGroups = false;
    listView1.View = View.List;
    listView1.SmallImageList = imageList1;
    listView1.BeginUpdate();
    for (int i = 0; i < 10; i++)
    {
        ListViewItem item = new ListViewItem();
        item.Text = "item" + i;
        item.ImageIndex = i;
        listView1.Items.Add(item);
    }
    listView1.EndUpdate();
}
{% endcodeblock %}

**7.实现LargeIcon功能**
{% codeblock lang:c# %}
private void button4_Click(object sender, EventArgs e)
{
    listView1.Items.Clear();
    listView1.ShowGroups = false;
    listView1.View = View.LargeIcon;
    listView1.LargeImageList = imageList1;
    listView1.BeginUpdate();
    for (int i = 0; i < 10; i++)
    {
        ListViewItem item = new ListViewItem();
        item.ImageIndex = i;
        item.Text = "item" + i;
        listView1.Items.Add(item);
    }
    listView1.EndUpdate();
}
{% endcodeblock %}

**8.编写分组功能**
{% codeblock lang:c# %}
private void button5_Click(object sender, EventArgs e)
{
    listView1.Clear();
    listView1.Groups.Clear();
    listView1.Items.Clear();
    //设置ShowGroups属性为true(默认false)，否则不显示出分组
    listView1.ShowGroups = true;
    //创建男生分组
    ListViewGroup man = new ListViewGroup();
    man.Header = "男生";//设置组的标题
    //设置组标题文本对齐方式（默认Left）
    man.HeaderAlignment = HorizontalAlignment.Left;
    //创建女生分组
    ListViewGroup women = new ListViewGroup();
    women.Header = "女生";
    //组标题居中对齐
    women.HeaderAlignment = HorizontalAlignment.Center;
    listView1.Groups.Add(man);
    listView1.Groups.Add(women);
    //添加项
    listView1.Items.Add("张三");
    listView1.Items.Add("李四");
    listView1.Items.Add("娜娜");
    listView1.Items.Add("玲玲");
    //将索引为0和1的项添加到男生分组
    listView1.Items[0].Group = listView1.Groups[0];
    listView1.Items[1].Group = listView1.Groups[0];
    //将索引为2和3的项添加到女生分组
    listView1.Items[2].Group = listView1.Groups[1];
    listView1.Items[3].Group = listView1.Groups[1];
}
{% endcodeblock %}
![分组](2022-11-30-18-08-37.png)

**9.运行程序**
`F5`

{% endhideToggle %}

#### DataGridView控件

**DataGridView控件**是用于显示表格的数据控件，该控件在实际应用中非常实用，特别需要表格显示数据时。我们可以通过添加属性的方式来控制表格的样式。

| 属性 | 描述 |
| ---- | ---- |
| `DataSource` | 指示DataGridView控件的数据源 |
| `GridColor` | 设置单元格网格线的颜色 |
| `DefaultCellStyle` | 单元格的默认样式(对齐方式，前景色，后景色，字体等) |
| `RowHeadersVisible` | 左侧标题栏是否隐藏 |
| `AllowUserToAddRows` | 是否向用户显示用于添加行的选项 |
| `AllowUserToDeleteRows` | 是否允许用户DataGridView控件的单元格 |
| `ReaderStyle` | DataGridView控件网格样式 |
| `ReaderOnly` | 用户是否可以编辑DataGridView控件的单元格 |
| `ScrollBars` | 设置DataGridView控件显示的滚动条类型 |

{% hideToggle DataGridView控件的使用 %}
**1.创建项目**

- 项目名称：DataGridView
- 项目类型:Windows窗体应用程序

**2.设计窗体界面**
步骤

- 修改`Form1.cs`文件名为`DataGridViewForm.cs`
- `Text`:课程表
- 添加1个**DataGridView控件**

**3.实现课程表的功能**
{% codeblock lang:c# 【课程表】控件Load事件 %}
private void DataGridViewForm_Load(object sender, EventArgs e)
{
    DataTable dataTable = new DataTable();
    //添加列集
    dataTable.Columns.Add("周数/节数", typeof(string));
    dataTable.Columns.Add("周一", typeof(string));
    dataTable.Columns.Add("周二", typeof(string));
    dataTable.Columns.Add("周三", typeof(string));
    dataTable.Columns.Add("周四", typeof(string));
    dataTable.Columns.Add("周五", typeof(string));
    //添加行
    for (int i = 0; i < 4; i++)
    {
        DataRow dr = dataTable.NewRow();
        dataTable.Rows.Add(dr);
    }
    //向表格中添加数据
    //向第一行的第一个格中添加“第1节”的文本信息
    dataTable.Rows[0][0] = "第1节";
    dataTable.Rows[0][1] = "语文";
    dataTable.Rows[0][2] = "语文";
    dataTable.Rows[0][3] = "语文";
    dataTable.Rows[0][4] = "语文";
    dataTable.Rows[0][5] = "语文";
    //向第一行的第一个格中添加“第2节”的文本信息
    dataTable.Rows[1][0] = "第2节";
    dataTable.Rows[1][1] = "数学";
    dataTable.Rows[1][2] = "数学";
    dataTable.Rows[1][3] = "数学";
    dataTable.Rows[1][4] = "数学";
    dataTable.Rows[1][5] = "数学";
    //向第一行的第一个格中添加“第3节”的文本信息
    dataTable.Rows[2][0] = "第3节";
    dataTable.Rows[2][1] = "英语";
    dataTable.Rows[2][2] = "英语";
    dataTable.Rows[2][3] = "英语";
    dataTable.Rows[2][4] = "英语";
    dataTable.Rows[2][5] = "英语";
    //向第一行的第一个格中添加“第4节”的文本信息
    dataTable.Rows[3][0] = "第4节";
    dataTable.Rows[3][1] = "体育";
    dataTable.Rows[3][2] = "体育";
    dataTable.Rows[3][3] = "体育";
    dataTable.Rows[3][4] = "体育";
    dataTable.Rows[3][5] = "体育";
    //在表格中添加数据
    dataGridView1.DataSource = dataTable;
    dataGridView1.RowHeadersVisible = false; //关闭第一列的空白列
    dataGridView1.ReadOnly = true;  //表格中的数据只读，不能编辑
    dataGridView1.AllowUserToAddRows = false;    //不显示添加行的选项
    dataGridView1.BackgroundColor = Color.White;    //表格背景颜色
    dataGridView1.Width = 600;  //表格宽度
    dataGridView1.ColumnHeadersDefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
    dataGridView1.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
        }
{% endcodeblock %}

**4.运行程序**
`F5`
{% endhideToggle %}

### 菜单、工具栏与状态栏

#### MenuStrip控件

**MenuStrip控件**用于表示WinForm窗体中的菜单，该控件支持多文档界面、菜单合并、工具提示和溢出等功能，开发人员可以通过添加访问键、快捷键、选中标记、图像和分隔条增强菜单的可用性和可读性。

**1.添加访问键**
在窗体中添加**MenuStrip控件**，该控件自动位于窗体左侧顶部，可以看到“请在此处键入”文本框。由一级菜单依次建立多级菜单。
{% inlineImg 2023-01-05-14-18-10.png 200px %}{% inlineImg 2023-01-05-14-19-27.png 200px %}

**2.添加快捷键**
单击需要添加快捷键的菜单项，在该菜单项的`Text`属性值中添加(&+快捷键)即可。例如为【文件】菜单项添加快捷键为【Alt+F】，首先单击【文件】菜单项，将该项的Text属性值设置为“文件(&F)”。
运行项目后，当按下【Alt+F】快捷键时，即可打开【文件】菜单项的二级菜单。
{% inlineImg 2023-01-05-14-39-24.png 300px %}{% inlineImg 2023-01-05-14-37-10.png 200px %}

**3.为菜单项添加图像**
右键单击需要添加图像的菜单键，在弹出框中选择【设置图像(M)...】按钮，跳转到【选择资源】窗口，导入图片资源即可。

**4.添加分割线**
在需要添加分隔线的“请在此处键入”文本框输入`“-”`，之后按下【Enter】键就可以为菜单项添加分隔线。

#### 实例：可拉伸菜单

如果应用程序分类中菜单项过多，而用户只使用一些常用的菜单项，此时可以将菜单中不常用的菜单项隐藏起来。这种显示方式类似于对菜单进行拉伸。使用时，只需要点击展开菜单，即可显示相应的菜单功能。
**1.创建项目**

- 项目名称：StretchMenu
- 项目类型:Windows窗体应用程序

**2.设计窗体界面**
步骤

- 修改`Form1.cs`文件名为`StretchMenuForm.cs`
- `Text`:可拉伸菜单
- 添加1个**StretchMenu控件**
- 添加一级菜单【会员管理】，`Name`:"ManagementItem"
- 添加二级菜单“会员登记” “会员刷卡” “会员列表” “等级设置” “业务调整” “批量发卡” “会员导入” “展示（关闭）其他项” “设置密码” “修改密码” “忘记密码”，对应的`Name`属性为"RegisterItem" "CreditCardItem" "ListItem" "SettingItem" "AdjustmentItem" "BatchCardItem" "ImportItem" "OpenOrCloseItem" "SetPasswordItem" "ChangePasswordItem" "ForgetPasswordItem"
![【可拉伸菜单】窗体](2023-01-05-15-16-59.png)

**3.实现窗体加载功能**
{% codeblock lang:c# 【可拉伸菜单】窗体Load事件 %}
using System;
using System.Windows.Forms;
namespace WindowsFormsApp1
{
    public partial class StretchMenuForm : Form
    {
        private bool flag = true;
        public StretchMenuForm()
        {
            InitializeComponent();
        }
        private void StretchMenuForm_Load(object sender, EventArgs e)
        {
            SetPasswordItem.Visible = false;//【设置密码】菜单项
            ChangePasswordItem.Visible = false; //【修改密码】菜单项
            ForgetPasswordItem.Visible = false;//【忘记密码】菜单项
            flag = true;
        }
    }
}
{% endcodeblock %}

**4.实现展开与关闭菜单项的功能**
{% codeblock lang:c# 【展开（关闭）其他项】Click事件 %}
private void OpenOrCloseItem_Click(object sender, EventArgs e)
{
    switch (flag)
    {
        case false:
            SetPasswordItem.Visible = false;
            ChangePasswordItem.Visible = false;
            ForgetPasswordItem.Visible = false;
            flag = true;
            ManagementItem.ShowDropDown();//该方法会显示【会员管理】菜单下面的二级菜单
            break;
        case true:
            SetPasswordItem.Visible = true;
            ChangePasswordItem.Visible = true;
            ForgetPasswordItem.Visible = true;
            flag = false;
            ManagementItem.ShowDropDown();
            break;
    }
}
{% endcodeblock %}

**5.运行程序**
`F5`

#### ToolStrip控件

**ToolStrip控件**用于显示工具栏，该控件可以创建具有Windows、Office、IE或自定义的外观和行为的工具栏及其他用户界面元素，这些元素支持溢出及运行时项重新排序。

**1.添加工具栏控件**
在窗体中添加1个**ToolStrip控件**，该控件默认显示在窗体的左侧顶部，如果窗体中已经存在菜单栏，则默认显示在菜单栏的下方。
**2.设置工具栏样式**
窗体添加**ToolStrip控件**之后，上面并没有控件，只显示一个占位符，可以在工具栏中添加控件来定义工具栏显示的具体样式，单击工具栏上向下箭头的提示图标，在下拉菜单中显示8种不同类型的控件。
{% inlineImg 2023-01-05-16-16-38.png 230px %}{% inlineImg 2023-01-05-16-21-17.png 230px %}

- `Button`:包含文本和图像的项，用户可以选择是否显示文本和图像，默认只显示图像。
- `Label`:包含文本和图像的项，用户不可以选择是否显示文本和图像，可以显示超链接。
- `SplitButton`:在Button的基础上添加了下拉菜单。
- `DropDownButton`:用于下拉菜单选择项。
- `Separator`:分隔符。
- `ComboBox`:显示一个ComboBox的项。
- `TextBox`:显示一个TextBox的项。
- `ProgressBar`:显示一个进度条的项。

{% note warning modern %}
当上述控件使用`ToolTipText`属性来显示提示功能的时，需要将**ToolStrip控件**的`ShowItemToolTips`属性的值设置为`True`(默认)，`ShowItemToolstrip`属性用于指定是否显示项的ToolTip信息提示框。
{% endnote %}

#### 实例：具有提示功能的工具栏

通常情况下，当鼠标指针悬停在Word文档工具栏中的按钮时，会出现一个提示框，提示框内描述了工具栏中按钮所提供的功能，**ToolStrip控件**可以实现具有提示功能的工具栏。
**1.创建项目**

- 项目名称：WordToolbar
- 项目类型:Windows窗体应用程序

**2.设计窗体界面**
步骤

- 修改`Form1.cs`文件名为`ToolbarForm.cs`
- `Text`:工具栏
- 添加**ToolStrip控件**，用于显示工具栏，在该工具栏中添加4个Label控件，设置Text属性为“文字方向” “页边距” “纸张方向” “纸张大小”
- 添加分隔符，右键单击“页边距”文本信息，选择【插入(I)】选项，然后选中【Separator】，即可在“文字方向”和“页边距”文本信息间插入分隔符。
- ![添加分隔符](2023-01-05-16-47-16.png)

**3.添加提示信息**
分别选中工具栏中的“文字方向” “页边距” “纸张方向” “纸张大小”，在这些控件对应的`ToolTipText`属性值分别设置为“自定义文档或所选文本框中的文本方向” “选择整个文档或当前节的边距大小” “切换页面的纵向布局和横向布局” “将文字拆分两栏或更多栏”。

**4.运行程序**
`F5`

#### StatusStrip控件

**StatusStrip控件**表示状态栏，它通常放置在窗体的最底部，用于显示窗体上一些对象的相关信息或者显示应用程序的信息。

**1.添加状态栏控件**
在窗体中 添加**StatusStrip控件**，该控件默认显示在窗体左侧底部。

**2.状态栏中显示的控件类型**
窗体中添加**StatusStrip控件**之后，上面并没有显示数据，只显示一个占位符，可在该状态栏中添加控件来定义具体的显示样式，单击状态栏上的向下箭头图标，下拉菜单显示4中不同类型的控件。

- `StatusLabel`:包含文本和图像的项。
- `ProgressBar`:显示一个进度条。
- `DropDownButton`:用于下拉列表选项，可以从中选择单个项目。
- `SplitButton`:由一个标准按钮和一个下拉菜单组成的控件。

#### 实例：在状态栏中显示当前系统时间

状态栏经常用于显示应用程序当前的状态信息或用户操作信息。这里实现在状态栏中显示当前系统时间的功能。
**1.创建项目**

- 项目名称：ShowTimeStatusBar
- 项目类型:Windows窗体应用程序

**2.设计窗体界面**
步骤

- 修改`Form1.cs`文件名为`StatusBarForm.cs`
- `Text`:状态栏
- 在【状态栏】窗体上添加1个**Timer控件**，用于每隔一秒获取一次系统当前时间
- 添加1个**StatusStrip控件**，用于显示状态栏，在该状态栏中添加**StatusLabel控件**，用于显示当前系统时间

**3.实现获取系统时间的功能**
设置【状态栏】窗体的`Load`事件与**Timer控件**的`Tick`事件
{% codeblock lang:c# %}
using System;
using System.Windows.Forms;
namespace WindowsFormsApp1
{
    public partial class StatusBarForm : Form
    {
        public StatusBarForm()
        {
            InitializeComponent();
        }
        private void StatusBarForm_Load(object sender, EventArgs e)
        {
            timer1.Enabled = true;
            timer1.Interval = 1000;//时间间隔为1000毫秒
        }
        private void timer1_Tick(object sender, EventArgs e)
        {
            this.toolStripStatusLabel1.Text = "当前时间：" + System.DateTime.Now.ToString();
        }
    }
}
{% endcodeblock %}

**4.运行程序**
`F5`

## C#常用类

### string类

{% codeblock lang:c# %}
string str1 = "1";
string str2 = "1";
Console.WriteLine(str1 == str2);
//True
{% endcodeblock %}

#### string类的初始化

- 字符串就是指一连串的字符，表示字符串的类为string。
- string字符串中可以包含任意字符，这些字符必须包含在一对英文双引号`""`之内，例如"Hello World"。
- 在使用string字符串之前首先需要对string类进行**初始化**

1.使用字符串常量直接初始化一个string对象
{% codeblock lang:c# %}
string str="abc";
{% endcodeblock %}
2.使用string类的构造方法初始化字符串对象，常用的有两个构造方法

| 方法名称 | 功能描述 |
| -------- | ------- |
| string(Char[] charArray) | 将string类的新实例初始化为由Unicode字符数组指示的值。 |
| string(Char ch,int num) | 将string类的新实例初始化为由重复指定次数的指定Unicode 字符指示的值。 |

{% codeblock lang:c# %}
class Program{
    static void Main(string[] args){
        char[] chs = { '1', '2', '3' };
        string str1 = new string(chs);  //"123"
        //使用字符'a'重复5次创建字符串"aaaaa"
        string str2 = new string('a', 5);
        Console.WriteLine("str1 = " + str1);
        Console.WriteLine("str2 = " + str2);
        Console.ReadKey();
    }
}
{% endcodeblock %}

{% note warning modern %}

- 在程序中，string 和String类都可以创建字符串对象。
- 不同的是，string类型是C#语言中用来表示字符串的类型，而String类型是.NET Framework 通用类型系统中用来表示字符串的类型。
- 在程序开发过程中，这两种类型之所以都能表示字符串，是因为程序编译时，C#语言中的string类型会被编译成.NET Framework通用类型系统的String类型。
{% endnote %}

- 在编码过程中，定义string类型的变量后如果不需要立即对其进行初始化，一般会将其初始化为一个空字符串。
{% codeblock lang:C# %}
string str1 = "";
string str2 = "";
{% endcodeblock %}

- .NET平台中提供了一个空字符串常量String.Empty，该常量可以代替上述空字符串。
{% codeblock lang:c# %}
string str1 = String.Empty;
string str2 = String.Empty;
{% endcodeblock %}

- 由于字符串拘留池机制，使用空字符串（“”）和使用String.
Empty是同一个对象，因此，这两种空字符串的定义是一样的。

#### 字符串的不可变性

字符串的不可变性指的是字符串对象一旦创建，就无法对其进行修改。例如，有一个字符串“abc”，如果对其进行修改，其内存就会发生变化。

- 在代码编写过程中，有时需要创建多个字符串对象，由于字符串具有不可变性，因此这些字符串对象对应的值都会占用内存空间。
- 为此，.NET框架的底层提供了一种机制，当一个字符串已经被创建，那么以后每次创建相同值的字符串时会直接引用他的地址值，而无需为自己的值开辟新的内存空间。这种机制称为字符串拘留池机制。
- 字符串拘留池机制是由.NET框架来完成的，不用人为的管理，这样可以提高字符串使用的效率。

#### 字符串与字符数组

- 在程序开发中，为了方便访问字符串中的某个字符，可以将字符串看作一个char类型的数组，即**字符数组**。
- 需要注意的是，由于字符串是不可变的，str字符串只能看作是**只读的字符数组**。
- 同字符数组类似，字符串可以通过`Length`属性来获取长度

{% codeblock lang:c# %}
namespace Program02{
    class Program{
        static void Main(string[] args){
            string str = "欢迎来到.NET世界";
            Console.WriteLine(str[0]);
            Console.WriteLine(str[5]);
            Console.WriteLine(str[9]);
            //通过Length属性获取字符串的长度
            for (int i = 0; i < str.Length; i++){
                Console.WriteLine(str[i]);
            }
        }
    }
}
{% endcodeblock %}

#### string类的静态方法

| 方法声明 | 描述 |
| -------- | ---- |
| int Compare(string str1,string str2) | 比较两个字符串是否相等 |
| string Format(string str,object obj) | 格式化字符串 |
| bool IsNullOrEmpty(string str) | 判断一个字符串是否为空或长度为0 |
| string Join(string str,string[] strarr) | 使用指定分隔字符连接字符串数组 |

**Compare()方法**
如果第一个字符串大于第二个字符串，则返回一个大于0的int整数；如果两个字符串相同，则返回0；若第一个字符串小于第二个字符串，则返回一个小于0的int整数。
字符串比较时，采用了**字典排序法**，所谓字典排序法就是首先比较两个字符串的第一个字符，第一个字符大的字符串就大，如果两个字符串的第一个字符相同，那么就比较第二个字符，依此类推，最终得到较大的字符串。
{% codeblock lang:c# %}
namespace Program04{
    class Program{
        static void Main(string[] args){
            string str1 = "abcdefg";
            string str2 = "abc";
            string str3 = "bbc";
            string str4 = "abc";
            Console.WriteLine(string.Compare(str1, str2));//1
            Console.WriteLine(string.Compare(str2, str3));//-1
            Console.WriteLine(string.Compare(str2, str4));//0
            Console.ReadKey();
        }
    }
}
{% endcodeblock %}

**Format()方法**
{% codeblock lang:c# %}
namespace Program05{
    class Program{
        static void Main(string[] args){
            string str = "abcdef";
            string res = string.Format("字符串{0}包含{1}个字符", str, str.Length);
            Console.WriteLine(res);
            Console.ReadKey();
        }
    }
}
{% endcodeblock %}

**IsNullOrEmpty()方法**
当字符串为空或者长度为0时，该方法的返回值为true，否则返回值为false。
{% codeblock lang:c# %}
static void Main(string[] args){
    string s1 = null;
    string s2 = "";
     string s3 = "abc";
     Check(s1, "s1");
}
static void Check(string s, string name){
      if (string.IsNullOrEmpty(s)){
       Console.WriteLine("{0}是为空或长度为0", name);
      }
}
{% endcodeblock %}

**Join()方法**
{% codeblock lang:c# %}
class Program{
    static void Main(string[] args){
        string[] strs = { "字符串", "使用竖线", "连接" };
        string res = string.Join("|", strs);
        Console.WriteLine(res);
        Console.ReadKey();
    }
}
//字符串|使用竖线|连接
{% endcodeblock %}

#### string类的实例方法

与静态方法不同的是，实例方法需要先创建实例对象才能使用

| 方法 | 描述 |
| ---- | ---- |
| bool Contains(string str) | 判断当前字符串中是否包含指定字符串 |
| bool EndsWith(string str) | 判断当前字符串是否使用指定字符串结尾 |
| int IndexOf(char ch) | 获得指定字符或字符串在当前字符串中的位置 |
| string[] Split(char[] charArray) | 将字符串以某种字符分隔 |
| string Substring(int index) | 从index索引处截取当前字符串 |
| char[] ToCharArray() | 将当前字符串转换为字符数组 |
| string ToUpper() | 将当前字符串中的英文转化成大写 |
| string Trim() | 去除字符串两边空格 |

**Contains()方法**
{% codeblock lang:c# 调用Contains()方法判断字符串str1是否包含str2 %}
namespace Program08{
    class Program{
        static void Main(string[] args){
            string str1 = "这是一个测试字符串";
            string str2 = "测试";
            if (str1.Contains(str2)){
                Console.WriteLine("str2包含在str1中");
            } else{
                Console.WriteLine("str1不包含str2");
            }
            Console.ReadKey();
        }
    }
}//str2包含在str1中
{% endcodeblock %}

**EndsWith()方法**
{% codeblock lang:c# 调用EndsWith()方法判断字符串input是否以“.mp3”结尾 %}
namespace Program09{
    class Program{
        static void Main(string[] args){
           Console.WriteLine("请输入mp3文件名");
           string input = Console.ReadLine();//获取用户从控制台输入的字符串
           if (input.EndsWith(".mp3")){
               Console.WriteLine("文件格式正确");
           }else{
               Console.WriteLine("输入文件不是mp3格式");
           }
           Console.ReadKey();
        }
    }
}
{% endcodeblock %}

**IndexOf()方法**
{% codeblock lang:c# 通过IndexOf()方法查询字符串“e”的位置并复制给变量index %}
namespace Program10{
    class Program{
        static void Main(string[] args){
            string str = "abcdefefghefg";
            //查找第一个'e'字符的位置
            int index = str.IndexOf("e");
            Console.WriteLine("找到e，索引为{0}", index);
            Console.ReadKey();
        }
    }
}//找到e，索引为4
{% endcodeblock %}

**Split()方法**
{% codeblock lang:c# 调用Split()方法通过''分隔符将字符串str分割为一个字符串数组strs %}
namespace Program11{
    class Program{
        static void Main(string[] args){
            string str = "I have a dream";
            string[] strs = str.Split(' ');
            Console.WriteLine("一共有{0}个单词，分别是：", strs.Length);
            for (int i = 0; i < strs.Length; i++){
                Console.WriteLine("第{0}个单词是：{1}", i + 1, strs[i]);
            }
            Console.ReadKey();
        }
    }
}
{% endcodeblock %}

**Substring()方法**
{% codeblock lang:c# 通过Substring()方法从指定位置截取文件名后缀名 %}
namespace Program12{
    class Program{
        static void Main(string[] args){
            // 注意C#中的转义字符,这里加上@取消转义
            string path=@"D:\workspeace\chapter8\Program11\program.cs";
            int index = path.IndexOf('.');
            // 从'.'的下一个位置开始截取
            string fileType = path.Substring(index + 1);
            Console.WriteLine("文件后缀名为：{0}", fileType);
            Console.ReadKey();
        }
    }
}//文件后缀名为：cs
{% endcodeblock %}

**ToCharArray()方法**
{% codeblock lang:c# 将字符串转换成字符数组 %}
using System;
namespace Program13{
    class Program{
        static void Main(string[] args){
            string str = "abcdef";
            char[] chs = str.ToCharArray();
            for (int i = 0; i < chs.Length / 2; i++){
                char temp = chs[i];
                chs[i] = chs[chs.Length - i - 1];
                chs[chs.Length - i - 1] = temp;
            }
            string s1 = new string(chs);
            Console.WriteLine(s1);
            Console.ReadKey();
        }
    }
}
//fedcba
{% endcodeblock %}

**ToUpper()方法**
与之相对应的是`ToLower()`方法
{% codeblock lang:C# 将字符串中所有英文字母都变成大写字母 %}
using System;
namespace Program14{
    class Program{
        static void Main(string[] args){
            string s = "itcast";
            s = s.ToUpper();
            Console.WriteLine(s);
            Console.ReadKey();
        }
    }
}
{% endcodeblock %}

**Trim()方法**
{% codeblock lang:c# 用来去除字符串两端的空格 %}
namespace Program15{
    class Program{
        static void Main(string[] args){
            string str = "   ab   cd   ";
            Console.WriteLine("|" + str + "|");
            str = str.Trim();
            Console.WriteLine("|" + str + "|");
            Console.ReadKey();
        }
    }
}
//|   ab   cd   |
//|ab   cd|
{% endcodeblock %}

### 高效的StringBuilder

- C#中提供了`StringBuilder`类，它和`string`类都用于操作字符串。
- 与`string`类不同的是，`StringBuilder`类创建的字符串的长度是可以改变的，他类似一个字符容器，当在其中添加或删除字符时，并不会产生新的StringBuilder对象，因此可以让字符串的拼接操作变的更加高效。针对添加和删除字符串有以下操作。

| 方法声明 | 功能描述 |
| -------- | ------- |
| `StringBuilder Append(string str)` | 将字符串str添加到StringBuilder对象的末尾 |
| `StringBuilder Insert(int offset,string str)` | 在字符串中的offset位置处插入字符串str |
| `StringBuilder Replace(string str1,string str2)` | 使用字符串str2替换StringBuilder对象中的字符串str1 |
| `StringBuilder Remove(int index int length)` | 将字符串从指定索引位置index开始，移除 length长度字符串 |
| `string ToString()` | 将StringBuilder类型转换成string 类型 |

{% codeblock lang:c# %}
using System;
using System.Text;
namespace Program16
    class Program{
        static void Main(string[] args) {
            StringBuilder sb = new StringBuilder();
            sb.Append("abcd");
            Console.WriteLine("追加字符串:" + sb.ToString());
            sb.Insert(3, "aaa");
            Console.WriteLine("插入字符串:" + sb.ToString());
            sb.Remove(3, 3);
            Console.WriteLine("移除字符串:" + sb.ToString());
            sb.Replace("a", "b");
            Console.WriteLine("替换字符串:" + sb.ToString());
            Console.WriteLine("sb的长度是:" + sb.Length);
            Console.ReadKey();
        }
}
{% endcodeblock %}

{% hideBlock 执行结果 %}
追加字符串:abcd
插入字符串:abcaaad
移除字符串:abcd
替换字符串:bbcd
sb的长度是:4
{% endhideBlock %}

#### StringBuilder性能分析

- `Stopwatch`类的命名空间为System.Diagnostics。
- `Stopwatch`类用于**测量代码执行的时间**，他有两个方法`Start()`和`Stop()`，其中Start()方法表示计时开始，Stop()方法表示计时结束，该类还有一个属性`Elapsed`用于获取代码执行的总运行时间。

{% codeblock lang:c# %}
class Program{
    static void Main(string[] args){
        string str = "";
        Stopwatch sp = new Stopwatch();
        sp.Start();
        for (int i = 0; i < 10000; i++){
            str += i.ToString();
        }
        sp.Stop(); // 停止计时
        Console.WriteLine(sp.Elapsed);
        Console.ReadKey();
    }
}
//00:00:00.0229812
{% endcodeblock %}

{% codeblock lang:c# %}
static void Main(string[] args){
    StringBuilder builder = new StringBuilder();
    Stopwatch sp = new Stopwatch();
    sp.Start(); // 开始计时
    for (int i = 0; i < 10000; i++){
        builder.Append(i.ToString());
    }
    sp.Stop(); // 停止计时
    Console.WriteLine(sp.Elapsed);
    Console.ReadKey();
}
//00:00:00.0004089
{% endcodeblock %}

可见，在同等情况下StringBuilder类的性能远远高于string类，因此在进行字符串进行拼接优先使用StringBuilder类。

### DateTime类

`DateTime`类用于表示时间。

| 方法 | 功能描述 |
| ---- | ------- |
| `DateTime(int year,int month,int day)` | 将 DateTime 结构的新实例初始化为指定的年、月和日 |
| `DateTime(int year,int month,int day,int hour,int minute,int second)` | 将 DateTime 结构的新实例初始化为指定的年、月、日、小时、分钟和秒 |

{% codeblock lang:c# %}
namespace Program17{
    class Program{
        static void Main(string[] args){
            DateTime dt1 = new DateTime(2022, 12, 28);
            DateTime dt2 = new DateTime(2022, 12, 28, 17, 5, 5);
            Console.WriteLine("dt1:" + dt1);
            Console.WriteLine("dt2:" + dt2);
        }
    }
}
//dt1:2022/12/28 0:00:00
//dt2:2022/12/28 17:05:05
{% endcodeblock %}

#### TimeSpan类

TimeSpan 对象用于表示时间间隔，在使用Data类时经常需要通过该对象增加时间间隔。

| 构造方法 | 功能描述 |
| ------- | -------- |
| `TimeSpan(int hour,int minute,int seconds)` | 将新的TimeSpan对象初始为指定的小时数，分钟数，秒数 |
| `TimeSpan(int day,int hour,int minute,int second)` | 将新的TimeSpan对象初始为指定的天数，小时数，分钟数，秒数 |

{% codeblock lang:c# %}
class Program{
    static void Main(string[] args){
        TimeSpan ts1 = new TimeSpan(1, 2, 3);
        Console.WriteLine("ts1的时间间隔为：" + ts1);
        TimeSpan ts2 = new TimeSpan(1, 2, 3, 4, 5);
        Console.WriteLine("ts2的时间间隔为：" + ts2);
    }
}
//ts1的时间间隔为：01:02:03
//ts2的时间间隔为：1.02:03:04.0050000
{% endcodeblock %}

#### DateTime类的常用属性

在日期数据处理的过程中，经常需要通过DateTime对象的属性来获取日期中的某一部分的信息。

| 名称 | 功能描述 |
| ---- | -------- |
| `Date` | 获取此实例的日期部分 |
| `Day` | 获取此实例所表示的日期为该月中的第几天 |
| `Hour` | 获取此实例所表示日期的小时部分 |
| `Minute` | 获取此实例所表示日期的分钟部分 |
| `Month` | 获取此实例所表示日期的月份部分 |
| `Today` | 获取当前日期 |
| `Year` | 获取此实例所表示日期的年份部分 |
| `Now` | 获取一个 DateTime 对象，该对象的时间为本地时间 |

{% codeblock lang:c# %}
static void Main(string[] args){
    DateTime dt = DateTime.Now;
    Console.WriteLine("当前时间是：" + dt);
    Console.WriteLine("年：" + dt.Year);
    Console.WriteLine("月：" + dt.Month);
    Console.WriteLine("日：" + dt.Day);
    Console.WriteLine("时：" + dt.Hour);
    Console.WriteLine("分：" + dt.Minute);
    Console.WriteLine("秒：" + dt.Second);
}
{% endcodeblock %}

#### DateTime类的常用方法

| 名称 | 功能描述 |
| ---- | ------- |
| `DateTime Add(TimeSpan ts)` | 返回一个 DateTime对象，他将指定 时间间隔添加到此实例的值上 |
| `bool Equals(DateTime dt)` | 返回一个bool值，指示此实例是否与指定的 DateTime 实例相等 |
| `string ToShortTimeString()` | 将当前 DateTime 对象的值转换为其等效的短时间字符串表示 |
| `int Compare(DateTime dt1,DateTime dt2)` | 将两个DateTime对象进行比较，如果dt1早于dt2，返回整数-1，如果dt1等于dt2.返回整数0，如果dt1晚于dt2，返回整数1 |

{% codeblock lang:c# %}
static void Main(string[] args){
    DateTime dt = DateTime.Now;
    Console.WriteLine("dt:" + dt);
    //定义一个时间对象
    TimeSpan ts = new TimeSpan(1, 0, 0);
    //当前时间小时部分加1
    dt = dt.Add(ts);
    Console.WriteLine("dt:" + dt);
    //判断两个时间是否相等
    bool b = dt.Equals(DateTime.Now);
    Console.WriteLine("判断改变后的dt是否与系统时间相等：" + b);
    //将DateTime对象转换为其等效的短时间字符串
    string s = dt.ToShortDateString();
    Console.WriteLine("dt转换为短时间字符串为：" + s);
    //将dt对象的时间和当前时间进行比较
    int result = DateTime.Compare(dt, DateTime.Now);
    if (result>0)
    {
        Console.WriteLine("dt晚于系统当前时间");
    }
    else if (result == 0)
    {
        Console.WriteLine("dt等于系统当前时间");
    }
    else
    {
        Console.WriteLine("dt早于系统当前时间");
    }
}
//dt:2022/12/28 18:00:54
//dt:2022/12/28 19:00:54
//判断改变后的dt是否与系统时间相等：False
//dt转换为短时间字符串为：2022/12/28
//dt晚于系统当前时间
{% endcodeblock %}

### Random类

在C#语言中提供了一个`Random`类，该类是一个伪随机数生成器，它可以随机产生数字。

| 名称 | 功能描述 |
| ---- | -------  |
| `Random()` | 使用与时间相关的默认种子值，初始化Random类的新实例对象 |
| `Random(int seed)` | 用指定的种子值初始化Random类的新实例对象 |

{% codeblock lang:c# %}
static void Main(string[] args){
    Random rd = new Random();
    for (int i = 0; i < 10; i++)
    {
        int temp = rd.Next(); //生成一个非负的随机数
        Console.WriteLine(temp);
    }
}
{% endcodeblock %}

{% codeblock lang:c# 如果指定了相同的种子，则每个实例对象产生的随机数具有相同的序列 %}
static void Main(string[] args){
    Random rd = new Random(10);
    for (int i = 0; i < 10; i++)
    {
        int temp = rd.Next();
        Console.WriteLine(temp);
    }
}
{% endcodeblock %}

#### Random类常用方法

| 名称 | 功能描述 |
| ---- | ------- |
| `int Next()` | 返回在指定范围内的任意整数 |
| `int Next(int max)` | 返回一个小于所指定最大值的非负随机整数 |
| `int Next(int min,int max)` | 返回在指定范围内的任意整数 |
| `double NextDouble()` | 返回一个介于 0.0 和 1.0 之间的随机浮点数 |

{% codeblock lang:c# %}
static void Main(string[] args){
    Random rd = new Random();
    int temp;
    Console.Write("生成一个随机数字:            ");
    temp = rd.Next();
    Console.WriteLine(temp);
    Console.Write("生成一个小于10随机数字:      ");
    temp = rd.Next(10);
    Console.WriteLine(temp);
    Console.Write("生成一个大于10小于20随机数字:");
    temp = rd.Next(10, 20);
    Console.WriteLine(temp);
    Console.Write("生成一个浮点随机数字:        ");
    double temp1 = rd.NextDouble();
    Console.WriteLine(temp1);
    Console.ReadKey();
}
{% endcodeblock %}

## 文件操作

### 流和文件流

在计算机中，无论是文本、图片、音频还是视频，所有的文件都是以**二进制(字节)**形式存储的。为此，C#专门针对文件的输入输出操作提供了一系列的流，统称为**文件流**。文件流是程序中最常用的流，根据数据的传输方向可将其分为**输入流**和**输出流**。

为了方便理解，可以把输入流和输出流比作两根“水管”
![输入流和输出流](2022-12-29-11-20-06.png)
输入流被看作是一个输入管道，输出流被看作是一个输出管道，数据通过输入流从源设备输入到程序中，通过输出流从程序中输出到目标设备中，从而实现数据的传输。由此可见，文件流中的输入输出都是相对于程序而言的。

### System.IO命名空间

在C#中，文件操作类都位于System.IO命名空间中，因此在使用这些类时需要引入System.IO命名空间。该命名空间中包含了很多类，如下图：
![System.IO命名空间中常用类](2022-12-29-11-39-19.png)
这些类大致可分为操作目录的类、操作文件的类、操作文件路径的类等。其中，Directory和DirectoryInfo属于操作目录的类，FileStream、File和FileInfo属于操作文件的类，StreamReader、StreamWriter类属于操作文本文件的类，Path类属于操作文件路径的类。

### File类和FileInfo类

#### File类

`File`类是一个静态类，它提供了许多静态方法，用于处理文件，使用这些方法可以对文件进行创建、移动、查询和删除等操作，下面是File类中的一些常用静态方法

| 方法 | 说明 |
| ---- | ---- |
| FileStream Create(string path) | 根据传入的路径创建一个文件，如果文件不存在，则创建文件，如果存在且不是只读的，则覆盖其内容 |
| void Delete(string path) | 如果文件存在，则删除指定的文件，如果指定的文件不存在也不引发异常 |
| bool Exists(string path) | 判断指定文件是否存在，若存在则返回ture，否则返回false |
| void Move(string sourceFileName,string destFileName) | 将指定的文件移动到新位置，可以在新位置为文件指定不同的名称 |
| FileStream Open(string path,FileMode mode) | 打开指定路径上的文件并返回FileStream对象 |
| void Copy(string sourceFileName,string destFileName) | 将现有的文件内容复制到新文件中，可以指定是否允许覆盖同名的文件 |

{% codeblock lang:c# %}
using System;
using System.IO;
namespace Program01{
    class Program{
        static void Main(string[] args){
            File.Create("Data.txt");        //创建文件，创建好的文件放在项目路径\bin\Debug目录下
            Console.WriteLine("文件创建成功");
            if (File.Exists("Data.txt")){  //判断文件是否存在
                Console.WriteLine("Data.txt文件存在");
            }else{
                Console.WriteLine("Data.txt文件不存在");
            }
        }
    }
}
{% endcodeblock %}

#### FileInfo类

`FileInfo`类与File类比较类似，它们都可以对磁盘上的文件进行操作。不同的是**FileInfo类是实例类**，所有的方法都只能在实例化对象后才能调用。

{% codeblock lang:c# 创建FileInfo类的对象时必须传递一个文件路径作为参数 %}
FileInfo aFile = new FileInfo(@"D:\Data.txt");
{% endcodeblock %}

上述代码表示使用FileInfo类创建一个对象，将文件路径作为参数，而路径中`@`符号表示不解析转义字符，如果没有`@`前缀就需要用`\\`替代`\`。

{% codeblock lang:c# %}
FileInfo aFile = new FileInfo("D:\\Data.txt");
{% endcodeblock %}

FileInfo类中除了有许多与File类相似的方法外，同时也有它特有的属性

| 属性 | 说明 |
| ---- | ---- |
| Directory | 该属性用于检索一个DirectoryInfo对象，表示当前文件所在的目录 |
| DirectoryName | 该属性用于返回文件目录，而且这个属性是只读的 |
| IsReadOnly | 该属性用于判断文件是否是只读的 |
| Length | 该属性用于获取文件的大小（以字节为单位），并返回long值 |

{% codeblock lang:c# %}
static void Main(string[] args){
        FileInfo aFile = new FileInfo("Data.txt");
        aFile.Create();     //创建文件
        Console.WriteLine("文件创建成功");
        if (aFile.Exists){ //判断文件是否存在
             Console.WriteLine("Data.txt文件存在");
         }else{
             Console.WriteLine("Data.txt文件不存在");
         }
         Console.WriteLine("文件当前目录为：" + aFile.Directory);
         Console.WriteLine("文件大小为：" + aFile.Length);
}
{% endcodeblock %}

### Directory类和DirectoryInfo类

#### Directory类

`Directory`类是一个静态类，不可实例化，并且提供了许多静态方法用于对文件的存放目录进行操作，例如创建、删除、查询和移动目录等。

| 方法 | 说明 |
| ---- | ---- |
| DirectoryInfo CreateDirectory(string path) | 创建指定路径的所有目录和子目录 |
| void Delete(string path) | 删除指定路径的空目录 |
| bool Exists(string path) | 判断指定路径目录是否存在，若存在，则返回ture，否则，返回false |
| DirectoryInfo GetParent() | 查找指定路径的父目录，包括相对路径和绝对路径 |
| void Move(string sourceDirName,string destDirName) | 将文件或目录及其内容移动到新位置 |

{% codeblock lang:c# %}
static void Main(string[] args){
        //创建多级目录
       Directory.CreateDirectory(@"D:\C#\ConsoleApp\");
       if (Directory.Exists(@"D:\C#\ConsoleApp\")){//判断目录是否存在
              Console.WriteLine("文件存在");
       }else{
             Console.WriteLine("文件不存在");
       }
        //删除没有内容的目录
        Directory.Delete(@"D:\C#\ConsoleApp\");
        Console.WriteLine("删除成功");
}
{% endcodeblock %}

#### DirectoryInfo类

`DirectoryInfo`类是一个非静态类，可以进行实例化。该类的功能与Directory类相似，也可以对文件的目录进行创建、删除、查询、移动等操作。

| 属性或方法 | 说明 |
| --------- | ---- |
| Parent | 属性，获取指定子目录的父目录 |
| Root | 属性，获取路径的根目录 |
| Name | 属性，获取当前DirectoryInfo对象的名称 |
| Exists | 属性，判断指定目录是否存在 |
| Create() | 方法，创建目录 |
| GetDirectories(string path) | 方法，获取当前目录的子目录 |
| CreateSubdirectory(string path) | 方法，在指定路径中创建一个或多个子目录 |
| GetFiles() | 方法，获取当前目录的文件列表 |
| Delete() | 方法，删除指定的目录及其内容 |
| GetFileSystemInfos() | 方法，获取当前目录的子目录和文件列表 |
| MoveTo(string destDirName) | 方法，将指定目录及其内容移到新位置 |

{% codeblock lang:c# %}
static void Main(string[] args){
    string path = @"D:\C#\ConsoleApp2\bin\Debug\Test";
    DirectoryInfo di = new DirectoryInfo(path); //创建一个DirectoryInfo对象
    di.Create();
    Console.WriteLine("当前目录名称为：" + di.Name);
    Console.WriteLine("父目录名为：" + di.Parent);
    Console.WriteLine("根目录为：" + di.Root);
    string path1 = @"D:\C#\ConsoleApp2\bin\Debug\netcoreapp3.1";
    DirectoryInfo di1 = new DirectoryInfo(path1);
    //遍历目录下的所有文件，并找出包含P字符的文件名
    FileInfo[] files1 = di1.GetFiles("*P*");
    foreach (var item in files1)
    {
        Console.WriteLine("包含P字符的文件名称为：" + item.Name);
    }
    //当前目录名称为：Test
    //父目录名为：D:\C#\ConsoleApp2\bin\Debug
    //根目录为：D:\
    //包含P字符的文件名称为：ConsoleApp2.deps.json
    //包含P字符的文件名称为：ConsoleApp2.dll
    //包含P字符的文件名称为：ConsoleApp2.exe
    //包含P字符的文件名称为：ConsoleApp2.pdb
    //包含P字符的文件名称为：ConsoleApp2.runtimeconfig.dev.json
    //包含P字符的文件名称为：ConsoleApp2.runtimeconfig.json
}
{% endcodeblock %}

### FileStream类

#### FileStream类简介

`FileStream`类表示在磁盘或网络路径上指向文件的流，并提供了在文件中读写字节和字节数组的方法，通过这些方法FileStream对象可以读取诸如图像、声音、视频、文本文件等，也就是说FileStream能够处理各种数据文件。

{% codeblock lang:# FileStream类有很多重载的构造方法，其中最常用的是带有三个参数的构造方法 %}
FileStream(string path, FileMode mode, FileAccess access);
{% endcodeblock %}

FileStream类一些常用的方法如下

| 方法 | 说明 |
| ----- | ---- |
| int ReadByte() | 从文件中读取一个字节，并将读取位置提升一个字节 |
| void Flush() | 清除此流的缓冲区，使得所有缓冲的数据都写入到文件中 |
| void WriteByte(byte value) | 将一个字节写入文件流的当前位置 |
| void Write(byte[] array,int offset,int count) | 从缓冲区读取数据将字节块写入该流 |
| int Read(byte[] array,int offset,int count) | 从流中读取字节块并将该数据写入给定缓冲区中 |
| long Seek(long offset,SeekOrigin origin) | 将该流的当前位置设置为给定值 |

#### FileStream类读取文件

FileStream类除了可以以字节的方式读取文件外，还可以对文件任意位置进行读取，在FileStream类的内部有一个文件指针用于维护文件的位置，该指针指向文件进行下一次读写操作的位置。大多数情况下，当打开文件时，指针就指向文件的开始位置，如果想修改指针的位置可以使用FileStream对象的Seek()方法。

{% codeblock lang:c# %}
FileStream aFile=File.OpenRead("Data.txt");
aFile.Seek(8,SeekOrigin.Current);
{% endcodeblock %}

{% note info modern %}
`Seek()`方法中的第一个参数表示文件指针移动距离（以字节为单位）；第二个参数表示开始计算的起始位置，用SeekOrigin枚举类型的一个值表示，Begin表示文件开始位置，Current表示文件当前位置，End表示文件结束位置。
{% endnote %}

{% codeblock lang:c# %}
using System;
using System.IO;
using System.Text;
namespace Program{
    class Program{
        static void Main(string[] args){
            byte[] byteData = new byte[1024];
            char[] charData = new char[1024];
            using (FileStream aFile=new FileStream("Data.txt",FileMode.Open))//创建文件，创建好的文件放在项目路径\bin\Debug目录下
            {
                aFile.Seek(0, SeekOrigin.Begin);//设置当前流的位置
                //从流中读取字节块到byteData数组中
                aFile.Read(byteData, 0, 1024);
            }
            //将字节数组和内部缓冲区的字节解码为字符数组
            Decoder d = Encoding.Default.GetDecoder();
            d.GetChars(byteData, 0, byteData.Length, charData, 0);
            Console.WriteLine(charData);
        }
    }
}
{% endcodeblock %}

{% note info modern %}
一个文字3个字节
{% endnote %}

#### FileStream类写入文件

{% codeblock lang:c# %}
using System;
using System.IO;
using System.Text;
namespace Program{
    class Program{
        static void Main(string[] args){
            byte[] byteData;  //定义一个字节数组
            char[] charData;  //定义一个字符数组
            try
            {
                //创建FileStream流对象，并使用using关键字包含执行代码
                using (FileStream aFile = new FileStream("Data.txt", FileMode.Create))
                {
                    //写一段字符串并使用ToCharArray()方法转换为字符存储到字符数组中
                    charData = "Hello world by C#".ToCharArray();
                    byteData = new byte[charData.Length];
                    Encoder e = Encoding.Default.GetEncoder(); //使用Encoder类将字符数组转换为字节数组
                    e.GetBytes(charData, 0, charData.Length, byteData, 0, true);
                    aFile.Seek(0, SeekOrigin.Begin); //文件指针指向文件开始位置
                    aFile.Write(byteData, 0, byteData.Length); //开始将字节数组中的数据写入文件
                }
            }
            catch (IOException ex)//处理相关异常
            {
                Console.WriteLine("文件操作异常");
                Console.WriteLine(ex.ToString());
            }
        }
    }
}
{% endcodeblock %}

#### 实例：复制文件

{% codeblock lang:c# %}
using System;
using System.IO;
namespace Program{
    class Program{
        static void Main(string[] args){
            string source = "Data.txt";
            string target = "Data(1).txt";
            //创建文件流
            using (FileStream fsRead=new FileStream(source,FileMode.Open))
            {
                using (FileStream fsWrite=new FileStream(target,FileMode.Create))
                {
                    byte[] bytes = new byte[1024];//创建缓冲区
                    //循环读取文件
                    while (true)
                    {
                        int r = fsRead.Read(bytes, 0, bytes.Length);
                        if (r <= 0)
                        {
                            break;
                        }
                        fsWrite.Write(bytes, 0, bytes.Length);//写入文件
                    }
                }
            }
            Console.WriteLine("文件Data内容已写入文件Data(1)中");
        }
    }
}
{% endcodeblock %}

### StreamReader类和StreamWriter类

#### StreamWriter类

StreamWriter类用于将字符和字符串写入到文件中，它实际上是先转换为FileStream对象，然后向文件中写入数据，所以在创建对象时可以通过FileStream类的对象来创建StreamWriter类的对象，同时也可以直接创建StreamWriter类对象。

{% codeblock lang:c# 当FileStream类的对象存在时，可以通过该对象来创建StreamWriter类的对象 %}
FileStream aFile = new FileStream("Data.txt",FileMode.CreateNew);//FileMode.CreateNew模式可以创建第一个参数指定的文件，文件存在会引发异常
StreamWriter sw = new StreamWriter(aFile);
{% endcodeblock %}

{% codeblock lang:c# 还可以通过指定文件来创建StreamWriter类的对象 %}
StreamWriter sw = new StreamWriter("Data.txt");
{% endcodeblock %}

{% codeblock lang:c# %}
static void Main(string[] args){
    try
    {
        //创建文件流对象,如果文件不存在则创建Data.txt文件
        StreamWriter sw = new StreamWriter("Data.txt");
        //向文件中写入一段文字
        sw.WriteLine("传智播客是国内一流教育培训机构");
        sw.Close();     //关闭当前流对象
    }
    catch (IOException ex)
    {
        Console.WriteLine("文件操作异常");
        Console.WriteLine(ex.ToString());
        return;
    }
}
{% endcodeblock %}

{% codeblock lang:c# 使用StreamWriter类的对象对文件进行追加内容的操作 %}
static void Main(string[] args){
    try
    {
        //对上面项目中的Data.txt进行追加操作
        string path = @"Data.txt";
        StreamWriter sw = new StreamWriter(path, true);
        sw.WriteLine("网址：www.itcast.cn"); //向文件中追加一段文字
        sw.Close();            //关闭当前流对象
    }
    catch (IOException ex)
    {
        Console.WriteLine("文件操作异常");
        Console.WriteLine(ex.ToString());
        return;
    }
}
{% endcodeblock %}

#### StreamReader类

当FileStream类的对象存在时，可以通过该对象来创建StreamWriter类的对象

{% codeblock lang:c# %}
FileStream aFile = new FileStream("Data.txt",FileMode.Open);
StreamReader sr = new StreamReader(aFile);
{% endcodeblock %}

StreamReader类与StreamWriter类一样，可以通过具体文件路径的字符串来创建StreamReader类的对象

{% codeblock lang:c# %}
StreamReader sr = new StreamReader("Data.txt");
{% endcodeblock %}

{% codeblock lang:c# %}
static void Main(string[] args){
    string line;
    string path = @"Data.txt";
    try
    {
        FileStream aFile = new FileStream(path, FileMode.Open); //打开路径为path的文件
        StreamReader sr = new StreamReader(aFile); //创建读取流对象
        line = sr.ReadLine(); //读取文件中的第一行
        while (line != null)
        {//如果文件不为空,则继续读取文件并输出至控制台
            Console.WriteLine(line);
            line = sr.ReadLine();
        }
        sr.Close();               //当文件读取完毕后，关闭当前流对象
    }
    catch (IOException ex)
    {
        Console.WriteLine("文件操作异常");
        Console.WriteLine(ex.ToString());
        return;
    }
}
{% endcodeblock %}

#### 实例：读写文件

{% codeblock lang:c# %}
static void Main(string[] args){
    string temp;
    StreamWriter sw = new StreamWriter("Data.txt", true, Encoding.Default);
    sw.WriteLine("传智播客是国内一流IT教育培训机构");
    sw.Close();          //关闭StreamWriter文件流
    StreamReader sr = new StreamReader("Data.txt", Encoding.Default);
    //逐行读取数据，如果未读取到数据则返回null
    while ((temp = sr.ReadLine()) != null)
    {
        Console.WriteLine(temp);
    }
    sr.Close();         //关闭StreamReader文件流
    sr.Dispose();       //释放StreamReader对象
    sw.Dispose();       //释放StreamWriter对象  
}
{% endcodeblock %}

### Path类

`Path`类中包含了一系列用于对文件路径进行操作的方法

| 方法 | 功能描述 |
| ---- | ------- |
| string Combine(params string[] paths) | 将字符串或字符串数组组合成一个路径 |
| string GetDirectoryName(string path) | 返回指定路径字符串的目录信息 |
| string GetExtension(string path) | 返回指定路径字符串的扩展名 |
| string GetFileName(string path) | 返回指定路径字符串的文件名和扩展名 |
| string GetFullPath(string path) | 返回指定路径字符串的绝对路径 |
| bool HasExtension(string path) | 确定路径是否包括文件扩展名 |
| string GetPathRoot(string path) | 获取指定路径的根目录信息 |
| string GetTempPath() | 返回当前用户的临时文件夹的路径 |
| string GetTempFileName() | 创建磁盘上唯一命名的零字节的临时文件并返回该文件的完整路径 |
| string ChangeExtension(string path,string extension) | 更改路径字符串的扩展名 |

{% codeblock lang:c# %}
static void Main(string[] args){
    string path = @"D:\C#\ConsoleApp2\bin\Debug\netcoreapp3.1\Data.txt";
    //修改文件的扩展名
    string str = Path.ChangeExtension(path, "exe");
    Console.WriteLine("修改文件扩展名后：" + str);
    //拼接路径D:\C#\ConsoleApp2\bin\Debug\netcoreapp3.1\Data.txt
    string path1 = Path.Combine(@"D:\C#\ConsoleApp2\bin\Debug\", @"netcoreapp3.1\Data.txt");
    Console.WriteLine("拼接后的路径：" + path1);
    //获取文件或文件夹的路径 
    string path2 = Path.GetDirectoryName(path);
    Console.WriteLine("返回的目录信息为：" + path2);
    //获取扩展名 
    string ext = Path.GetExtension(path);
    Console.WriteLine("获取扩展名为：" + ext);
    //获取文件名 
    Console.WriteLine("包含扩展名：" + Path.GetFileName(path));
    Console.WriteLine("不包含扩展名：" + Path.GetFileNameWithoutExtension(path));
    //获取根目录信息
    Console.WriteLine("根目录信息为：" + Path.GetPathRoot(path));
    //由相对路径获取绝对路径
    string str1 = Path.GetFullPath("Data.txt");
    Console.WriteLine("全路径名字：" + str1);
    //修改文件扩展名后：D:\C#\ConsoleApp2\bin\Debug\netcoreapp3.1\Data.exe
    //拼接后的路径：D:\C#\ConsoleApp2\bin\Debug\netcoreapp3.1\Data.txt
    //返回的目录信息为：D:\C#\ConsoleApp2\bin\Debug\netcoreapp3.1
    //获取扩展名为：.txt
    //包含扩展名：Data.txt
    //不包含扩展名：Data
    //根目录信息为：D:\
    //全路径名字：D:\C#\ConsoleApp2\bin\Debug\netcoreapp3.1\Data.txt
}
{% endcodeblock %}

### BufferedStream类

前面的各种操作类及方法都是将文件存储到硬盘，但有时希望将文件临时存储到缓冲区，以便读取。
为此，c#中提供`BufferedStream`类，该类必须与其他流一起使用，并将这些流写入内存中，这样可以提高读取和写入速度。
BufferedStream提供了几个常用的操作方法，Read()方法、Write()方法和Flush()方法

1. Read()方法
`Read()`方法用于读取缓冲区中的数据
{% codeblock lang:c# %}
public override int Read(byte[] array,int offset, int count);
{% endcodeblock %}

2. Write()方法
`Write()`方法用于将字节复制到缓冲流，并在缓冲流内的当前位置继续写入字节
{% codeblock lang:c# %}
public override int Write(byte[] array,int offset,int count);
{% endcodeblock %}

3. Flush()方法
`Flush()`方法用于清除当前流中的所有缓冲区，使得所有缓冲的数据都被写入到存储设备中
{% codeblock lang:c# %}
public override void Flush()
{% endcodeblock %}

{% codeblock lang:c# 创建Data1.txt文件（输入测试BufferedStream类成功！）与Data2.txt文件 %}
static void Main(string[] args){
    int i;
    FileStream myStream1, myStream2;
    BufferedStream myBStream1, myBStream2;
    byte[] myByte = new byte[1024]; //定义字节数组
    Console.WriteLine("读写前");
    Print("Data2.txt");
    myStream1 = File.OpenRead("Data1.txt");    //打开文件
    myStream2 = File.OpenWrite("Data2.txt");
    myBStream1 = new BufferedStream(myStream1); //实例化缓冲流对象
    myBStream2 = new BufferedStream(myStream2);
    //开始读取myBStream1流对象中的内容，返回读取的字节数
    i = myBStream1.Read(myByte, 0, 1024);
    while (i > 0)
    {
        myBStream2.Write(myByte, 0, i);//向myBStream2流对象中写入内容
        i = myStream1.Read(myByte, 0, 1024);
    }
    myBStream2.Flush(); //清空当前流的缓冲空间
    myStream1.Close();
    myStream2.Close(); //关闭当前流对象
    Console.WriteLine("读写后");
    Print("Data2.txt");
    //读写前
    //文件Data2.txt内容为：
    //读写后
    //文件Data2.txt内容为：测试BufferedStream类成功！
}
public static void Print(string path)
{
    using (StreamReader sr = new StreamReader(path, Encoding.Default))
    {
        string content = sr.ReadToEnd();
        Console.WriteLine("文件{0}内容为：{1}", path, content);
    }
}
{% endcodeblock %}

{% note info modern %}
由于缓冲流在内存的缓冲区中直接读取数据，而不是从磁盘中直接读取数据，所以它处理大容量的文件尤为合适。
{% endnote %}

### 序列化和反序列化

在程序开发中有时需要传输和保存对象，但对象是无法直接进行数据传输和保存的，所以C#中提供了序列化和反序列化。**序列化是指将对象状态转换为可传输或可保存的过程**，此时必须使用Serializable标签标记该对象。**反序列化是指将存储的流转换为对象的过程**。

{% codeblock lang:c# %}
using System;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
namespace Program
{
    class Program
    {
        static void Main(string[] args){
            Person p = new Person();//构造一个用于序列化操作的对象
            p.Name = "IT";
            p.Age = 8;
            //构造序列化对象
            BinaryFormatter bf = new BinaryFormatter();
            //构造输出流
            using (FileStream fs=new FileStream("Data.txt",FileMode.OpenOrCreate,FileAccess.ReadWrite))
            {
                //进行序列化输出操作
                bf.Serialize(fs, p);
                Console.WriteLine("序列化操作成功，对象已写入文件");
            }
            using (FileStream fs1 = new FileStream("Data.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite))
            {
                //进行反序列化，返回一个object类型的对象
                object obj = bf.Deserialize(fs1);
                Console.WriteLine("反序列化对象数据为" + obj);
            }
        }
        //序列化操作成功，对象已写入文件
        //反序列化对象数据为Name:IT,Age:8
    }
    [Serializable]//使用Serializable标签标记Person类
    class Person{
        public int Age
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public override string ToString()
        {
            return string.Format("Name:{0},Age:{1}", this.Name, this.Age);
        }
    }
}

{% endcodeblock %}

## 使用ADO.NET操作数据库

### 认识数据库

数据库（Database，DB）是按照数据结构来组织、存储和管理数据的仓库，其本身可看作电子化的文件柜，用户可以对文件中的数据进行增加、删除、修改、查找等操作。

**1.数据结构化**
数据库系统实现了整体数据的结构化，这是数据库的最主要特征之一。这里所说的“整体”结构化，是指在数据库中的数据不只是针对某个应用，而是面向全组织，面向整体的。

**2.实现数据共享**
因为数据是面向整体的，所以数据可以被多个用户、多个应用程序共享使用，可以大幅度地减少数据冗余，节约存储空间，避免数据之间的不相容性与不一致性。

**3.数据独立性高**
数据的独立性包含逻辑独立性和物理独立性，其中，逻辑独立性是指数据库中数据的逻辑结构和应用程序相互独立，物理独立性是指数据物理结构的变化不影响数据的逻辑结构。

**4.数据统一管理与控制**
数据的统一控制包含安全控制、完整控制和并发控制。简单来说就是防止数据丢失、确保数据的正确有效，并且在同一时间内，允许用户对数据进行多路存取，防止用户之间的异常交互。

- 常见的数据库有`Oracle`、`SQL Server`、`MySQL`、`SQLite`等
- `Oracle`是一个大型数据库，具有良好的兼容性、可移值性和可可连接性
- `SQL Server`具有强大、灵活、基于Web的应用程序管理功能，而且界面友好、易于操作，但是只能在Windows上运行，对操作系统稳定性要求高
- `MySQL`是一个多用户、多线程的小型数据库服务器，存储数据速度较快，适合对数据要求不是很严格的情况
- `SQLite`是一个轻量级的数据库，常用于Android应用程序开发

### ADO.NET常用类

ADO.NET是微软.NET数据库访问架构，它是数据库应用程序和数据源之间沟通的桥梁，主要提供一个面向对象的数据访问架构，用于实现数据的访问功能。

ADO.NET的名称起源于ADO（ActiveX Data Objects)，ADO是一个COM组件库，也就是一个**通用框架类库**。该类库是在.NET编程环境中使用的数据访问接口，而ADO.NET是与C#、.NET Framework一起使用的类集的名称。ADO.NET有两部分组成，分别是**数据提供程序**（Provider）与**数据集**（DataSet）。

- **数据提供程序**（Provider）：能与数据库保持连接，并且可以执行SQL命令，还可以操纵数据集。
- **数据集**（DataSet）：能在与数据库断开连接的情况下，对数据库中的数据进行操作。

在使用ADO.NET对数据库进行操作时，通常会用到5个类，分别是`Connection`类、`Command`类、`DataReader`类、`DataAdapter`类以及`DataSet`类。

1. `Connection`类
Connection类主要用于**建立与断开数据库的连接**，通过该类可以获取当前数据连接的状态。在.NET平台下，由于SQL Server数据库提供了一些额外的操作菜单便于对数据库进行操作，因此推荐使用SQL Server数据库。

2. `Command`类
Command类主要用于**对数据库中的数据进行增、删、改、查的操作**，该类的对象可以用于执行返回数据、修改数据、运行存储过程、发送或检索参数信息的数据库命令，根据在Command类的对象中传递的SQL语句的不同，可以调用相应的方法来执行对应的SQL语句。

3. `DataReader`类
DataReader类用于**读取从数据库中查询到的数据**，在读取数据时，只能向前读不能向后读，同时也不能修该类对象中的数据。当与数据库的连接断开时，该类对象中的数据会被清除。

4. `DataAdapter`类
DataAdapter类可以看作是**数据库与`DataSet`类之间的一个桥梁**，主要使用Command类的对象在数据源中执行SQL命令，以便将数据加载到DataSet数据集中，并确保DataSet数据集中数据的更改与数据源保持一致。

5. `DataSet`类
DataSet类与 DataReader 类相似，都**用于读取从数据库中查询到的数据**，不同的是DataSet类中的数据不仅可以多次重复读取，还可以修改DataSet类中读取到的数据。

### 下载并安装SQL Server数据库

下载安装……

### 创建SQL Server数据库

**方式1：传统手动创建SQL Server数据库**
图形界面操作
**方式2：使用SQL语句创建SQL Server数据库**
【新建查询】，在窗口中的出现一个空白的页面，供编写SQL语句使用

{% codeblock lang:sql %}
USE master
--检查数据库是否存在
IF (EXISTS(SELECT * FROM sysdatabases WHERE name ='School')) 
  DROP DATABASE School     --如果已经存在School数据库，则删除School
GO
CREATE DATABASE School     --数据库名为School
ON PRIMARY 
(
 NAME = School,                         --主数据文件逻辑名称
 --数据文件路径及物理名称(D:\school路径需存在)
 FILENAME = 'D:\school\School.mdf', 
 SIZE = 5MB,                             --初始大小
 MAXSIZE = UNLIMITED,                  --最大尺寸
 FILEGROWTH = 1MB                       --自动增长的增量
)
LOG ON
( 
NAME = School_log,                       --日志文件逻辑名称
--日志文件路径及物理名称(D:\school路径需存在)
FILENAME = 'D:\school\School_log.ldf', 
SIZE = 2MB,                                  --初始大小
MAXSIZE = 4MB,                              --最大尺寸
FILEGROWTH = 10%                            --自动增长的增量
)
{% endcodeblock %}

### 创建SQL Server数据库表

**方式1：传统手动创建SQL Server数据库表**
图形界面操作
**方式2：使用SQL语句创建数据库表**
【新建查询】，在窗口中的出现一个空白的页面，供编写SQL语句使用

{% codeblock lang:sql %}
use School    --表示在名为School的数据库中创建表
go
if exists(select * from sysobjects where name='Student')
begin
    select '该表已存在'
    drop table Student    --删除表
end
else
begin
    create table Student
    (
        --设置为主键和自增长列，起始值为1，每次自增1
        Id  int not null  identity(1,1)  primary key, 
        Name nvarchar(25) null,
        Age  int  null,
        Sex  nchar(10) null,
    )
end
{% endcodeblock %}

### 使用ADO.NET访问数据库

#### 使用Connection对象连接SQL Server数据库

{% note info modern %}
Connection类有4种名称，分别是`SqlConnection`、`OracleConnection`、`OleDBConnection`和`OdbcConnection`
其中**SqlConnection类用于连接SQL Server数据库**，该类的命名空间为`System.Data.SqlClient`(**连接数据库需要导包**)
{% endnote %}

**1.定义连接数据库的字符串**
{% codeblock lang:plaintext %}
//第1种方式：
server=服务器名称/数据库的实例名;uid=登录名;pwd=密码;database=数据库名称
//第2种方式：
Data Source=服务器名称\数据库实例名;Initial Catalog=数据库名称;User ID=用户名;
Password=密码
{% endcodeblock %}
sever与Data Source 的值可以是IP地址或者数据库所在计算机名称，如果访问的是本机数据库或使用默认数据库实例名，则可以使用`.`代替。

**2. 使用SqlConnection类的对象连接SQL Server数据库**
{% codeblock lang:plaintext %}
//第1步：创建SqlConnection类的实例
SqlConnection 连接对象名 = new SqlConnection( 连接数据库的字符串 );
//第2步：打开数据库连接
数据库连接对象.Open();
//第3步：关闭数据库连接
数据库连接对象.Close();
{% endcodeblock %}

{% note warning modern %}
如果打开数据库连接是使用异常处理，需要将关闭数据库连接的语句放在`finally`语句中，保证无论程序是否发生异常都可以将数据库连接断开，并释放资源。
{% endnote %}

除了使用异常处理的方式释放资源外，还可以使用using语句的方式释放资源，具体语法如下所示：
{% codeblock lang:c# %}
using(SqlConnection 连接对象名 = new SQLConnection( 连接数据库的字符串 )){
    //打开数据库连接
    //对数据库相关操作的语句
}
{% endcodeblock %}

{% note info modern %}
关键字`using`有两个作用，一是引用命名空间，二是创建非托管资源对象。
{% endnote %}

{% hideToggle 连接数据库 %}
**1.创建程序**

- 项目名称：ConnectionForm
- 项目类型:Windows窗体应用程序

**2.窗体设计**
步骤

- `Form1.cs`重命名为`ConnectionForm`
- `Text`:连接数据库
- 添加一个**Button控件**，`Name`:buttonCon,`Text`:连接数据库

**3.实现连接SQL Server数据库**
{% codeblock lang:c# 按钮Click事件 %}
using System;
using System.Windows.Forms;
using System.Data.SqlClient;
namespace ConnectionForm
{
    public partial class ConnectionForm : Form
    {
        public ConnectionForm()
        {
            InitializeComponent();
        }
        private void buttonCon_Click(object sender, EventArgs e)
        {
            //编写连接数据库的字符串
            string connStr = "Data source=.;Initial Catalog = School;User ID = sa;Password=root";
            //创建SqlConnection 的实例
            SqlConnection conn = null;
            try
            {
                conn = new SqlConnection(connStr);
                conn.Open();       //打开数据库连接
                MessageBox.Show("数据库连接成功！");
            }
            catch (Exception ex)
            {
                MessageBox.Show("数据库连接失败" + ex.Message);
            }
            finally
            {
                if (conn!=null)
                {
                    conn.Close();
                }
            }
        }
    }
}
{% endcodeblock %}

**4.使用using语句释放资源**
{% codeblock lang:c# 17~34行代码可替换 %}
try
{
    using (SqlConnection conn=new SqlConnection(connStr))
    {
        conn.Open();//打开数据库
        MessageBox.Show("数据库连接成功！");
    }
}
catch (Exception ex)
{
    MessageBox.Show("数据库连接失败" + ex.Message);
}
{% endcodeblock %}
{% endhideToggle %}

#### 使用Command对象操作数据库

{% note info modern %}
`Command`类在`System.Data.SqlClient`命名空间下对应的类名为`SqlCommand`
{% endnote %}

**1.创建SqlCommand类的实例**
创建SqlCommand类的实例有两种方式，一种是通过命令类型为Text来创建，另一种是通过命令类型为StoredProcedure来创建
{% codeblock lang:plaintext %}
//第1种方式:通过命令类型为Text来创建SqlCommand类的实例
SqlCommand SqlCommand类的实例名 = new SqlCommand(SQL语句,数据库连接类的实例);
//第2种方式:通过命令类型为StoredProcedure来创建SqlCommand类的实例
SqlCommand SqlCommand类的实例名 = new SqlCommand(存储过程名称,数据库连接类的实例);
{% endcodeblock %}

需要注意的是，通过第二种方式创建SqlCommand类的实例过程中，存储过程必须是当前数据库实例中的存储过程。在调用带参数的存储过程时，需要在SqlCommand类的实例中添加需要的存储过程参数。为存储过程添加参数需要调用属性Parameters来设置，具体语法如下所示：
`SqlCommand 类实例.Parameters.Add( 参数名 , 参数值 );`

**2.使用SqlCommand类操作数据库**
在使用SqlCommand类执行对数据库表中的数据进行操作时，可以通过两种方式来实现，一种是执行非查询SQL语句的操作，即增加、修改、删除操作，一种是执行查询SQL语句的操作
{% codeblock lang:c# %}
//第1种方式：执行非查询SQL语句
SqlCommand 类的实例.ExecuteNonQuery();
//该方法返回值-1表示SQL语句执行失败，返回0时，表示执行的SQL语句对当前数据表的数据没有影响
//第2种：执行查询SQL语句
SqlDataReader dr = SqlCommand 类的实例.ExecuteReader();
//返回一个 SqlDataReader 类型的值，遍历可以得到返回值
int value = SqlCommand 类的实例.ExecuteScalar();
//不返回查询结果，只返回一个值，如查询表中指定信息行数

{% endcodeblock %}

{% hideToggle 数据库连接实现注册 %}
**1.创建程序**

- 项目名称：RegistrationForm
- 项目类型:Windows窗体应用程序

**2.窗体设计**
步骤

- `Form1.cs`重命名为`RegistrationForm`
- `Text`:注册
- 添加2个**Label控件**，设置`Text`为：“用户”“注册”
- 添加2个**TextBox控件**，设置`Name`为："tbName""tbPwd"，密码对应的控件`PasswordChar`属性设置为`*`
- 添加1个**Button控件**，`Name`:btnRegister,`Text`:注册

**3.创建数据库表Userinfo**
{% codeblock lang:sql %}
use School
go
create table Userinfo(
    id int identity(1,1) primary key,
    name varchar(20),
    password varchar(20)
)
{% endcodeblock %}
由SQL语句可知，创建的Userinfo表中的id字段为主键和自增长列，起始值为1，每次自增1。

**4.实现注册功能**
{% codeblock lang:c# 注册按钮Click事件 %}
private void btnRegister_Click(object sender, EventArgs e)
{
    //编写连接数据库的字符串
    string connStr = "server=.;uid=sa;pwd=root;database=School";
    try
    {
        using (SqlConnection conn=new SqlConnection(connStr))
        {
            conn.Open();
            string sql = "insert into Userinfo(name,password) values('{0}','{1}')";
            //填充SQL语句
            sql = string.Format(sql, tbName.Text, tbPwd.Text);
            //创建SqlCommand对象
            SqlCommand cmd = new SqlCommand(sql, conn);
            int returnvalue = cmd.ExecuteNonQuery();//执行SQL语句
            //判断SQL是否执行成功
            if (returnvalue!=-1)
            {
                MessageBox.Show("注册成功！");
            }
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("注册失败" + ex.Message);
    }
}
{% endcodeblock %}
**5.运行程序**
注册成功后去数据库查看。
{% endhideToggle %}

#### 使用DataReader对象查询数据库

{% note info modern %}
在`System.Data.SqlClient`命名空间中，`DataReader`类对应的类名是`SqlDataReader`
{% endnote %}

{% codeblock lang:c# %}
//第1步：执行SqlCommand对象中的ExecuteReader()方法
SqlDataReader dr=SqlCommand 类的实例.ExecuteReader();
//第2步：遍历SqlDataReader对象中的数据
dr.read();
//第3步：关闭SqlDataReader对象
dr.Close();
{% endcodeblock %}

read()方法用于判断该类的对象中是否由数据，并且指向SqlDataReader对象中的数据的下一条记录。
如果read()方法的返回值为true。则可以读取该条记录，否则无法读取

{% hideToggle 连接数据库查询数据 %}
**1.创建程序**

- 项目名称：QueryUserinfoForm
- 项目类型:Windows窗体应用程序

**2.窗体设计**
步骤

- `Form1.cs`重命名为`QueryForm`
- `Text`:查询数据
- 添加2个**Label控件**，设置`Text`为：“用户名”“没有符合条件的结果”后者`Name`:lbResult
- 添加1个**TextBox控件**，设置`Name`为："tbName"
- 添加1个**Button控件**，`Name`:btnQuery,`Text`:查询

**3.实现查询功能**
{% codeblock lang:c# 查询按钮Click事件 %}
private void btnQuery_Click(object sender, EventArgs e)
{
    //编写连接数据库的字符串
    string connStr = "server=.;uid=sa;pwd=root;database=School";
    SqlDataReader dr = null;//定义SqlDataReader 类的对象
    try
    {
        using (SqlConnection conn=new SqlConnection(connStr))
        {
            conn.Open();//打开数据库连接
            string sql = "select id,password from Userinfo where name='{0}'";
            sql = string.Format(sql, tbName.Text);//填充SQL语句
            SqlCommand cmd = new SqlCommand(sql, conn);
            dr = cmd.ExecuteReader();//执行SQL语句
            //判断是否读取到信息
            if (dr.Read())
            {
                //读取指定用户名对应的用户编号和密码
                string msg = "用户编号：" + dr[0] + " 密码：" + dr[1];
                lbResult.Text = msg;//将msg值显示在界面上
            }
            else
            {
                lbResult.Text = "没有符合条件的结果";
            }
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("查询失败！" + ex.Message);
    }
    finally
    {
        if (dr!=null)
        {
            dr.Close();//关闭SqlDataReader类对象
        }
    }
}
{% endcodeblock %}

**4.运行结果**
`F5`
{% endhideToggle %}

#### 使用DataAdapter与DataSet对象操作数据库

{% note info modern %}
在`System.Data.SqlClient`命名空间中，`DataAdapter`类对应的类名是`SqlDataAdapter`
{% endnote %}

{% codeblock lang:c# %}
//第1步：创建 SqlDataAdapter 类的对象
SqlDataAdapter sda = new SqlDataAdapter(SQL语句, 数据库连接类的实例);
//第2步：创建DataSet类的对象
DataSet ds = new DataSet();
//第3步：使用SqlDataAdapter对象sda将查询结果填充到Dataset对象ds中
sda.Fill(ds);
{% endcodeblock %}
`DataSet`类也可以替换为`DataTable`类，`DataSet`类中的数据存储实际是通过`DataTable`类实现的。

{% hideToggle 连接数据库查询数据 %}
**1.创建程序**

- 项目名称：QueryAllNameForm
- 项目类型:Windows窗体应用程序

**2.窗体设计**
步骤

- `Form1.cs`重命名为`QueryAllNameForm.cs`
- `Text`:查询数据
- 添加1个**Button控件**，`Name`:btnQuery,`Text`:查询全部用户名
- 添加1个**ListBox控件**，用于显示查询出的所有用户信息，设置`Name`:lbList

3.实现查询全部用户名功能
{% codeblock lang:c# 【查询全部用户】按钮Click事件 %}
private void btnQuery_Click(object sender, EventArgs e)
{
    //编写连接数据库的字符串
    string connStr = "Data Source=.;Initial Catalog=School;;User ID=sa;Password=root";
    try
    {
        using (SqlConnection conn=new SqlConnection(connStr))
        {
            conn.Open();//打开数据库连接
            string sql = "select name from Userinfo";
            //创建SqlDataAdapter类的对象
            SqlDataAdapter  sda = new SqlDataAdapter(sql, conn);
            DataSet ds = new DataSet();//创建DataSet类的对象
            //使用SqlDataAdapter对象sda将查询的结果填充到DataSet对象ds中
            sda.Fill(ds);S
            //设置ListBox控件的数据源（DataSource）属性
            lbList.DataSource = ds.Tables[0];
            //在listBox控件中显示name列的值
            lbList.DisplayMember = ds.Tables[0].Columns[0].ToString();
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("查询失败" + ex.Message);
    }
}
{% endcodeblock %}

**4.将实例中的DataSet对象替换为DataTable对象**
替换11-19行替换为如下实现同样的效果
{% codeblock lang:c# %}
//创建SqlDataAdapter类的对象
SqlDataAdapter sda = new SqlDataAdapter(sql, conn);
//创建DataTable类的对象
DataTable dt = new DataTable();
//使用SqlDataAdapter对象sda将查询的结果填充到DataTable对象dt中
sda.Fill(dt);
//设置ListBox控件的数据源（DataSource）属性
lbList.DataSource = dt;
//在listBox控件中显示name列的值
lbList.DisplayMember = dt.Columns[0].ToString();
{% endcodeblock %}
**5.运行程序**
`F5`
{% endhideToggle %}

## 综合项目——图书管理系统

### 项目分析

- 实现项目之前的首要任务就是对项目进行分析，如需求分析、可行性分析
- 需求分析是根据用户的需求进行分析
- 可行性分析是对开发该项目在技术可行性、经济可行性、操作可行性进行分析

#### 需求分析

随着计算机科技的发展，人们的生活变的越来越离不开计算机，通过计算机的普及和信息技术的发展，各类计算机软件逐渐渗透到人们的生活中，迅速的改善了人们的生活质量，提高了人们的工作效率。在学校中，有很多同学会去图书馆看书、借阅图书，图书借阅是学生获取知识的一个很重要的途径。为了方便学生借书又能减轻图书管理员的工作负担，高效地完成图书借阅的管理工作，我们设计了一个图书管理系统软件，并通过C#语言开发了这款软件，供学校与校外的图书馆使用。

#### 可行性分析

1. 技术可行性分析
本书开发的图书管理系统采用的是Visual Studio Community2019+SQL Server2019开发环境，这种Microsoft官网推荐的开发环境在技术上已经十分成熟，并且可以免费下载。

2. 经济可行性分析
本书开发的图书管理系统，从开发的硬件上来说，只需要一台电脑，开发环境只需要从Microsoft官网上免费下载开发工具Visual Studio Community2019与SQL Server2019。

3. 操作可行性分析
图书管理系统采用C#软件研发的风格，使用.NET框架中的原生组件与自定义组件进行研发，使界面效果更炫酷，用户体验更友好，因此在操作上也是可行的。

### 项目简介

#### 项目概述

图书管理系统是一个适用于图书馆的项目，该项目中包含用户注册、用户登录、图书管理系统主菜单、读者类别、读者管理、图书管理以及借书与还书的管理。其中读者类别中包含读者的类别号、类别名称、可借书数量、可借书天数；读者管理中包含读者编号、类别号、姓名、单位、QQ、已借书数量；图书管理中包含书号、书名、作者、出版社、单价以及图书是否在馆的状态；借书与还书管理中包含读者的编号、书号。

该项目除了显示读者类别、读者管理、图书管理以及借书还书管理中包含的信息之外，还可以对这些信息进行添加、查询、修改、删除的操作。

#### 开发环境

- 操作系统：Windows 11系统
- 开发工具：Visual Studio Community 2019、SQL Server 2019
- 框架版本：.NET Framework 4.7.2

#### 项目功能结构

图书管理系统项目主要分为6个功能模块，分别是【登录模块】【主菜单模块】【读者类别模块】【读者管理模块】【图书管理模块】和【借书还书模块】。

### 效果展示

#### 登录窗体

程序启动后，首先会进入登录窗体，该窗体中主要用于展示用户名与密码的输入框，同时还展示了【登录】与【注册】按钮，单击【登录】按钮，程序会根据用户输入的用户名与密码来实现图书管理系统的登录功能，单击【注册】按钮，程序会隐藏当前窗体，显示注册窗体。
![登录窗体](2022-12-01-12-02-08.png)

#### 注册窗体

单击登录窗体中的【注册】按钮，程序会隐藏登录窗体，显示注册窗体，该窗体中主要用于展示用户名与密码的输入框，同时还展示了【注册】与【取消】按钮。单击【注册】按钮，程序会根据用户输入的用户名与密码实现注册功能，单击【取消】按钮，程序会关闭当前窗体，显示登录窗体。
![注册窗体](2022-12-01-12-02-49.png)

#### 主菜单窗体

当用户登录成功后，程序会进入到图书管理系统主菜单窗体，在该窗体中展示【读者类别】【图书管理】【读者管理】【借书还书】【退出系统】等按钮信息，单击【退出系统】按钮，程序会退出整个系统，单击窗体中的其他按钮，程序会隐藏当前窗体，显示每个按钮对应的窗体。
![主菜单窗体](2022-12-01-12-03-39.png)

#### 读者类别窗体

单击主菜单窗体中的【读者类别】按钮，进入读者类别窗体。在读者类别窗体中通过一个表格展示读者类别号、类别名称、可借书数量、可借书天数信息，选中表格中的任意一行，在窗体的左侧输入框中会显示该行中的读者类别信息。在该窗体中还显示了5个按钮，分别是【返回主菜单】按钮、【添加】按钮、【查询】按钮、【删除】按钮以及【修改】按钮。

#### 读者管理窗体

单击读者类别窗体中的【读者管理】按钮，程序会隐藏主菜单窗体，显示读者管理窗体。在读者管理窗体中通过一个表格展示读者编号、类别号、姓名、单位、QQ、已借书数量信息，选中表格中的任意一行，在窗体的左侧输入框中会显示该行中的读者信息。在该窗体中还显示了5个按钮，分别是【返回主菜单】按钮、【添加】按钮、【查询】按钮、【删除】按钮以及【修改】按钮。

#### 图书管理窗体

单击读者管理窗体中的【图书管理】按钮，程序会隐藏主菜单窗体，显示图书管理窗体。在图书管理窗体中通过一个表格展示书号、书名、作者、出版社、单价、状态信息，选中表格中的任意一行，在窗体的左侧输入框中会显示该行中的图书信息。在该窗体中还显示了5个按钮，分别是【返回主菜单】按钮、【添加】按钮、【查询】按钮、【删除】按钮以及【修改】按钮。

#### 借书还书窗体

单击图书管理窗体中的【借书还书】按钮，程序会隐藏主菜单窗体，显示借书还书窗体。在借书还书窗体中通过一个表格展示读者编号、书号、借书日期、应还日期信息，选中表格中的任意一行，在窗体的左侧输入框中会显示该行中的读者编号与书号信息。在该窗体中还显示了3个按钮，分别是【返回主菜单】按钮、【借书】按钮、【还书】按钮。

### 图书管理系统数据库

#### 数据库设计

在开发图书管理系统时，我们需要存储一些数据信息，如登录信息、图书信息、读者信息、读者类别信息等，同时也需要对这些数据进行一些增、删、改、查的操作，此时我们需要使用数据库来存储这些数据，这里使用的是SQL Server数据库，在数据库中需要设计以下数据表。

**1.登录表**
登录信息表中需要设计的字段有用户编号（Id）、用户名称（UserName）、用户密码（Password）。

| 字段名 | 类型 | 长度 | 是否为空 | 描述 |
| ----- | ---- | ---- | ------- | ---- |
| Id | int | | 否 | 用户编号（主键） |
| UserName | nvarchar | 25 | 否 | 用户名称 |
| Password | nvarchar | 25 | 否 | 用户密码 |

**2. 图书表**
图书表中需要设计的字段有图书编号（bkID）、图书名称（bkName）、作者（bkAuthor）、出版社（bkPress）、单价（bkPrice）、是否在馆（bkStatus）。

| 字段名 | 类型 | 长度 | 是否为空 | 描述 |
| ----- | ---- | ---- | ------- | ---- |
| bkId | char | 9 | 否 | 图书编号（主键） |
| bkName | varchar | 50 | 是 | 图书名称 |
| bkAuthor | varchar | 50 | 是 | 作者 |
| bkPress | varchar | 50 | 是 | 出版社 |
| bkPrice | decimal |  | 是 | 单价 |
| bkStatus | int |  | 是 | 是否在馆，1：在馆，0：不在馆 |

**3.读者类别表**
读者类别表中需要设计的字段有读者类别编号（rdType）、读者类别名称（rdTypeName）、可借书数量（canLendQty）、可借书天数（canLendDay）。

| 字段名 | 类型 | 长度 | 是否为空 | 描述 |
| ----- | ---- | ---- | ------- | ---- |
| rdType | int | | 否 | 读者类别编号（主键） |
| rdTypeName | varchar | 20 | 是 | 读者类别名称 |
| canLendQty | int |  | 是 | 可借书数量 |
| canLendDay | int |  | 是 | 可借书天数 |

**4.读者表**
读者表中需要设计的字段有读者编号（rdID）、读者类别编号（rdType）、读者姓名（rdName）、读者单位（rdDept）、读者QQ（rdQQ）、已借书数量（rdBorrowQty）。

| 字段名 | 类型 | 长度 | 是否为空 | 描述 |
| ----- | ---- | ---- | ------- | ---- |
| rdID | char | 9 | 否 | 读者编号（主键） |
| rdType | int | | 是 | 读者类别编号 |
| rdName | varchar | 25 | 是 | 读者姓名 |
| rdDept | varchar | 40 | 是 | 读者单位 |
| rdQQ | varchar | 25 | 是 | 读者QQ |
| rdBorrowQty | int | | 是 | 已借书数量 |

**5.借书表**
借书表中需要设计的字段有读者编号（rdID）、图书编号（bkID）、借书日期（DateBorrow）、还书日期（DateLendPlan）。

| 字段名 | 类型 | 长度 | 是否为空 | 描述 |
| ----- | ---- | ---- | ------- | ---- |
| rdID | char | 9 | 否 | 读者编号 |
| bkId | char | 9 | 否 | 图书编号 |
| DateBorrow | datetime |  | 是 | 借书日期 |
| DateLendPlan| datetime |  | 是 | 应还日期 |

#### 创建数据库

由于本项目中需要创建1个图书数据库BookDB与5个数据库表Login、Book、ReaderType、Reader、Borrow，通过SQL语句创建图书数据库与数据库表的具体内容如下。

**1.创建图书数据库BookDB**
{% codeblock lang:sql %}
create database BooksDB
on primary
(name='BooksDB_DATA',
filename='D:\books\BooksDB.MDF',-- 文件夹需要存在
size=5MB,
maxsize=30MB,
filegrowth=20%)
log on
(name='BooksDB_LOG',
filename='D:\books\BooksDB.LDF',
size=5MB,
maxsize=30MB,
filegrowth=3MB)
{% endcodeblock %}

**2.创建数据库表**
{% codeblock lang:sql %}
use BookDB
go
create table Login(	--创建登录表
-- 设置为主键和自增长列，起始值为1，每次自增1
Id int not null identity(1,1) primary key,
UserName nvarchar(25) not null,	-- 登录名
Password nvarchar(25) not null, -- 密码
)
create table ReaderType( -- 创建读者类别表
rdType int primary key,	-- 读者类别编号
rdTypeName varchar(20),	--读者类别名称
canLendQty int,					-- 可借书天数
canLendDay int,					-- 可借书天数
)
create table Reader(	--创建读者表
rdID char(9) primary key,	-- 读者编号
rdType int references ReaderType(rdType),	--读者类别编号
rdName varchar(25),	-- 读者姓名
rdDept varchar(40),	-- 读者单位
rdQQ varchar(25),	-- 读者QQ
rdBorrowQty int default 0 check(rdBorrowQty between 0 and 10)	-- 已借书数量
)
create table Book(	-- 创建图书表
bkID char(9) primary key,	-- 图书编号
bkName varchar(50),	-- 图书名字
bkAuthor varchar(50),	-- 作者
bkPress varchar(50),	-- 出版社
bkPrice decimal(5,2), --单价
bkStatus int default 1,	-- 是否在馆，1：在，2：不在
)
create table Borrow(	-- 创建借书表
rdID char(9) references Reader(rdID), -- 读者编号
bkID char(9) references Book(bkID),	-- 图书编号
DateBorrow DateTime,	-- 借书日期
DateLendPlan DateTime,	-- 还书日期
primary key(rdID,bkID)
)
{% endcodeblock %}

**3.向数据库表中添加数据**
{% codeblock lang:sql %}
use BookDB
go
insert into ReaderType -- 向读者类别表添加数据
values
('1','教师','10','60'),
('2','本科生','2','30'),
('3','硕士研究生','3','40'),
('4','博士研究生','8','50')
go
insert into Reader -- 向读者表添加数据
values
('rd2022001','1','黑马','计算机科学学院','','0'),
('rd2022002','5','Qing','软件学院','1234567890','0')
go
insert into Book -- 向图书表中添加数据
values
('bk2020001','C#程序设计基础入门教程','黑马程序员','人民邮电出版社','59.80','1')
{% endcodeblock %}

### 登录功能业务实现

#### 登录窗体设计

登录窗体实现【登录】【注册】
**1.创建程序**

- 项目名称：BookManagementSystem
- 项目类型:Windows窗体应用程序

**2.窗体设计**
步骤

- `Form1.cs`重命名为`LoginForm.cs`
- `Text`:管理员登录
- `BackgroundImage`:"login.png",`BackgroundImageLayout`:Stretch
- 添加2个**TextBox控件**用于输入用户名和密码，`Name`:"tbUserName""tbPassword",`Font`:"宋体""10.5pt(五号)",密码框`PasswordChar`:*
- 添加2个**ButtonBox控件**用于【登录】【注册】，`Name`:"btnLogin""btnRegister",`Text`“登录”“注册”,`BlackColor`:"Transparent(透明)",`FlatStyle`:"Flat（按钮外观平滑）",`BorderSize`:0,`MouseDownBackColor`和`MouseOverBackColor`:"Transparent(透明)",`ForeColor`:White,`Font`:"宋体""12pt(小四)"

#### 实现登录功能

当用户注册过账号时，在登录窗体中输入用户名与密码后，单击【登录】按钮，程序会与数据库连接来判断输入的用户名与密码是否正确，如果正确，则登录成功进入到主菜单窗体，否则，程序会根据不同的情况提示“密码错误！”或“用户不存在！”或“操作数据库出错！”。如果用户还未注册账号，此时可以单击登录窗体中的【注册】按钮，进入到注册窗体中注册一个账号。

**1.实现登录功能**
{% codeblock lang:c# 【登录】按钮Click事件 %}
private static LoginForm loginForm = null;
public static LoginForm getInstance()//单例模式
{
    if (loginForm == null)
    {
        loginForm = new LoginForm();
    }
    return loginForm;
}
private void btnLogin_Click(object sender, EventArgs e)
{
    //编写连接数据库的字符串
    string connStr = "server=.;uid=sa;pwd=root;database=BookDB";
    try
    {
        string User = tbUserName.Text;
        string Pwd = tbPassword.Text;
        if (string.IsNullOrWhiteSpace(User) || string.IsNullOrWhiteSpace(Pwd))
        {
            MessageBox.Show("用户名或密码不能为空!");
            return;
        }
        using (SqlConnection conn = new SqlConnection(connStr))
        {
            conn.Open();
            //创建SqlCommand对象
            SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = "select * from Login where UserName='" + User + "'";
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                string passward = reader.GetString(reader.GetOrdinal("Password"));
                if (Pwd == passward)
                {
                        MessageBox.Show("登录成功！");
                    this.Hide();//隐藏当前窗体
                    new MainMenuForm().Show();//开启主菜单窗体
                }
                else
                {
                    MessageBox.Show("密码错误！");
                    tbPassword.Text = "";
                }
            }
            else
            {
                MessageBox.Show("用户不存在！");
                tbUserName.Text = "";
                tbPassword.Text = "";
            }
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("数据库操作失败" + ex.Message);
    }
}
{% endcodeblock %}
**2.实现显示注册窗体的功能**
{% codeblock lang:C# 【注册】按钮Click事件 %}
private void btnRegister_Click(object sender, EventArgs e)
{
    this.Hide();//隐藏当前窗体
    new RegisterFrom().Show();//显示注册窗体
}
private void LoginForm_FormClosing(object sender, FormClosingEventArgs e)
{
    loginForm = null;//将loginForm设置为null
    Application.Exit();
}
{% endcodeblock %}

### 注册功能业务实现

#### 注册窗体设计

登录窗体实现【注册】【取消】
**1.创建注册窗体**

- 窗体名称：RegisterForm.cs

**2.窗体设计**
步骤

- `Text`:注册
- `BackgroundImage`:"register_bg.png",`BackgroundImageLayout`:Stretch
- 添加2个**TextBox控件**用于输入用户名和密码，`Name`:"tbUserName""tbPassword",`Font`:"宋体""15pt(小三号)",密码框`PasswordChar`:*
- 添加2个**ButtonBox控件**用于【注册】【取消】，`Name`:"btnRegister""btnCancel",`Text`“注册”“取消”,`BlackColor`:"Transparent(透明)",`FlatStyle`:"Flat（按钮外观平滑）",`BorderSize`:0,`MouseDownBackColor`和`MouseOverBackColor`:"Transparent(透明)",`ForeColor`:White,`Font`:"宋体""15pt(小三)"

#### 实现注册窗体

1.实现注册功能
{% codeblock lang:c# 【注册】按钮Click事件 %}
 private void btnRegister_Click(object sender, EventArgs e)
{
    //编写连接数据库的字符串
    string connStr = "server=.;uid=sa;pwd=root;database=BookDB";
    try
    {
        using (SqlConnection conn =new SqlConnection(connStr))
        {
            conn.Open();
            if (string.IsNullOrWhiteSpace(tbUserName.Text) || string.IsNullOrWhiteSpace(tbPassword.Text))
            {
                MessageBox.Show("用户名或密码不能为空!");
                return;
            }
            string sql = "insert into Login(UserName,Password) values('{0}','{1}')";
            sql = string.Format(sql, tbUserName.Text, tbPassword.Text);
            SqlCommand cmd = new SqlCommand(sql, conn);
            int returnvalue = cmd.ExecuteNonQuery();
            if (returnvalue!=-1)
            {
                MessageBox.Show("注册成功！");
            }
            else
            {
                MessageBox.Show("注册失败！");
            }
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("注册失败" + ex.Message);
    }
}
{% endcodeblock %}
2.实现取消显示登录窗体功能
{% codeblock lang:C# 【取消】按钮Click事件以及窗体FormClosing事件 %}
private void btnCancel_Click(object sender, EventArgs e)
{
    this.Close();
}
private void RegisterFrom_FormClosing(object sender, FormClosingEventArgs e)
{
    LoginForm.getInstance().Show();
}
{% endcodeblock %}

### 主菜单功能业务实现

#### 主菜单窗体设计

#### 实现主菜单功能

1. 显示4个按钮对应的窗体
2. 实现退出系统功能

{% codeblock lang:c# %}
private static MainMenuForm mainMenForm = null;
public static MainMenuForm getInstacce()
{
    if (mainMenForm == null)
    {
        return new MainMenuForm();
    }
    return mainMenForm;
}
private void btnCategory_Click(object sender, EventArgs e)
{
    this.Hide();
    new ReaderCategoryForm().Show();
}
private void MainMenForm_Load(object sender, EventArgs e)
{
    this.Hide();
    new BookManagementForm().Show();
}
private void btnReader_Click(object sender, EventArgs e)
{
    this.Hide();
    new ReaderManagementForm().Show();
}
private void btnBorrRet_Click(object sender, EventArgs e)
{
    this.Hide();
    new BorrAndRetForm().Show();
}
private void btnExit_Click(object sender, EventArgs e)
{
    Application.Exit();
}
private void MainMenuForm_FormClosed(object sender, FormClosedEventArgs e)
{
    mainMenForm = null;
    Application.Exit();
}
{% endcodeblock %}

### 读者类别功能业务实现

#### 读者类别窗体设计

**1.创建读者类别窗体**
在项目中创建一个名为ReaderCategoryForm的读者类别窗体。
**2.添加窗体控件：**

- 添加4个**Label控件**分别用于显示“类别号”“类别名称”“可借书数量”“可借书天数”，设置`BackColor`:Transparent`,`ForeColor`:White
- 添加4个**TextBox控件**用于显示对应输入框，设置`Name`:"tbRdType""tbRdTypeName""tbCanLendQty""tbRdCanLendDay"
- 添加5个**Button控件**用于【返回主菜单】【添加】【查询】【删除】【修改】按钮，设置`Name`:"btnBackMenu""btnAdd""btnQuery""btnDelete""brnAlter"`BlackColor`:"Transparent(透明)",`FlatStyle`:"Flat（按钮外观平滑）",`BorderSize`:0,`MouseDownBackColor`和`MouseOverBackColor`:"Transparent(透明)",`ForeColor`:White,`Font`:"宋体""18pt(小二)"
- 添加1个**DataGridView**控件，设置`Name`:dgvRdCategory,`BackgroundColor`:White
- ![读者类别窗体设计](2022-12-01-11-36-20.png)

#### 实现读者类别管理功能

读者类别窗体中主要实现的是5个按钮的单击事件，这5个按钮分别是 【返回主菜单】按钮、【添加】按钮、【查询】按钮、【删除】按钮、【修改】按钮。单击这5个按钮，程序会修改数据库中指定的读者类别对应的任意数据信息。

**1.实现【返回主菜单】按钮的单击事件**
{% codeblock lang:c# 【返回主菜单】按钮Click事件 %}
private void btnBackMenu_Click(object sender, EventArgs e)
{
    this.Close();
}
private void ReaderCategoryForm_FormClosed(object sender, FormClosedEventArgs e)
{
    MainMenuForm.getInstacce().Show();
}
{% endcodeblock %}

**2.实现加载读者类别信息功能**
{% codeblock lang:c# %}
static string  conStr = "server=.;uid=sa;pwd=root;database=BookDB";
private void DataBind()
{
    try
    {
        using (SqlConnection conn =new  SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select rdType 类别号,rdTypeName 类别名称,CanLendQty 可借数量,canLendDay 可借天数 from ReaderType";
            SqlDataAdapter sda = new SqlDataAdapter(comm);
            DataSet ds = new DataSet();
            sda.Fill(ds);
            dgvRdCategory.DataSource = ds.Tables[0];
            tbRdType.DataBindings.Clear();
            tbRdTypeName.DataBindings.Clear();
            tbCanLendQty.DataBindings.Clear();
            tbCanLendDay.DataBindings.Clear();
            tbRdType.DataBindings.Add("Text", ds.Tables[0], "类别号");
            tbRdTypeName.DataBindings.Add("Text", ds.Tables[0], "类别名称");
            tbCanLendQty.DataBindings.Add("Text", ds.Tables[0], "可借数量");
            tbCanLendDay.DataBindings.Add("Text", ds.Tables[0], "可借天数");
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("操作数据库出错！" + ex.Message);
    }
}

private void ReaderCategoryForm_Load(object sender, EventArgs e)
{
    DataBind();
}
{% endcodeblock %}

**3.实现【添加】按钮的单击事件**
{% codeblock lang:c# %}
private void btnAdd_Click(object sender, EventArgs e)
{
    try
    {
        using (SqlConnection conn =new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "insert into ReaderType values(@rdType,@rdTypeName,@canLendQty,@canLendDay)";
            comm.Parameters.AddWithValue("@rdType", tbRdType.Text);
            comm.Parameters.AddWithValue("@rdTypeName", tbRdTypeName.Text);
            comm.Parameters.AddWithValue("@canLendQty", tbCanLendQty.Text);
            comm.Parameters.AddWithValue("@canLendDay", tbCanLendDay.Text);
            try
            {
                comm.ExecuteNonQuery();
                MessageBox.Show("添加成功！");
                DataBind();//重新加载数据库中的数据（刷新窗格中的数据）
            }
            catch (Exception ex)
            {
                MessageBox.Show("添加失败！"+ex.Message);
            }
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("操作数据库出错！" + ex.Message);
    }
}
{% endcodeblock %}

**4.实现【查询】按钮的单击事件**
{% codeblock lang:c# %}
 private void btnQuery_Click(object sender, EventArgs e)
{
    try
    {
        using (SqlConnection conn= new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText= "select rdType 类别号,rdTypeName 类别名称,CanLendQty 可借数量,canLendDay 可借天数 from ReaderType where rdTypeName like @rdTypeName+'%'";
            comm.Parameters.AddWithValue("@rdTypeName", tbRdTypeName.Text);
            SqlDataAdapter sda = new SqlDataAdapter(comm);
            DataSet ds = new DataSet();
            sda.Fill(ds);
            dgvRdCategory.DataSource = ds.Tables[0];
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("操作数据库出错！" + ex.Message);
    }
}
{% endcodeblock %}

**5.实现【删除】按钮的单击事件**
{% codeblock lang:c# %}
private void btnDelete_Click(object sender, EventArgs e)
{
    DialogResult dr = MessageBox.Show("确定要删除吗？", "确定", MessageBoxButtons.OKCancel);
    if (dr==DialogResult.OK)
    {
        try
        {
            using (SqlConnection conn=new SqlConnection(conStr))
            {
                conn.Open();
                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "delete from ReaderType where rdType =@rdType";
                comm.Parameters.AddWithValue("@rdType", tbRdType.Text);
                comm.ExecuteNonQuery();
                MessageBox.Show("删除成功！");
                DataBind();
            }
        }
        catch (Exception ex)
        {
            MessageBox.Show("删除失败！"+ex.Message);
        }
    }
}
{% endcodeblock %}

**6.实现【修改】按钮的单击事件**
{% codeblock lang:c# %}
private void btnAlter_Click(object sender, EventArgs e)
{
    try
    {
        using (SqlConnection conn = new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "update ReaderType set rdType=@rdType,rdTypeName=@rdTypeName,canLendQty=@canLendQty,canLendDay=@canLendDay where rdType=@rdType";
            comm.Parameters.AddWithValue("@rdType", tbRdType.Text);
            comm.Parameters.AddWithValue("@rdTypeName", tbRdTypeName.Text);
            comm.Parameters.AddWithValue("@canLendQty", tbCanLendQty.Text);
            comm.Parameters.AddWithValue("@canLendDay", tbCanLendDay.Text);
            comm.ExecuteNonQuery();
            MessageBox.Show("修改成功！");
            DataBind();
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("修改失败！" + ex.Message);
    }
}
{% endcodeblock %}

### 读者管理功能业务实现

#### 读者管理窗体设计

**1.创建读者管理窗体**
在项目中创建一个名为ReaderManagementForm的读者管理窗体
**2.添加窗体控件**

- 添加6个**Label控件**
- 添加6个**TextBox控件**
- 添加5个**Button控件**
- 添加1个**DataGridView控件**
- ![读者管理窗体设计](2022-12-01-11-37-58.png)

#### 实现读者管理功能

读者管理窗体中主要实现的是5个按钮的单击事件，这5个按钮分别是 【返回主菜单】按钮、【添加】按钮、【查询】按钮、【删除】按钮、【修改】按钮。单击这5个按钮，程序会修改数据库中指定的读者类别对应的任意数据信息。

**1.实现【返回主菜单】按钮的单击事件**
{% codeblock lang:c# %}
private void btnBackMenu_Click(object sender, EventArgs e)
{
    this.Close();
}
private void ReaderManagementForm_FormClosed(object sender, FormClosedEventArgs e)
{
    MainMenuForm.getInstacce().Show();
}
{% endcodeblock %}
**2.实现加载读者信息功能**
{% codeblock lang:c# %}
static string conStr = "server=.;uid=sa;pwd=root;database=BookDB";
private void DataBind()
{
    try
    {
        using (SqlConnection conn = new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select rdID 读者编号,rdType 读者类别号,rdName 读者姓名,rdDept 读者单位,rdQQ 读者QQ,rdBorrowQty 已借书数量 from Reader";
            SqlDataAdapter sda = new SqlDataAdapter(comm);
            DataSet ds = new DataSet();
            sda.Fill(ds);
            dgvReader.DataSource = ds.Tables[0];
            tbRdId.DataBindings.Clear();
            tbRdType.DataBindings.Clear();
            tbRdName.DataBindings.Clear();
            tbRdDept.DataBindings.Clear();
            tbRdQQ.DataBindings.Clear();
            tbRdBorrowQty.DataBindings.Clear();
            tbRdId.DataBindings.Add("Text", ds.Tables[0], "读者编号");
            tbRdType.DataBindings.Add("Text", ds.Tables[0], "读者类别号");
            tbRdName.DataBindings.Add("Text", ds.Tables[0], "读者姓名");
            tbRdDept.DataBindings.Add("Text", ds.Tables[0], "读者单位");
            tbRdQQ.DataBindings.Add("Text", ds.Tables[0], "读者QQ");
            tbRdBorrowQty.DataBindings.Add("Text", ds.Tables[0], "已借书数量");
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("操作数据库出错！" + ex.Message);
    }
}
private void ReaderManagementForm_Load(object sender, EventArgs e)
{
    DataBind();
}
{% endcodeblock %}
**3.实现【添加】按钮的单击事件**
{% codeblock lang:c# %}
private void btnAdd_Click(object sender, EventArgs e)
{
    try
    {
        using (SqlConnection conn =new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "insert into Reader values(@rdID,@rdType,@rdName,@rdDept,@rdQQ,@rdBorrowQty)";
            comm.Parameters.AddWithValue("@rdID",tbRdId.Text);
            comm.Parameters.AddWithValue("@rdType",tbRdType.Text);
            comm.Parameters.AddWithValue("@rdName",tbRdName.Text);
            comm.Parameters.AddWithValue("@rdDept",tbRdDept.Text);
            comm.Parameters.AddWithValue("@rdQQ",tbRdQQ.Text);
            comm.Parameters.AddWithValue("@rdBorrowQty",tbRdBorrowQty.Text);
            comm.ExecuteNonQuery();
            MessageBox.Show("添加成功！");
            DataBind();
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("添加失败" + ex.Message);
    }
}
{% endcodeblock %}
**4.实现【查询】按钮的单击事件**
{% codeblock lang:C# %}
private void btnQuery_Click(object sender, EventArgs e)
{
    try
    {
        using (SqlConnection conn = new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select rdID 读者编号,rdType 读者类别号,rdName 读者姓名,rdDept 读者单位,rdQQ 读者QQ,rdBorrowQty 已借书数量 from Reader where rdDept like @rdDept + '%'";
            comm.Parameters.AddWithValue("@rdDept", tbRdDept.Text);
            SqlDataAdapter sda = new SqlDataAdapter(comm);
            DataSet ds = new DataSet();
            sda.Fill(ds);
            dgvReader.DataSource = ds.Tables[0];
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("操作数据库失败" + ex.Message);
    }
}
{% endcodeblock %}
**5.实现【删除】按钮的单击事件**
{% codeblock lang:c# %}
private void btnDelete_Click(object sender, EventArgs e)
{
    DialogResult dr = MessageBox.Show("确定要删除吗？", "确定", MessageBoxButtons.OKCancel);
    if (dr == DialogResult.OK)
    {
        try
        {
            using (SqlConnection conn = new SqlConnection(conStr))
            {
                conn.Open();
                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "delete from Reader where rdID=@rdID";
                comm.Parameters.AddWithValue("@rdID", tbRdId.Text);
                comm.ExecuteNonQuery();
                MessageBox.Show("删除成功！");
                DataBind();
            }
        }
        catch (Exception ex)
        {
            MessageBox.Show("删除失败！" + ex.Message);
        }
    }
}
{% endcodeblock %}
**6.实现【修改】按钮的单击事件**
{% codeblock lang:c# %}
private void btnAlter_Click(object sender, EventArgs e)
{
    try
    {
        using (SqlConnection conn = new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "update Reader set rdID=@rdID,rdType=@rdType,rdName=@rdName,rdDept=@rdDept,rdQQ=@rdQQ,rdBorrowQty=@rdBorrowQty where rdID=@rdID";
            comm.Parameters.AddWithValue("@rdID", tbRdId.Text);
            comm.Parameters.AddWithValue("@rdType", tbRdType.Text);
            comm.Parameters.AddWithValue("@rdName", tbRdName.Text);
            comm.Parameters.AddWithValue("@rdDept", tbRdDept.Text);
            comm.Parameters.AddWithValue("@rdQQ", tbRdQQ.Text);
            comm.Parameters.AddWithValue("@rdBorrowQty", tbRdBorrowQty.Text);
            comm.ExecuteNonQuery();
            MessageBox.Show("修改成功！");
            DataBind();
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("修改失败！" + ex.Message);
    }
}
{% endcodeblock %}

### 图书管理功能业务实现

#### 图书管理窗体设计

**1.创建图书管理窗体**
在项目中创建一个名为BookManagementForm的图书管理窗体。
**2.添加窗体控件**

- 添加6个**Label控件**
- 添加6个**TextBox控件**
- 添加5个**Button控件**
- 添加1个**DataGridView控件**
- ![图书管理窗体设计](2022-12-01-11-45-45.png)

#### 实现图书管理功能

图书管理窗体中主要实现的是5个按钮的单击事件，这5个按钮分别是 【返回主菜单】按钮、【添加】按钮、【查询】按钮、【删除】按钮、【修改】按钮。单击这5个按钮，程序会修改数据库中指定的读者类别对应的任意数据信息。

**1.实现【返回主菜单】按钮的单击事件**
{% codeblock lang:c# %}
private void btnBackMenu_Click(object sender, EventArgs e)
{
    this.Close();
}
private void BookManagementForm_FormClosed(object sender, FormClosedEventArgs e)
{
    MainMenuForm.getInstacce().Show();
}
{% endcodeblock %}
**2.实现加载读者信息功能**
{% codeblock lang:c# %}
static string conStr = "server=.;uid=sa;pwd=root;database=BookDB";
private void DataBind()
{
    try
    {
        using (SqlConnection conn = new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select bkID 书号,bkName 书名,bkAuthor 作者,bkPress 出版社,bkPrice 单价,bkStatus 状态 from Book";
            SqlDataAdapter sda = new SqlDataAdapter(comm);
            DataSet ds = new DataSet();
            sda.Fill(ds);
            dgvBook.DataSource = ds.Tables[0];
            tbBkID.DataBindings.Clear();
            tbBkName.DataBindings.Clear();
            tbBkAuthor.DataBindings.Clear();
            tbBkPress.DataBindings.Clear();
            tbBkPrice.DataBindings.Clear();
            tbBkStatus.DataBindings.Clear();
            tbBkID.DataBindings.Add("Text", ds.Tables[0], "书号");
            tbBkName.DataBindings.Add("Text", ds.Tables[0], "书名");
            tbBkAuthor.DataBindings.Add("Text", ds.Tables[0], "作者");
            tbBkPress.DataBindings.Add("Text", ds.Tables[0], "出版社");
            tbBkPrice.DataBindings.Add("Text", ds.Tables[0], "单价");
            tbBkStatus.DataBindings.Add("Text", ds.Tables[0], "状态");
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("操作数据库出错！" + ex.Message);
    }
}
private void BookManagementForm_Load(object sender, EventArgs e)
{
    DataBind();
}
{% endcodeblock %}
**3.实现【添加】按钮的单击事件**
{% codeblock lang:c# %}
private void btnAdd_Click(object sender, EventArgs e)
{
    try
    {
        using (SqlConnection conn =new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "insert into Book values(@bkID,@bkName,@bkAuthor,@bkPress,@bkPrice,@bkStatus)";
            comm.Parameters.AddWithValue("@bkID", tbBkID.Text);
            comm.Parameters.AddWithValue("@bkName", tbBkName.Text);
            comm.Parameters.AddWithValue("@bkAuthor", tbBkAuthor.Text);
            comm.Parameters.AddWithValue("@bkPress", tbBkPress.Text);
            comm.Parameters.AddWithValue("@bkPrice", tbBkPrice.Text);
            comm.Parameters.AddWithValue("@bkStatus", tbBkStatus.Text);
            comm.ExecuteNonQuery();
            MessageBox.Show("添加成功！");
            DataBind();
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("添加失败！" + ex.Message);
    }
}
{% endcodeblock %}
**4.实现【查询】按钮的单击事件**
{% codeblock lang:c# %}
private void btnQuery_Click(object sender, EventArgs e)
{
    try
    {
        using (SqlConnection conn = new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select bkID 书号,bkName 书名,bkAuthor 作者,bkPress 出版社,bkPrice 单价,bkStatus 状态 from Book where bkName like @bkName +'%'";
            comm.Parameters.AddWithValue("@bkName", tbBkName.Text);
            SqlDataAdapter sda = new SqlDataAdapter(comm);
            DataSet ds = new DataSet();
            sda.Fill(ds);
            dgvBook.DataSource = ds.Tables[0];
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("查询失败！" + ex.Message);
    }
}
{% endcodeblock %}
**5.实现【删除】按钮的单击事件**
{% codeblock lang:c# %}
private void btnDelete_Click(object sender, EventArgs e)
{
    DialogResult dr = MessageBox.Show("确定要删除吗？", "确定", MessageBoxButtons.OKCancel);
    if (dr == DialogResult.OK)
    {
        try
        {
            using (SqlConnection conn = new SqlConnection(conStr))
            {
                conn.Open();
                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "delete from Book where bkID =@bkID";
                comm.Parameters.AddWithValue("@bkID", tbBkID.Text);
                comm.ExecuteNonQuery();
                MessageBox.Show("删除成功！");
                DataBind();
            }
        }
        catch (Exception ex)
        {
            MessageBox.Show("删除失败！" + ex.Message);
        }
    }
}
{% endcodeblock %}
**6.实现【修改】按钮的单击事件**
{% codeblock lang:c# %}
private void btnAlter_Click(object sender, EventArgs e)
{
    try
    {
        using (SqlConnection conn = new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "update Book set bkID=@bkID,bkName=@bkName,bkAuthor=@bkAuthor,bkPress=@bkPress,bkPrice=@bkPrice,bkStatus=@bkStatus where bkID=@bkID";
            comm.Parameters.AddWithValue("@bkID", tbBkID.Text);
            comm.Parameters.AddWithValue("@bkName", tbBkName.Text);
            comm.Parameters.AddWithValue("@bkAuthor", tbBkAuthor.Text);
            comm.Parameters.AddWithValue("@bkPress", tbBkPress.Text);
            comm.Parameters.AddWithValue("@bkPrice", tbBkPrice.Text);
            comm.Parameters.AddWithValue("@bkStatus", tbBkStatus.Text);
            comm.ExecuteNonQuery();
            MessageBox.Show("修改成功！");
            DataBind();
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("修改失败！" + ex.Message);
    }
}
{% endcodeblock %}

### 借书还书功能业务实现

#### 借书还书窗体设计

**1.创建借书还书窗体**
在项目中创建一个名为BorrAndRetForm的借书还书窗体。
**2.添加窗体控件**

- 添加2个**Label控件**
- 添加2个**TextBox控件**
- 添加4个**Button控件**
- 添加1个**DataGridView控件**
- ![借书还书窗体设计](2022-12-01-11-52-52.png)

#### 实现借书还书功能

借书还书窗体中主要实现的是窗体中3个按钮的单击事件，当单击【返回主菜单】按钮时，程序会隐藏当前窗体，显示借书还书窗体。单击【借书】按钮时，程序会向借书表中添加一条数据，单击【还书】按钮时，程序会从借书表中删除一条数据。

**1.创建借书的存储过程usp_BorrowBook**
{% codeblock lang:sql %}
use BookDB
go
create procedure usp_BorrowBook
	@rdID char(9),
	@bkID char(9)
as
	-- 判断有没有这本书
	if not exists(select * from Book where @bkID in (select bkID from Book))
	begin 
		raiserror('图书馆没有该书，借阅失败',16,1)with nowait
		return
	end
	-- 判断有没有这个读者ID
	if not exists(select * from Reader where @rdID in (select rdID from Reader))
	begin
		raiserror('图书馆没有该读者，借阅失败',16,1)with nowait
		return
	end
	-- 判断书是否在馆
	declare @bkStatus int
	select @bkStatus=bkStatus from Book where bkID=@bkID
	if @bkStatus = 0
	begin
		raiserror('该书不在馆，无法借阅',16,1)with nowait
		return
	end
	-- 判断该读者的借书数量是否达到最大借书数量
	declare @rdBorrowQty int,@canLendQty int
	select @rdBorrowQty from Reader where rdID=@rdID
	select @canLendQty=canLendQty from ReaderType where rdType=(select rdType from Reader where rdID=@rdID)
	if @rdBorrowQty=@canLendQty
	begin
		raiserror('抱歉！你所借书的数量已达最大借书数量！借阅失败！',16,1)with nowait
		return
	end
	-- 借书开始（1.修改书的在馆状态，2.修改读者借书数量，3.向借书表Borrow中插入数据）
	update Book set bkStatus = 0 where bkID=@bkID
	update Reader set rdBOrrowQty =rdBorrowQty + 1 where rdID=@rdID
	declare @canLendDay int
	select @canLendDay=canLendDay from ReaderType where rdType=(select rdType from Reader where rdID=@rdID)
	insert into Borrow values(@rdID,@bkID,GETDATE(),DATEADD(dd, @canLendDay,GETDATE()))
	
{% endcodeblock %}
**2.创建还书的存储过程usp_ReturnBook**
{% codeblock lang:sql %}
use BookDB
go
create procedure usp_ReturnBook
	@rdID char(9),
	@bkID char(9)
as
	-- 判断还的书是否借过
	if not exists(select * from Borrow where rdID=@rdID and bkID=@bkID)
	begin
		raiserror('抱歉！您暂时没有借过这本书！',16,1)with nowait
		return
	end
		else
		begin
	-- 还书（1.修改书的状态，2.修改读者的借书数量，3.在Borrow表中删除这条借书记录）
	update Book set BkStatus = 1 where bkID=@bkID
	update Reader set rdBorrowQty =rdBorrowQty-1 where rdID=@rdID
	delete from Borrow where rdID=@rdID and bkID=@bkID
		end
{% endcodeblock %}
**3.实现【返回主菜单】按钮的单击事件**
{% codeblock lang:c# %}
private void btnBackMenu_Click(object sender, EventArgs e)
{
    this.Close();
}
private void BorrAndRetForm_FormClosed(object sender, FormClosedEventArgs e)
{
    MainMenuForm.getInstacce().Show();
}
{% endcodeblock %}
**4.实现加载借阅信息功能**
{% codeblock lang:c# %}
private void BorrAndRetForm_Load(object sender, EventArgs e)
{
    DataBind();
}
static string conStr = "server=.;uid=sa;pwd=root;database=BookDB";
private void DataBind()
{
    try
    {
        using (SqlConnection conn = new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select rdID 读者编号,bkID 书号,DateBorrow 借书日期,DateLendPlan 应还日期 from Borrow";
            SqlDataAdapter sda = new SqlDataAdapter(comm);
            DataSet ds = new DataSet();
            sda.Fill(ds);
            dgvBorrow.DataSource = ds.Tables[0];
            tbRdID.DataBindings.Clear();
            tbBkID.DataBindings.Clear();
            tbRdID.DataBindings.Add("Text", ds.Tables[0], "读者编号");
            tbBkID.DataBindings.Add("Text", ds.Tables[0], "书号");
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("操作数据库出错！" + ex.Message);
    }
}
{% endcodeblock %}
**5. 实现【借书】按钮的单击事件**
{% codeblock lang:c# %}
private void btnBorrBook_Click(object sender, EventArgs e)
{
    try
    {
        using (SqlConnection conn =new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "exec usp_BorrowBook @rdID,@bkID";
            comm.Parameters.AddWithValue("@rdID", tbRdID.Text);
            comm.Parameters.AddWithValue("@bkID", tbBkID.Text);
            comm.ExecuteNonQuery();
            MessageBox.Show("借书成功！");
            DataBind();
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("借书失败！" + ex.Message);
    }
}
{% endcodeblock %}
**6. 实现【还书】按钮的单击事件**
{% codeblock lang:c# %}
private void btnRetBook_Click(object sender, EventArgs e)
{
    try
    {
        using (SqlConnection conn = new SqlConnection(conStr))
        {
            conn.Open();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "exec usp_ReturnBook @rdID,@bkID";
            comm.Parameters.AddWithValue("@rdID", tbRdID.Text);
            comm.Parameters.AddWithValue("@bkID", tbBkID.Text);
            comm.ExecuteNonQuery();
            MessageBox.Show("还书成功！");
            DataBind();
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("还书失败！" + ex.Message);
    }
}
{% endcodeblock %}
