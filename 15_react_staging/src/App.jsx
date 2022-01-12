//使用了多种暴露形式    
import React, { Component } from 'react';
import SearchBar from "./components/SearchBar"
import ItemList from "./components/ItemList"
import './App.css'

//创建并暴露App组件
export default class App extends Component {

    render() {
        return (
            <div className="container">
                <SearchBar />
                <ItemList />
            </div>
        );
    }

}