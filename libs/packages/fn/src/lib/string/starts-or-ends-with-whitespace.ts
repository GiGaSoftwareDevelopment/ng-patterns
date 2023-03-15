/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

export function startsOrEndsWithWhitespace(str: string): boolean {
  return /^\s|\s$/.test(str);
}
