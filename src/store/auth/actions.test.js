import * as actionTypes from '../actionTypes';
import * as actions from './actions';
import thunk from 'redux-thunk';
import configureMockstore from 'redux-mock-store';
import axios from '../../axios-instance';
import MockAdapter from 'axios-mock-adapter';

const createMockStore = configureMockstore([thunk]);
const initialState = {
    token: null,
    loading: false,
    error: null
};

const mock = new MockAdapter(axios);

let store;

describe('auth actions', () => {
    describe('login', () => {
        const query = '/users/authenticate';

        beforeEach(() => {
            store = createMockStore(initialState);
        });

        it('dispatches a LOGIN action', () => {
            return store.dispatch(actions.login('username', 'password')).then(() => {
                expect(store.getActions()[0]).toEqual({type: actionTypes.LOGIN});
            });
        });

        it('dispatches a LOGIN_RESPONSE action if the authentication is sucessfull', () => {
            const mockData = {
                success: true,
                message: 'Authentication successful. Enjoy your token',
                token: 'abc',
                username: 'My User',
            };
                        
            mock.onPost(query).reply(200, mockData);

            const expectedAction = {
                type: actionTypes.LOGIN_RESPONSE,
                token: 'abc',
                username: 'My User',
            };

            return store.dispatch(actions.login()).then(() => {
                expect(store.getActions()[1]).toEqual(expectedAction);
            });
        });

        it('dispatches a LOGIN_ERROR action if the authentication fails', () => {
            const mockData = {
                message: 'Authentication failed. Wrong password'
            };

            mock.onPost(query).reply(401, mockData);

            return store.dispatch(actions.login()).then(() => {
                expect(store.getActions()[1].type).toBe(actionTypes.LOGIN_ERROR);
            });
        });
    });
});