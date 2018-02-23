import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import Person from './Person';

describe('Person', () => {
    let shallowPerson;
    let props;
    let store
    const initialState = {
        persons: {
            config: {},
            person: {},
            loading: false
        }
    }
    const mockStore = configureStore();

    const makePerson = (props) => {
        if (!shallowPerson) {
            store = mockStore(initialState);
            shallowPerson = shallow(
                <Person {...props} store={store} />
            );
            return shallowPerson;
        }
    }

    beforeEach(() => {
        shallowPerson = undefined;
        props = {}
    });

    it('renders correctly', () => {
        const shallowPerson = makePerson(props);
        expect(shallowPerson).toMatchSnapshot();
    });
});