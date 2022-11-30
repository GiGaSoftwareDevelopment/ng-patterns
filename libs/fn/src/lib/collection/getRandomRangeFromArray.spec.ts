import { getRandomRangeFromArray } from './getRandomRangeFromArray';

describe('getRandomRangeFromArray', () => {
  let arr: any[] | null;

  beforeEach(() => {
    arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  });

  afterEach(() => {
    arr = null;
  });

  it('should have 4 items', () => {
    const subarr: any[] = getRandomRangeFromArray(<any[]>arr, 4);
    expect(subarr.length).toEqual(4);
  });
});
