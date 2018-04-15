
export const connectionStatus = {
  DISCONNECTED: 'disconnected',
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
};

export const topics = {
  SUBSCRIBE_RFQ : 'subscribe_to_rfq',
  SUBSCRIBE_PRICE : 'subscribe_to_prices',
  GET_PRICE : 'get_price',
  RFQ: 'rfq',
};

export const products = {
  SPOT: 'Spot',
  FWD: 'Fwd',
};

export const status = {
  NEW: 'New',
};

export const viewConstants = {
  MAX_CCYS_ON_RFQ_SUMMARY : 3,
  RFQ_GRID_MIN_HEIGHT : 300,
  RFQ_GRID_ROW_HEIGHT : 38,
  SPOT_GRID_COLUMN: 'spot',
  FOCUSED_CELL_CLASSES: '.editable-cell-style.ag-cell-focus',
  EVENTS: {
    KEY_PRESS:'keypress',
  },
  KEYS: {
    ENTER:'Enter',
  }
};

