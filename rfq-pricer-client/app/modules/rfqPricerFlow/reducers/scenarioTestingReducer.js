import  { types } from '../actions';

export default (state ={}, action) => {
  switch(action.type){

    case types.SERVER_RESPONSE_SCENARIO_CHANGED :
      return {
        ...state,
        serverResponseScenario:action.newScenario,
      };

    case types.SCENARIO_DELAYED_BY_PARAM_CHANGED :
      return {
        ...state,
        delayBy:action.delayBy,
      };

    default :
      return state;
  }
}
