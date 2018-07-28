import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import * as actions from './actions';
import reducer from './reducers';

export const facebookInfo = reducer;
export const FacebookInit = (config, debugMode = false) => {
    return new Promise((resolve, reject) => {

        if (typeof FB !== 'undefined') {
            resolve(FB);
        } else {

            window.fbAsyncInit = () => {
                FB.init(config);
                resolve(FB);
            };
            
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                debugMode ? 
                    js.src = "https://connect.facebook.net/en_US/sdk/debug.js" :
                    js.src = "https://connect.facebook.net/en_US/sdk.js";                
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    });
}

export const FacebookLogin = (options, fb) => {

    const {
        Login, 
        Loading,
        onLogin
    } = options;

    class _FacebookLogin extends Component {

        constructor(props) {
            super(props);
            this.handleLogin = this.handleLogin.bind(this);
        }

        handleLogin() {
            this.props.handleLogin(fb, onLogin);
        }

        componentDidMount() {
            this.props.currentStatus(fb);
        }

        render() {
            if (!this.props.facebookInfo || isEmpty(this.props.facebookInfo)) {
                return <Loading  {...this.props}/>
            }

            return <Login {...this.props}/>
        }

    }

    const mapStateToProps = state => ({
        facebookInfo: state.facebookInfo
    });

    const mapDispatchToProps = dispatch => {
        return {
            currentStatus: () => {
                dispatch(actions.facebookGetLoginStatusPromise(fb, onLogin));
            },
            handleLogin: () => {
                dispatch(actions.facebookLoginPromise(fb, onLogin));
            }
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(_FacebookLogin);
}

export const FacebookLogout = (options, fb) => {

    const {
        Logout,
        Loading,
        onLogout
    } = options;

    class _FacebookLogout extends Component {

        constructor(props) {
            super(props);
            this.handleLogout = this.handleLogout.bind(this);
        }

        handleLogout() {
            this.props.handleLogout(fb, onLogout);
        }

        render() {
            if (!this.props.facebookInfo || isEmpty(this.props.facebookInfo)) {
                return <Loading  {...this.props}/>
            }

            return <Logout {...this.props}/>;
        }

    }

    const mapStateToProps = state => {
        return {
            facebookInfo: state.facebookInfo
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            handleLogout: () => {
                dispatch(actions.facebookLogoutPromise(fb, onLogout));
            }
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(_FacebookLogout);
}
