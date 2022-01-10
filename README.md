# React-study

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

------

##### 2.props

与`state`不同，`state`是组件自身的状态，而`props`则是外部传入的数据

在使用的时候可以通过 `this.props`来获取值 类式组件的 `props`:

1. 通过在组件标签上传递值，在组件中就可以获取到所传递的值
2. 在构造器里的`props`参数里可以获取到 `props`
3. 可以分别设置 `propTypes` 和 `defaultProps` 两个属性来分别操作 `props`的规范和默认值，两者都是直接添加在类式组件的**原型对象**上的（所以需要添加 `static`）
4. 同时可以通过`...`运算符来简化

```jsx
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="./build/prop-types.js"></script>
<script type="text/babel">
    class Person extends React.Component{
        //对props进行类型、必填的限制
        static propTypes = {
            name: PropTypes.string.isRequired, //限制name为必填，且为字符串
            sex: PropTypes.string,
            age: PropTypes.number,
            speak: PropTypes.func //也可以传入一个函数
        }
        //对缺省值
        static defaultProps = {
            sex:'hide',
            age: 18
        }

        render() {
            //props只能进行读取，不能进行修改
            const {name, sex, age} = this.props;
            //this.props.age = age+1; //Error:Cannot assign to read only property 'age' of object '#<Object>'
            return (
                <ul>
                    <li>姓名:{name}</li>    
                    <li>性别:{sex}</li>    
                    <li>年龄:{age+1}</li>    
                </ul>
            );
        }
    }

    ReactDOM.render(
        <Person name="Taylor" age={18} speak={speak} />,document.getElementById('test1')
    );
    ReactDOM.render(
        <Person name="ZJ" sex="Female" age={22} />,document.getElementById('test2')
    );

    const p = {name:"will", sex:'male', age:10}
    //语法糖，可以简化代码，直接使用...去展开一个对象
    ReactDOM.render(
        <Person {...p} />,document.getElementById('test3')
    );

    function speak() {
        alert('speak!!!!');
    }
</script>
```

函数式组件中的使用Props：函数在使用props的时候，是作为参数进行使用的(props)

```jsx
<script type="text/babel">
    function Person(props){
        const {name, sex, age} = props;
        return (
            <ul>
                <li>姓名:{name}</li>    
                <li>性别:{sex}</li>    
                <li>年龄:{age+1}</li>    
            </ul>
        );
    }

    //对props进行类型、必填的限制
    Person.propTypes = {
        name: PropTypes.string.isRequired, //限制name为必填，且为字符串
        sex: PropTypes.string,
        age: PropTypes.number,
        speak: PropTypes.func //也可以传入一个函数
    }
    //对缺省值
    Person.defaultProps = {
        sex:'hide',
        age: 18
    }

    ReactDOM.render(
    	<Person name="Taylor" age={18} speak={speak} />,document.getElementById('test1')
    );
    function speak() {
        alert('speak!!!!');
    }
</script>
```

函数组件的 `props`定义:

1. 在组件标签中传递 `props`的值
2. 组件函数的参数为 `props`
3. 对 `props`的限制和默认值同样设置在原型对象上

------

##### 3.refs

Refs 提供了一种方式，允许我们组件访问 DOM 节点，或在 `render` 方法中创建的 React 的DOM元素。

> 在我们正常的操作节点时，需要采用DOM API 来查找元素，但是这样违背了 React 的理念，因此有了`refs`
>
> 即可以直接使用document.getElementById(xxx) 或 document.getElementByClassName(xxx)

有三种操作`refs`的方法，分别为：

- 字符串形式

  ```jsx
  //字符串形式的Refs
  class Demo1 extends React.Component{
      showData = ()=>{
          const {input1} = this.refs;
          alert(input1.value);
      }
  
      showI2Data = ()=>{
          const {input2} = this.refs;
          alert(input2.value);
      }
  
      render() {
          return (
              <div>
                  <input ref="input1" type="text" placeholder="点击按钮提示数据" />&nbsp;
                  <button onClick={this.showData}>点我提示左侧得数据</button>&nbsp;
                  <input ref="input2" onBlur={this.showI2Data} type="text" placeholder="失去焦点提示数据" />
              </div>
          );
      }
  }	
  ```

  这个方法废弃了，由于会产生巨大的效率问题（官网说的）。但是还能用，还很好用hhh~

