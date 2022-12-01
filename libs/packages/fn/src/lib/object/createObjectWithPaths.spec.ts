/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {createObjectWithPaths} from './createObjectWithPaths';

describe('createObjectWithPath', () => {
  it('should create object', () => {
    const obj: any = createObjectWithPaths('a.b.c', null);
    expect(obj.a.b.c).toBeNull();
  });

  it('should create object', () => {
    const obj: any = createObjectWithPaths(['a.b.c', 'd.e.f'], null);
    expect(obj.a.b.c).toBeNull();
    expect(obj.d.e.f).toBeNull();
  });

  it('should create multiple paths with values', () => {
    const paths: any = [
      ['a.b.c', 'foo'],
      ['a.d.f', 'bar'],
      ['g.h.i', {j: 'baz'}]
    ];

    const obj: any = createObjectWithPaths(paths);

    expect(obj.a.b.c).toBe('foo');
    expect(obj.a.d.f).toBe('bar');
    expect(obj.g.h.i.j).toBe('baz');
  });

  it('should create multiple paths with an object config', () => {
    const paths: any = {
      'a.b.c': 'foo',
      'a.d.f': 'bar',
      'g.h.i': {j: 'baz'}
    };

    const obj: any = createObjectWithPaths(paths);

    expect(obj.a.b.c).toBe('foo');
    expect(obj.a.d.f).toBe('bar');
    expect(obj.g.h.i.j).toBe('baz');
  });
});
