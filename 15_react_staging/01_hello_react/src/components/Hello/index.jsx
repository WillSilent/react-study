import React, {Component} from 'react'
import hello from './index.module.css' //样式模块化，可以实现不同模块下样式同名

export default class Hello extends Component{
    render() {
        return (
            <h2 className={hello.title}>Hello, React!</h2>
        );
    }
}