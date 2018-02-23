import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import PersonsList from './PersonsList';

describe('PersonsList', () => {
    let shallowPersonsList;
    let props;
    let store
    const initialState = {
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
        }
    }
    const mockStore = configureStore();

    const makePersonsList = (props) => {
        if (!shallowPersonsList) {
            store = mockStore(initialState);
            shallowPersonsList = shallow(
                <PersonsList {...props} store={store} />
            );
            return shallowPersonsList;
        }
    }

    beforeEach(() => {
        shallowPersonsList = undefined;
        props = {}
    });

    it('renders correctly', () => {
        const shallowPersonsList = makePersonsList(props);
        expect(shallowPersonsList).toMatchSnapshot();
    });
});