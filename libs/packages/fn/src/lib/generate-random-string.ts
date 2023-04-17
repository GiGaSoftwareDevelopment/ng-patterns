/**
 * https://dev.to/oyetoket/fastest-way-to-generate-random-strings-in-javascript-2k5a
 * @param length
 * @param prefix p
 * @param uppercase
 */
export function generateRandomString(
  length = 6,
  prefix = '',
  uppercase = true
): string {
  prefix += Math.random()
    .toString(36)
    .substring(2, length + 2);

  if (prefix.length > length) return generateRandomString(length, prefix);

  if (uppercase) return prefix.toUpperCase();

  return prefix;
}

export function generate8CharCodeLowercase() {
  return generateRandomString(8, '', false);
}
