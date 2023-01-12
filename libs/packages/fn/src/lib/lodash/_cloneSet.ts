// @ts-nocheck
import addSetEntry from './_addSetEntry';
import arrayReduce from './_arrayReduce';
import setToArray from './_setToArray';

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep
    ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG)
    : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor());
}

export default cloneSet;
