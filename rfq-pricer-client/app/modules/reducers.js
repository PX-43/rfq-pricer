import { combineReducers } from 'redux';
import rfqReducer from './rfqPricerFlow/reducers/rfqReducer';
import legsReducer from './rfqPricerFlow/reducers/legsReducer';
import connectionReducer from './rfqPricerFlow/reducers/connectionReducer';
import rfqOrderReducer from "./rfqPricerFlow/reducers/rfqOrderReducer";

//combineReducer allows for each reducer to manage a child tree of the full tree object.
//It is delegating the work of updating each slice of state to a specific slice reducer.
export default combineReducers({
  connectionInfo: connectionReducer,
  rfqs: rfqReducer,
  rfqOrder: rfqOrderReducer,
  legs: legsReducer,
});
