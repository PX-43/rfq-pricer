import 'babel-polyfill';
import style from './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import RfqPricerContainer from './components/RfqPricerContainer';
import { establishConnection } from './modules/rfqPricerFlow/actions'
import Notification from './components/Notification/NotificationContainer';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Notification />
      <RfqPricerContainer />
    </div>
  </Provider>,
  document.getElementById('main')
);

store.dispatch(establishConnection({
  protocol: process.env.WS_PROTOCOL,
  server: process.env.WS_URL,
  port:process.env.PORT
}));

