import test from 'tape';
import {divideAt} from '../arrayUtils';

test('divideAt should return correct number of arrays', (assert) => {

  const expected = 2;
  const actual = divideAt([1,2,4,5,6], 3).length;

  assert.equal(actual, expected, 'Should be equal.');

  assert.end();
});
