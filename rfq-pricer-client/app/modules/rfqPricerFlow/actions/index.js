export const types = {
  ESTABLISH_CONNECTION : 'ESTABLISH_CONNECTION',
  CONNECTED_SUCCESSFULLY : 'CONNECTED_SUCCESSFULLY',
  ON_CONNECTION_ERROR : 'ON_CONNECTION_ERROR',
  SEND_REQUEST : 'SEND_REQUEST',
  SEND_NEW_RFQ_REQUEST : 'SEND_NEW_RFQ_REQUEST',
  ON_MESSAGE_RECEIVED : 'ON_MESSAGE_RECEIVED',
  ON_RFQ_RECEIVED : 'ON_RFQ_RECEIVED',
  ON_CCY_NODES_RECEIVED : 'ON_CCY_NODES_RECEIVED',
  ON_VALUE_DATE_NODES_RECEIVED : 'ON_VALUE_DATE_NODES_RECEIVED',
  ON_LEG_RECEIVED : 'ON_LEG_RECEIVED',
  ON_SELECTED_RFQ_CHANGED : 'ON_SELECTED_RFQ_CHANGED',

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

export const onCcyNodesReceived = (ccyNodes) => ({
  type: types.ON_CCY_NODES_RECEIVED,
  ccyNodes,
});

export const onValueDateNodesReceived = (valueDateNodes) => ({
  type: types.ON_VALUE_DATE_NODES_RECEIVED,
  valueDateNodes,
});

export const onRfqLegsReceived = (legs) => ({
  type: types.ON_LEG_RECEIVED,
  legs,
});

export const requestNewRfq = rfqCount => ({
  type: types.SEND_NEW_RFQ_REQUEST,
  rfqCount,
});

export const onSelectedRfqChanged = (newRfqId, oldRfqId) => ({
  type: types.ON_SELECTED_RFQ_CHANGED,
  newRfqId,
  oldRfqId,
});

export const sendRequest = (topic, payload) => ({
  type: types.SEND_REQUEST,
  data: {topic, payload}
});

export const connectedSuccessfully = () => ({ type: types.CONNECTED_SUCCESSFULLY });
