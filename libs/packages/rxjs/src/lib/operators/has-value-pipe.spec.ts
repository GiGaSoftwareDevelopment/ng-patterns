import { fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';

/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { hasValuePipe } from './has-value-pipe';

describe('hasValuePipe', () => {
  it('should pass defined', () => {
    const object: any = {
      a: {
        b: { c: { d: { e: 'foo' } } },
        f: { g: { h: { i: 'bar' } } },
      },
    };

    const s: Subject<any> = new Subject();

    let r: any;
    s.pipe(hasValuePipe()).subscribe((_r: any) => {
      r = _r;
    });

    s.next(object);

    expect(r).toBeDefined();
  });

  it('should not pass null', fakeAsync(() => {
    const s: Subject<any> = new Subject();

    let r: any;
    s.pipe(hasValuePipe()).subscribe((_r: any) => {
      r = _r;
    });

    s.next(null);

    tick();

    expect(r).toBeUndefined();
  }));

  it('should not pass undefined', () => {
    const s: Subject<any> = new Subject();
    const u: any = undefined;
    let r: any;
    s.pipe(hasValuePipe()).subscribe((_r: any) => {
      r = _r;
    });

    s.next(u);

    expect(r).toBeUndefined();
  });
});
