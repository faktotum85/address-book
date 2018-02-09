import * as actionTypes from '../actionTypes';

export const signup = (username, password) => {
    return {
        type: actionTypes.SIGNUP,
        username,
        password
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
    return {
        type: actionTypes.LOGIN,
        username,
        password
    }
}

export const loginResponse = res => {
    return {
        type: actionTypes.LOGIN_RESPONSE,
        token: res.data.token
    }
}

export const loginError = err => {
    console.log(err);
    return {
        type: actionTypes.LOGIN_ERROR,
        err
    }
}
