/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {isEqual} from '../lodash';
import {getRandomFromArray} from './getRandomFromArray';
import includes from '../lodash/includes';

/**
 * Choose a range of items from _array, excluding an item.
 * @param arr
 * @param exclude
 * @param numberItemsToChoose
 * @returns any[]
 */
export function getRandomRangeFromArray(
  arr: any[],
  numberItemsToChoose: number,
  exclude?: any
): any[] {
  let chosenCount = 0;
  const chosenAccepted: any[] = [];
  while (chosenCount < numberItemsToChoose) {
    const rand = getRandomFromArray(arr);
    if (!isEqual(exclude, rand) && !includes(chosenAccepted, rand)) {
      chosenAccepted.push(rand);
      chosenCount++;
    }
  }

  return chosenAccepted;
}
