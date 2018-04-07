import React from 'react';
import numeral from 'numeral';

const AmountRenderer = props => {
  const {data: {amount}} = props;
  return numeral(amount).format('0,0');
};

export default AmountRenderer;
