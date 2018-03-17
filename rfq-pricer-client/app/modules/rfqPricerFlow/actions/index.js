export const types = {
  ESTABLISH_CONNECTION : 'ESTABLISH_CONNECTION',
  CONNECTED_SUCCESSFULLY : 'CONNECTED_SUCCESSFULLY',
  ON_CONNECTION_ERROR : 'ON_CONNECTION_ERROR',
  SEND_REQUEST : 'SEND_REQUEST',
  ON_MESSAGE_RECEIVED : 'ON_MESSAGE_RECEIVED',

};

export const establishConnection = connectionDetails => ({
  type: types.ESTABLISH_CONNECTION,
  connectionDetails
});

export const onConnectionError = err => ({
  type: types.ON_CONNECTION_ERROR,
  err
});

export const sendRequest = message => ({
  type: types.SEND_REQUEST,
  message
});

export const onMessageReceived = message => ({
  type: types.ON_MESSAGE_RECEIVED,
  message
});

export const connectedSuccessfully = () => ({ type: types.CONNECTED_SUCCESSFULLY });
