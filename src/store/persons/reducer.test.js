import reducer from './reducer';
import * as actionTypes from '../actionTypes';

describe('persons reducer', () => {
    const mockPersonResponse = {
        "_id": "5a77182164e04021388ceca7",
        "firstName": "Max",
        "lastName": "Mustermann",
        "address": "Musterstr. 123",
        "zipcode": "12345",
        "city": "Musterstadt",
        "__v": 0
    };

    const mockPersonsResponse = {
        "_links": {
            "base": "http://localhost:3001/api",
            "self": "/persons/?limit=10&offset=10",
            "prev": "/persons?limit=10&offset=0",
            "first": "/persons?limit=10&offset=0"
        },
        "results": [
            mockPersonResponse
        ],
    };

    it ('initializes the state if no previous state is passed in', () => {
        expect(reducer(undefined, {}).persons).toEqual([]);
    });

    it('sets loading to true and error to false for a FETCH_PERSONS action', () => {
        expect(reducer({},{type: actionTypes.FETCH_PERSONS})).toEqual({loading: true, error: null});
    });

    it('sets loading and error to false and parses the relevant data for a FETCH_PERSONS_RESPONSE action', () => {
        const nextState = reducer({}, { type: actionTypes.FETCH_PERSONS_RESPONSE, data: mockPersonsResponse});
        expect(nextState).toEqual({
            loading: false,
            error: null,
            persons: mockPersonsResponse.results,
            pagination_first: mockPersonsResponse._links.first,
            pagination_prev: mockPersonsResponse._links.prev,
            pagination_next: mockPersonsResponse._links.next,
            pagination_last: mockPersonsResponse._links.last,
            pagination_count: mockPersonsResponse.count,
            pagination_start: mockPersonsResponse.start
        });
    });

    it('sets loading to false and passes on the error for a FETCH_PERSONS_ERROR action', () => {
        expect(reducer({}, { type: actionTypes.FETCH_PERSONS_ERROR, error: 'I am an error message' })).toEqual({ loading: false, error: 'I am an error message' });
    });

    it('sets loading to true and error to false for a FETCH_PERSON action', () => {
        expect(reducer({}, { type: actionTypes.FETCH_PERSON })).toEqual({ loading: true, error: null });
    });

    it('sets loading and error to false and parses the relevant data for a FETCH_PERSON_RESPONSE action', () => {
        const nextState = reducer({}, { type: actionTypes.FETCH_PERSON_RESPONSE, data: mockPersonResponse });
        expect(nextState).toEqual({
            loading: false,
            error: null,
            person: mockPersonResponse
        });
    });

    it('sets loading to false and passes on the error for a FETCH_PERSON_ERROR action', () => {
        expect(reducer({}, { type: actionTypes.FETCH_PERSON_ERROR, error: 'I am an error message' })).toEqual({ loading: false, error: 'I am an error message' });
    });

    it('clears the person property for a CLEAR_PERSON action', () => {
        expect(reducer({person: mockPersonResponse}, { type: actionTypes.CLEAR_PERSON })).toEqual({person: {}});
    });

    it('changes the property `name` of person to `value` for a CHANGE_PERSON_PROPERTY action', () => {
        expect(reducer({person: mockPersonResponse}, { type: actionTypes.CHANGE_PERSON_PROPERTY, name: 'firstName', value: 'Simon'}))
            .toEqual({person: {...mockPersonResponse, firstName: 'Simon'}});
    });

    it('sets loading to true and error to false for a SAVE_PERSON action', () => {
        expect(reducer({}, { type: actionTypes.SAVE_PERSON })).toEqual({ loading: true, error: null });
    });

    it('sets loading and error to false for a SAVE_PERSON_RESPONSE action', () => {
        expect(reducer({}, { type: actionTypes.SAVE_PERSON_RESPONSE })).toEqual({ loading: false, error: null });
    }); 

    it('sets loading to false and passes on the error for a SAVE_PERSON_ERROR action', () => {
        expect(reducer({}, { type: actionTypes.SAVE_PERSON_ERROR, error: 'I am an error message' })).toEqual({ loading: false, error: 'I am an error message' });
    });

    it('sets loading to true and error to false for a DELETE_PERSON action', () => {
        expect(reducer({}, { type: actionTypes.DELETE_PERSON })).toEqual({ loading: true, error: null });
    });

    it('sets loading and error to false for a DELETE_PERSON_RESPONSE action', () => {
        expect(reducer({}, { type: actionTypes.DELETE_PERSON_RESPONSE })).toEqual({ loading: false, error: null });
    });

    it('sets loading to false and passes on the error for a DELETE_PERSON_ERROR action', () => {
        expect(reducer({}, { type: actionTypes.DELETE_PERSON_ERROR, error: 'I am an error message' })).toEqual({ loading: false, error: 'I am an error message' });
    });

    it('returns the previous state by default', () => {
        const oldState = {};
        expect(reducer(oldState, { type: '' })).toBe(oldState);
    });

});