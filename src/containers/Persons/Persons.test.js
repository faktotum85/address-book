import React from 'react';
import { shallow } from 'enzyme';

import Persons from './Persons';

describe('Persons', () => {
    let shallowPersons;
    let props;

    const makePersons = (props) => {
        if (!shallowPersons) {
            shallowPersons = shallow(
                <Persons {...props} />
            );
            return shallowPersons;
        }
    }

    beforeEach(() => {
        shallowPersons = undefined;
        props = {
            match: {
                url: ''
            }
        }
    });

    it('renders correctly', () => {
        const shallowPersons = makePersons(props);
        expect(shallowPersons).toMatchSnapshot();
    });
});