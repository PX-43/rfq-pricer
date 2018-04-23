import  { types } from '../actions';

export default (state ={}, action) => {
  switch(action.type){
    case types.SCENARIO_ERROR_PARAM_CHANGED :
      return {
        ...state,
        hasError:action.hasError,
      };
    case types.SCENARIO_DELAY_PARAM_CHANGED :
      return {
        ...state,
        delayBy:action.delayBy,
      };
    case types.SCENARIO_NORESPONSE_PARAM_CHANGED :
      return {
        ...state,
        noResponse:action.noResponse,
      };
    case types.SCENARIO_RESET_TO_NORMAL :
      return {
        hasError: false,
        delayBy:0,
        noResponse: false,
      };
    default :
      return state;
  }
}
