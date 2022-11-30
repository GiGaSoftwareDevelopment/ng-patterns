/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

/* tslint:disable:no-unused-variable */

import { searchValuesByMatch } from './searchValuesByMatch';

describe('searchValuesByMatch', () => {
  let target: any;

  beforeEach(() => {
    target = {
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
      children: [
        {
          a: true,
          b: false,
          zeta: 'foo',
          children: [
            {
              a: true,
              b: false,
              q: 'foo',
            },
            {
              a: 'z',
              alpha: 'omega',
            },
          ],
        },
      ],
    };
  });

  afterEach(() => {
    target = null;
  });

  describe('array', () => {
    it('should find deep object', () => {
      const search: any = { fff: 'fff' };
      const result: any[] = searchValuesByMatch(target, search);

      expect(result.length).toEqual(1);
      expect(result[0].search).toEqual(search);
      expect(result[0].path).toEqual('bbb.ddd');
      expect(result[0].data).toEqual(target.bbb.ddd);
    });

    it('should find deep object of multiple properties', () => {
      const search: any = {
        a: 'z',
        alpha: 'omega',
      };

      const result: any[] = searchValuesByMatch(target, search);

      expect(result.length).toEqual(1);
      expect(result[0].search).toEqual(search);
      expect(result[0].path).toEqual('children[0].children[1]');
      expect(result[0].data).toEqual(target.children[0].children[1]);
    });

    it('should find multiple matches of multiple properties', () => {
      const search: any = {
        a: true,
        b: false,
        s: 'foo',
      };

      const result: any[] = searchValuesByMatch(target, search);

      expect(result.length).toEqual(4);

      expect(result[0].search).toEqual(search);
      expect(result[0].path).toEqual('iii.kkk.nnn.ttt');
      expect(result[0].data).toEqual(target.iii.kkk.nnn.ttt);

      expect(result[1].search).toEqual(search);
      expect(result[1].path).toEqual('iii.ar1[0].ttt');
      expect(result[1].data).toEqual(target.iii.ar1[0].ttt);

      expect(result[2].search).toEqual(search);
      expect(result[2].path).toEqual('iii.ar1[1]');
      expect(result[2].data).toEqual(target.iii.ar1[1]);

      expect(result[3].search).toEqual(search);
      expect(result[3].path).toEqual('iii.rrr.aaa');
      expect(result[3].data).toEqual(target.iii.rrr.aaa);
    });
  });
});
