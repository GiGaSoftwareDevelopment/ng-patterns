/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

/**
 * Return a random integer between
 * minimum and maximum values.
 *
 * @param min - minimum range to generate random integer.
 * @param max - maximum range to generate random integer.
 * @returns number
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
