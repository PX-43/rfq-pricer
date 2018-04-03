import  {
  onRfqReceived,
  onCcyNodesReceived,
  onValueDateNodesReceived,
  onRfqLegsReceived,
} from '../../actions';

const handleRfqMessage = (payload, dispatch) => {
  const rfq = payload.rfq;
  const ccyNodes = rfq.allocations;
  const valueDateNodes = ccyNodes.reduce((res, item) => [...res, ...item.valueDateNodes], []);
  const legs = valueDateNodes.reduce((res, item) => [...res, ...item.legs], []);

  dispatch(onRfqReceived(rfq));
  dispatch(onCcyNodesReceived(ccyNodes));
  dispatch(onValueDateNodesReceived(valueDateNodes));
  dispatch(onRfqLegsReceived(legs))
};

export default handleRfqMessage;
