/**
 * app.jsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'config/history';

// Import root app
import Router from './router';

// Load the favicon
/* eslint-disable import/no-webpack-loader-syntax */
//import '!file-loader?name=[name].[ext]!./static/images/favicon.ico';
/* eslint-enable import/no-webpack-loader-syntax */

// Import CSS reset and Global Styles

// eslint-disable-next-line import/no-cycle
import configureStore from './config/configureStore';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

const app = () => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Router />
            </ConnectedRouter>
        </Provider>,
        MOUNT_NODE || document.createElement('div'),
    );
};

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./router'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        app();
    });
}

app();

export const dispatch = store.dispatch;
