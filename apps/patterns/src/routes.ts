import { Route } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';

// In the main application:
export const ROUTES: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('@ngpat/charts/routes').then(mod => mod.CHART_ROUTES)
  },
  {
    path: 'components',
    loadChildren: () =>
      import('@ngpat/component/routes').then(mod => mod.COMPONENT_ROUTES)
  },
  {
    path: 'rxjs',
    loadChildren: () => import('@ngpat/rxjs/routes').then(mod => mod.RXJS_ROUTES)
  },
  {
    path: 'material',
    loadChildren: () => import('@ngpat/material/routes').then(mod => mod.MATERIAL_ROUTES)
  },
  {
    path: 'store',
    loadChildren: () => import('@ngpat/store/routes').then(mod => mod.STORE_ROUTES)
  }
  // ...
];
