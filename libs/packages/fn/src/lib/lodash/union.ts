// @ts-nocheck
import baseFlatten from './_baseFlatten';
import baseRest from './_baseRest';
import baseUniq from './_baseUniq';
import isArrayLikeObject from './isArrayLikeObject';

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = baseRest(function (arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
});

export default union;
