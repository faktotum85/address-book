import * as actionTypes from '../actionTypes';
import * as actions from './actions';

describe('fetchPersons action creator', () => {
    it('always returns a fetchPersons action with a limit and an offset param in the query', () => {
        expect(actions.fetchPersons()).toEqual({
            type: actionTypes.FETCH_PERSONS,
            query: '?limit=10&offset=0'
        });
    });
    it('overrides the limit and offset param with any values that are passed in', () => {
        expect(actions.fetchPersons(5, 15)).toEqual({
            type: actionTypes.FETCH_PERSONS,
            query: '?limit=5&offset=15'
        });
    });
})