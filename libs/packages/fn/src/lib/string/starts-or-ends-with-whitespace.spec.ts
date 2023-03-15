/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {startsOrEndsWithWhitespace} from './starts-or-ends-with-whitespace';

describe('startsOrEndsWithWhitespace', () => {
  it('should return false with not trailing or leading whitespace', () => {
    expect(startsOrEndsWithWhitespace('123454')).toBe(false);
  });

  it('should return false with whitespace in middle', () => {
    expect(startsOrEndsWithWhitespace('123 454')).toBe(false);
  });

  it('should return true for leading whitespace', () => {
    expect(startsOrEndsWithWhitespace(' 123454')).toBe(true);
  });

  it('should return true for leading and trailing whitespace', () => {
    expect(startsOrEndsWithWhitespace(' 123454 ')).toBe(true);
  });

  it('should return true for trailing whitespace', () => {
    expect(startsOrEndsWithWhitespace('123454 ')).toBe(true);
  });
});
