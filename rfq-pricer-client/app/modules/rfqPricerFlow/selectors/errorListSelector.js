import { createSelector } from 'reselect';
import chain from 'lodash/chain';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';

const getServerErrors = state => state.serverErrors;
const getConnectionError = state => state.connectionInfo.connectionError;


export const getErrors = createSelector (
  [getServerErrors, getConnectionError],

  (serverErrors, connectionError) => {

    const preparedErrors = chain(serverErrors).groupBy().map(g => ({ error:g[0], count:g.length })).value();

    if(connectionError)
      return [{error:connectionError, count:1}, ...preparedErrors];

    return serverErrors;
  }
);


