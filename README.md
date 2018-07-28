# react-redux-facebook-login-hoc

This component is a react-redux wrapper around the facebook sdk which implements [Facebook Login](https://developers.facebook.com/docs/facebook-login/).

### Demo
To run the demo:

Add your facebook app id in the [demo/config.js](demo/config.js) file on the line 18:

```
    appId            : '<add your facebook app id here>',
```

```
npm install
npm start
```

You'll see the following.

#### After Logging In
I'm showing the logged in state first, to demonstrate that in addition to the Facebook Login, I'm also using the Graph API to pull in the user's picture and name. I thought I should show this first because at the time I made this, I couldn't find this feature in other React implementations of Facebook Login.

![Logout screenshot](demo/screenshots/screen-logout.png)

#### Login
As for the loggged out state, this feature is quite common in other React implementations.

![Login screenshot](demo/screenshots/screen-login.png)


Notice for debugging that I have the chrome plugin support for [Redux DevTools](https://www.npmjs.com/package/redux-devtools).

### Features
You'll find various React implementations on Github for [Facebook Login](https://developers.facebook.com/docs/facebook-login/), and I originally tried a few of those. However, I decided to create my own because I needed these features:

1. The logged in user's picture and name.
1. A logout link.
1. Easy to re-use by encapsulating the Facebook SDK details, so that a React developer who needed this component didn't need to learn the Facebook SDK.
1. State lives in a single source of truth (redux) instead of the component's internal state.
1. Callbacks to handle onLogin and onLogout (useful for routing after a successful login or logout call).
1. (Optional) From the demo directory, there are three presentational components with default styles (in an external css file), which can also be edited for custom branding:
    * Login
    * Loading
    * Logout

### Advantages for the designer
The designer doesn't need to understand React. The designer can edit the HTML/CSS of the Presentational Components in the demo folder and basically use the existing webpack build system to preview his/her work. *(See how to start the demo at the beginning of this doc.)*

### The React Developer
The React Developer can then take the edited presentational components and easily pass the presentational components to the HOC (higher order component). Or the React Developer can pass 3rd party components to the HOC (for example pass Material-UI components to the HOC).

### Requirements
For the React Developer, I will assume you have your own build system (whether it is home grown with gulp, webpack, or build systems on top of webpack like create-react-app). Your build system's transpiler must support the following babel presets:

1. react : needed for [JSX](https://babeljs.io/docs/en/babel-preset-react)
1. stage-2 : needed for [transform-object-rest-spread](https://babeljs.io/docs/en/babel-preset-stage-2)

Its possible that your build system's transpiler already supports this. 

### Misc Dependencies
You'll also need to npm install --save-dev the following:

* lodash.isempty

### Usage
Check out the [demo](demo) directory to get up and running quickly. Notice that this demo also uses React Router v4. I've used it with Material UI in another project, and if there is a need to make a public demo used with Material UI, I can publish that too in the near future.

### Breaking changes.
This version 2.x is not backwards compatible with the old version. The old version was just not flexible enough to be used with Routing and 3rd party UI Components like Material UI. So I've decided to abandon version 1.x which you can find [here](https://github.com/reyarqueza/react-redux-facebook-login-hoc/tree/v1.0.10).
