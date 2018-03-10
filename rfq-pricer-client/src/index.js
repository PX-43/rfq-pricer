import _ from 'lodash';
import moment from 'moment';
const connection = new WebSocket('ws://127.0.0.1:1337');

const SUBSCRIBE_RFQ = 'subscribe_to_rfq';

connection.onopen = function () {
  connection.send(JSON.stringify({ topic: SUBSCRIBE_RFQ, data: 1}));
};

connection.onerror = function (error) {
 // console.log('ERROR: ' + error);
};

connection.onmessage = function (message) {
  let json = JSON.parse(message.data);
 // console.log(json.data);
};



