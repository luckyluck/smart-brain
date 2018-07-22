import { push } from 'react-router-redux';
import axiosInstance from '../../axiosInstance';
import * as actionTypes from './actionTypes';

export const loadUser = user => ({
    type: actionTypes.LOAD_USER,
    payload: user
});

export const auth = (email, password, name) => {
    // TODO move base url into the config
    return dispatch => {
        axiosInstance.post('register', { email, password, name }).then(response => {
            if (response.data.user.id) {
                // FIXME probably, there is a proper way to update header's token after user's authorization
                axiosInstance.defaults.headers.common['sessionId'] = response.data.sessionId;
                localStorage.setItem('sessionId', response.data.sessionId);
                dispatch(loadUser(response.data.user));
                dispatch(push('/'));
            }
        });
    };
};

export const signIn = (email, password) => {
    return dispatch => {
        axiosInstance.post('login', { email, password }).then(response => {
            if (response.data.user.id) {
                // FIXME probably, there is a proper way to update header's token after user's authorization
                axiosInstance.defaults.headers.common['sessionId'] = response.data.sessionId;
                localStorage.setItem('sessionId', response.data.sessionId);
                dispatch(loadUser(response.data.user));
                dispatch(push('/'));
            }
        });
    };
};