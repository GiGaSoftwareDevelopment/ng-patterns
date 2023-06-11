import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { InvoiceService } from './invoice.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceEffects {
  // deleteDoc$ = createEffect(
  //   () =>
  //     this._actions$.pipe(
  //       ofType(ngPatDeleteStripeInvoiceFromfirestore),
  //       withLatestFrom(this.store.select(selectUserAccount)),
  //       switchMap(([action, account]) =>
  //         this.store.pipe(
  //           select(selectNgPatStripeGetInvoiceByID(action.id)),
  //           switchMap((invoice: Invoice | undefined) =>
  //             this._invoiceService.deleteDoc$(invoice, <string>account.uid)
  //             .pipe(map(() => ngPatDeleteStripeInvoice({id: action.id}) ))
  //         )
  //       )
  //     )
  // );

  // deleteDocs$ = createEffect(
  //   () =>
  //     this._actions$.pipe(
  //       ofType(ngPatDeleteStripeInvoices),
  //       withLatestFrom(this.store.select(selectUserAccount)),
  //       switchMap(([action, account]) =>
  //         this.store.pipe(
  //           select(selectNgPatStripeGetInvoiceByID(action.ids[0])),
  //           switchMap((invoice: Invoice | undefined) => this._invoiceService.deleteDocs$(invoice, action.ids, <string>account.uid))
  //         )
  //       )
  //     ),
  //   {dispatch: false}
  // );

  // ngPatUpdateFirestorePartialStripeInvoice$ = createEffect(
  //     () =>
  //       this._actions$.pipe(
  //         ofType(ngPatUpdateFirestorePartialStripeInvoice),
  //         withLatestFrom(this.store.select(selectUserAccount)),
  //         switchMap(([action, account]) =>
  //           this._invoiceService.updatePartialFirestore(action.changes, action.invoice, account.uid)
  //         )
  //       ),
  //     {dispatch: false}
  //   );

  constructor(
    private _actions$: Actions,
    private store: Store,
    private _invoiceService: InvoiceService
  ) {}
}
