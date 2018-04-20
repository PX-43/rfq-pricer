import { createSelector } from 'reselect';

const selectedRfqId = state => state.rfqIds.selectedRfqId;
const selectedRfq = state => state.rfqs[state.rfqIds.selectedRfqId];

export const getSelectedRfqId = createSelector( [selectedRfqId], rfqId => rfqId );

export const getRfqData = createSelector(
  [selectedRfq],
  (rfq) => {
     if(!rfq){
       return [];
     } else {
       return rfq.ccyNodes;
     }

  }
);
