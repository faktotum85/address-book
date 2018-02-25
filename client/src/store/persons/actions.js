import * as actionTypes from '../actionTypes';
import axios from '../../axios-instance';
import { push } from 'react-router-redux';

export const fetchPersons = (limit, offset) => {
    const query = new URLSearchParams();
    query.set('limit', limit || 10);
    query.set('offset', offset || 0);
    return dispatch => {
        dispatch(fetchPersonsStart);
        return axios.get(`persons?${query}`)
            .then(res => dispatch(fetchPersonsResponse(res.data)))
            .catch(err => dispatch(fetchPersonsError(err)));
    }
}

export const fetchPersonsStart = () => {
    return {
        type: actionTypes.FETCH_PERSONS
    }
}

export const fetchPersonsResponse = (data) => {
    return {
        type: actionTypes.FETCH_PERSONS_RESPONSE,
        data
    }
}

export const fetchPersonsError = (err) => {
    return {
        type: actionTypes.FETCH_PERSONS_ERROR,
        err
    }
}

export const fetchPerson = (id) => {
    return dispatch => {
        dispatch(fetchPersonStart());
        return axios.get('persons/' + id)
            .then(res => dispatch(fetchPersonResponse(res.data)))
            .catch(err => dispatch(fetchPersonError(err)))
        
    }
}

export const fetchPersonStart = () => {
    return {
        type: actionTypes.FETCH_PERSON,
    }
}

export const clearPerson = () => {
    return {
        type: actionTypes.CLEAR_PERSON
    }
}

export const fetchPersonResponse = (person) => {
    return {
        type: actionTypes.FETCH_PERSON_RESPONSE,
        person
    }
}

export const fetchPersonError = (err) => {
    return {
        type: actionTypes.FETCH_PERSON_ERROR,
        err
    }
}

export const changePersonProperty = (name, value) => {
    return {
        type: actionTypes.CHANGE_PERSON_PROPERTY,
        name, 
        value
    }
}

export const savePerson = (id, person) => {
    return dispatch => {
        dispatch(savePersonStart());
        if (id) {
            return axios.put('persons/' + id, person)
                .then(res => {
                    dispatch(savePersonResponse(res.data));
                    dispatch(push('/persons'));
                })
                .catch(err => dispatch(savePersonError(err)))
        } else {
            return axios.post('persons', person)
                .then(res => {
                    dispatch(savePersonResponse(res.data));
                    dispatch(push('/persons'));
                })
                .catch(err => dispatch(savePersonError(err)))
        }
    }
}

export const savePersonStart = () => {
    return {
        type: actionTypes.SAVE_PERSON
    }
}

export const savePersonResponse = () => {
    return {
        type: actionTypes.SAVE_PERSON_RESPONSE
    }
}

export const savePersonError = (err) => {
    return {
        type: actionTypes.SAVE_PERSON_ERROR,
        err
    }
}

export const deletePerson = (id) => {
    return dispatch => {
        dispatch(deletePersonStart);
        return axios.delete('persons/' + id)
            .then(res => {
                dispatch(deletePersonResponse(res.data));
                dispatch(fetchPersons());
            })
            .catch(err => dispatch(deletePersonError(err)))
    }
}

export const deletePersonStart = () => {
    return {
        type: actionTypes.DELETE_PERSON
    }
}

export const deletePersonResponse = (id) => {
    return {
        type: actionTypes.DELETE_PERSON_RESPONSE,
        id
    }
}

export const deletePersonError = (err) => {
    return {
        type: actionTypes.DELETE_PERSON_ERROR,
        err
    }
}
