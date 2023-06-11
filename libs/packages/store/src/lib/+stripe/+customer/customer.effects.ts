import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from './customer.service';
import { Invoice, ngPatUpsertStripeInvoices } from '../+invoices';
import { map } from 'rxjs/operators';
import { ngPatLoadStripeCustomer } from './customer.actions';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerEffects {
  getCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ngPatUpsertStripeInvoices),
      map(({ invoices }) => {
        const customer: Customer = invoices.reduce(
          (customer: Customer, i: Invoice) => {
            if (!customer.customerID) {
              return <Customer>{
                customerID: i.customer
              };
            }

            return customer;
          },
          <Customer>{}
        );

        return ngPatLoadStripeCustomer({ customer });
      })
    )
  );

  constructor(private actions$: Actions, private _customer: CustomerService) {}
}
