import React from 'react';

const RfqRequestButton = props => {

  return (
    <button onClick={() => props.requestNewRfq(1)}>
      Request RFQ
    </button>
  );

};

export default RfqRequestButton;
