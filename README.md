## 一、React-Hello World和JSX语法

React是一个将数据渲染为HTML视图的JavaScript库。

笔记来自B站视频：https://www.bilibili.com/video/BV1wy4y1D7JT

参考Github博客：https://github.com/linjunc/react-study

#### 原生JS缺点：

- 原生JS操作DOM繁琐，效率低。（DOM-API操作UI）
- 使用JS直接操作DOM，浏览器会进行大量的重绘重排。
- 原生JS没有组件化编码方案，代码复用率低。

#### React的特点：

​	1.采用组件化模式，声明式编码，提高开发效率和组件复用率

​	2.在React Native中可以使用React语法进行移动端开发

​	3.使用虚拟DOM+优秀的Diffing算法，尽量减少与真实的DOM的交互，最小化页面重绘

#### 学习React所需JS基础知识：

- 判断this的指向
- js的面向对象
- ES6语法规范
- npm包管理器
- 原型、原型链
- 数组常用方法
- 模块化

------

#### React的HelloWorld：

引入三个js库:

- react.js - React 的核心库（核心库须在dom之前引入）
- react-dom.js - 供与 DOM 相关的功能
- （babel.min.js）browser.min.js - 将 JSX 语法转为 JavaScript语法

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello React</title>
    <!-- 引入react的核心库 -->
    <script type="text/javascript" src="./build/react.development.js"></script>
    <script type="text/javascript" src="./build/react-dom.development.js"></script>
    <!-- 两个选一个即可 -->
    <!-- <script src="https://npmcdn.com/babel-core@5.8.38/browser.min.js"></script> -->
    <script type="text/javascript" src="./build/babel.min.js"></script>
</head>
<body>
    <div id="app"></div>

    <script type="text/babel">
        //1.创建虚拟DOM
        const vDom = <h1>Hello, World</h1>

        //2.渲染虚拟DOM到页面
        ReactDOM.render(vDom, document.getElementById('app'))
    </script>
</body>
</html>
```

------

#### 创建虚拟DOM的两种方式：

1. 纯JS方式(一般不用)

   ```js
   //1.创建虚拟DOM,创建嵌套格式的dom
   const VDOM=React.createElement('h1',{id:'title'},React.createElement('span',{},'hello,React'))
   //2.渲染虚拟DOM到页面
   ReactDOM.render(VDOM,document.querySelector('.test'))
   ```

2. JSX方式-更方便的创建虚拟DOM

   ```jsx
   //1.创建虚拟DOM
   const vDom = <h1><span>Hello, World</span></h1>
   //2.渲染虚拟DOM到页面
   ReactDOM.render(vDom, document.getElementById('app'))
   ```

> ### 虚拟DOM与真实DOM
>
> 1. React提供了一些API来创建一种 “特别” 的一般js对象
>
>    const VDOM = React.createElement('xx',{id:'xx'},'xx')
>
>    上面创建的就是一个简单的虚拟DOM对象，虚拟DOM比较轻，没有真实DOM那么多属性
>
> 2. 虚拟DOM对象最终都会被React转换为真实的DOM
>
> 3. 我们编码时基本只需要操作react的虚拟DOM相关数据, react会转换为真实DOM变化而更新界。

------

#### JSX语法：

1.全称:  JavaScript XML，是react定义的一种类似于XML的JS扩展语法: 本质是JS + XML。

React.createElement(component, props, ...children)方法的语法糖, 创建虚拟dom

2.JSX语法规则

- 定义虚拟dom时不要写引号

- 标签中混入js表达式时要用{} - {myData.toLowerCase()}

- 样式的类名指定不要用class，要用className - className="title"

- 内联样式，要用style={{key:value}} - style={{color:white; fontSize:18px;}}

- 不能有多个根标签，只能有一个根标签

- 标签必须闭合，自闭合也行

- 如果小写字母开头，就将标签转化为 html 同名元素，如果 html 中无该标签对应的元素，就报错；

  如果是大写字母开头，react 就去渲染对应的组件，如果没有就报错

3.注释

```jsx
ReactDOM.render(
    <div>
    	<h1>小丞</h1>
    	{/*注释...*/}
     </div>,
    document.getElementById('example')
);
```

4.数组：JSX 允许在模板中插入数组，数组自动展开全部成员

```jsx
var arr = [
  <h1>小丞</h1>,
  <h2>同学</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

5.JSX 小练习:根据动态数据生成 `li`

```jsx
const data = ['A','B','C']
const VDOM = (
    <div>
        <ul>
            {
                data.map((item,index)=>{
                    return <li key={index}>{item}</li>
                })
            }
        </ul>
    </div>
)
ReactDOM.render(VDOM,document.querySelector('.test'))
```

> #### js中表达式和语句(代码)的区别
>
> 1.表达式：一个表达式会产生一个值，可以放在任何一个需要值得地方
>
> ​	下面这些都是表达式：
>
> ​				1）a //一个变量
>
> ​				2）a+b //算术表达式
>
> ​				3）demo(1)  //函数返回值
>
> ​				4)  arr.map()  //函数返回值
>
> ​				5)  function test() {} //函数变量
>
> 2.语句(代码)
>
> ​	下面这些都是语句：
>
> ​					1）if(){}
>
> ​					2) for(){}
>
> ​                    3) switch(){}

