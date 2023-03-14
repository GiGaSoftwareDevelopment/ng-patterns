import {
  GigaSidenavListItem,
  SidenavLocalStorage,
  SidenavMenuLocalStorageItem
} from './sidenav-menu.model';
import {BrowserStorageItem} from '@ngpat/store';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

export function createCurrentRouteKey(item: GigaSidenavListItem) {
  return item.route.join('-');
}

export function createLocalStorageKey(menuID: string) {
  return `sidenav-${menuID}`;
}

export function updateCurrentRouteSort(
  browserStorageItem: BrowserStorageItem
): BrowserStorageItem {
  let currentRouteItems: SidenavMenuLocalStorageItem[] = Object.values(
    browserStorageItem.value
  );

  currentRouteItems = currentRouteItems.sort(
    (a: SidenavMenuLocalStorageItem, b: SidenavMenuLocalStorageItem) => {
      return a.sort - b.sort;
    }
  );

  browserStorageItem.value = currentRouteItems.reduce(
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

  return browserStorageItem;
}

/**
 * Create LocalStorage value for Sidenav Current Routes.
 *
 * <BrowserStorageItem>{
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
 * @param clonedBrowserStorageItem
 * @param item
 * @param menuID
 */
export function createCurrentRoutesStorage(
  browserStorageItem: BrowserStorageItem | undefined,
  item: GigaSidenavListItem,
  menuID: string
): BrowserStorageItem {
  const localStorageKey = createLocalStorageKey(menuID);
  const currentRouteKey = createCurrentRouteKey(item);
  /**
   * Create LocalStorage Value if not exists
   */
  const clonedBrowserStorageItem = browserStorageItem
    ? JSON.parse(JSON.stringify(browserStorageItem))
    : {
        key: localStorageKey,
        value: <SidenavLocalStorage>{}
      };

  if (!clonedBrowserStorageItem.value[currentRouteKey]) {
    clonedBrowserStorageItem.value[currentRouteKey] = <
      SidenavMenuLocalStorageItem
    >{
      sort: Object.values(clonedBrowserStorageItem.value).length,
      item
    };
  }

  return updateCurrentRouteSort(clonedBrowserStorageItem);
}

export function removeCurrentRoutesStorage(
  browserStorageItem: BrowserStorageItem | undefined,
  item: GigaSidenavListItem,
  menuID: string
): BrowserStorageItem {
  const localStorageKey = createLocalStorageKey(menuID);
  const currentRouteKey = createCurrentRouteKey(item);
  /**
   * Create LocalStorage Value if not exists
   */
  const clonedBrowserStorageItem = browserStorageItem
    ? JSON.parse(JSON.stringify(browserStorageItem))
    : {
        key: localStorageKey,
        value: <SidenavLocalStorage>{}
      };

  delete clonedBrowserStorageItem.value[currentRouteKey];

  return updateCurrentRouteSort(clonedBrowserStorageItem);
}

export function updateSortFromCDKDrop(
  browserStorageItem: BrowserStorageItem | undefined,
  event: CdkDragDrop<string[]>,
  menuID: string
) {
  const localStorageKey = createLocalStorageKey(menuID);
  const clonedBrowserStorageItem = browserStorageItem
    ? JSON.parse(JSON.stringify(browserStorageItem))
    : {
        key: localStorageKey,
        value: <SidenavLocalStorage>{}
      };

  const currentRouteItems: SidenavMenuLocalStorageItem[] = Object.values(
    clonedBrowserStorageItem.value
  );

  const gigaSidenavListItem: GigaSidenavListItem[] = currentRouteItems
    .sort((a: SidenavMenuLocalStorageItem, b: SidenavMenuLocalStorageItem) => {
      return a.sort - b.sort;
    })
    .map((b: SidenavMenuLocalStorageItem) => b.item);

  moveItemInArray(gigaSidenavListItem, event.previousIndex, event.currentIndex);

  clonedBrowserStorageItem.value = gigaSidenavListItem.reduce(
    (a: SidenavLocalStorage, i: GigaSidenavListItem, currentIndex: number) => {
      a[createCurrentRouteKey(i)] = {
        item: i,
        sort: currentIndex
      };
      return a;
    },
    {}
  );

  return clonedBrowserStorageItem;
}
