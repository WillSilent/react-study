//使用了多种暴露形式    
import React, { Component } from 'react';
import SearchBar from "./components/SearchBar"
import ItemList from "./components/ItemList"
import './App.css'

//创建并暴露App组件
export default class App extends Component {

    state = {
        users:[],
        isFirst: true, //是否为第一次打开页面
        isLoading: false, //是否处于加载中
        err:'', //存储请求相关的错误信息
    }

    updateAppStates = (status) => {
        this.setState(status);
    }

    render() {
        return (
            <div className="container">
                <SearchBar updateAppStates={this.updateAppStates}/>
                <ItemList {...this.state}/>
            </div>
        );
    }

}