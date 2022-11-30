/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { hasValueEqual } from './hasValueEqual';

describe('hasValueEqual', () => {
  it('should be false for src null, target true', () => {
    const tar: any = 'foo';
    const src: any = null;
    expect(hasValueEqual(tar, src)).toBe(false);
  });

  it('should be false for src true, target null', () => {
    const tar: any = null;
    const src: any = 'foo';
    expect(hasValueEqual(tar, src)).toBe(false);
  });

  it('should be true for src and target equal', () => {
    const tar: any = 'foo';
    const src: any = 'foo';
    expect(hasValueEqual(tar, src)).toBe(true);
  });

  it('should be true for src and target equal', () => {
    const tar: any = 'bar';
    const src: any = 'foo';
    expect(hasValueEqual(tar, src)).toBe(false);
  });
});
