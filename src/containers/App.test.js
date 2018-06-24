import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
    let shallowApp;
    const app = () => {
        if (!shallowApp) {
            shallowApp = shallow(
                <App />
            )
        }
        return shallowApp;
    }

    beforeEach(() => {
        shallowApp = undefined;
    });

    it('always renders a nav', () => {
        const navs = app().find('nav');
        expect(navs.length).toBe(1);
    });
    it('always renders a main', () => {
        const main = app().find('main');
        expect(main.length).toBe(1);
    });
});