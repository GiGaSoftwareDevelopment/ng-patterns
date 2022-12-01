import {keysAreTruthyInCollection} from './keysAreTruthyInCollection';

describe('keysAreTruthyInCollection', () => {
  it('should return false if all items are false', () => {
    const collection = [
      {a: 'a', b: false, c: false},
      {a: 'a', b: false, c: false},
      {a: 'a', b: false, c: false},
      {a: 'a', b: false, c: false}
    ];
    expect(keysAreTruthyInCollection(collection, ['a', 'b'])).toBe(false);
  });

  it('should true if all items are true', () => {
    const collection = [
      {a: 'a', b: true, c: false},
      {a: 'a', b: true, c: false},
      {a: 'a', b: true, c: false},
      {a: 'a', b: true, c: false}
    ];
    expect(keysAreTruthyInCollection(collection, ['a', 'b'])).toBe(true);
  });

  it('should false if one item is false', () => {
    const collection = [
      {a: 'a', b: true, c: false},
      {a: 'a', b: true, c: false},
      {a: 'a', b: false, c: false},
      {a: 'a', b: true, c: false}
    ];
    expect(keysAreTruthyInCollection(collection, ['a', 'b'])).toBe(false);
  });

  it('should false if one item is false and one key is provided', () => {
    const collection = [
      {a: 'a', b: true, c: false},
      {a: 'a', b: true, c: false},
      {a: 'a', b: false, c: false},
      {a: 'a', b: true, c: false}
    ];
    expect(keysAreTruthyInCollection(collection, 'b')).toBe(false);
  });

  it('should true if all items of provided key is truthy', () => {
    const collection = [
      {a: 'a', b: true, c: false},
      {a: 'a', b: true, c: false},
      {a: 'a', b: true, c: false},
      {a: 'a', b: true, c: false}
    ];
    expect(keysAreTruthyInCollection(collection, 'b')).toBe(true);
  });

  it('should false if one value is null', () => {
    const collection = [
      {a: 'a', b: true, c: false},
      {a: 'a', b: true, c: false},
      {a: null, b: true, c: false},
      {a: 'a', b: true, c: false}
    ];
    expect(keysAreTruthyInCollection(collection, ['a', 'b'])).toBe(false);
  });

  it('should false if one value is null of single provided key', () => {
    const collection = [
      {a: 'a', b: true, c: false},
      {a: 'a', b: true, c: false},
      {a: 'a', b: null, c: false},
      {a: 'a', b: true, c: false}
    ];
    expect(keysAreTruthyInCollection(collection, 'b')).toBe(false);
  });
});
