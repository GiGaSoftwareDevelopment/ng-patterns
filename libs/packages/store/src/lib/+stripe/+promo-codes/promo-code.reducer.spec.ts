import { Update } from '@ngrx/entity/src/models';
import { PromoCode } from './promo-code.model';
import {
  reducer,
  initialPromoCodeState,
  PromoCodeState
} from './promo-code.reducer';
import * as PromoCodeActions from './promo-code.actions';

describe('PromoCode Reducer', () => {
  it('should ngPatAddPromoCode', () => {
    const promoCode: PromoCode = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatAddPromoCode({ promoCode })
    );

    expect(state.entities[promoCode.id]).toEqual(promoCode);
    expect(state.ids[0]).toEqual(promoCode.id);
  });

  it('should ngPatUpsertPromoCode', () => {
    const promoCode: PromoCode = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatAddPromoCode({ promoCode })
    );

    // PromoCodeActions.ngPatUpsertPromoCode
    //

    const upsert: PromoCode = {
      ...promoCode,
      aProp: 'baz'
    };

    state = reducer(
      state,
      PromoCodeActions.ngPatUpsertPromoCode({ promoCode: upsert })
    );

    expect(state.entities[promoCode.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(promoCode.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddPromoCodes', () => {
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
      PromoCodeActions.ngPatAddPromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);
  });

  it('should ngPatUpsertPromoCodes', () => {
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
      PromoCodeActions.ngPatAddPromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    // PromoCodeActions.ngPatUpsertPromoCodes
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
      PromoCodeActions.ngPatUpsertPromoCodes({ promoCodes: [upsert1, upsert2] })
    );

    expect(state.entities[promoCode1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdatePromoCode', () => {
    const promoCode: PromoCode = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.ngPatAddPromoCode({ promoCode })
    );

    // ngPatUpdatePromoCode
    //
    const update: PromoCode = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      PromoCodeActions.ngPatUpdatePromoCode({
        promoCode: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[promoCode.id]).toEqual(update);
  });

  it('should ngPatUpdatePromoCodes', () => {
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
      PromoCodeActions.ngPatAddPromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    // PromoCodeActions.ngPatUpsertPromoCodes
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
      PromoCodeActions.ngPatUpdatePromoCodes({ promoCodes: updatesPayload })
    );

    expect(state.entities[promoCode1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeletePromoCode', () => {
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
      PromoCodeActions.ngPatAddPromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);

    state = reducer(
      state,
      PromoCodeActions.ngPatDeletePromoCode({ id: promoCode1.id })
    );

    expect(state.entities[promoCode1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(false);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);
  });

  it('should ngPatDeletePromoCodes', () => {
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
      PromoCodeActions.ngPatAddPromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);

    state = reducer(
      state,
      PromoCodeActions.ngPatDeletePromoCodes({
        ids: [promoCode1.id, promoCode2.id]
      })
    );

    expect(state.entities[promoCode1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(false);

    expect(state.entities[promoCode2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(false);
  });

  it('should ngPatLoadPromoCodes', () => {
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
      PromoCodeActions.ngPatLoadPromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);
  });

  it('should ngPatClearPromoCodes', () => {
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
      PromoCodeActions.ngPatLoadPromoCodes({
        promoCodes: [promoCode1, promoCode2]
      })
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);

    // ngPatClearPromoCodes
    //
    state = reducer(state, PromoCodeActions.ngPatClearPromoCodes());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
