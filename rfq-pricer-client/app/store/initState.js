import { connectionStatus } from '../constants';

export const initState = {
  connectionInfo: {
    connectionStatus: connectionStatus.DISCONNECTED,
    connectionError:'',
  },
  rfqIds:{
    //currently selected rfq
    selectedRfqId:'',

    //stores rfq IDs in the correct order, displayed in the gui
    rfqIdList: [],

    //Add an rfq id when an rfq is sent to the server for processing (e.g. reject, accept, etc.).
    //It should be removed from the rfqIdList immediately to follow the principle of optimistic updates of the GUI.
    //When a failure occurs or on timeout, remove the id and put it back into rfqIdList,
    // otherwise delete it when operation is confirmed by server.
    processingList: [],
  },

  //rfq details with rfqId as the key of each child object in this object
  rfqs: {},
};
