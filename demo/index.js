import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { FacebookAuth, FacebookInit, FacebookReducer } from '../src/index.jsx';

// These three components you can change the HTML to customize if needed.
import Loading from './components/presentational/Loading.jsx';
import Login from './components/presentational/Login.jsx';
import Logout from './components/presentational/Logout.jsx';

// Please install Redux DevTools extension for your browser
// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
    appId            : '<add your facebook app id here>',
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
    FacebookReducer, 
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <FacebookLoginLogout/>
    </Provider>,
    document.querySelector('main')
);
