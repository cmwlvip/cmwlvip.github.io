---
title: 数据结构
comments: true
date: 2023-06-02 21:12:25
updated: 2023-10-06
sticky:
description:
categories: 数据结构
tags:
    - 数据结构
    - C
cover: https://pic.imgdb.cn/item/6484545f1ddac507cc022402.png
top_img: https://pic.imgdb.cn/item/6484622a1ddac507cc13349a.jpg
---

## C语言记录

### 快速开始

#### main()

{% codeblock lang:c %}
#include<stdio.h>
#include <stdlib.h>

int main() {
	system("pause");
	return 0;
}
{% endcodeblock %}

#### 选择菜单栏

{% codeblock lang:c %}
while (true)
	{
		ListMenu();
		printf("请输入您的选择：\n");
		int choice = intCin();
		switch (choice)
		{
		case 0:
			ExitSystem();//退出程序
			break;
		case 1: {
			system("pause");
			system("cls");
		}
			  break;
		case 2: {
			system("pause");
			system("cls");
		}
			  break;
		case 3: {
			system("pause");
			system("cls");
		}
			  break;
		default:
			printf("非法输入，请重新输入！\n");
			system("pause");
			system("cls");
			break;
		}
	}
{% endcodeblock %}

{% codeblock lang:c %}
void ListMenu() {
	printf("*******************************************\n");
	printf("**************菜单*************************\n");
	printf("**************0.退出***********************\n");
	printf("**************1.**************************\n");
	printf("**************2.***************************\n");
	printf("**************3.***************************\n");
	printf("**************10.*************************\n");
}
{% endcodeblock %}

{% codeblock lang:c %}
void ExitSystem()
{
	printf("欢迎下次使用!\n");
	system("pause");
	exit(0);//退出程序
}
{% endcodeblock %}

{% codeblock lang:c %}
int intCin() {
	int num;
	while (true)
	{
		printf("等待输入中 ……\n");
		printf("\n");
		// 获取整数输入
		if (scanf_s("%d", &num) != 1) {
			// 输入不正确，清空缓冲区
			while (getchar() != '\n') continue;
			printf("输入格式错误(输入的不是整数)！请重新输入：\n");
			continue;
		}
		return num;
	}
}
{% endcodeblock %}

### 格式化输出字符

- `%d`：有符号十进制整数，用于格式化输出 `int`, `long`, `short` 等有符号整型变量。
- `%u`：无符号十进制整数，用于格式化输出 `unsigned int`, `unsigned long`, `unsigned short` 等无符号整型变量。
- `%f`：浮点数，用于格式化输出 `float` 和 `double` 类型的浮点数。
- `%c`：字符，用于格式化输出 `char` 类型的变量或表达式。
- `%s`：字符串，用于格式化输出字符串。

除此之外，还有一些用于格式化输出指针地址、长整型、短整型等类型的格式化输出字符。

- `%p`：指针地址，格式化输出 `void`* 指针类型变量或表达式的地址。
- `%ld` 或 %li：长整形有符号十进制整数，用于格式化输出 `long` 类型的变量。
- `%lu`：长整形无符号十进制整数，用于格式化输出 `unsigned long` 类型的变量。
- `%hd` 或 `%hi`：短整形有符号十进制整数，用于格式化输出 `short` 类型的变量。
- `%hu`：短整形无符号十进制整数，用于格式化输出 `unsigned short` 类型的变量。

{% note info modern %}
`%i` 是C语言中的格式化输出字符，用于以有符号十进制整数形式输出整型变量。

与 `%d` 格式化输出字符不同的是，`%i` 格式化输出字符可以根据数据前缀的不同来自动判断要转换的数据类型

- 如果数据前缀是`0x`或`0X`，则按照十六进制有符号整数进行输出。
- 如果数据前缀是`0`，则会按照八进制有符号整数进行输出。
- 如果数据前缀是其他字符或者没有前缀，则按照十进制有符号整数进行输出。

{% codeblock lang:c %}
int x = 100;
printf("%i\n", x); // 输出 100

int y = 0xA0;
printf("%i\n", y); // 输出 160

int z = 0123;
printf("%i\n", z); // 输出 83
{% endcodeblock %}
{% endnote %}

### 结构体

{% note info modern %}
在 C 语言中，结构体本身并不支持构造函数的概念，必须通过手动初始化结构体变量来赋值。
{% endnote %}

不过，可以通过一些技巧来实现类似构造函数的功能，可以使用结构体初始化器来对结构体成员进行初始化，在定义结构体时给每个成员提供默认值。
{% codeblock lang:c %}
struct Person
{
	char name[16];
	int age;
};
// 定义结构体时提供默认值
ElemType create_struct(const char* name, int age) {
	ElemType e = { "", 0 };
	// 将传入的参数赋值给结构体成员
	if (name != NULL) {
		//后面赋值给前面
		strncpy_s(e.name, sizeof(e.name) ,name, sizeof(e.name)-1);
	}
	e.age = age;
	return e;
}
{% endcodeblock %}

### 函数

#### IO

{% tabs IO %}
<!-- tab scanf_s() -->
{% note info modern %}
`scanf_s`是C语言中输入函数scanf的安全版本。
{% endnote %}

{% codeblock lang:c %}
int scanf_s(const char *format, ...)
{% endcodeblock %}

{% codeblock lang:c %}
#include <stdio.h>

int main() {
    int num;
    printf("Enter a number: ");
    scanf_s("%d", &num, sizeof(num));
    printf("You entered: %d\n", num);
    return 0;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab scanf_s使用 -->
{% codeblock lang:c %}
char name[16];
scanf_s("s", name, sizeof(name)); // 获取名字
{% endcodeblock %}

![警告](2023-06-03-16-43-58.png)

{% codeblock lang:c %}
scanf_s("%15s", name, sizeof(name)); // 获取名字
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

#### 字符串

{% note info modern %}
在 C 语言中，使用**字符数组**来表示字符串。字符串是由一系列字符组成的数据类型，以 null 字符('\0') 结束
{% endnote %}

{% codeblock lang:c 可以这样声明字符串 %}
char str_array[数组大小][最大字符串长度] = {字符串1, 字符串2, ..., 字符串n};
{% endcodeblock %}

{% tabs string %}
<!-- tab strncpy_s() -->
{% note info modern %}
`strncpy_s()`是一个C标准库函数，用于将一个字符串的指定长度复制到另一个字符数组中。
{% endnote %}

{% codeblock lang:c %}
errno_t strncpy_s(char* dest, size_t destSize, const char* src, size_t count);
{% endcodeblock %}

- `dest`表示目标字符串
- `destSize`表示目标字符串的长度
- `src`表示源字符串
- `count`表示要拷贝的字符数

和strcpy不同，strncpy_s会在拷贝过程中检查目标字符串的长度是否足够。如果目标字符串的长度(destSize)小于等于要拷贝的字符数(count)，则会终止拷贝，并返回错误码（通过errno_t返回）。否则，将源字符串的前count个字符复制到目标字符串中，并在目标字符串的最后一位添加一个'\0'，以保证目标字符串的正确性。

{% note info modern %}
由于`strncpy_s`函数会强制在目标字符串末尾追加'\0'，因此在使用时需要保证目标字符串的长度(destSize)大于等于要拷贝的字符数(count)+1，以避免内存溢出等问题
{% endnote %}

{% codeblock lang:c %}
strncpy_s(e.name, sizeof(e.name) ,name, sizeof(e.name)-1);
{% endcodeblock %}

<!-- endtab -->

<!-- tab strcmp() -->
{% note info modern %}
`strcmp()` 是 C 标准库中的一个用于比较两个字符串是否相等的函数。定义在 `string.h `头文件中
{% endnote %}

{% codeblock lang:c %}
int strcmp(const char *str1, const char *str2);
{% endcodeblock %}

str1 和 str2 分别是两个要比较的字符串。该函数会从两个字符串的第一个字符开始逐个比较，直到遇到第一个不同的字符或者字符串的结尾。
**如果两个字符串相等，则返回值为 `0`；**
如果 str1 小于 str2，则返回值为负数；
如果 str1 大于 str2，则返回值为正数。
<!-- endtab -->
{% endtabs %}

#### 内存管理

{% tabs memory %}
<!-- tab malloc() -->
{% note info modern %}
`malloc()`是 C 语言中的标准库函数，用于动态分配内存空间。
{% endnote %}

{% codeblock lang:c %}
void* malloc(size_t size);
{% endcodeblock %}

其中，`size` 表示需要分配的内存大小，单位为字节。该函数返回一个指向分配内存空间起始地址的指针，如果分配失败，则返回 NULL。

`malloc()` 函数申请的内存空间通常是在堆（heap）中分配的，而非在栈（stack）中分配。由于在使用完内存后需要显式地调用 `free()` 函数来释放空间，因此 `malloc()` 函数能够帮助程序员更灵活地管理内存空间，避免浪费和泄漏等问题。

{% codeblock lang:c %}
int n = 10;
int* arr = (int*)malloc(sizeof(int) * n);
if (arr == NULL) {
    printf("申请内存失败！\n");
    return 1;
}

for (int i = 0; i < n; i++) {
    arr[i] = 0;
}
// 使用完内存后，需要调用 free() 函数释放空间
free(arr);
{% endcodeblock %}
<!-- endtab -->

<!-- tab realloc() -->
{% note info modern %}
`realloc()`是 C 语言中的标准库函数，用于重新分配内存空间
{% endnote %}

{% codeblock lang:c %}
void* realloc(void* ptr, size_t size);
{% endcodeblock %}

`ptr` 表示原先已经分配的内存空间地址，`size` 表示需要重新分配的内存大小，单位为字节。该函数返回一个指向重新分配内存空间起始地址的指针，如果分配失败，则返回 NULL。

`realloc()` 函数的作用是在堆（heap）中重新分配内存空间，可以用于修改已经分配的内存大小和释放未使用的内存空间。当需要扩展或缩小内存空间时，`realloc() `函数能够有效地避免浪费内存资源的问题。

在使用 `realloc()` 函数修改已经分配的内存大小时，需要确保原先已经分配的内存空间地址有效（即非空指针），同时也需要确保新的内存大小不小于 0。当 `size` 小于原先已经分配的内存大小时，`realloc()` 函数会将多余的部分从堆（heap）中释放掉，并返回一个指向已经缩小后的内存空间起始地址的指针。需要注意的是，在缩小内存空间时，如果原先已经分配的内存空间中仍有数据未被复制到新的内存空间中，这些数据可能会丢失。在重新分配内存时，`realloc()` 函数会**自动将原先内存中的数据复制到新的内存空间中**，并且返回新的指针供程序使用。在程序中使用完内存后，还需要调用 `free()` 函数来手动释放已经分配的内存空间。

{% codeblock lang:c %}
int n = 10;
int* arr = (int*)malloc(sizeof(int) * n);
if (arr == NULL) {
    printf("申请内存失败！\n");
    return 1;
}
// 扩展数组长度
int* newSpace = (int*)realloc(arr, sizeof(int) * n * 2);
if (newSpace == NULL) {
    printf("申请新内存失败！\n");
    free(arr);
    return 1;
}
else {
    arr = newSpace;
    n *= 2;
}
// 使用扩展后的数组
for (int i = 0; i < n; i++) {
    arr[i] = i;
}
// 使用完内存后，需要调用 free() 函数释放空间
free(arr);
{% endcodeblock %}
<!-- endtab -->

<!-- tab memcpy -->
{% note info modern %}
`memcpy()` 函数的作用是将一个源内存地址的数据复制到目标内存地址
{% endnote %}

{% codeblock lang:C %}
void *memcpy(void *dest, const void *src, size_t n);
{% endcodeblock %}

- `dest`：目标内存地址，即要拷贝到的地址。
- `src`：源内存地址，即要拷贝的地址。
- `n`：要拷贝的字节数。

{% codeblock lang:c %}
#include <stdio.h>
#include <string.h>

int main() {
    char src[] = "Hello World!";
    char dest[16];
    size_t len = strlen(src) + 1;//字符串长度加一
    //因为在C语言中，字符串是以空字符('\0')作为结尾的，空字符也被认为是字符串的一部分，确保整个字符串被复制完整
    memcpy(dest, src, len);  // 将 src 复制到 dest

    printf("src = %s\n", src);
    printf("dest = %s\n", dest);
    
    return 0;
}
//输出结果
//src = Hello World!
//dest = Hello World!
{% endcodeblock %}
<!-- endtab -->

<!-- tab free() -->
{% note info modern %}
`free()`函数用于释放动态分配的内存空间，确保本次申请的内存空间不再使用，避免内存泄漏。
{% endnote %}

{% codeblock lang:c %}
void free(void *ptr);
{% endcodeblock %}

- `ptr`：指向需要释放的内存的指针

在程序中调用 `free()` 函数时，需要传入需要被释放掉的内存地址。该函数会释放该地址上的内存，并将其还给操作系统。**只有使用 `malloc()`、`calloc()` 或 `realloc()` 等动态内存分配函数分配的内存空间才需要使用 `free()` 函数进行释放，否则会导致程序异常或崩溃**。

{% codeblock lang:c %}
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 10;

    arr = (int*)malloc(n * sizeof(int));  // 动态分配内存

    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
    }

    free(arr);  // 释放内存

    return 0;
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

