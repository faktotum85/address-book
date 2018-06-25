import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import * as actions from '../../../store/actionTypes';

import ConnectedPersonsList, { PersonsList } from './PersonsList';

describe('ConnectedPersonsList', () => {
    let shallowConnectedPersonsList, shallowPersonsList;
    let props, store, initialState;
    const mockStore = configureStore([thunk]);

    const makeConnectedPersonsList = (props, initialState) => {
        if (!shallowConnectedPersonsList) {
            store = mockStore(initialState);
            shallowConnectedPersonsList = shallow(
                <ConnectedPersonsList {...props} store={store} />
            ).shallow();
            return shallowConnectedPersonsList;
        }
    }

    const makePersonsList = (props) => {
        if (!shallowPersonsList) {
            shallowPersonsList = shallow(
                <PersonsList {...props} />
            );
            return shallowPersonsList;
        }
    }

    beforeEach(() => {
        shallowConnectedPersonsList = undefined;
        shallowPersonsList = undefined;
        props = {
            location: {}
        };
        initialState = {
            persons: {
                config: {},
                person: {},
                loading: false,
                pagination_first: '',
                pagination_prev: '',
                pagination_next: '',
                pagination_last: '',
                pagination_count: '',
                pagination_start: '',
            },
            auth: {}
        };
    });

    it('renders correctly', () => {
        const shallowConnectedPersonsList = makeConnectedPersonsList(props, initialState);
        expect(shallowConnectedPersonsList).toMatchSnapshot();
    });

    it('renders a Spinner if loading', () => {
        initialState.persons.loading = true;
        const shallowConnectedPersonsList = makeConnectedPersonsList(props, initialState);
        expect(shallowConnectedPersonsList.find('Spinner').exists()).toBe(true);
    });

    it('calls props.fetchPersons when mounting', () => {
        const fetchPersons = jest.fn();
        props.fetchPersons = fetchPersons;
        makePersonsList(props);
        expect(fetchPersons).toBeCalled();
    });

    it('calls props.fetchPersons again if new search params are passed in as props', () => {
        const fetchPersons = jest.fn();
        const shallowPersonsList = makePersonsList({ location: { search: '?limit=5&offset=0' }, fetchPersons });
        shallowPersonsList.setProps({ location: { search: '?limit=5&offset=10' }, fetchPersons });
        expect(fetchPersons.mock.calls.length).toBe(2);
    });

    it('does not call props.fetchPersons twice unless the search params actually change', () => {
        const fetchPersons = jest.fn();
        const shallowPersonsList = makePersonsList({ location: { search: '?limit=5&offset=10' }, fetchPersons });
        shallowPersonsList.setProps({ location: { search: '?limit=5&offset=10' }, fetchPersons });
        expect(fetchPersons.mock.calls.length).toBe(1);
    });
});