import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: null,
    isSignedIn: false
};

const auth = (state = initialState, action) => {
    if (action.type === actionTypes.LOAD_USER) {
        return {
            user: action.payload,
            isSignedIn: true
        };
    }

    return state;
};

export default auth;