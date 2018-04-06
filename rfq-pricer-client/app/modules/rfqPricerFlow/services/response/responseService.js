import { topics } from '../../../../constants/index';
import {onRfqReceived} from "../../actions";

const handleResponse = (incomingMsg, dispatch) => {
  try{
    const data = JSON.parse(incomingMsg.data);
    switch (data.topic) {
      case topics.RFQ:
        dispatch(onRfqReceived(data.payload.rfq));
        break;
      default:
        console.error('This topic is not recognised: ' + data.topic);
    }
  } catch(err) {
    console.error('An error has occurred while handling an incoming message. Error: ' + err);
  }
};

export default handleResponse;
