import { NgModule } from '@angular/core';
import { SidenavMenuComponent } from './sidenav-menu.component';
import {
  NgPatLogoDirective,
  NgPatTitleDirective,
  SidenavHeaderComponent
} from './sidenav-header/sidenav-header.component';


@NgModule({
  imports: [
    SidenavMenuComponent,
    SidenavHeaderComponent,
    NgPatTitleDirective,
    NgPatLogoDirective,
  ],
  exports: [
    SidenavMenuComponent,
    SidenavHeaderComponent,
    NgPatTitleDirective,
    NgPatLogoDirective,
  ]
})
export class SidenavMenuModule {
}
