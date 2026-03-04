---
title: C语言-哈希表
top_img: /img/top_img.jpg
date: 2026-01-15 15:25:37
tags:
    - C
categories:
    - 数据结构
description: uthash库：C语言哈希表终极解决方案
sticky:
cover:
---

## 为什么需要哈希表？

### 数组和链表的局限性

在C语言中，我们通常使用数组或链表存储数据：

{% codeblock lang:c %}
// 数组 - 查找O(1)，但插入删除慢，大小固定
int array[100];

// 链表 - 插入删除O(1)，但查找O(n)
struct Node {
    int data;
    struct Node* next;
}*LinkList;
{% endcodeblock %}

### 哈希表的优势

哈希表结合了两者的优点：

- 查找接近O(1)
- 插入删除接近O(1)
- 动态扩容

## 哈希表基本原理

**核心思想:**键(key) → 哈希函数 → 索引(index) → 存储值(value)

for example

{% codeblock lang:c %}
// 假设哈希函数：hash(key) = key % 10
// key=25 → hash=5 → 存储在table[5]

+----------------+
| 索引 | 值       |
+----------------+
| 0   | 空       |
| 1   | 空       |
| ... | ...      |
| 5   | key=25   | ← 25存储在这里
| ... | ...      |
+----------------+
{% endcodeblock %}

## 自己实现简单哈希表

### 基础结构

{% codeblock lang:c %}
#define TABLE_SIZE 1000

// 哈希表节点
struct HashNode {
    int key;
    int value;
    struct HashNode* next;  // 处理冲突用链表
};

// 哈希表
struct HashTable {
    struct HashNode* table[TABLE_SIZE]; //一个HashNode指针数组(HashNode*)
};
{% endcodeblock %}

### 基本操作

{% tabs CustomFunction %}
<!-- tab 哈希函数 -->
{% codeblock lang:c %}
int hashFunction(int key) {
    return key % TABLE_SIZE; //key不能超过哈希表的容量
}
{% endcodeblock %}
<!-- endtab -->
<!-- tab 插入 -->
{% codeblock lang:c %}
void insert(struct HashTable* hashtable, int key, int value) {
    int index = hashFunction(key);
    struct HashNode* newNode = malloc(sizeof(struct HashNode));
    newNode->key = key;
    newNode->value = value;
    //如果该key值已有节点，会挂在newNode->next下，否则相当于newNode->next=NULL(冲突处理)
    newNode->next = hashtable->table[index];
    hashtable->table[index] = newNode;  //将新结点指针挂在对应key下的哈希表中
}
{% endcodeblock %}
<!-- endtab -->
<!-- tab 查找 -->
{% codeblock lang:c %}
int search(struct HashTable* hashtable, int key) {
    int index = hashFunction(key);
    struct HashNode* current = hashtable->table[index];
    while (current) { //一直向下查询
        if (current->key == key) {
            return current->value;
        }
        current = current->next;
    }
    return -1;  // 没找到
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

## uthash库：C语言哈希表终极解决方案

### 头文件

[uthash](https://github.com/troydhanson/uthash/blob/master/src/uthash.h)是C语言的一个开源哈希表库，只有头文件，使用非常方便。

只需[下载uthash.h头文件](/downloads/code/C/uthash.h)，放入项目即可。

> 📥 **下载说明**：点击链接后如果文件直接打开，请右键链接选择"另存为"。

{% codeblock lang:c %}
#include "uthash.h"
{% endcodeblock %}s

### 定义结构体

定义结构体，确定好键值类型

{% codeblock lang:c %}
// 关键：必须包含UT_hash_handle hh
struct hashTable {
    int key;                    // 键(int)
    char name[20];            // 值(string)
    UT_hash_handle hh;        // 必需！让uthash管理
};
{% endcodeblock %}

### uthash宏

{% tabs hashtable %}
<!-- tab 初始化 -->
{% codeblock lang:c %}
struct hashTable* hashtable = NULL;  // 必须初始化为NULL
{% endcodeblock %}
<!-- endtab -->

<!-- tab 插入元素 -->
{% codeblock lang:c 添加元素宏 %}
HASH_ADD_INT(head, keyfield, item);              /* 键为 int */
HASH_ADD_STR(head, keyfield, item);              /* 键为字符串 */
HASH_ADD_PTR(head, keyfield, item);              /* 键为指针 */
{% endcodeblock %}

{% codeblock lang:c %}
void insert(int k, char *name) {
    struct hashTable *item = malloc(sizeof(struct hashTable));
    item->key = k;
    strcpy(item->name, name);
    HASH_ADD_INT(hashtable, key, item);  // key是结构体中的字段名
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 查找元素 -->
{% codeblock lang:c 查找元素宏 %}
HASH_FIND_INT(head, keyptr, out);                /* int 键查找 */
HASH_FIND_STR(head, keyptr, out);                /* 字符串键查找 */
HASH_FIND_PTR(head, keyptr, out);                /* 指针键查找 */
{% endcodeblock %}

{% codeblock lang:c %}
struct hashTable* find(int key) {
    struct hashTable* out;
    HASH_FIND_INT(hashtable, &key, out); // 自动处理哈希查找,通过key找结点
    return out;
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 删除元素 -->
{% codeblock lang:c  删除元素宏 %}
HASH_DEL(users, user_to_delete);     // 简洁版
HASH_DELETE(hh, users, user_to_delete); // 明确版

// 注意：只从哈希表中移除，不释放内存
free(user_to_delete);  // 需要手动释放

HASH_CLEAR(hh, hashtable);                   // 清空哈希表（不释放元素）
{% endcodeblock %}

{% codeblock lang:c %}
void delete(struct hashTable *s) {
    HASH_DEL(hashtable, s);
    free(s);
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 遍历所有元素 -->
{% codeblock lang:c 遍历宏 %}
// 安全遍历（推荐！可安全删除当前元素）
User *current, *tmp;
HASH_ITER(hh, hashtable, current, tmp) {
    printf("ID: %d, Name: %s\n", current->id, current->name);
    // 可在此安全删除current
}

// 简单遍历（不能安全删除）
for(current = hashtable; current != NULL; current = current->hh.next) {
    // 不可在此删除current
}
{% endcodeblock %}

{% codeblock lang:c %}
void print_all() {
    struct hashTable *s, *tmp;
    HASH_ITER(hh, hashtable, s, tmp) {
        printf("ID: %d, Name: %s\n", s->id, s->name);
    }
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 获取元素数量 -->
{% codeblock lang:c %}
int count() {
    return HASH_COUNT(hashtable);
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab 排序 -->
{% codeblock lang:c %}
// 排序（使用标准qsort比较函数）
HASH_SORT(hashtable, compare_func);
int compare_func(struct hashTable *a, struct hashTable *b) {
    return strcmp(a->name, b->name);
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}