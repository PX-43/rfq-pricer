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
      ccyNodes: [...allocations.map(ccyNode => {
        const {valueDateNodes, ...ccy} = ccyNode;
        return {
          ...ccy,
          systemSpot:ccy.spot, //store original value, so we no when it's changed
          rfqId:rfq.id,
          valueDateNodes: [...valueDateNodes.map(valueDateNode => {
            const {legs, ...valueDate} = valueDateNode;
            return {
              ...valueDate,
              systemFwdPoints:valueDate.fwdPoints, //store original value, so we no when it's changed
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

const updateFwdPoints = (state, action, isReverting) => {
  const {ccyNodes, ...rfq} = state[action.rfqId];

  if(!isReverting && !isFwdPointsChanged(ccyNodes, action.ccyNodeId, action.id, action.fwdPoints)){
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
                const fwdPoints = isReverting ? valueDateNode.systemFwdPoints : action.fwdPoints;
                const prices = {
                                  fwdPoints,
                                  fwdPrice: priceUtils.calcFwdPrice(ccy.spot, fwdPoints, valueDateNode.precision)
                               };
                return {...valueDateNode, ...prices};
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

const updateSpot = (state, action, isReverting) =>{
  const {ccyNodes, ...rfq} = state[action.rfqId];

  if(!isReverting && !isSpotChanged(ccyNodes, action.id, action.spot)){
    return state; //don't update state if there is no change
  }

  return {
    ...state,
    [rfq.id]: {
      ...rfq,
      ccyNodes: ccyNodes.map(ccyNode => {
        if (ccyNode.id === action.id) {
          const {valueDateNodes, ...ccy} = ccyNode;
          const spot = isReverting ? ccy.systemSpot : action.spot;
          return {
            ...{...ccy, ...{spot}},
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

const removeRfq = (state, action) => {

  //todo
  return state;
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
      return removeRfq(state, action);

    default:
      return state;
  }
};
