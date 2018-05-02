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

store.dispatch(establishConnection({server:'127.0.0.1', port:1337}));

