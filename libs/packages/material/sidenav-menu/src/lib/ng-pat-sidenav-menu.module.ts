import {NgModule} from '@angular/core';
import {NgPatSidenavMenuComponent} from './ng-pat-sidenav-menu.component';
import {
  NgPatLogoDirective,
  NgPatTitleDirective,
  SidenavHeaderComponent
} from './sidenav-header/sidenav-header.component';
import { localStorageProviders } from '@ngpat/store';

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
  ],
  providers: [
    ...localStorageProviders
  ],
})
export class NgPatSidenavMenuModule {}
