import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from './customer.service';
import { NgPatStripeInvoice, ngPatUpsertStripeInvoices } from '../+invoices';
import { map } from 'rxjs/operators';
import { ngPatLoadStripeCustomer } from './customer.actions';
import { NgPatStripeCustomer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerEffects {
  getCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ngPatUpsertStripeInvoices),
      map(({ invoices }) => {
        const customer: NgPatStripeCustomer = invoices.reduce(
          (customer: NgPatStripeCustomer, i: NgPatStripeInvoice) => {
            if (!customer.customerID) {
              return <NgPatStripeCustomer>{
                customerID: i.customer
              };
            }

            return customer;
          },
          <NgPatStripeCustomer>{}
        );

        return ngPatLoadStripeCustomer({ customer });
      })
    )
  );

  constructor(private actions$: Actions, private _customer: CustomerService) {}
}
