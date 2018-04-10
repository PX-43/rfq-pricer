import  { types } from '../actions';

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
};

const updateFwdPoints = (state, action) => {
  const {ccyNodes, ...rfq} = state[action.rfqId];

  if(!isFwdPointsChanged(ccyNodes, action.ccyNodeId, action.id, action.fwdPoints)){
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
                return {...valueDateNode, ...{fwdPoints: action.fwdPoints}};
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

const updateSpot = (state, action) =>{
  const {ccyNodes, ...rfq} = state[action.rfqId];

  if(!isSpotChanged(ccyNodes, action.id, action.spot)){
    return state; //don't update state if there is no change
  }

  return {
    ...state,
    [rfq.id]: {
      ...rfq,
      ccyNodes: ccyNodes.map(ccyNode => {
        if (ccyNode.id === action.id) {
          return {...ccyNode, ...{spot: action.spot}};
        } else {
          return ccyNode;
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
      return updateFwdPoints(state, action);

    case types.ON_SPOT_CHANGED :
      return updateSpot(state, action);

    default:
      return state;
  }
};
