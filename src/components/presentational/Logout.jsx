import React, { Component } from 'react';

export default class Logout extends Component {
    render() {

            this.props.userInfo().then(user => {
                console.log(user);
            });

            return (
                <div>
                    <a onClick={this.props.handleLogout}>Logout</a>
                </div>
            )
    }
}
