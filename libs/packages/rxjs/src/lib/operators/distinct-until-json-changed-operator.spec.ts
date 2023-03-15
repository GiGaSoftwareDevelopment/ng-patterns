import {fakeAsync, tick} from '@angular/core/testing';
import {Subject} from 'rxjs';

/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {distinctUntilJsonChangedOperator} from './distinct-until-json-changed-operator';

describe('distinctUntilJsonChanged', () => {
  it('should allow one instance', fakeAsync(() => {
    const object: any = {
      a: {
        b: {c: {d: {e: 'foo'}}},
        f: {g: {h: {i: 'bar'}}}
      }
    };

    const s: Subject<any> = new Subject();

    let r: any;
    let count = 0;

    s.pipe(distinctUntilJsonChangedOperator()).subscribe((_r: any) => {
      r = _r;
      count++;
    });

    s.next(object);
    tick();
    s.next(object);
    tick();
    s.next(object);
    tick();

    expect(object.a.b.c.d.e).toEqual(r.a.b.c.d.e);
    expect(count).toEqual(1);
  }));

  it('should allow data if changed', fakeAsync(() => {
    const dataA: any = {
      a: {
        b: {c: {d: {e: 'foo'}}},
        f: {g: {h: {i: 'bar'}}}
      }
    };

    const dataB: any = {
      a: {
        b: {c: {d: {e: 'foo'}}},
        f: {g: {h: {i: 'baz'}}} // <-- changed
      }
    };

    const s: Subject<any> = new Subject();

    let r: any;
    let count = 0;

    s.pipe(distinctUntilJsonChangedOperator()).subscribe((_r: any) => {
      r = _r;
      count++;
    });

    s.next(dataA);
    tick();
    s.next(dataA);
    tick();
    s.next(dataA);
    tick();

    s.next(dataB);
    tick();
    s.next(dataB);
    tick();

    s.next(dataA);
    tick();

    s.next(dataB);
    tick();

    expect(dataA.a.f.g.h.i).not.toEqual(r.a.f.g.h.i);
    expect(dataB.a.f.g.h.i).toEqual(r.a.f.g.h.i);
    expect(count).toEqual(4);
  }));
});
