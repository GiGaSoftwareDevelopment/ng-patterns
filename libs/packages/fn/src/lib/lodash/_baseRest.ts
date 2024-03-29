// @ts-nocheck
import identity from './identity';
import overRest from './_overRest';
import setToString from './_setToString';

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start?) {
  return setToString(overRest(func, start, identity), func + '');
}

export default baseRest;
