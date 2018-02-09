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
            {
                const user = {
                    username: action.username,
                    password: action.password
                };
                axios.post('/users', user)
                    .then(res => action.asyncDispatch(actions.signupResponse(res)))
                    .catch(err => action.asyncDispatch(actions.signupError(err)));
            }    
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
            {
                const user = {
                    username: action.username,
                    password: action.password
                };
                axios.post('/users/authenticate', user)
                    .then(res => action.asyncDispatch(actions.loginResponse(res)))
                    .catch(err => action.asyncDispatch(actions.loginError(err)));
            }
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