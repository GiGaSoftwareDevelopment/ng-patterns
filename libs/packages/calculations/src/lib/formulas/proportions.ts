/**
 * Get result x from other three values.
 *
 * @example
 * const x = (100, 100, 50);
 * // where
 * // x1 = 100;
 * // y1 = 100;
 * // y2 = 50;
 * // x will equal 50
 * @param x1
 * @param y1
 * @param y2
 */
export function getProportion(x1: number, y1: number, y2: number): number {
  // Prevent divide by 0 error
  if (y1 === null || y1 === undefined || y1 === 0) {
    return 0;
  }

  return (x1 / y1) * y2;
}
