import React from 'react';
import { products } from '../../../../constants';
import { priceUtils } from '../../../../utils';

export default props => {
  const {data: {fwdPrice, precision, legType}} = props;

  if(legType === products.SPOT || !fwdPrice) {
    return null;
  } else {
    return priceUtils.addTrailingZeros(fwdPrice, precision);
  }
};
