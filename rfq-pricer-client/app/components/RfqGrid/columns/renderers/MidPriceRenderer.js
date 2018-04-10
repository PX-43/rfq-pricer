import React from 'react';
import { priceUtils } from '../../../../utils';

export default props => {
  const {data: {midPrice, precision}} = props;

  if(!midPrice) {
    return null;
  } else {
    return priceUtils.addTrailingZeros(midPrice, precision);
  }
}
