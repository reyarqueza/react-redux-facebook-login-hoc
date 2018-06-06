import React, { Component } from 'react';

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

export const FacebookAuth = (Login, Logout, Loading, FB, scope) => {

    class _FacebookLoginLogout extends Component {

        constructor(props) {
            super(props);
            this.state = {};
            this.state.handleLogin = this.handleLogin.bind(this);
            this.state.handleLogout = this.handleLogout.bind(this);
            this.state.userInfo = this.userInfo.bind(this);
            FB.then(FB => {
                FB.getLoginStatus(response => {
                    console.log(response);
                    this.setState({
                        facebook: {
                            status: response.status
                        }
                    });

                    // if (response.authResponse) {
                    //     this.setState({
                    //         facebook: {
                    //             accessToken: response.authResponse.accessToken,
                    //             userID: response.authResponse.userID
                    //         }
                    //     });
                    // }
                });
            })
            .catch(error => console.log(error));
        }

        userInfo() {
            return new Promise( (resolve, reject) => {
                FB.then(FB => {
                    FB.api('/me', { 
                        locale: 'en_US', 
                        fields: 'first_name,last_name,picture'
                    }, response => {
                        console.log(response);
                        resolve(response);
                    });
    
                    // FB.api(`/${this.state.userID}`, {}, response => {
                    //     console.log(response);
                    // });
                    // FB.api(`/${this.state.userID}`, {
                    //     fields: 'first_name,last_name',
                    //     access_token: this.state.facebook.accessToken
                    // }, response => {
                    //     console.log(response);
                    // });
                
                });
            });

        }

        handleLogout() {
            FB.then(FB => {
                FB.logout(response => {
                    console.log('logged out..', response);
                    this.setState({
                        facebook: {
                            status: response.status
                        }
                    });
                });
            });
        }

        handleLogin() {
            FB.then(FB => {
                FB.login(response => {
                    // handle the response
                    console.log('logged in..', response);
                    this.setState({
                        facebook: {
                            status: response.status
                        }
                    });
                  }, scope);
            });
        }

        render() {
            if (!this.state.facebook) {
                return <Loading/>
            }
            console.log('this.state.facebook.status', this.state.facebook.status)
            switch (this.state.facebook.status) {
                case 'connected':
                    return <Logout {...this.state} {...this.props}/>
                case 'not_authorized':
                case 'unknown':
                    return <Login {...this.state} {...this.props}/>
                default:
                    return <Login {...this.state} {...this.props} />
            }
            
        }

    }
    
    return _FacebookLoginLogout;
}

