/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {mergePropsIfSourceHasValue} from './mergePropsIfSourceHasValue';

describe('mergePropsIfSourceHasValue', () => {
  it('should mergePropsIfSourceHasValue if source has value', () => {
    const t: any = {
      a: 'foo',
      b: ['foo'],
      c: false,
      d: null,
      e: '',
      g: 0,
      createdAt: 1,
      updatedAt: 2
    };

    const s: any = {
      d: 'newD',
      e: 'newE'
    };

    const r: any = mergePropsIfSourceHasValue(t, s);

    expect(r).toEqual(
      expect.objectContaining({
        d: 'newD',
        e: 'newE'
      })
    );
  });

  it('should not mergePropsIfSourceHasValue if source has no value', () => {
    const t: any = {
      a: 'foo',
      b: ['foo'],
      c: false,
      d: null,
      e: '',
      g: null, // no value
      createdAt: 1,
      updatedAt: 2
    };

    const s: any = {
      a: null,
      b: null,
      c: null,
      d: 'newD',
      e: 'newE',
      g: null,
      createdAt: null,
      updatedAt: null
    };

    const r: any = mergePropsIfSourceHasValue(t, s);

    expect(r).toEqual({
      a: 'foo',
      b: ['foo'],
      c: false,
      d: 'newD',
      e: 'newE',
      g: null, // no value
      createdAt: 1,
      updatedAt: 2
    });
  });

  it('should not merge null objects', () => {
    const t: any = {
      a: 'foo',
      b: ['foo'],
      c: false,
      d: null,
      e: {
        nestedE: {
          nestedEValue1: 'nestedEValue1',
          nestedEValue2: 'nestedEValue2',
          nestedEValue3: 'nestedEValue3'
        },
        eValue: 'eValue'
      },
      g: null, // no value
      createdAt: 1,
      updatedAt: 2
    };

    const s: any = {
      a: null,
      b: null,
      c: null,
      d: 'newD',
      e: null,
      g: null,
      createdAt: null,
      updatedAt: null
    };

    const r: any = mergePropsIfSourceHasValue(t, s);

    expect(r).toEqual({
      a: 'foo',
      b: ['foo'],
      c: false,
      d: 'newD',
      e: {
        nestedE: {
          nestedEValue1: 'nestedEValue1',
          nestedEValue2: 'nestedEValue2',
          nestedEValue3: 'nestedEValue3'
        },
        eValue: 'eValue'
      },
      g: null, // no value
      createdAt: 1,
      updatedAt: 2
    });
  });

  it('should add nested objects', () => {
    const t: any = {
      a: 'foo',
      b: ['foo'],
      c: false,
      d: null,
      e: null,
      g: null, // no value
      createdAt: 1,
      updatedAt: 2
    };

    const s: any = {
      a: null,
      b: null,
      c: null,
      d: null,
      e: {
        nestedE: {
          nestedEValue1: 'nestedEValue1',
          nestedEValue2: 'nestedEValue2',
          nestedEValue3: 'nestedEValue3'
        },
        eValue: 'eValue'
      },
      g: null,
      createdAt: null,
      updatedAt: null
    };

    const r: any = mergePropsIfSourceHasValue(t, s);

    expect(r).toEqual({
      a: 'foo',
      b: ['foo'],
      c: false,
      d: null,
      e: {
        nestedE: {
          nestedEValue1: 'nestedEValue1',
          nestedEValue2: 'nestedEValue2',
          nestedEValue3: 'nestedEValue3'
        },
        eValue: 'eValue'
      },
      g: null,
      createdAt: 1,
      updatedAt: 2
    });
  });

  it('should add nested objects', () => {
    const nested1: any = {
      a: 'foo',
      b: ['foo'],
      c: false,
      d: null,
      e: {
        nestedE: {
          nestedEValue1: 'nestedEValue1',
          nestedEValue2: 'nestedEValue2',
          nestedEValue3: 'nestedEValue3'
        },
        eValue: 'eValue'
      },
      g: null, // no value
      createdAt: 1,
      updatedAt: 2
    };

    const nested2: any = {
      e: {
        nestedE: {
          nestedEValue1: null,
          nestedEValue2: 'updated',
          nestedEValue3: null
        },
        eValue: 'eValue'
      }
    };

    const r: any = mergePropsIfSourceHasValue(nested1, nested2);

    expect(r).toEqual({
      a: 'foo',
      b: ['foo'],
      c: false,
      d: null,
      e: {
        nestedE: {
          nestedEValue1: 'nestedEValue1',
          nestedEValue2: 'updated',
          nestedEValue3: 'nestedEValue3'
        },
        eValue: 'eValue'
      },
      g: null,
      createdAt: 1,
      updatedAt: 2
    });
  });

  it('should initialize and object', () => {
    const nested1: any = {
      a: null,
      b: null,
      c: null,
      d: null,
      e: {
        nestedE: {
          nestedEValue1: null,
          nestedEValue2: null,
          nestedEValue3: null
        },
        eValue: null
      },
      g: null, // no value
      createdAt: null,
      updatedAt: null
    };

    const nested2: any = {
      e: {
        nestedE: {
          nestedEValue1: null,
          nestedEValue2: 'updated',
          nestedEValue3: null
        },
        eValue: 'eValue'
      },
      createdAt: 1,
      updatedAt: 2
    };

    const r: any = mergePropsIfSourceHasValue(nested1, nested2);

    expect(r).toEqual({
      a: null,
      b: null,
      c: null,
      d: null,
      e: {
        nestedE: {
          nestedEValue1: null,
          nestedEValue2: 'updated',
          nestedEValue3: null
        },
        eValue: 'eValue'
      },
      g: null, // no value
      createdAt: 1,
      updatedAt: 2
    });
  });

  it('should pass target if source is null', () => {
    const nested1: any = {
      a: null,
      b: null,
      c: null,
      d: null,
      e: {
        nestedE: {
          nestedEValue1: null,
          nestedEValue2: null,
          nestedEValue3: null
        },
        eValue: null
      },
      g: null, // no value
      createdAt: null,
      updatedAt: null
    };

    const nested2: any = null;

    const r: any = mergePropsIfSourceHasValue(nested1, nested2);

    expect(r).toEqual(nested1);
  });
});
