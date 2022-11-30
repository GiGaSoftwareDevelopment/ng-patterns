/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

/* tslint:disable:no-unused-variable */

import { valuesHaveValue } from './valuesHaveValue';
import { searchObjectByKeys } from './searchObjectByKeys';
import { isTruthy } from '../common/isTruthy';

describe('searchObjectByKeys', () => {
  let object: any;

  beforeEach(() => {
    object = {
      aaa: {
        a: false,
        b: false,
        s: 'foo',
      },
      bbb: {
        ccc: 'ccc',
        ddd: {
          eee: 'ee1',
          aaa: 'aaa',
          fff: 'fff',
          hhh: 'hh1',
        },
        ggg: 'ggg',
      },
      eee: 'ee2',
      iii: {
        jjj: 'jjj',
        kkk: {
          aaa: {
            c: false,
            b: false,
            s: 'foo',
          },
          mmm: 'mmm',
          nnn: {
            ppp: 'ppp',
            hhh: 'hh2',
            qqq: 'qqq',
            ttt: {
              a: true,
              b: false,
              s: 'foo',
            },
          },
          ooo: 'ooo',
        },
        lll: 'lll',
        ar1: [
          {
            ttt: {
              a: true,
              b: false,
              s: 'foo',
            },
          },
          {
            a: true,
            b: false,
            s: 'foo',
          },
        ],
        rrr: {
          aaa: {
            a: true,
            b: false,
            s: 'foo',
          },
        },
      },
    };
  });

  afterEach(() => {
    object = null;
  });

  describe('array', () => {
    it('should find deep object', () => {
      const result: any[] = searchObjectByKeys(object, ['fff']);

      expect(result.length).toEqual(1);
      expect(result[0].key).toEqual('fff');
      expect(result[0].path).toEqual('bbb.ddd.fff');
      expect(result[0].data).toEqual('fff');
    });

    it('should find multiple objects object', () => {
      const result: any[] = searchObjectByKeys(object, ['eee']);

      expect(result.length).toEqual(2);

      expect(result[0].key).toEqual('eee');
      expect(result[0].path).toEqual('bbb.ddd.eee');
      expect(result[0].data).toEqual('ee1');

      expect(result[1].key).toEqual('eee');
      expect(result[1].path).toEqual('eee');
      expect(result[1].data).toEqual('ee2');
    });

    it('should find multiple objects', () => {
      const result: any[] = searchObjectByKeys(object, ['hhh', 'ooo']);

      expect(result.length).toEqual(3);

      expect(result[0].key).toEqual('hhh');
      expect(result[0].path).toEqual('bbb.ddd.hhh');
      expect(result[0].data).toEqual('hh1');

      expect(result[1].key).toEqual('hhh');
      expect(result[1].path).toEqual('iii.kkk.nnn.hhh');
      expect(result[1].data).toEqual('hh2');

      expect(result[2].key).toEqual('ooo');
      expect(result[2].path).toEqual('iii.kkk.ooo');
      expect(result[2].data).toEqual('ooo');
    });
  });

  describe('function', () => {
    it('should find using conditions on props', () => {
      const testFn: (item: any) => boolean = (item: any) => {
        return valuesHaveValue(item, ['a', 'b']);
      };

      const result: any[] = searchObjectByKeys(object, testFn);

      expect(result.length).toEqual(4);

      expect(result[0].key).toEqual('aaa');
      expect(result[0].path).toEqual('aaa');
      expect(result[0].data.a).toBeFalsy();
      expect(result[0].data.b).toBeFalsy();
      expect(result[0].data.c).toBeUndefined();

      expect(result[1].key).toEqual('ttt');
      expect(result[1].path).toEqual('iii.kkk.nnn.ttt');
      expect(result[1].data.a).toBeTruthy();
      expect(result[1].data.b).toBeFalsy();
      expect(result[1].data.c).toBeUndefined();

      expect(result[2].key).toEqual('ttt');
      expect(result[2].path).toEqual('iii.ar1[0].ttt');
      expect(result[2].data.a).toBeTruthy();
      expect(result[2].data.b).toBeFalsy();
      expect(result[2].data.c).toBeUndefined();

      expect(result[3].key).toEqual('aaa');
      expect(result[3].path).toEqual('iii.rrr.aaa');
      expect(result[3].data.a).toBeTruthy();
      expect(result[3].data.b).toBeFalsy();
      expect(result[3].data.c).toBeUndefined();
    });

    it('should find using conditions on props', () => {
      const testFn: (item: any) => boolean = (item: any) => {
        return valuesHaveValue(item, ['a', 'b']) && isTruthy(item.a);
      };

      const result: any[] = searchObjectByKeys(object, testFn);

      expect(result.length).toEqual(3);

      expect(result[0].key).toEqual('ttt');
      expect(result[0].path).toEqual('iii.kkk.nnn.ttt');
      expect(result[0].data.a).toBeTruthy();
      expect(result[0].data.b).toBeFalsy();
      expect(result[0].data.c).toBeUndefined();

      expect(result[1].key).toEqual('ttt');
      expect(result[1].path).toEqual('iii.ar1[0].ttt');
      expect(result[1].data.a).toBeTruthy();
      expect(result[1].data.b).toBeFalsy();
      expect(result[1].data.c).toBeUndefined();

      expect(result[2].key).toEqual('aaa');
      expect(result[2].path).toEqual('iii.rrr.aaa');
      expect(result[2].data.a).toBeTruthy();
      expect(result[2].data.b).toBeFalsy();
      expect(result[2].data.c).toBeUndefined();
    });

    it('should find using conditions on props', () => {
      const testFn: (item: any, key: string) => boolean = (item: any, key: string) => {
        return key === 'ttt' && valuesHaveValue(item, ['a', 'b']) && isTruthy(item.a);
      };

      const result: any[] = searchObjectByKeys(object, testFn);

      expect(result.length).toEqual(2);

      expect(result[0].key).toEqual('ttt');
      expect(result[0].path).toEqual('iii.kkk.nnn.ttt');
      expect(result[0].data.a).toBeTruthy();
      expect(result[0].data.b).toBeFalsy();
      expect(result[0].data.c).toBeUndefined();

      expect(result[1].key).toEqual('ttt');
      expect(result[1].path).toEqual('iii.ar1[0].ttt');
      expect(result[1].data.a).toBeTruthy();
      expect(result[1].data.b).toBeFalsy();
      expect(result[1].data.c).toBeUndefined();
    });

    it('should find using conditions on props', () => {
      const object2: any[] = [
        {
          ttt: {
            a: true,
            b: false,
            s: 'foo',
          },
        },
        {
          a: true,
          b: false,
          s: 'foo',
          q: {
            ttt: {
              a: true,
              b: false,
              s: 'foo',
            },
          },
        },
      ];

      const testFn: (item: any, key: string) => boolean = (item: any, key: string) => {
        return key === 'ttt' && valuesHaveValue(item, ['a', 'b']) && isTruthy(item.a);
      };

      const result: any[] = searchObjectByKeys(object2, testFn);

      expect(result.length).toEqual(2);

      expect(result[0].key).toEqual('ttt');
      expect(result[0].path).toEqual('[0].ttt');
      expect(result[0].data.a).toBeTruthy();
      expect(result[0].data.b).toBeFalsy();
      expect(result[0].data.c).toBeUndefined();

      expect(result[1].key).toEqual('ttt');
      expect(result[1].path).toEqual('[1].q.ttt');
      expect(result[1].data.a).toBeTruthy();
      expect(result[1].data.b).toBeFalsy();
      expect(result[1].data.c).toBeUndefined();
    });
  });
});
