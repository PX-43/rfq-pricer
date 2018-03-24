import  { onRfqReceived, onRfqLegReceived } from '../../actions';
import keys from 'lodash/keys';

const handleRfqMessage = (payload, dispatch) => {
  const {rfq, legs} = payload;

  const rfqId = keys(rfq)[0];
  dispatch(onRfqReceived(rfqId, rfq[rfqId]));

  keys(legs).forEach(legId => dispatch(onRfqLegReceived(legId, legs[legId])));
};

export default handleRfqMessage;
