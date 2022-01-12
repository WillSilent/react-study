//使用了多种暴露形式    
import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

//创建并暴露App组件
export default class App extends Component {

    //状态在哪里，操作状态的方法在哪里

    state = {
        todos:[
            {id:'001', name:"吃饭", isDone: true},
            {id:'002', name:"睡觉", isDone: true},
            {id:'003', name:"打代码", isDone: false},
        ]
    } 

    //用于添加一个todo，接收子组件中得todo对象
    addOne = (todoObj)=>{
        const {todos} = this.state;
        const newTodos = [todoObj, ...todos];
        this.setState({todos: newTodos});
    }

    updateTodo = (id, isDone)=>{
        const {todos} = this.state;
        const newTodos = todos.map((item) => {
            if(item.id === id) {
                return {...item, isDone};
            } else {
                return item;
            }
        })

        this.setState({todos:newTodos});
    }

    deleteTodo = (id) => {
        const {todos} = this.state;

        const newTodos = todos.filter((item) => {
            return item.id !== id;
        })

        this.setState({todos:newTodos});
    }

    checkAllTodo = (flag) => {
        const {todos} = this.state;
        const newTodos = todos.map((item) => {
            return {...item, isDone:flag};
            
        });
        this.setState({todos:newTodos});
    }

    clearAllDone = ()=> {
        const {todos} = this.state;
        const newTodos = todos.filter((item) => {
            return !item.isDone;
        });
        this.setState({todos:newTodos});
    }


    render() {
        const {todos} = this.state;
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <SearchBar addOne={this.addOne}/>
                    <TaskList todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
                    <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone}/>
                </div>
            </div>
        );
    }

}