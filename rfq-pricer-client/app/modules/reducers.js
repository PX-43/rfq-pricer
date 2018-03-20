import { combineReducers } from 'redux';
import rfqListReducer from './rfqPricerFlow/reducers/rfqListReducer';
import connectionReducer from './rfqPricerFlow/reducers/connectionReducer';

//combineReducer allows for each reducer to manage a child tree of the full tree object.
export default combineReducers({
  connectionInfo: connectionReducer,
  rfqList: rfqListReducer
});