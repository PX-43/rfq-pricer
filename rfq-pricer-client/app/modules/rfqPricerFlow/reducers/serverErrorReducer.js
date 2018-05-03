import  { types } from '../actions';
import { stringUtils as utils } from '../../../utils';

export default (state=[], action) => {
  switch(action.type){

    case types.ON_SERVER_ERROR :
      return [
        utils.copy(action.err),
        ...state
      ];

    default :
      return state;
  }
}
