/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {getRandomFromArray} from './getRandomFromArray';

describe('GetRandomFromArray', () => {
  it('should be created', () => {
    const arr: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const random: number = getRandomFromArray(arr);
    expect(random).toBeGreaterThan(2);
    expect(random).toBeLessThan(13);
  });
});
