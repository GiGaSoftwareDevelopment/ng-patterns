import { hypot, logHypot, parser_exit, sinh, cosh, cosm1 } from './math.fns';

export interface RealImaginary {
  re: number;
  im: number;
}

const parse = function(a: number | string, b: number | string): RealImaginary {

  const z: RealImaginary = { 're': 0, 'im': 0 };

  if (a === undefined || a === null) {
    z.re =
      z.im = 0;
  } else if (b !== undefined) {
    z.re = <number>a;
    z.im = <number>b;
  } else
    switch (typeof a) {

      case 'object':

        if ('im' in a && 're' in a) {
          z.re = a['re'];
          z.im = a['im'];
        } else if ('abs' in a && 'arg' in a) {
          if (!Number.isFinite(a['abs']) && Number.isFinite(a['arg'])) {
            return Complex.INFINITY;
          }
          z.re = a['abs'] * Math.cos(a['arg']);
          z.im = a['abs'] * Math.sin(a['arg']);
        } else if ('r' in a && 'phi' in a) {
          if (!Number.isFinite(a['r']) && Number.isFinite(a['phi'])) {
            return Complex.INFINITY;
          }
          z.re = a['r'] * Math.cos(a['phi']);
          z.im = a['r'] * Math.sin(a['phi']);
        } else if ((<never[]>a).length === 2) { // Quick array check
          z.re = (<never[]>a)[0];
          z.im = (<never[]>a)[1];
        } else {
          parser_exit();
        }
        break;

      case 'string':

        z.im = /* void */
          z.re = 0;

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
                z.im += parseFloat(num);
                i++;
              } else {
                const num = (minus % 2 ? '-' : '') + '1';
                z.im += parseFloat(num);
              }
              plus = minus = 0;

            } else {

              if (plus + minus === 0 || isNaN(<unknown>c as number)) {
                parser_exit();
              }

              if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
                z.im += parseFloat((minus % 2 ? '-' : '') + c);
                i++;
              } else {
                z.re += parseFloat((minus % 2 ? '-' : '') + c);
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
        z.im = 0;
        z.re = a;
        break;

      default:
        parser_exit();
    }

  if (isNaN(<number>z.re) || isNaN(<number>z.im)) {
    // If a calculation is NaN, we treat it as NaN and don't throw
    //parser_exit();
  }

  return z;
};

export class Complex {

  static ZERO = new Complex(0, 0);
  static ONE = new Complex(1, 0);
  static I = new Complex(0, 1);
  static PI = new Complex(Math.PI, 0);
  static E = new Complex(Math.E, 0);
  static INFINITY = new Complex(Infinity, Infinity);
  static NAN = new Complex(NaN, NaN);
  static EPSILON = 1e-15;

  re = 0;
  im = 0;

  constructor(a: number, b: number) {
    const z: RealImaginary = parse(a, b);
    this.re = z.re;
    this.im = z.im;
  }


  /**
   * Calculates the sign of a complex number, which is a normalized complex
   *
   * @returns {Complex}
   */
  sign() {

    const abs = this['abs']();

    return new Complex(
      this.re / abs,
      this.im / abs);
  }

  /**
   * Adds two complex numbers
   *
   */
  add(a: number, b: number): Complex {

    const z = new Complex(a, b);

    // Infinity + Infinity = NaN
    if (this.isInfinite() && z.isInfinite()) {
      return Complex.NAN;
    }

    // Infinity + z = Infinity { where z != Infinity }
    if (this.isInfinite() || z.isInfinite()) {
      return Complex.INFINITY;
    }

    return new Complex(
      this.re + z.re,
      this.im + z.im);
  }

  /**
   * Subtracts two complex numbers
   *
   */
  sub(a: number, b: number): Complex {

    const z = new Complex(a, b);

    // Infinity - Infinity = NaN
    if (this.isInfinite() && z.isInfinite()) {
      return Complex.NAN;
    }

    // Infinity - z = Infinity { where z != Infinity }
    if (this.isInfinite() || z.isInfinite()) {
      return Complex.INFINITY;
    }

    return new Complex(
      this.re - z.re,
      this.im - z.im);
  }

