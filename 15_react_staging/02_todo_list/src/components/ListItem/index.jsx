import React, { Component } from 'react'
import './index.css';

export default class ListItem extends Component {

    state = {mouse:false}

    handleMouse = (flag) => {
        return () => {
            this.setState({mouse:flag})
        };
    }

    handleCheck = (id)=>{
        return (event) => {
            //console.log(id, event.target.checked);
            this.props.updateTodo(id, event.target.checked);
        };
    }

    //删除
    handleDelete = (id) => {
        if(window.confirm('确认删除嘛')) {
            this.props.deleteTodo(id);
        }
    }

    render() {
        const {id,name, isDone} = this.props;
        const {mouse} = this.state;
        return (
            <li style={{backgroundColor: mouse ? '#ddd' : 'white'}} 
              onMouseLeave={this.handleMouse(false)} 
              onMouseEnter={this.handleMouse(true)}>
                <label>
                    <input type="checkbox" 
                        checked={isDone} onChange={this.handleCheck(id)}/>
                    <span>{name}</span>
                </label>
                <button className="btn btn-danger"
                     style={{display: mouse ? 'block' : 'none'}}
                     onClick={() => this.handleDelete(id) }>
                    删除</button>
            </li>
        )
    }
}
