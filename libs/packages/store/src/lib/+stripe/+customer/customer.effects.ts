import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from './customer.service';
import { Invoice, ngPatUpsertInvoices } from '../+invoices';
import { map } from 'rxjs/operators';
import { ngPatLoadCustomer } from './customer.actions';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerEffects {
  getCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ngPatUpsertInvoices),
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

        return ngPatLoadCustomer({ customer });
      })
    )
  );

  constructor(private actions$: Actions, private _customer: CustomerService) {}
}
