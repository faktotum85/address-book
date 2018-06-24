import React from 'react';
import { shallow } from 'enzyme';

import { Auth } from './Auth';

const auth = shallow(<Auth />);

it('initializes state with an empty username and password', () => {
    expect(auth.state()).toEqual({
        username: '',
        password: ''
    });
});