import * as actionTypes from './actionTypes';
import * as actions from './actions';
import axios from '../axios-instance';

const initialState = {
    persons: [],
    personLabels: {
        firstName: 'Vorname',
        lastName: 'Nachname',
        address: 'Adresse',
        zipcode: 'Postleitzahl',
        city: 'Stadt'
    },
    loading: true,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PERSONS:
            axios.get('personss')
                .then(res => action.asyncDispatch(actions.fetchPersonsResponse(res.data)))
                .catch(err => action.asyncDispatch(actions.fetchPersonsError(err)))
            return {
                ...state,
                loading: true,
                error: false
            }
        case actionTypes.FETCH_PERSONS_RESPONSE:
            return {
                ...state,
                loading: false,
                error: false,
                persons: action.persons
            }
        case actionTypes.FETCH_PERSONS_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }
        default: 
            return {
                ...state
            }
    }
}

export default reducer;