import { connectionStatus } from '../constants';

export const initState = {
  connectionInfo: {
    connectionStatus: connectionStatus.DISCONNECTED,
    connectionError:'',
  },
  selectedRfq:'',
  rfqIds: [], //stores rfq IDs in the correct order
  rfqs: {},
  ccyNodes: {}, //first level group
  valueDateNodes: {}, //second level group
  legs: {}
};
