import  { types } from '../actions';

const rfqListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_RFQ_RECEIVED:
      //todo: check if references are not the same
      return {
        ...state,
        [action.rfqId]: {
          ...action.rfq,
          legIds: [...action.rfq.legIds]
        }
      };

    default:
      return state;
  }
};


export default rfqListReducer;
