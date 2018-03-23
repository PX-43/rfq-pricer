import  { types } from '../actions';

const legsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_LEG_RECEIVED:

      return {
        ...state,
        [action.legId]: {
          ...action.leg
        }
      };

    default:
      return state;
  }
};


export default legsReducer;
