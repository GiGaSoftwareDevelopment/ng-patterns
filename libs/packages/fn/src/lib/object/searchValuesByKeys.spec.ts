/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

/* tslint:disable:no-unused-variable */

import {searchValuesByKeys} from './searchValuesByKeys';

describe('searchValuesByKeys', () => {
  let object: any;

  beforeEach(() => {
    object = {
      aaa: 'aaa',
      bbb: {
        ccc: 'ccc',
        ddd: {
          eee: 'ee1',
          aaa: 'aaa',
          fff: 'fff',
          hhh: 'hh1'
        },
        ggg: 'ggg'
      },
      eee: 'ee2',
      iii: {
        jjj: [
          {
            qqq: 'qqq'
          },
          {
            ooo: 'ooo'
          }
        ],
        kkk: {
          mmm: 'mmm',
          nnn: {
            ppp: 'ppp',
            hhh: 'hh2',
            qqq: 'qqq'
          },
          ooo: 'ooo'
        },
        lll: 'lll'
      }
    };
  });

  afterEach(() => {
    object = null;
  });

  it('should return data of objects only', () => {
    const data: any[] = searchValuesByKeys(object, ['hhh', 'ooo']);

    expect(data.length).toEqual(4);
    expect(data).toEqual(['hh1', 'ooo', 'hh2', 'ooo']);
  });
});
