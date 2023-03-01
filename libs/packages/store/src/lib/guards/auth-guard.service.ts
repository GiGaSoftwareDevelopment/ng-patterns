import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsUserAuthenticated } from '../+account/account.selectors';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, CanActivate, Router, UrlTree } from '@angular/router';

/**
 * https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
 * https://juristr.com/blog/2018/11/better-route-guard-redirects/
 */
@Injectable({
  providedIn: 'root'
})
export class NgPatAuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private store: Store,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(
      selectIsUserAuthenticated)
      .pipe(
        distinctUntilChanged(),
        map((isLoggedIn: boolean) => {
          // console.log(isLoggedIn$);
          if (!isLoggedIn) {
            // this._router.navigateUrl(['start']);
            return this._router.parseUrl('/login');
            return false;
          } else {
            return true;
          }
        })
      );
  }
}
