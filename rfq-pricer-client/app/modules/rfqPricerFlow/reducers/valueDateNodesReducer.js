import  { types } from '../actions';

const valueDateNodesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_VALUE_DATE_NODES_RECEIVED:

      // - remove legs
      // - add leg IDs
      // - normalise
      return {
        ...state,
        ...Object.assign({},
          ...action.valueDateNodes.map(valueDateNode => {
            const {legs, ...node} = valueDateNode; //rest
            node.legIds = [...legs.map(n => n.id)];
            return {[node.id]:{...node}}; //spread
          }))
      };
    default:
      return state;
  }
};

export default valueDateNodesReducer;
