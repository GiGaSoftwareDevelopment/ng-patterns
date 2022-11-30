/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { propsWithNoValue } from './propsWithNoValue';

describe('propsWithNoValue', () => {
  it('should return properties with no value', () => {
    const t: any = {
      a: 'foo',
      b: ['foo'],
      c: false,
      d: null,
      e: '',
      g: 0,
    };

    const r: any = propsWithNoValue(t);

    expect(r).toEqual({
      d: null,
      e: '',
    });
  });
});
