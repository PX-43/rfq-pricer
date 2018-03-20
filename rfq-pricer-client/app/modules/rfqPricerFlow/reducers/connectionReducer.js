import { types }  from '../actions';
import { connectionStatus } from "../../../constants";


const connectionReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CONNECTED_SUCCESSFULLY:
      return {
        ...state,
        connectionStatus: connectionStatus.CONNECTED,
      };
    case types.ESTABLISH_CONNECTION:
      return {
        ...state,
        connectionStatus: connectionStatus.CONNECTING,
      };
    case types.ON_CONNECTION_ERROR:
      return {
        ...state,
        connectionStatus: connectionStatus.DISCONNECTED,
        connectionError: action.err
      };
    default:
      return state;
  }
};

export default connectionReducer;
