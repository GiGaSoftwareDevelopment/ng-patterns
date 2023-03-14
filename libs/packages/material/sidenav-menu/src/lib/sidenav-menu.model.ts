import {MatDrawerMode} from '@angular/material/sidenav';

export interface GigaSidenavListItem {
  route: string[];
  title: string;
  icon?: string;

  /**
   * if icon is svg, provide icon path
   */
  svgUrl?: string;
}

export interface GigaSidenavListGroup {
  title: string;
  items: GigaSidenavListItem[];
}

export interface GigaSidenavData {
  home: GigaSidenavListItem;
  currentTitle: string;
  menuTitle: string;
  menuGroupItems: GigaSidenavListGroup[];
}

export interface NgPatSidenavParams {
  opened: boolean;
  mode: MatDrawerMode;
  expandWidth: number;
}

export interface SidenavMenuState {
  opened: boolean;
  isCollapsed: boolean;
  expandedWidth: number;
  collapsedWidth: number;
}

export interface SidenavMenuLocalStorageItem {
  sort: number;
  item: GigaSidenavListItem;
}

export interface SidenavLocalStorage {
  [key: string]: SidenavMenuLocalStorageItem;
}
