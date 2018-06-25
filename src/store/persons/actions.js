import * as actionTypes from '../actionTypes';
import axios from '../../axios-instance';
import { push } from 'react-router-redux';

export const fetchPersons = (limit = 10, offset = 0, token) => {
    const query = new URLSearchParams();
    query.set('limit', limit);
    query.set('offset', offset);
    return dispatch => {
        dispatch(fetchPersonsStart());
        return axios.get(`persons?${query}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
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

export const fetchPerson = (id, token) => {
    return dispatch => {
        dispatch(fetchPersonStart());
        return axios.get('persons/' + id, {
            headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
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

export const savePerson = (id, person, token) => {
    return dispatch => {
        dispatch(savePersonStart());
        if (id) {
            return axios.put('persons/' + id, person, {
                headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    dispatch(savePersonResponse(res.data));
                    dispatch(push('/persons'));
                })
                .catch(error => dispatch(savePersonError(error)))
        } else {
            return axios.post('persons', person, {
                headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
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

export const deletePerson = (id, token) => {
    return dispatch => {
        dispatch(deletePersonStart());
        return axios.delete('persons/' + id, {
            headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                dispatch(deletePersonResponse(res.data));
                dispatch(fetchPersons(null, null, token));
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
