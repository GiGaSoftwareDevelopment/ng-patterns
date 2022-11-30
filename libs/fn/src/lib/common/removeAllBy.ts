import { isString } from 'lodash';
import { isFunction } from 'lodash';

export function removeAllBy(array: any[], values: any[], iteratee: Function | string): any[] {
  return array.slice().reduce((acc: any[], item: any) => {
    let isSelected: any[] = [];

    if (isString(iteratee)) {
      isSelected = values.filter((selectedItem: any) => {
        return selectedItem[<string>iteratee] === item[<string>iteratee];
      });
    }

    if (isFunction(iteratee)) {
      isSelected = values.filter((selectedItem: any) => {
        return (<Function>iteratee).apply(null, [item, selectedItem]);
      });
    }

    if (!isSelected.length) {
      acc.push(item);
    }

    return acc;
  }, []);
}
