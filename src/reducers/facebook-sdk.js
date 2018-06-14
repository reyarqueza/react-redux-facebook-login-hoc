import * as actions from '../actions';

const FacebookSDK = (state={}, action) => {

    switch (action.type) { 
        case actions.FACEBOOK_API_ME:
        case actions.FACEBOOK_GET_LOGIN_STATUS:
        case actions.FACEBOOK_LOGIN:
        case actions.FACEBOOK_LOGOUT:
            return {
                ...state,
                ...action.facebook
            }
        default:
            return state;
    }
}

export default FacebookSDK;