import  types  from '../actions';

export default rfqListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CONNECTED_SUCCESSFULLY:
      return {
        message: '',
      };
    default:
      return state;
  }
};
