import { types } from '../actions';

const selectedRfqIdReducer = (state = '', action) => {
  switch (action.type){
    case types.ON_RFQ_RECEIVED :
      return (!state) ? action.rfq.id : state;
    case types.ON_SELECTED_RFQ_CHANGED :
      return action.newRfqId;
    case types.ON_REJECT :
      return ''; //remove selected rfq
    default :
      return state;
  }
};


export default selectedRfqIdReducer;

