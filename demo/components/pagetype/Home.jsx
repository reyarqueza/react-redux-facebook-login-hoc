import React, { Component } from 'react';

// Import our components from react-redux-facebook-login-hoc
import { FacebookInit, FacebookLogin } from '../../../src/index.jsx';
import config from '../../config.js';

// These three components you can change the HTML to customize if needed.
// Or just make your own, or use Materil-UI, etc...
import Loading from '../presentational/Loading.jsx';
import Login from '../presentational/Login.jsx';

export default class Home extends Component {
    render() {
        const {
            history
        } = this.props;
    
        // define the onLogin callback
        const onLogin = response => {
            history.push('/dashboard');
        }
        
        // Initialize the facebook sdk
        const facebookSDK = FacebookInit(config);
        //const facebookSDK = FacebookInit(config, true); //enable debug mode
        
        // Setup your Facebook Login Component
        const FacebookLoginBar = FacebookLogin({
            Login, 
            Loading,
            onLogin
        }, facebookSDK);
    
        return <FacebookLoginBar/>
    }
}