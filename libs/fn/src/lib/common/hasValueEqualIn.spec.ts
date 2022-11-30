/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { hasValueEqualIn } from './hasValueEqualIn';

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

    expect(hasValueEqualIn(tar, 'c.d', src, 'a.b')).toBe(false);
  });

  it('should return false', () => {
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

    expect(hasValueEqualIn(tar, 'c.d', src, 'a.b')).toBe(false);
  });

  it('should return true', () => {
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

    expect(hasValueEqualIn(tar, 'c.d', src, 'a.b')).toBe(true);
  });

  it('should return false', () => {
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

    expect(hasValueEqualIn(tar, 'c.d', src, 'a.b')).toBe(false);
  });
});
