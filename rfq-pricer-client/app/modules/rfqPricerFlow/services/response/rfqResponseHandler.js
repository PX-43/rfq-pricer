import  { onRfqReceived, onRfqLegsReceived } from '../../actions';

const handleRfqMessage = (payload, dispatch) => {
  const rfq = payload.rfq;
  dispatch(onRfqReceived(rfq));
  dispatch(onRfqLegsReceived(rfq.legs))
};

export default handleRfqMessage;
