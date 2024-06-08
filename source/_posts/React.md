---
title: React
date: 2022-11-20 12:43:12
updated: 2022-11-20
categories: React
tags:
    - React
keywords:
    - React

cover: /2022/11/20/React/React.png
---

## React 是什么？

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“**组件**”。

## 环境准备

### 安装脚手架(CRA)

```shell
npm install -g create-react-app
```

### 创建React项目

**先进入想要创建项目的路径！**

```shell
create-react-app name[项目名称]
```

出现 `Happy hacking!`则创建成功

#### 使用TS

```shell
npx create-react-app name[项目名称]--template typescript
```

### 启动项目

```shell
cd name[项目名称]
```

```shell
npm start
```

## 入门

{% note info modern %}
使用的是TS + React
{% endnote %}
React 中拥有多种不同类型的组件。

先认识`React.Component` 的子类。

```tsx
class ShoppingList extends React.Component<Props> {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// 用法示例: <ShoppingList name="Qing" />
```

ShoppingList 是一个 **React 组件类**，或者说是一个 **React 组件类型**。一个组件接收一些参数，我们把这些参数叫做 `props`（“props” 是 “properties” 简写），然后通过 `render` 方法返回需要展示在屏幕上的视图的层次结构。

`render` 方法的返回值描述了你希望在屏幕上看到的内容。React 根据描述，然后把结果展示出来。更具体地来说，`render` 返回了一个 **React 元素**，这是一种对渲染内容的轻量级描述。大多数的 React 开发者使用了一种名为 “**JSX**” 的特殊语法，JSX 可以让你更轻松地书写这些结构。

语法 `<div />` 会被编译成 `React.createElement('div')`。上述的代码等同于：

```tsx

return React.createElement("div", { className: "shopping-list"}, 
    React.createElement("h1", null, "Shopping List for ", props.name), 
    React.createElement("ul", null, 
        React.createElement("li", null, "Instagram"), 
        React.createElement("li", null, "WhatsApp"), 
        React.createElement("li", null, "Oculus")
    )
);
```

我们并不会直接使用这个方法，而是继续使用 **JSX**。

在 JSX 中你可以任意使用 JavaScript 表达式，只需要用一个大括号把表达式括起来。每一个 React 元素事实上都是一个 JavaScript 对象，你可以在你的程序中把它保存在变量中或者作为参数传递。

`ShoppingList` 组件只会渲染一些内置的 DOM 组件，如`<div />`、`<li />`等。但是你也可以组合和渲染自定义的 React 组件。例如，你可以通过 `<ShoppingList />`来表示整个购物清单组件。每个组件都是封装好的，并且可以单独运行，这样你就可以通过组合简单的组件来构建复杂的 UI 界面。

### 初始代码

{% tabs game,-1 %}
<!-- tab TS -->
```tsx
class Square extends React.Component {
    render() {
      return (
        <button className="square">
          {/* TODO */}
        </button>
      );
    }
}
  
class Board extends React.Component {
    renderSquare(i: number) {
        return <Square />;
    }

    render() {
        const status = 'Next player: X';

        return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}
  
class Game extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
}
  
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
```
<!-- endtab -->

<!-- tab CSS -->
```css
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}

ol, ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.square:focus {
  outline: none;
}

.kbd-navigation .square:focus {
  background: #ddd;
}

.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

```
<!-- endtab -->
{% endtabs %}
这些初始代码是我们要开发的小游戏的基础代码。由于提供了 CSS 样式，就只需要关注使用 React 来开发这个井字棋就可以了。

通过阅读代码，可知三个 React 组件：

- Square
- Board
- Game

Square 组件渲染了一个单独的 `<button>`。Board 组件渲染了 9 个方块。Game 组件渲染了含有默认值的一个棋盘，下面会修改这些值。到目前为止还没有可以交互的组件。

### 通过 Props 传递数据

将数据从 Board 组件传递到 Square 组件中。

在 Board 组件的 `renderSquare` 方法中，我们将代码改写成下面这样，传递一个名为 `value` 的 prop 到 Square 当中：

