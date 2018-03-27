import { createSelector } from 'reselect';
import uniq from 'lodash/uniq';
import keys from 'lodash/keys';


const getRfqList = state => state.rfqs;
const getLegs = state => state.legs;
const getRfqIds = state => state.rfqIds;

export const getCurrencies = createSelector(
  [getRfqList, getLegs],
  (rfqs, legs) => {
    let result = {};
    keys(rfqs).forEach(rfqId => {
      let ccyPairs = [];
      rfqs[rfqId].legIds.forEach(legId => {
       console.dir(legs[legId]);
        //ccyPairs.push(legs[legId].ccyPair);
      });
      result[rfqId] = uniq(ccyPairs);
    });

    return result;
  }
);

export const getRfqSummaryList = createSelector(
  [getRfqList, getRfqIds],
  (rfqs, rfqIds) => {
    let result = [];
    rfqIds.forEach(id => {
      result.push(rfqs[id]);
    });

    return result;
  }
);
