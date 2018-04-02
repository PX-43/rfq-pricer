import { connectionStatus } from '../constants';

export const initState = {
  connectionInfo: {
    connectionStatus: connectionStatus.DISCONNECTED,
    connectionError:'',
  },
  selectedRfq:'',
  rfqs: {},
  rfqIds: [], //stores rfq IDs in the correct order
  legs: {}
};
