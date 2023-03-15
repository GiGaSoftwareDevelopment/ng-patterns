/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {keysAreTruthyInEntity} from './keysAreTruthyInEntity';

describe('keysAreTruthyInEntity', () => {
  it('should return false for entity with false prop', () => {
    const entity: {[key: string]: any} = {
      a: {a: 'a', b: true, c: false},
      b: {a: 'a', b: false, c: false},
      c: {a: 'a', b: true, c: false},
      d: {a: 'a', b: true, c: false}
    };
    expect(keysAreTruthyInEntity(entity, ['a', 'b'])).toBe(false);
  });

  it('should return true for entity with truthy props', () => {
    const entity: {[key: string]: any} = {
      a: {a: 'a', b: true, c: false},
      b: {a: 'a', b: true, c: false},
      c: {a: 'a', b: true, c: false},
      d: {a: 'a', b: true, c: false}
    };
    expect(keysAreTruthyInEntity(entity, ['a', 'b'])).toBe(true);
  });

  it('should return false for entity with null prop', () => {
    const entity: {[key: string]: any} = {
      a: {a: 'a', b: true, c: false},
      b: {a: null, b: true, c: false},
      c: {a: 'a', b: true, c: false},
      d: {a: 'a', b: true, c: false}
    };
    expect(keysAreTruthyInEntity(entity, ['a', 'b'])).toBe(false);
  });

  it('should return true for entity with null prop', () => {
    const entity: {[key: string]: any} = {
      a: {a: 'a', b: true, c: false},
      b: {a: 'a', b: true, c: false},
      c: {a: 'a', b: true, c: false},
      d: {a: 'a', b: true, c: false}
    };
    expect(keysAreTruthyInEntity(entity, 'b')).toBe(true);
  });
});
