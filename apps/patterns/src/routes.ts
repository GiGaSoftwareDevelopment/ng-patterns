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
      import('@uiux/charts/routes').then(mod => mod.CHART_ROUTES)
  },
  {
    path: 'components',
    loadChildren: () =>
      import('@uiux/component/routes').then(mod => mod.COMPONENT_ROUTES)
  },
  {
    path: 'rxjs',
    loadChildren: () => import('@uiux/rxjs/routes').then(mod => mod.RXJS_ROUTES)
  },
  {
    path: 'store',
    loadChildren: () => import('@uiux/store/routes').then(mod => mod.STORE_ROUTES)
  }
  // ...
];
