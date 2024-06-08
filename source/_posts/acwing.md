---
title: acwing
date: 2023-02-26 21:22:17
updated: 2023-02-28
sticky: 
mathjax: true
categories: 算法
description: acwing算法题,未完待续...
tags:
    - 算法
    - acwing
cover: https://pic.imgdb.cn/item/63fb6b08f144a010077c7fab.png
top_img: https://pic.imgdb.cn/item/63fb6d06f144a010077fad77.jpg

---

## A+B

{% tabs A+B,-1 %}
<!-- tab 题目 -->
![A+B](1.jpg)
<!-- endtab -->
<!-- tab java -->
{% codeblock lang:java %}
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String args[]) {
        Scanner cin=new Scanner(System.in);
        int a = cin.nextInt();
        int b = cin.nextInt();
        System.out.println(a + b);
    }
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab python -->
{% codeblock lang:python %}
a,b=map(int,input().split())
print(a+b)
{% endcodeblock %}
<!-- endtab -->

<!-- tab (python)map函数 -->
{% note default modern %}
`map`函数，Python内置函数，映射函数
{% endnote %}

<b>语法</b>
{% codeblock lang:python %}
map(function,iterable)
# function -- 函数
# iterable -- 序列
{% endcodeblock %}

1. 列表做参
{% codeblock lang:python %}
>>> list(map(int,[2.34,13.14,66]))
[2,13,66]
{% endcodeblock %}
2. 自定义函数做参
{% codeblock lang:python %}
def my(x):
    return x+1
print(tuple(map(my,{2,3.6,6})))
# (3,4.6,7)
{% endcodeblock %}
3. map函数返回的是一个`map`类型的序列，而不是列表
{% codeblock lang:python %}
>>> type(map(int,[3,4]))
<class 'map'>
{% endcodeblock %}
4. 当function函数没有返回值的时候，返回一个由None组成的序列
{% codeblock lang:python %}
def my(number):
    pass
print(list(map(my,[1,2,3])))
#[None,None,None]
{% endcodeblock %}
<!-- endtab -->

{% endtabs %}

## 01背包问题

{% tabs 01knapsnack,-1 %}
<!-- tab 图解背包问题 -->
假设你是个小偷，背着一个可以装4磅东西的背包。
可偷窃的商品入下：
![可偷窃的东西](IMG_0395.JPG)
为了让偷窃的商品价值最高就是**01背包问题**
枚举法在商品多到一定程度的时候肯定是行不通的，如何找到最优解呢？答案是使用动态规划
{% blockquote %}
动态规划
{% endblockquote %}
对于背包问题，先解决小背包（子背包）问题，再逐步解决原来的问题。
![先解决小背包问题](IMG_0396.JPG)
![每个动态规划算法都从一个网格开始](IMG_0397.JPG)
{% label 吉他行 green %}
![只有吉他可供选择](IMG_0398.JPG)
{% label 音响行 green %}
![可偷的商品有吉他和音响](IMG_0399.JPG)
![更新了最大值](IMG_0401.JPG)
{% label 笔记本电脑行 green %}
![3磅的背包，选择偷窃价值2000美元的笔记本电脑而不是吉他](IMG_0402.JPG)
![4磅背包](IMG_0403.JPG)
![最终答案](IMG_0404.JPG)
{% blockquote %}
公式
{% endblockquote %}
![单元格公式](IMG_0405.JPG)
<!-- endtab -->
<!-- tab 题目 -->
![01背包](2.jpg)
<!-- endtab -->

<!-- tab java -->
{% codeblock lang:java %}
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        int N = cin.nextInt();
        int V = cin.nextInt();
        int[] v = new int[N + 1];
        int[] w = new int[N + 1];
        for (int i = 1; i < N + 1; i++) {
            v[i] = cin.nextInt();
            w[i] = cin.nextInt();
        }
        int[][] cell = new int[N + 1][V + 1];
        for (int i = 1; i < N + 1; i++) {
            for (int j = 1; j < V + 1; j++) {
                if (j >= v[i]) {
                    cell[i][j] = Math.max(cell[i - 1][j - v[i]] + w[i], cell[i - 1][j]);
                } else {
                    cell[i][j] = cell[i - 1][j];
                }
            }
        }
        System.out.println(cell[N][V]);
    }
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab python -->
{% codeblock lang:python %}
N,V=list(map(int,input().split()))
things=[[0]*2 for i in range(N+1)]
for i in range(1,N+1):
    things[i][0],things[i][1]=list(map(int,input().split()))
