/**
 * Calculate percent change between two values.
 * @param current - Current period
 * @param previous - Previous period
 */
export function percentChange(current: number, previous: number): number {
  if (previous > current) {
    /**
     * if the value change from 0 to 1, then 100%
     * if the value change from 0 to 5, then 500%
     */
    if (previous === 0) {
      return current * 100;
    }

    return -(((previous - current) / previous) * 100);
  } else if (current > previous) {
    /**
     * if the value change from 0 to 1, then 100%
     * if the value change from 0 to 5, then 500%
     */
    if (previous === 0) {
      return current * 100;
    }

    return ((current - previous) / previous) * 100;
  }

  // no change
  return 0;
}
