import  { types } from '../actions';
import { viewConstants as vc } from '../../../constants';
import { stringUtils as utils } from '../../../utils';

export default (state=vc.NO_ERROR, action) => {
  switch(action.type){

    case types.ON_SERVER_ERROR :
      return utils.copy(action.err);

    default :
      return state;
  }
}