  /**
   * Multiplies two complex numbers
   *
   */
  mul(a: number, b: number): Complex {

    const z = new Complex(a, b);

    // Infinity * 0 = NaN
    if ((this.isInfinite() && z.isZero()) || (this.isZero() && z.isInfinite())) {
      return Complex.NAN;
    }

    // Infinity * z = Infinity { where z != 0 }
    if (this.isInfinite() || z.isInfinite()) {
      return Complex.INFINITY;
    }

    // Short circuit for real values
    if (z.im === 0 && this.im === 0) {
      return new Complex(this.re * z.re, 0);
    }

    return new Complex(
      this.re * z.re - this.im * z.im,
      this.re * z.im + this.im * z.re);
  }

  /**
   * Divides two complex numbers
   *
   */
  div(a: number, b: number): Complex {

    const z = new Complex(a, b);

    // 0 / 0 = NaN and Infinity / Infinity = NaN
    if ((this.isZero() && z.isZero()) || (this.isInfinite() && z.isInfinite())) {
      return Complex.NAN;
    }

    // Infinity / 0 = Infinity
    if (this.isInfinite() || z.isZero()) {
      return Complex.INFINITY;
    }

    // 0 / Infinity = 0
    if (this.isZero() || z.isInfinite()) {
      return Complex.ZERO;
    }

    a = this.re;
    b = this.im;

    const c = z.re;
    const d = z.im;
    let t, x;

    if (0 === d) {
      // Divisor is real
      return new Complex(a / c, b / c);
    }

    if (Math.abs(c) < Math.abs(d)) {

      x = c / d;
      t = c * x + d;

      return new Complex(
        (a * x + b) / t,
        (b * x - a) / t);

    } else {

      x = d / c;
      t = d * x + c;

      return new Complex(
        (a + b * x) / t,
        (b - a * x) / t);
    }
  }

  /**
   * Calculate the power of two complex numbers
   *
   */
  pow(a: number, b: number): Complex {

    const z = new Complex(a, b);

    a = this.re;
    b = this.im;

    if (z.isZero()) {
      return Complex.ONE;
    }

    // If the exponent is real
    if (z.im === 0) {

      if (b === 0 && a > 0) {

        return new Complex(Math.pow(a, z.re), 0);

      } else if (a === 0) { // If base is fully imaginary

        switch ((z.re % 4 + 4) % 4) {
          case 0:
            return new Complex(Math.pow(b, z.re), 0);
          case 1:
            return new Complex(0, Math.pow(b, z.re));
          case 2:
            return new Complex(-Math.pow(b, z.re), 0);
          case 3:
            return new Complex(0, -Math.pow(b, z.re));
        }
      }
    }

    /* I couldn't find a good formula, so here is a derivation and optimization
     *
     * z_1^z_2 = (a + bi)^(c + di)
     *         = exp((c + di) * log(a + bi)
     *         = pow(a^2 + b^2, (c + di) / 2) * exp(i(c + di)atan2(b, a))
     * =>...
     * Re = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * cos(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
     * Im = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * sin(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
     *
     * =>...
     * Re = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * cos(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
     * Im = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * sin(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
     *
     * =>
     * Re = exp(c * logsq2 - d * arg(z_1)) * cos(d * logsq2 + c * arg(z_1))
     * Im = exp(c * logsq2 - d * arg(z_1)) * sin(d * logsq2 + c * arg(z_1))
     *
     */

    if (a === 0 && b === 0 && z.re > 0 && z.im >= 0) {
      return Complex.ZERO;
    }

    const arg = Math.atan2(b, a);
    const loh = logHypot(a, b);

    a = Math.exp(z.re * loh - z.im * arg);
    b = z.im * loh + z.re * arg;
    return new Complex(
      a * Math.cos(b),
      a * Math.sin(b));
  }

  /**
   * Calculate the complex square root
   *
   */
  sqrt(): Complex {

    const a = this.re;
    const b = this.im;
    const r = this['abs']();

    let re, im;

    if (a >= 0) {

      if (b === 0) {
        return new Complex(Math.sqrt(a), 0);
      }

      re = 0.5 * Math.sqrt(2.0 * (r + a));
    } else {
      re = Math.abs(b) / Math.sqrt(2 * (r - a));
    }

    if (a <= 0) {
      im = 0.5 * Math.sqrt(2.0 * (r - a));
    } else {
      im = Math.abs(b) / Math.sqrt(2 * (r + a));
    }

    return new Complex(re, b < 0 ? -im : im);
  }

