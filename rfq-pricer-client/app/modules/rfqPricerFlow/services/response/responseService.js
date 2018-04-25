import { topics } from '../../../../constants/index';
import {onRfqReceived, onRejectResponse, onAcceptResponse} from "../../actions";

const handleResponse = (incomingMsg, dispatch) => {
  try{
    const data = JSON.parse(incomingMsg.data);
    switch (data.topic) {
      case topics.RFQ:
        dispatch(onRfqReceived(data.payload.rfq));
        break;
      case topics.REJECT_RFQ:
        dispatch(onRejectResponse(data.payload, data.err));
        break;
      case topics.ACCEPT_RFQ:
        dispatch(onAcceptResponse(data.payload, data.err));
        break;
      default:
        console.error('This topic is not recognised: ' + data.topic);
    }
  } catch(err) {
    console.error('An error has occurred while handling an incoming message. Error: ' + err);
  }
};

export default handleResponse;
