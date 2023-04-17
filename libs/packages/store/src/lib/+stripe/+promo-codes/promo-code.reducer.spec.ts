import {Update} from '@ngrx/entity/src/models';
import {PromoCode} from './promo-code.model';
import {
  reducer,
  initialPromoCodeState,
  PromoCodeState
} from './promo-code.reducer';
import * as PromoCodeActions from './promo-code.actions';

describe('PromoCode Reducer', () => {
  it('should addPromoCode', () => {
    const promoCode: PromoCode = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.addPromoCode({promoCode})
    );

    expect(state.entities[promoCode.id]).toEqual(promoCode);
    expect(state.ids[0]).toEqual(promoCode.id);
  });

  it('should upsertPromoCode', () => {
    const promoCode: PromoCode = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.addPromoCode({promoCode})
    );

    // PromoCodeActions.upsertPromoCode
    //

    const upsert: PromoCode = {
      ...promoCode,
      aProp: 'baz'
    };

    state = reducer(
      state,
      PromoCodeActions.upsertPromoCode({promoCode: upsert})
    );

    expect(state.entities[promoCode.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(promoCode.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should addPromoCodes', () => {
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
      PromoCodeActions.addPromoCodes({promoCodes: [promoCode1, promoCode2]})
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);
  });

  it('should upsertPromoCodes', () => {
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
      PromoCodeActions.addPromoCodes({promoCodes: [promoCode1, promoCode2]})
    );

    // PromoCodeActions.upsertPromoCodes
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
      PromoCodeActions.upsertPromoCodes({promoCodes: [upsert1, upsert2]})
    );

    expect(state.entities[promoCode1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should updatePromoCode', () => {
    const promoCode: PromoCode = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: PromoCodeState = reducer(
      initialPromoCodeState,
      PromoCodeActions.addPromoCode({promoCode})
    );

    // updatePromoCode
    //
    const update: PromoCode = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      PromoCodeActions.updatePromoCode({
        promoCode: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[promoCode.id]).toEqual(update);
  });

  it('should updatePromoCodes', () => {
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
      PromoCodeActions.addPromoCodes({promoCodes: [promoCode1, promoCode2]})
    );

    // PromoCodeActions.upsertPromoCodes
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
      PromoCodeActions.updatePromoCodes({promoCodes: updatesPayload})
    );

    expect(state.entities[promoCode1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should deletePromoCode', () => {
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
      PromoCodeActions.addPromoCodes({promoCodes: [promoCode1, promoCode2]})
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);

    state = reducer(
      state,
      PromoCodeActions.deletePromoCode({id: promoCode1.id})
    );

    expect(state.entities[promoCode1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(false);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);
  });

  it('should deletePromoCodes', () => {
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
      PromoCodeActions.addPromoCodes({promoCodes: [promoCode1, promoCode2]})
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);

    state = reducer(
      state,
      PromoCodeActions.deletePromoCodes({ids: [promoCode1.id, promoCode2.id]})
    );

    expect(state.entities[promoCode1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(false);

    expect(state.entities[promoCode2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(false);
  });

  it('should loadPromoCodes', () => {
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
      PromoCodeActions.loadPromoCodes({promoCodes: [promoCode1, promoCode2]})
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);
  });

  it('should clearPromoCodes', () => {
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
      PromoCodeActions.loadPromoCodes({promoCodes: [promoCode1, promoCode2]})
    );

    expect(state.entities[promoCode1.id]).toEqual(promoCode1);
    expect((<string[]>state.ids).includes(promoCode1.id)).toBe(true);

    expect(state.entities[promoCode2.id]).toEqual(promoCode2);
    expect((<string[]>state.ids).includes(promoCode2.id)).toBe(true);

    // clearPromoCodes
    //
    state = reducer(state, PromoCodeActions.clearPromoCodes());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
