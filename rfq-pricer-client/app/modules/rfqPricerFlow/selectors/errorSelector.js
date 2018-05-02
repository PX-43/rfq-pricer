import { createSelector } from 'reselect';
import { viewConstants as vc } from '../../../constants';


const getServerError = state => state.serverError;
const getConnectionError = state => state.connectionInfo.connectionError;


export const getError = createSelector (
  [getServerError, getConnectionError],

  (serverErr, connectionErr) => {
    if(connectionErr)
      return connectionErr;

    if(serverErr)
      return serverErr;

    return vc.NO_ERROR;
  }
);


