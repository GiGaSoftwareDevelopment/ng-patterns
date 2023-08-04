import {NgModule} from '@angular/core';
import {NgPatSidenavMenuComponent} from './ng-pat-sidenav-menu.component';
import {
  NgPatLogoDirective,
  NgPatTitleDirective,
  SidenavHeaderComponent
} from './sidenav-header/sidenav-header.component';
import { LocalStorageModule } from '@ngpat/store';

@NgModule({
  imports: [
    NgPatSidenavMenuComponent,
    SidenavHeaderComponent,
    NgPatTitleDirective,
    NgPatLogoDirective,
    LocalStorageModule
  ],
  exports: [
    NgPatSidenavMenuComponent,
    SidenavHeaderComponent,
    NgPatTitleDirective,
    NgPatLogoDirective
  ]
})
export class NgPatSidenavMenuModule {}
