import React, { Component } from 'react';

// Import our components from react-redux-facebook-login-hoc
import { FacebookInit, FacebookLogout } from '../../../src/index.jsx';
import config from '../../config.js';

// These three components you can change the HTML to customize if needed.
// Or just make your own, or use Materil-UI, etc...
import Loading from '../presentational/Loading.jsx';
import Logout from '../presentational/Logout.jsx';

export default class Dashboard extends Component {
    render() {
        const {
            history
        } = this.props;
    
        // define the onLogout callback
        const onLogout = response => {
            history.push('/');
        }
    
        // Initialize the facebook sdk
        const facebookSDK = FacebookInit(config);
        //const facebookSDK = FacebookInit(config, true); //enable debug mode
    
        // Setup your Facebook Login Component
        const FacebookLogoutBar = FacebookLogout({
            Logout, 
            Loading,
            onLogout
        }, facebookSDK);
    
        return <FacebookLogoutBar/>
    }
}