/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {interfaceHasValueIn} from './interfaceHasValueIn';

describe('propTruthyInAllPaths', () => {
  it('should return false', () => {
    const o: any = {
      controls: {
        name: {
          dirty: false,
          pristine: true
        },
        email: {
          dirty: false,
          pristine: true
        },
        password: {
          dirty: false,
          pristine: true
        },
        verifyPassword: {
          dirty: false,
          pristine: true
        }
      }
    };

    // basePath may be a path such as 'a.b.c[0]' etc.
    expect(interfaceHasValueIn(o, 'controls', 'dirty')).toBe(true);
  });

  it('should return true', () => {
    const o: any = {
      controls: {
        name: {
          dirty: true,
          pristine: false
        },
        email: {
          dirty: null, // <-- no value
          pristine: false
        },
        password: {
          dirty: true,
          pristine: false
        },
        verifyPassword: {
          dirty: true,
          pristine: false
        }
      }
    };

    // basePath may be a path such as 'a.b.c[0]' etc.
    expect(interfaceHasValueIn(o, 'controls', 'dirty')).toBe(false);
  });
});
