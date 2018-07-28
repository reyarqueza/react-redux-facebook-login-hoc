import * as actions from '../actions';

const facebookInfo = (state={}, action) => {

    switch (action.type) { 
        case actions.FACEBOOK_API_ME:
        case actions.FACEBOOK_GET_LOGIN_STATUS:
        case actions.FACEBOOK_LOGIN:
            return {
                ...state,
                ...action.facebook
            }
        case actions.FACEBOOK_LOGOUT:
            return {
                ...action.facebook
            };
        default:
            return state;
    }
}

export default facebookInfo;