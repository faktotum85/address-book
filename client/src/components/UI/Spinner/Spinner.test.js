import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

describe('Spinner', () => {
    it('renders a div with the Loader class', () => {
        const spinner = shallow(<Spinner />);
        expect(spinner.find('div.Loader').exists()).toBe(true);
    });
});