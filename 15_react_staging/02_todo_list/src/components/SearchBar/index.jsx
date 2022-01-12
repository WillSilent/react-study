import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import './index.css'

export default class SearchBar extends Component {

    static propTypes = {
        addOne: PropTypes.func.isRequired
    }

    handleKeyUp = (event) => {
        const {keyCode, target} = event;
        //console.log(event.target.value, event.keyCode);

        //判断是否为回车按键
        if(keyCode !== 13) return;

        if(target.value.trim() === '') {
            alert("输入内容不能为空!");
            return;
        }

        //将新组件内容传递给父组件
        this.props.addOne({id:nanoid(), name:target.value, isDone:false})
        target.value = '';
    }

    render() {
        return (
            <div className="todo-header">
                <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        )
    }
}
