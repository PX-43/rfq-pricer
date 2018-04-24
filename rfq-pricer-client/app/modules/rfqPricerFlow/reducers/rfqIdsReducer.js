import  { types } from '../actions';
import { stringUtils as utils } from '../../../utils';

const rfqIdsReducer = (state = {}, action) => {
  switch (action.type) {

    case types.ON_RFQ_RECEIVED:
      const selectedRfqId = state.selectedRfqId ? state.selectedRfqId : utils.copy(action.rfq.id);
      return {
        ...state,
        selectedRfqId,
        rfqIdList:[
          utils.copy(action.rfq.id),
          ...state.rfqIdList,
        ]
      };

    case types.ON_SELECTED_RFQ_CHANGED :
      return {
        ...state,
        selectedRfqId: utils.copy(action.newRfqId),
      };

    case types.ON_REJECT :
      const rfqIdList = state.rfqIdList.filter(id => id !== action.rfqId);
      const newSelectedRfqId = rfqIdList.length > 0 ?  rfqIdList[0] : '';
      return {
        selectedRfqId : utils.copy(newSelectedRfqId),
        rfqIdList:[ ...rfqIdList ],
        processingList: [utils.copy(action.rfqId), ...state.processingList],
      };

    case types.ON_REJECT_RESPONSE : //todo: should we update state if there is a server error?
    case types.ON_ACCEPT_RESPONSE:
      return {
        ...state,
        rfqIdList:[ ...state.rfqIdList.filter(id => id !== action.rfqId) ]
      };


    default:
      return state;
  }
};


export default rfqIdsReducer;
