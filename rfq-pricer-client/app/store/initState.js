import { connectionStatus } from '../constants';

export const initState = {
  connectionInfo: {
    connectionStatus: connectionStatus.DISCONNECTED,
    connectionError:'',
  },
  //parameters to send to the server to create test scenarios (e.g. delays or errors, etc)
  testParameters:{

  },
  rfqIds:{
    //currently selected rfq
    selectedRfqId:'',

    //stores rfq IDs in the correct order, displayed in the gui
    rfqIdList: [],

    //Add an rfq id when an rfq is sent to the server for processing (e.g. reject, accept, etc.).
    //It should be removed from the rfqIdList immediately to follow the principle of optimistic updates of the GUI.
    //When a failure or timeout occur, remove the id and put it back into rfqIdList, so the user can decide what to do
    // with it, otherwise delete it when operation is confirmed by server.
    processingList: [],
  },

  //rfq details with rfqId as the key of each child object in this object
  rfqs: {},
};
