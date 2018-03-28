import take from 'lodash/take';
import takeRight from 'lodash/takeRight';


//It partitions an array on a given index
// (lodash partition or -By functions don't take array index as input)
export const divideAt = (divideIndex, arr) => {
  return[
    take(arr, divideIndex),
    takeRight(arr, arr.length-divideIndex)
  ];
};
