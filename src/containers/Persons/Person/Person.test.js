import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import Person from './Person';

describe('Person', () => {
    let shallowPerson;
    let props, store, initialState;
    const mockStore = configureStore();

    const makePerson = (props, state) => {
        if (!shallowPerson) {
            store = mockStore(state);
            shallowPerson = shallow(
                <Person {...props} store={store} />
            ).shallow();
            return shallowPerson;
        }
    }

    beforeEach(() => {
        shallowPerson = undefined;
        props = {
            match: {
                params: {}
            }
        };
        initialState = {
            persons: {
                config: {},
                person: {},
                loading: false
            },
            auth: {}
        }
    });

    it('renders correctly', () => {
        const shallowPerson = makePerson(props, initialState);
        expect(shallowPerson).toMatchSnapshot();
    });

    it('renders a Spinner if loading', () => {
        initialState.persons.loading = true;
        const shallowPerson = makePerson(props, initialState);
        expect(shallowPerson.find('Spinner').exists()).toBe(true);
    });
});