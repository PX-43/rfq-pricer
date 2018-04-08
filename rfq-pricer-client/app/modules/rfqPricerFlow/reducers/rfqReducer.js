import  { types } from '../actions';

const rfqReducer = (state = {}, action) => {
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
                  legs: [...legs.map(leg => ({...leg}))]
                }
              })]
            }
          })]
        }
      };
    }

    case types.ON_FWD_POINTS_CHANGED : {
      //const rfq = state.rfqs[state.selectedRfqId];
      //console.dir(state);
      return state;
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


export default rfqReducer;

/*
return array.map( (item, index) => {
  if(index !== action.index) {
    // This isn't the item we care about - keep it as-is
    return item;
  }

  // Otherwise, this is the one we want - return an updated value
  return {
    ...item,
    ...action.item
  };
});*/
