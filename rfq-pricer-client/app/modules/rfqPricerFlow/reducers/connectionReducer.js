import  {types}  from '../actions';

const connectionStatus = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  CONNECTION_FAILURE: 'failed',
};

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
        connectionStatus: connectionStatus.CONNECTION_FAILURE,
        connectionError: action.err
      };
    default:
      return state;
  }
};

export default connectionReducer;
