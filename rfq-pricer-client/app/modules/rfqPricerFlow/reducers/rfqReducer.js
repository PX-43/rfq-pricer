import  { types } from '../actions';
import orderBy from "lodash/orderBy";
import uniq from "lodash/uniq";

const rfqReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_RFQ_RECEIVED:

      //this destructuring removes allocations from rfq
      //(this is not a spread operator here, but rest, as it is an assignment context)
      const {allocations, ...rfq} = action.rfq;

      //This is done here for efficiency reasons. Otherwise it would need to be done in the selectors,
      //which would be more complicated and inefficient, as we would need to extract the allocations for each rfq.
      const ccyPairs = orderBy( uniq( allocations.map(alloc => alloc.ccyPair) ) );

      //normalising rfq state
      return {
        ...state,
        [rfq.id]: {
          ...rfq,
          ccyNodeIds: [...allocations.map(alloc => alloc.id)],
          ccyPairs: [...ccyPairs],
        }
      };
    default:
      return state;
  }
};


export default rfqReducer;
