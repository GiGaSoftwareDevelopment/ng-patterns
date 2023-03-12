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
  items: GigaSidenavListItem[]
}

export interface GigaSidenavData {
  home: GigaSidenavListItem;
  currentTitle: string;
  menuTitle: string;
  menuGroupItems: GigaSidenavListGroup[]
}




