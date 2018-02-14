import * as actionTypes from '../actionTypes';

export const fetchPersons = (limit, offset) => {
    const query = new URLSearchParams();
    query.set('limit', limit || 10);
    query.set('offset', offset || 0);
    return {
        type: actionTypes.FETCH_PERSONS,
        query: `?${query.toString()}`
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
    return {
        type: actionTypes.FETCH_PERSON,
        id
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

export const savePerson = (id) => {
    return {
        type: actionTypes.SAVE_PERSON,
        id
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
    return {
        type: actionTypes.DELETE_PERSON,
        id
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
