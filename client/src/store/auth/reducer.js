import * as actionTypes from '../actionTypes';
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
    token: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SIGNUP:
            console.log('Got this data to submit to the API', action.username, action.password);
            return state;
        default: 
            return state;
    }
    
}

export default reducer;