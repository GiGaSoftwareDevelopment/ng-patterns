import { Update } from '@ngrx/entity/src/models';
import {
  paymentReducer,
  initialPaymentState,
  PaymentState
} from './payment.reducer';
import * as PaymentActions from './payment.actions';
import { PaymentIntent } from '../entities/payment.model';

describe('Payment Reducer', () => {
  it('should addPayment', () => {
    const payment: PaymentIntent = {
      id: 'foo'
    };

    const state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.addPayment({ payment })
    );

    expect(state.entities[payment.id]).toEqual(payment);
    expect(state.ids[0]).toEqual(payment.id);
  });

  it('should upsertPayment', () => {
    const payment: PaymentIntent = {
      id: 'foo'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.addPayment({ payment })
    );

    // PaymentActions.upsertPayment
    //

    const upsert: PaymentIntent = {
      ...payment
    };

    state = paymentReducer(
      state,
      PaymentActions.upsertPayment({ payment: upsert })
    );

    expect(state.entities[payment.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(payment.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should addPayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    const state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.addPayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);
  });

  it('should upsertPayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.addPayments({ payments: [payment1, payment2] })
    );

    // PaymentActions.upsertPayments
    //

    const upsert1: PaymentIntent = {
      ...payment1
    };

    const upsert2: PaymentIntent = {
      ...payment2
    };

    state = paymentReducer(
      state,
      PaymentActions.upsertPayments({ payments: [upsert1, upsert2] })
    );

    expect(state.entities[payment1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should updatePayment', () => {
    const payment: PaymentIntent = {
      id: 'foo1'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.addPayment({ payment })
    );

    // updatePayment
    //
    const update: PaymentIntent = {
      id: 'foo1'
    };

    state = paymentReducer(
      state,
      PaymentActions.updatePayment({
        payment: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[payment.id]).toEqual(update);
  });

  it('should updatePayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.addPayments({ payments: [payment1, payment2] })
    );

    // PaymentActions.upsertPayments
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
      PaymentActions.updatePayments({ payments: updatesPayload })
    );

    expect(state.entities[payment1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should deletePayment', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.addPayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);

    state = paymentReducer(
      state,
      PaymentActions.deletePayment({ id: payment1.id })
    );

    expect(state.entities[payment1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(payment1.id)).toBe(false);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);
  });

  it('should deletePayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.addPayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);

    state = paymentReducer(
      state,
      PaymentActions.deletePayments({ ids: [payment1.id, payment2.id] })
    );

    expect(state.entities[payment1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(payment1.id)).toBe(false);

    expect(state.entities[payment2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(payment2.id)).toBe(false);
  });

  it('should loadPayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    const state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.loadPayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);
  });

  it('should clearPayments', () => {
    const payment1: PaymentIntent = {
      id: 'foo1'
    };

    const payment2: PaymentIntent = {
      id: 'foo2'
    };

    let state: PaymentState = paymentReducer(
      initialPaymentState,
      PaymentActions.loadPayments({ payments: [payment1, payment2] })
    );

    expect(state.entities[payment1.id]).toEqual(payment1);
    expect((<string[]>state.ids).includes(payment1.id)).toBe(true);

    expect(state.entities[payment2.id]).toEqual(payment2);
    expect((<string[]>state.ids).includes(payment2.id)).toBe(true);

    // clearPayments
    //
    state = paymentReducer(state, PaymentActions.clearPayments());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
