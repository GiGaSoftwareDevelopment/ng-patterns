/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {ternary} from './ternary';

describe('ternary', () => {
  // tenary uses `hasValue` for truthy, so not
  // going to test every case of `hasValue`
  it('should return value if defined', () => {
    const _value: any = ternary('foo', 'bar');
    expect(_value).toEqual('foo');
  });

  it('should return conditional value', () => {
    // uses `hasValue` evaluation
    const _value: any = ternary([], 'bar');
    expect(_value).toEqual('bar');
  });
});
