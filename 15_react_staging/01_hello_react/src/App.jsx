//使用了多种暴露形式    
import React, {Component} from 'react';
import Hello from './components/Hello'
import Welcome from './components/Welcome';

//创建并暴露App组件
export default class App extends Component{
    
    render() {
        return (
            <div>
                <Hello />
                <hr/>
                <Welcome />
            </div>
        );
    }
    
}