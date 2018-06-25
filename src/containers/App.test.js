import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';

import {ConnectedApp, App} from './App';

describe('App', () => {
    let shallowApp, shallowConnectedApp;
    let store, initialState;
    const mockStore = configureStore([thunk]);

    const app = () => {
        if (!shallowApp) {
            shallowApp = shallow(
                <App />
            )
        }
        return shallowApp;
    }

    const makeConnectedApp = (initialState) => {
        if (!shallowConnectedApp) {
            store = mockStore(initialState);
            shallowConnectedApp = shallow(
                <ConnectedApp store={store}/>
            ).shallow();
        }
        return shallowConnectedApp;
    }

    beforeEach(() => {
        shallowApp = undefined;
        shallowConnectedApp = undefined;
        initialState = {
            auth: {
                username: 'Simon Weller',
            }
        }
    });

    it('always renders a nav', () => {
        const navs = app().find('nav');
        expect(navs.length).toBe(1);
    });

    it('always renders a main', () => {
        const main = app().find('main');
        expect(main.length).toBe(1);
    });

    it('renders a logout link if a user is logged in', () =>  {
        const app = makeConnectedApp({
            auth: {
                username: 'Simon Weller',
            }
        });
        expect(app.find('#logout').length).toBe(1);
        expect(app.find('NavLink[to="/login"]').length).toBe(0);
        expect(app.find('NavLink[to="/signup"]').length).toBe(0);    });

    it(`renders a login and signup link if no user is logged in`, () =>  {
        const app = makeConnectedApp({
            auth: {
                username: null,
            }
        });
        expect(app.find('#logout').length).toBe(0);
        expect(app.find('NavLink[to="/login"]').length).toBe(1);
        expect(app.find('NavLink[to="/signup"]').length).toBe(1);
    });
});