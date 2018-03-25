import  { types } from '../actions';

const rfqReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_RFQ_RECEIVED:
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


export default rfqReducer;
