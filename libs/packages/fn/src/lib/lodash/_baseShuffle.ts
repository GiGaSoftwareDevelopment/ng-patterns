// @ts-nocheck
import shuffleSelf from './_shuffleSelf';
import values from './values';

/**
 * The base implementation of `_.shuffle`.
 *
 * @private
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 */
function baseShuffle(collection) {
  return shuffleSelf(values(collection));
}

export default baseShuffle;
