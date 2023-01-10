// @ts-nocheck
import map from './map';
import baseAt from './.internal/baseAt';
import basePullAt from './.internal/basePullAt';
import compareAscending from './.internal/compareAscending';
import isIndex from './.internal/isIndex';

/**
 * Removes elements from `array` corresponding to `indexes` and returns an
 * array of removed elements.
 *
 * **Note:** Unlike `at`, this method mutates `array`.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
 * @returns {Array} Returns the new array of removed elements.
 * @see pull, pullAll, pullAllBy, pullAllWith, remove, reject
 * @example
 *
 * const array = ['a', 'b', 'c', 'd']
 * const pulled = pullAt(array, [1, 3])
 *
 * console.log(array)
 * // => ['a', 'c']
 *
 * console.log(pulled)
 * // => ['b', 'd']
 */
function pullAt(array, ...indexes) {
  const length = array == null ? 0 : array.length;
  const result = baseAt(array, indexes);

  basePullAt(
    array,
    map(indexes, index => (isIndex(index, length) ? +index : index)).sort(
      compareAscending
    )
  );
  return result;
}

export default pullAt;
