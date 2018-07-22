import axiosInstance from '../../axiosInstance';
import * as actionTypes from './actionTypes';

export const loginUser = user => ({
    type: actionTypes.LOGIN_USER,
    payload: user
});

export const logoutUser = () => ({
    type: actionTypes.LOGOUT_USER
});

export const register = (email, password, name) => {
    // TODO move base url into the config
    return dispatch => {
        axiosInstance.post('register', { email, password, name }).then(response => {
            if (response.data.user.id) {
                // FIXME probably, there is a proper way to update header's token after user's authorization
                axiosInstance.defaults.headers.common['sessionId'] = response.data.sessionId;
                localStorage.setItem('sessionId', response.data.sessionId);
                dispatch(loginUser(response.data.user));
            }
        });
    };
};

export const login = (email, password) => {
    return dispatch => {
        axiosInstance.post('login', { email, password }).then(response => {
            if (response.data.user.id) {
                // FIXME probably, there is a proper way to update header's token after user's authorization
                axiosInstance.defaults.headers.common['sessionId'] = response.data.sessionId;
                localStorage.setItem('sessionId', response.data.sessionId);
                dispatch(loginUser(response.data.user));
            }
        });
    };
};

export const logout = () => {
    return dispatch => {
        axiosInstance.get('logout').then(() => {
            // FIXME probably, there is a proper way to update header's token after user's authorization
            axiosInstance.defaults.headers.common['sessionId'] = null;
            localStorage.removeItem('sessionId');
            dispatch(logoutUser());
        });
    };
};