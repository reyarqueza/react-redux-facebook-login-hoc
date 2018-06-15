import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import * as actions from './actions';
import reducer from './reducers';

export const FacebookReducer = reducer;

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

export const FacebookAuth = (options, fb) => {

    const {
        Login, 
        Logout, 
        Loading
    } = options;

    class FacebookLoginLogout extends Component {

        constructor(props) {
            super(props);
            this.handleLogin = this.handleLogin.bind(this);
            this.handleLogout = this.handleLogout.bind(this);
        }

        handleLogin() {
            this.props.handleLogin(fb);
        }

        handleLogout() {
            this.props.handleLogout(fb);
        }

        componentDidMount() {
            this.props.currentStatus(fb);
        }

        render() {

            if (!this.props.facebookLogin || isEmpty(this.props.facebookLogin)) {
                return <Loading  {...this.props}/>
            }

            switch (this.props.facebookLogin.status) {
                case 'connected':
                    return <Logout {...this.props}/>
                case 'not_authorized':
                case 'unknown':
                    return <Login {...this.props}/>
                default:
                    return <Login {...this.props}/>
            }
            
        }

    }

    const mapStateToProps = state => {

        let facebookSDK;

        if (isEmpty(state)) {
            return {};
        }

        if (!state.FacebookSDK) {
            return state;
        }

        facebookSDK = state.FacebookSDK;

        return {
            facebookLogin: facebookSDK
        } 
    }

    const mapDispatchToProps = dispatch => {
        return {
            currentStatus: () => {
                dispatch(actions.facebookGetLoginStatusPromise(fb))
            },
            handleLogin: () => {
                dispatch(actions.facebookLoginPromise(fb))
            },
            handleLogout: () => {
                dispatch(actions.facebookLogoutPromise(fb))
            }
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(FacebookLoginLogout);
}
