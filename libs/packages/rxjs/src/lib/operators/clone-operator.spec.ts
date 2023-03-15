import {fakeAsync, tick} from '@angular/core/testing';
import {Subject} from 'rxjs';

/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {cloneOperator} from './clone-operator';

describe('cloneOperator', () => {
  it('should clone', fakeAsync(() => {
    const object: any = {
      a: {
        b: {c: {d: {e: 'foo'}}},
        f: {g: {h: {i: 'bar'}}}
      }
    };

    const s: Subject<any> = new Subject();

    let r: any;
    s.pipe(cloneOperator()).subscribe((_r: any) => {
      r = _r;
    });

    s.next(object);

    tick();

    expect(object.a.b.c.d.e).toEqual(r.a.b.c.d.e);
  }));
});
