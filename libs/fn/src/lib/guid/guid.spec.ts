/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { guid } from './guid';

describe('guid', () => {
  let _guid: string | null;
  let parts: string[] | null;

  beforeEach(() => {
    _guid = guid();
    parts = _guid.split('-');
  });

  afterEach(() => {
    _guid = null;
    parts = null;
  });

  it('should have 5 parts', () => {
    expect((<string[]>parts).length).toBe(5);
  });

  it('part 1 should have 8 characters', () => {
    expect((<string[]>parts)[0].length).toBe(8);
  });

  it('part 2 should have 4 characters', () => {
    expect((<string[]>parts)[1].length).toBe(4);
  });

  it('part 3 should have 4 characters', () => {
    expect((<string[]>parts)[2].length).toBe(4);
  });

  it('part 3 should have begin with the number 4', () => {
    expect((<string[]>parts)[2].indexOf('4')).toBe(0);
  });

  it('part 4 should have 4 characters', () => {
    expect((<string[]>parts)[3].length).toBe(4);
  });

  it('part 5 should have 12 characters', () => {
    expect((<string[]>parts)[4].length).toBe(12);
  });
});
