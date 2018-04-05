import { connectionStatus } from '../constants';

export const initState = {
  connectionInfo: {
    connectionStatus: connectionStatus.DISCONNECTED,
    connectionError:'',
  },
  selectedRfq:'',
  rfqIds: [], //stores rfq IDs in the correct order
  rfqs: {},
};
