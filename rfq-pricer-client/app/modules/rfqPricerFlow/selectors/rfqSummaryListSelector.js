import { createSelector } from 'reselect';
import orderBy from "lodash/orderBy";
import uniq from "lodash/uniq";
import sumBy from "lodash/sumBy";
import { status } from "../../../constants";

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

export const getNumberOfNewRfqs = createSelector (
  [getRfqList, getRfqIds],
  (rfqs, rfqIds) => {
    return rfqIds.reduce((numberOfNewRfqs, rfqId) => {
        return (rfqs[rfqId].status === status.NEW) ? numberOfNewRfqs + 1 : numberOfNewRfqs;
    }, 0);
  }
);
