import React from 'react';
import ReactDOM from 'react-dom';
import { FacebookAuth, FacebookInit } from './components/hoc/FacebookSDK.jsx';
import Loading from './components/presentational/Loading.jsx';
import Login from './components/presentational/Login.jsx';
import Logout from './components/presentational/Logout.jsx';

const config = {
    appId            : '1765313676895663',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.0'    
}
const scope = {
    scope: 'public_profile' //,user_friends
}

const fb = FacebookInit(config);
//const fb = FacebookInit(config, true); //enable debug mode
const FacebookLoginLogout = FacebookAuth(Login, Logout, Loading, fb, scope);

ReactDOM.render(
    <FacebookLoginLogout/>,
    document.querySelector('main')
);
