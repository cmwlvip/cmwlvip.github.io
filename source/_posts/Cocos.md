---
title: Cocos
date: 2022-12-03 22:46:46
updated: 2023-01-08
description: cocos游戏开发
categories: cocos
tags:
    - cocos
keywords:
    - cocos
cover: /2022/12/03/Cocos/cocos.jpg
top_img: https://pic.imgdb.cn/item/638b68b716f2c2beb14d07d1.jpg
---

{% note info modern %}
这里使用的是2.4.9版本,使用的脚本语言为TS
{% endnote %}

## 使用Cocos Creator

### 新建脚本模板

下载好Cocos Creator新建脚本如下
![NewScript](2022-12-03-23-55-15.png)

如若想更改，可修改`CocosDashboard_1.2.2(Cocos Creator安装路径下)\resources\.editors\Creator\2.4.9\resources\static\template\new-script.ts`

```ts
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    //@property

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
```

### Cocos项目

```plaintext Cocos项目常用目录结构
——assets
    ——audio
    ——prefab
    ——scene
    ——script
    ——texture
```

### 关于(TS下)Cocos使用

#### 报错：无法重新声明块范围变量

`let`声明过的变量无法再用`let`或`var`重新声明，全用`var`不会报错
![无法再用`let`重新声明](2022-12-04-20-04-26.png)
![无法再用`let`重新声明](2022-12-04-20-06-14.png)
![全用`var`不会报错](2022-12-04-20-07-56.png)

#### 二维数组使用中错误

ERROR: Uncaught TypeError: Cannot set property '0' of undefined,

**错误**使用

```ts
for(let i=0;i<18;i++){
    for(let j=0;j<18;j++){
        this.arr[i][j]=0
    }
}
```

{% hideBlock 正确使用 %}
{% codeblock lang:ts %}
for(let i=0;i<18;i++){
    this.arr[i]=[]
    for(let j=0;j<18;j++){
        this.arr[i][j]=0
    }
}
{% endcodeblock %}
{% endhideBlock %}

## Cocos脚本开发

### TS补充

#### 取整

```ts
//向上取整数(小数舍去,正数部分+1)
cc.log(Math.ceil(1.111));//=2
cc.log(Math.ceil(1.6666));//=2
//向下取整数(小数直接舍去)
cc.log(Math.floor(1.111));//=1
cc.log(Math.floor(1.666));//=1
//四舍五入
cc.log(Math.round(1.111));//1
cc.log(Math.round(1.666));//2
//保留小数
cc.log(1.1111.toFixed());//1
cc.log(1.1111.toFixed(2));//1.11
cc.log(1.1111.toFixed(3));//1.111
```

#### 绝对值

{% note info modern %}
**(method) Math.abs(x: number): number**
{% endnote %}

#### 回调

{% note info modern %}
**(method) cc.Component.schedule(callback: Function, interval?: number, repeat?: number, delay?: number): void**
!#en Schedules a custom selector. If the selector is already scheduled, then the interval parameter will be updated without scheduling it again. !#zh 调度一个自定义的回调函数。 如果回调函数已调度，那么将不会重复调度它，只会更新时间间隔参数。
@param callback — The callback function
@param interval — Tick interval in seconds. 0 means tick every frame.
@param repeat — The selector will be executed (repeat + 1) times, you can use cc.macro.REPEAT_FOREVER for tick infinitely.
@param delay — The amount of time that the first tick will wait before execution. Unit: s
{% endnote %}

```ts
let timeCallback = function (dt) {
    cc.log("time: " + dt);
}
this.schedule(timeCallback, 1);
```

{% note info modern %}
**(method) cc.Component.scheduleOnce(callback: Function, delay?: number): void**
!#en Schedules a callback function that runs only once, with a delay of 0 or larger. !#zh 调度一个只运行一次的回调函数，可以指定 0 让回调函数在下一帧立即执行或者在一定的延时之后执行。
@param callback — A function wrapped as a selector
@param delay — The amount of time that the first tick will wait before execution. Unit: s
{% endnote %}

```ts
let timeCallback = function (dt) {
  cc.log("time: " + dt);
}
this.scheduleOnce(timeCallback, 2);
```

{% note info modern %}
**(method) cc.Component.unscheduleAllCallbacks(): void**
!#en unschedule all scheduled callback functions: custom callback functions, and the 'update' callback function. Actions are not affected by this method. !#zh 取消调度所有已调度的回调函数：定制的回调函数以及 update 回调函数。动作不受此方法影响。
{% endnote %}

```ts
this.unscheduleAllCallbacks();
```

#### setTimeout()

{% note info modern %}
**function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number**
{% endnote %}

```ts
setTimeout(function () {
        tip.destroy()
        }.bind(this), 500)
```

### 常用代码块(代码组件化)

#### 随机颜色

```ts
randomColor(){
    let red=Math.random()*255
    let green =Math.random()*255
    let blue =Math.random()*255
    let color=cc.color(red,green,blue)
    this.node.color=color
}
```

### 挂载资源

`@property()`

```ts 示例
//用于number型变量
@property(cc.Integer)
num:number=0;
//字符串
@property(cc.String)
text: string = 'hello';
//Boolean
@property(cc.Boolean)
isTrue:boolean=false;
//图片数组
@property(cc.SpriteFrame)
picArr:cc.SpriteFrame[]=[];
```

#### 挂载Cocos类

有两种写法，效果是一样的

{% tabs property,2 %}
<!-- tab 直接写在&#64;property() -->
{% codeblock lang:ts %}
    @property({
        type:cc.Class({
            name:"pic_List",
            properties:{
                a:{
                    default:null,
                    type:cc.SpriteFrame
                },
                b:{
                    default:null,
                    type:cc.SpriteFrame
                },
                c:{
                    default:null,
                    type:cc.SpriteFrame
                },
            },
        }),
        displayName:"图片数组"
    })
    pic_List=null;
{% endcodeblock %}
<!-- endtab -->

