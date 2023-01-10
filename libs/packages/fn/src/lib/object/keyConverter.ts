/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import map from '../lodash/map';
import {hasValue} from '../common/hasValue';
import {isArrayInteger} from '../number/isArrayInteger';

export function isArraySyntax(key: string): boolean {
  if (!hasValue(key)) {
    return false;
  }

  // Note: indexOf and lastIndexOf is much faster than regex
  const hasFirstIndex: boolean = key.indexOf('[') === 0;
  const hasLastIndex: boolean = key.lastIndexOf(']') === key.length - 1;

  const _index = key.replace('[', '').replace(']', '');

  return hasFirstIndex && hasLastIndex && isArrayInteger(_index);
}

/**
 * For input as something like a string '[23]', will receive the number 23.
 */
export function getdexAsNumber(key: string): number {
  return parseInt(key.replace('[', '').replace(']', ''), 10);
}

export const arraySplitRegex: RegExp = /\]\[/g;
export const propWithArrayRegex: RegExp = /([a-zA-Z0-9])\[/g;

/**
 * Converts '[0][1][3].bar[10][0].FOO[100].bum'
 * into     '[0].[1].[3].bar.[10].[0].FOO.[100].bum'
 */
export function keySplitter(key: string): string {
  return key
    .replace(arraySplitRegex, '].[')
    .replace(propWithArrayRegex, '$1.[');
}

export function splitKeysIntoDotNotation(
  keys: string | string[]
): string | string[] {
  if (Array.isArray(keys)) {
    return map(keys, (_key: string) => {
      return keySplitter(_key);
    });
  } else {
    return keySplitter(<string>keys);
  }
}

/**
 * Converts '[0][1][3].bar[10][0].FOO[100].bum'
 * into     [ 0, 1, 3, 'bar', 10, 0, 'FOO', 100, 'bum']
 */
export function keySplitterIntoImmutablePath(key: string | any[]): any[] {
  if (!Array.isArray(key)) {
    return keySplitter(<string>key)
      .split('.')
      .map((i: string) => {
        if (isArraySyntax(i)) {
          return getdexAsNumber(i);
        }

        return i;
      });
  } else {
    // key is array
    return <any[]>key;
  }
}
