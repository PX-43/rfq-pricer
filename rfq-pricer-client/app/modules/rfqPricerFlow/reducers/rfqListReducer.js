import  { types } from '../actions';

const rfqListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_MESSAGE_RECEIVED:
      return {
        rfq: '',
      };
    default:
      return state;
  }
};


export default rfqListReducer;
