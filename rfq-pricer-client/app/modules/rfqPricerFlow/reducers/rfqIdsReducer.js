import  { types } from '../actions';
import { stringUtils as utils } from '../../../utils';
import { viewConstants as vc } from '../../../constants';

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
    case types.ON_ACCEPT :
      const rfqIdList = state.rfqIdList.filter(id => id !== action.rfqId);
      const newSelectedRfqId = rfqIdList.length > 0 ?  rfqIdList[0] : vc.NO_SELECTED_RFQ;
      return {
        selectedRfqId : utils.copy(newSelectedRfqId),
        rfqIdList:[ ...rfqIdList ],
        processingList: [utils.copy(action.rfqId), ...state.processingList],
      };

    case types.ON_REJECT_RESPONSE :
    case types.ON_ACCEPT_RESPONSE :{
      console.log(state.rfqIdList);
      const rfqIdList = (action.serverError && !state.rfqIdList.includes(action.rfqId))
                          ? [...state.rfqIdList, action.rfqId] : state.rfqIdList;
      return {
        ...state,
        rfqIdList : [...rfqIdList],
        processingList: [ ...state.processingList.filter(id => id !== action.rfqId)  ],
      };
    }

    case types.ON_REMOVE:{
      const rfqIdList = state.rfqIdList.filter(id => id !== action.rfqId);
      const newSelectedRfqId = rfqIdList.length > 0 ?  rfqIdList[0] : vc.NO_SELECTED_RFQ;
      return {
        selectedRfqId : utils.copy(newSelectedRfqId),
        rfqIdList : [...rfqIdList],
        processingList: [ ...state.processingList.filter(id => id !== action.rfqId)  ],
      };
    }



    default:
      return state;
  }
};


export default rfqIdsReducer;
