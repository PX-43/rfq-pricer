import {createStore} from 'redux'

//STATE
let defaultState = {
  originAmount: '0.00'
};

//REDUCER (contains logic to update the store)
const reducer = (state = defaultState, action) => {
  if(action.type === 'CHANGE_ORIGIN_AMOUNT') {
    return {
      ...state,
      originAmount: action.data.originAmount
    }
  }

  return state;
};

//STORE
let store  = createStore(reducer);


export default store;
