import { createSelector } from 'reselect'


const getRfqList = state => state.rfqs;
const getRfqIds = state => state.rfqIds;

export const getRfqSummaryList = createSelector(
  [getRfqList, getRfqIds],
  (rfqs, rfqIds) => {
    let result = [];
    rfqIds.forEach(id => {
      result.push(rfqs[id]);
    });
    console.dir(result);
    return result;
  }
);
