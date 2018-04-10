import React from 'react';
import numeral from 'numeral';

export default props => {
  const {data: {amount}} = props;
  return numeral(amount).format('0,0');
};
