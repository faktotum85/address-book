import * as actionTypes from '../actionTypes';
import axios from '../../axios-instance';
import { push } from 'react-router-redux'

export const signup = (username, password) => {
    const user = {
        username,
        password
    };
    return dispatch => {
        dispatch(signupStart);
        return axios.post('/users', user)
            .then(res => {
                dispatch(signupResponse(res));
                dispatch(push('/'));
            })
            .catch(error => dispatch(signupError(error)));
    }
}

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP,
    }
}

export const signupResponse = res => {
    return {
        type: actionTypes.SIGNUP_RESPONSE,
        token: res.data.token,
        username: res.data.username
    }
}

export const signupError = error => {
    return {
        type: actionTypes.SIGNUP_ERROR,
        error
    }
}

export const login = (username, password) => {
    const user = {
        username,
        password
    };
    return dispatch => {
        dispatch(loginStart());
        return axios.post('/users/authenticate', user)
            .then(res => {
                dispatch(loginResponse(res));
                dispatch(push('/'));
            })
            .catch(error => dispatch(loginError(error)));
    }
}

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN,
    }
}

export const loginResponse = res => {
    return {
        type: actionTypes.LOGIN_RESPONSE,
        token: res.data.token,
        username: res.data.username
    }
}

export const loginError = error => {
    return {
        type: actionTypes.LOGIN_ERROR,
        error
    }
}

export const logoutStart = () => {
    return dispatch => {
        dispatch(logout());
        dispatch(push('/login'));
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    }
}