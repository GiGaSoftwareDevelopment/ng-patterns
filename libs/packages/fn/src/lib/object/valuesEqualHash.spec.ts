/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {valuesEqualHash} from './valuesEqualHash';

describe('propsAreEqual', () => {
  it('should evaluate equality with map', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      d: [
        {
          d1: [
            {
              d3: 'd3'
            }
          ]
        }
      ]
    };

    const target: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      x: 'x',
      d: [
        {
          d1: [
            {
              d3: 'd3'
            }
          ]
        }
      ]
    };

    const map: any = {
      a: 'a',
      b1: 'b.b1',
      c2: 'b.c1.c2',
      d3: 'd[0].d1[0].d3'
    };

    expect(valuesEqualHash(target, source, map)).toBe(true);
  });

  it('should not evaluate equality with map', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      d: [
        {
          d1: [
            {
              d3: 'd4' // NOT EQUAL
            }
          ]
        }
      ]
    };

    const target: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      x: 'x',
      d: [
        {
          d1: [
            {
              d3: 'd3'
            }
          ]
        }
      ]
    };

    const map: any = {
      a: 'a',
      b1: 'b.b1',
      c2: 'b.c1.c2',
      d3: 'd[0].d1[0].d3'
    };

    expect(valuesEqualHash(target, source, map)).toBe(false);
  });

  it('should not evaluate equality with map', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      d: [
        {
          d1: [
            {
              d3: null // NOT EQUAL
            }
          ]
        }
      ]
    };

    const target: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      x: 'x',
      d: [
        {
          d1: [
            {
              d3: 'd3'
            }
          ]
        }
      ]
    };

    const map: any = {
      a: 'a',
      b1: 'b.b1',
      c2: 'b.c1.c2',
      d3: 'd[0].d1[0].d3'
    };

    expect(valuesEqualHash(target, source, map)).toBe(false);
  });

  it('should evaluate equality with _array', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      d: [
        {
          d1: [
            {
              d3: 'd3'
            }
          ]
        }
      ]
    };

    const target: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      x: 'x',
      d: [
        {
          d1: [
            {
              d3: 'd3'
            }
          ]
        }
      ]
    };

    const arr: string[] = ['a', 'b.b1', 'b.c1.c2', 'd[0].d1[0].d3'];

    expect(valuesEqualHash(target, source, arr)).toBe(true);
  });

  it('should evaluate equality with _array', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      d: [
        {
          d1: [
            {
              d3: 'd4' // not equal
            }
          ]
        }
      ]
    };

    const target: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      x: 'x',
      d: [
        {
          d1: [
            {
              d3: 'd3'
            }
          ]
        }
      ]
    };

    const arr: string[] = ['a', 'b.b1', 'b.c1.c2', 'd[0].d1[0].d3'];

    expect(valuesEqualHash(target, source, arr)).toBe(false);
  });

  it('should evaluate equality with _array', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      d: [
        {
          d1: [
            {
              d3: null // not equal
            }
          ]
        }
      ]
    };

    const target: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2'
        }
      },
      x: 'x',
      d: [
        {
          d1: [
            {
              d3: 'd3'
            }
          ]
        }
      ]
    };

    const arr: string[] = ['a', 'b.b1', 'b.c1.c2', 'd[0].d1[0].d3'];

    expect(valuesEqualHash(target, source, arr)).toBe(false);
  });
});
