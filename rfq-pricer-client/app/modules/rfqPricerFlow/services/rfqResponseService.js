//handles incoming rfq messages

import  { types } from '../actions';
import { topics } from './../../../constants';

const handleRfqMessage = (incomingMsg, dispatch) => {
  const data = JSON.parse(incomingMsg.data);
  switch (data.topic) {
    case topics.RFQ:
      const rfq = data.payload.rfq;
      const legs = data.payload.legs;
      console.log(rfq);
      console.log(dispatch);
  }
};

export default handleRfqMessage;