  /**
   * Calculate the complex exponent
   *
   */
  exp(): Complex {

    const tmp = Math.exp(this.re);

    if (this.im === 0) {
      //return new Complex(tmp, 0);
    }
    return new Complex(
      tmp * Math.cos(this.im),
      tmp * Math.sin(this.im));
  }

  /**
   * Calculate the complex exponent and subtracts one.
   *
   * This may be more accurate than `Complex(x).exp().sub(1)` if
   * `x` is small.
   *
   */
  expm1(): Complex {

    /**
     * exp(a + i*b) - 1
     = exp(a) * (cos(b) + j*sin(b)) - 1
     = expm1(a)*cos(b) + cosm1(b) + j*exp(a)*sin(b)
     */

    const a = this.re;
    const b = this.im;

    return new Complex(
      Math.expm1(a) * Math.cos(b) + cosm1(b),
      Math.exp(a) * Math.sin(b));
  }

  /**
   * Calculate the natural log
   *
   */
  log(): Complex {

    const a = this.re;
    const b = this.im;

    if (b === 0 && a > 0) {
      //return new Complex(Math.log(a), 0);
    }

    return new Complex(
      logHypot(a, b),
      Math.atan2(b, a));
  }

  /**
   * Calculate the magnitude of the complex number
   *
   */
  abs(): number {

    return hypot(this.re, this.im);
  }

  /**
   * Calculate the angle of the complex number
   *
   */
  arg(): number {

    return Math.atan2(this.im, this.re);
  }

  /**
   * Calculate the sine of the complex number
   *
   */
  sin(): Complex {

    // sin(z) = ( e^iz - e^-iz ) / 2i
    //        = sin(a)cosh(b) + i cos(a)sinh(b)

    const a = this.re;
    const b = this.im;

    return new Complex(
      Math.sin(a) * cosh(b),
      Math.cos(a) * sinh(b));
  }

  /**
   * Calculate the cosine
   *
   */
  cos(): Complex {

    // cos(z) = ( e^iz + e^-iz ) / 2
    //        = cos(a)cosh(b) - i sin(a)sinh(b)

    const a = this.re;
    const b = this.im;

    return new Complex(
      Math.cos(a) * cosh(b),
      -Math.sin(a) * sinh(b));
  }

  /**
   * Calculate the tangent
   *
   */
  tan(): Complex {

    // tan(z) = sin(z) / cos(z)
    //        = ( e^iz - e^-iz ) / ( i( e^iz + e^-iz ) )
    //        = ( e^2iz - 1 ) / i( e^2iz + 1 )
    //        = ( sin(2a) + i sinh(2b) ) / ( cos(2a) + cosh(2b) )

    const a = 2 * this.re;
    const b = 2 * this.im;
    const d = Math.cos(a) + cosh(b);

    return new Complex(
      Math.sin(a) / d,
      sinh(b) / d);
  }

  /**
   * Calculate the cotangent
   *
   */
  cot(): Complex {

    // cot(c) = i(e^(ci) + e^(-ci)) / (e^(ci) - e^(-ci))

    const a = 2 * this.re;
    const b = 2 * this.im;
    const d = Math.cos(a) - cosh(b);

    return new Complex(
      -Math.sin(a) / d,
      sinh(b) / d);
  }

  /**
   * Calculate the secant
   *
   */
  sec(): Complex {

    // sec(c) = 2 / (e^(ci) + e^(-ci))

    const a = this.re;
    const b = this.im;
    const d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a);

