import React from 'react';
import { products } from '../../../../constants';

export default props => {
  const {data: {tenor, valueDate, legType}} = props;

  return (
    <div>
      <span style={{ float:'left' }}>{(legType === products.SPOT ? 'Spot' : tenor)}</span>
      <span style={{ float:'right' }}>{valueDate}</span>
    </div>
  );
};
