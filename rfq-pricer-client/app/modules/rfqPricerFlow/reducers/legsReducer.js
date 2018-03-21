import  { types } from '../actions';
import { topics } from './../../../constants';

const legsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_MESSAGE_RECEIVED:

      if(action.message.topic === topics.RFQ){
        //return handleIncomingLegs(state, action.message.payload);
        return {
          ...state,
          ...action.message.payload.legs
        }
      }
      return state;

    default:
      return state;
  }
};

const handleIncomingLegs = (state, legs) => {
  //if(state.hasOwnProperty())
};



export default legsReducer;