- 回调形式

  内联函数：组件实例的`ref`属性传递一个回调函数`currentNode => this.input1 = currentNode `（箭头函数简写），这样会在实例的属性中存储对DOM节点的引用，使用时可通过`this.input1`来使用

  class绑定函数：通过自定义函数，直接将当前DOM节点的引用作为参数，挂载到this上，可通过this.input1来直接使用

  ```jsx
  //回调形式的Refs => 往实例自身上挂载
  //回调ref中回调执行次数的问题=>
  class Demo2 extends React.Component{
  
  	showData = ()=>{
          const {input1} = this;
          alert(input1.value);
  	}
  
      showI2Data = ()=>{
          const {input2, input3} = this;
          alert(input2.value)
      }
  
      savaInput3 = (currentNode) =>{
          this.input3 = currentNode;
      }
  
      render() {
          return (
              <div>
                  {/*
                         以内联函数的形式定义回调ref
                           ref={currentNode => this.input1 = currentNode}
                         每次页面更新重绘时时，这个回调函数会被调用两次，第一次传入的参数null，第二次传入的参数为DOM元素
                  */}
                  <input ref={currentNode => this.input1 = currentNode} type="text" placeholder="点击按钮提示数据" />&nbsp;
                  
                  {/*
                         以class的绑定函数的方式来定义回调ref
                         ref={this.savaInput3}
                         可以解决上述出现的被执行两次
                   */}
                  <input ref={this.savaInput3} type="text" placeholder="点击按钮提示数据" />&nbsp;
                  
                  <button onClick={this.showData}>点我提示左侧得数据</button>&nbsp;
                  <input ref={currentNode => this.input2 = currentNode} onBlur={this.showI2Data} 
                      type="text" placeholder="失去焦点提示数据" />
              </div>
          );
      }
  }
  ```

- `createRef`形式（官网推荐写法）

  React 给我们提供了一个相应的API，它会自动的将该 DOM 元素放入实例对象中

  ```jsx
  class Demo3 extends React.Component{
      /*
         React.createRef调用后可以返回一个容器，
         该容器可以存储ref所标识的节点，该容器时“专人专用”，每个ref都有自己的容器
      */
      myRef = React.createRef();
  	myRef2 = React.createRef();
  
      showData = ()=>{
          alert(this.myRef.current.value);
      }
  
      showI2Data = ()=>{
          alert(this.myRef2.current.value);
      }
  
      render() {
          return (
              <div>
                  <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" />&nbsp;
                  <button onClick={this.showData}>点我提示左侧得数据</button>&nbsp;
                  <input ref={this.myRef2} onBlur={this.showI2Data} type="text" placeholder="失去焦点提示数据" />
              </div>
          );
      }
  }
  ```

------

#### 事件处理

1. 通过onXxx属性指定事件处理函数(注意大小写)
   - React使用的是自定义(合成)事件, 而不是使用的原生DOM事件 ---为了更好的兼容性
   - React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) --- 为了更高效
2. 通过event.target得到发生事件的DOM元素对象, 可以尽量减少 `refs`的使用

```jsx
class Demo extends React.Component{
    showI2Data = (event)=>{
        alert(event.target.value);
    }
    
    render() {
        return (
            <div>
                <input onBlur={this.showI2Data} type="text" placeholder="失去焦点提示数据" />
            </div>
        );
    }
}
```

> #### tips：当发生事件的事件源和事件要操作的DOM元素为同一个时可以省略掉refs
>
> #### 切记不要过度使用refs

------

#### 受控组件和非受控组件（表单元素的组件分类）

页面中的DOM的值被组件中的state控制则为受控组件，反之则为非受控组件

```jsx
//受控组件
class ControllDemo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {username:'', password:''};
        this.saveUsername = this.saveUsername.bind(this);
    }

    //保存用户名到状态中
    saveUsername(event) {
        this.setState({username:event.target.value})
    }

    //保存Password到状态中
    savaPassword = (event)=>{
        this.setState({password:event.target.value})
    }

    handleSubmit = (event)=>{
        event.preventDefault(); //阻止表单进行提交
        const {username, password} = this.state;
        alert(`Username:${username}, Password:${password}`);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Username&nbsp;<input onChange={this.saveUsername} type="text" /><br/>
                    Password&nbsp;&nbsp;<input onChange={this.savaPassword} type="text" /><br/>
                    <button>Login</button>
                </form>
            </div>
        );
    }
}
```

