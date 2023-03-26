import { getProportion } from './proportions';

describe('proportion', () => {
  it('should return 100', () => {
    expect(getProportion(100, 100, 50)).toEqual(50);
  });

  it('should return  0 if y1 is 0', () => {
    expect(getProportion(100, 0, 50)).toEqual(0);
  });
});
