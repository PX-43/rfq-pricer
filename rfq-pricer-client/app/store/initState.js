import { connectionStatus } from "../constants";

export const initState = {
  connectionInfo: {
    connectionStatus: connectionStatus.DISCONNECTED,
    connectionError:'',
  },
  rfqs: {},
  rfqOrder: [],
  legs: {}
};
