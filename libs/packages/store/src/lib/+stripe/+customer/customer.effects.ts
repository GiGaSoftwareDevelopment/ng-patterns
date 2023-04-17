import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CustomerService} from './customer.service';
import {Invoice, upsertInvoices} from '../+invoices';
import {map} from 'rxjs/operators';
import {loadCustomer} from './customer.actions';
import {Customer} from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerEffects {
  getCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(upsertInvoices),
      map(({invoices}) => {
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

        return loadCustomer({customer});
      })
    )
  );

  constructor(private actions$: Actions, private _customer: CustomerService) {}
}
