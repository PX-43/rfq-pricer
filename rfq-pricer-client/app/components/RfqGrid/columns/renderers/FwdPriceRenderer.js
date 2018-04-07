import React from 'react';
import { products } from '../../../../constants';

const FwdPriceRenderer = props => {
  const {data: {fwdPrice, legType}} = props;

  if(legType === products.SPOT){
    return '-';
  } else if(!fwdPrice) {
    return null;
  } else {
    return fwdPrice;
  }
};

export default FwdPriceRenderer;
