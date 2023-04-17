/**
 * Average of values
 * @param data
 */
export function avg(data: (number | string)[]): number {
  return (
    data
      .map((d: number | string) => parseFloat(<string>d))
      .reduce((s: number, n: number) => s + n, 0) / data.length
  );
}

/**
 * Average of values of an object
 * @param data
 * @param key
 */
export function avgByKey(data: {[key: string]: any}[], key: string): number {
  return avg(data.map((_d: {[key: string]: any}) => _d[key]));
}
