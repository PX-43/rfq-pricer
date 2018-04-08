import { connectionStatus } from '../constants';

export const initState = {
  connectionInfo: {
    connectionStatus: connectionStatus.DISCONNECTED,
    connectionError:'',
  },
  selectedRfqId:'',
  rfqIds: [], //stores rfq IDs in the correct order
  rfqs: {},
};
