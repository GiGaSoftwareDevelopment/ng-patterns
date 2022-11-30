/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { clone } from './clone';

describe('clone', () => {
  let origin: any;
  let cloned: any;

  beforeEach(() => {
    origin = { foo: 'foo', bar: 1, baz: 2 };
  });

  afterEach(() => {
    origin = null;
    cloned = null;
  });

  it('should equal', () => {
    cloned = origin;
    expect(cloned === origin).toBeTruthy();
  });

  it('should pass be reference', () => {
    cloned = origin;
    origin.foo = 'baz';
    expect(cloned.foo).toBe('baz');
  });

  it('should not equal', () => {
    cloned = clone(origin);
    expect(cloned !== origin).toBeTruthy();
  });

  it('should not pass be reference', () => {
    cloned = clone(origin);
    origin.foo = 'baz';
    expect(cloned.foo).toBe('foo');
  });

  it('should not pass be reference', () => {
    cloned = clone(origin);
    origin.foo = 'baz';
    expect(cloned.foo).toBe('foo');
    expect(origin.foo).toBe('baz');
  });
});