<!-- tab const法 -->
{% codeblock lang:ts %}
const picArr=cc.Class({
    name:"pic_List",
    properties:{
        a:{
            default:null,
            type:cc.SpriteFrame
        },
        b:{
            default:null,
            type:cc.SpriteFrame
        },
        c:{
            default:null,
            type:cc.SpriteFrame
        },
    },
});
    @property({
        type:picArr,
        displayName:"图片数组"
    })
    pic_List=null;
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

### 组件

#### 获取组件

{% note info modern %}
**(method) cc._BaseNode.getComponent&lt;cc.Component&gt;(type: {
    prototype: cc.Component;
}): cc.Component (+1 overload)**
!#en Returns the component of supplied type if the node has one attached, null if it doesn't. You can also get component in the node by passing in the name of the script. !#zh 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。 传入参数也可以是脚本的名称。
@param typeOrClassName — typeOrClassName
{% endnote %}

```ts
// get sprite component
let sprite = this.node.getComponent(cc.Sprite);
// get custom test class
let test = this.node.getComponent("Test");
```

### 预制体

克隆指定的任意类型的对象，或者从 Prefab 实例化出新节点

```ts
@property(cc.Prefab)
prefabAsset:cc.Prefab=null;
onLoad () {
    // instantiate node from prefab
    let scene:cc.Scene=cc.director.getScene();
    let node:cc.Node=cc.instantiate(this.prefabAsset);
    node.parent = scene;
}
```

```ts
@property(cc.Node)
targetNode:cc.Node=null;
onLoad () {
    // clone node
    let scene = cc.director.getScene();
    let node = cc.instantiate(this.targetNode);
    node.parent = scene;
    node.setPosition(0,0);
}
```

### 场景

#### 切换场景

```ts
cc.director.loadScene("game")
```

### 节点(cc.Node)

#### 新结点

```ts
let bullet:cc.Node=new cc.Node()
```

#### 寻找节点

`cc.find()`
{% note info modern %}
**function cc.find(path: string, referenceNode?: cc.Node): cc.Node**
Finds a node by hierarchy path, the path is case-sensitive. It will traverse the hierarchy by splitting the path using '/' character. This function will still returns the node even if it is inactive. It is recommended to not use this function every frame instead cache the result at startup.
@param path — path
@param referenceNode — referenceNode
{% endnote %}

```ts
cc.find("Canvas/startButton/Background/start").getComponent(cc.Label).string="重新开始"
```

`getChildByName("name")`

```ts
this.node.getChildByName("Background").getChildByName("start").getComponent(cc.Label).string="重新开始"
```

#### 节点层次

拥有更高 `zIndex` 的节点将被排在后面

```ts
this.playagain = cc.find("main/start", this.node);
this.playagain.zIndex = 100;//拥有更高 zIndex 的节点将被排在后面
this.playagain.active = false;
```

### 坐标与距离

#### 全局坐标转相对坐标

{% note info modern %}
**(method) cc.Node.convertToNodeSpaceAR&lt;cc.Vec2&gt;(worldPoint: cc.Vec2, out?: cc.Vec2): cc.Vec2**
!#en Converts a Point to node (local) space coordinates. !#zh 将一个点转换到节点 (局部) 空间坐标系。
@param worldPoint — worldPoint
@param out — out
{% endnote %}

```ts
let temp_position=this.node.convertToNodeSpaceAR(Point)
```

#### 向量减法

{% note info modern %}
**(method) cc.Vec2.sub(vector: cc.Vec2, out?: cc.Vec2): cc.Vec2**
!#en Subtracts one vector from this, and returns the new result. !#zh 向量减法，并返回新结果。
@param vector — vector
@param out — optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
{% endnote %}

```ts
let v :cc.Vec2= cc.v2(10, 10);
v.sub(cc.v2(5, 5));      // return Vec2 {x: 5, y: 5};
let v1 = new cc.Vec2();
v.sub(cc.v2(5, 5), v1);  // return Vec2 {x: 5, y: 5};结果放于v1
```

#### 向量长度

{% note info modern %}
**(method) cc.Vec2.mag(): number**
!#en Returns the length of this vector. !#zh 返回该向量的长度。
{% endnote %}

```ts
var v = cc.v2(10, 10);
v.mag(); // return 14.142135623730951;
```

### 鼠标事件

可以使用枚举类型也可以直接使用事件名来注册事件的监听器

| 枚举对象定义 | 对应的事件名 | 事件触发的时机 |
| ----------- |  ----------- | ------------ |
| cc.Node.EventType.MOUSE_DOWN | `mousedown` | 当鼠标在目标节点区域按下时触发一次 |
| cc.Node.EventType.MOUSE_ENTER | `mouseenter` | 当鼠标移入目标节点区域时，不论是否按下 |
| cc.Node.EventType.MOUSE_MOVE | `mousemove` | 当鼠标在目标节点区域中移动时，不论是否按下 |
| cc.Node.EventType.MOUSE_LEAVE | `mouseleave` | 当鼠标移出目标节点区域时，不论是否按下 |
| cc.Node.EventType.MOUSE_UP | `mouseup` | 当鼠标从按下状态松开时触发一次 |
| cc.Node.EventType.MOUSE_WHEEL	 | `mousewheel` | 当鼠标滚轮滚动时 |

```ts 注册事件示例
this.node.on('mousedown',this.playGame,this)
playGame(event){
    console.log('Mouse down')
}
```

常用API

| 函数名 | 返回值类型 | 意义 |
| ------ |  --------- | ----- |
| `getScrollY` | Number | 获取滚轮滚动的 Y 轴距离，只有**滚动时才有效** |
| `getLocation` | Object | 获取鼠标位置对象，对象包含 x 和 y 属性 |
| `getPreviousLocation` | Object | 获取鼠标事件上次触发时的位置对象，对象包含 x 和 y 属性 |
| `getDelta` | Object | 获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性 |

