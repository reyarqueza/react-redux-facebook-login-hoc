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

// to be moved into FacebookLogin then delete
function initFacebookLoginState(state = {}) {
    return {
        facebookSDK: state.facebookSDK
    }
}

/* to be deleted
function renderComponent(props, Loading, PrimaryComponent) {
    if (!props.facebookSDK || isEmpty(props.facebookSDK)) {
        return <Loading  {...props}/>
    }

    switch (props.facebookSDK.status) {
        case 'connected':
            return <PrimaryComponent {...props}/>
        case 'not_authorized':
        case 'unknown':
        default:
            return null;
    }
}
*/

export const FacebookLogin = (options, fb) => {

    const {
        LoggedIn, 
        LoggedOut,
        Loading,
        onLogin
    } = options;

    console.log('options',options);

    class _FacebookLogin extends Component {

        constructor(props) {
            super(props);
            this.handleLogin = this.handleLogin.bind(this);
        }

        handleLogin() {
            this.props.handleLogin(fb, onLogin);
        }

        handleLogout() {
            this.props.handleLogout(fb, onLogout);
        }

        componentDidMount() {
            this.props.currentStatus(fb);
        }

        render() {
            //return renderComponent(this.props, Loading, Login);
            if (!this.props.facebookSDK || isEmpty(this.props.facebookSDK)) {
                return <Loading  {...this.props}/>
            }
        
            switch (this.props.facebookSDK.status) {
                case 'connected':
                    return <LoggedIn {...this.props}/>
                case 'not_authorized':
                case 'unknown':
                default:
                    return <LoggedOut {...this.props}/>;
            }
        }

    }

    const mapStateToProps = state => {
        return initFacebookLoginState(state);
    }

    const mapDispatchToProps = dispatch => {
        return {
            currentStatus: () => {
                dispatch(actions.facebookGetLoginStatusPromise(fb));
            },
            handleLogin: () => {
                dispatch(actions.facebookLoginPromise(fb))
                // .then(response => {
                //     console.log('calling users callback with response as arg');
                //     onLogin(response);
                // });
            },
            handleLogout: () => {
                dispatch(actions.facebookLogoutPromise(fb))
                // .then(response => {
                //     console.log('logged out');
                //     onLogout(response);
                // });
            }
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(_FacebookLogin);
}


/* to be deleted
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

        componentDidMount() {
            this.props.currentStatus(fb);
        }

        render() {
            return renderComponent(this.props, Loading, Logout);            
        }

    }

    const mapStateToProps = state => {
        return initFacebookLoginState(state)
    }

    const mapDispatchToProps = dispatch => {
        return {
            currentStatus: () => {
                dispatch(actions.facebookGetLoginStatusPromise(fb))
            },
            handleLogout: () => {
                dispatch(actions.facebookLogoutPromise(fb))
                .then(response => {
                    console.log('logged out');
                    onLogout(response);
                });
            }
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(_FacebookLogout);
}
*/