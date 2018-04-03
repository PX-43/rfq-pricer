import { combineReducers } from 'redux';
import rfqReducer from './rfqPricerFlow/reducers/rfqReducer';
import legsReducer from './rfqPricerFlow/reducers/legsReducer';
import connectionReducer from './rfqPricerFlow/reducers/connectionReducer';
import rfqIdsReducer from './rfqPricerFlow/reducers/rfqIdsReducer';
import selectedRfqReducer from './rfqPricerFlow/reducers/selectedRfqReducer';
import valueDateNodesReducer from './rfqPricerFlow/reducers/valueDateNodesReducer';
import ccyNodesReducer from './rfqPricerFlow/reducers/ccyNodesReducer';

//combineReducer allows for each reducer to manage a child tree of the full tree object.
//It is delegating the work of updating each slice of state to a specific slice reducer.
export default combineReducers({
  connectionInfo: connectionReducer,
  selectedRfq: selectedRfqReducer,
  rfqIds: rfqIdsReducer,
  rfqs: rfqReducer,
  ccyNodes: ccyNodesReducer,
  valueDateNodes: valueDateNodesReducer,
  legs: legsReducer,
});
