import React, { Component } from 'react'
import PubSub from 'pubsub-js';

export default class index extends Component {

    state = {
        users:[],
        isFirst: true, //是否为第一次打开页面
        isLoading: false, //是否处于加载中
        err:'', //存储请求相关的错误信息
    }

    componentDidMount(){
        //订阅消息
        PubSub.subscribe('myApp', (_, data) => {
            this.setState(data);
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    render() {
        const {users, isFirst, isLoading, err} = this.state;

        return (
            <div className="row">
                {
                    isFirst ? <h2>Enter the name of user you want to search</h2> :
                    isLoading ? <h2>Loading result......</h2> :
                    err ? <h2 style={{color:'red'}}>{err}</h2> :
                    users.map((item) => {
                        return (
                            <div className="card" key={item.id}>
                                <a rel="noreferrer" href={item.html_url} target="_blank">
                                    <img alt='没有头像！！' src={item.avatar_url} style={{width: '100px'}} />
                                </a>
                                <p className="card-text">{item.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
