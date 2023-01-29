
export const cosh: (x: number) => number =
  Math.cosh || function(x: number) {
    return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
  }

export const sinh = Math.sinh || function(x) {
  return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
};

/**
 * Calculates cos(x) - 1 using Taylor series if x is small (-¼π ≤ x ≤ ¼π).
 *
 * @param {number} x
 * @returns {number} cos(x) - 1
 */
export const cosm1 = function(x: number) {

  const b = Math.PI / 4;
  if (-b > x || x > b) {
    return Math.cos(x) - 1.0;
  }

  /* Calculate horner form of polynomial of taylor series in Q
  var fac = 1, alt = 1, pol = {};
  for (var i = 0; i <= 16; i++) {
    fac*= i || 1;
    if (i % 2 == 0) {
      pol[i] = new Fraction(1, alt * fac);
      alt = -alt;
    }
  }
  console.log(new Polynomial(pol).toHorner()); // (((((((1/20922789888000x^2-1/87178291200)x^2+1/479001600)x^2-1/3628800)x^2+1/40320)x^2-1/720)x^2+1/24)x^2-1/2)x^2+1
  */

  const xx = x * x;
  return xx * (
    xx * (
      xx * (
        xx * (
          xx * (
            xx * (
              xx * (
                xx / 20922789888000
                - 1 / 87178291200)
              + 1 / 479001600)
            - 1 / 3628800)
          + 1 / 40320)
        - 1 / 720)
      + 1 / 24)
    - 1 / 2);
};

export const hypot = function(x: number, y: number) {

  let a = Math.abs(x);
  let b = Math.abs(y);

  if (a < 3000 && b < 3000) {
    return Math.sqrt(a * a + b * b);
  }

  if (a < b) {
    a = b;
    b = x / y;
  } else {
    b = y / x;
  }
  return a * Math.sqrt(1 + b * b);
};

export const parser_exit = function() {
  throw SyntaxError('Invalid Param');
};

/**
 * Calculates log(sqrt(a^2+b^2)) in a way to avoid overflows
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function logHypot(a: number, b: number) {

  const _a = Math.abs(a);
  const _b = Math.abs(b);

  if (a === 0) {
    return Math.log(_b);
  }

  if (b === 0) {
    return Math.log(_a);
  }

  if (_a < 3000 && _b < 3000) {
    return Math.log(a * a + b * b) * 0.5;
  }

  /* I got 4 ideas to compute this property without overflow:
   *
   * Testing 1000000 times with random samples for a,b ∈ [1, 1000000000] against a big decimal library to get an error estimate
   *
   * 1. Only eliminate the square root: (OVERALL ERROR: 3.9122483030951116e-11)

   Math.log(a * a + b * b) / 2

   *
   *
   * 2. Try to use the non-overflowing pythagoras: (OVERALL ERROR: 8.889760039210159e-10)

   var fn = function(a, b) {
   a = Math.abs(a);
   b = Math.abs(b);
   var t = Math.min(a, b);
   a = Math.max(a, b);
   t = t / a;

   return Math.log(a) + Math.log(1 + t * t) / 2;
   };

   * 3. Abuse the identity cos(atan(y/x) = x / sqrt(x^2+y^2): (OVERALL ERROR: 3.4780178737037204e-10)

   Math.log(a / Math.cos(Math.atan2(b, a)))

   * 4. Use 3. and apply log rules: (OVERALL ERROR: 1.2014087502620896e-9)

   Math.log(a) - Math.log(Math.cos(Math.atan2(b, a)))

   */

  a = a / 2;
  b = b / 2;

  return 0.5 * Math.log(a * a + b * b) + Math.LN2;
}
