import { createSelector } from 'reselect';

const selectedRfqId = state => state.rfqIds.selectedRfqId;
const selectedRfq = state => state.rfqs[state.rfqIds.selectedRfqId];
const rfqById = (state, rfqId) => state.rfqs[rfqId];

export const getSelectedRfqId = createSelector( [selectedRfqId], rfqId => rfqId );

export const getRfqData = createSelector( [rfqById], rfq => rfq);

export const getSelectedRfqData = createSelector(
  [selectedRfq],
  (rfq) => {
     if(!rfq){
       return [];
     } else {
       return rfq.ccyNodes;
     }

  }
);



