export interface GigaSidenavListItem {
  route: string;
  title: string;
  icon?: string;
  iconPath?: string;
  isSVG?: boolean;
}


export interface GigaSidenavHeader {
  svgLogoPath: string;
  svgTitlePath: string;
}

export interface GigaSidenav {
  header: GigaSidenavHeader;
  navList: GigaSidenavListItem[]
}