------

## 二、React面向组件化编程

#### 两种创建组件的方式：

1.函数式组件

```jsx
    <script type="text/babel">
        function Demo() {
            console.log(this) /*此处时undefind， 因为babel编译后开启了严格模式*/
            return <h1>我是函数式组件</h1>
        }
        
        ReactDOM.render(<Demo/>, document.getElementById('app'))
        {
            /*
            执行ReactDom.render(<Demo/>, ...)之后发生了什么？
                1.React解析组件标签，找到了Demo组件
                2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转化为真实的DOM，
                    随后呈现在页面中
            */
        }
    </script>
```

2.类组件

```jsx
    <script type="text/babel">
        //1.创建类式组件
        class MyComponent extends React.Component{
            render() {
                //render放在了类的原型对象上，供实例使用
                //render中的this是MyComponent的实例对象
                return (
                    <div>
                        Hello {this.props.name}    
                    </div>
                );
            }
        }

        ReactDOM.render(
            <MyComponent name="Taylor"/>,
            document.getElementById('app')
        );
        /*
            执行ReactDom.render(<Demo/>, ...)之后发生了什么？
                1.React解析组件标签，找到了MyComponent组件
                2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用原型上的render方法
                3.将render返回的虚拟dom转为真实DOM，随后渲染在页面上
        */
    </script>
```

------

#### 组件实例的三大核心属性：state，props，refs

##### 1.state

> React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。
>
> React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。
>
> 简单的说就是组件的状态，也就是该组件所存储的数据

需要注意的地方：

​	1）组件中render方法中的this为组件实例对象

​	2）组件自定义方法中的this为undefined，如何解决？（即this的指向问题）

​		  a.强制绑定this，通过函数对象的bind()

```jsx
<script type="text/babel">
    class Weather extends React.Component{
        constructor(props) {
            super(props);
            this.state = {isHot:false};

            //解决changeWeather中this的指向问题
            this.changeWeather = this.changeWeather.bind(this);
        }

        render() {
            console.log(this);
            const {isHot} = this.state;
            return (
                <div>
                    <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '寒冷'}</h1>   
                </div>
            );
        }

        changeWeather() {
            //changeWeather放在Weather的原型对象上，供对象使用
            //由于changeWeather是作为onClick的回调，不是通过实例调用，而是直接调用
            //再加上类中的方法默认开启了局部的严格模式，所以此函数中的this为undefined
            //console.log(this); //undefined
            //解决this的指向问题，在构造器中把类原型上的changeWeather绑定到实例对象的this上

            //获取isHot的值
            const isHot = this.state.isHot;
            //this.state.isHot = !isHot; //Error: state不可直接更改
            this.setState({isHot: !isHot}); //state必须通过setState进行更新
        }
    }

    ReactDOM.render(
        <Weather name="Taylor"/>,
        document.getElementById('app')
    );
</script>
```

​		  b.箭头函数（进行简化）

```jsx
<script type="text/babel">
    class Weather extends React.Component{
        //省略构造方法
        state = {isHot:false}
        render() {
            console.log(this);
            const {isHot} = this.state;
            return (
                <div>
                    <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '寒冷'}</h1>   
                </div>
            );
        }
        //自定义方法-赋值语句+使用箭头函数
        //箭头函数中的this会往外部去指向this
        changeWeather = () => {
            const isHot = this.state.isHot;
            this.setState({isHot: !isHot});
        }
    }

    ReactDOM.render(
        <Weather name="Taylor"/>,
        document.getElementById('app')
    );
</script>
```

​	3）state数据，不能直接修改或更新，需要通过setState方法来间接更新

​	4）整个组件在进行调用时，构造器只执行一次，render方法执行1+n次（1是初始化，n是进行页面重绘进行调用），自定义方法回调时会执行

##### 2.props

##### 3.refs

#### JS中的高阶函数（有、意思）

[优质博客]: https://linjc.blog.csdn.net/article/details/116765732	"JS中的高阶函数"

