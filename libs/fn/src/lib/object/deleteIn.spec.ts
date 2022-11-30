import { get } from 'lodash';
import { clone } from '../common/clone';
import { deleteIn } from './deleteIn';

describe('deleteIn', () => {
  describe('object', () => {
    let obj: any;

    beforeEach(() => {
      obj = clone({
        a: 'a',
        b: {
          b1a: 'b1a',
          b1b: {
            b2a: 'b2a',
            b2b: 'b2b',
          },
        },
        c: 'c',
      });
    });

    afterEach(() => {
      obj = null;
    });

    it('should delete nested value with dot notation', () => {
      // expected
      const expected = {
        a: 'a',
        b: {
          b1a: 'b1a',
          b1b: {
            // 'b2a': 'b2a',  // <- deleted
            b2b: 'b2b',
          },
        },
        c: 'c',
      };

      const r: any = deleteIn(obj, 'b.b1b.b2a');

      expect(get(r, 'b.b1b.b2a')).toBeUndefined();
      expect(r).toEqual(expected);
    });

    it('should delete nested value with _array notation', () => {
      // expected
      const expected = {
        a: 'a',
        b: {
          b1a: 'b1a',
          b1b: {
            // 'b2a': 'b2a',  // <- deleted
            b2b: 'b2b',
          },
        },
        c: 'c',
      };

      const r: any = deleteIn(obj, ['b.b1b.b2a']);

      expect(get(r, 'b.b1b.b2a')).toBeUndefined();
      expect(r).toEqual(expected);
    });

    it('should delete nested object with dot notation', () => {
      // expected
      const expected = {
        a: 'a',
        b: {
          b1a: 'b1a',
          // 'b1b': {
          //   'b2a': 'b2a',
          //   'b2b': 'b2b',
          // },
        },
        c: 'c',
      };

      const r: any = deleteIn(obj, 'b.b1b');

      expect(get(r, 'b.b1b')).toBeUndefined();
      expect(r).toEqual(expected);
    });

    it('should delete root object', () => {
      // expected
      const expected = {
        a: 'a',
        // b: {
        //   'b1a': 'b1a',
        //   'b1b': {
        //     'b2a': 'b2a',
        //     'b2b': 'b2b',
        //   },
        // },
        c: 'c',
      };

      const r: any = deleteIn(obj, 'b');

      expect(get(r, 'b')).toBeUndefined();
      expect(r).toEqual(expected);
    });

    it('should delete root value', () => {
      // expected
      const expected = {
        // a: 'a',
        b: {
          b1a: 'b1a',
          b1b: {
            b2a: 'b2a',
            b2b: 'b2b',
          },
        },
        c: 'c',
      };

      const r: any = deleteIn(obj, 'a');

      expect(get(r, 'a')).toBeUndefined();
      expect(r).toEqual(expected);
    });

    it('should not throw error if nested target does not exist', () => {
      // expected
      const expected = {
        a: 'a',
        b: {
          b1a: 'b1a',
          b1b: {
            b2a: 'b2a',
            b2b: 'b2b',
          },
        },
        c: 'c',
      };

      const r: any = deleteIn(obj, 'b.b1b.foo');

      expect(r).toEqual(expected);
      expect(r).toEqual(obj);
    });
  });

  describe('array', () => {
    let obj: any;

    beforeEach(() => {
      obj = clone([
        {
          a: 'a',
          b: {
            b1a: 'b1a',
            b1b: {
              b2a: 'b2a',
              b2b: 'b2b',
            },
          },
          c: 'c',
        },
        {
          a: ['a'],
          b: 'b',
        },
      ]);
    });

    afterEach(() => {
      obj = null;
    });

    it('should delete nested object in _array', () => {
      const expected: any = [
        {
          a: 'a',
          b: {
            b1a: 'b1a',
            b1b: {
              // 'b2a': 'b2a',
              b2b: 'b2b',
            },
          },
          c: 'c',
        },
        {
          a: ['a'],
          b: 'b',
        },
      ];

      const r: any = deleteIn(obj, '[0].b.b1b.b2a');
      expect(r).toEqual(expected);
    });

    it('should delete nested _array', () => {
      const expected: any = [
        {
          a: 'a',
          b: {
            b1a: 'b1a',
            b1b: {
              b2a: 'b2a',
              b2b: 'b2b',
            },
          },
          c: 'c',
        },
        {
          a: [
            // 'a'
          ],
          b: 'b',
        },
      ];

      const r: any = deleteIn(obj, '[1].a[0]');
      expect(r).toEqual(expected);
    });

    it('should delete nested _array in an object', () => {
      const expected: any = [
        {
          a: 'a',
          b: {
            b1a: 'b1a',
            b1b: {
              b2a: 'b2a',
              b2b: 'b2b',
            },
          },
          c: 'c',
        },
        {
          // 'a': [
          //   'a'
          // ],
          b: 'b',
        },
      ];

      const r: any = deleteIn(obj, '[1].a');
      expect(r).toEqual(expected);
    });

    it('should delete multiple paths', () => {
      const expected: any = [
        {
          a: 'a',
          b: {
            b1a: 'b1a',
            b1b: {
              // 'b2a': 'b2a',
              b2b: 'b2b',
            },
          },
          c: 'c',
        },
        {
          // a: ['a'],
          b: 'b',
        },
      ];

      const r: any = deleteIn(obj, ['[0].b.b1b.b2a', '[1].a']);
      expect(r).toEqual(expected);
    });
  });
});
