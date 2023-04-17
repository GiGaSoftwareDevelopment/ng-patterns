/**
 * Test if a key in a array of objects are not unique
 *
 * @param values
 * @param key
 */
export function hasDuplicatesByKey<T>(values: T[], key: string): boolean {
  const seen = new Set();
  return values.some(function (currentObject: any) {
    return seen.size === seen.add(currentObject[key]).size;
  });
}
