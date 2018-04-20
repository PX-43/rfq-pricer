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
    case types.ON_REJECT :
      const rfqIdList = state.rfqIdList.filter(id => id !== action.rfqId);
      const newSelectedRfqId = rfqIdList.length > 0 ?  rfqIdList[0] : '';
      return {
        selectedRfqId : stringUtils.copy(newSelectedRfqId),
        rfqIdList:[ ...rfqIdList ]
      };
    default:
      return state;
  }
};


export default rfqIdsReducer;
