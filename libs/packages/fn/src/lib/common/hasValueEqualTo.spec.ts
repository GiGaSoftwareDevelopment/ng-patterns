/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {get} from '../lodash';
import {hasValueEqualTo} from './hasValueEqualTo';

describe('hasValueEqualTo', () => {
  it('should return false', () => {
    const src: any = {
      a: {
        b: null
      }
    };

    const tar: any = {
      c: {
        d: 'foo'
      }
    };

    expect(hasValueEqualTo(tar, 'c.d', get(src, 'a.b'))).toBe(false);
  });

  it('should return false', () => {
    const src: any = {
      a: {
        b: 'foo'
      }
    };

    const tar: any = {
      c: {
        d: null
      }
    };

    expect(hasValueEqualTo(tar, 'c.d', get(src, 'a.b'))).toBe(false);
  });

  it('should return true', () => {
    const src: any = {
      a: {
        b: 'foo'
      }
    };

    const tar: any = {
      c: {
        d: 'foo'
      }
    };

    expect(hasValueEqualTo(tar, 'c.d', get(src, 'a.b'))).toBe(true);
  });

  it('should return false', () => {
    const src: any = {
      a: {
        b: 'foo'
      }
    };

    const tar: any = {
      c: {
        d: 'bar'
      }
    };

    expect(hasValueEqualTo(tar, 'c.d', get(src, 'a.b'))).toBe(false);
  });
});
