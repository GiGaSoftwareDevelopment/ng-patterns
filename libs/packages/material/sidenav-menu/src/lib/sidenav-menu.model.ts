import {MatDrawerMode} from '@angular/material/sidenav';

export interface NgPatSidenavListItem {
  route: string[];
  title: string;
  icon?: string;

  /**
   * if icon is svg, provide icon path
   */
  svgUrl?: string;
}

export interface NgPatSidenavListGroup {
  title: string;
  items: NgPatSidenavListItem[];
}

export interface NgPatSidenavData {
  home: NgPatSidenavListItem;
  currentTitle: string;
  menuTitle: string;
  menuGroupItems: NgPatSidenavListGroup[];
}

export interface NgPatSidenavParams {
  opened: boolean;
  mode: MatDrawerMode;
  expandWidth: number;
}

export interface NgPatSidenavMenuState {
  opened: boolean;
  isCollapsed: boolean;
  expandedWidth: number;
  collapsedWidth: number;
}

export interface NgPatSidenavMenuLocalStorageItem {
  sort: number;
  item: NgPatSidenavListItem;
}

export interface NgPatSidenavLocalStorage {
  [key: string]: NgPatSidenavMenuLocalStorageItem;
}
