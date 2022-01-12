import React, { Component } from 'react'
import axios from 'axios'

export default class index extends Component {

    handleChange = (event) => {
        //连续结构赋值+命名
        const {target:{value:inputVal}} = event;

        if(inputVal.trim() === '') {
            return;
        }

        //发送请求前通知App更新状态
        this.props.updateAppStates({isFirst:false, isLoading:true});

        //发送请求
        axios.get('https://api.github.com/search/users?q='+inputVal)
        .then(
            response => {
                const users = response.data['items'];
                //console.log(users);
                this.props.updateAppStates({isLoading: false, users: users});
            },
            error => {
                this.props.updateAppStates({isLoading: false, err: error.message});
            }
        );
    }
    

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input type="text" onChange={this.handleChange} placeholder="enter the name of user to search" />&nbsp;
                    {/* <button>Search</button> */}
                </div>
            </section>
        )
    }
}
