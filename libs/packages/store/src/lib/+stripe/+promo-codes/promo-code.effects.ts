import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PromoCodeService } from './promo-code.service';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeEffects {
  constructor(
    private _actions$: Actions,
    private store: Store,
    private _promoCodeService: PromoCodeService
  ) {}
}
