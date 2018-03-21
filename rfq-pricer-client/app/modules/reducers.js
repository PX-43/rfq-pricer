import { combineReducers } from 'redux';
import rfqListReducer from './rfqPricerFlow/reducers/rfqListReducer';
import legsReducer from './rfqPricerFlow/reducers/legsReducer';
import connectionReducer from './rfqPricerFlow/reducers/connectionReducer';

//combineReducer allows for each reducer to manage a child tree of the full tree object.
//It is delegating the work of updating each slice of state to a specific slice reducer.
export default combineReducers({
  connectionInfo: connectionReducer,
  rfqList: rfqListReducer,
  legs: legsReducer,
});
