import * as actionTypes from '../actionTypes';

export const submitSignup = (username, password) => {
    return {
        type: actionTypes.SIGNUP,
        username,
        password
    }
}