import { Update } from '@ngrx/entity/src/models';
import { PromoCode } from './promo-code.model';
import {
  reducer,
  initialPromoCodeState,
  PromoCodeState
} from './promo-code.reducer';
import * as PromoCodeActions from './promo-code.actions';

describe('PromoCode Reducer', () => {
  it('should ngPatAddStripePromoCode', () => {
    const promoCode: PromoCode = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatAddStripePromoCode({ promoCode })
    );

    expect(state.entities[promoCode.id]).toEqual(promoCode);
    expect(state.ids[0]).toEqual(promoCode.id);
  });

  it('should ngPatUpsertStripePromoCode', () => {
    const promoCode: PromoCode = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatAddStripePromoCode({ promoCode })
    );

    // PromoCodeActions.ngPatUpsertStripePromoCode
    //

    const upsert: PromoCode = {
      ...promoCode,
      aProp: 'baz'
    };

    state = reducer(
      state,
      PromoCodeActions.ngPatUpsertStripePromoCode({ promoCode: upsert })
    );

    expect(state.entities[promoCode.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(promoCode.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddStripePromoCodes', () => {
    const promoCode1: PromoCode = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const promoCode2: PromoCode = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatAddStripePromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);
  });

  it('should ngPatUpsertStripePromoCodes', () => {
    const promoCode1: PromoCode = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const promoCode2: PromoCode = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatAddStripePromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    // PromoCodeActions.ngPatUpsertStripePromoCodes
    //

    const upsert1: PromoCode = {
      ...promoCode1,
      aProp: 'baz1'
    };

    const upsert2: PromoCode = {
      ...promoCode2,
      aProp: 'baz2'
    };

    state = reducer(
      state,
      PromoCodeActions.ngPatUpsertStripePromoCodes({
        promoCodes: [upsert1, upsert2]
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdateStripePromoCode', () => {
    const promoCode: PromoCode = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatAddStripePromoCode({ promoCode })
    );

    // ngPatUpdateStripePromoCode
    //
    const update: PromoCode = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      PromoCodeActions.ngPatUpdateStripePromoCode({
        promoCode: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[promoCode.id]).toEqual(update);
  });

  it('should ngPatUpdateStripePromoCodes', () => {
    const promoCode1: PromoCode = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const promoCode2: PromoCode = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatAddStripePromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    // PromoCodeActions.ngPatUpsertStripePromoCodes
    //

    const update1: PromoCode = {
      ...promoCode1,
      aProp: 'baz1'
    };

    const update2: PromoCode = {
      ...promoCode2,
      aProp: 'baz2'
    };

    const updatesPayload: Update<PromoCode>[] = [
      {
        id: update1.id,
        changes: update1
      },
      {
        id: update2.id,
        changes: update2
      }
    ];

    state = reducer(
      state,
      PromoCodeActions.ngPatUpdateStripePromoCodes({
        promoCodes: updatesPayload
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeleteStripePromoCode', () => {
    const promoCode1: PromoCode = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const promoCode2: PromoCode = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatAddStripePromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);

    state = reducer(
      state,
      PromoCodeActions.ngPatDeleteStripePromoCode({ id: promoCode1.id })
    );

    expect(state.entities[promoCode1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(false);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);
  });

  it('should ngPatDeleteStripePromoCodes', () => {
    const promoCode1: PromoCode = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const promoCode2: PromoCode = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatAddStripePromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);

    state = reducer(
      state,
      PromoCodeActions.ngPatDeleteStripePromoCodes({
        ids: [promoCode1.id, promoCode2.id]
      })
    );

    expect(state.entities[promoCode1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(false);

    expect(state.entities[promoCode2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(false);
  });

  it('should ngPatLoadStripePromoCodes', () => {
    const promoCode1: PromoCode = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const promoCode2: PromoCode = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatLoadStripePromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);
  });

  it('should ngPatClearStripePromoCodes', () => {
    const promoCode1: PromoCode = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const promoCode2: PromoCode = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatLoadStripePromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);

    // ngPatClearStripePromoCodes
    //
    state = reducer(state, PromoCodeActions.ngPatClearStripePromoCodes());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
