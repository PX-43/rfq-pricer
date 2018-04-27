export const types = {
  ESTABLISH_CONNECTION : 'ESTABLISH_CONNECTION',
  CONNECTED_SUCCESSFULLY : 'CONNECTED_SUCCESSFULLY',
  ON_CONNECTION_ERROR : 'ON_CONNECTION_ERROR',
  SEND_REQUEST : 'SEND_REQUEST',
  SEND_NEW_RFQ_REQUEST : 'SEND_NEW_RFQ_REQUEST',
  ON_MESSAGE_RECEIVED : 'ON_MESSAGE_RECEIVED',
  ON_RFQ_RECEIVED : 'ON_RFQ_RECEIVED',
  ON_SELECTED_RFQ_CHANGED : 'ON_SELECTED_RFQ_CHANGED',
  ON_FWD_POINTS_CHANGED : 'ON_FWD_POINTS_CHANGED',
  ON_SPOT_CHANGED : 'ON_SPOT_CHANGED',
  ON_REVERTING_SPOT : 'ON_REVERTING_SPOT',
  ON_REVERTING_FWD_POINTS : 'ON_REVERTING_FWD_POINTS',
  ON_REJECT : 'ON_REJECT',
  ON_REJECT_RESPONSE : 'ON_REJECT_RESPONSE',
  ON_ACCEPT : 'ON_ACCEPT',
  ON_ACCEPT_RESPONSE : 'ON_ACCEPT_RESPONSE',
  ON_REFRESH : 'ON_REFRESH',
  ON_REFRESH_RESPONSE : 'ON_REFRESH_RESPONSE',

  SCENARIO_DELAYED_BY_PARAM_CHANGED : 'SCENARIO_DELAYED_BY_PARAM_CHANGED',
  SERVER_RESPONSE_SCENARIO_CHANGED : 'SERVER_RESPONSE_SCENARIO_CHANGED',
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

export const requestNewRfq = rfqCount => ({
  type: types.SEND_NEW_RFQ_REQUEST,
  rfqCount,
});

export const onSelectedRfqChanged = (newRfqId) => ({
  type: types.ON_SELECTED_RFQ_CHANGED,
  newRfqId,
});

export const sendRequest = (topic, payload) => ({
  type: types.SEND_REQUEST,
  data: {topic, payload}
});

export const onFwdPointsChanged = (id, rfqId, ccyNodeId, fwdPoints) => ({
  type: types.ON_FWD_POINTS_CHANGED,
  id,
  rfqId,
  ccyNodeId,
  fwdPoints
});

export const onSpotChanged = (id, rfqId, spot) => ({
  type: types.ON_SPOT_CHANGED,
  id,
  rfqId,
  spot
});

export const onRevertingSpot = (id, rfqId) => ({
  type: types.ON_REVERTING_SPOT,
  id,
  rfqId
});

export const onRevertingFwdPoints = (id, rfqId, ccyNodeId) => ({
  type: types.ON_REVERTING_FWD_POINTS,
  id,
  rfqId,
  ccyNodeId
});

export const onRefresh = (rfqId) => ({
  type: types.ON_REFRESH,
  rfqId,
});

export const onRefreshResponse = (rfq, serverError) => ({
  type: types.ON_REFRESH_RESPONSE,
  rfq,
  serverError
});

export const onReject = (rfqId) => ({
  type: types.ON_REJECT,
  rfqId
});

export const onRejectResponse = (rfqId, serverError) => ({
  type: types.ON_REJECT_RESPONSE,
  rfqId,
  serverError,
});

export const onAccept = (rfqId) => ({
  type: types.ON_ACCEPT,
  rfqId,
});

export const onAcceptResponse = (rfqId, serverError) => ({
  type: types.ON_ACCEPT_RESPONSE,
  rfqId,
  serverError,
});

export const connectedSuccessfully = () => ({ type: types.CONNECTED_SUCCESSFULLY });


export const serverResponseScenarioChanged  = newScenario => ({
  type: types.SERVER_RESPONSE_SCENARIO_CHANGED,
  newScenario
});

export const scenarioDelayedByParamChanged = delayBy => ({
  type: types.SCENARIO_DELAYED_BY_PARAM_CHANGED,
  delayBy
});