### 关于C的使用问题

#### `size_t`

`size_t` 是一种定义在 C 语言标准库 `<stddef.h>` 中的无符号整型数据类型，用于表示一个对象的大小或一个数组的元素个数。它的长度通常和 `unsigned int` 或 `unsigned long` 相同，但是具体长度取决于编译器和平台的实现。

在 C 语言程序中，我们通常使用 `size_t` 来避免在不同平台上出现不同的整型长度所带来的问题。例如，当我们需要动态分配内存时，往往会使用 malloc() 函数，而该函数接受一个参数，即需要分配的内存大小。这个大小通常使用 `size_t` 类型来表示，以确保程序在不同平台上的兼容性。

另外，一些标准库函数（如 `strlen()`、`sizeof()` 等）也会返回 `size_t` 类型的值，表示对象的长度或大小。

{% codeblock lang:c %}
#include <stdio.h>
#include <stddef.h>

int main() {
    size_t size = sizeof(int);  // 求整型的字节数
    printf("size of int: %zu bytes\n", size);

    char str[] = "Hello World!"; 
    size_t len = strlen(str);   // 求字符串长度
    printf("length of string: %zu\n", len); //这种类型的值用%zu输出

    return 0;
}
//结果
//size of int: 4 bytes
//length of string: 12
{% endcodeblock %}

#### 数组越界访问

如下代码在C中是可以运行的（只会报警告）

{% codeblock lang:c %}
int arr[9] = { 0 };
printf("%d", arr[99]);
{% endcodeblock %}

{% note warning modern %}
这段代码的输出结果是未定义行为（Undefined Behavior），意味着无法确定输出的结果会是什么。

在C/C++中，数组越界访问是一种未定义行为。在这里，数组arr只有9个元素，却试图访问它的第100个元素（即arr[99]），这超出了数组arr的边界，因此会导致未定义行为。

虽然在一些编译器和计算机架构上，这段代码可能不会引发任何错误，但是在其他情况下，它可能会导致程序崩溃或产生不可预测的结果。因此，**应该尽量避免数组越界访问**。
{% endnote %}

#### 清空输入缓冲区

{% note danger modern %}
当使用 `scanf_s` 函数读取输入时，如果输入不符合格式要求【 `scanf_s("%d", &num);`输入汉字】，`scanf_s` 会将非法字符从输入缓冲区中移除，但这可能会导致下一次输入不能正确进行。
{% endnote %}

为了解决这个问题，我们可以手动清空输入缓冲区，以确保下一次输入的准确性。

在输入错误时，我们先调用 getchar 函数逐个读取非法字符并将其丢弃，直到读取到换行符为止，以清空输入缓冲区。然后输出提示信息，终止程序执行。

{% codeblock lang:c %}
int num;
int ret = scanf_s("%d", &num, sizeof(num));
if (ret != 1) {
    // 输入错误，需要清空输入缓冲区
    while(getchar() != '\n') continue;
    printf("输入错误！\n");
    return -1;
}
// 正确进行下一次输入
{% endcodeblock %}

## Coding

### ElemType

在定义数据结构时，经常使用`ElemType`是为了表示数据结构中存储的元素的类型。`ElemType`通常是一个抽象的数据类型，可以根据实际情况来具体定义。

使用`ElemType`的好处有以下几点：

1. **灵活性**：`ElemType`可以根据实际需要选择不同的数据类型，比如整数、浮点数、字符、结构体等。这样可以适应不同的数据结构和算法需求。
2. **可读性**：使用`ElemType`可以使代码更加易读和易理解，因为它提供了对存储元素类型的清晰描述。
3. **可扩展性**：通过定义`ElemType`，可以方便地扩展数据结构，以适应未来的需求变化。如果需要修改存储元素类型，只需修改`ElemType`的定义，而不需要改动整个数据结构的代码。
4. **代码复用性**：使用`ElemType`可以提高代码的复用性，因为可以将同一类型的数据结构和算法应用于不同的`ElemType`上。

定义一个结构体，构造好如下函数

1. 定义一个比较函数,用于比较结构体,不等返回0,相等为真 (`__Compare`)
2. 定义一个输出函数，用于输出结构体，有点像重写toString(`__Print`)
3. 定义类似构造函数的函数(`create_struct`)
在 C 语言中，结构体本身并不支持构造函数的概念，必须通过手动初始化结构体变量来赋值
不过，可以通过一些技巧来实现类似构造函数的功能

**比如定义一个`Person`类**

{% codeblock lang:c  "Person.h" https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/DataStructure/Person.h %}
#pragma once //防止头文件重复包含
#include<stdio.h>
#include<string.h>

struct Person
{
	char name[16];
	int age;
};

typedef Person ElemType;
//typedef int ElemType;

//定义一个比较函数,不等返回0,相等为真
int PersonCompare(ElemType e1, ElemType e2);

//定义一个输出函数，用于输出Person信息
void PersonPrint(ElemType e);

// 定义结构体时提供默认值
ElemType create_struct();
ElemType create_struct(const char* name, int age);

{% endcodeblock %}

{% codeblock lang:c "Person.cpp" https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/DataStructure/Person.cpp %}
#include"Person.h"

int PersonCompare(ElemType e1, ElemType e2) {
	//strcmp(e1.name, e2.name)两个字符串相等，则返回值为 0
	return e1.age == e2.age && !strcmp(e1.name, e2.name);
}

void PersonPrint(ElemType e) {
	printf("姓名：%s\t年龄：%d\n", e.name, e.age);
}

ElemType create_struct() {
	ElemType e = { NULL, 0 };
	return e;
}

ElemType create_struct(const char* name, int age) {
	ElemType e = { "", 0 };
	// 将传入的参数赋值给结构体成员
	if (name != NULL) {
		//后面赋值给前面
		strncpy_s(e.name, name, sizeof(e.name) - 1);
	}
	e.age = age;
	return e;
}
{% endcodeblock %}

### 定义自定义函数

{% note info modern %}
**经常使用到的代码块可以封装成函数！**
{% endnote %}

{% codeblock lang:c "myFunction.h" https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/DataStructure/myFunction.h %}
#pragma once
#include<stdio.h>
#include<stdlib.h>
//用于测试
void test();
//定义一个用于接收int输入的函数
int intCin();
//退出系统
void ExitSystem();
{% endcodeblock %}

{% codeblock lang:c "myFunction.cpp" https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/DataStructure/myFunction.cpp %}
#include"myFunction.h"
void test() {
	printf("This is a test statement\n");
}
{% endcodeblock %}

{% tabs myFunction %}
<!-- tab 接收int输入 -->
{% note info modern %}
接收int输入
{% endnote %}

