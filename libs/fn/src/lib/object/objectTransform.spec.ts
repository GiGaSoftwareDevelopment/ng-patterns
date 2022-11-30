/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { objectTransform, objectTransformMap } from './objectTransform';

describe('transform', () => {
  it('should return object with mapped values', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2',
        },
      },
      d: [
        {
          d1: [
            {
              d3: 'd3',
            },
          ],
        },
      ],
    };

    const map: any = {
      a: 'a',
      b1: 'b.b1',
      c2: 'b.c1.c2',
      d3: 'd[0].d1[0].d3',
    };

    const r: any = objectTransform(source, map);

    expect(r.a).toBe('a');
    expect(r.b1).toBe('b1');
    expect(r.c2).toBe('c2');
    expect(r.d3).toBe('d3');
  });

  it('should return object with null values if prop is missing', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
      },
      d: [
        {
          d1: [
            {
              d3: 'd3',
            },
          ],
        },
      ],
    };

    const map: any = {
      a: 'a',
      b1: 'b.b1',
      c2: 'b.c1.c2',
      d3: 'd[0].d1[0].d3',
    };

    const r: any = objectTransform(source, map);

    expect(r.a).toBe('a');
    expect(r.b1).toBe('b1');
    expect(r.c2).toBeNull();
    expect(r.d3).toBe('d3');
  });

  it('should transform to new paths', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
      },
      d: [
        {
          d1: [
            {
              d3: 'd3',
            },
          ],
        },
      ],
    };

    const map: any = {
      w: 'a',
      'x.x1': 'b.b1',
      'y[0]': 'b.c1.c2',
      'z.z1[0]': 'd[0].d1[0].d3',
    };

    const r: any = objectTransform(source, map);

    expect(r.w).toBe('a');
    expect(r.x.x1).toBe('b1');
    expect(r.y[0]).toBeNull();
    expect(r.z.z1[0]).toBe('d3');
  });
});

describe('objectTransformMap', () => {
  it('should return object with mapped values', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
        c1: {
          c2: 'c2',
        },
      },
      d: [
        {
          d1: [
            {
              d3: 'd3',
            },
          ],
        },
      ],
    };

    const map: any = {
      a: 'a',
      'b.b1': 'b1',
      'b.c1.c2': 'c2',
      'd[0].d1[0].d3': 'd3',
    };

    const r: any = objectTransformMap(source, map);

    expect(r.a).toBe('a');
    expect(r.b1).toBe('b1');
    expect(r.c2).toBe('c2');
    expect(r.d3).toBe('d3');
  });

  it('should return object with null values if prop is missing', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
      },
      d: [
        {
          d1: [
            {
              d3: 'd3',
            },
          ],
        },
      ],
    };

    const map: any = {
      a: 'a',
      'b.b1': 'b1',
      'b.c1.c2': 'c2',
      'd[0].d1[0].d3': 'd3',
    };

    const r: any = objectTransformMap(source, map);

    expect(r.a).toBe('a');
    expect(r.b1).toBe('b1');
    expect(r.c2).toBeNull();
    expect(r.d3).toBe('d3');
  });

  it('should transform to new paths', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
      },
      d: [
        {
          d1: [
            {
              d3: 'd3',
            },
          ],
        },
      ],
    };

    const map: any = {
      a: 'w',
      'b.b1': 'x.x1',
      'b.c1.c2': 'y[0]',
      'd[0].d1[0].d3': 'z.z1[0]',
    };

    const r: any = objectTransformMap(source, map);

    expect(r.w).toBe('a');
    expect(r.x.x1).toBe('b1');
    expect(r.y[0]).toBeNull();
    expect(r.z.z1[0]).toBe('d3');
  });

  it('should transform to new paths', () => {
    const source: any = {
      a: 'a',
      b: {
        b1: 'b1',
      },
      d: [
        {
          d1: [
            {
              d3: 'd3',
            },
          ],
        },
      ],
    };

    const map: any = {
      a: 'w',
      'b.b1': 'x.x1',
      'b.c1.c2': 'y[0]',
      'd[0].d1[0].d3': ['z.z1[0]', 'z.z2[0]'],
    };

    const r: any = objectTransformMap(source, map);

    expect(r.w).toBe('a');
    expect(r.x.x1).toBe('b1');
    expect(r.y[0]).toBeNull();
    expect(r.z.z1[0]).toBe('d3');
    expect(r.z.z2[0]).toBe('d3');
  });
});
