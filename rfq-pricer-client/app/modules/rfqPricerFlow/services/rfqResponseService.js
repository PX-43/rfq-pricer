//handles incoming rfq messages

import  { onRfqReceived, onRfqLegReceived } from '../actions';
import { topics } from './../../../constants';
import forOwn from 'lodash/forOwn';

const handleRfqMessage = (incomingMsg, dispatch) => {
  try{
    const data = JSON.parse(incomingMsg.data);
    switch (data.topic) {
      case topics.RFQ:
        forOwn(data.payload.rfq, (rfq, rfqId) => dispatch(onRfqReceived(rfqId, rfq)));
        forOwn(data.payload.legs, (leg, legId) => dispatch(onRfqLegReceived(legId, leg)));
        break;
      default:
        console.error('This topic is not recognised: ' + data.topic);
    }
  } catch(err) {
    console.error('An error has occurred while handling an incoming rfq message. Error: ' + err);
  }
};

export default handleRfqMessage;
