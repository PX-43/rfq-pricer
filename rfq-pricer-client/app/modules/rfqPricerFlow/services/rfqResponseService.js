//handles incoming rfq messages

import  { types } from '../actions';
import { topics } from './../../../constants';

const onMessage = (incomingMessage) => {
  switch (incomingMessage.topic) {
    case topics.RFQ:

      const rfq = incomingMessage.payload.rfq;
      const legs = incomingMessage.payload.legs;


  }
};
