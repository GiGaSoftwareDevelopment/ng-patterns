import {valuesMatch} from './valuesMatch';

describe('valuesMatch', () => {
  it('should match', () => {
    const obj1 = {
      start: 1,
      end: 2,
      offset: 3,
      limit: 4,
      f: 'foo'
    };

    const obj2 = {
      start: 1,
      end: 2,
      offset: 3,
      limit: 4,
      f: 'bar'
    };

    expect(valuesMatch(obj1, obj2, ['start', 'end'])).toBe(true);
  });

  it('should NOT match', () => {
    const obj1 = {
      start: 1,
      end: 2,
      offset: 3,
      limit: 4,
      f: 'foo'
    };

    const obj2 = {
      start: 1,
      end: 3,
      offset: 3,
      limit: 4,
      f: 'bar'
    };

    expect(valuesMatch(obj1, obj2, ['start', 'end'])).toBe(false);
  });

  it('should  match null', () => {
    const obj1 = {
      start: 1,
      end: null,
      offset: 3,
      limit: 4,
      f: 'foo'
    };

    const obj2 = {
      start: 1,
      end: null,
      offset: 3,
      limit: 4,
      f: 'bar'
    };

    expect(valuesMatch(obj1, obj2, ['start', 'end'])).toBe(true);
  });

  it('should match undefined', () => {
    const obj1 = {
      start: 1,
      // end: null,
      offset: 3,
      limit: 4,
      f: 'foo'
    };

    const obj2 = {
      start: 1,
      // end: null,
      offset: 3,
      limit: 4,
      f: 'bar'
    };

    expect(valuesMatch(obj1, obj2, ['start', 'end'])).toBe(true);
  });
});
