import React, { Component } from 'react';

const FacebookLoginLogout = (Login, Logout) => {

    class _FacebookLoginLogout extends Component {

        constructor(props) {
            super(props);
            this.state = {
                loggedIn: true
            }
        }

        render() {
            if (this.state.loggedIn) {
                return  <Logout {...this.props} {...this.state} />
            } else {
                return  <Login {...this.props} {...this.state} />
            }
        }

    }
    
    return _FacebookLoginLogout;
}

export default FacebookLoginLogout;