### 触摸事件

| 枚举对象定义 | 对应的事件名 | 事件触发的时机 |
| ----------- |  ----------- | ------------ |
| cc.Node.EventType.TOUCH_START | `touchstart`| 当手指触点落在目标节点区域内时 |
| cc.Node.EventType.TOUCH_MOVE | `touchmove`| 当手指在屏幕上移动时 |
| cc.Node.EventType.TOUCH_END | `touchend`| 当手指在目标节点区域内离开屏幕时 |
| cc.Node.EventType.TOUCH_CANCEL | `touchcancel	`| 当手指在目标节点区域外离开屏幕时|

```ts 示例
this.node.on('touchstart',this.playGame,this)
playGame(event){
    console.log('touch start')
}
```

常用API

| 函数名 | 返回值类型 | 意义 |
| ------ |  --------- | ----- |
| `touch` | cc.Touch | 与当前事件关联的触点对象 |
| `getID` | Number | 获取触点的 ID，用于多点触摸的逻辑判断 |
| `getLocation` | Object | 获取触点位置对象，对象包含 x 和 y 属性 |
| `getPreviousLocation` | Object | 获取触点上一次触发事件时的位置对象，对象包含 x 和 y 属性 |
| `getStartLocation` | Object | 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性 |
| `getDelta` | Object | 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性 |

### 声音

#### 挂载资源法使用声音(cc.AudioClip)

{% note info modern %}
**method) cc.audioEngine.playEffect(clip: cc.AudioClip, loop: boolean): number**
!#en Play effect audio. !#zh 播放音效
@param clip — The audio clip to play.
@param loop — Whether the music loop or not.
{% endnote %}

```ts
@property(cc.AudioClip)
private bgmAudio:cc.AudioClip=null
cc.audioEngine.playEffect(this.bgmAudio, false)
```

#### 组件(cc.AudioSource)法使用声音

节点下需要有这个组件

```ts
this.node.getComponent(cc.AudioSource).play()
```

## 碰撞系统

### 碰撞系统接口

获取碰撞检测系统

```ts
let manager = cc.director.getCollisionManager()
```

默认碰撞检测系统是禁用的

```ts 开启默认碰撞检测系统
manager.enabled = true
```

默认碰撞检测系统的 `debug` 绘制是禁用的

```ts 开启碰撞系统绘制
manager.enabledDebugDraw = true
```

```ts 显示碰撞组件的包围盒
manager.enabledDrawBoundingBox = true
```

### 碰撞组件

碰撞组件有三种

#### 矩形碰撞组件(cc.BoxCollider)

#### 圆形碰撞组件(cc.CircleCollider)

#### 多边形碰撞组件(cc.PolygonCollider)

### 碰撞系统回调

当碰撞系统检测到有碰撞产生时，将会以回调的方式通知使用者，如果产生碰撞的碰撞组件依附的节点下挂的脚本中有实现以下函数，则会自动调用以下函数，并传入相关的参数。
{% note info modern %}
@param  {Collider} other 产生碰撞的另一个碰撞组件
@param  {Collider} self  产生碰撞的自身的碰撞组件
{% endnote %}

{% note warning modern %}
碰撞脚本一定要挂载在有碰撞组件的节点上
{% endnote %}

#### 碰撞产生的时候调用

```ts
onCollisionEnter(other, self) {
    console.log('on collision enter')
}
```

#### 碰撞中调用

当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用

```ts
onCollisionStay(other, self) {
    console.log('on collision stay')
}
```

#### 碰撞结束后调用

```ts
onCollisionExit(other, self) {
    console.log('on collision exit')
}
```

## 角色移动

由于移动中，经常涉及到重复播放动画的问题，直接写在事件函数里，往往出现各种问题
所以，实现移动一般使用**状态监听法**(比如按下A键开启左移状态)

### 键盘事件控制移动

```ts
onKeyDown (event:cc.Event.EventKeyboard) {
    switch(event.keyCode) {
        case cc.macro.KEY.a:
            this.Left = true
            break
        case cc.macro.KEY.d:
            this.Right = true
            break
    }
}
onKeyUp (event) {
    switch(event.keyCode) {
        case cc.macro.KEY.a:
            this.Left = false
            break
        case cc.macro.KEY.d:
            this.Right = false
            break
    }
}
onLoad() {
    this.Left = false
    this.Right = false
    this.xSpeed = 0
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
}
onDestroy(){
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
}
```

### 加速度式移动

```ts
    update(dt) {
         // 根据当前加速度方向每帧更新速度
        if (this.Left) {
            this.xSpeed -= this.accel * dt
        }
        else if (this.Right) {
            this.xSpeed += this.accel * dt
        }
        // 限制角色的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed)
        }
        //位置处理
        if(this.node.x<-880){
            //this.xSpeed=-this.xSpeed
            this.xSpeed=20;
        }
        else if(this.node.x>880){
            this.xSpeed=-20;
        }
        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt
    }
```

### 触摸移动

```ts
move(event){
    let offset = event.getDelta();
    this.player.x += offset.x;
    //边界处理
    if(this.player.x<-450){
        this.player.x=-445
    }else if(this.player.x>450){
        this.player.x=445
    }  
}
onLoad () {
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.move,this)
}
```

## Cocos Project

### 摘星星(PickStars)

#### PickStars

