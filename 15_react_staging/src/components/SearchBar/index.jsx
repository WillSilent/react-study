import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js';

export default class index extends Component {

    handleChange = (event) => {

        //连续结构赋值+命名
        const {target:{value:inputVal}} = event;

        if(inputVal.trim() === '') {
            return;
        }

        //发送请求前通知App更新状态
        PubSub.publish('myApp', {isFirst:false, isLoading:true});

        //发送请求
        axios.get('https://api.github.com/search/users?q='+inputVal)
        .then(
            response => {
                const users = response.data['items'];
                //console.log(users);
                PubSub.publish('myApp', {isLoading: false, users: users});
                //this.props.updateAppStates({isLoading: false, users: users});
            },
            error => {
                PubSub.publish('myApp', {isLoading: false, err: error.message});
                //this.props.updateAppStates({isLoading: false, err: error.message});
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
