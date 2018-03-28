import React from 'react';
import CcyList from './CcyList';

const RfqSummary = props => {
  return (
    <li>
      <div className='rfqSummary'>
        <div className='summaryTopBox'>
          <div className='clientName'>{props.rfq.client}</div>
          <div className='status'>{props.rfq.status}</div>
        </div>
        <div className='summaryBottomBox'>
          <div>{props.rfq.productType}</div>
          <CcyList currencies={props.currencies} />
        </div>
      </div>
    </li>
  );
};

export default RfqSummary;
