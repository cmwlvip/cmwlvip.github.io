---
title: c-using
top_img: https://pic1.imgdb.cn/item/696a0ae5a771d3eac15a27ec.jpg
date: 2026-01-16 17:34:44
tags: 
    - C
categories: C
description: C语言的使用指南
sticky:
cover: 
---

## 快速开始

### main()

{% codeblock lang:c %}
#include<stdio.h>
#include <stdlib.h>

int main() {
    system("pause");
    return 0;
}
{% endcodeblock %}

### 选择菜单栏

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

## 格式化输出字符

### 格式说明符基本结构

{% codeblock lang:plaintext %}
%[标志][宽度][.精度][长度修饰符]类型说明符
{% endcodeblock %}

组合示例

{% codeblock lang:c %}
int num = -42;
float f = 123.456f;
// 显示正负号 + 0填充
printf("%+010d\n", num);      //-000000042
// 对齐方式 + 宽度 + 精度
printf("|%+10.2f|\n", f);     // |   +123.46|
printf("|%+010.2f|\n", f);    // |+000123.46|
printf("|%-10.2f|\n", f);     // |123.46    |
printf("|%10.2f|\n", f);     //  |    123.46|
{% endcodeblock %}


### 整数类型

- `%d` 或 `%i`：有符号十进制整数，用于格式化输出 `int`, `long`, `short` 等有符号整型变量。

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

- `%u`：无符号十进制整数，用于格式化输出 `unsigned int`, `unsigned long`, `unsigned short` 等无符号整型变量。
- `%o`：八进制整数

{% codeblock lang:c %}
int num = 42;   // 十进制42 = 八进制52
printf("%o", num);  // 输出: 52
printf("%#o", num); // 输出: 052 (带前导0)
{% endcodeblock %}

- `%x` 或 `%X`：十六进制整数

{% codeblock lang:C %}
int num = 255;  // 十进制255 = 十六进制FF
printf("%x", num);    // 输出: ff (小写)
printf("%X", num);    // 输出: FF (大写)
printf("%#x", num);   // 输出: 0xff (带0x前缀)
printf("%#X", num);   // 输出: 0XFF (带0X前缀)
{% endcodeblock %}

### 浮点数类型

- `%f` 或 `%F`：浮点数，用于格式化输出 `float` 和 `double` 类型的浮点数。

{% codeblock lang:C %}
float pi = 3.14159;
double d = 123.456;
printf("%f", pi);     // 输出: 3.141590 (默认6位小数)
printf("%.2f", pi);   // 输出: 3.14 (2位小数)
printf("%F", pi);     // 输出: 3.141590 (与%f相同)
{% endcodeblock %}

- `%e` 或 `%E`：科学计数法

{% codeblock lang:c %}
double d = 1234.567;
printf("%e", d);      // 输出: 1.234567e+03 (小写e)
printf("%E", d);      // 输出: 1.234567E+03 (大写E)
printf("%.2e", d);    // 输出: 1.23e+03
{% endcodeblock %}

- `%g` 或 `%G`：自动选择表示法

{% codeblock lang:c %}
printf("%g", small);   // 输出: 1.2345e-05 (使用科学计数法)
printf("%g", large);   // 输出: 1.23457e+08 (使用科学计数法)
printf("%g", normal);  // 输出: 123.456 (使用十进制表示)
printf("%G", large);  // 输出: 1.23457E+08 (大写E的科学计数法)
{% endcodeblock %}

- `%a` 或 `%A`：十六进制浮点数，double类型在内存中占用8字节（64位），按照**IEEE754**标准，它的尾数部分（有效数字）实际有52位，用十六进制表示时，**52 位二进制 = 13位十六进制（因为每4位二进制=1位十六进制）**，用此格式输出编译器可以显示浮点数完整的精度。

