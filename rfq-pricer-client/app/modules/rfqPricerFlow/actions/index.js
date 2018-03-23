export const types = {
  ESTABLISH_CONNECTION : 'ESTABLISH_CONNECTION',
  CONNECTED_SUCCESSFULLY : 'CONNECTED_SUCCESSFULLY',
  ON_CONNECTION_ERROR : 'ON_CONNECTION_ERROR',
  SEND_REQUEST : 'SEND_REQUEST',
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

export const onRfqReceived = (rfqId, rfq) => ({
  type: types.ON_RFQ_RECEIVED,
  rfqId,
  rfq,
});

export const onRfqLegReceived = (legId, leg) => ({
  type: types.ON_LEG_RECEIVED,
  legId,
  leg,
});

export const connectedSuccessfully = () => ({ type: types.CONNECTED_SUCCESSFULLY });
