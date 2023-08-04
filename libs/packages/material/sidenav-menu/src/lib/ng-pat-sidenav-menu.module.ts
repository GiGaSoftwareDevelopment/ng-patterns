import {NgModule} from '@angular/core';
import {NgPatSidenavMenuComponent} from './ng-pat-sidenav-menu.component';
import {
  NgPatLogoDirective,
  NgPatTitleDirective,
  SidenavHeaderComponent
} from './sidenav-header/sidenav-header.component';

@NgModule({
  imports: [
    NgPatSidenavMenuComponent,
    SidenavHeaderComponent,
    NgPatTitleDirective,
    NgPatLogoDirective,
  ],
  exports: [
    NgPatSidenavMenuComponent,
    SidenavHeaderComponent,
    NgPatTitleDirective,
    NgPatLogoDirective
  ]
})
export class NgPatSidenavMenuModule {}
