import { atLeast } from './atLeast';

describe('atLeast', () => {
  it('should choose greater value', () => {
    const least = atLeast(10);

    expect(least(20)).toEqual(20);
  });

  it('should choose least value', () => {
    const least = atLeast(10);

    expect(least(0)).toEqual(10);
  });

  it('should choose 0 if least -value', () => {
    const least = atLeast(-10);

    expect(least(0)).toEqual(0);
  });

  it('should choose -10 if least -value', () => {
    const least = atLeast(-10);

    expect(least(-20)).toEqual(-10);
  });
});
