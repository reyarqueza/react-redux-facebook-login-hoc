import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/presentational/Login.jsx';
import Logout from './components/presentational/Logout.jsx';
import FacebookLoginLogout from './components/hoc/FacebookLoginLogout.jsx';

const FacebookAuth = FacebookLoginLogout(Login, Logout);

ReactDOM.render(
    <FacebookAuth/>,
    document.querySelector('main')
);
