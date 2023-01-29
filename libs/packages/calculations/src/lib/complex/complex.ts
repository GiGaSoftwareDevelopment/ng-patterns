import { parser_exit } from './math.fns';

export interface RealImaginary {
  re: number;
  im: number;
}

const parse = function(a:  number | string, b:number | string): RealImaginary {

  const z: RealImaginary = { 're': 0, 'im': 0 };

  if (a === undefined || a === null) {
    z['re'] =
      z['im'] = 0;
  } else if (b !== undefined) {
    z['re'] = <number>a;
    z['im'] = <number>b;
  } else
    switch (typeof a) {

      case 'object':

        if ('im' in a && 're' in a) {
          z['re'] = a['re'];
          z['im'] = a['im'];
        } else if ('abs' in a && 'arg' in a) {
          if (!Number.isFinite(a['abs']) && Number.isFinite(a['arg'])) {
            return Complex.INFINITY;
          }
          z['re'] = a['abs'] * Math.cos(a['arg']);
          z['im'] = a['abs'] * Math.sin(a['arg']);
        } else if ('r' in a && 'phi' in a) {
          if (!Number.isFinite(a['r']) && Number.isFinite(a['phi'])) {
            return Complex.INFINITY;
          }
          z['re'] = a['r'] * Math.cos(a['phi']);
          z['im'] = a['r'] * Math.sin(a['phi']);
        } else if ((<never[]>a).length === 2) { // Quick array check
          z['re'] = (<never[]>a)[0];
          z['im'] = (<never[]>a)[1];
        } else {
          parser_exit();
        }
        break;

      case 'string':

        z['im'] = /* void */
          z['re'] = 0;

        // eslint-disable-next-line no-case-declarations
        const tokens: RegExpMatchArray | null = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
        // eslint-disable-next-line no-case-declarations
        let plus = 1;
        // eslint-disable-next-line no-case-declarations
        let minus = 0;

        if (tokens === null) {
          parser_exit();
        }

        if (tokens !== null) {
          for (let i = 0; i < tokens.length; i++) {

            const c = <string>tokens[i];

            if (c === ' ' || c === '\t' || c === '\n') {
              /* void */
            } else if (c === '+') {
              plus++;
            } else if (c === '-') {
              minus++;
            } else if (c === 'i' || c === 'I') {

              if (plus + minus === 0) {
                parser_exit();
              }

              const tokenValue = <unknown>tokens[i + 1];

              if (tokenValue !== ' ' && !isNaN(<number>tokenValue)) {
                const num: string = <string>(minus % 2 ? '-' : '') + tokenValue;
                z['im'] += parseFloat(num);
                i++;
              } else {
                const num = (minus % 2 ? '-' : '') + '1';
                z['im'] += parseFloat(num);
              }
              plus = minus = 0;

            } else {

              if (plus + minus === 0 || isNaN(<unknown>c as number)) {
                parser_exit();
              }

              if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
                z['im'] += parseFloat((minus % 2 ? '-' : '') + c);
                i++;
              } else {
                z['re'] += parseFloat((minus % 2 ? '-' : '') + c);
              }
              plus = minus = 0;
            }
          }

        }

        // Still something on the stack
        if (plus + minus > 0) {
          parser_exit();
        }
        break;

      case 'number':
        z['im'] = 0;
        z['re'] = a;
        break;

      default:
        parser_exit();
    }

  if (isNaN(<number>z['re']) || isNaN(<number>z['im'])) {
    // If a calculation is NaN, we treat it as NaN and don't throw
    //parser_exit();
  }

  return z;
};

export class Complex {

  static ZERO = new Complex(0, 0);
  static ONE = new Complex(1, 0);
  static I  = new Complex(0, 1);
  static PI = new Complex(Math.PI, 0);
  static E = new Complex(Math.E, 0);
  static INFINITY = new Complex(Infinity, Infinity);
  static NAN = new Complex(NaN, NaN);
  static EPSILON = 1e-15;

  re = 0;
  im = 0;

  constructor(a: number, b: number) {
    const z: RealImaginary = parse(a, b);
    this.re = z['re'];
    this.im = z['im'];
  }


}
