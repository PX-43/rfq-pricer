import 'babel-polyfill';
import style from './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import RfqPricerContainer from './components/RfqPricerContainer';
import { establishConnection } from './modules/rfqPricerFlow/actions'

ReactDOM.render(
  <Provider store={store}>
    <RfqPricerContainer />
  </Provider>,
  document.getElementById('main')
);

store.dispatch(establishConnection({server:'127.0.0.1', port:1337}));





















/*const connection = new WebSocket('ws://127.0.0.1:1337');

const SUBSCRIBE_RFQ = 'subscribe_to_rfq';

connection.onopen = function () {
  connection.send(JSON.stringify({ topic: SUBSCRIBE_RFQ, data: 1}));
};

connection.onerror = function (error) {
  console.log('ERROR: ' + error);
};

connection.onmessage = function (message) {
  let json = JSON.parse(message.data);
  console.log(json.data);
};*/



