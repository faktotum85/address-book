import * as actionTypes from '../actionTypes';

const initialState = {
    config: {
        username: {
            type: 'text',
            label: 'Username',
            required: true
        },
        password: {
            type: 'password',
            label: 'Password',
            required: true
        }
    },
    token: null,
    username: null,
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SIGNUP:
            return {
                ...state,
                error: null,
                loading: true,
            }
        case actionTypes.SIGNUP_RESPONSE: 
            return {
                ...state,
                token: action.token,
                username: action.username,
                loading: false,
                error: null
            }
        case actionTypes.SIGNUP_ERROR: 
            return {
                ...state,
                error: action.error.response.data.message,
                loading: false
            }
        case actionTypes.LOGIN:
            return {
                ...state,
                error: null,
                loading: true,
            }
        case actionTypes.LOGIN_RESPONSE:
            return {
                ...state,
                token: action.token,
                username: action.username,
                loading: false,
                error: null
            }
        case actionTypes.LOGIN_ERROR:
            return {
                ...state,
                error: action.error.response.data.message,
                loading: false
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null,
                username: null
            }
        default: 
            return state;
    }
    
}

export default reducer;