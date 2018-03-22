import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './../modules/reducers';
import saga from './../modules/sagas';

import { initState } from './initState';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({name: 'RFQ Pricer Client Store'}) : compose;

// noinspection JSCheckFunctionSignatures
const store  = createStore(
  reducers,
  initState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga, store.dispatch);

export default store;
