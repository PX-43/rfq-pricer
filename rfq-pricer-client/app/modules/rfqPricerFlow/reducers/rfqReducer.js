import  { types } from '../actions';

const rfqReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_RFQ_RECEIVED:

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
              valueDateNodes:[...valueDateNodes.map(valueDateNode => {
                const {legs, ...valueDate} = valueDateNode;
                return {
                  ...valueDate,
                  ccyPair:ccy.ccyPair,
                  legs:[...legs.map(leg => ({...leg}))]
                }
              })]
            }
          })]
        }
      };
    default:
      return state;
  }
};


export default rfqReducer;
