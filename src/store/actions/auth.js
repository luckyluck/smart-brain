import { push } from 'react-router-redux';
import axios from 'axios';
import * as actionTypes from './actionTypes';

export const loadUser = user => ({
    type: actionTypes.LOAD_USER,
    payload: user
});

export const auth = (email, password, name) => {
    // TODO move base url into the config
    return dispatch => {
        axios.post(
            'http://localhost:3001/register',
            { email, password, name }
        ).then(response => {
            if (response.data.id) {
                dispatch(loadUser(response.data));
                dispatch(push('/'));
            }
        });
    };
};

export const signIn = (email, password) => {
    return dispatch => {
        axios.post(
            'http://localhost:3001/signin',
            { email, password }
        ).then(response => {
            if (response.data.id) {
                dispatch(loadUser(response.data));
                dispatch(push('/'));
            }
        });
    };
};