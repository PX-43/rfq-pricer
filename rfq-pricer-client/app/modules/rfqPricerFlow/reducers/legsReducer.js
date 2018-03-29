import  { types } from '../actions';

const legsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_LEG_RECEIVED:

      //normalise leg state
      return {
            ...state,
             //Object.assign is used here to convert the array (from map) to an object (maybe there is a better way?)
            ...Object.assign({}, ...action.legs.map(leg => ( {[leg.id]:{...leg}} )))
          };
    default:
      return state;
  }
};


export default legsReducer;
