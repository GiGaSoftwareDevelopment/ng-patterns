import {Subject} from 'rxjs';
import {isTruthyOperator} from './is-truthy-operator';

/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

describe('isTruthyPipe', () => {
  it('should pass defined', () => {
    const object: any = {
      a: {
        b: {c: {d: {e: 'foo'}}},
        f: {g: {h: {i: 'bar'}}}
      }
    };

    const s: Subject<any> = new Subject();

    let r: any;
    s.pipe(isTruthyOperator()).subscribe((_r: any) => {
      r = _r;
    });

    s.next(object);

    expect(r).toBeDefined();
  });

  it('should not pass null', () => {
    const s: Subject<any> = new Subject();

    let r: any;
    s.pipe(isTruthyOperator()).subscribe((_r: any) => {
      r = _r;
    });

    s.next(null);

    expect(r).toBeUndefined();
  });

  it('should not pass undefined', () => {
    const s: Subject<any> = new Subject();
    const u: any = undefined;
    let r: any;
    s.pipe(isTruthyOperator()).subscribe((_r: any) => {
      r = _r;
    });

    s.next(u);

    expect(r).toBeUndefined();
  });
});
