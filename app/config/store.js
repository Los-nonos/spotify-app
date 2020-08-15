import { routerMiddleware } from 'connected-react-router';
import { isNil, reject } from 'ramda';
import { applyMiddleware, compose, createStore } from 'redux';
import history from './history';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

window.__REDUX_DEVTOOLS_EXTENSION__ =
    window.__REDUX_DEVTOOLS_EXTENSION__ ||
    function(f) {
        return f;
    };

const middlewares = reject(isNil)([
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__(),
]);

export const createStoreWithMiddleWare = compose(...middlewares)(createStore);
