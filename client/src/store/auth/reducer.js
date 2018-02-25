import * as actionTypes from '../actionTypes';
import * as actions from './actions';
import axios from '../../axios-instance';

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
                loading: false,
                error: null
            }
        case actionTypes.SIGNUP_ERROR: 
            return {
                ...state,
                error: action.err.response.data,
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
                loading: false,
                error: null
            }
        case actionTypes.LOGIN_ERROR:
            return {
                ...state,
                error: action.err.response.data,
                loading: false
            }
        default: 
            return state;
    }
    
}

export default reducer;