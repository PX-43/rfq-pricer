import { types } from '../actions';

const selectedRfqIdReducer = (state = '', action) => {
  switch (action.type){
    case types.ON_RFQ_RECEIVED :
      return (!state) ? action.rfq.id : state;
    case types.ON_SELECTED_RFQ_CHANGED :
      return action.newRfqId;
    default :
      return state;
  }
};


export default selectedRfqIdReducer;

