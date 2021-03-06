import { combineReducers } from 'redux';
import rfqReducer from './rfqPricerFlow/reducers/rfqReducer';
import connectionReducer from './rfqPricerFlow/reducers/connectionReducer';
import rfqIdsReducer from './rfqPricerFlow/reducers/rfqIdsReducer';
import scenarioTestingReducer from './rfqPricerFlow/reducers/scenarioTestingReducer';
import serverErrorReducer from './rfqPricerFlow/reducers/serverErrorReducer';

//combineReducer allows for each reducer to manage a child tree of the full tree object.
//It is delegating the work of updating each slice of state to a specific slice reducer.
export default combineReducers({
  connectionInfo: connectionReducer,
  serverErrors: serverErrorReducer,
  scenarioTesting: scenarioTestingReducer,
  rfqIds: rfqIdsReducer,
  rfqs: rfqReducer,
});
