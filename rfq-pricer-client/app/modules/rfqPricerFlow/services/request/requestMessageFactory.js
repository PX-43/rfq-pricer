import  {types, onRfqReceived, onRfqLegReceived } from '../../actions';
import { topics } from '../../../../constants/index';

//WE DON'T NEED THIS!
const createRequest = action => {
  switch (action.type){
    case types.SEND_NEW_RFQ_REQUEST:
      return {};
    default:
      throw new Error('')
  }
};