    return new Complex(
      Math.cos(a) * cosh(b) / d,
      Math.sin(a) * sinh(b) / d);
  }

  /**
   * Calculate the cosecans
   *
   */
  csc(): Complex {

    // csc(c) = 2i / (e^(ci) - e^(-ci))

    const a = this.re;
    const b = this.im;
    const d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);

    return new Complex(
      Math.sin(a) * cosh(b) / d,
      -Math.cos(a) * sinh(b) / d);
  }

  /**
   * Calculate the complex arcus sinus
   *
   */
  asin(): Complex {

    // asin(c) = -i * log(ci + sqrt(1 - c^2))

    const a = this.re;
    const b = this.im;

    const t1 = new Complex(
      b * b - a * a + 1,
      -2 * a * b).sqrt();

    const t2 = new Complex(
      t1.re - b,
      t1.im + a).log();

    return new Complex(t2.im, -t2.re);
  }

  /**
   * Calculate the complex arcus cosinus
   *
   */
  acos(): Complex {

    // acos(c) = i * log(c - i * sqrt(1 - c^2))

    const a = this.re;
    const b = this.im;

    const t1 = new Complex(
      b * b - a * a + 1,
      -2 * a * b)['sqrt']();

    const t2 = new Complex(
      t1.re - b,
      t1.im + a)['log']();

    return new Complex(Math.PI / 2 - t2.im, t2.re);
  }

  /**
   * Calculate the complex arcus tangent
   *
   */
  atan(): Complex {

    // atan(c) = i / 2 log((i + x) / (i - x))

    const a = this.re;
    const b = this.im;

    if (a === 0) {

      if (b === 1) {
        return new Complex(0, Infinity);
      }

      if (b === -1) {
        return new Complex(0, -Infinity);
      }
    }

    const d = a * a + (1.0 - b) * (1.0 - b);

    const t1 = new Complex(
      (1 - b * b - a * a) / d,
      -2 * a / d).log();

    return new Complex(-0.5 * t1.im, 0.5 * t1.re);
  }

  /**
   * Calculate the complex arcus cotangent
   *
   */
  acot(): Complex {

    // acot(c) = i / 2 log((c - i) / (c + i))

    const a = this.re;
    const b = this.im;

    if (b === 0) {
      return new Complex(Math.atan2(1, a), 0);
    }

    const d = a * a + b * b;
    return (d !== 0)
      ? new Complex(
        a / d,
        -b / d).atan()
      : new Complex(
        (a !== 0) ? a / 0 : 0,
        (b !== 0) ? -b / 0 : 0).atan();
  }

  /**
   * Calculate the complex arcus secant
   *
   */
  asec(): Complex {

    // asec(c) = -i * log(1 / c + sqrt(1 - i / c^2))

    const a = this.re;
    const b = this.im;

    if (a === 0 && b === 0) {
      return new Complex(0, Infinity);
    }

    const d = a * a + b * b;
    return (d !== 0)
      ? new Complex(
        a / d,
        -b / d).acos()
      : new Complex(
        (a !== 0) ? a / 0 : 0,
        (b !== 0) ? -b / 0 : 0).acos();
  }

  /**
   * Calculate the complex arcus cosecans
   *
   */
  acsc(): Complex {

    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))

    const a = this.re;
    const b = this.im;

    if (a === 0 && b === 0) {
      return new Complex(Math.PI / 2, Infinity);
    }

    const d = a * a + b * b;
    return (d !== 0)
      ? new Complex(
        a / d,
        -b / d).asin()
      : new Complex(
        (a !== 0) ? a / 0 : 0,
        (b !== 0) ? -b / 0 : 0).asin();
  }

  /**
   * Calculate the complex sinh
   *
   */
  sinh(): Complex {

    // sinh(c) = (e^c - e^-c) / 2

    const a = this.re;
    const b = this.im;

    return new Complex(
      sinh(a) * Math.cos(b),
      cosh(a) * Math.sin(b));
  }

  /**
   * Calculate the complex cosh
   *
   */
  cosh(): Complex {

    // cosh(c) = (e^c + e^-c) / 2

    const a = this.re;
    const b = this.im;

    return new Complex(
      cosh(a) * Math.cos(b),
      sinh(a) * Math.sin(b));
  }

  /**
   * Calculate the complex tanh
   *
   */
  tanh(): Complex {

    // tanh(c) = (e^c - e^-c) / (e^c + e^-c)

    const a = 2 * this.re;
    const b = 2 * this.im;
    const d = cosh(a) + Math.cos(b);

    return new Complex(
      sinh(a) / d,
      Math.sin(b) / d);
  }

  /**
   * Calculate the complex coth
   *
   */
  coth(): Complex {

    // coth(c) = (e^c + e^-c) / (e^c - e^-c)

    const a = 2 * this.re;
    const b = 2 * this.im;
    const d = cosh(a) - Math.cos(b);

    return new Complex(
      sinh(a) / d,
      -Math.sin(b) / d);
  }

  /**
   * Calculate the complex coth
   *
   */
  csch(): Complex {

    // csch(c) = 2 / (e^c - e^-c)

    const a = this.re;
    const b = this.im;
    const d = Math.cos(2 * b) - cosh(2 * a);

    return new Complex(
      -2 * sinh(a) * Math.cos(b) / d,
      2 * cosh(a) * Math.sin(b) / d);
  }

  /**
   * Calculate the complex sech
   *
   */
  sech(): Complex {

    // sech(c) = 2 / (e^c + e^-c)

    const a = this.re;
    const b = this.im;
    const d = Math.cos(2 * b) + cosh(2 * a);

    return new Complex(
      2 * cosh(a) * Math.cos(b) / d,
      -2 * sinh(a) * Math.sin(b) / d);
  }

  /**
   * Calculate the complex asinh
   *
   */
  asinh(): Complex {

    // asinh(c) = log(c + sqrt(c^2 + 1))

    let tmp = this.im;
    this.im = -this.re;
    this.re = tmp;
    const res = this.asin();

    this.re = -this.im;
    this.im = tmp;
    tmp = res.re;

    res.re = -res.im;
    res.im = tmp;
    return res;
  }

  /**
   * Calculate the complex acosh
   *
   */
  acosh(): Complex {

    // acosh(c) = log(c + sqrt(c^2 - 1))

    const res = this.acos();
    if (res.im <= 0) {
      const tmp = res.re;
      res.re = -res.im;
      res.im = tmp;
    } else {
      const tmp = res.im;
      res.im = -res.re;
      res.re = tmp;
    }
    return res;
  }

  /**
   * Calculate the complex atanh
   *
   */
  atanh(): Complex {

    // atanh(c) = log((1+c) / (1-c)) / 2

    const a = this.re;
    const b = this.im;

    const noIM = a > 1 && b === 0;
    const oneMinus = 1 - a;
    const onePlus = 1 + a;
    const d = oneMinus * oneMinus + b * b;

    const x = (d !== 0)
      ? new Complex(
        (onePlus * oneMinus - b * b) / d,
        (b * oneMinus + onePlus * b) / d)
      : new Complex(
        (a !== -1) ? (a / 0) : 0,
        (b !== 0) ? (b / 0) : 0);

    const temp = x.re;
    x.re = logHypot(x.re, x.im) / 2;
    x.im = Math.atan2(x.im, temp) / 2;
    if (noIM) {
      x.im = -x.im;
    }
    return x;
  }

  /**
   * Calculate the complex acoth
   *
   */
  acoth(): Complex {

    // acoth(c) = log((c+1) / (c-1)) / 2

    const a = this.re;
    const b = this.im;

    if (a === 0 && b === 0) {
      return new Complex(0, Math.PI / 2);
    }

    const d = a * a + b * b;
    return (d !== 0)
      ? new Complex(
        a / d,
        -b / d).atanh()
      : new Complex(
        (a !== 0) ? a / 0 : 0,
        (b !== 0) ? -b / 0 : 0).atanh();
  }

  /**
   * Calculate the complex acsch
   *
   */
  acsch(): Complex {

    // acsch(c) = log((1+sqrt(1+c^2))/c)

    const a = this.re;
    const b = this.im;

    if (b === 0) {

      return new Complex(
        (a !== 0)
          ? Math.log(a + Math.sqrt(a * a + 1))
          : Infinity, 0);
    }

    const d = a * a + b * b;
    return (d !== 0)
      ? new Complex(
        a / d,
        -b / d).asinh()
      : new Complex(
        (a !== 0) ? a / 0 : 0,
        (b !== 0) ? -b / 0 : 0).asinh();
  }

  /**
   * Calculate the complex asech
   *
   */
  asech(): Complex {

    // asech(c) = log((1+sqrt(1-c^2))/c)

    const a = this.re;
    const b = this.im;

    if (this.isZero()) {
      return Complex.INFINITY;
    }

    const d = a * a + b * b;
    return (d !== 0)
      ? new Complex(
        a / d,
        -b / d).acosh()
      : new Complex(
        (a !== 0) ? a / 0 : 0,
        (b !== 0) ? -b / 0 : 0).acosh();
  }

  /**
   * Calculate the complex inverse 1/z
   *
   */
  inverse(): Complex {

    // 1 / 0 = Infinity and 1 / Infinity = 0
    if (this.isZero()) {
      return Complex.INFINITY;
    }

    if (this.isInfinite()) {
      return Complex.ZERO;
    }

    const a = this.re;
    const b = this.im;

    const d = a * a + b * b;

    return new Complex(a / d, -b / d);
  }

  /**
   * Returns the complex conjugate
   *
   */
  conjugate(): Complex {

    return new Complex(this.re, -this.im);
  }

  /**
   * Gets the negated complex number
   *
   */
  neg(): Complex {

    return new Complex(-this.re, -this.im);
  }

  /**
   * Ceils the actual complex number
   *
   */
  ceil(places: number): Complex {

    places = Math.pow(10, places || 0);

    return new Complex(
      Math.ceil(this.re * places) / places,
      Math.ceil(this.im * places) / places);
  }

  /**
   * Floors the actual complex number
   *
   */
  floor(places: number): Complex {

    places = Math.pow(10, places || 0);

    return new Complex(
      Math.floor(this.re * places) / places,
      Math.floor(this.im * places) / places);
  }

  /**
   * Ceils the actual complex number
   *
   */
  round(places: number): Complex {

    places = Math.pow(10, places || 0);

    return new Complex(
      Math.round(this.re * places) / places,
      Math.round(this.im * places) / places);
  }

  /**
   * Compares two complex numbers
   *
   * **Note:** new Complex(Infinity).equals(Infinity) === false
   *
   * @param a
   * @param b
   */
  equals(a: number, b: number): boolean {

    const z = new Complex(a, b);

    return Math.abs(z.re - this.re) <= Complex.EPSILON &&
      Math.abs(z.im - this.im) <= Complex.EPSILON;
  }

  /**
   * Clones the actual object
   *
   */
  clone(): Complex {

    return new Complex(this.re, this.im);
  }

  /**
   * Gets a string of the actual complex number
   *
   */
  toString(): string {

    let a = this.re;
    let b = this.im;
    let ret = '';

    if (this.isNaN()) {
      return 'NaN';
    }

    if (this.isInfinite()) {
      return 'Infinity';
    }

    if (Math.abs(a) < Complex.EPSILON) {
      a = 0;
    }

    if (Math.abs(b) < Complex.EPSILON) {
      b = 0;
    }

    // If is real number
    if (b === 0) {
      return ret + a;
    }

    if (a !== 0) {
      ret += a;
      ret += ' ';
      if (b < 0) {
        b = -b;
        ret += '-';
      } else {
        ret += '+';
      }
      ret += ' ';
    } else if (b < 0) {
      b = -b;
      ret += '-';
    }

    if (1 !== b) { // b is the absolute imaginary part
      ret += b;
    }
    return ret + 'i';
  }

  /**
   * Returns the actual number as a vector
   *
   */
  toVector(): number[] {

    return [ this.re, this.im ];
  }

  /**
   * Returns the actual real value of the current object
   *
   */
  valueOf(): number | null {

    if (this.im === 0) {
      return this.re;
    }
    return null;
  }

  /**
   * Determines whether a complex number is not on the Riemann sphere.
   *
   */
  isNaN(): boolean {
    return isNaN(this.re) || isNaN(this.im);
  }

  /**
   * Determines whether or not a complex number is at the zero pole of the
   * Riemann sphere.
   *
   */
  isZero(): boolean {
    return this.im === 0 && this.re === 0;
  }

  /**
   * Determines whether a complex number is not at the infinity pole of the
   * Riemann sphere.
   *
   *
   */
  isFinite(): boolean {
    return isFinite(this.re) && isFinite(this.im);
  }

  /**
   * Determines whether or not a complex number is at the infinity pole of the
   * Riemann sphere.
   *
   */
  isInfinite(): boolean {
    return !(this.isNaN() || this.isFinite());
  }
}
