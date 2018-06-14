import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../src/reducers';
import { FacebookAuth, FacebookInit } from '../src/index.js';
import Loading from './components/presentational/Loading.jsx';
import Login from './components/presentational/Login.jsx';
import Logout from './components/presentational/Logout.jsx';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
    appId            : '1765313676895663',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.0'    
}

const facebookSDK = FacebookInit(config);
//const facebookSDK = FacebookInit(config, true); //enable debug mode
const FacebookLoginLogout = FacebookAuth({
    Login, 
    Logout, 
    Loading
}, facebookSDK);

const store = createStore(
    reducer, 
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <FacebookLoginLogout/>
    </Provider>,
    document.querySelector('main')
);