```jsx
//非受控组件
class UnControllDemo extends React.Component{
    handleSubmit = (event)=>{
        event.preventDefault(); //阻止表单进行提交
        const {uname, pwd} = this;
        alert(`Username:${uname.value}, Password:${pwd.value}`);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Username&nbsp;<input ref={c => this.uname=c} type="text" /><br/>
                    Password&nbsp;&nbsp;<input ref={c => this.pwd=c}type="text" /><br/>
                    <button>Login</button>
                </form>
            </div>
        );
    }
}
```

> #### tips：推荐使用受控组件，可以减少ref的使用

#### JS中的高阶函数（有、意思）：https://linjc.blog.csdn.net/article/details/116765732

如果一个函数满足以下两个条件之一即为高阶函数：1.A函数接收的参数是一个函数 2.A函数的返回值依然是一个函数。

- 函数柯里化
- 数组的map，reduce，filter
- AOP切面编程
- 闭包（这个要去了解）
- 如何防抖，节流（某种业务场景, setTimeout）
- Promise

------

## 三、React的生命周期

在 React 中为我们提供了一些生命周期钩子函数，让我们能在 React 执行的重要阶段，在钩子函数中做一些事情。组件从创建到卸载回经历一些特定的阶段。

##### 1.生命周期流程图(旧) v16.8.4之前

<img src="https://raw.githubusercontent.com/WillSilent/myPic/master/img/image-20220109210159170.png" alt="image-20220109210159170" style="zoom: 80%;" />

生命周期的三个阶段（旧）（具体打印数据可以看 013_lifecycle old.html‘’）

1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
   - constructor()
   - componentWillMount()
   - render()
   - componentDidMount()
2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
   - shouldComponentUpdate()
   - componentWillUpdate()
   - render()
   - componentDidUpdate()
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
   - componentWillUnmount()

------

##### 2.生命周期流程图(新) v17.0.1

- <img src="https://raw.githubusercontent.com/WillSilent/myPic/master/img/image-20220109210906426.png" alt="image-20220109210906426" style="zoom:80%;" />

生命周期的三个阶段（新）（具体打印数据可以看 014_lifecycle new.html‘’）

1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
   - constructor()
   - getDerivedStateFromProps 
   - render()：避免在 `render` 中使用 `setState` ，否则会死循环
   - componentDidMount()：意味着初始化挂载操作已经基本完成，它主要用于组件挂载完成后做某些操作
2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
   - getDerivedStateFromProps：在初始化和更新中都会被调用，并且在 `render` 方法之前调用，它返回一个对象用来更新 `state`。类上直接绑定的静态（`static`）方法，它接收两个参数 `props` 和 `state`；并接收`props`用于合并 `state`，生成新的`state`，此后`state`不会再进行更改；若返回`null`，则`state`还是可以进行更改
   - shouldComponentUpdate()：在组件更新之前调用，可以通过返回值来控制组件是否更新，允许更新返回 `true` ，反之不更新
   - render()
   - getSnapshotBeforeUpdate：它可以使组件在 DOM 真正更新之前捕获一些信息（例如滚动位置），此生命周期返回的任何值都会作为参数传递给 `componentDidUpdate()`。如不需要传递任何值，那么请返回 null
   - componentDidUpdate()：组件在更新完毕后会立即被调用，首次渲染不会调用
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
   - componentWillUnmount():在组件即将被卸载或销毁时进行调用。

> #### tips：
>
> render：初始化渲染或更新渲染调用
>
> componentDidMount：开启监听, 发送ajax请求
>
> componentWillUnmount：做一些收尾工作, 如: 清理定时器
>
> 即将废弃的勾子：
>
> 1. componentWillMount
>
> 2. componentWillReceiveProps
>
> 3. componentWillUpdate
>
> 现在使用会出现警告，下一个大版本需要加上UNSAFE_前缀才能使用，以后可能会被彻底废弃，不建议使用。

## 四、React中的diff算法（后面有空再去了解，先学其他的先）

diff 算法是 React 提升渲染性能的一种优化算法，在 React 中有着很重要的地位，也不止于 React ，在 Vue 中也有 diff 算法，似乎没有差别。

## 五、React脚手架工程

#### 1.安装React脚手架项目并创建应用

 react提供了一个用于创建react项目的脚手架库: create-react-app。项目的整体技术架构为:  react + webpack + es6 + eslint

- 全局安装：npm i -g create-react-app
- 切换到想创项目的目录，使用命令：create-react-app hello-react
- 进入项目文件夹：cd hello-react
- 启动项目：npm start

#### 2.react脚手架项目结构

​	
