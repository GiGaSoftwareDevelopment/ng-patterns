import {
  normalizePositiveToSplitRange,
  normalizeSplitRangeToPositive,
  createScaleLimitToRangeOutput
} from './normalizeToneVolumeRange';

describe('normalizePositiveToSplitRange', () => {
  test('should return -100 if value is < 0', () => {
    expect(normalizePositiveToSplitRange(-1)).toBe(-100);
  });

  test('should return -100 if value is 0', () => {
    expect(normalizePositiveToSplitRange(0)).toBe(-100);
  });

  test('should return 0 if value is 50', () => {
    expect(normalizePositiveToSplitRange(50)).toBe(0);
  });

  test('should return 100 if value is 100', () => {
    expect(normalizePositiveToSplitRange(100)).toBe(100);
  });
});

describe('normalizeSplitRangeToPositive', () => {
  test('should return 0 if value is -100', () => {
    expect(normalizeSplitRangeToPositive(-100)).toBe(0);
  });

  test('should return -100 if value is 0', () => {
    expect(normalizeSplitRangeToPositive(0)).toBe(50);
  });

  test('should return 0 if value is 50', () => {
    expect(normalizeSplitRangeToPositive(50)).toBe(75);
  });

  test('should return 100 if value is 100', () => {
    expect(normalizeSplitRangeToPositive(100)).toBe(100);
  });
});

describe('normalizeToRange', () => {
  test('should return min in range if below input range', () => {
    const testFn = createScaleLimitToRangeOutput(0, 100, -30, 10);

    expect(testFn(-10)).toBe(-30);
  });

  test('should return max in range if above input range', () => {
    const testFn = createScaleLimitToRangeOutput(0, 100, -30, 10);

    expect(testFn(200)).toBe(10);
  });

  test('should return 25% of range calculated', () => {
    const testFn = createScaleLimitToRangeOutput(0, 100, -30, 10);

    expect(testFn(25)).toBe(-20);
  });

  test('should return 50% of range calculated', () => {
    const testFn = createScaleLimitToRangeOutput(200, 600, -100, 0);

    expect(testFn(400)).toBe(-50);
  });

  test('should return 50% of range calculated', () => {
    const testFn = createScaleLimitToRangeOutput(200, 600, -100, 0);

    expect(testFn(600)).toBe(0);
  });
});
