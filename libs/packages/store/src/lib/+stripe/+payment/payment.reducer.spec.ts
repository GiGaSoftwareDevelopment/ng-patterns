import { Update } from '@ngrx/entity/src/models';
import {
  paymentReducer,
  initialPaymentState,
  PaymentState
} from './payment.reducer';
import * as PaymentActions from './payment.actions';
import { PaymentIntent } from '../entities/payment.model';

describe('Payment Reducer', () => {
  it('should ngPatAddPayment', () => {
    const payment: PaymentIntent = {
      id: 'foo'
    };

    const state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddPayment({ payment })
    );

    expect(state.entities[payment.id]).toEqual(payment);
    expect(state.ids[0]).toEqual(payment.id);
  });

  it('should ngPatUpsertPayment', () => {
    const payment: PaymentIntent = {
      id: 'foo'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddPayment({ payment })
    );

    // PaymentActions.ngPatUpsertPayment
    //

    const upsert: PaymentIntent = {
      ...payment
    };

    state = paymentReducer(
      state,
      PaymentActions.ngPatUpsertPayment({ payment: upsert })
    );

    expect(state.entities[payment.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(payment.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddPayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    const state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddPayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);
  });

  it('should ngPatUpsertPayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddPayments({ payments: [payment1, payment2] })
    );

    // PaymentActions.ngPatUpsertPayments
    //

    const upsert1: PaymentIntent = {
      ...payment1
    };

    const upsert2: PaymentIntent = {
      ...payment2
    };

    state = paymentReducer(
      state,
      PaymentActions.ngPatUpsertPayments({ payments: [upsert1, upsert2] })
    );

    expect(state.entities[payment1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdatePayment', () => {
    const payment: PaymentIntent = {
      id: 'foo1'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddPayment({ payment })
    );

    // ngPatUpdatePayment
    //
    const update: PaymentIntent = {
      id: 'foo1'
    };

    state = paymentReducer(
      state,
      PaymentActions.ngPatUpdatePayment({
        payment: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[payment.id]).toEqual(update);
  });

  it('should ngPatUpdatePayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddPayments({ payments: [payment1, payment2] })
    );

    // PaymentActions.ngPatUpsertPayments
    //

    const update1: PaymentIntent = {
      ...payment1
    };

    const update2: PaymentIntent = {
      ...payment2
    };

    const updatesPayload: Update<PaymentIntent>[] = [
      {
        id: update1.id,
        changes: update1
      },
      {
        id: update2.id,
        changes: update2
      }
    ];

    state = paymentReducer(
      state,
      PaymentActions.ngPatUpdatePayments({ payments: updatesPayload })
    );

    expect(state.entities[payment1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeletePayment', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddPayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);

    state = paymentReducer(
      state,
      PaymentActions.ngPatDeletePayment({ id: payment1.id })
    );

    expect(state.entities[payment1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(payment1.id)).toBe(false);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);
  });

  it('should ngPatDeletePayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddPayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);

    state = paymentReducer(
      state,
      PaymentActions.ngPatDeletePayments({ ids: [payment1.id, payment2.id] })
    );

    expect(state.entities[payment1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(payment1.id)).toBe(false);

    expect(state.entities[payment2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(payment2.id)).toBe(false);
  });

  it('should ngPatLoadPayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    const state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatLoadPayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);
  });

  it('should ngPatClearPayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatLoadPayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);

    // ngPatClearPayments
    //
    state = paymentReducer(state, PaymentActions.ngPatClearPayments());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
