import { createSelector } from 'reselect';

const selectedRfqId = state => state.selectedRfqId;
const selectedRfq = state => state.rfqs[state.selectedRfqId];

export const getSelectedRfqId = createSelector( [selectedRfqId], rfqId => rfqId );

export const getRfqData = createSelector(
  [selectedRfq],
  (rfq) => {
     if(!rfq){
       return [];
     } else {
       return rfq.ccyNodes;
     }

     //
     //
     //
     //
     // return [
     //   {
     //     ccyPair: "EUR USD",
     //     side: "BUY",
     //     amount: "5m EUR",
     //     spot: "1.10232",
     //     valueDateNodes:[
     //       {
     //         ccyPair:'EUR USD',
     //         product: "FWD",
     //         side: "BUY",
     //         amount:'1m EUR',
     //         valueDate:'3M   15-Jun-16',
     //         spot:'1.10232',
     //         fwdPoints:0.6,
     //         fwdPrice:'1.10232',
     //         midPrice:'1.10232',
     //         legs:[
     //           {
     //             product: "FWD",
     //             side: "BUY",
     //             amount:'1m EUR',
     //             valueDate:'3M   15-Jun-16',
     //             fund: 'BA-233-H322',
     //             stamm: '233-H322',
     //           },
     //           {
     //             product: "FWD",
     //             side: "BUY",
     //             amount:'2m EUR',
     //             valueDate:'2M   15-Oct-16',
     //             fund: 'BA-233-K9393',
     //             stamm: '233-K9393',
     //           },
     //         ]
     //       },
     //       {
     //         ccyPair:'EUR USD',
     //         product: "FWD",
     //         side: "BUY",
     //         amount:'4m EUR',
     //         valueDate:'2M   15-Oct-16',
     //         spot:'1.10228',
     //         fwdPoints:0.4,
     //         fwdPrice:'1.10228',
     //         midPrice:'1.10228',
     //         legs:[
     //           {
     //             product: "FWD",
     //             side: "BUY",
     //             amount:'4m EUR',
     //             valueDate:'3M   15-Jun-16',
     //             fund: 'BA-233-C0349',
     //             stamm: '233-C0349',
     //           }
     //         ]
     //       },
     //     ],
     //   },
     //   {
     //     ccyPair: "GBP USD",
     //     side: "SELL",
     //     amount: "10m GBP",
     //     spot: "1.45232",
     //     valueDateNodes:[
     //       {
     //         ccyPair:'GBP USD',
     //         product: "Spot",
     //         side: "SELL",
     //         amount:'1m GBP',
     //         valueDate:'Spot   02-Apr-16',
     //         spot:'1.45232',
     //         fwdPoints:0.6,
     //         fwdPrice:'1.45232',
     //         midPrice:'1.45232',
     //         legs:[
     //           {
     //             product: "Spot",
     //             side: "SELL",
     //             amount:'1m GBP',
     //             valueDate:'Spot   02-Apr-16',
     //             fund: 'BA-233-M9393',
     //             stamm: '233-M9393',
     //           }
     //         ]
     //       },
     //       {
     //         ccyPair:'GBP USD',
     //         product: "Spot",
     //         side: "SELL",
     //         amount:'4m GBP',
     //         valueDate:'Spot   02-Apr-16',
     //         spot:'1.45232',
     //         fwdPoints:0.4,
     //         fwdPrice:'1.45232',
     //         midPrice:'1.45232',
     //         legs:[
     //           {
     //             product: "Spot",
     //             side: "SELL",
     //             amount:'1m GBP',
     //             valueDate:'Spot   02-Apr-16',
     //             fund: 'BA-233-D94893',
     //             stamm: '233-D94893',
     //           },
     //           {
     //             product: "Spot",
     //             side: "SELL",
     //             amount:'3m GBP',
     //             valueDate:'Spot   02-Apr-16',
     //             fund: 'BA-233-P893',
     //             stamm: '233-P893',
     //           }
     //         ]
     //       },
     //     ],
     //   },
     // ]


  }
);
