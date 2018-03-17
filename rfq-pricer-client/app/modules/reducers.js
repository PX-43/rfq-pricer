import { combineReducers } from 'redux';
import rfqListReducer from './rfqPricerFlow/reducers/rfqListReducer';
import connectionReducer from './rfqPricerFlow/reducers/connectionReducer';

export default combineReducers({
  connectionReducer,
  rfqListReducer
});
