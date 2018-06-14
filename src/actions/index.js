/* main actions */

export const FACEBOOK_GET_LOGIN_STATUS = 'FACEBOOK_GET_LOGIN_STATUS';
const facebookGetLoginStatus = (response, fb, dispatch) => {
    if (response.status === 'connected') {
        dispatch(facebookGraphApiMe(fb))  
    }

    return {
        type: FACEBOOK_GET_LOGIN_STATUS,
        facebook: response
    } 
};

export const FACEBOOK_GET_LOGIN_STATUS_PROMISE = 'FACEBOOK_GET_LOGIN_STATUS_PROMISE';
export const facebookGetLoginStatusPromise = fb => dispatch => {
    fb.then(fb => {
        fb.getLoginStatus(response => {
            dispatch(facebookGetLoginStatus(response, fb, dispatch));
        });
    }).catch(error => console.log(error));
};

export const FACEBOOK_API_ME = 'FACEBOOK_API_ME';
const facebookApiMe = response => {
    return {
        type: FACEBOOK_API_ME,
        facebook: response
    }
}

export const FACEBOOK_GRAPH_API_ME = 'FACEBOOK_GRAPH_API_ME';
export const facebookGraphApiMe = fb => dispatch => {
    fb.api('/me', { 
        locale: 'en_US', 
        fields: 'first_name,last_name,picture'
    }, response => {
        dispatch(facebookApiMe(response));
    });
}

export const FACEBOOK_LOGIN = 'FACEBOOK_LOGIN';
const facebookLogin = (response, fb, dispatch) => {
    const facebook = {
        status: response.status
    }
    dispatch(facebookGraphApiMe(fb)) 
    return {
        type: FACEBOOK_LOGIN,
        facebook
    }
}

export const FACEBOOK_LOGIN_PROMISE = 'FACEBOOK_LOGIN_PROMISE';
export const facebookLoginPromise = fb => dispatch => {
    fb.then(fb => {
        fb.login(response => {
            dispatch(facebookLogin(response, fb, dispatch));
        });
    }).catch(error => console.log(error));
}

export const FACEBOOK_LOGOUT = 'FACEBOOK_LOGOUT';
const facebookLogout = response => {
    const facebook = {
        status: response.status
    }
    return {
        type: FACEBOOK_LOGOUT,
        facebook
    }
}

export const FACEBOOK_LOGOUT_PROMISE = 'FACEBOOK_LOGOUT_PROMISE';
export const facebookLogoutPromise = fb => dispatch => {
    fb.then(fb => {
        fb.logout(response => {
            dispatch(facebookLogout(response));
        });
    }).catch(error => console.log(error));
}
