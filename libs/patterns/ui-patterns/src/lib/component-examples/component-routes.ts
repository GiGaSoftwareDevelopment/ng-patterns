import {Route} from '@angular/router';
import {ColorPickerComponent} from './color-picker/color-picker.component';
import {SidenavComponent} from './sidenav/sidenav.component';

export const COMPONENT_ROUTES: Route[] = [
  {path: 'color-picker', component: ColorPickerComponent},
  {path: 'sidenav', component: SidenavComponent}
];
