import  { types } from '../actions';

const rfqIdsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_RFQ_RECEIVED:
      return [
        action.rfq.id,
        ...state,
      ];

    default:
      return state;
  }
};


export default rfqIdsReducer;
