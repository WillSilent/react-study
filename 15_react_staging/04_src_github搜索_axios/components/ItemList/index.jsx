import React, { Component } from 'react'

export default class index extends Component {
    render() {

        const {users, isFirst, isLoading, err} = this.props;
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
