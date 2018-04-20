import { connectionStatus } from '../constants';

export const initState = {
  connectionInfo: {
    connectionStatus: connectionStatus.DISCONNECTED,
    connectionError:'',
  },
  rfqIds:{
    selectedRfqId:'',
    rfqIdList: [], //stores rfq IDs in the correct order
  },
  rfqs: {},
};
