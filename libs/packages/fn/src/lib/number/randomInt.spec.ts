/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {randomInt} from './randomInt';

describe('randomInt', () => {
  // beforeEach(() => {
  //
  // });
  //
  // afterEach(() => {
  //
  // });

  it('should generate random positive integer from 0', () => {
    const int: number = randomInt(0, 10);
    expect(int).toBeGreaterThanOrEqual(0);
    expect(int).toBeLessThanOrEqual(10);
  });

  it('should generate random positive integer greater than 0', () => {
    const int: number = randomInt(100, 150);
    expect(int).toBeGreaterThanOrEqual(100);
    expect(int).toBeLessThanOrEqual(150);
  });

  it('should generate random negative integer from 0', () => {
    const int: number = randomInt(-10, 0);
    expect(int).toBeGreaterThanOrEqual(-10);
    expect(int).toBeLessThanOrEqual(0);
  });

  it('should generate random positive integer less than 0', () => {
    const int: number = randomInt(-150, -100);
    expect(int).toBeGreaterThanOrEqual(-150);
    expect(int).toBeLessThanOrEqual(-100);
  });
});
