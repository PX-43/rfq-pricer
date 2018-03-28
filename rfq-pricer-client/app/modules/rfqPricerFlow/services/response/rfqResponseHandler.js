import  { onRfqReceived, onRfqLegReceived } from '../../actions';
import keys from 'lodash/keys';

const handleRfqMessage = (payload, dispatch) => {
  const {rfq, legs} = payload;

  const rfqId = keys(rfq)[0];

  //todo: add  unique ccypair list to rfq
  //todo: consider sending the whole list to legReducer, or maybe not...

  keys(legs).forEach(legId => dispatch(onRfqLegReceived(legId, legs[legId])));
  dispatch(onRfqReceived(rfqId, rfq[rfqId]));


};

export default handleRfqMessage;
