//使用了多种暴露形式    
import React, { Component } from 'react';
import axios from 'axios';

//创建并暴露App组件
export default class App extends Component {

    getData = () => {
        axios.get('http://localhost:3000/api1/search/users2').then(
            response => {console.log(response.data)},
            error => {console.log('error');}
        );
    }

    getData2 = () => {
        axios.get('http://localhost:3000/api2/search/users2').then(
            response => {console.log(response.data)},
            error => {console.log('error');}
        );
    }


    render() {
        return (
            <div>
                <button onClick={this.getData}>点我获取数据</button>
                <button onClick={this.getData2}>点我获取数据2</button>
            </div>
        );
    }

}