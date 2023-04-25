import {
  GigaSidenavListItem,
  SidenavLocalStorage,
  SidenavMenuLocalStorageItem
} from './sidenav-menu.model';
import { NgPatLocalStorageItem } from '@ngpat/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export function createCurrentRouteKey(item: GigaSidenavListItem) {
  return item.route.join('-');
}

export function createLocalStorageKey(menuID: string) {
  return `sidenav-${menuID}`;
}

export function updateCurrentRouteSort(
  localStorageItem: NgPatLocalStorageItem
): NgPatLocalStorageItem {
  let currentRouteItems: SidenavMenuLocalStorageItem[] = Object.values(
    localStorageItem.value
  );

  currentRouteItems = currentRouteItems.sort(
    (a: SidenavMenuLocalStorageItem, b: SidenavMenuLocalStorageItem) => {
      return a.sort - b.sort;
    }
  );

  localStorageItem.value = currentRouteItems.reduce(
    (
      a: SidenavLocalStorage,
      i: SidenavMenuLocalStorageItem,
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
 *   value: <SidenavLocalStorage>{
 *     [currentRouteKey]: <SidenavLocalStorage>{
 *       sort: number - sort order
 *       item: GigaSidenavListItem
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
  item: GigaSidenavListItem,
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
        value: <SidenavLocalStorage>{}
      };

  if (!clonedLocalStorageItem.value[currentRouteKey]) {
    clonedLocalStorageItem.value[currentRouteKey] = <
      SidenavMenuLocalStorageItem
    >{
      sort: Object.values(clonedLocalStorageItem.value).length,
      item
    };
  }

  return updateCurrentRouteSort(clonedLocalStorageItem);
}

export function removeCurrentRoutesStorage(
  localStorageItem: NgPatLocalStorageItem | undefined,
  item: GigaSidenavListItem,
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
        value: <SidenavLocalStorage>{}
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
        value: <SidenavLocalStorage>{}
      };

  const currentRouteItems: SidenavMenuLocalStorageItem[] = Object.values(
    clonedLocalStorageItem.value
  );

  const gigaSidenavListItem: GigaSidenavListItem[] = currentRouteItems
    .sort((a: SidenavMenuLocalStorageItem, b: SidenavMenuLocalStorageItem) => {
      return a.sort - b.sort;
    })
    .map((b: SidenavMenuLocalStorageItem) => b.item);

  moveItemInArray(gigaSidenavListItem, event.previousIndex, event.currentIndex);

  clonedLocalStorageItem.value = gigaSidenavListItem.reduce(
    (a: SidenavLocalStorage, i: GigaSidenavListItem, currentIndex: number) => {
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
