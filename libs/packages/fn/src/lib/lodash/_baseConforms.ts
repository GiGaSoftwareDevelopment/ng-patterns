// @ts-nocheck
import baseConformsTo from './_baseConformsTo';
import keys from './keys';

/**
 * The base implementation of `_.conforms` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 */
function baseConforms(source) {
  var props = keys(source);
  return function (object) {
    return baseConformsTo(object, source, props);
  };
}

export default baseConforms;
