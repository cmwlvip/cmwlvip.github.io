---
title: Git
date: 2022-12-03 12:10:02
updated: 2022-12-01
description: Git 不仅仅是个版本控制系统，它也是个内容管理系统(CMS)，工作管理系统等。
categories: Git
tags:
    - Git
keywords:
    - Git
cover: /2022/12/03/Git/git.png
top_img:
---

## 初识Git

Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

Git 与常用的版本控制工具 CVS, Subversion 等不同，它采用了分布式版本库的方式，不必服务器端软件支持。

## 概述

### 开发中的实际场景

{% hideToggle 开发中的实际场景 %}
**场景一：备份**
小明负责的模块就要完成了，就在即将Release之前的一瞬间，电脑突然蓝屏，硬盘光荣牺牲！几个月来的努力付之东流
**场景二：代码还原**
这个项目中需要一个很复杂的功能，老王摸索了一个星期终于有眉目了，可是这被改得面目全非的代码已经回不到从前了。什么地方能买到哆啦A梦的时光机啊？
**场景三：协同开发**
小刚和小强先后从文件服务器上下载了同一个文件：Analysis.java。小刚在Analysis.java文件中的第30行声明了一个方法，叫count()，先保存到了文件服务器上；小强在Analysis.java文件中的第50行声明了一个方法，叫sum()，也随后保存到了文件服务器上，于是，count()方法就只存在于小刚的记忆中了
**场景四：追溯问题代码的编写人和编写时间！**
老王是另一位项目经理，每次因为项目进度挨骂之后，他都不知道该扣哪个程序员的工资！就拿这次来说吧，有个Bug调试了30多个小时才知道是因为相关属性没有在应用初始化时赋值！可是二胖、王东、刘流和正经牛都不承认是自己干的！
{% endhideToggle %}

### 版本控制器的方式

**a、集中式版本控制工具**
集中式版本控制工具，版本库是集中存放在中央服务器的，team里每个人work时从中央服务器下载代码，是必须联网才能工作，局域网或互联网。个人修改后然后提交到中央版本库。
举例：SVN和CVS

**b、分布式版本控制工具**
分布式版本控制系统没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样工作的时候，无需要联网了，因为版本库就在你自己的电脑上。多人协作只需要各自的修改推送给对方，就能互相看到对方的修改了。
举例：Git

### SVN

![SVN](2022-12-03-13-40-22.png)

### Git

Git是分布式的,Git不需要有中心服务器，我们每台电脑拥有的东西都是一样的。我们使用Git并且有个中心服务器，仅仅是为了方便交换大家的修改，但是这个服务器的地位和我们每个人的PC是一样的。我们可以把它当做一个开发者的pc就可以就是为了大家代码容易交流不关机用的。没有它大家一样可以工作，只不过“交换”修改不方便而已。

git是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。Git是Linus Torvalds 为了帮助管理 Linux 内核开发而开发的**一个开放源码的版本控制软件**。

同生活中的许多伟大事物一样，Git 诞生于一个极富纷争大举创新的年代。Linux 内核开源项目有着为数众多的参与者。 绝大多数的 Linux 内核维护工作都花在了提交补丁和保存归档的繁琐事务上（1991－2002年间）。 到 2002 年，整个项目组开始启用一个专有的分布式版本控制系统 BitKeeper 来管理和维护代码。

到了 2005 年，开发 BitKeeper 的商业公司同 Linux 内核开源社区的合作关系结束，他们收回了Linux 内核社区免费使用 BitKeeper 的权力。 这就迫使 Linux 开源社区（特别是 Linux 的缔造者Linus Torvalds）基于使用 BitKeeper 时的经验教训，开发出自己的版本系统。 他们对新的系统制订了若干目标：
速度
简单的设计
对非线性开发模式的强力支持（允许成千上万个并行开发的分支）
完全分布式
有能力高效管理类似 Linux 内核一样的超大规模项目（速度和数据量）

![Git](2022-12-03-13-41-40.png)

### Git工作流程图

![Git工作流程图](2022-12-03-13-43-05.png)

命令如下：

1. **clone（克隆）**: 从远程仓库中克隆代码到本地仓库
2. **checkout （检出）**:从本地仓库中检出一个仓库分支然后进行修订
3. **add（添加）**: 在提交前先将代码提交到暂存区
4. **commit（提交）**: 提交到本地仓库。本地仓库中保存修改的各个历史版本
5. **fetch (抓取)** ： 从远程库，抓取到本地仓库，不进行任何的合并动作，一般操作比较少。
6. **pull (拉取)** ： 从远程库拉到本地库，自动进行合并(merge)，然后放到到工作区，相当于`fetch`+`merge`
7. **push（推送）** : 修改完成后，需要和团队成员共享代码时，将代码推送到远程仓库

