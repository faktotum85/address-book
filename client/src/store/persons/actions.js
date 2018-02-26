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
            .catch(error => dispatch(fetchPersonsError(error)));
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

export const fetchPersonsError = (error) => {
    return {
        type: actionTypes.FETCH_PERSONS_ERROR,
        error
    }
}

export const fetchPerson = (id) => {
    return dispatch => {
        dispatch(fetchPersonStart());
        return axios.get('persons/' + id)
            .then(res => dispatch(fetchPersonResponse(res.data)))
            .catch(error => dispatch(fetchPersonError(error)));
    }
}

export const fetchPersonStart = () => {
    return {
        type: actionTypes.FETCH_PERSON,
    }
}

export const fetchPersonResponse = (data) => {
    return {
        type: actionTypes.FETCH_PERSON_RESPONSE,
        data
    }
}

export const fetchPersonError = (error) => {
    return {
        type: actionTypes.FETCH_PERSON_ERROR,
        error
    }
}

export const clearPerson = () => {
    return {
        type: actionTypes.CLEAR_PERSON
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
                .catch(error => dispatch(savePersonError(error)))
        } else {
            return axios.post('persons', person)
                .then(res => {
                    dispatch(savePersonResponse(res.data));
                    dispatch(push('/persons'));
                })
                .catch(error => dispatch(savePersonError(error)))
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

export const savePersonError = (error) => {
    return {
        type: actionTypes.SAVE_PERSON_ERROR,
        error
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
            .catch(error => dispatch(deletePersonError(error)))
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

export const deletePersonError = (error) => {
    return {
        type: actionTypes.DELETE_PERSON_ERROR,
        error
    }
}
