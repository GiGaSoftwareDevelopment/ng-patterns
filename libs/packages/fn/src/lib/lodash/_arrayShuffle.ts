// @ts-nocheck
import copyArray from './_copyArray';
import shuffleSelf from './_shuffleSelf';

/**
 * A specialized version of `_.shuffle` for arrays.
 *
 * @private
 * @param {Array} array The array to shuffle.
 * @returns {Array} Returns the new shuffled array.
 */
function arrayShuffle(array) {
  return shuffleSelf(copyArray(array));
}

export default arrayShuffle;
