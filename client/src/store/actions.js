import * as actionTypes from './actionTypes';

export const fetchPersons = () => {
    return {
        type: actionTypes.FETCH_PERSONS
    }
}

export const fetchPersonsResponse = (persons) => {
    return {
        type: actionTypes.FETCH_PERSONS_RESPONSE,
        persons
    }
}

export const fetchPersonsError = (err) => {
    return {
        type: actionTypes.FETCH_PERSONS_ERROR,
        err
    }
}