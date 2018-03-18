import  { types } from '../actions';

const rfqListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ON_MESSAGE_RECEIVED:
      console.info(action);
      return {
        ...state,
        rfq: action.message.payload,
      };
    default:
      return state;
  }
};


export default rfqListReducer;
