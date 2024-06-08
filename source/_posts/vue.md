---
title: Vue
comments: true
date: 2023-03-01 15:37:51
updated: 2023-05-26
categories: Vue
tags:
    - Vue
    - JavaScript
cover: https://pic.imgdb.cn/item/640095d5f144a01007f48c86.png
top_img: https://pic.imgdb.cn/item/64009746f144a01007f7673e.jpg
---

## Vue官网

[中文官网](https://cn.vuejs.org/)
[英文官网](https://vuejs.org/)
{% note info modern %}
官网有**快速入门教程**，也可查阅**API文档**
{% endnote %}

## Vue简介

### Vue是什么

`Vue `是一套用来动态**构建用户界面**的**渐进式**JavaScript框架

- **构建用户界面**：把数据通过某种办法变成用户界面
- **渐进式**：Vue可以自底向上逐层的应用，简单应用只需要一个轻量小巧的核心库，复杂应用可以引入各式各样的`Vue`插件
{% note info modern %}
后起之秀，生态完善，已然成为前端工程师必备技能
{% endnote %}

### Vue是谁开发的

![尤雨溪](2023-03-01-15-42-43.png)

### Vue的特点

1. 采用**组件化**模式，提高代码复用率、且让代码更好维护
![组件化](2023-03-01-15-44-58.png)
2. **声明式**编码，让编码人员无需直接操作DOM，提高开发效率
![对比](2023-03-01-15-46-27.png)
3. **Diff算法**
![Diff算法](2023-03-01-15-48-19.png)

## 搭建Vue开发环境

1. 引入Vue包
{% codeblock lang:js %}
<script type="text/javascript" src="../js/vue.js"></script>
{% endcodeblock %}
2. 给浏览器安装`Vue Devtools` 插件
3. （可选）阻止vue在启动时生成生产提示
{% codeblock lang:js %}
<script type="text/javascript">
    Vue.config.productionTip = false
</script>
{% endcodeblock %}

## Vue核心

### Vue快速上手——Hello小案例

1. 想让`Vue`工作，就必须创建一个`Vue`实例，且要传入一个配置对象
2. root 容器里的代码依然符合html规范，只不过混入了一些特殊的`Vue`语法
3. root 容器里的代码被称为`Vue`模板
4. `Vue `实例与容器是**一一对应**的
5. 真实开发中只有一个`Vue`实例，并且会配合着组件一起使用
6. `{{xxx}}`中的 xxx 要写 **js表达式**，且 xxx 可以自动读取到data中的所有属性，**注意区分**：js表达式 和 js代码（语句
7. 一旦`data`中的数据发生变化，那么模板中用到该数据的地方也会自动更新

### 模板语法

`Vue`模板语法包括两大类
{% codeblock lang:html %}
<div id="root">
        <h1>插值语法</h1>
        <h3>你好，{% raw %}{{name}}{% endraw %}</h3>
        <hr>
        <h1>指令语法</h1>
        <a v-bind:href="school.url" x="hello">我去{% raw %}{{school.name}}{% endraw %}学习1</a>
        <br>
        <a :href="school.url" x="hello">我去尚硅谷学习2</a>
    </div>
    <script type="text/javascript">
        new Vue({
            el:'#root',
            data:{
                name:'HSQ',
                school:{
                    name:'尚硅谷',
                    url:'http://www.atguigu.com',
                }
            }
        })
    </script>
{% endcodeblock %}

#### 插值语法

功能：用于解析标签体内容
写法：`{{xxx}}`，xxx 是 **js表达式**，可以直接读取到 data 中的所有区域

#### 指令语法 

功能：用于解析标签（包括：标签属性、标签体内容、绑定事件…）
举例：`<a v-bind:href="xxx">`或简写为`<a :href="xxx">`，xxx 同样要写 **js表达式**，可以直接读取到 data 中的所有属性

{% note info modern %}
Vue中有很多的指令，且形式都是`v-xxx`，此处只是拿v-bind举例
{% endnote %}

### 数据绑定

`Vue`中有2种**数据绑定**的方式

单向绑定`v-bind`数据只能从 data 流向页面
双向绑定`v-model`数据不仅能从 data 流向页面，还可以从页面流向 data
{% codeblock lang:html %}
<div  id="root">
        单向数据绑定：<input type="text" :value="name"><br>
        双向数据绑定：<input type="text" v-model="name"> <br>
        //如下代码是错误的，应为v-model只能应用在表单类元素（输入类元素）上
        //<h2 v-model:x="name">你好啊</h2>
</div>
<script type="text/javascript">
    new Vue({
        el:'#root',
        data:{
            name:'尚硅谷'
        },
    })
</script>
{% endcodeblock %}

{% note info modern %}
双向绑定一般都应用在表单类元素上，如 `<input><select><textarea>`等
`v-model:value`可以简写为`v-model`，因为`v-model`默认收集的就是`value`值
{% endnote %}

### el与data的两种写法

#### el两种写法

1. 创建Vue实例对象的时候配置`el`属性
2. 先创建Vue实例，随后再通过`vm.$mount('#root')`指定`el`的值

#### data两种写法

1. 对象式：`data： { }`
2. 函数式：`data() { return { } }`

{% note warning modern %}
目前哪种写法都可以，以后到组件时，data必须使用函数，否则会报错
{% endnote %}

{% note primary modern %}
由`Vue`管理的函数，**一定不要写箭头函数**，否则 this 就不再是`Vue实例`了
{% endnote %}

### MVVM模型

![MVVM](2023-03-01-20-36-26.png)

- M：模型 **Model**，data中的数据
- V：视图 **View**，模板代码
- VM：视图模型 **ViewModel**，Vue实例

`data`中所有的属性，最后都出现在了`vm`身上
`vm`身上所有的属性 及`Vue原型`身上所有的属性，在 `Vue模板`中都可以直接使用

### Vue中的数据代理

### `Object.defineproperty`方法

{% codeblock lang:js %}
let number = 18
let person = {
    name: '张三',
    sex: '男',
}
Object.defineProperty(person, 'age', {
    // value:18,
    // enumerable:true,		// 控制属性是否可以枚举，默认值是false
    // writable:true,			// 控制属性是否可以被修改，默认值是false
    // configurable:true	// 控制属性是否可以被删除，默认值是false
    // 当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
    get() {
        console.log('有人读取age属性了')
        return number
    },
    // 当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
    set(value) {
        console.log('有人修改了age属性，且值是', value)
        number = value
    }
})
// console.log(Object.keys(person))
console.log(person)
{% endcodeblock %}

#### 数据代理

**数据代理**：通过一个对象代理对另一个对象中属性的操作（读/写）
{% codeblock lang:js %}
let obj = { x: 100 }
let obj2 = { y: 200 }
Object.defineProperty(obj2, 'x', {
  get() {
    return obj.x
  },
  set(value) {
    obj.x = value
  }
})
{% endcodeblock %}

#### 数据代理图示

1. Vue中的数据代理通过`vm`对象来代理`data`对象中属性的操作（读/写）
2. Vue中数据代理的好处：更加方便的操作`data`中的数据
3. 基本原理
   1. 通过`object.defineProperty()`把data对象中所有属性添加到vm上
   2. 为每一个添加到`vm`上的属性，都指定一个`getter` `setter`
   3. 在`getter` `setter`内部去操作（读/写）`data`中对应的属性
![数据代理图示](2023-03-01-21-44-15.png)
Vue将`data`中的数据拷贝了一份到`_data`属性中，又将`_data`里面的属性提到**Vue实例**中（如name），通过`defineProperty`实现数据代理，这样通过`geter/setter`操作 name，进而操作`_data`中的 `name`。而`_data`又对`data`进行数据劫持，实现**响应式**。

{% codeblock lang:html %}
<div id="root">
    <h2>学校名称：{% raw %}{{name}}{% endraw %}</h2>
    <h2>学校地址：{% raw %}{{address}}{% endraw %}</h2>
</div>
<script type="text/javascript">
    Vue.config.productionTip = false
    const vm = new Vue({
    el: '#root',
    data: {
        name: '江西财经大学大学',
        address: '南昌'
    }
})
</script>
{% endcodeblock %}

### 事件处理

#### 事件的基本用法

1. 使用`v-on:xxx`或`@xxx`绑定事件，其中 xxx 是事件名
2. 事件的回调需要配置在`methods`对象中，最终会在`vm`上
3. `methods`中配置的函数，**不要用箭头函数**，否则`this`就不是`vm`了
4. `methods`中配置的函数，都是被`Vue`所管理的函数，`this` 的指向是**vm**或**组件实例对象**
5. `@click="demo"`和`@click="demo($event)`"效果一致，但后者可以传参

{% codeblock lang:html %}
<div id="root">
    <h2>欢迎来看 {% raw %}{{name}}{% endraw %} 的笔记</h2>
    <!-- <button v-on:click="showInfo">点我提示信息</button> -->
    <button @click="showInfo1">点我提示信息1（不传参）</button>
    <button @click="showInfo2($event,66)">点我提示信息2（传参）</button>
</div>
{% endcodeblock %}

{% codeblock lang:js %}
const vm = new Vue({
    el: '#root',
    data: {
        name: 'HSQ',
    },
    methods: {
        showInfo1(event) {
        console.log(event.target.innerText)
        // console.log(this) // 此处的this是vm
        alert('同学你好！')
        },
        showInfo2(event, number) {
        console.log(event, number)
        console.log(event.target.innerText)
        // console.log(this) // 此处的this是vm
        alert('同学你好！！')
        }
    }
})
{% endcodeblock %}

#### 事件修饰符

{% codeblock lang:html %}
<style>
   * {margin-top: 20px;}
   .demo1 {height: 50px;background-color: skyblue;}
   .box1 {padding: 5px;background-color: skyblue;}
   .box2 {padding: 5px;background-color: white;}
   .list {width: 200px;height: 200px;background-color: skyblue;overflow: auto;}
   li {height: 100px;}
</style>
{% endcodeblock %}

{% codeblock lang:js %}
new Vue({
    el: '#root',
    data: {
        name: '尚硅谷'
    },
    methods: {
        showInfo(e) {
            alert('同学你好！')
            // console.log(e.target)
        },
        showMsg(msg) {
            console.log(msg)
        },
        demo() {
            for (let i = 0; i < 100000; i++) {
                console.log('#')
            }
            console.log('累坏了')
        }
    }
})
{% endcodeblock %}

{% tabs things %}
<!-- tab <b>prevent</b> -->
`prevent`用于阻止默认事件（常用）
{% codeblock lang:html %}
<h2>欢迎来到 {% raw %}{{name}}{% endraw %} 学习</h2>  
<a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息</a>
{% endcodeblock %}
<!-- endtab -->

<!-- tab <b>stop</b> -->
`stop`用于阻止事件冒泡（常用）
{% codeblock lang:html %}
<div class="demo1" @click="showInfo">
    <button @click.stop="showInfo">点我提示信息</button>
</div>
{% endcodeblock %}
<!-- endtab -->

<!-- tab <b>once</b> -->
`once`表示事件只触发一次（常用）
{% codeblock lang:html %}
button @click.once="showInfo">点我提示信息</button>
{% endcodeblock %}
<!-- endtab -->

<!-- tab capture -->
`capture`使用事件的捕获模式
{% codeblock lang:html %}
 <div class="box1" @click.capture="showMsg(1)">
    div1
    <div class="box2" @click="showMsg(2)">
        div2
    </div>
</div>
{% endcodeblock %}
<!-- endtab -->

<!-- tab self -->
`self`表示只有event.target是当前操作的元素时才触发事件
{% codeblock lang:html %}
<div class="demo1" @click.self="showInfo">
    <button @click="showInfo">点我提示信息</button>
</div>
{% endcodeblock %}
<!-- endtab -->

<!-- tab passive -->
`passive`表示事件的默认行为立即执行，无需等待事件回调执行完毕；
并不是所有事件使用`passive`都有效
**scroll**是滚动条滚动，`passsive`没有影响（加不加没区别）
**wheel**是鼠标滚轮滚动，使用`passive`有影响，使用滚动条会立即执行滚动操作
{% codeblock lang:html %}
<ul @wheel.passive="demo" class="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

修饰符可以连续写，比如可以这么用：`@click.prevent.stop="showInfo"`

### 键盘事件

键盘上的每个按键都有自己的名称和编码，例如：`Enter（13）`。而Vue还对一些常用按键起了别名方便使用

1. 