// @ts-nocheck
import baseConformsTo from './baseConformsTo';
import keys from '../keys';

/**
 * The base implementation of `conforms` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 */
function baseConforms(source) {
  const props = keys(source);
  return object => baseConformsTo(object, source, props);
}

export default baseConforms;
