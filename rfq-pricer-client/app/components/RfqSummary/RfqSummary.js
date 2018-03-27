import React from 'react';

const RfqSummary = props => {

  const currencies = props.currencies.map(ccyPair => {
    return <div className='currency'>{ccyPair} </div>;
  });

  return (
    <li>
      <div className='rfqSummary'>
        <div className='summaryTopBox'>
          <div className='clientName'>{props.rfq.client}</div>
          <div className='status'>{props.rfq.status}</div>
        </div>
        <div className='summaryBottomBox'>
          <div>{props.rfq.productType}</div>
          <div>{currencies}</div>
        </div>
      </div>
    </li>
  );

};

export default RfqSummary;
