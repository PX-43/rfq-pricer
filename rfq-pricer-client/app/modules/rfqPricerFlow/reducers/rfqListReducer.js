import  { types } from '../actions';

const rfqListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_RFQ_RECEIVED:

      return {
        ...state,
        [action.rfqId]: {
          ...action.rfq
        }
      };

    default:
      return state;
  }
};


export default rfqListReducer;