[游戏预览](https://cmwlvip.github.io/game/PickStars/index.html)

{% codeblock lang:plaintext %}
——Canvas
    ——background
    ——Main Camera
    ——ground
    ——Player
    ——score
{% endcodeblock %}

{% tabs PickStars %}
<!-- tab Game.ts -->
{% codeblock lang:ts 用于挂载在Canvas节点下控制游戏的进行 %}
import  {Global}  from "./Start";
const {ccclass, property} = cc._decorator;
@ccclass
export default class Game extends cc.Component {
    //分数显示
    @property(cc.Label)
    scoreDisplay: cc.Label = null;
    // 这个属性引用了星星预制资源
    @property(cc.Prefab)
    private starPrefab:cc.Prefab=null;
    // 星星产生后消失时间的随机范围
    @property(cc.Integer)
    private maxStarDuration:number=0;
    @property(cc.Integer)
    private minStarDuration:number=0;
    // 地面节点，用于确定星星生成的高度
    @property(cc.Node)
    private groundNode:cc.Node=null;
    // Player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    @property(cc.Node)
    public playerNode:cc.Node=null;
    // 得分音效资源
    @property(cc.AudioClip)
    private scoreAudio:cc.AudioClip=null;
    //地面节点的Y坐标
    private groundY:number;
    //得分
    private score=0;
    //计时器
    timer: number;
    //星星消失时间
    starDuration: number;
    spawnNewStar() {
        // 使用给定的模板在场景中生成一个新节点
        let newStar:cc.Node = cc.instantiate(this.starPrefab)
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar)
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition())
        // 在星星脚本组件上保存 Game 对象的引用
        newStar.getComponent('Star').game = this
        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration)
        this.timer = 0
    }
    getNewStarPosition() {
        let randX:number= 0
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        let randY = this.groundY + Math.random() * this.playerNode.getComponent('Player').jumpHeight + 70
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        let maxX = 888
        randX = (Math.random() - 0.5) * 2 * maxX
        // 返回星星坐标
        return cc.v2(randX, randY)
    }
    gainScore() {
        this.score += 1
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false)
    }
    gameOver() {
        // 停止 Player 节点的跳跃动作
        this.playerNode.stopAllActions()
        // let sence=cc.director.getScene()
        // cc.log(sence)
        // 重新加载场景 play
        this.node.destroy()
        cc.director.loadScene('play')
        Global.isRestart=true
    }
    touchStart(event){
        let x:number=event.getLocationX()
        if(x<=960){
            this.playerNode.getComponent("Player").accLeft=true
        }
        else{
            this.playerNode.getComponent("Player").accRight=true
        }
    }
    touchEnd(){
        this.playerNode.getComponent("Player").accLeft=false
        this.playerNode.getComponent("Player").accRight=false
    }
    onLoad () {
        this.node.on("touchstart",this.touchStart,this)
        this.node.on("touchend",this.touchEnd,this)
        cc.macro.ENABLE_MULTI_TOUCH = false
        this.score = 0
        // 初始化计时器
        this.timer = 0
        this.starDuration = 0
        // 获取地平面的 y 轴坐标
        this.groundY = this.groundNode.y + this.groundNode.height/2
        // 生成一个新的星星
        this.spawnNewStar()
    }
    start () {
    }
    update (dt) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver()
            return
        }
        this.timer += dt
    }
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab Star.ts -->
这里使用了其他脚本的函数

