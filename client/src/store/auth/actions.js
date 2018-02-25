import * as actionTypes from '../actionTypes';
import axios from '../../axios-instance';

export const signup = (username, password) => {
    const user = {
        username,
        password
    };
    return dispatch => {
        dispatch(signupStart);
        return axios.post('/users', user)
            .then(res => dispatch(signupResponse(res)))
            .catch(err => dispatch(signupError(err)));
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
        token: res.data.token
    }
}

export const signupError = err => {
    return {
        type: actionTypes.SIGNUP_ERROR,
        err
    }
}

export const login = (username, password) => {
    const user = {
        username,
        password
    };
    return dispatch => {
        dispatch(loginStart);
        return axios.post('/users/authenticate', user)
            .then(res => dispatch(loginResponse(res)))
            .catch(err => dispatch(loginError(err)));
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
        token: res.data.token
    }
}

export const loginError = err => {
    return {
        type: actionTypes.LOGIN_ERROR,
        err
    }
}
