import  { types } from '../actions';
import { stringUtils as utils } from '../../../utils';

export default (state=[], action) => {
  switch(action.type){

    case types.ON_SERVER_ERROR :
      const currentIndex = state.indexOf(action.err);

      if(currentIndex === -1){
        return [
          utils.copy(action.err),
          ...state
        ];
      } else {
        return [
          ...state.slice(0, currentIndex),
          action.err,
          ...state.slice(currentIndex)
        ]
      }

    case types.ON_DELETE_SERVER_ERROR :
      return state.filter(err => err !== action.err);

    default :
      return state;
  }
}
