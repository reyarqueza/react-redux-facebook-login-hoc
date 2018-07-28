// import the usual React dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { 
    BrowserRouter as Router, 
    Route
} from 'react-router-dom';

// We need to import this because react-redux-facebook-login-hoc uses
// this under the hood, whether or not you actually use it.
import thunk from 'redux-thunk';

// Import our components from react-redux-facebook-login-hoc
import { facebookInfo } from '../src/index.jsx';

import Home from './components/pagetype/Home.jsx';
import Dashboard from './components/pagetype/Dashboard.jsx';

// Please install Redux DevTools extension for your browser
// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Setup the Facebook Reducer and combine with your own
const reducer = combineReducers({
    facebookInfo //,
    //myOtherReducersHere
});
const store = createStore(
    reducer, 
    composeEnhancers(applyMiddleware(thunk))
);

// Notice that The Login and Logout components are separate, to provide flexibility.
// This separation is the breaking change from version 1.0 to version 2.0.
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path='/' component={Home}/>
                <Route exact path='/dashboard' component={Dashboard}/>
            </div>
        </Router>
    </Provider>,
    document.querySelector('main')
);
