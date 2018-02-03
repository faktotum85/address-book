import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducer';
import asyncDispatchMiddleware from './store/middleware/asyncDispatchMiddleware';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    persons: reducer,
    router: routerReducer
});

const history = createHistory();
const reduxRouterMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
        applyMiddleware(asyncDispatchMiddleware, reduxRouterMiddleware)
    ));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();