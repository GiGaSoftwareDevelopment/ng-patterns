/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { hasValueNotEqualIn } from './hasValueNotEqualIn';

describe('hasValueEqualIn', () => {
  it('should return false', () => {
    const src: any = {
      a: {
        b: null,
      },
    };

    const tar: any = {
      c: {
        d: 'foo',
      },
    };

    expect(hasValueNotEqualIn(tar, 'c.d', src, 'a.b')).toBe(false);
  });

  it('should return true', () => {
    const src: any = {
      a: {
        b: 'foo',
      },
    };

    const tar: any = {
      c: {
        d: null,
      },
    };

    expect(hasValueNotEqualIn(tar, 'c.d', src, 'a.b')).toBe(true);
  });

  it('should return false', () => {
    const src: any = {
      a: {
        b: 'foo',
      },
    };

    const tar: any = {
      c: {
        d: 'foo',
      },
    };

    expect(hasValueNotEqualIn(tar, 'c.d', src, 'a.b')).toBe(false);
  });

  it('should return true', () => {
    const src: any = {
      a: {
        b: 'foo',
      },
    };

    const tar: any = {
      c: {
        d: 'bar',
      },
    };

    expect(hasValueNotEqualIn(tar, 'c.d', src, 'a.b')).toBe(true);
  });
});
