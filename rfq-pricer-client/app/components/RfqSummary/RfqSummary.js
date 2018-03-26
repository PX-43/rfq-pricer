import React from 'react';

const RfqSummary = props => {

  return (
    <li>
      <div className='rfqSummary'>
        <div className='clientName'>{props.rfq.client}</div>
        <div>{props.rfq.productType}</div>
      </div>
    </li>
  );

};

export default RfqSummary;