```tsx
type Props={
    value:number
}

class Board extends React.Component {
  renderSquare(i:number) {
    return <Square value={i} />;
  }
}
```

修改 Square 组件中的 `rende`r 方法，把 `{/* TODO */}` 替换为 `{this.props.value}`，以显示上文中传入的值：

```tsx
class Square extends React.Component<Props> {
    render() {
      return (
        <button className="square">
          {this.props.value}
        </button>
      );
    }
}
```

修改前：
![修改前](2022-11-20-15-07-54.png)
修改后：
![修改后](2022-11-20-15-07-05.png)

这样就成功地把一个 prop 从父组件 Board “传递”给了子组件 Square。
**在 React 应用中，数据通过 props 的传递，从父组件流向子组件**。

### 给组件添加交互功能

下一步让棋盘的每一个格子在点击之后能落下一颗 “X” 作为棋子。
把 Square 组件中 `render()` 方法的返回值中的 button 标签修改为如下内容：

```tsx
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { console.log('click'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

如果此刻点击某个格子，将在浏览器的开发者工具中打印 ‘click’。

{% note warning flat %}
为了少输入代码，同时为了**避免 this 造成的困扰**，我们在这里使用**箭头函数** 来进行事件处理，如代码块第4行所示！
{% endnote %}
{% note warning flat %}
此处使用了 `onClick={() => console.log('click')}` 的方式向 `onClick` 这个 prop 传入一个函数。 React 将在单击时调用此函数。但很多人经常忘记编写 `() =>`，而写成了 `onClick={console.log('click')}`，这种常见的错误会导致每次这个组件渲染的时候都会触发控制台输出。
{% endnote %}

接下来，让 Square 组件可以“记住”它被点击过，然后用 “X” 来填充对应的方格。用 `state` 来实现所谓“记忆”的功能。

可以通过在 React 组件的构造函数中设置 `this.state` 来初始化 state。`this.state` 应该被视为一个组件的私有属性。在 `this.state` 中存储当前每个方格（Square）的值，并且在每次方格被点击的时候改变这个值。

首先，我们向这个 class 中添加一个构造函数，用来初始化 state：

```tsx
class Square extends React.Component<Props> {
    constructor(props:Props){
        super(props);
        this.state={
            value:null,
        }
    }
    render() {
      return (
        <button className="square" onClick={() => { console.log('click'); }}>
          {this.props.value}
        </button>
      );
    }
}
```

{% note warning flat %}
在 JavaScript/TypeScript class 中，每次你定义其子类的构造函数时，都需要调用 `super` 方法。因此，在所有含有构造函数的的 React 组件中，构造函数必须以 `super(props)` 开头。
{% endnote %}

现在，修改一下 Square 组件的 `render` 方法，这样，每当方格被点击的时候，就可以显示当前 state 的值了：

- 在 `<button>` 标签中，把 `this.props.value` 替换为 `this.state.value`。
- 将 `onClick={...}` 事件监听函数替换为 `onClick={() => this.setState({value: 'X'})}`。
- 为了更好的可读性，将 `className` 和 `onClick` 的 prop 分两行书写。

```tsx
type State={
    value:string | null
}
class Square extends React.Component<Props,State> {
    constructor(props:Props){
        super(props);
        this.state={
            value:null,
        }
    }
    //或者这样写
    // state:State={
    //     value:null
    // }
    render() {
      return (
        <button 
            className="square" 
            onClick={() => this.setState({value:'X'}) }
        >
          {this.state.value}
        </button>
      );
    }
}
```

在 Square 组件 `render` 方法中的 `onClick` 事件监听函数中调用 this.setState，我们就可以在每次 `<button>` 被点击的时候通知 React 去重新渲染 Square 组件。组件更新之后，Square 组件的 `this.state.value` 的值会变为 `'X'`，因此，我们在游戏棋盘上就能看见 `X `了。点击任意一个方格，`X` 就会出现了。

### 开发者工具

在 **Chrome** 或者 **Firefox** 中安装扩展 **React Devtools** 可以让你在浏览器开发者工具中查看 React 的组件树。
![开发者工具](2022-11-20-15-56-47.png)
还可以在 React DevTools 中检查 React 组件的 state 和 props。

安装 React DevTools 之后，右键点击页面的任何一个元素，然后选择“查看”，这样就能打开浏览器的开发者工具了，并且工具栏最后会多展示一个 React 的选项卡（包含 “⚛️ Components” 和 “⚛️ Profiler”）。你可以使用 “⚛️ Components” 来检查组件树。

### 游戏完善

现在已经编写好了井字棋游戏中最基础的可以落子的棋盘。要让游戏完整，还需要交替在棋盘上放置 “X” 和 “O”，并且判断出胜者。

当前，每个 Square 组件都维护了游戏的状态。我们可以把所有 9 个 Square 的值放在一个地方，这样我们就可以判断出胜者了。

现在我们可以在棋盘 Board 组件中收集每个格子 Square 组件中的 state。虽然技术上来讲是可以实现的，但是代码如此编写会让人很难理解，并且我们以后想要维护重构时也会非常困难。

所以，最好的解决方式是直接将所有的 state 状态数据存储在 Board 父组件当中。之后 Board 组件可以将这些数据通过 props 传递给各个 Square 子组件，**正如上面我们把数字传递给每一个 Square 一样**。

**当遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。**

这种将组件的 state 提升到父组件的情形在重构 React 组件时经常会遇到。

为 Board 组件添加构造函数，将 Board 组件的初始状态设置为长度为 9 的空值数组：

```tsx
type State1={
    squares:any[]
}
class Board extends React.Component<{},State1> {
    constructor({}){
        super({})
        this.state={
            squares:Array(9).fill(null),
        }
    }
    renderSquare(i: number) {
        return <Square value={i}/>;
    }
```

当我们填充棋盘后，`this.state.squares` 数组的值可能如下所示：

```tsx
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

Board 组件当前的 `renderSquare` 方法看起来像下面这样：

```tsx
renderSquare(i: number) {
    return <Square value={i}/>;
}
```

开始时，我们依次使把 0 到 8 的值通过 prop 从 Board **向下传递**，从而让它们显示出来。上一步与此不同，我们根据 Square 自己内部的 state，使用了 “X” 来代替之前的数字。因此，Square **忽略了**当前从 Board 传递给它的那个 value prop。

现在再一次使用 prop 的传递机制。我们通过修改 Board 来指示每一个 Square 的当前值（`'X'`, `'O'`, 或者 `null`）。我们在 Board 的构造函数中已经定义好了 squares 数组，这样，我们就可以通过修改 Board 的 `renderSquare` 方法来读取这些值了。

```tsx
renderSquare(i:number) {
    return <Square value={this.state.squares[i]} />;
}
```

这样，每个 Square 就都能接收到一个 `value` prop 了，这个 prop 的值可以是 `'X'`、 `'O'`、 或 `null`（null 代表空方格）。

接下来，需要要修改一下 Square 的点击事件监听函数。**Board 组件当前维护了那些已经被填充了的方格**。我们需要想办法让 Square 去更新 Board 的 state。由于 **state 对于每个组件来说是私有的**，因此我们不能直接通过 Square 来更新 Board 的 state。

相反，从 Board 组件向 Square 组件传递一个函数，当 Square 被点击的时候，这个函数就会被调用。接着，我们将 Board 组件的 `renderSquare` 方法改写为如下效果：

```tsx
type Props={
    value:number
    onClick():void
}
renderSquare(i:number) {
    return <Square 
        value={this.state.squares[i]} 
        onclick={()=>this.handleClick(i)}
    />;
}
```

{% note warning flat %}
为了提高可读性，我们把返回的 React 元素拆分成了多行，同时在最外层加了小括号（上面未添加，下面代码添加了），这样 JavaScript 解析的时候就不会在 `return` 的后面自动插入一个分号从而破坏代码结构了。
{% endnote %}

现在我们从 Board 组件向 Square 组件中传递两个 props 参数：`value` 和 `onClick`。`onClick` prop 是一个 Square 组件点击事件监听函数。接下来，我们需要修改 Square 的代码：

- 将 Square 组件的 `render` 方法中的 `this.state.value` 替换为 `this.props.value` 。
- 将 Square 组件的 `render` 方法中的 `this.setState()` 替换为 `this.props.onClick()` 。
- 删掉 Square 组件中的构造函数 `constructor`，因为该组件不需要再保存游戏的 state。

进行上述修改之后，代码会变成下面这样:

```tsx
class Square extends React.Component<Props,State> {
    // constructor(props:Props){
    //     super(props);
    //     this.state={
    //         value:null,
    //     }
    // }
    // state:State={
    //     value:null
    // }
    render() {
      return (
        <button 
            className="square" 
            onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
}
```

每一个 Square 被点击时，Board 提供的 `onClick` 函数就会触发。我们回顾一下这是怎么实现的：

1. 向 DOM 内置元素 `<button>` 添加 `onClick` prop，让 React 开启对点击事件的监听。
2. 当 button 被点击时，React 会调用 Square 组件的 `render()` 方法中的 onClick 事件处理函数。
3. 事件处理函数触发了传入其中的 `this.props.onClick()` 方法。这个方法是由 Board 传递给 Square 的。
4. 由于 Board 把 `onClick={() => this.handleClick(i)}` 传递给了 Square，所以当 Square 中的事件处理函数触发时，其实就是触发的 Board 当中的 `handleClick(i)` 方法。
5. 现在我们还尚未定义 `handleClick()` 方法，所以代码还不能正常工作。如果此时点击 Square，你会在屏幕上看到红色的错误提示，提示内容为：“this.handleClick is not a function”。

{% note warning flat %}
因为 DOM 元素 `<button>` 是一个内置组件，因此其 `onClick` 属性在 React 中有特殊的含义。而对于用户自定义的组件来说，命名就可以由用户自己来定义了。我们给 Square 的 **onClick** 和 Board 的 **handleClick** 赋予任意的名称，代码依旧有效。在 React 中，有一个命名规范，通常会将代表事件的监听 prop 命名为 `on[Event]`，将处理事件的监听方法命名为 `handle[Event]` 这样的格式。
{% endnote %}

点击 Square 的时候，浏览器会报错，因为还没有定义 handleClick 方法。我们现在来向 Board 里添加 `handleClick` 方法：

```tsx
handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }
```

现在，我们可以通过点击 Square 来填充那些方格，效果与之前相同。但是，当前 state 没有保存在单个的 Square 组件中，而是保存在了 Board 组件中。每当 Board 的 state 发生变化的时候，这些 Square 组件都会重新渲染一次。把所有 Square 的 state 保存在 Board 组件中可以让我们在将来判断出游戏的胜者。

因为 Square 组件不再持有 state，因此每次它们被点击的时候，Square 组件就会从 Board 组件中接收值，并且通知 Board 组件。在 React 术语中，我们把目前的 Square 组件称做“**受控组件**”。在这种情况下，Board 组件完全控制了 Square 组件。

{% note warning flat %}
调用了 `.slice()` 方法创建了 squares 数组的一个副本，而不是直接在现有的数组上进行修改。
下面，说明为什么需要创建 square 数组的副本。
{% endnote %}

### 为什么不可变性在 React 中非常重要

建议使用 .slice() 函数对 squares 数组进行拷贝，而非直接修改现有的数组。
是因为不可变性的重要性

改变数据的方式有两种：第一种方式是**直接修改变量的值**，第二种方式是**使用新的一份数据替换旧数据**。

{% label 直接修改数据 blue %}

```ts
let player = {score: 1, name: 'Jeff'};
player.score = 2;
// player 修改后的值为 {score: 2, name: 'Jeff'}
```

{% label 新数据替换旧数据 blue %}

```ts
let player = {score: 1, name: 'Jeff'};

let newPlayer = Object.assign({}, player, {score: 2});
// player 的值没有改变, 但是 newPlayer 的值是 {score: 2, name: 'Jeff'}

// 使用对象展开语法，就可以写成：
// let newPlayer = {...player, score: 2};
```

不直接修改（或改变底层数据）这种方式和前一种方式的结果是一样的，这种方式有以下几点好处：

- **简化复杂的功能**
不可变性使得复杂的特性更容易实现。在后面的章节里，我们会实现一种叫做“时间旅行”的功能。“时间旅行”可以使我们回顾井字棋的历史步骤，并且可以“跳回”之前的步骤。这个功能并不是只有游戏才会用到——撤销和恢复功能在开发中是一个很常见的需求。不直接在数据上修改可以让我们追溯并复用游戏的历史记录。

- **跟踪数据的改变**
如果直接修改数据，那么就很难跟踪到数据的改变。跟踪数据的改变需要可变对象可以与改变之前的版本进行对比，这样整个对象树都需要被遍历一次。
跟踪不可变数据的变化相对来说就容易多了。如果发现对象变成了一个新对象，那么我们就可以说对象发生改变了。

- **确定在 React 中何时重新渲染**
不可变性最主要的优势在于它可以帮助我们在 React 中创建 pure components。我们可以很轻松的确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染。

### 函数组件

接下来把 Square 组件重写为一个函数组件。

如果想写的组件只包含一个 `render` 方法，并且不包含 state，那么使用**函数组件**就会更简单。我们不需要定义一个继承于 `React.Component` 的类，我们可以定义一个函数，这个函数接收 props 作为参数，然后返回需要渲染的元素。函数组件写起来并不像 class 组件那么繁琐，很多组件都可以使用函数组件来写。

把 Square 类替换成下面的函数：

```tsx
function Square(props:Props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

这样把两个 `this.props` 都替换成了 `props`。

{% note warning flat %}
在把 Square 修改成函数组件时，同时也把 `onClick={() => this.props.onClick()}` 改成了更短的 `onClick={props.onClick}`（注意两侧都没有括号）。
{% endnote %}

### 轮流落子

现在井字棋还有一个明显的缺陷有待完善：目前还不能在棋盘上标记 “O”。

我们将 “X” 默认设置为先手棋。你可以通过修改 Board 组件的构造函数中的初始 state 来设置默认的第一步棋子：

```tsx
type State1={
    squares:any[]
    xIsNext:boolean
}
class Board extends React.Component<Props1,State1> {
    constructor(props: Props1){
        super(props)
        this.state={
            squares:Array(9).fill(null),
            xIsNext:true,
        }
    }
```

棋子每移动一步，`xIsNext`（布尔值）都会反转，该值将确定下一步轮到哪个玩家，并且游戏的状态会被保存下来。我们将通过修改 Board 组件的 `handleClick` 函数来反转 `xIsNext` 的值：

```tsx
    handleClick(i: number): void {
        const squares=this.state.squares.slice()
        squares[i]=this.state.xIsNext?'X':'O'
        this.setState({
            squares:squares,
            xIsNext:!this.state.xIsNext,
        })
    }
```

修改之后，就实现了 “X” 和 “O” 轮流落子的效果。

接下来修改 Board 组件 render 方法中 “status” 的值(修改提示信息)，这样就可以显示下一步是哪个玩家的了。

```tsx
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // 其他部分没有改变
```

### 判断出胜者

至此我们就可以看出下一步会轮到哪位玩家，与此同时，还需要显示游戏的结果来判定游戏结束。
判赢函数`calculateWinner`

```tsx
function calculateWinner(squares:any[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

传入长度为 9 的数组，此函数将判断出获胜者，并根据情况返回 “X”，“O” 或 “null”。

接着，在 Board 组件的 `render` 方法中调用 `calculateWinner(squares)` 检查是否有玩家胜出。一旦有一方玩家胜出，就把获胜玩家的信息显示出来，比如，“胜者：X” 或者“胜者：O”。现在，我们把 Board 的 `render` 函数中的 status 的定义修改为如下代码：

```tsx
    render() {
        const winner =calculateWinner(this.state.squares);
        let status:string
        if(winner){
            status='Winner'+ winner
        }
        else{
            status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
        }
```

最后，修改 `handleClick` 事件，当有玩家胜出时，或者某个 Square 已经被填充时，该函数不做任何处理直接返回。

```tsx
    handleClick(i: number): void {
        const squares=this.state.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i]=this.state.xIsNext?'X':'O'
        this.setState({
            squares:squares,
            xIsNext:!this.state.xIsNext,
        })
    }
```

恭喜！现在已经完成了井字棋！

### 时间旅行

将实现“**回到过去**”的功能，从而在游戏里跳回到历史步骤。

#### 保存历史记录

如果直接修改了 `square` 数组，实现时间旅行就会变得很棘手了。

不过，我们可以使用 `slice()` 函数为每一步创建 `squares` 数组的副本，同时把这个数组当作**不可变对象**。这样我们就可以把所有 `squares` 数组的历史版本都保存下来了，然后可以在历史的步骤中随意跳转。

可以把历史的 `squares` 数组保存在另一个名为 `history` 的数组中。`history` 数组保存了从第一步到最后一步的所有的棋盘状态。`history` 数组的结构如下所示:

```tsx
history = [
  // 第一步之前
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // 第一步之后
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // 第二步之后
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
```

现在，需要确定应该在哪一个组件里保存 `history` 这个 **state**。

#### 游戏再优化

让顶层 Game 组件展示出一个历史步骤的列表是个不错的选择。这个功能需要访问 `history` 的数据，因此我们把 `history` 这个 state 放在顶层 Game 组件中。

首先，我们在 Game 组件的构造函数中初始化 state：

```tsx
type State2={
    history:any[]
    xIsNext:boolean
}
class Game extends React.Component<Props1,State2> {
    constructor(props:Props1){
        super(props)
        this.state={
            history:[{
                squares: Array(9).fill(null)
            }],
            xIsNext:true,
        }
        
    }
    ...//其他不变
```

下一步，需要让 Board 组件从 Game 组件中接收 `squares` 和 `onClick` 这两个 props。因为当前在 Board 组件中已经有一个对 Square 点击事件的监听函数了，所以需要把每一个 Square 的对应位置传递给 onClick 监听函数，这样监听函数就知道具体哪一个 Square 被点击了。以下是修改 Board 组件的几个必要步骤：

- 删除 Board 组件中的 `constructor` 构造函数。
- 把 Board 组件的 `renderSquare` 中的 `this.state.squares[i]` 替换为 `this.props.squares[i]`。
- 把 Board 组件的 `renderSquare` 中的 `this.handleClick(i)` 替换为 `this.props.onClick(i)`。

修改后的 Board 组件如下所示：

```tsx
type Props1={
    squares:any[]
    onClick(i:number):void
}

    renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  //其他不变
```

接着，更新 Game 组件的 `render` 函数，使用最新一次历史记录来确定并展示游戏的状态：

```tsx
//其他不变
    render() {
        const history=this.state.history
        const current = history[history.length-1]
        const winner=calculateWinner(current.squares)
        let status:string
        if(winner){
            status='Winner'+ winner
        }
        else{
            status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
        }
        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i)=>this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
}
```

由于 Game 组件渲染了游戏的状态，因此可以将 Board 组件 `render` 方法中对应的代码移除。修改之后，Board 组件的 `render` 函数如下所示：

```tsx
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```

最后，需要把 Board 组件的 `handleClick`方法移动 Game 组件中。同时，我们也需要修改一下 `handleClick` 方法，因为这两个组件的 state 在结构上有所不同。在 Game 组件的 `handleClick` 方法中，需要把新的历史记录拼接到 `history` 上。

```tsx
 handleClick(i: number): void {
        const history=this.state.history
        const current=history[history.length-1]
        const squares=current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i]=this.state.xIsNext?'X':'O'
        this.setState({
            history: history.concat([{
                squares:squares,
            }]),
            xIsNext:!this.state.xIsNext,
        })
    }
```

{% note warning flat %}
`concat()` 方法可能与你比较熟悉的 `push()` 方法不太一样，它并不会改变原数组，所以我们推荐使用 `concat()`。
{% endnote %}

到目前为止，Board 组件只需要 `renderSquare` 和 `render` 这两个方法。而游戏的状态和 handleClick 方法则会放在 Game 组件当中。

#### 展示历史步骤记录

由于我们已经记录了井字棋的历史记录，因此可以把这些记录以历史步骤列表的形式展示给玩家。

在前文中提到的 React 元素被视为 JavaScript 一等公民中的对象（first-class JavaScript objects），因此我们可以把 React 元素在应用程序中当作参数来传递。在 React 中，还可以使用 React 元素的数组来渲染多个元素。

在 JavaScript 中，数组拥有 map() 方法，该方法通常用于把某数组映射为另一个数组，例如：

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

可以通过使用 `map` 方法，把历史步骤映射为代表按钮的 React 元素，然后可以展示出一个按钮的列表，点击这些按钮，可以“跳转”到对应的历史步骤。

现在，我们在 Game 组件的 `render` 方法中调用 `history` 的 `map` 方法：

```tsx
render() {
        const history=this.state.history
        const current = history[history.length-1]
        const winner=calculateWinner(current.squares)

        const moves = history.map((step,move)=>{
            const desc =move ?
                'Go to move #' + move :
                'Go to game start';
            return(
                <li>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })
        let status:string
        if(winner){
            status='Winner'+ winner
        }
        else{
            status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
        }
        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i)=>this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    }
```

当我们遍历 `history` 数组时，`step` 变量指向的是当前 `history` 元素的值，而 move 则指向的是 history 元素的索引。此处，我们只对 move 感兴趣，因此未对 step 做任何处理。

对于井字棋历史记录的每一步，我们都创建出了一个包含按钮 `<button>` 元素的 `<li>` 的列表。这些按钮拥有一个 `onClick `事件处理函数，在这个函数里调用了 `this.jumpTo()` 方法。但是我们还没有实现 jumpTo() 方法。
到目前为止，可以看到一个游戏历史步骤的列表，以及开发者工具控制台的警告信息，警告信息如下：
{% note warning flat %}
Warning: Each child in an array or iterator should have a unique “key” prop. Check the render method of “Game”.
{% endnote %}
![警告信息](2022-11-20-22-02-43.png)

#### 选择一个 key

当需要渲染一个列表的时候，React 会存储这个列表每一项的相关信息。当我们要更新这个列表时，React 需要确定哪些项发生了改变。有可能增加、删除、重新排序或者更新列表项。

想象一下把下面的代码

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

转换成下面的代码

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

除了数字发生了改变之外，阅读这段代码的人也许会认为我们把 Alexa 和 Ben 的顺序交换了位置，然后把 Claudia 插入到 Alexa 和 Ben 之间。然而，React 是电脑程序，它并不知道我们想要什么。因为 React 无法得知我们的意图，所以我们需要给每一个列表项一个确定的 key 属性，它可以用来区分不同的列表项和他们的同级兄弟列表项。可以使用字符串，比如 **alexa, ben, claudia**。如果我们使用从数据库里获取的数据，那么 Alexa、Ben 和 Claudia 的数据库 ID 就可以作为 key 来使用。

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

每当一个列表重新渲染时，React 会根据每一项列表元素的 `key` 来检索上一次渲染时与每个 `key` 所匹配的列表项。如果 React 发现当前的列表有一个之前不存在的 `key`，那么就会创建出一个新的组件。如果 React 发现和之前对比少了一个 `key`，那么就会销毁之前对应的组件。如果一个组件的 `key` 发生了变化，这个组件会被销毁，然后使用新的 state 重新创建一份。

`key` 是 React 中一个特殊的保留属性（还有一个是 **ref**，拥有更高级的特性）。当 React 元素被创建出来的时候，React 会提取出 `key` 属性，然后把 `key` 直接存储在返回的元素上。虽然 `key` 看起来好像是 props 中的一个，但是你不能通过 this.props.`key` 来获取 `key`。React 会通过 `key` 来自动判断哪些组件需要更新。组件是不能访问到它的 `key` 的。

我们强烈推荐，每次只要你构建动态列表的时候，都要指定一个合适的 `key`。如果你没有找到一个合适的 `key`，那么你就需要考虑重新整理你的数据结构了，这样才能有合适的 `key`。

如果你没有指定任何 `key`，React 会发出警告，并且会把数组的索引当作默认的 `key`。但是如果想要对列表进行重新排序、新增、删除操作时，把数组索引作为 `key` 是有问题的。显式地使用 `key={i}` 来指定 `key` 确实会消除警告，但是仍然和数组索引存在同样的问题，所以大多数情况下最好不要这么做。

组件的 `key` 值并不需要在全局都保证唯一，只需要在当前的同一级元素之前保证唯一即可。

#### 实现时间旅行

在井字棋的历史记录中，每一个历史步骤都有一个与之对应的唯一 ID：这个 ID 就是每一步棋的序号。因为历史步骤不需要重新排序、新增、删除，所以使用步骤的索引作为 `key` 是安全的。

在 Game 组件的 render 方法中，我们可以这样添加 key，<li key={move}>，这样关于 key 的警告就会消失了。

```tsx
const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

在实现 `jumpTo` 之前，先向 Game 组件的 state 中添加 `stepNumber`，这个值代表我们当前正在查看哪一项历史记录。

在 Game 的构造函数 `constructor` 中向初始 state 中添加 `stepNumber: 0`：

```tsx
type State2={
    history:any[]
    stepNumber:number
    xIsNext:boolean
}
class Game extends React.Component<Props2,State2> {
    constructor(props:Props2){
        super(props)
        this.state={
            history:[{
                squares: Array(9).fill(null)
            }],
            stepNumber:0,
            xIsNext:true,
        }
        
    }
```

然后，在 Game 组件中定义 `jumpTo` 方法以更新状态 `stepNumber`。除此之外，当状态 stepNumber 是偶数时，还要把 `xIsNext` 设为 `true`：

```tsx
    jumpTo(step:number){
        this.setState({
            stepNumber:step,
            xIsNext:(step%2)===0,
        })
    }
```

在 `jumpTo` 方法中, 我们没有更新 state 中的 `history` 属性。这是因为 state 更新被合并了，或者用更简单的话说，React 不会更新 setState 方法中未提到的属性。

接下来，我们还要修改 Game 组件的 `handleClick` 方法，当你点击方格的时候触发该方法。

新添加的 `stepNumber` state 用于给用户展示当前的步骤。每当我们落下一颗新棋子的时候，我们需要调用 `this.setState` 并传入参数 `stepNumber: history.length`，以更新 stepNumber。这就保证了保证每走一步 stepNumber 会跟着改变。

我们还把读取 `this.state.history` 换成了读取 `this.state.history.slice(0, this.state.stepNumber + 1)` 的值。如果我们“回到过去”，然后再走一步新棋子，原来的“未来”历史记录就不正确了，这个替换可以保证我们把这些“未来”的不正确的历史记录丢弃掉。

```tsx
handleClick(i: number): void {
        const history=this.state.history.slice(0,this.state.stepNumber+1)
        const current=history[history.length-1]
        const squares=current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i]=this.state.xIsNext?'X':'O'
        this.setState({
            history: history.concat([{
                squares:squares,
            }]),
            stepNumber:history.length,
            xIsNext:!this.state.xIsNext,
        })
    }
```

最后，修改 Game 组件的 render 方法，将代码从始终根据最后一次移动渲染修改为根据当前 `stepNumber` 渲染。

```tsx
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // 其他部分没有改变
```

此时点击游戏历史记录的任何一步，井字棋的棋盘就会立即更新为刚走那一步棋时候的样子。

### 总结

至此！你已经完成了一个拥有以下功能的井字棋啦：

- tic-tac-toe(三连棋)游戏的所有功能
- 能够判定玩家何时获胜
- 能够记录游戏进程
- 允许玩家查看游戏的历史记录，也可以查看任意一个历史版本的游戏棋盘状态

干的不错！我们希望至此已经基本掌握了 React 的使用。

如果还有充裕的时间，或者想练习一下刚刚学会的 React 新技能，这里有一些可以改进游戏的想法供你参考，这些功能的实现顺序的难度是递增的：

- 在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。
- 在历史记录列表中加粗显示当前选择的项目。
- 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
- 添加一个可以升序或降序显示历史记录的按钮。
- 每当有人获胜时，高亮显示连成一线的 3 颗棋子。
- 当无人获胜时，显示一个平局的消息。

通过这篇教程，我们接触了 React 中的一些概念，比如 React 元素、React 组件、props，还有 state。
