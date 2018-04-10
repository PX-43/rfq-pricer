import numeral from 'numeral';

const roundBy = (precision, val) => {
  return Math.round(val * precision) / precision ;
};

export const addTrailingZeros = (value, precision) => {
  const zeros = precision.toString().substr(1);
  return numeral(value).format('0.' + zeros);
};

export const calcFwdPrice = (spot, fwdPoints, precision) => {
  const fwdPrice = spot + (fwdPoints / precision);
  return roundBy(precision,  fwdPrice);
};
