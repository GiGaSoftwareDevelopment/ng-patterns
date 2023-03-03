import {Route} from '@angular/router';
import { DensityComponent } from './density/density.component';
import { BackgroundComponent } from './background/background.component';

export const MATERIAL_ROUTES: Route[] = [
  {path: 'density', component: DensityComponent},
  {path: 'background', component: BackgroundComponent},
  // ...
];