cell=[[0]*(V+1) for i in range(N+1)]
for i in range(1,N+1):
    for j in range(1,V+1):
        #j空间大的背包，j大于物品体积的时候才有剩余空间价值
        if(j>=things[i][0]):
            if(cell[i-1][j]>things[i][1]+cell[i-1][j-things[i][0]]):
               cell[i][j]=cell[i-1][j]
            else:
                cell[i][j]=things[i][1]+cell[i-1][j-things[i][0]]
        else:
            cell[i][j]=cell[i-1][j]
print(cell[N][V])
{% endcodeblock %}
<!-- endtab -->

<!-- tab (python)定义二维数组 -->
{% note default modern %}
python定义二维数组
{% endnote %}

{% label 使用numpy green %}
{% codeblock lang:python %}
import numpy as np
arr=[[0]*3 for i in range(3)]
arr1=np.zeros([3,3])
print(arr1)
'''
[[0. 0. 0.]
 [0. 0. 0.]
 [0. 0. 0.]]
'''
{% endcodeblock %}
{% label 使用for循环 green %}
{% codeblock lang:python %}
arr=[[0]*3 for i in range(3)]
print(arr)
#[[0, 0, 0], [0, 0, 0], [0, 0, 0]]
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

## 完全背包问题

{% tabs completeknapsack,-1 %}
<!-- tab 分析 -->
结合**01背包问题**图解我们得到了**01背包问题**的递推式子
**完全背包问题**就是物品数量无限，其实也可以强行**01背包问题**求解$cell[i][j]$

- $v[i]$表示物品体积
- $w[i]$表示物品价值
- **不选第i种物品**：$cell[i-1][j]$
- **选1个第i种物品**：$cell[i-1][j-v[i]]+w[i]$
- **选2个第i种物品**：$cell[i-1][j-2v[i]]+2w[i]$
- 因为过程有限，过程不能无限下去，对于第i个物品，最多可以装$\frac{j}{v[i]}$个
- 所以递推式子其实就是

$$
cell[i][j]=max_{ (0{\leq}k{\leq}t)}(cell[i-1][j],cell[i-1][j-kv[i]]+kw[i])
$$

{% note danger modern %}
到这一步，已经能写出代码了，见python，只不过时间复杂度太大了，运行不通过
{% endnote %}

继续往下分析

$$
cell[i][j]=max_{ (0{\leq}k{\leq}t)}(cell[i-1][j],cell[i-1][j-v[i]]+w[i],cell[i-1][j-2v[i]]+2w[i],...)①
$$
$$
cell[i][j-v[i]]=max_{ (0{\leq}k{\leq}t)}(cell[i-1][j-v[i]],cell[i-1][j-v[i]-v[i]]+w[i],...)②
$$
等式两边同时加上$w[i]$
$$
cell[i][j-v[i]]+w[i]=max_{ (0{\leq}k{\leq}t)}(cell[i-1][j-v[i]]+w[i],cell[i-1][j-v[i]-v[i]]+w[i]+w[i],...)③
$$
仔细看③与①相比就少了$cell[i-1][j]$,于是有了**完全背包**递推公式如下：
$$
cell[i][j]=max(cell[i][j-v[i]]+w[i],cell[i-1][j])
$$
<!-- endtab -->

<!-- tab 题目 -->
![完全背包](3.jpg)
<!-- endtab -->

<!-- tab java -->

<!-- endtab -->

<!-- tab python -->
{% codeblock lang:python 未优化 %}
N,V=list(map(int,input().split()))
v=[0]*(N+1)
w=[0]*(N+1)
for i in range(1,N+1):
    v[i],w[i]=list(map(int,input().split()))
cell=[[0]*(V+1) for i in range(N+1)]
def findMax(i,j):
    max=cell[i-1][j]
    for k in range(int(j/v[i]+1)):   
        if(cell[i-1][j-k*v[i]]+k*w[i]>max):
            max=cell[i-1][j-k*v[i]]+k*w[i]
    return max
for i in range(1,N+1):
    for j in range(1,V+1):
       cell[i][j]=findMax(i,j)
print(cell[N][V])
{% endcodeblock %}
{% codeblock lang:python 优化 %}
for i in range(1,N+1):
    for j in range(1,V+1):
        if(j>=v[i]):
            if(cell[i][j-v[i]]+w[i]>cell[i-1][j]):
                cell[i][j]=cell[i][j-v[i]]+w[i]
            else:
                cell[i][j]=cell[i-1][j]
        else:
            cell[i][j]=cell[i-1][j]
print(cell[N][V])
{% endcodeblock %}
<!-- endtab -->

{% endtabs %}

## 多重背包

{% tabs mutipleKnapsack %}
<!-- tab 分析 -->
如果$s[i]v[i]>V$，不就是一个**完全背包**
所以**多重背包**问题就是要转换成**01背包**+**完全背包**
<!-- endtab -->
{% endtabs %}