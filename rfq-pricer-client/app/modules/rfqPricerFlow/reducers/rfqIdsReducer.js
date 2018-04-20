import  { types } from '../actions';
import { stringUtils } from '../../../utils';

const rfqIdsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_RFQ_RECEIVED:
      const selectedRfqId = state.selectedRfqId ? state.selectedRfqId : stringUtils.copy(action.rfq.id);
      return {
        selectedRfqId,
        rfqIdList:[
          stringUtils.copy(action.rfq.id),
          ...state.rfqIdList,
        ]
      };
    case types.ON_SELECTED_RFQ_CHANGED :
      return {
        ...state,
        selectedRfqId: stringUtils.copy(action.newRfqId),
      };
    default:
      return state;
  }
};


export default rfqIdsReducer;
