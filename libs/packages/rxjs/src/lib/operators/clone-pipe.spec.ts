import { fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';

/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { clonePipe } from './clone-pipe';

describe('clonePipe', () => {
  it('should clone', fakeAsync(() => {
    const object: any = {
      a: {
        b: { c: { d: { e: 'foo' } } },
        f: { g: { h: { i: 'bar' } } },
      },
    };

    const s: Subject<any> = new Subject();

    let r: any;
    s.pipe(clonePipe()).subscribe((_r: any) => {
      r = _r;
    });

    s.next(object);

    tick();

    expect(object.a.b.c.d.e).toEqual(r.a.b.c.d.e);
  }));
});
