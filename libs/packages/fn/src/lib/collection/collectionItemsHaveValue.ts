import {hasValue} from '../common/hasValue';

export function collectionItemsHaveValue(collection: any[]): boolean {
  if (collection && collection.length > 0) {
    return collection.reduce((_allPropsHaveValue: boolean, item: any) => {
      if (!_allPropsHaveValue) {
        return _allPropsHaveValue;
      }
      return hasValue(item);
    }, true);
  }

  return false;
}
