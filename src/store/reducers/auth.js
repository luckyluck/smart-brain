import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: {},
    isSignedIn: false
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER: {
            return {
                user: action.payload,
                isSignedIn: true
            };
        }
        case actionTypes.LOGOUT_USER: {
            return {
                user: {},
                isSignedIn: false
            };
        }
        default:
            return state;
    }
};

export default auth;