{% codeblock lang:c %}
double d1 = 255.0;
double d2 = 255.0000000000001;  // 稍微加一点
printf("%a", d1);    //0x1.fe00000000000p+7(13位，fe后面的00000000000表示剩余的尾数位都是零)
printf("%A", d2);    //0X1.0X1.FE00000000004P+7(大写)
printf("%.15f", d1); //255.000000000000000
printf("%.15f", d2); //255.000000000000114
{% endcodeblock %}

### 字符和字符串类型

- `%c`：字符，用于格式化输出 `char` 类型的变量或表达式。
- `%s`：字符串，用于格式化输出字符串。

{% codeblock lang:c %}
char str[] = "Hello";
printf("%s\n", str);            // 输出: Hello
printf("%10s\n", str);          // 输出:      Hello (右对齐)
printf("%-10s\n", str);         // 输出: Hello      (左对齐)
printf("%.3s\n", str);          // 输出: Hel (只输出前3个字符)
{% endcodeblock %}

### 指针类型

- `%p`：指针地址，格式化输出 `void*` 指针类型变量或表达式的地址。

### 特殊类型

- `%zu`：用于格式化输出 [size_t](#size-t) 类型的变量
- `%%`： 输出百分号

### 长度修饰符与类型组合

- `%hd` 或 `%hi`：短整形有符号十进制整数，用于格式化输出 `short` 类型的变量。
- `%ld` 或 `%li`：长整形有符号十进制整数，用于格式化输出 `long` 类型的变量。
- `%lld`：长长整形有符号十进制整数，用于格式化输出 `long long` 类型的变量。
- `%Lf`：长双精度浮点数，用于格式化输出 `long double` 类型的变量。【long double ld = 3.141592653589793238L;(L表示long double)】
- `%hu`：短整形无符号十进制整数，用于格式化输出 `unsigned short` 类型的变量。
- `%lu`：长整形无符号十进制整数，用于格式化输出 `unsigned long` 类型的变量。

## 结构体

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

## 函数

### IO

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

### 字符串

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

### 内存管理

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

#### `char*`,`char**`,`char***`的本质

1. `char*`是一个指针
{% codeblock lang:c %}
char* str = "hello";
// 内存布局：
// str本身是一个指针变量（通常4或8字节）
// 指向存储在别处的字符串"hello\0"
str → [h][e][l][l][o][\0]  // 字符串实际存储的位置
{% endcodeblock %}
2. 指针的大小是固定的
   - 在32位编译器下：`sizeof(char*) = 4字节`
   - 在64位编译器下：`sizeof(char*) = 8字节`
   - 与指向的内容无关
3. 所有指针大小相同：`char*`、`char**`、`char***` 在相同编译器环境下大小一样
4. 与指向的内容无关
5. 三维结构(假设结构[["eat","tea","ate"],["bat","tab"]])
    - `char***` → 指向分组数组
    - `char**` → 一个分组（字符串数组）
    - `char*` → 一个字符串

#### 理解内存分配

{% note info modern %}
**指针大小是固定的，指向的内容大小是可变的。**分配指针数组时，只关心有多少个指针，不关心它们指向的字符串有多长。
{% endnote %}

首先，理解字符串数组的创建过程，假设需要建立一个字符串数组，用于存储字符串

{% codeblock lang:c %}
// 分配能存储4个指针的数组
char** array = malloc(4 * sizeof(char*));
// 等同于（假设32位编译器）：
// char** array = malloc(4 * 4);  // 分配16字节
{% endcodeblock %}

可视化

{% codeblock lang:plaintext %}
array 指向的内存：
+--------+--------+--------+--------+ ...
| char*  | char*  | char*  | char*  |   // 每个格子4字节
| (slot0)| (slot1)| (slot2)| (slot3)|   // 可以存储4个指针
+--------+--------+--------+--------+ ...
    ↓        ↓        ↓        ↓
   NULL    NULL    NULL    NULL         // 初始为空指针
{% endcodeblock %}

需要注意的是：**指针数组和字符串存储是分开的。**

{% codeblock lang:c %}
// 1. 分配指针数组
char** words = malloc(3 * sizeof(char*));  // 24字节（64位）

// 2. 为每个字符串分配空间
words[0] = malloc(6 * sizeof(char));      // "hello" + '\0' = 6字节
strcpy(words[0], "hello");

words[1] = malloc(4 * sizeof(char));      // "abc" + '\0' = 4字节
strcpy(words[1], "abc");

words[2] = malloc(9 * sizeof(char));     // "longword" + '\0' = 9字节
strcpy(words[2], "longword");

// 内存布局：
// words → [ptr0][ptr1][ptr2]          // 24字节
//           ↓      ↓      ↓
//         "hello" "abc" "longword"    // 不同长度
{% endcodeblock %}

接着，继续理解三维结构

{% codeblock lang:plaintext %}
strs = ["eat", "tea", "ate", "bat", "tab"]  //输入
result = [["eat","tea","ate"],["bat","tab"]]    //输出
{% endcodeblock %}

{% codeblock lang:c %}
int returnSize = 2;  // 2个分组

// 1. 分配第一维：分组数组
char*** result = malloc(2 * sizeof(char**));
// 分配：2 × 8 = 16字节

// 2. 分配列数数组
int* returnColumnSizes = malloc(2 * sizeof(int));
returnColumnSizes[0] = 3;  // 第一组3个单词
returnColumnSizes[1] = 2;  // 第二组2个单词

// 3. 分配第二维：每个分组的字符串指针数组
result[0] = malloc(3 * sizeof(char*));  // 第一组：3 × 8 = 24字节
result[1] = malloc(2 * sizeof(char*));  // 第二组：2 × 8 = 16字节

// 4. 设置指针（不复制字符串内容）
result[0][0] = strs[0];  // "eat"
result[0][1] = strs[1];  // "tea"
result[0][2] = strs[2];  // "ate"

result[1][0] = strs[3];  // "bat"
result[1][1] = strs[4];  // "tab"
{% endcodeblock %}

内存布局可视化：

{% codeblock lang:plaintext %}
┌─────────────────────────────────────────────────────────┐
│ result (char***) 指向分组数组                            │
│                                                         │
│  result[0] → char** 数组1 → [ char*,  char*,  char*]    │
│             │             │                             │
│             │             ├─→ "eat\0" ←─┐               │
│             │             │             这些字符串来自   │
│             │             ├─→ "tea\0" ←─┤ 原始输入      │
│             │             │             │ strs数组      │
│             │             └─→ "ate\0" ←─┘               │
│             │                                           │
│  result[1] → char** 数组2 → [ char*,  char*]            │
│                        │                                │
│                        ├─→ "bat\0" ←─┐                  │
│                        │             来自strs数组       │
│                        └─→ "tab\0" ←─┘                  │
└─────────────────────────────────────────────────────────┘
{% endcodeblock %}

## 宏

宏（Macro）是 C/C++ 中的文本替换工具。在编译之前，预处理器会把宏名替换为对应的文本。

### 对宏简单的理解

**宏 = 代码的快捷方式**
就像你在 Word 里设置快捷键一样：

- 输入 adr → 自动替换为 北京市
- 输入 sig → 自动替换为 张三，CEO

### 基本格式

{% codeblock lang:c %}
#define 宏名 替换文本
{% endcodeblock %}

### 常量宏

{% codeblock lang:c %}
#define PI 3.14159
#define MAX_SIZE 100
#define NAME "Alice"

// 编译前：编译器看到
double area = PI * radius * radius;
// 编译后：实际代码是  
double area = 3.14159 * radius * radius;
{% endcodeblock %}

### 函数式宏

{% codeblock lang:c %}
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define PRINT(msg) printf("%s\n", msg)
// 使用
int x = SQUARE(5);      // 变成：int x = ((5) * (5));
int y = MAX(3, 4);      // 变成：int y = ((3) > (4) ? (3) : (4));
PRINT("Hello");         // 变成：printf("%s\n", "Hello");
{% endcodeblock %}

## 关于C的使用问题

### `size_t`

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

### 数组越界访问

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

### 清空输入缓冲区

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
