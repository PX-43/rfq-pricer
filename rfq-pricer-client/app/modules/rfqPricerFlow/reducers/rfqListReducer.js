import  { types } from '../actions';

const rfqListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_RFQ_RECEIVED:

      console.dir(action.rfqId);
      console.dir(action.rfq[action.rfqId]);
      console.dir(action.rfq[action.rfqId].legIds);

      return {
        ...state,
        [action.rfqId]: {
          ...action.rfq[action.rfqId],
          legIds: [...action.rfq[action.rfqId].legIds]
        }
      };

    default:
      return state;
  }
};


export default rfqListReducer;
