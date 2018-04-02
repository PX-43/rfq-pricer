import React from 'react';
import CcyList from './CcyList';

const RfqSummary = props => {

  const className = (props.selectedRfq ===  props.rfq.id) ?
                      'rfq-summary--selected' :
                      'rfq-summary';
  return (
    <li>
      <div className={className} onClick={() => props.selectedRfqChanged(props.rfq.id)}>
        <div className='rfq-summary__top'>
          <div className='rfq-summary__name'>{props.rfq.client}</div>
          <div>{props.rfq.status}</div>
        </div>
        <div className='rfq-summary__bottom'>
          <div>{props.rfq.productType}</div>
          <CcyList ccyPairs={props.rfq.ccyPairs} />
        </div>
      </div>
    </li>
  );
};

export default RfqSummary;
