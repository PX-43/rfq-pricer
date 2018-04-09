import  { types } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.ON_RFQ_RECEIVED: {
      //this destructuring removes allocations from rfq
      //(this is not a spread operator here, but rest, as it is an assignment context)
      const {allocations, ...rfq} = action.rfq;
      return {
        ...state,
        [rfq.id]: {
          ...rfq,
          ccyNodes: [...allocations.map(ccyNode => {
            const {valueDateNodes, ...ccy} = ccyNode;
            return {
              ...ccy,
              rfqId:rfq.id,
              valueDateNodes: [...valueDateNodes.map(valueDateNode => {
                const {legs, ...valueDate} = valueDateNode;
                return {
                  ...valueDate,
                  ccyPair: ccy.ccyPair,
                  precision: ccy.precision,
                  rfqId:rfq.id,
                  ccyNodeId:ccy.id,
                  legs: [...legs.map(leg => ({...leg}))]
                }
              })]
            }
          })]
        }
      };
    }

    case types.ON_FWD_POINTS_CHANGED : {
      const {ccyNodes, ...rfq} = state[action.rfqId];

      const ccyNodeToUpdate = ccyNodes.find(item => item.id === action.ccyNodeId);
      if(ccyNodeToUpdate){
        const valueDateNodeToUpdate = ccyNodeToUpdate.valueDateNodes.find(item => item.id === action.id);
        if(valueDateNodeToUpdate && valueDateNodeToUpdate.fwdPoints === action.fwdPoints){
          return state; //don't update state if there is no change
        }
      }

      return {
        ...state,
        [rfq.id]: {
          ...rfq,
          ccyNodes: ccyNodes.map(ccyNode => {
            if (ccyNode.id === action.ccyNodeId) {
              const {valueDateNodes, ...ccy} = ccyNode;
              return {
                ...ccy,
                valueDateNodes: valueDateNodes.map(valueDateNode => {
                  if (valueDateNode.id === action.id) {
                    return Object.assign({}, valueDateNode, {fwdPoints: action.fwdPoints})
                  } else {
                    return valueDateNode;
                  }
                })
              }
            } else {
              return ccyNode;
            }
          })
        }
      };
    }

    case types.ON_SPOT_CHANGED : {
      const {ccyNodes, ...rfq} = state[action.rfqId];
      const arrToUpdate = ccyNodes.find(item => item.id === action.id);
      if(arrToUpdate && arrToUpdate.spot === action.spot){
        return state; //don't update state if there is no change
      }
      return {
        ...state,
        [rfq.id]: {
          ...rfq,
          ccyNodes: ccyNodes.map(ccyNode => {
            if (ccyNode.id === action.id) {
              return Object.assign({}, ccyNode, {spot: action.spot})
            } else {
              return ccyNode;
            }
          })
        }
      };
    }
    default:
      return state;
  }
};