{% codeblock lang:c %}
int intCin() {
	int num;
	while (true)
	{
		printf("等待输入中 ……\n");
		printf("\n");
		// 获取整数输入
		if (scanf_s("%d", &num) != 1) {
			// 输入不正确，清空缓冲区
			while (getchar() != '\n') continue;
			printf("输入格式错误(输入的不是整数)！请重新输入：\n");
			continue;
		}
		return num;
	}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 退出系统 -->
{% note info modern %}
退出系统
{% endnote %}

{% codeblock lang:c %}
void ExitSystem()
{
	printf("欢迎下次使用!\n");
	system("pause");
	exit(0);
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

## 线性表

### 顺序表

{% note info modern %}
线性表的顺序存储又称`顺序表`
{% endnote %}

{% note warning modern %}
线性表中元素的位序从`1`开始的，而数组中的元素下标是从`0`开始的！
{% endnote %}

#### 顺序表（静态分配）

[CodeOcean-sequentialList.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/SequentialList/sequentialList.h)
[CodeOcean-sequentialList.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/SequentialList/sequentialList.cpp)

{% tabs sequentialList %}
<!-- tab 静态顺序表的定义 -->
{% codeblock lang:c %}
#define MaxSize 50

typedef struct
{
	ElemType data[MaxSize];	//顺序表的元素
	int length;				//顺序表当前长度
}SqList;					//顺序表的类型定义
{% endcodeblock %}
<!-- endtab -->

<!-- tab 基本操作 -->
{% codeblock lang:c %}
//初始化表，构造一个空的线性表
SqList InitList();
//将线性表置空
void ClearList(SqList& L);
//销毁线性表
void DestroyList(SqList& L);
//判空操作，若为空，返回true，否则返回false
bool ListEmpty(SqList L);
//返回线性表元素个数
int ListLength(SqList L);
//按位查找，获取表中的第i个位置数据元素的值，用e返回
void GetElem(SqList L,int i,ElemType& e);
//按值查找,返回L中第1个值与e相同的元素在L中的位置，不存在，返回0
int LocateElem(SqList L, ElemType e, int(*myCompare)(ElemType, ElemType));
//按位插入操作，在表中指定元素e
void ListInsert(SqList& L,int i, ElemType e);
//按位删除，删除表中第i个位置上的元素，并用e返回删除元素的值
void ListDelete(SqList& L, int i, ElemType& e);
//遍历
void TraverseList(SqList L, void(*myPrint)(ElemType));
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序表的初始化 -->
{% codeblock lang:c %}
SqList InitList() {
	SqList L;				//构造一个空的顺序表L
	L.length = MaxSize;		//先让顺序表长度为最大
	ClearList(L);
	return L;
}
void ClearList(SqList& L) {
	for (int i = 0; i < L.length; i++)
	{
		ElemType e = create_struct();
		L.data[i] = e;
	}
	L.length = 0;	//空表长度为0
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序表的取值 -->
{% codeblock lang:c %}
void GetElem(SqList L, int i, ElemType& e) {
	if (i<1 || i>L.length)
	{
		printf("位序不存在！，当前顺序表长度%d\n", L.length);
		return;
	}
	e = L.data[i-1];
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序表的查找 -->
{% codeblock lang:c %}
int LocateElem(SqList L, ElemType e, int(*myCompare)(ElemType, ElemType)) {
	for (int i = 0; i < L.length; i++)
	{
		if (myCompare(L.data[i],e)) {
			return i+1;				//返回元素所在位置,位序从1开始
		}
	}
	return 0;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序表的插入 -->
{% codeblock lang:c %}
void ListInsert(SqList& L, int i, ElemType e) {
	if (L.length == MaxSize) {
		printf("顺序表已满！无法完成插入操作！\n");
		return;
	}
	if (i<1 || i>L.length + 1) {
		printf("位序不合法！，当前顺序表长度%d\n", L.length);
		return;
	}
	for (int j = L.length; j >= i; j--)
	{
		L.data[j] = L.data[j-1];
	}
	L.data[i-1] = e;		//减1为数组索引
	L.length += 1;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序表的删除 -->
{% codeblock lang:c %}
void ListDelete(SqList& L, int i, ElemType& e) {
	if (i>L.length || i < 1)
	{
		printf("这不是一个有效位置，顺序表当前长度:%d\n", L.length);
		return;
	}
	e = L.data[i-1];			//用e返回,位序从1开始
	while (i < L.length)
	{
		L.data[i-1] = L.data[i];//用后面的覆盖前面
		i++;
	}
	L.length --;
	printf("删除成功！删除信息如下：\n");
	PersonPrint(e);
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

#### 顺序表（动态分配）

[CodeOcean-DynamicSequentialList.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/DynamicSequentialList/DynamicSequentialList.h)
[CodeOcean-DynamicSequentialList.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/DynamicSequentialList/DynamicSequentialList.cpp)

{% tabs DynamicSequentialList %}
<!-- tab 动态顺序表的定义 -->
{% codeblock lang:c %}
#define InitSize 10	//表长度的初始定义

typedef struct
{
	ElemType *data;			//指示动态分配数组的指针
	int capacity;			//动态顺序表当前申请的容量
	int length;				//顺序表当前长度
}SeqList;					//动态分配顺序表的类型定义
{% endcodeblock %}
<!-- endtab -->

<!-- tab 基本操作 -->
{% codeblock lang:c %}
//初始化表，构造一个空的线性表
SeqList InitList(SeqList& L);
//将线性表置空
void ClearList(SeqList& L);
//销毁线性表
void DestroyList(SeqList& L);
//判空操作，若为空，返回true，否则返回false
bool ListEmpty(SeqList L);
//返回线性表元素个数
int ListLength(SeqList L);
//按位查找，获取表中的第i个位置数据元素的值，用e返回
bool GetElem(SeqList L, int i, ElemType& e);
//按值查找,返回L中第1个值与e相同的元素在L中的位置，不存在，返回0
int LocateElem(SeqList L, ElemType e, int(*myCompare)(ElemType, ElemType));
//按位插入操作，在表中指定元素e，(i <= i<= L.length+1),成功为true
bool ListInsert(SeqList& L, int i,ElemType e);
//按位删除，删除表中第i个位置上的元素，并用e返回删除元素的值
bool ListDelete(SeqList& L, int i, ElemType& e);
//遍历
void TraverseList(SeqList L,void(*myPrint)(ElemType));
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序表的初始化 -->
{% codeblock lang:c %}
SeqList InitList(SeqList& L) {
	if (L.data!=NULL) {
		printf("顺序表表已初始化！无需二次初始！\n");
		return L;
	}
	L.data = (ElemType*)malloc(sizeof(ElemType) * InitSize);
	//判断内存是否申请成功
	if (L.data == NULL)
	{
		printf("内存申请失败!\n");
		system("pause");							//暂停，随后继续生请
		L = InitList(L);								//继续尝试申请
	}
	L.length = 0;
	L.capacity = InitSize;							//申请完成，线性表容量位初始值
	return L;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序表的取值（按位查找） -->
{% codeblock lang:c %}
bool GetElem(SeqList L, int i, ElemType& e) {
	if (L.data == NULL)
	{
		errorInfo();
		return false;
	}
	if (i<1 || i>L.length)
	{
		printf("查找位序应该在[1,%d+1]，位置无效！\n", L.length);
		return false;
	}
	e = L.data[i - 1];			//elem[i-1]存储第i个数据元素
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序表的查找 -->
{% codeblock lang:c %}
int LocateElem(SeqList L, ElemType e, int(*myCompare)(ElemType, ElemType)) {
	if (L.data == NULL)
	{
		errorInfo();
		return 0;				//查找失败，返回0，线性表的位序从1开始
	}
	for (int i = 0; i < L.length; i++)
	{
		if (myCompare(L.data[i],e))
		{
			return i + 1;
		}
	}
	return 0;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序表的插入 -->
{% codeblock lang:c %}
void my_malloc(SeqList& L) {
	ElemType *newSpace=(ElemType*)malloc(sizeof(ElemType) * L.capacity*2);		//创建新空间
	if (newSpace==NULL)
	{
		printf("顺序表已满，动态分配内存失败！插入失败！\n");
		return;
	}
	// 使用 memcpy 进行内存拷贝
	memcpy(newSpace, L.data, sizeof(ElemType) * L.capacity);					//将原来的数据拷贝到新空间
	free(L.data);																//释放原有空间
	L.data = NULL;
	L.data = newSpace;															//更新指针指向
	L.capacity *= 2;															//更新容量大小
	printf("线性表已满，但是动态重新分配内存！\n");
}
void re_alloc(SeqList& L) {
	ElemType* newSpace = (ElemType*)realloc(L.data, sizeof(ElemType) * L.capacity * 2);
	if (newSpace == NULL)
	{
		printf("线性表已满，但是动态内存分配失败！插入失败！\n");
		return;
	}
	L.data = newSpace;
	L.capacity *= 2;
}

{% endcodeblock %}

{% codeblock lang:c %}
bool ListInsert(SeqList& L,int i, ElemType e) {
	if (L.data == NULL)
	{
		errorInfo();
		return false;
	}
	if (i<1 || i>L.length + 1) {	//判断i的范围是否有效
		printf("插入的位置应该在[1,%d+1]，位置无效！\n",L.length);
		return false;
	}
	if (L.length==L.capacity) {		//空间不足需要动态开辟
		//两种方式
		//re_alloc(L);
		my_malloc(L);
	}
	for (int j = L.length;j >= i; j--)
	{
		L.data[j] = L.data[j - 1];
	}
	L.data[i - 1] = e;				//在位置i处放入e
	L.length++;
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序表的删除 -->
{% codeblock lang:c %}
bool ListDelete(SeqList& L, int i, ElemType& e) {
	if (L.data == NULL)
	{
		errorInfo();
		return false;
	}
	if (i<1 || i>L.length)
	{
		printf("删除的位置应该在[1,%d]，位置无效！\n", L.length);
		return false;
	}
	e = L.data[i - 1];
	for (int j = i; j < L.length; j++)
	{
		L.data[j - 1] = L.data[j];
	}
	L.length--;
	return true;
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

### 链表

{% note info modern %}
线性表的链式存储又称`链表`。
{% endnote %}

[CodeOcean-LinkList.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/LinkList/LinkList.h)
[CodeOcean-LinkList.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/LinkList/LinkList.cpp)

{% tabs LinkList %}
<!-- tab 单链表的定义 -->
{% codeblock lang:c %}
typedef struct LNode {
	ElemType data;				//结点的数据域
	LNode* next;				//结点的指针域
}LNode,*LinkList;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 几点说明 -->
{% note info modern %}

1. 这里定义的是单链表中每个节点的存储结构，包括数据域和指针域。
2. 为提高程序的可读性，对同一结构体指针类型起了两个名称，`LinkList`与`LinkList`，两者本质上是等价的。通常习惯上用`LinkList`定义单链表，**强调定义的是某个单链表的头指针**；用`LinkList`定义指向单链表中任意节点的指针变量。
3. **单链表是由头指针唯一确定的**，因此单链表可以用头指针的名字来命名。若头指针名是`L`，则简称链表为表`L`。
4. 注意区分**指针变量**和**结点变量**，若定义 `LinkList p` 或 `LNode *p` ，则`p`为指向某结点的**指针变量**，表示该结点的地址；而`*p`为对应的**结点变量**，表示该结点的名称。思考`(*p).data`与`*p->data`表示什么。
{% endnote %}

{% note primary modern %}

1. **首元结点**：链表中存储第一个数据元素`a1`的结点。
2. **头结点**：在首元结点之前附设的一个结点，其指针域指向首元结点。
3. **头指针**:链表中第一个结点的指针。若链表设有头结点，则头指针指向头结点；若链表不设头结点，则头指针所指结点为首元结点。
{% endnote %}

{% note info modern %}
**链表增加头结点的作用**

1. 便于首元结点的处理：增加了头结点后，首元结点的地址保存在头结点的指针域中，对链表的第一个数据元素的操作与其他数据元素相同，无需进行特殊处理。
2. 便于空表和非空表的统一处理
   1. 当链表不设头结点时，假设`L`为单链表的头指针，它应该指向首元结点，则当链表为空表时，头指针为空（判定空表的条件为：`L==NULL`）。
   2. 增加头结点后，无论链表是否为空，头指针都是指向头结点的非空指针。则当链表为空表时，头结点指针域为空（判定空表的条件为：`L->next==NULL`）。
{% endnote %}
<!-- endtab -->

<!-- tab 单链表的初始化 -->
{% codeblock lang:c %}
bool InitList(LinkList& L) {
	//L = (LinkList)malloc(sizeof(LNode));			//生成新结点作为头结点，用头指针L指向头结点
	L = new LNode;	//c++方式 #include<iostream>
	if (L == NULL) {
		return false;
	}
	L->next = NULL;			//头结点指针域为空
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 单链表的取值 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 单链表的按值查找 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 单链表的插入 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 单链表的删除 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 前插法创建单链表 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 后插法创建单链表 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

{% tabs DuLinkList %}
<!-- tab 双向链表的定义 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 双向链表的插入 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 双向链表的删除 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

## 栈

{% note info modern %}
**栈**是限定仅在表尾进行插入或删除操作的线性表。特点：**后进先出**
{% endnote %}

### 顺序栈(栈的顺序存储)

[CodeOcean-SqStack.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/SqStack/SqStack.h)
[CodeOcean-SqStack.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/SqStack/SqStack.cpp)

{% tabs SqStack %}
<!-- tab 顺序栈的定义 -->
{% codeblock lang:c %}
//------顺序栈的存储结构-------------
#define MAXSIZE 100				//顺序栈存储空间的初始分配量
typedef struct {
	SElemType* base;			//栈底指针
	SElemType* top;				//栈顶指针
	int stacksize;
}SqStack;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序栈基本操作 -->
{% codeblock lang:c %}
//顺序栈的初始化
bool InitStack(SqStack& S);
//顺序栈的入栈
bool Push(SqStack& S, SElemType e);
//顺序栈的出栈
bool Pop(SqStack& S, SElemType& e);
//取顺序栈的栈顶元素
SElemType GetTop(SqStack S);
//顺序栈判空
bool StackEmpty(SqStack S);
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序栈的初始化 -->
{% codeblock lang:c %}
bool InitStack(SqStack& S) {					//为顺序表
	S.base = (SElemType*)malloc(sizeof(SElemType) * MAXSIZE);	//返回的申请空间首地址
	if (!S.base)
	{
		return false;							//存储分配失败
	}
	S.top = S.base;								//top初始为base，空栈
	S.stacksize = MAXSIZE;						//设置栈最大容量
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序栈的入栈 -->
{% codeblock lang:c %}
bool Push(SqStack& S, SElemType e) {
	if (S.top-S.base==S.stacksize)
	{
		return false;							//栈满
	}
	*S.top++ = e;								//元素压入栈顶，栈顶指针加1
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序栈的出栈 -->
{% codeblock lang:c %}
bool Pop(SqStack& S, SElemType& e){
	//删除S的栈顶元素，用e返回其值
	if (S.top==S.base)
	{
		return false;							//栈空
	}
	e = *--S.top;								//栈顶指针减1，将栈顶元素赋给e
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 取顺序栈的栈顶元素 -->
{% codeblock lang:c %}
SElemType GetTop(SqStack S) {
	//返回S的栈顶指针，不修改栈顶指针
	if (S.top!=S.base)							//栈非空
	{
		return *(S.top - 1);
	}
	SElemType m= create_struct();
	return m;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序栈判空 -->
{% codeblock lang:c %}
bool StackEmpty(SqStack S) {
	if (S.top == S.base)
	{
		return true;				//栈空
	}
	return false;
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

### 链栈(栈的链式存储)

[CodeOcean-LinkStack.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/LinkStack/LinkStack.h)
[CodeOcean-LinkStack.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/LinkStack/LinkStack.cpp)

{% tabs LinkStack %}
<!-- tab 链栈的定义 -->
{% codeblock lang:c %}
//--------链栈的存储结构--------
typedef struct StackNode
{
	ElemType data;
	struct StackNode* next;
}StackNode,*LinkStack;
//由于栈的主要操作是在栈顶插入和删除元素，显然以链表的头部作为栈顶是最方便的
//而且没有必要像单链表那样为了操作方便附加【头结点】
{% endcodeblock %}
<!-- endtab -->

<!-- tab 链栈基本操作 -->
{% codeblock lang:c %}
//链栈的初始化
void InitStack(LinkStack& S);
//链栈的入栈
bool Push(LinkStack& S,ElemType& e);
//链栈的出栈
bool Pop(LinkStack& S,ElemType& e);
//取栈顶元素
bool GetTop(LinkStack S, ElemType& e);
{% endcodeblock %}
<!-- endtab -->

<!-- tab 链栈的初始化 -->
{% codeblock lang:c %}
void InitStack(LinkStack& S) {
	//构造一个空栈S,栈顶指针置空(一定能成功)
	S = NULL;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 链栈的入栈 -->
{% codeblock lang:c %}
bool Push(LinkStack& S, ElemType& e) {
	//在栈顶插入元素e
	StackNode* p = (StackNode*)malloc(sizeof(StackNode));		//生成新的结点
	if (p==NULL)
	{
		return false;
	}
	p->data = e;					//将新结点的数据域设置为e
	p->next = S;					//将新结点插入栈顶
	S = p;							//修改栈顶指针为p
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 链栈的出栈 -->
{% codeblock lang:c %}
bool Pop(LinkStack& S,ElemType& e) {
	//删除栈顶元素，用e返回其值
	if (S==NULL)
	{
		return false;				//栈空
	}
	e = S->data;					//将栈顶元素赋给e
	StackNode* p = S;				//用p临时保存栈顶元素，以备释放空间
	S = S->next;					//修改栈顶指针
	free(p);						//释放原栈顶空间
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 取链栈的栈顶元素 -->
{% codeblock lang:c %}
bool GetTop(LinkStack S, ElemType& e) {
	//返回S的栈顶元素，不修改栈顶指针
	if (S!=NULL)					//栈非空
	{
		e = S->data;				//返回栈顶元素的值，栈顶指针不变
		return true;
	}
	return false;
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

## 队列

{% note info modern %}
**队列**是限定仅在表尾（即队尾）进行插入而表头（即队头）进行删除操作的线性表。特点：**先进先出**
{% endnote %}

### 循环队列(队列的顺序存储)

[CodeOcean-SqQueue.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/SqQueue/SqQueue.h)
[CodeOcean-SqQueue.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/SqQueue/SqQueue.cpp)

{% tabs SqQueue %}
<!-- tab 循环队列的定义 -->
{% codeblock lang:c %}
#define MAXSIZE 100
//----队列的顺序存储结构------
typedef struct
{
	QElemType* base;				//存储空间的基地址
	int front;						//头指针
	int rear;						//尾指针
}SqQueue;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 循环队列的基本操作 -->
{% codeblock lang:c %}
//循环队列的初始化
bool InitQueue(SqQueue& Q);
//求循环队列的长度
int QueueLength(SqQueue Q);
//循环队列的入队
bool EnQueue(SqQueue& Q, QElemType e);
//循环队列的出队
bool DeQueue(SqQueue& Q, QElemType& e);
//取循环队列的队头元素
bool GetHead(SqQueue Q,QElemType& e);
{% endcodeblock %}
<!-- endtab -->

<!-- tab 循环队列的初始化 -->
{% codeblock lang:c %}
bool InitQueue(SqQueue& Q) {
	//构造一个空队列Q
	Q.base = (QElemType*)malloc(sizeof(QElemType) * MAXSIZE);	//为队列分配一个最大容量为MAXSIZE的数组空间
	if (!Q.base)
	{
		return false;				//存储分配失败
	}
	Q.front = Q.rear = 0;			//头指针和尾指针置为0，队列为空
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 求循环队列的长度 -->
{% codeblock lang:c %}
int QueueLength(SqQueue Q) {
	//返回Q的元素个数，即队列的长度
	return (Q.rear - Q.front + MAXSIZE) % MAXSIZE;		//对于循环队列差值可能为负数，加上MAXSIZE
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 循环队列的入队 -->
{% codeblock lang:c %}
bool EnQueue(SqQueue& Q, QElemType e) {
	//插入元素e为Q的新队尾元素
	if ((Q.rear + 1) % MAXSIZE == Q.front)
	{
		return false;			//尾指针在循环意义上+1等于头指针，队满（牺牲一个单元）
	}
	Q.base[Q.rear] = e;			//新元素插入队尾
	Q.rear = (Q.rear + 1) % MAXSIZE;
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 循环队列的出队 -->
{% codeblock lang:c %}
bool DeQueue(SqQueue& Q, QElemType& e) {
	//删除Q的队头元素，用e返回其值
	if (Q.front==Q.rear)
	{
		return false;							//队空
	}
	e = Q.base[Q.front];						//保存队头元素
	Q.front = (Q.front + 1) % MAXSIZE;			//队尾指针+1
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 取循环队列的队头元素 -->
{% codeblock lang:c %}
bool GetHead(SqQueue Q, QElemType& e) {
	//返回Q的队头元素，不修改队头指针
	if (Q.front!=Q.rear)						//队列非空
	{
		e = Q.base[Q.front];					//返回队头元素的值，队头指针不变
		return true;
	}
	return false;
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

### 链队(队列的链式存储)

[CodeOcean-LinkQueue.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/LinkQueue/LinkQueue.h)
[CodeOcean-LinkQueue.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/LinkQueue/LinkQueue.cpp)

{% tabs LinkQueue %}
<!-- tab 链队的定义 -->
{% codeblock lang:c %}
//为了操作方便，给链队添加一个头结点
//并令头指针始终指向头结点
//-----队列的链式存储------
typedef struct QNode
{
	QElemType data;
	struct QNode* next;
}QNode,*QueuePtr;
typedef struct
{
	QueuePtr front;				//队头指针
	QueuePtr rear;				//队尾指针
}LinkQueue;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 链队的基本操作 -->
{% codeblock lang:c %}
//链队的初始化
bool InitQueue(LinkQueue& Q);
//链队的入队
bool EnQueue(LinkQueue& Q, QElemType e);
//链队的出队
bool DeQueue(LinkQueue& Q, QElemType& e);
//取链队的队头元素
bool GetHead(LinkQueue Q,QElemType& e);
{% endcodeblock %}
<!-- endtab -->

<!-- tab 链队的初始化 -->
{% codeblock lang:c %}
bool InitQueue(LinkQueue& Q) {
	//构造一个空队列
	Q.front = Q.rear = (QueuePtr)malloc(sizeof(QNode));	//生成新的结点作为头结点，队头队尾指向此结点
	if (!Q.front || !Q.rear)
	{
		return false;						//申请分配空间失败
	}
	Q.front->next = NULL;					//头结点指针域置空
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 链队的入队 -->
{% codeblock lang:c %}
bool EnQueue(LinkQueue& Q, QElemType e) {
	//插入元素e为Q的新队尾元素
	QNode* p = (QueuePtr)malloc(sizeof(QNode));		//为入队元素分配结点空间，用p指向新结点
	if (!p)
	{
		return false;
	}
	p->data = e;									//将新结点的指针域置为e
	p->next = NULL;									
	Q.rear->next = p;								//将新结点插入到队尾
	Q.rear = p;										//修改队尾指针
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 链队的出队 -->
{% codeblock lang:c %}
bool DeQueue(LinkQueue& Q, QElemType& e) {
	//删除Q的队头元素，用e返回其值
	if (Q.front==Q.rear)
	{
		return false;							//队空
	}
	QNode* p = Q.front->next;					//p指向队头元素
	e = p->data;								//e保存队头元素
	Q.front->next = p->next;					//修改头头结点的指针域
	if (Q.rear==p)								//这里需要特变注意，最后一个元素被删，队尾指针丢失
	{	
		Q.rear = Q.front;						//最后一个元素被删，队尾指针指向头结点
	}
	free(p);		
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 取链队的队头元素 -->
{% codeblock lang:c %}
bool GetHead(LinkQueue Q, QElemType& e) {
	//返回Q的队头元素，不修改队头指针
	if (Q.front!=Q.rear)						//队列非空
	{
		e = Q.front->next->data;				//返回队头元素，队头指针不变
		return true;
	}
	return false;
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

## 串

[CodeOcean-CString.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/String/CString.h)
[CodeOcean-CString.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/String/CString.cpp)

{% tabs CString %}
<!-- tab 串的定义 -->
{% codeblock lang:c %}
//------串的定长顺序存储结构-----
#define MAXLEN 255			//串的最大长度
typedef struct {
	char ch[MAXLEN + 1];	//存储串的一维数组
	int length;				//串的当前长度
}SString;

//------串的堆式顺序存储结构-------
typedef struct {
	char* ch;				//若是非空串，则按串长分配存储区，否则ch为NULL
	int length;				//串的当前长度
}HString;

//-----串的链式存储结构---------
#define CHUNKSIZE 80		//由用户定义块的大小
typedef struct Chunk {
	char ch[CHUNKSIZE];
	struct Chunk* next;
}Chunk;
typedef struct {
	Chunk* head, * tail;	//串的头指针和尾指针
	int length;				//串的当前长度
}LString;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 串的操作 -->
{% codeblock lang:c %}
//BF(Brute-Force)算法（最简单直观的模式匹配算法）
int Index_BF(SString S, SString T, int pos);
//计算next数组
void get_next(SString T, int next[]);
//KMP算法
int Index_KMP(SString S, SString T, int pos, int next[]);
//计算next函数修正值
void get_nextval(SString T, int nextval[]);
{% endcodeblock %}
<!-- endtab -->

<!-- tab BF算法 -->
{% codeblock lang:c %}
int Index_BF(SString S, SString T, int pos) {
	//返回模式T在主串S中第pos个字符开始第一次出现的位置(从主串pos处开始)。不存在，返回0
	//其中，T非空，1<=pos<=S.length
	int i = pos;
	int j = 1;									//初始化
	while (i <= S.length && j <= T.length)		//两个串均为比较到末尾
	{
		if (S.ch[i] == T.ch[j])
		{
			++i;
			++j;								//继续比较后继字符
		}
		else
		{
			i = i - j + 2;
			j = 1;								//指针后退重新开始匹配
		}
	}
	if (j > T.length)
	{
		return i - T.length;					//匹配成功
	}
	else
	{
		return 0;								//匹配失败
	}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab KMP算法 -->
{% codeblock lang:c %}
int Index_KMP(SString S, SString T, int pos, int next[]) {
	//利用模式串T的next数组求T在主串S中的第pos个字符之后的位置
	//其中，T非空，i<=pos<=T.length
	int i = pos;
	int j = 1;
	while (i <= S.length && j <= T.length)			//两个串均未比较到串尾
	{
		if (j == 0 || S.ch[i] == T.ch[j])			//继续比较后继字符
		{
			++i; ++j;
		}
		else
		{
			j = next[j];							//模式串向右移动
		}
	}
	if (j > T.length)
	{
		return i - T.length;						//匹配成功
	}
	else
	{
		return 0;									//匹配失败
	}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 计算next函数值 -->
{% codeblock lang:c %}
void get_next(SString T, int next[]) {
	//求模式串T的next函数值并存入next数组
	int i = 1;
	next[1] = 0;
	int j = 0;
	while (i < T.length)
	{
		if (j == 0 || T.ch[i] == T.ch[j])
		{
			++i; ++j;
			next[i] = j;
		}
		else
		{
			j = next[j];
		}
	}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 计算next函数修正值(nextval数组) -->
{% codeblock lang:c %}
void get_nextval(SString T, int nextval[]) {
	//求模式串T的next函数修正值并存入数组nextval
	int i = 1;
	nextval[1] = 0;
	int j = 0;
	while (i < T.length)
	{
		if (j == 0 || T.ch[i] == T.ch[j])
		{
			++i; ++j;
			if (T.ch[i] != T.ch[j])
			{
				nextval[i] = j;
			}
			else
			{
				nextval[i] = nextval[j];
			}
		}
		else
		{
			j = nextval[j];
		}
	}
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

## 树和二叉树

[CodeOcean-BiTree.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/BinaryTree/BiTree.h)
[CodeOcean-BiTree.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/BinaryTree/BiTree.cpp)

{% tabs Tree %}
<!-- tab 树的存储结构 -->

<!-- endtab -->

<!-- tab 树的操作 -->

<!-- endtab -->

<!-- tab 中序遍历递归算法 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 中序遍历非递归算法 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 先序遍历的顺序建立二叉链表 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 复制二叉树 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 计算二叉树深度 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 统计二叉树中结点的个数 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 以结点p为根的子树中序线索化 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 待头结点的二叉树中序线索化 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 遍历中序线索二叉树 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 构造哈夫曼树 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->
{% endtabs %}


## 图

[CodeOcean-Graph.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/Graph/Graph.h)
[CodeOcean-Graph.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/Graph/Graph.cpp)

{% tabs Graph %}
<!-- tab 图的存储（邻接矩阵） -->
{% codeblock lang:c %}
#define MaxInt 32767				//表示极大值∞
#define MVNum 16					//最大顶点数
typedef char VerTexType;			//假设顶点数据类型为字符型
typedef int ArcType;				//假设边数据类型为整形
//采用邻接矩阵建立无向网
//1、输入总顶点数和总边数
//2、依次输入点的信息存入定点表
//3、初始化邻接矩阵，使每个权值初始化为无穷大
//4、构造邻接矩阵
//--------图的邻接矩阵存储表示-------
typedef struct
{
	VerTexType vexs[MVNum];			//顶点表【vertex】
	ArcType arcs[MVNum][MVNum];		//邻接矩阵【弧arc】
	int vexnum, arcnum;				//图当前点数和边数
}AMGraph;	//Adjacency Matrix Graph
{% endcodeblock %}
<!-- endtab -->

<!-- tab 图的存储（邻接表） -->
{% codeblock lang:c %}
typedef int OtherInfo;
//-----图的邻接表存储表示-------
typedef struct ArcNode
{
	int adjvex;					//该边所指向的顶点位置
	struct ArcNode* nextarc;	//指向下一条边指针
	OtherInfo info;				//和边相关信息
}ArcNode;
typedef struct VNode
{
	VerTexType data;			//顶点信息
	ArcNode* firstArc;			//指向第一条依附该顶点边指针
}AdjList[MVNum];
typedef struct
{
	AdjList vertices;			//vertices-vertex复数
	int vexnum, arcnum;			//当前顶点数与弧数
}ALGraph;	//Adjacency List Graph
{% endcodeblock %}
<!-- endtab -->

<!-- tab 图的存储（十字链表） -->

<!-- endtab -->

<!-- tab 图的存储（邻接多重表） -->

<!-- endtab -->


<!-- tab 图的相关操作 -->
{% codeblock lang:c %}
//图中查找顶点u，存在返回下标，否则返回-1
int LocateVex(AMGraph G, VerTexType u);
//采用邻接矩阵表示法创建无向网【Undirected network】
bool CreateUDN(AMGraph& G);
//采用邻接矩阵表示法创建有向图【Undirected network】
bool CreateDG(AMGraph& G);
//遍历邻接矩阵存储的图
void GraphTraverse(AMGraph G);
//采用邻接表法创建无向图
bool GreatUDG(ALGraph& G);
//图中查找顶点u，存在返回下标，否则返回-1(重载)
int LocateVex(ALGraph G, VerTexType u);
//遍历邻接表存储的图
void GraphTraverse(ALGraph G);
{% endcodeblock %}

{% codeblock lang:c %}
//头文件只用于声明和描述全局变量，不应该进行定义和初始化操作
//全局变量的定义和初始化只能在一个源文件中进行
extern bool visited[MVNum];
//采用邻接矩阵表示图的深度优先遍历搜索
void DFS_AM(AMGraph G, int v);
//采用邻接表表示的图的深度优先搜索遍历
void DFS_AL(ALGraph G, int v);
//图的深度优先遍历(Depth First Search)
void DFS(AMGraph G);
void DFS(ALGraph G);
//采用邻接矩阵表示图的广度优先遍历搜索
void BFS_AM(AMGraph G, int v);
//采用邻接表表示的图的广度优先搜索遍历
void BFS_AL(ALGraph G, int v);
//图的广度优先遍历(Breadth First Search)
void BFS(AMGraph G);
void BFS(ALGraph G);
{% endcodeblock %}
<!-- endtab -->

<!-- tab 图的经典算法 -->
{% codeblock lang:c %}
struct
{
	VerTexType adjvex;			//最小边在U中的那个顶点
	ArcType lowcost;			//最小边上的权值
}closedge[MVNum];
//普里姆算法
void MiniSpanTree_Prim(AMGraph G, VerTexType u);
{% endcodeblock %}

{% codeblock lang:c %}
struct Edge
{
	VerTexType Head;			//边的始点
	VerTexType Tail;			//边的终点
	ArcType lowcost;			//边上的权值
};
//相等为0,a>b为1，a<b为-1
int Edge_Compare(Edge a, Edge b);
//结构体交换
void Edge_Change(Edge& a, Edge& b);
//辅助数组Vexset的定义
extern int Vexset[MVNum];
//克鲁斯卡尔算法
void MiniSpanTree_Kruskal(AMGraph G);
{% endcodeblock %}

{% codeblock lang:c %}
//-----迪杰斯特拉算法辅助数据结构-----
//记录源点v0到终点vi是否确定最短路径长度.true表示确定，false表示不确定
extern bool S[MVNum];		
//记录从源点v0到终点vi的当前最短路径上vi的直接前驱顶点序号
//【初值】如果从v0到vi有弧，则Path[i]为v0，否则为-1
extern int Path[MVNum];
//记录从源点v0到终点vi的当前最短路径长度
//【初值】如果从v0到vi有弧，则D[i]为弧上的权值，否则为∞
extern ArcType D[MVNum];
//迪杰斯特拉算法[Dijkstra algorithm]
void ShortestPath_DIJ(AMGraph G, int v0);
{% endcodeblock %}
<!-- endtab -->

<!-- tab 采用（邻接矩阵）表示法创建无向网 -->
{% codeblock lang:c %}
bool CreateUDN(AMGraph& G) {
	//采用邻接矩阵表示法，创建无向网G
	printf("输入总顶点数：\n");					//输入总顶点数、总边数
	G.vexnum = intCin();
	printf("输入总边数：\n");
	G.arcnum = intCin();
	printf("依次输入顶点信息\n");
	for (int i = 0; i < G.vexnum; i++)
	{
		printf("输入...\n");
		Clean();
		G.vexs[i] = getchar();					//依次输入顶点信息
	}
	for (int i = 0; i < G.vexnum; i++)
	{
		for (int j = 0; j < G.vexnum; j++)
		{
			G.arcs[i][j] = MaxInt;				//初始化邻接矩阵，边的权值均置为最大值
		}
	}
	for (int k = 0; k < G.arcnum; k++)
	{
		printf("输入一条边依附的顶点和权值\n");	//输入一条边依附的顶点和权值
		printf("请输入边的权值\n");
		int w = intCin();
		printf("请输入其中一个顶点信息\n");
		Clean();
		char v1 = getchar();
		printf("请输入另外一个顶点信息\n");
		Clean();
		char v2 = getchar();
		int i = LocateVex(G, v1);
		int j = LocateVex(G, v2);				//确定v1和v2在G中的位置，即顶点数组下标
		G.arcs[i][j] = w;						//边<v1,v2>权值为w
		G.arcs[j][i] = G.arcs[i][j];			//无向图，邻接矩阵对称
	}
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 采用（邻接矩阵）表示法创建有向图 -->
{% codeblock lang:c %}
bool CreateDG(AMGraph& G) {
	//采用邻接矩阵表示法，创建有向图G
	printf("输入总顶点数：\n");					//输入总顶点数、总边数
	G.vexnum = intCin();
	printf("输入总边数：\n");
	G.arcnum = intCin();
	printf("依次输入顶点信息\n");
	for (int i = 0; i < G.vexnum; i++)
	{
		printf("输入...\n");
		Clean();
		G.vexs[i] = getchar();					//依次输入顶点信息
	}
	for (int i = 0; i < G.vexnum; i++)
	{
		for (int j = 0; j < G.vexnum; j++)
		{
			G.arcs[i][j] = MaxInt;				//初始化邻接矩阵，边的权值均置为最大值
			if (i == j)
			{
				G.arcs[i][j] = 0;
			}
		}
	}
	for (int k = 0; k < G.arcnum; k++)
	{
		printf("输入一条边依附的顶点和权值\n");	//输入一条边依附的顶点和权值
		printf("请输入边的权值\n");
		int w = intCin();
		printf("请输入始点（弧尾）信息\n");
		Clean();
		char v1 = getchar();
		printf("请输入终点（弧头）信息\n");
		Clean();
		char v2 = getchar();
		int i = LocateVex(G, v1);
		int j = LocateVex(G, v2);				//确定v1和v2在G中的位置，即顶点数组下标
		G.arcs[i][j] = w;						//边<v1,v2>权值为w
	}
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 采用（邻接表）表示法创建无向图 -->
{% codeblock lang:c %}
bool GreatUDG(ALGraph& G) {
	printf("输入总顶点数：\n");					//输入总顶点数、总边数
	G.vexnum = intCin();
	printf("输入总边数：\n");
	G.arcnum = intCin();
	printf("依次输入顶点信息\n");
	for (int i = 0; i < G.vexnum; i++)
	{
		printf("输入...\n");
		Clean();
		G.vertices[i].data = getchar();			//输入顶点值
		G.vertices[i].firstArc = NULL;			//初始化表头结点的指针域为NULL
	}
	for (int k = 0; k < G.arcnum; k++)			//输入各边，构建邻接表
	{
		printf("输入一条边依附的顶点\n");		//输入一条边依附的顶点
		printf("请输入其中一个顶点信息\n");
		Clean();
		char v1 = getchar();
		printf("请输入另外一个顶点信息\n");
		Clean();
		char v2 = getchar();
		int i = LocateVex(G, v1);
		int j = LocateVex(G, v2);				//确定v1和v2在G中的位置，即顶点在G.vertices中下标
		//将新结点*p1插入顶点Vi的边表头部
		ArcNode* p1 = (ArcNode*)malloc(sizeof(ArcNode));	//生成新的边结点*p1
		if (p1==NULL)
		{
			return false;
		}
		p1->adjvex = j;										//邻接点序号为j
		p1->nextarc = G.vertices[i].firstArc;
		G.vertices[i].firstArc = p1;
		//将新结点*p2插入顶点Vj的边表头部
		ArcNode* p2 = (ArcNode*)malloc(sizeof(ArcNode));	//生成新的边结点*p2
		if (p2==NULL)
		{
			return false;
		}
		p2->adjvex = i;									//邻接点序号为i
		p2->nextarc = G.vertices[j].firstArc;
		G.vertices[j].firstArc = p2;
	}
	return true;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 图中查找顶点u -->
{% codeblock lang:c %}
int LocateVex(AMGraph G, VerTexType u)
{
	for (int i = 0; i < G.vexnum; i++)
	{
		if (G.vexs[i] == u)
		{
			return i;
		}
	}
	return -1;
}
{% endcodeblock %}
{% codeblock lang:c %}
int LocateVex(ALGraph G, VerTexType u) {
	for (int i = 0; i < G.vexnum; i++)
	{
		if (G.vertices[i].data==u)
		{
			return i;
		}
	}
	return -1;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 图的遍历 -->
{% codeblock lang:c %}
void GraphTraverse(AMGraph G) {
	printf("图的顶点信息如下：\n");
	for (int i = 0; i < G.vexnum; i++)
	{
		printf("%c\t", G.vexs[i]);
	}
	printf("\n");
	printf("图的邻接矩阵如下：\n");
	for (int i = 0; i < G.vexnum; i++)
	{
		for (int j = 0; j < G.vexnum; j++)
		{
			printf("%d\t", G.arcs[i][j]);
		}
		printf("\n");
	}
}
{% endcodeblock %}
{% codeblock lang:c %}
void GraphTraverse(ALGraph G) {
	printf("图的顶点信息如下：\n");
	for (int i = 0; i < G.vexnum; i++)
	{
		printf("%c\t", G.vertices[i].data);
	}
	printf("\n");
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 深度优先搜索遍历连通图 -->
{% codeblock lang:c %}
void DFS_AM(AMGraph G, int v) {

	//图G为邻接矩阵类型，从第v个顶点出发深度优先搜索遍历图G
	printf("%c\t",G.vexs[v]);			//访问第v个顶点，并置访问标志数组相应分量值为true
	visited[v] = true;
	for (int w = 0; w < G.vexnum; w++)	//依次检查邻接矩阵v所在的行
	{
		//G.arcs[v][w]!=MaxInt表示w是v的邻接点，如果w未访问，则递归条用DFS_AM
		if (G.arcs[v][w] != MaxInt && !visited[w])
		{
			DFS_AM(G, w);
		}
	}
}
void DFS(AMGraph G) {
	for (int i = 0; i < MVNum; i++)
	{
		visited[i] = false;
	}
	DFS_AM(G, 0);
}
{% endcodeblock %}

{% codeblock lang:c %}
void DFS_AL(ALGraph G, int v) {
	//图G为邻接表类型，从第v个顶点出发深度优先遍历搜索图G
	printf("%c\t", G.vertices[v].data);			//访问第v个顶点，并置访问标志数组相应分量值为true
	visited[v] = true;
	ArcNode* p = G.vertices[v].firstArc;		//p指向v的边链表的第一个边结点
	while (p!=NULL)
	{
		int w = p->adjvex;				//w是v的邻接点
		if (!visited[w])				//如果w未访问，则递归调用DFS_AL
		{
			DFS_AL(G, w);
		}
		p = p->nextarc;					//p指向下一个结点
	}
}
void DFS(ALGraph G) {
	for (int i = 0; i < MVNum; i++)
	{
		visited[i] = false;
	}
	DFS_AL(G, 0);
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 广度优先搜索遍历连通图 -->
{% codeblock lang:c %}
void BFS_AM(AMGraph G, int v) {
	//图G为邻接矩阵类型，从第v个顶点出发【广度优先非递归】搜索遍历图G
	printf("%c\t", G.vexs[v]);			//访问第v个顶点，并置访问标志数组相应分量值为true
	visited[v] = true;
	SqQueue Q;
	InitQueue(Q);						//辅助队列Q置空
	EnQueue(Q, G.vexs[v]);				//v进队
	while (!QueueEmpty(Q))				//队列非空
	{
		VerTexType u;
		DeQueue(Q, u);					//队头元素出队并赋给u
		int index = LocateVex(G, u);
		for (int w = 0; w < G.vexnum; w++)
		{
			if ((G.arcs[index][w] != MaxInt) && (!visited[w]))
			{
				printf("%c\t", G.vexs[w]);		//访问w,并置访问数组相应分量为true
				visited[w] = true;
				EnQueue(Q, w);					//w进队
			}
		}
	}
}
void BFS(AMGraph G) {
	for (int i = 0; i < MVNum; i++)
	{
		visited[i] = false;
	}
	BFS_AM(G, 0);
}
{% endcodeblock %}

{% codeblock lang:c %}
void BFS_AL(ALGraph G, int v) {
	//图为邻接表存储类型，从第v个结点出发【广度优先遍历】图G
	printf("%c\t", G.vertices[v].data);			//访问第v个顶点，并置访问标志数组相应分量值为true
	visited[v] = true;
	SqQueue Q;
	InitQueue(Q);								//辅助队列Q置空
	EnQueue(Q, G.vertices[v].data);				//v进队
	while (!QueueEmpty(Q))						//队列非空
	{
		VerTexType u;
		DeQueue(Q, u);							//队头元素出队并赋给u
		int index = LocateVex(G, u);
		ArcNode* p = G.vertices[index].firstArc;//p指向出队结点u(先确定下标)的边链表的第一个边结点,
		while (p != NULL)
		{
			int w = p->adjvex;					//w是v的邻接点
			if (!visited[w])					//如果w未访问，访问并标记
			{
				printf("%c\t", G.vertices[w].data);
				visited[w] = true;
				EnQueue(Q, G.vertices[w].data);
			}
			p = p->nextarc;						//p指向下一个结点
		}
	}
}
void BFS(ALGraph G) {
	for (int i = 0; i < MVNum; i++)
	{
		visited[i] = false;
	}
	BFS_AL(G, 0);
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 普里姆算法 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 克鲁斯卡尔算法 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 迪杰斯特拉算法 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

## 查找

[CodeOcean-Search.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/Search/Search.h)
[CodeOcean-Search.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/Search/Search.cpp)

{% tabs Search %}
<!-- tab 查找表的定义 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 查找相关操作 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 顺序查找 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 设置监视哨的顺序查找 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 折半查找 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 二叉排序树的递归查找 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 二叉排序树的插入 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 二叉排序树的创建 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab 二叉排序树的删除 -->
{% codeblock lang:c %}

{% endcodeblock %}
<!-- endtab -->

<!-- tab B-树的查找 -->

<!-- endtab -->
{% endtabs %}

## 排序

[CodeOcean-sort.h](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/Sort/sort.h)
[CodeOcean-sort.cpp](https://gitee.com/cmwlvip/code_test/blob/master/C/DataStructure/Sort/sort.cpp)

{% tabs sort %}
<!-- tab 待排序记录的存储方式 -->
**出于简单考虑直接定义一个`int`型数组**
{% codeblock lang:c %}
typedef int ElemType;
{% endcodeblock %}
<!-- endtab -->

<!-- tab 排序操作 -->
{% codeblock lang:c %}
//遍历数组前n个元素
void TraverseArray(ElemType A[], int n);
//直接插入排序
void InsertSort(ElemType A[], int n);
//折半插入排序
void BinaryInsertSort(ElemType A[], int n);
//对顺序表做一趟增量是dk的希尔插入排序
void ShellInsert(ElemType A[],int n, int dk);
//希尔排序
void ShellSort(ElemType A[], int n);
//冒泡排序
void BubbleSort(ElemType A[], int n);
//快速排序
void QuickSort(ElemType A[], int n);
//选择排序
void SelectSort(ElemType A[], int n);
//堆排序
void HeapSort(ElemType A[], int n);
//归并排序
void MergeSort(ElemType R[], int n);
void MergeSort(ElemType A[], int low, int high);
//以下用于【基数排序】
#define MAXNUM_KEY 8					//关键字项数(比如【个位、十位】或【花色、数字】)最大值
#define RADIX 10						//关键字基数(radix)，此时是十进制整数的基数
#define MAXSIZE 100						//待比较元素个数
typedef int KeyType;
typedef struct {
	KeyType keys[MAXNUM_KEY];			//待比较关键字
	char otherItems[16];				//其他数据项
	int next;
}SLCell;								//静态链表结点类型
typedef struct {
	SLCell r[MAXSIZE];					//静态链表可利用的空间，r[0]为头结点
	int keynum;							//记录待比较关键字个数(三位数有【个、十、百位】三项)
	int length;							//静态链表当前长度
}SLList;								//静态链表类型
typedef int ArrType[RADIX];				//数组类型
//静态链表初始化，用于基数排序
void SLListInit(SLList& L, KeyType keys[], int len, int keynum);
//基数排序
void RadixSort(SLList& L);
{% endcodeblock %}
<!-- endtab -->

<!-- tab 插入排序 -->
{% codeblock lang:c %}
void InsertSort(ElemType A[], int n) {
	int i, j;
	for (i = 2; i <= n; i++)					//依次将A[2]~A[n]插入前面已排序序列
	{
		if (A[i] < A[i - 1])					//若A[i]的关键码小于其前驱，将A[i]插入有序表
		{
			A[0] = A[i];						//复制为哨兵，A[0]不存放元素
			for (j = i - 1; A[0] < A[j]; j--)	//从后往前查找待插入的位置
			{
				A[j + 1] = A[j];				//向后挪位
			}
			A[j + 1] = A[0];					//复制到插入位置
		}
	}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 折半插入排序 -->
{% codeblock lang:c %}
void BinaryInsertSort(ElemType A[], int n) {
	int i, j, low, high, mid;
	for (i = 2; i <= n; i++)					//依次将A[2]~A[n]插入前面已排序序列
	{
		A[0] = A[i];							//将待插入的记录暂存到监视哨中
		low = 1;
		high = i - 1;							//设置折半查找的范围
		while (low <= high)						//在[low...high]中折半查找插入的位置
		{
			mid = (low + high) / 2;				//取中间点
			if (A[0] < A[mid])
			{
				high = mid - 1;					//插入点在前一子表
			}
			else
			{
				low = mid + 1;					//插入点在后一子表
			}
		}
		for (j = i - 1; j >= high + 1; j--)
		{
			A[j + 1] = A[j];
		}
		A[high + 1] = A[0];
	}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 希尔排序 -->
{% codeblock lang:c %}
void ShellInsert(ElemType A[], int n,int dk) {		//对顺序表做一趟增量是dk的希尔插入排序
	int i, j;
	for (i = 1+dk; i <=n; i++)
	{
		if (A[i]<A[i-dk])							//需要将A[i]插入有序增量子表（后面小于前面）
		{
			A[0] = A[i];							//暂存在A[0]
			for (j = i-dk; j >0 && A[0]<A[j] ; j-=dk)
			{
				A[j + dk] = A[j];					//向后挪位，留出插入位置
			}
			A[j + dk] = A[0];						//将A[0]即原A[i]插入到正确位置
		}
	}
}
void ShellSort(ElemType A[], int n) {
	for (int dk = n/2; dk >=1 ; dk=dk/2)			//增量变化无规定，如可以dk--
	{
		ShellInsert(A, n, dk);
	}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 冒泡排序 -->
{% codeblock lang:c %}
void BubbleSort(ElemType A[], int n) {				//实现从小到大，冒泡小的
	for (int i = 1; i <n; i++)
	{
		bool flag = false;							//用来标记某一趟排序是否发生交换
		for (int j = n; j >i; j--)
		{
			if (A[j-1]>A[j])
			{
				A[0] = A[j];						//位置不对交换
				A[j] = A[j - 1];
				A[j - 1] = A[0];
				flag = true;
			}
		}
		if (!flag)
		{
			return;									//本趟遍历没有发生交换，说明表已经有序
		}
	}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 快速排序 -->
{% codeblock lang:c %}
//对顺序表中的子表[low...high]进行一趟排序，返回枢轴位置
int Partition(ElemType A[],int low,int high) {
	ElemType pivot = A[low];			//将当前表中的第一个元素设为枢轴，对表进行划分
	while (low<high)
	{
		while (low<high && A[high]>=pivot)
		{
			high--;
		}
		A[low] = A[high];				//将比枢轴小的元素移动到左端(用小的元素覆盖枢轴)
		while (low<high && A[low]<=pivot)
		{
			low++;
		}
		A[high] = A[low];				//将比枢轴大的元素移动到右端
	}
	A[low] = pivot;						//枢轴元素存放到最终位置
	return low;							//返回存放枢轴的最终位置
}
//调用前置初值如1...n
void QSort(ElemType A[], int low, int high) {
	if (low<high)									//确保长度大于1
	{
		int pivotpos = Partition(A, low, high);		//将[low...high]一分为二，确定枢轴位置
		QSort(A, low, pivotpos - 1);				//对左子表递归排序
		QSort(A, pivotpos + 1, high);				//对右子表递归排序
	}
}
void QuickSort(ElemType A[],int n) {
	QSort(A, 1, n);
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 简单选择排序 -->
{% codeblock lang:c %}
void SelectSort(ElemType A[], int n) {
	for (int i = 1; i < n; i++)					//一共进行n-1趟
	{
		int min = i;							//记录最小元素位置
		for (int j = i+1; j <= n; j++)
		{
			if (A[j]<A[min])					//找到最小元素
			{
				min = j;
			}
		}
		if (min!=i) {							//交换
			A[0] = A[i];
			A[i] = A[min];
			A[min] = A[0];
		}
	}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 堆排序 -->
{% codeblock lang:c %}
//调整为大根堆（假设[s+1...m]已经是堆，将[s...m]重新调整为大根堆）【即s“下坠”】
void HeapAdjust(ElemType A[], int s,int m) {
	A[0] = A[s];							//A[0]暂存子树根结点
	for (int i = 2*s; i <=m; i*=2)			//沿着key较大的孩子结点向下筛选
	{
		if (i<m && A[i]<A[i+1])				//i为较大孩子结点下标(找到最大孩子)
		{
			i++;
		}
		if (A[0]>=A[i])							//满足大根堆
		{
			break;								//就是应该插在s上
		}
		A[s] = A[i];							//将大的叶子结点调整至双亲位置
		s = i;									//继续向下筛选（叶子变双亲）
	}
	A[s] = A[0];								//插入，元素“下坠完成”
}
void CreatMaxHeap(ElemType A[],int n) {			//把无序序列建成大根堆
	for (int i = n/2; i > 0; i--)
	{
		HeapAdjust(A, i, n);					//反复调用HeapAdjust,从i=[n/2]~1
	}
}
void HeapSort(ElemType A[], int n) {
	CreatMaxHeap(A, n);							//把无序序列建成大根堆
	for (int i = n;  i>1; i--)					//n-1趟交换和建堆过程（堆长逐渐减小）
	{
		A[0] = A[i];							//堆顶于最后一个元素交换
		A[i] = A[1];	//换成max
		A[1] = A[0];
		HeapAdjust(A, 1, i - 1);				//[1...i-1]重新调成堆
	}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 归并排序 -->
{% codeblock lang:c %}
//严蔚敏版
void Merge(ElemType R[], ElemType T[], int low, int mid, int high) {
	//将有序表R[low...mid]和R[mid+1...high]归并为有序表T[row...high]
	int i = low, j = mid + 1, k = low;
	while (i <= mid && j <= high)
	{
		if (R[i] <= R[j])
		{
			T[k++] = R[i++];
		}
		else {
			T[k++] = R[j++];
		}
	}
	while (i <= mid)
	{
		T[k++] = R[i++];
	}
	while (j <= high) {
		T[k++] = R[j++];
	}
}
void MSort(ElemType R[], ElemType T[], int low, int high) {
	if (low == high)
	{
		T[low] = R[low];				//直接放入T
	}
	else {
		ElemType* S = (ElemType*)malloc((high + 1) * sizeof(ElemType));
		int mid = (low + high) / 2;			//将序列一分为二
		MSort(R, S, low, mid);				//对子序列R[low..mid]递归归并排序，结果放入S[low...mid]
		MSort(R, S, mid + 1, high);			//对子序列R[mid+1..high]递归归并排序，结果放入S[mid+1..high]
		Merge(S, T, low, mid, high);		//将S[low..mid]和S[mid+1..high]归并到T[low..high]
		free(S);
	}
}
void MergeSort(ElemType R[],int n) {
	//对数组做归并排序
	MSort(R, R, 1, n);
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 归并排序（借助辅助数组） -->
{% codeblock lang:c %}
ElemType B[9] = {0};							//辅助数组B
//相邻两个有序子序列的归并
void Merge(ElemType A[],int low,int mid,int high) {
	//将有序表R[low...mid]和R[mid+1...high]归并为有序表T[row...high]
	int i=low, j=mid+1, k=low;
	for (int x = low; x <= high; x++)
	{
		B[x] = A[x];							//将R中所有元素复制到B
	}
	while (i <= mid && j <= high)
	{
		if (B[i] <= B[j])
		{
			A[k++] = B[i++];
		}
		else
		{
			A[k++] = B[j++];
		}
	}
	while (i<=mid)
	{
		A[k++] = B[i++];						//将剩余的T[i...mid]复制到R
	}
	while (j<=high)
	{
		A[k++] = B[j++]; 						//将剩余的T[j...high]复制到R
	}
}
void MergeSort(ElemType A[], int low, int high) {
	if (low < high) {
		int mid = (low + high) / 2;				//从中间划分两个子序列
		MergeSort(A, low, mid);					//对左侧子序列进行递归排序
		MergeSort(A, mid + 1, high);			//对右侧子序列进行递归排序
		Merge(A, low, mid, high);				//归并
	}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 基数排序 -->
{% codeblock lang:c %}
void SLListInit(SLList& L, KeyType keys[], int len, int keynum) {
	L.keynum = keynum;
	L.length = len;
	for (int i = 1; i <= len; i++)
	{
		L.r[i].keys[2] = keys[i] / 100;
		L.r[i].keys[1] = keys[i] % 100 / 10;
		L.r[i].keys[0] = keys[i] % 10;
	}
}
void Distribute(SLList& L,int i, ArrType& f, ArrType& e) {
	//按第i个关键字排序
	// 本算法按第i个关键字keys[i]建立RADIX个子表，使同一子表中记录的keys[i]相同
	//【first】f[0...radix-1]指向各子表对应的第一个元素
	//【end】e[0...radix-1]指向各子表对应的最后一个元素
	for (int j = 0; j < RADIX; j++)
	{
		f[j] = 0;								//各子表初始化为空表
	}
	for (int p = L.r[0].next; p ; p=L.r[p].next)
	{
		int key = L.r[p].keys[i];				//将记录中的第i个关键字记录
		if (!f[key])							//f为空
		{
			f[key] = p;							//说明此记录必为【对应关键字key值子表】第一个元素
		}
		else									//非空
		{
			L.r[e[key]].next = p;				//让子表中最后一个记录的next指向新来记录
		}
		e[key] = p;								//把p所指结点插入第key个子表（即最后一个记录更新为新来记录）
	}
}
void Collect(SLList& L, int i, ArrType f, ArrType e) {
	//本算法按keys[i]从小到大地将f[0...radix-1]所指各子表依次连接成一个链表
	//【end】e[0...radix-1]为各子表地尾指针
	int j;
	for (j = 0; !f[j]; j++) {}					//找第一个非空子表
	L.r[0].next = f[j];							//r[0].next指向第一个非空子表中的第一个结点
	int t = e[j];
	while(j < RADIX) {
		for (j = j + 1; j < RADIX - 1 && !f[j]; j++) {}	//找下一个非空子表
		if (j != RADIX && f[j])					//f[RADIX]会越界
		{
			L.r[t].next = f[j];
			t = e[j];							//链接两个非空子表
		}
	}
	L.r[t].next = 0;							//t指向最后一个非空子表中的最后一个结点
}
void RadixSort(SLList& L) {
	ArrType f, e;
	//L是采用静态链表表示的顺序表
	//对L做基数排序，使得L成为按关键字从小到大的有序静态链表，L.r[0]为头结点
	for (int i = 0; i < L.length; i++)
	{
		L.r[i].next = i + 1;
	}
	L.r[L.length].next = 0;						//将L改造为静态链表【初始化】
	for (int i = 0; i < L.keynum; i++)
	{
		Distribute(L, i, f, e);					//第i趟分配
		Collect(L, i, f, e);					//第i趟收集
	}
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}