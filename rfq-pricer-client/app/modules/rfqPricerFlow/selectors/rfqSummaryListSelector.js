import { createSelector } from 'reselect';
import orderBy from "lodash/orderBy";
import uniq from "lodash/uniq";

const getRfqList = state => state.rfqs;
const getRfqIds = state => state.rfqIds;

export const getRfqSummaryList = createSelector(
  [getRfqList, getRfqIds],
  (rfqs, rfqIds) => {
    let result = [];
    rfqIds.forEach(id => {
      const ccyPairs = orderBy( uniq( rfqs[id].ccyNodes.map(ccy => ccy.ccyPair) ) );
      result.push(
        {
          rfq:rfqs[id],
          ccyPairs
        }
      );
    });

    return result;
  }
);
