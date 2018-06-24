import reducer from './reducer';
import * as actionTypes from '../actionTypes';

describe('auth reducer', () => {
    const mockLoginResponse = {
        token: 'abc',
        username: 'My Username',
    };

    it ('initializes the state if no previous state is passed in', () => {
        expect(reducer(undefined, {}).token).toEqual(null);
        expect(reducer(undefined, {}).username).toEqual(null);
    });

    it('sets loading to true and error to false for a LOGIN action', () => {
        expect(reducer({},{type: actionTypes.LOGIN})).toEqual({loading: true, error: null});
    });

    it('sets loading and error to false and parses the relevant data for a LOGIN_RESPONSE action', () => {
        const nextState = reducer({}, { 
            type: actionTypes.LOGIN_RESPONSE, 
            token: mockLoginResponse.token, 
            username: mockLoginResponse.username 
        });

        expect(nextState).toEqual({
            loading: false,
            error: null,
            token: mockLoginResponse.token,
            username: mockLoginResponse.username,
        });
    });

    it('sets loading to false and passes on the error for a LOGIN_ERROR action', () => {
        expect(reducer({}, { type: actionTypes.LOGIN_ERROR, error: {
            response: {
                data: {
                    message: 'I am an error message'
                }
            }
        } })).toEqual({ loading: false, error: 'I am an error message' });
    });
})