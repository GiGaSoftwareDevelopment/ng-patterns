/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { collectionItemsHaveValue } from './collectionItemsHaveValue';

describe('collectionItemsHaveValue', () => {
  it('scalar numbers should have value', () => {
    const arr: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    expect(collectionItemsHaveValue(arr)).toBe(true);
  });

  it('scalar numbers should have value', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const arr: number[] = [3, 4, 5, 6, 7, undefined, 9, 10, 11, 12];
    expect(collectionItemsHaveValue(arr)).toBe(false);
  });

  it('scalar strings should have value', () => {
    const arr: string[] = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    expect(collectionItemsHaveValue(arr)).toBe(true);
  });

  it('scalar strings should have value', () => {
    const arr: string[] = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    expect(collectionItemsHaveValue(arr)).toBe(true);
  });

  it('scalar strings should have value', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const arr: string[] = ['3', '4', null, '6', '7', '8', '9', '10', '11', '12'];
    expect(collectionItemsHaveValue(arr)).toBe(false);
  });

  it('objects filled should have value', () => {
    const arr: any[] = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'baz' }];
    expect(collectionItemsHaveValue(arr)).toBe(true);
  });

  it('an empty object should return false', () => {
    const arr: any[] = [{ foo: 'foo' }, {}, { foo: 'baz' }];
    expect(collectionItemsHaveValue(arr)).toBe(false);
  });

  it('an empty object should return false', () => {
    const arr: any[] = [{}, { foo: 'foo' }, { foo: 'baz' }];
    expect(collectionItemsHaveValue(arr)).toBe(false);
  });

  it('an empty object should return false', () => {
    const arr: any[] = [{ foo: 'foo' }, { foo: 'baz' }, {}];
    expect(collectionItemsHaveValue(arr)).toBe(false);
  });
});
