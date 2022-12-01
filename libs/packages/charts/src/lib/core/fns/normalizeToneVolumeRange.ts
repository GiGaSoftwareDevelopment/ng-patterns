/**
 * Input a value from 1 - 100
 * Output a value from -100 - 100
 * @param value
 * @param range
 */
export function normalizePositiveToSplitRange(
  value: number,
  range = 100
): number {
  if (value < 0) {
    return -range;
  }

  if (value > range) {
    return range;
  }

  return value * 2 - range;
}

/**
 * Only allow input to generate an  output between 0 and max value
 * @param value
 * @param max
 */
export function normalizeSplitRangeToPositive(
  value: number,
  max = 100
): number {
  if (value < -max) {
    return 0;
  }

  if (value > max) {
    return max;
  }

  return (value + max) / 2;
}

/**
 * Scale input range to output range. Any input will generate and output within range.
 * @param input_start
 * @param input_end
 * @param output_start
 * @param output_end
 */
export function createScaleLimitToRangeOutput(
  input_start: number,
  input_end: number,
  output_start: number,
  output_end: number
): (value: number) => number {
  /* Note, "slope" below is a constant for given numbers, so if you are calculating
   a lot of output values, it makes sense to calculate it once. */
  const slope = (output_end - output_start) / (input_end - input_start);

  return function toScale(value: number) {
    if (value < input_start) {
      return output_start;
    }

    if (value > input_end) {
      return output_end;
    }

    return output_start + slope * (value - input_start);
  };
}

export function createScaleBasedOnRange(
  input_start: number,
  input_end: number,
  output_start: number,
  output_end: number
): (value: number) => number {
  /* Note, "slope" below is a constant for given numbers, so if you are calculating
   a lot of output values, it makes sense to calculate it once. */
  const slope = (output_end - output_start) / (input_end - input_start);

  return function toScale(value: number) {
    return output_start + slope * (value - input_start);
  };
}

export declare type ScaleFunction = (value: number) => number;

export declare type NormalizeToRangeFunction = (
  input_start: number,
  input_end: number,
  output_start: number,
  output_end: number
) => ScaleFunction;

export const createScaleFn: NormalizeToRangeFunction =
  createScaleLimitToRangeOutput;
