import  { types } from '../actions';

const ccyNodesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_CCY_NODES_RECEIVED:

      // - remove valueDateNodes
      // - add valueDateNode IDs
      // - normalise
      return {
        ...state,
        ...Object.assign({},
          ...action.ccyNodes.map(ccyNode => {
              const {valueDateNodes, ...node} = ccyNode; //rest
              node.valueDateNodeIds = [...valueDateNodes.map(n => n.id)];
              return {[node.id]:{...node}}; //spread
          }))
      };
    default:
      return state;
  }
};

export default ccyNodesReducer;
