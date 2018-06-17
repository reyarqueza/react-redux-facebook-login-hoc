# react-redux-facebook-login-hoc

This component is a react-redux wrapper around the facebook sdk which implements [Facebook Login](https://developers.facebook.com/docs/facebook-login/).

### Demo
To run the demo:

Add your facebook app id in the [demo/index.js](demo/index.js) file on the line 18:

```
    appId            : '<add your facebook app id here>',
```

```
npm install
npm start
```

You'll see the following.

#### After Logging In
I'm showing the logged in state first, to demonstrate that in addition to the Facebook Login, I'm also using the Graph API to pull in the user's picture and name. I thought I should show this first because at the time I made this, I couldn't find this feature in other React implementations.

![Logout screenshot](demo/screenshots/screen-logout.png)

#### Login
As for the loggged out state, this feature is quite common in other React implementations, so I will show this below the fold.

![Login screenshot](demo/screenshots/screen-login.png)


Notice for debugging that I have the chrome plugin support for [Redux DevTools](https://www.npmjs.com/package/redux-devtools).

### Features
You'll find various React implementations on Github for [Facebook Login](https://developers.facebook.com/docs/facebook-login/), and I originally tried a few of those. However, I decided to create my own because I needed these features:

1. The logged in user's picture and name.
1. A logout link.
1. Three presentational components with default styles, which can also be edited for custom branding:
    * Login
    * Loading
    * Logout
1. Easy to re-use by encapsulating the Facebook SDK details, so that a React developer who needed this component didn't need to learn the Facebook SDK.
1. State lives in a single source of truth (redux) instead of the component's internal state.


### Advantages for the designer
The designer doesn't need to understand React. The designer can edit the HTML/CSS of the Presentational Components in the demo folder and basically use the existing webpack build system to preview his/her work. *(See how to start the demo at the beginning of this doc.)*

### The React Developer
The React Developer can then take the edited presentational components and easily pass the presentational components to the HOC (higher order component). See usage below on what to copy/paste into your own source code.

### Requirements
For the React Developer, I will assume you have your own build system (whether it is home grown with gulp, webpack, or build systems on top of webpack like create-react-app). Your build system's transpiler must support the following babel presets:

1. react : needed for [JSX](https://babeljs.io/docs/en/babel-preset-react)
1. stage-2 : needed for [transform-object-rest-spread](https://babeljs.io/docs/en/babel-preset-stage-2)

Its possible that your build system's transpiler already supports this. 

### Misc Dependencies
You'll also need to npm install --save-dev the following:

* lodash.isempty

### Usage

_**STEP 1 - React Dependencies**_ 

Install the necessary dependencies that your React app doesn't have:

```
npm install --save-dev react react-dom redux react-redux redux-thunk react-redux-facebook-login-hoc

```

If you want to match versions, see the [package.json](package.json) file, but first try using react-redux-facebook-login-hoc with your version of react, redux, etc as there are most likely no breaking changes.

_**STEP 2 - Root JS File Imports**_

In your root js file, copy and paste the following, or import just the modules you don't have.

```
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { FacebookAuth, FacebookInit, FacebookReducer } from 'react-redux-facebook-login-hoc';
```
_**STEP 3 - Presentational Components**_

Now here's the fun part where you create three presentational components, Login, Loading, and Logout. 

* Copy these three files from the [demo directory](demo/components/presentational)
* Copy the css [here](public/css/index.css).
* Add FontAwesome in your index.html file.

```
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
        crossorigin="anonymous">
```

These would be the only 3 files you would hand off to your friendly HTML/CSS Designer for customization. If they decide to customize the HTML/CSS, remind them to use className instead of class since this is HTML in React. Also remind them to not delete any javascript expressions for example: onClick={props.handleLogin}.

**Back to the Root JS File**

_**STEP 4 - Importing Presentational Components**_

Continuing where we left off, we now import our presentational components. 

```
// These three components you can change the HTML to customize if needed.
import Loading from './components/presentational/Loading.jsx';
import Login from './components/presentational/Login.jsx';
import Logout from './components/presentational/Logout.jsx';
```

_**STEP 5 - Redux DevTools**_

Its also nice to use Redux DevTools to see the state.

```
// Please install Redux DevTools extension for your browser
// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
```

_**STEP 6 - Facebook Login config**_

Configure your appId you can get from [facebook for developers](https://developers.facebook.com/apps/). Leave the other fields as they are:

```
const config = {
    appId            : '1234567890',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.0'    
}
```

_**STEP 7 - Initialize the Facebook SDK**_

Let's asynchronously load the Facebook SDK for JavaScript. We'll need this to pass to our Higher Order Component in the next step.

```
const facebookSDK = FacebookInit(config);
//const facebookSDK = FacebookInit(config, true); //enable debug mode
```

_**STEP 8 - Pass our presentational components to our Facebook Login HOC**_

We pass Login, Logout, Loading, and the facebookSDK as follows:

```
const FacebookLoginLogout = FacebookAuth({
    Login, 
    Logout, 
    Loading
}, facebookSDK);
```

_**STEP 9 - Finish off with the usual Redux and React code**_

One thing to mention is that under the hood, react-redux-facebook-login-hoc uses redux-thunk (Async Actions) which is why we applyMiddleware.

```
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
```

### If you are starting from scratch, check out the [demo](demo) directory to get up and running quickly.