## Git安装

[下载地址](https://git-scm.com/downloads)
![Git下载](2022-12-03-13-29-53.png)
安装完成后，在电脑桌面（也可以是其他目录）点击右键，如果能够看到如下两个菜单则说明Git安装成功。
![安装成功](2022-12-03-13-38-30.png)

- Git GUI：Git提供的图形界面工具
- Git Bash：Git提供的命令行工具

## Git配置

{% note info modern %}
当安装Git后首先要做的事情是设置用户名称和email地址。这是非常重要的，因为每次Git提交都会使用该用户信息
{% endnote %}

### 基本配置

1. 打开Git Bash
2. 设置用户信息

{% codeblock lang:bash 设置全局【用户名】/【邮箱】配置 %}
git config --global user.name "XXX"
git config --global user.email "XXX"
{% endcodeblock %}

{% codeblock lang:bash 取消全局【用户名】/【邮箱】配置 %}
git config --global --unset user.name
git config --global --unset user.email
{% endcodeblock %}

{% codeblock lang:bash 设置局部【用户名】/【邮箱】配置 %}
git config user.name "XXX"
git config user.email "XXX"
{% endcodeblock %}

{% codeblock lang:bash 查看配置信息 %}
git config --global user.name
git config --global user.email
{% endcodeblock %}

### 为常用指令配置别名（可选）

有些常用的指令参数非常多，每次都要输入好多参数，我们可以使用别名。

1. 打开用户目录，创建`.bashrc`文件
{% codeblock lang:bash 部分windows系统不允许用户创建点号开头的文件可以用命令执行 %}
touch ~/.bashrc
{% endcodeblock %}

2. 在`.bashrc`文件中输入如下内容
{% codeblock lang:bash %}
#用于输出git提交日志
alias git-log='git log --pretty=oneline --all --graph --abbrev-commit'
#用于输出当前目录所有文件及基本信息
alias ll='ls -al'
{% endcodeblock %}

3. 打开gitBash，执行`source ~/.bashrc`
{% codeblock lang:bash %}
source ~/.bashrc
{% endcodeblock %}

## Git使用

### 创建本地仓库

要使用Git对我们的代码进行版本控制，首先需要获得本地仓库

1. 在电脑的任意位置创建一个空目录（例如test）作为我们的本地Git仓库
2. 进入这个目录中，点击右键打开Git bash窗口
3. 执行命令git init
4. 如果创建成功后可在文件夹下看到**隐藏的.git目录**

{% codeblock lang:bash %}
git init
{% endcodeblock %}

![git init](2022-12-03-14-15-23.png)

### 基础操作指令

Git工作目录下对于文件的**修改**(增加、删除、更新)会存在几个状态，这些**修改**的状态会随着我们执行Git的命令而发生变化。

![基础操作指令](2022-12-03-14-17-31.png)

1. git add (工作区 --> 暂存区)
2. git commit (暂存区 --> 本地仓库)

#### 查看修改的状态（status）

- 作用：查看的修改的状态（暂存区、工作区）
- 命令：
{% codeblock lang:bash %}
git status
{% endcodeblock %}

#### 添加工作区到暂存区(add)

- 作用：添加工作区一个或多个文件的修改到暂存区
- 命令：
{% codeblock lang:bash %}
git add 单个文件名|通配符
{% endcodeblock %}
{% codeblock lang:bash 将所有修改加入暂存区 %}
git add .
{% endcodeblock %}

#### 提交暂存区到本地仓库(commit)

- 作用：提交暂存区内容到本地仓库的当前分支
- 命令：
{% codeblock lang:bash %}
git commit -m '注释内容'
{% endcodeblock %}

#### 查看提交日志(log)

{% note info modern %}
如果[配置的别名](#为常用指令配置别名（可选）)`git-log`包含了这些参数，那么后续可以直接使用指令`git-log`
{% endnote %}

- 作用：查看提交记录
- 命令：
{% codeblock lang:bash %}
git log [option]
{% endcodeblock %}
- options
  - --all 显示所有分支
  - --pretty=oneline 将提交信息显示为一行
  - --abbrev-commit 使得输出的commitId更简短
  - --graph 以图的形式显示

#### 版本回退

- 作用：版本切换
- 命令：
{% codeblock lang:bash %}
git reset --hard commitID
#commitID 可以使用`git-log`或`git log`指令查看
{% endcodeblock %}
- 如何查看已经删除的记录？
  - `git reflog`
  - 这个指令可以看到已经删除的提交记录

#### 添加文件至忽略列表

一般我们总会有些文件无需纳入Git 的管理，也不希望它们总出现在未跟踪文件列表。 通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。 在这种情况下，我们可以在工作目录中创建一个名为 `.gitignore` 的文件（文件名称固定），列出要忽略的文件模式。

{% codeblock lang:sh 示例 %}
#no .a files
*.a
#but do track lib.a, even though you're ignoring .a files above
!lib.a
#only ignore the TODO file in the current directory, not subdir/TODO
/TODO
#ignore all files in the build/ directory
build/
#ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt
#ignore all .pdf files in the doc/ directory
doc/**/*.pdf
{% endcodeblock %}

### 分支

几乎所有的版本控制系统都以某种形式支持分支。 使用分支意味着你可以把你的工作从开发主线上分离开来进行重大的Bug修改、开发新的功能，以免影响开发主线。

#### 查看本地分支

{% codeblock lang:bash %}
git branch
{% endcodeblock %}

#### 创建本地分支

{% codeblock lang:bash %}
git branch 分支名
{% endcodeblock %}

#### 切换分支(checkout)

{% codeblock lang:bash %}
git checkout 分支名
{% endcodeblock %}

{% codeblock lang:bash 可以直接切换到一个不存在的分支（创建并切换） %}
git checkout -b 分支名
{% endcodeblock %}

#### 合并分支(merge)

{% codeblock lang:bash %}
git merge 分支名称
{% endcodeblock %}

#### 删除分支

**不能删除当前分支，只能删除其他分支**。

{% codeblock lang:bash %}
git branch -d b1 #删除分支时，需要做各种检查
git branch -D b1 #不做任何检查，强制删除
{% endcodeblock %}

#### 解决冲突

当两个分支上对文件的修改可能会存在冲突，例如同时修改了同一个文件的同一行，这时就需要手动解决冲突，解决冲突步骤如下：

1. 处理文件中冲突的地方
2. 将解决完冲突的文件加入暂存区(add)
3. 提交到仓库(commit)

#### 开发中分支使用原则与流程

几乎所有的版本控制系统都以某种形式支持分支。 使用分支意味着你可以把你的工作从开发主线上分离开来进行重大的Bug修改、开发新的功能，以免影响开发主线。

在开发中，一般有如下分支使用原则与流程：

- master （生产） 分支：线上分支，主分支，中小规模项目作为线上运行的应用对应的分支；
- develop（开发）分支：是从master创建的分支，一般作为开发部门的主要开发分支，如果没有其他并行开发不同期上线要求，都可以在此版本进行开发，阶段开发完成后，需要是合并到master分支，准备上线。
- feature/xxxx分支：从develop创建的分支，一般是同期并行开发，但不同期上线时创建的分支，分支上的研发任务完成后合并到develop分支，之后该分支可以删除。
- hotfix/xxxx分支：从master派生的分支，一般作为线上bug修复使用，修复完成后需要合并到master、test、develop分支。
- 还有一些其他分支，在此不再详述，例如test分支（用于代码测试）、pre分支（预上线分支）等
等。
![开发中分支使用原则与流程](2022-12-03-14-51-08.png)

## Git远程仓库

### 常用的托管服务[远程仓库]

前面我们已经知道了Git中存在两种类型的仓库，即本地仓库和远程仓库。那么我们如何搭建Git远程仓库呢？我们可以借助互联网上提供的一些代码托管服务来实现，其中比较常用的有GitHub、码云、GitLab等。

- GitHub（ 地址：https://github.com/ ）是一个面向开源及私有软件项目的托管平台，因为只支持Git 作为唯一的版本库格式进行托管，故名GitHub
- Gitee（地址： https://gitee.com/ ）是国内的一个代码托管平台，由于服务器在国内，所以相比于 GitHub，码云速度会更快
- GitLab （地址： https://about.gitlab.com/ ）是一个用于仓库管理系统的开源项目，使用Git作为代码管理工具，并在此基础上搭建起来的web服务，一般用于在企业、学校等内部网络搭建git私服。

### gitee

#### 注册gitee

要想使用gitee的相关服务，需要[注册账号](https://gitee.com/signup)
![注册gitee](2022-12-03-16-44-29.png)

#### 创建远程仓库

![创建远程仓库](2022-12-03-16-56-31.png)

#### 配置SSH公钥

![配置SSH公钥](2022-12-03-16-54-46.png)

{% codeblock lang:bash 生成SSH公钥（不断回车） %}
ssh-keygen -t rsa
{% endcodeblock %}

{% codeblock lang:bash 获取公钥 %}
cat ~/.ssh/id_rsa.pub
{% endcodeblock %}

### 操作远程仓库

#### 添加远程仓库

**此操作是先初始化本地库，然后与已创建的远程库进行对接。**

{% codeblock lang:bash %}
git remote add <远端名称> <仓库路径>
{% endcodeblock %}

- 远端名称，默认是**origin**，取决于远端服务器设置
- 仓库路径，从远端服务器获取此URL(一般用SSH的仓库地址)

#### 查看远程仓库

{% codeblock lang:bash %}
git remote -v
{% endcodeblock %}

{% codeblock lang:bash %}
git remote rm name  # 删除远程仓库
git remote rename old_name new_name  # 修改仓库名
{% endcodeblock %}

#### 推送到远程仓库

{% codeblock lang:bash %}
git push [-f] [--set-upstream] [远端名称 [本地分支名][:远端分支名] ]
{% endcodeblock %}

- 如果远程分支名和本地分支名称相同，则可以只写本地分支
  - `git push origin master`
- `-f` 表示强制覆盖
- `--set-upstream` 推送到远端的同时并且建立起和远端分支的关联关系。
  - `git push --set-upstream origin master`
- 如果**当前分支已经和远端分支关联**，则可以省略分支名和远端名。
  - `git push` 将master分支推送到已关联的远端分支。

#### 本地分支与远程分支的关联关系

{% codeblock lang:bash %}
git branch -vv
{% endcodeblock %}

#### 从远程仓库克隆

如果已经有一个远端仓库，我们可以直接clone到本地。

{% codeblock lang:bash %}
git clone <仓库路径> [本地目录]
{% endcodeblock %}

- 本地目录可以省略，会自动生成一个目录

#### 从远程仓库中抓取和拉取

远程分支和本地的分支一样，我们可以进行merge操作，只是需要先把远端仓库里的更新都下载到本地，再进行操作。

抓取命令：

- 抓取指令就是将仓库里的更新都抓取到本地，不会进行合并
- 如果不指定远端名称和分支名，则抓取所有分支。

{% codeblock lang:bash %}
git fetch [remote name] [branch name]
{% endcodeblock %}

拉取命令：

- 拉取指令就是将远端仓库的修改拉到本地并自动进行合并，等同于**fetch+merge**
- 如果不指定远端名称和分支名，则抓取所有并更新当前分支。

{% codeblock lang:bash %}
git pull [remote name] [branch name]
{% endcodeblock %}

#### 解决合并冲突

在一段时间，A、B用户修改了同一个文件，且修改了同一行位置的代码，此时会发生合并冲突。
A用户在本地修改代码后优先推送到远程仓库，此时B用户在本地修订代码，提交到本地仓库后，也需要推送到远程仓库，此时B用户晚于A用户，故**需要先拉取远程仓库的提交，经过合并后才能推送到远端分支**,如下图所示。

![解决合并冲突](2022-12-03-15-19-38.png)

在B用户拉取代码时，因为A、B用户同一段时间修改了同一个文件的相同位置代码，故会发生合并冲突。

**远程分支也是分支，所以合并时冲突的解决方式也和解决本地分支冲突相同相同。**

## 在Idea中使用Git

### 在Idea中配置Git

安装好IntelliJ IDEA后，如果Git安装在默认路径下，那么idea会自动找到git的位置，如果更改了Git的安装位置则需要手动配置下Git的路径。选择`File→Settings`打开设置窗口(快捷键：`Ctrl+Alt+S`)，找到`Version Control`下的git选项：
![设置](2022-12-03-15-30-49.png)
点击Test按钮,现在执行成功，配置完成

### 在Idea中操作Git

场景：本地已经有一个项目，但是并不是git项目，我们需要将这个放到码云的仓库里，和其他开发人员继续一起协作开发。

#### 创建项目的远程仓库

#### 初始化本地仓库

![初始化本地仓库](2022-12-03-15-38-34.png)

选择git仓库目录，默认是当前项目的目录

#### 设置远程仓库

![设置远程仓库](2022-12-03-15-42-12.png)
输入远程仓库地址

#### 提交到本地仓库

![提交到本地仓库](2022-12-03-15-54-12.png)

#### 推送到远程仓库

![推送到远程仓库](2022-12-03-15-55-17.png)

#### 克隆远程仓库到本地

![克隆远程仓库到本地](2022-12-03-15-58-52.png)

#### 创建分支

- 最常规的方式
![最常规的方式](2022-12-03-16-01-52.png)

- 最强大的方式
![最强大的方式](2022-12-03-16-02-09.png)

{% note info modern %}

- 在IDEA的终端中可使用git命令来完成以上所有功能
- 切换分支前先提交本地的修改
- 代码及时提交，提交过了就不会丢
{% endnote %}
