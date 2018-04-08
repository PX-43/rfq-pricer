import numeral from 'numeral';

export const addTrailingZeros = (value, precision) => {
  const zeros = precision.toString().substr(1);
  return numeral(value).format('0.' + zeros);
};
