import { Update } from '@ngrx/entity/src/models';
import {
  paymentReducer,
  initialPaymentState,
  PaymentState
} from './payment.reducer';
import * as PaymentActions from './payment.actions';
import { PaymentIntent } from '../entities/payment.model';

describe('Payment Reducer', () => {
  it('should ngPatAddStripePayment', () => {
    const payment: PaymentIntent = {
      id: 'foo'
    };

    const state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddStripePayment({ payment })
    );

    expect(state.entities[payment.id]).toEqual(payment);
    expect(state.ids[0]).toEqual(payment.id);
  });

  it('should ngPatUpsertStripePayment', () => {
    const payment: PaymentIntent = {
      id: 'foo'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddStripePayment({ payment })
    );

    // PaymentActions.ngPatUpsertStripePayment
    //

    const upsert: PaymentIntent = {
      ...payment
    };

    state = paymentReducer(
      state,
      PaymentActions.ngPatUpsertStripePayment({ payment: upsert })
    );

    expect(state.entities[payment.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(payment.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddStripePayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    const state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddStripePayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);
  });

  it('should ngPatUpsertStripePayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddStripePayments({ payments: [payment1, payment2] })
    );

    // PaymentActions.ngPatUpsertStripePayments
    //

    const upsert1: PaymentIntent = {
      ...payment1
    };

    const upsert2: PaymentIntent = {
      ...payment2
    };

    state = paymentReducer(
      state,
      PaymentActions.ngPatUpsertStripePayments({ payments: [upsert1, upsert2] })
    );

    expect(state.entities[payment1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdateStripePayment', () => {
    const payment: PaymentIntent = {
      id: 'foo1'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddStripePayment({ payment })
    );

    // ngPatUpdateStripePayment
    //
    const update: PaymentIntent = {
      id: 'foo1'
    };

    state = paymentReducer(
      state,
      PaymentActions.ngPatUpdateStripePayment({
        payment: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[payment.id]).toEqual(update);
  });

  it('should ngPatUpdateStripePayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddStripePayments({ payments: [payment1, payment2] })
    );

    // PaymentActions.ngPatUpsertStripePayments
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
      PaymentActions.ngPatUpdateStripePayments({ payments: updatesPayload })
    );

    expect(state.entities[payment1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeleteStripePayment', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddStripePayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);

    state = paymentReducer(
      state,
      PaymentActions.ngPatDeleteStripePayment({ id: payment1.id })
    );

    expect(state.entities[payment1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(payment1.id)).toBe(false);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);
  });

  it('should ngPatDeleteStripePayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatAddStripePayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);

    state = paymentReducer(
      state,
      PaymentActions.ngPatDeleteStripePayments({
        ids: [payment1.id, payment2.id]
      })
    );

    expect(state.entities[payment1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(payment1.id)).toBe(false);

    expect(state.entities[payment2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(payment2.id)).toBe(false);
  });

  it('should ngPatLoadStripePayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    const state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatLoadStripePayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);
  });

  it('should ngPatClearStripePayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.ngPatLoadStripePayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);

    // ngPatClearStripePayments
    //
    state = paymentReducer(state, PaymentActions.ngPatClearStripePayments());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
