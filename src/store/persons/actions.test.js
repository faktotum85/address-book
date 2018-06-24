import * as actionTypes from '../actionTypes';
import * as actions from './actions';
import thunk from 'redux-thunk';
import configureMockstore from 'redux-mock-store';
import axios from '../../axios-instance';
import MockAdapter from 'axios-mock-adapter';

const createMockStore = configureMockstore([thunk]);
const initialState = {
    persons: [],
    loading: false, 
    error: false
};

const mock = new MockAdapter(axios);

let store;

describe('persons actions', () => {    
    describe('fetchPersons', () => {
        const query = '/persons?limit=10&offset=0';

        beforeEach(() => {
            store = createMockStore(initialState);
        });

        it('dispatches a FETCH_PERSONS action', () => {
            return store.dispatch(actions.fetchPersons()).then(() => {
                expect(store.getActions()[0]).toEqual({ type: actionTypes.FETCH_PERSONS});
            });
        });

        it('dispatches a FETCH_PERSONS_RESPONSE action if the fetch is successfull', () => {
            const mockData = {
                persons: []
            };

            mock.onGet(query).reply(200, mockData);

            const expectedAction = {
                type: actionTypes.FETCH_PERSONS_RESPONSE,
                data: mockData
            };

            return store.dispatch(actions.fetchPersons()).then(() => {
                expect(store.getActions()[1]).toEqual(expectedAction);
            });
        });

        it('dispatches a FETCH_PERSONS_ERROR action if the fetch fails', () => {
            mock.onGet(query).reply(404);

            return store.dispatch(actions.fetchPersons()).then(() => {
                expect(store.getActions()[1].type).toBe(actionTypes.FETCH_PERSONS_ERROR);
            });
        });
    });
});