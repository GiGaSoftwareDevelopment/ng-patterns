// @ts-nocheck
import addMapEntry from './_addMapEntry';
import arrayReduce from './_arrayReduce';
import mapToArray from './_mapToArray';

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep
    ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG)
    : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor());
}

export default cloneMap;
