import {
  NgPatSidenavListItem,
  NgPatSidenavLocalStorage,
  NgPatSidenavMenuLocalStorageItem
} from './sidenav-menu.model';
import { NgPatLocalStorageItem } from '@ngpat/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export function createCurrentRouteKey(item: NgPatSidenavListItem) {
  return item.route.join('-');
}

export function createLocalStorageKey(menuID: string) {
  return `sidenav-${menuID}`;
}

export function updateCurrentRouteSort(
  localStorageItem: NgPatLocalStorageItem
): NgPatLocalStorageItem {
  let currentRouteItems: NgPatSidenavMenuLocalStorageItem[] = Object.values(
    localStorageItem.value
  );

  currentRouteItems = currentRouteItems.sort(
    (a: NgPatSidenavMenuLocalStorageItem, b: NgPatSidenavMenuLocalStorageItem) => {
      return a.sort - b.sort;
    }
  );

  localStorageItem.value = currentRouteItems.reduce(
    (
      a: NgPatSidenavLocalStorage,
      i: NgPatSidenavMenuLocalStorageItem,
      currentIndex: number
    ) => {
      a[createCurrentRouteKey(i.item)] = {
        ...i,
        sort: currentIndex
      };
      return a;
    },
    {}
  );

  return localStorageItem;
}

/**
 * Create LocalStorage value for Sidenav Current Routes.
 *
 * <NgPatLocalStorageItem>{
 *   key: localStorageKey - localstorage key
 *
 *   // browser localstorage value
 *   value: <NgPatSidenavLocalStorage>{
 *     [currentRouteKey]: <NgPatSidenavLocalStorage>{
 *       sort: number - sort order
 *       item: NgPatSidenavListItem
 *     }
 *   }
 *
 * }
 *
 *
 * @param clonedLocalStorageItem
 * @param item
 * @param menuID
 */
export function createCurrentRoutesStorage(
  localStorageItem: NgPatLocalStorageItem | undefined,
  item: NgPatSidenavListItem,
  menuID: string
): NgPatLocalStorageItem {
  const localStorageKey = createLocalStorageKey(menuID);
  const currentRouteKey = createCurrentRouteKey(item);
  /**
   * Create LocalStorage Value if not exists
   */
  const clonedLocalStorageItem = localStorageItem
    ? JSON.parse(JSON.stringify(localStorageItem))
    : {
        key: localStorageKey,
        value: <NgPatSidenavLocalStorage>{}
      };

  if (
    clonedLocalStorageItem &&
    clonedLocalStorageItem.value &&
    !clonedLocalStorageItem.value[currentRouteKey]
  ) {
    clonedLocalStorageItem.value[currentRouteKey] = <
      NgPatSidenavMenuLocalStorageItem
    >{
      sort: Object.values(clonedLocalStorageItem.value).length,
      item
    };
  }

  return updateCurrentRouteSort(clonedLocalStorageItem);
}

export function removeCurrentRoutesStorage(
  localStorageItem: NgPatLocalStorageItem | undefined,
  item: NgPatSidenavListItem,
  menuID: string
): NgPatLocalStorageItem {
  const localStorageKey = createLocalStorageKey(menuID);
  const currentRouteKey = createCurrentRouteKey(item);
  /**
   * Create LocalStorage Value if not exists
   */
  const clonedLocalStorageItem = localStorageItem
    ? JSON.parse(JSON.stringify(localStorageItem))
    : {
        key: localStorageKey,
        value: <NgPatSidenavLocalStorage>{}
      };

  delete clonedLocalStorageItem.value[currentRouteKey];

  return updateCurrentRouteSort(clonedLocalStorageItem);
}

export function updateSortFromCDKDrop(
  localStorageItem: NgPatLocalStorageItem | undefined,
  event: CdkDragDrop<string[]>,
  menuID: string
) {
  const localStorageKey = createLocalStorageKey(menuID);
  const clonedLocalStorageItem = localStorageItem
    ? JSON.parse(JSON.stringify(localStorageItem))
    : {
        key: localStorageKey,
        value: <NgPatSidenavLocalStorage>{}
      };

  const currentRouteItems: NgPatSidenavMenuLocalStorageItem[] = Object.values(
    clonedLocalStorageItem.value
  );

  const gigaSidenavListItem: NgPatSidenavListItem[] = currentRouteItems
    .sort((a: NgPatSidenavMenuLocalStorageItem, b: NgPatSidenavMenuLocalStorageItem) => {
      return a.sort - b.sort;
    })
    .map((b: NgPatSidenavMenuLocalStorageItem) => b.item);

  moveItemInArray(gigaSidenavListItem, event.previousIndex, event.currentIndex);

  clonedLocalStorageItem.value = gigaSidenavListItem.reduce(
    (a: NgPatSidenavLocalStorage, i: NgPatSidenavListItem, currentIndex: number) => {
      a[createCurrentRouteKey(i)] = {
        item: i,
        sort: currentIndex
      };
      return a;
    },
    {}
  );

  return clonedLocalStorageItem;
}
