import { createSelector } from 'reselect';
import map from 'lodash/fp/map';
import groupBy from 'lodash/fp/groupBy';
import filter from 'lodash/fp/filter';
import flow from 'lodash/fp/flow';

const getServerErrors = state => state.serverErrors;
const getConnectionError = state => state.connectionInfo.connectionError;


export const getErrors = createSelector (
  [getServerErrors, getConnectionError],

  (serverErrors, connectionError) => {

    const preparedErrors = flow(groupBy(e => e),
                                map(e => ({ error:e[0], count:e.length })),
                                filter(e => e.count > 0))(serverErrors);

    if(connectionError)
      return [{error:connectionError, count:1}, ...preparedErrors];

    return preparedErrors;
  }
);