{% codeblock lang:ts 挂载于星星预制体 %}
import Game from"./Game"
const {ccclass, property} = cc._decorator;
@ccclass
export default class Star extends cc.Component {
    //收集距离
    @property(cc.Integer)
    private pickRadius:number=0;
    private game:Game=null;
    public init(game:Game){
        this.game=game
    }
    getPlayerDistance() {
        // 根据 Player 节点位置判断距离
        let playerPos = this.game.playerNode.getPosition()
        // 根据两点位置计算两点之间距离
        let dist = this.node.getPosition().sub(playerPos).mag()
        return dist
    }
    onPicked() {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar()
        // 调用 Game 脚本的得分方法
        this.game.gainScore()
        // 然后销毁当前星星节点
        this.node.destroy()
    }
    onLoad () {}
    start () {
    }
    update (dt) {
         // 每帧判断星星和主角之间的距离是否小于收集距离
         if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked()
            return
        }
        // 根据 Game 脚本中的计时器更新星星的透明度
        let opacityRatio = 1 - this.game.timer/this.game.starDuration;
        let minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity))
    }
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab Player.ts -->
{% codeblock lang:ts 用于实现角色控制 %}
const {ccclass, property} = cc._decorator;
@ccclass
export default class Player extends cc.Component {
     // 主角跳跃高度
     @property(cc.Integer)
     private jumpHeight:number=0;
     // 主角跳跃持续时间
     @property(cc.Integer)
     private jumpDuration:number=0;
     // 最大移动速度
     @property(cc.Integer)
     private maxMoveSpeed:number= 0;
     // 加速度
     @property(cc.Integer)
     private accel:number= 0;
     @property(cc.AudioClip)
     private jumpAudio:cc.AudioClip=null;
     //速度
     private xSpeed:number=0;
     private accLeft:boolean=false;
     private accRight:boolean=false;
     private setJumpAction(){
        // 跳跃上升
        let jumpUp = cc.tween().by(this.jumpDuration, {y: this.jumpHeight}, {easing: 'sineOut'})
        // 下落
        let jumpDown = cc.tween().by(this.jumpDuration, {y: -this.jumpHeight}, {easing: 'sineIn'})
        // 创建一个缓动，按 jumpUp、jumpDown 的顺序执行动作
        let tween = cc.tween()
        .sequence(jumpUp, jumpDown)
        // 添加一个回调函数，在前面的动作都结束时调用我们定义的 playJumpSound() 方法
        .call(this.playJumpSound, this)
        // 不断重复
        return cc.tween().repeatForever(tween)
    }
    onKeyDown (event:cc.Event.EventKeyboard) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true
                break
            case cc.macro.KEY.d:
                this.accRight = true
                break
        }
    }
    onKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false
                break
            case cc.macro.KEY.d:
                this.accRight = false
                break
        }
    }
    playJumpSound() {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    }
    onLoad() {
        let jumpAction = this.setJumpAction()
        cc.tween(this.node).then(jumpAction).start()
        // 加速度方向开关
        this.accLeft = false
        this.accRight = false
        // 主角当前水平方向速度
        this.xSpeed = 0
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }
    start () {}
    update(dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt
        }
        else if (this.accRight) {
            this.xSpeed += this.accel * dt
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed)
        }
        if(this.node.x<-880){
            //this.xSpeed=-this.xSpeed
            this.xSpeed=20
        }
        else if(this.node.x>880){
            this.xSpeed=-20
        }
        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt
    }
    onDestroy(){
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab Start.ts -->
{% codeblock lang:ts 用于实现菜单控制及管理全局变量 %}
const {ccclass, property} = cc._decorator;
export class Global{
    static isRestart:boolean=false;
}
@ccclass
export  class Start extends cc.Component {
    playGame(){
        this.node.parent.destroy()  
        cc.director.loadScene("game")
    }
    onLoad () {
        if(Global.isRestart){
            //cc.find("Canvas/startButton/Background/start").getComponent(cc.Label).string="重新开始"
            this.node.getChildByName("Background").getChildByName("start").getComponent(cc.Label).string="重新开始"
        }
        // this.node.on('mousedown',this.playGame,this)
        this.node.on("touchstart",this.playGame,this)
    }
    start () {
    }
    // update (dt) {}
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

### 五子棋(GoBang)

#### GoBang

[游戏预览](https://cmwlvip.github.io/game/GoBang/index.html)
{% codeblock lang:plaintext %}
——Canvas
    ——Main Camera
    ——chess(Anchor:(0,0))
    ——btn_start
        ——title
{% endcodeblock %}

{% hideToggle display %}
{% codeblock lang:ts 挂载于棋盘节点 %}
const {ccclass, property} = cc._decorator;
@ccclass
export default class ChessBoard extends cc.Component {
    //使用棋子预制体
    @property(cc.Prefab)
    private chessPrefab_black:cc.Prefab=null
    @property(cc.Prefab)
    private chessPrefab_white:cc.Prefab=null
    //重新开始图片
    @property(cc.SpriteFrame)
    private restart:cc.SpriteFrame=null
    //游戏结算面板
    @property(cc.Prefab)
    private start_board:cc.Prefab=null
    //边界落子提示面板
    @property(cc.Prefab)
    private Tip_board:cc.Prefab=null
    //开始节点
    private startGame:cc.Node=null
    //用于计数
    private num:number=0;
    //保存实例化之后的，不是0的值，0表示没有棋子，1黑棋，2白棋
    private _board=[]
    //戏是否进行游
    private isPlayGame:boolean=false
    //是否重新开始
    private isRestart:boolean=false
    //有18根线，设置21用于处理边界问题
    initBoard(){
        for(let i=0;i<18;i++){
            this._board[i]=[]
            for(let j=0;j<18;j++){
                this._board[i][j]=0
            }
        }   
    }
    playGame(){
        if(this.isRestart){
            cc.director.loadScene("game")
        }
        else{
            this.startGame.active=false
            this.isPlayGame=true
        }
    }
    restartGame(){
        this.startGame.active=true
        this.startGame.getComponent(cc.Sprite).spriteFrame=this.restart
        this.startGame.removeAllChildren();
        this.startGame.scale=0.5
        this.startGame.opacity=200
        this.isRestart=true
    }
    //是否可以下
    isPlayChess(i:number,j:number){
        if(this._board[i][j]!=0){
            cc.log("此处已有棋子")
            return false
        }
        // 边界不落子提示
        if(i==0 || j==0 || i==17 || j==17){
            let tip:cc.Node = cc.instantiate(this.Tip_board)
            this.node.addChild(tip)
            tip.setPosition(cc.v2(425,500))
            setTimeout(function () {
                tip.destroy()
              }.bind(this), 500)
              return false
        }  
        return true
    }
    setNewChess(event){
        cc.log(this.isPlayGame)
        if(!this.isPlayGame){
            return
        }
        let startPoint:cc.Vec2 = event.getLocation()
        //转换后的坐标，局部坐标
        let temp_position=this.node.convertToNodeSpaceAR(startPoint)
        let x=Math.round(temp_position.x/50)
        let y=Math.round(temp_position.y/50)
        //确保棋子下在线上
        let position:cc.Vec2=cc.v2(x*50,y*50)  
        //记录转换坐标（索引）整体加一解决数组越界问题
        //现在边界不落子就不用处理越界，如左下角[0][0]是不下棋的，flag===0
        let myPos=cc.v2(x,y)
        if(this.num%2==0 && this.isPlayChess(myPos.x,myPos.y)){
            let newChess_black:cc.Node = cc.instantiate(this.chessPrefab_black)
            this.node.addChild(newChess_black)
            newChess_black.setPosition(position)  
            this._board[myPos.x][myPos.y]=1
            if(this.judge(1,myPos)){
                cc.log("黑胜")
                let newGame:cc.Node = cc.instantiate(this.start_board)
                this.node.addChild(newGame)
                newGame.children[1].color=cc.Color.BLACK
                //设置面板位置
                newGame.setPosition(cc.v2(425,325))
                this.restartGame()
            }
            this.num+=1
            return
        }
        if(this.num%2==1 && this.isPlayChess(myPos.x,myPos.y)){
            let newChess_white:cc.Node = cc.instantiate(this.chessPrefab_white)
            this.node.addChild(newChess_white)
            newChess_white.setPosition(position)
            this._board[myPos.x][myPos.y]=2
            if(this.judge(2,myPos)){
                cc.log("白胜")
                let newGame:cc.Node = cc.instantiate(this.start_board)
                newGame.children[1].getComponent(cc.Label).string="白棋"
                this.node.addChild(newGame)
                newGame.setPosition(cc.v2(425,325))
                this.restartGame()
            }
            this.num+=1
            return
        }
    }
    //判断函数，用于判读输赢
    judge(flag:number,myPos:cc.Vec2){
        if(this.judge_row(flag,myPos) || this.judge_list(flag,myPos) || this.judge_left(flag,myPos) || this.judge_right(flag,myPos)){
            this.isPlayGame=false
            return true
        }
        return false
    }
     //判断横向
    judge_row(flag:number,myPos:cc.Vec2){
        //用于计数
        let count=0
        let i=1
        //右界已处理
        while(this._board[myPos.x+i][myPos.y]==flag){
            count+=1
            i+=1
        }
        i=1
        while(this._board[myPos.x-i][myPos.y]==flag){
            count+=1
            i+=1
        }
        if(count<4){
            return false
        }
        return true
    }
    //判断纵向
    judge_list(flag:number,myPos:cc.Vec2){
        //用于计数
        let count=0
        let i=1
        //上界已处理
        while(this._board[myPos.x][myPos.y+i]==flag){
            count+=1
            i+=1
        }
        i=1
        while(this._board[myPos.x][myPos.y-i]==flag){
            count+=1
            i+=1
        }
        if(count<4){
            return false
        }
        return true
    }
    //[0][0] [1][1] [2][2]
    judge_left(flag:number,myPos:cc.Vec2){
        //用于计数
        let count=0
        let i=1
        //右上脚已经处理
        while(this._board[myPos.x+i][myPos.y+i]==flag){
            count+=1
            i+=1
        }
        i=1
        while(this._board[myPos.x-i][myPos.y-i]==flag){
            count+=1
            i+=1
        }
        if(count<4){
            return false
        }
        return true
    }
    judge_right(flag:number,myPos:cc.Vec2){
        //用于计数
        let count=0
        let i=1
        while(this._board[myPos.x-i][myPos.y+i]==flag){
            count+=1
            i+=1
        } 
        i=1
        while(this._board[myPos.x+i][myPos.y-i]==flag){
            count+=1
            i+=1
        }
        if(count<4){
            return false
        }
        return true
    }
    onLoad () {
        this.startGame=cc.find("Canvas/btn_start")
        // this.node.on('mousedown',this.setNewChess,this)
        this.node.on("touchstart",this.setNewChess, this)
    }
    start () {
        this.initBoard()
    }
    // update (dt) {}
}
{% endcodeblock %}
{% endhideToggle %}

### 简易消消乐(Xiaoxiaole)

#### Xiaoxiaole

[游戏预览](https://cmwlvip.github.io/game/Xiaoxiaole/index.html)
{% codeblock lang:plaintext %}
——Canvas
    ——Main Camera
    ——bg(Anchor:(0,0))
{% endcodeblock %}

#### Xiaoxiaole思路

就是一个递归的思想在里面

#### Xiaoxiaole实现

{% tabs Xiaoxiaole %}
<!-- tab NewBlock.ts -->
{% codeblock lang:ts 挂载在一个方块预制体上 %}

const {ccclass, property} = cc._decorator;
const picArr=cc.Class({
    name:"pic_List",
    properties:{
        a:{
            default:null,
            type:cc.SpriteFrame
        },
        b:{
            default:null,
            type:cc.SpriteFrame
        },
        c:{
            default:null,
            type:cc.SpriteFrame
        },
        d:{
            default:null,
            type:cc.SpriteFrame
        },
        e:{
            default:null,
            type:cc.SpriteFrame
        },
        f:{
            default:null,
            type:cc.SpriteFrame
        },
    },
});
@ccclass
export default class NewBlock extends cc.Component {
    @property({
        type:picArr,
        displayName:"图片数组"
    })
    pic_List=null;
    index=this.myRandom(0,5)     
    arr=['a','b','c','d','e','f']
    xiaoxiaole(){
        this.index=null
    }
    myRandom(min:number,max:number){
        //向下取整
        return Math.floor(Math.random()*(max-min+1)+min)
    }
    random_block(){
        this.index=this.myRandom(0,5)
    }
    judge_block(){
        if(this.arr[this.index]=='a'){
            this.node.getComponent(cc.Sprite).spriteFrame=this.pic_List.a
        }
        else if(this.arr[this.index]=='b'){
            this.node.getComponent(cc.Sprite).spriteFrame=this.pic_List.b
        }
        else if(this.arr[this.index]=='c'){
            this.node.getComponent(cc.Sprite).spriteFrame=this.pic_List.c
        }
        else if(this.arr[this.index]=='d'){
            this.node.getComponent(cc.Sprite).spriteFrame=this.pic_List.d
        }
        else if(this.arr[this.index]=='e'){
            this.node.getComponent(cc.Sprite).spriteFrame=this.pic_List.e
        }
        else if(this.arr[this.index]=='f'){
            this.node.getComponent(cc.Sprite).spriteFrame=this.pic_List.f
        }
        else if(this.arr[this.index]==null){
            this.node.getComponent(cc.Sprite).spriteFrame=null
        }
    }
    // onLoad () { }
    // start () { }
    update (dt) {
        this.judge_block()
    }
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab Game.ts -->
{% codeblock lang:ts 挂载在背景节点下控制游戏进行 %}
const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    pic:cc.Prefab=null;
    private arr=[];
    xiaoxiaole(event){
        let Point:cc.Vec2 = event.getLocation()
        //转换后的坐标，局部坐标
        let temp_position=this.node.convertToNodeSpaceAR(Point)
        let x=Math.round((temp_position.x+25)/50)
        let y=Math.round((temp_position.y+25)/50)
        //左下角为(1,1)
        let myPos=cc.v2(x,y)
        // cc.log(myPos.x,myPos.y)
        this.judge(myPos)
        for(let i=1;i<11;i++){
            for(let j=1;j<11;j++){
                if(this.arr[i][j]==null){
                    let n:number=1
                    let a:number=1
                    while(this.arr[i][j+a]==null && j+a<11){
                        //记录空格
                        n++
                        a++
                    }
                    // cc.log(n) 
                    this.scheduleOnce(()=>{
                        for(let k=0;k<(11-n-j);k++){
                            this.node.children[(i-1)*10+j-1+k].getComponent("NewBlock").index
                            =this.node.children[(i-1)*10+j-1+k+n].getComponent("NewBlock").index
                            this.arr[i][j+k]=this.arr[i][j+k+n]
                            this.arr[i][j+k+n]=null
                            this.node.children[(i-1)*10+j-1+k+n].getComponent("NewBlock").index=null
                        } 
                    }, 0.4); 
                    //放开此处break不生成新图片            
                    // break
                    //上面生成新图片
                    setTimeout(function () {
                        for(let k=0;k<n;k++){
                            this.node.children[(i-1)*10+9-k].getComponent("NewBlock").random_block()
                            this.arr[i][10-k]=this.node.children[(i-1)*10+9-k].getComponent("NewBlock").index
                        }
                    }.bind(this),950)    
                    break                
                }
            }
        }
    }
    judge(myPos:cc.Vec2){
        //来个变量记住一开始的图片
        let temp= this.arr[myPos.x][myPos.y]
        //减去1的表示点击的节点，处理数组越界整体加了一
        //this.node.children[(myPos.x-1)*10+myPos.y-1]找到对应孩子节点 执行其函数
        if(temp==null || (this.arr[myPos.x-1][myPos.y]!=temp && this.arr[myPos.x+1][myPos.y]!=temp
            && this.arr[myPos.x][myPos.y-1]!=temp && this.arr[myPos.x][myPos.y+1]!=temp)){
                //上面有一个都不成立
                return    
        }
        this.node.children[(myPos.x-1)*10+myPos.y-1].getComponent("NewBlock").xiaoxiaole()  
        this.arr[myPos.x][myPos.y]=null
        
        if(this.arr[myPos.x-1][myPos.y]==temp){
            this.node.children[(myPos.x-2)*10+myPos.y-1].getComponent("NewBlock").xiaoxiaole()
            this.judge(cc.v2(myPos.x-1,myPos.y)) 
            this.arr[myPos.x-1][myPos.y]=null
        }
        if(this.arr[myPos.x+1][myPos.y]==temp){
            this.node.children[myPos.x*10+myPos.y-1].getComponent("NewBlock").xiaoxiaole()
            this.judge(cc.v2(myPos.x+1,myPos.y))  
            this.arr[myPos.x+1][myPos.y]=null  
        }
        if(this.arr[myPos.x][myPos.y-1]==temp){
            this.node.children[(myPos.x-1)*10+myPos.y-2].getComponent("NewBlock").xiaoxiaole()  
            this.judge(cc.v2(myPos.x,myPos.y-1))   
            this.arr[myPos.x][myPos.y-1]=null 
        }
        if(this.arr[myPos.x][myPos.y+1]==temp){
            this.node.children[(myPos.x-1)*10+myPos.y].getComponent("NewBlock").xiaoxiaole() 
            this.judge(cc.v2(myPos.x,myPos.y+1))   
            this.arr[myPos.x][myPos.y+1]=null
        }
    }
    onLoad () {
        this.initGame()
        this.node.on("mousedown",this.xiaoxiaole,this)
    }
    initGame(){      
        for(let i=0;i<12;i++){
            this.arr[i]=[]
            for(let j=0;j<12;j++){
                this.arr[i][j]=null
            }
        }
        for(let i=1;i<11;i++){
            this.arr[i]=[]
            for(let j=1;j<11;j++){
                let block:cc.Node = cc.instantiate(this.pic)
                this.node.addChild(block)
                // cc.log(block.getComponent("NewBlock").index)
                // cc.log(block.name)
                block.setPosition(cc.v2(50*i-25,50*j-25))
                this.arr[i][j]=block.getComponent("NewBlock").index
            }
        }
    }
    // start () {}
     update (dt) {    
     }
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}

### 打砖块(Bricks)

#### Bricks

[游戏预览](https://cmwlvip.github.io/game/Bricks/index.html)
{% codeblock lang:plaintext %}
——Canvas
    ——Main Camera
    ——bg
        ——ball
        ——board
    ——wall
        ——left
        ——right
        ——top
    ——menu
        ——level
        ——score
    ——restart
        ——tip
{% endcodeblock %}

#### Bricks游戏思路

主要是处理砖块碰撞问题，由于小球打在砖块的不同位置效果是不一样的，因此需要设计好不同的碰撞区域，并进行标记
![砖块碰撞设计](2022-12-10-00-28-09.png)

#### Bricks实现

{% tabs bricks %}
<!-- tab Brick.ts -->
{% codeblock lang:ts 挂载在砖块预制体上 %}
const {ccclass, property} = cc._decorator;
@ccclass
export default class Brick extends cc.Component {
    onLoad () {
        let red=Math.random()*255
        let green =Math.random()*255
        let blue =Math.random()*255
        let color=cc.color(red,green,blue)
        this.node.color=color
    }
    // start () {}
    // update (dt) {}
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab Game.ts -->
{% codeblock lang:ts 挂载在背景节点上用于控制游戏进行 %}
const {ccclass, property} = cc._decorator;
@ccclass
export default class Game extends cc.Component {
    @property(cc.Prefab)
    brick:cc.Prefab=null;
    @property(cc.Node)
    player:cc.Node=null;
    Left:boolean=false;
    Right:boolean=false;
    xSpeed:number=11;
    initGame(){
        for(let i=0;i<9;i++){
            for(let j=0;j<15;j++){
                let node:cc.Node=cc.instantiate(this.brick)
                this.node.addChild(node)
                node.setPosition(cc.v2(-480+i*120,800-j*60))
            }
        }
    }
    onKeyDown (event:cc.Event.EventKeyboard) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.Left = true
                break
            case cc.macro.KEY.d:
                this.Right = true
                break
        }
    }
    onKeyUp (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.Left = false
                break
            case cc.macro.KEY.d:
                this.Right = false
                break
        }
    }
    move(event){
        let offset = event.getDelta();
        this.player.x += offset.x;
        if(this.player.x<-450){
            this.player.x=-445
        }else if(this.player.x>450){
            this.player.x=445
        }  
    }
    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.move,this)
        this.initGame()
        let node=new cc.Node()
        node.color=cc.Color.BLACK
        let label=node.addComponent(cc.Label)
        label.string="调整球位置后\n按下空格(或者点击小球)\n开始消除砖块"
        label.fontSize=70
        label.lineHeight=70
        this.node.parent.addChild(node)
        node.setPosition(0,-200)
        setTimeout(() => {
            node.destroy()
        }, 2000);
    }
    // start () {}
    update (dt) {
        if (this.Left) {
        this.player.x-= dt*this.xSpeed*100
        }
        if (this.Right) {
        this.player.x+=dt*this.xSpeed*100
        }
        if(this.player.x<-450){
            this.player.x=-445
        }else if(this.player.x>450){
            this.player.x=445
        }
    }
}
{% endcodeblock %}
<!-- endtab -->

<!-- tab Ball.ts -->
{% codeblock lang:ts 挂载在小球上实现碰撞 %}
const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
    //通关提示
    @property(cc.SpriteFrame)
    win:cc.SpriteFrame=null;
    //得分面板
    @property(cc.Node)
    scoreBoard:cc.Node=null;
    //等级面板
    @property(cc.Node)
    levelBoard:cc.Node=null;
    //重新开始面板
    restart:cc.Node=null;
    xSpeed:number=0;
    ySpeed:number=0;
    score:number=0;
    level:number=0;
    gameLevel:number=0;
    isLunch:boolean=false;
    judge(){
        let tempNode:cc.Node=cc.find("Canvas/bg")
        for(let i=0;i<tempNode.children.length;i++){
            if(tempNode.children[i].name=="brick"){
                return false
            }
        }
        return true
    }
    restartGame(){
        cc.director.loadScene("game")
    }
    fire(event){
        switch(event.keyCode) {
            case cc.macro.KEY.space:
                this.isLunch=true
                this.changeLevel()
                break
        }  
    }
    changeLevel(){
        if(this.score>=this.level){
            this.level+=10+this.gameLevel*10;
            this.gameLevel+=1;
            this.levelBoard.getComponent(cc.Label).string="等级：" + this.gameLevel.toString() 
            switch(this.gameLevel){
                case 1:
                    this.xSpeed=(this.xSpeed>=0)?3:-3
                    this.ySpeed=(this.ySpeed>=0)?7:-7
                    break
                case 2:
                    this.xSpeed=(this.xSpeed>0)?4:-4
                    this.ySpeed=(this.ySpeed>0)?9:-9
                    break
                case 3:
                    this.xSpeed=(this.xSpeed>0)?4:-4
                    this.ySpeed=(this.ySpeed>0)?10:-10
                    break
                case 4:
                    this.xSpeed=(this.xSpeed>0)?5:-5
                    this.ySpeed=(this.ySpeed>0)?11:-11
                    break
                case 5:
                    this.xSpeed=(this.xSpeed>0)?5:-5
                    this.ySpeed=(this.ySpeed>0)?13:-13
                case 6:
                    this.xSpeed=(this.xSpeed>0)?6:-6
                    this.ySpeed=(this.ySpeed>0)?15:-15
                case 7:
                    this.xSpeed=(this.xSpeed>0)?6:-6
                    this.ySpeed=(this.ySpeed>0)?17:-17
                default:
                    break
            }
        }
    }
    onLoad () {
        let manager = cc.director.getCollisionManager()
        manager.enabled=true
        manager.enabledDebugDraw=true
        this.restart=cc.find("Canvas/restart")
        this.restart.active=false
        this.node.getComponent(cc.AudioSource).preload=true
        this.node.on("touchstart",()=>{this.isLunch=true;this.changeLevel()},this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.fire, this)
    }
    onCollisionEnter(other,self:cc.PolygonCollider){
        if(other.tag==1){
            this.ySpeed=-Math.abs(this.ySpeed)
        }
        else if(other.tag==5){
            this.ySpeed=Math.abs(this.ySpeed)
        }
        else if(other.tag==2){
            this.xSpeed=-this.xSpeed
        }
        else if(other.tag==3){
            this.xSpeed=-this.xSpeed
        }
        else if(other.tag==4){
            this.ySpeed=-this.ySpeed
        }
    }
    onCollisionExit(other, self) {
        if(other.tag==1 || other.tag==2 || other.tag==5){
            other.node.destroy()
            this.score+=1
            this.scoreBoard.getComponent(cc.Label).string="得分：" + this.score.toString()
            this.node.getComponent(cc.AudioSource).play()
            this.changeLevel()
        }
    }
    // start () {}
    update (dt) {
        if(this.judge()){
            this.restart.getChildByName("tip").getComponent(cc.Sprite).spriteFrame=this.win
            this.restart.active=true
        }
        this.node.x+=this.xSpeed*dt*100
        this.node.y+=this.ySpeed*dt*100
        if(this.node.y<-960){
            this.restart.active=true
        }
        if(!this.isLunch){
            this.node.x=cc.find("Canvas/bg/board").x
        }
        if(this.node.x>530){
            this.node.x=514
        }
        else if(this.node.x<-530){
            this.node.x=-514
        }
    }
}
{% endcodeblock %}
<!-- endtab -->
{% endtabs %}
