import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return <a onClick={this.props.handleLogin}>Login</a>
    }
}
