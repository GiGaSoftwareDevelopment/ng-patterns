import { percentChange } from './percent-change';

describe('percent change', () => {
  it('should calculate negative percent change 100 from 50 to 100', () => {
    const r = percentChange(50, 100);
    expect(r).toBe(-50);
  });

  it('should calculate positive percent change 100 from 100 to 50', () => {
    const r = percentChange(100, 50);
    expect(r).toBe(100);
  });

  it('should calculate percent change from 0, 10', () => {
    const r = percentChange(0, 10);
    expect(r).toEqual(-100);
  });

  it('should calculate percent change from 10, 0', () => {
    const r = percentChange(10, 0);
    expect(r).toEqual(1000);
  });

  it('should calculate percent change from -10, 0', () => {
    const r = percentChange(-10, 0);
    expect(r).toEqual(-1000);
  });
});
