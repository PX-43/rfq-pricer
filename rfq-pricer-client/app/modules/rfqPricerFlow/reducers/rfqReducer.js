import  { types } from '../actions';
import { priceUtils } from '../../../utils';

const isFwdPointsChanged = (ccyNodes, ccyNodeId, valueDateNodeId, fwdPoints) => {
  const ccyNodeToUpdate = ccyNodes.find(item => item.id === ccyNodeId);
  if(ccyNodeToUpdate){
    const valueDateNodeToUpdate = ccyNodeToUpdate.valueDateNodes.find(item => item.id === valueDateNodeId);
    return valueDateNodeToUpdate && valueDateNodeToUpdate.fwdPoints !== fwdPoints;
  }
};

const isSpotChanged = (ccyNodes, ccyNodesId, spot) => {
  const arrToUpdate = ccyNodes.find(item => item.id === ccyNodesId);
  return arrToUpdate && arrToUpdate.spot !== spot;
};

const addNewRfq = (state, action) => {
  //this destructuring removes allocations from rfq
  //(this is not a spread operator here, but rest, as it is an assignment context)
  const {allocations, ...rfq} = action.rfq;
  return {
    ...state,
    [rfq.id]: {
      ...rfq,
      hasError:false,
      ccyNodes: [...allocations.map(ccyNode => {
        const {valueDateNodes, ...ccy} = ccyNode;
        return {
          ...ccy,
          systemSpot:ccy.spot, //store original value
          spotLocked:false, //set to true once value has changed by user
          rfqId:rfq.id,
          valueDateNodes: [...valueDateNodes.map(valueDateNode => {
            const {legs, ...valueDate} = valueDateNode;
            return {
              ...valueDate,
              systemFwdPoints:valueDate.fwdPoints, //store original value
              fwdPointsLocked:false, //set to true once value has changed by user
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
};

const updateFwdPoints = (state, action, isUnlocking) => {
  const {ccyNodes, ...rfq} = state[action.rfqId];

  if(!isUnlocking && !isFwdPointsChanged(ccyNodes, action.ccyNodeId, action.id, action.fwdPoints)){
    return state; //don't update state if there is no change
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
                const fwdPoints = isUnlocking ? valueDateNode.systemFwdPoints : action.fwdPoints;
                const prices = {
                                  fwdPoints,
                                  fwdPrice: priceUtils.calcFwdPrice(ccy.spot, fwdPoints, valueDateNode.precision)
                               };
                return {...valueDateNode, ...prices, fwdPointsLocked:!isUnlocking};
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
};

const updateSpot = (state, action, isUnlocking) =>{
  const {ccyNodes, ...rfq} = state[action.rfqId];

  if(!isUnlocking && !isSpotChanged(ccyNodes, action.id, action.spot)){
    return state; //don't update state if there is no change
  }

  return {
    ...state,
    [rfq.id]: {
      ...rfq,
      ccyNodes: ccyNodes.map(ccyNode => {
        if (ccyNode.id === action.id) {
          const {valueDateNodes, ...ccy} = ccyNode;
          const spot = isUnlocking ? ccy.systemSpot : action.spot;
          return {
            ...{...ccy, ...{spot}, spotLocked:!isUnlocking},
            valueDateNodes: valueDateNodes.map(valueDateNode => { //update fwd prices
              const prices = {
                  fwdPrice: priceUtils.calcFwdPrice(spot, valueDateNode.fwdPoints, valueDateNode.precision)
                };
                return {...valueDateNode, ...prices};
            })
          }
        } else {
          return ccyNode;
        }
      })
    }
  };
};

const handleActionResponse = (state, action) => { //todo: should we update state if there is a server error?

  if(action.rfqId == null)
    return state;

  if(action.serverError){
    return {
      ...state,
      [action.rfqId]: {
        ...state[action.rfqId],
        hasError: true,
      }
    }
  }

  return Object.keys(state).reduce((result, key) => {
    if(key !== action.rfqId) {
      result[key] = state[key];
    }

    return result;
  }, {});

};

const refreshRfqPrices = (state, action) => {
  const {ccyNodes:newCcyNodes, ...rfq} = action.rfq;
  return {
    ...state,
    [rfq.id]: {
      ...state[rfq.id],
      ccyNodes: state[rfq.id].ccyNodes.map(ccyNode => {
        const {valueDateNodes:newValueDateNodes, ...newCcyNode} = newCcyNodes.find(i => i.id === ccyNode.id);
        const {valueDateNodes:currentValueDateNodes, ...currentCcyNode} = ccyNode;
        const spot = currentCcyNode.spotLocked ? currentCcyNode.spot : newCcyNode.spot;
        return {
          ...currentCcyNode,
          spot,
          systemSpot:newCcyNode.spot,
          valueDateNodes: currentValueDateNodes.map(currentValueDateNode => {
            const newValueDateNode = newValueDateNodes.find(i => i.id === currentValueDateNode.id);
            const fwdPoints = currentValueDateNode.fwdPointsLocked ? currentValueDateNode.fwdPoints : newValueDateNode.fwdPoints;
            const prices = {
              fwdPoints,
              fwdPrice: priceUtils.calcFwdPrice(spot, fwdPoints, currentValueDateNode.precision),
              midPrice: newValueDateNode.midPrice,
            };

            return {...currentValueDateNode, ...prices}
          })
        }
      })
    }
  };
};

export default (state = {}, action) => {

  switch (action.type) {

    case types.ON_RFQ_RECEIVED:
      return addNewRfq(state, action);

    case types.ON_FWD_POINTS_CHANGED :
      return updateFwdPoints(state, action, false);

    case types.ON_REVERTING_FWD_POINTS :
      return updateFwdPoints(state, action, true);

    case types.ON_SPOT_CHANGED :
      return updateSpot(state, action, false);

    case types.ON_REVERTING_SPOT :
      return updateSpot(state, action, true);

    case types.ON_REJECT_RESPONSE : //todo: should we update state if there is a server error?
    case types.ON_ACCEPT_RESPONSE:
      return handleActionResponse(state, action);

    case types.ON_REFRESH_RESPONSE:
      return refreshRfqPrices(state, action);

    default:
      return state;
  }
};
