export const types = {
  ESTABLISH_CONNECTION : 'ESTABLISH_CONNECTION',
  CONNECTED_SUCCESSFULLY : 'CONNECTED_SUCCESSFULLY',
  ON_CONNECTION_ERROR : 'ON_CONNECTION_ERROR',
  SEND_REQUEST : 'SEND_REQUEST',
  SEND_NEW_RFQ_REQUEST : 'SEND_NEW_RFQ_REQUEST',
  ON_MESSAGE_RECEIVED : 'ON_MESSAGE_RECEIVED',
  ON_RFQ_RECEIVED : 'ON_RFQ_RECEIVED',
  ON_LEG_RECEIVED : 'ON_LEG_RECEIVED',

};

export const establishConnection = connectionDetails => ({
  type: types.ESTABLISH_CONNECTION,
  connectionDetails
});

export const onConnectionError = err => ({
  type: types.ON_CONNECTION_ERROR,
  err
});

export const onRfqReceived = (rfq) => ({
  type: types.ON_RFQ_RECEIVED,
  rfq
});

export const onRfqLegsReceived = (legs) => ({
  type: types.ON_LEG_RECEIVED,
  legs,
});

export const requestNewRfq = rfqCount => ({
  type: types.SEND_NEW_RFQ_REQUEST,
  rfqCount,
});

export const sendRequest = (topic, payload) => ({
  type: types.SEND_REQUEST,
  data: {topic, payload}
});

export const connectedSuccessfully = () => ({ type: types.CONNECTED_SUCCESSFULLY });
