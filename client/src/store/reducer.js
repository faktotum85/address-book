import * as actionTypes from './actionTypes';
import * as actions from './actions';
import axios from '../axios-instance';
import { push } from 'react-router-redux';

const initialState = {
    personLabels: {
        firstName: 'Vorname',
        lastName: 'Nachname',
        address: 'Adresse',
        zipcode: 'Postleitzahl',
        city: 'Stadt'
    },
    persons: [],
    person: {},
    loading: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PERSONS:
            axios.get('persons')
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
                error: action.err
            }
        case actionTypes.FETCH_PERSON:
            axios.get('persons/' + action.id)
                .then(res => action.asyncDispatch(actions.fetchPersonResponse(res.data)))
                .catch(err => action.asyncDispatch(actions.fetchPersonError(err)))
            return {
                ...state,
                loading: true,
                error: false
            }
        case actionTypes.FETCH_PERSON_RESPONSE:
            return {
                ...state,
                loading: false,
                error: false,
                person: action.person
            }
        case actionTypes.FETCH_PERSON_ERROR:
            return {
                ...state,
                loading: false,
                error: action.err
            }
        case actionTypes.CHANGE_PERSON_PROPERTY:
            return {
                ...state,
                person: {
                    ...state.person,
                    [action.name]: action.value
                }
            }
        case actionTypes.SAVE_PERSON:
            if(action.id) {
                axios.put('persons/' + action.id, state.person)
                    .then(res => {
                        action.asyncDispatch(actions.savePersonResponse(res.data));
                        action.asyncDispatch(push('/persons'));
                    })
                    .catch(err => action.asyncDispatch(actions.savePersonError(err)))
            } else {
                axios.post('persons', state.person)
                    .then(res => {
                        action.asyncDispatch(actions.savePersonResponse(res.data));
                        action.asyncDispatch(push('/persons'));
                    })
                    .catch(err => action.asyncDispatch(actions.savePersonError(err)))
            }
            return {
                ...state,
                loading: true
            };
        case actionTypes.SAVE_PERSON_RESPONSE:
            return {
                ...state, 
                loading: false,
            };
        case actionTypes.SAVE_PERSON_ERROR:
            return {
                ...state,
                loading: false,
                error: action.err
            };
        case actionTypes.DELETE_PERSON: 
            axios.delete('persons/' + action.id)
                .then(res => {
                    action.asyncDispatch(actions.deletePersonResponse(res.data));
                    action.asyncDispatch(actions.fetchPersons());
                })
                .catch(err => action.asyncDispatch(actions.deletePersonError(err)))
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_PERSON_RESPONSE:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_PERSON_ERROR:
            return {
                ...state,
                loading: false,
                error: action.err
            }
        default: 
            return {
                ...state
            }
    }
}

export default reducer;