import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Params,
  Router
} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterFacadeService {
  navigationEnd$: Observable<NavigationEnd> = (<Observable<NavigationEnd>>(
    this._router.events
  )).pipe(filter((event: NavigationEnd) => event instanceof NavigationEnd));

  url$: Observable<string> = this.navigationEnd$.pipe(
    map((event: NavigationEnd) => event.url)
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
}
