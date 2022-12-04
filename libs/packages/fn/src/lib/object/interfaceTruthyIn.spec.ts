/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {interfaceTruthyIn} from './interfaceTruthyIn';

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
    expect(interfaceTruthyIn(o, 'controls', 'dirty')).toBe(false);
  });

  it('should return true', () => {
    const o: any = {
      controls: {
        name: {
          dirty: true,
          pristine: false
        },
        email: {
          dirty: true,
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
    expect(interfaceTruthyIn(o, 'controls', 'dirty')).toBe(true);
  });

  it('should return false if one value is false', () => {
    const o: any = {
      controls: {
        name: {
          dirty: true,
          pristine: false
        },
        email: {
          dirty: false,
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
    expect(interfaceTruthyIn(o, 'controls', 'dirty')).toBe(false);
  });
});
