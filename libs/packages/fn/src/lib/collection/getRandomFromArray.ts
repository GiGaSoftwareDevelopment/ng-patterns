/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

export function getRandomFromArray(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)];
}
