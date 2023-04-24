import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { NgPatFirestoreService } from '@ngpat/firebase';

export const NG_PAT_AUTH_REDIRECT_URL = new InjectionToken<string[]>(
  'NG_PAT_AUTH_REDIRECT_URL',
  {
    providedIn: 'root',
    factory: () => ['/login']
  }
);

export const ngPatCanActivateLoggedIn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const redirectPath = inject(NG_PAT_AUTH_REDIRECT_URL);
  const firestore = inject(NgPatFirestoreService);

  return firestore.isLoggedIn$.pipe(
    distinctUntilChanged(),
    take(1),
    map((isLoggedIn: boolean) => {
      // console.log(isLoggedIn$);
      if (!isLoggedIn) {
        // this._router.navigateUrl(['start']);
        router.navigate(redirectPath);
      }

      return isLoggedIn;
    })
  );
};

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
    private firestore: NgPatFirestoreService,
    @Inject(NG_PAT_AUTH_REDIRECT_URL) private redirectPath: string[]
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.firestore.isLoggedIn$.pipe(
      distinctUntilChanged(),
      map((isLoggedIn: boolean) => {
        // console.log(isLoggedIn$);
        if (!isLoggedIn) {
          // this._router.navigateUrl(['start']);
          this._router.navigate(this.redirectPath);
        }

        return isLoggedIn;
      })
    );
  }
}
