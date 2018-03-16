import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './../modules/reducers';
import sagas from './../modules/sagas';

import initState from './initState';



const sagaMiddleware = createSagaMiddleware();

const store  = createStore(
  reducers,
  initState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

export default store;
