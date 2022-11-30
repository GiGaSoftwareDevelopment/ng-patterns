/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { uuid } from './uuid';

describe('uuid', () => {
  let _uuid: string;
  let parts: string[];

  beforeEach(() => {
    _uuid = uuid();
    parts = _uuid.split('-');
  });

  it('should have 5 parts', () => {
    expect(parts.length).toBe(5);
  });

  it('part 1 should have 8 characters', () => {
    expect(parts[0].length).toBe(8);
  });

  it('part 2 should have 4 characters', () => {
    expect(parts[1].length).toBe(4);
  });

  it('part 3 should have 4 characters', () => {
    expect(parts[2].length).toBe(4);
  });

  it('part 3 should have begin with the number 4', () => {
    expect(parts[2].indexOf('4')).toBe(0);
  });

  it('part 4 should have 4 characters', () => {
    expect(parts[3].length).toBe(4);
  });

  it('part 5 should have 12 characters', () => {
    expect(parts[4].length).toBe(12);
  });
});
