import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Params,
  Router
} from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface NgPatNavItem {
  url: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class NgPatRouterFacadeService {
  navigationEnd$: Observable<NavigationEnd> = (<Observable<NavigationEnd>>(
    this._router.events
  )).pipe(filter((event: NavigationEnd) => event instanceof NavigationEnd));

  url$: Observable<string> = this.navigationEnd$.pipe(
    map((event: NavigationEnd) => event.url),
    distinctUntilChanged()
  );

  paramMap$: Observable<ParamMap> = this._activatedRoute.paramMap;

  params$: Observable<Params> = this._activatedRoute.params;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  containsUrl$(partialUrl: string): Observable<boolean> {
    return this.url$.pipe(map((url: string) => url.includes(partialUrl)));
  }

  getRouteEnd$(navItems: NgPatNavItem[]): Observable<NgPatNavItem | null> {
    return this.navigationEnd$.pipe(
      map((end: NavigationEnd) => {
        return navItems.reduce(
          (found: NgPatNavItem | null, i: NgPatNavItem) => {
            if (i.url === end.url) {
              return i;
            }

            return found;
          },
          null
        );
      })
    );
  }
}
