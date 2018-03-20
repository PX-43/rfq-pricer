import  { types } from '../actions';
import { topics } from './../../../constants';

const rfqListReducer = (state = [], action) => {
  switch (action.type) {
    case types.ON_MESSAGE_RECEIVED:

      if(action.message.topic === topics.RFQ){
        return handleIncomingRfq(state, action.message.payload);
      }
      return state;

    default:
      return state;
  }
};

const handleIncomingRfq = (state, rfq) => {
  if(isExistingRfq(state, rfq)){ //update
    return state.map(item => (item => rfq.id === item.id) ? { ...item, ...rfq } : item);
  } else { //new rfq
    return state;
  }
};

const isExistingRfq = (state, rfq) => state.find(item => rfq.id === item.id);


export default rfqListReducer;
