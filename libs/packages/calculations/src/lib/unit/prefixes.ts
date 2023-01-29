 export const PREFIXES = {
    NONE: {
      '': { name: '', value: 1, scientific: true }
    },
    SHORT: {
      '': { name: '', value: 1, scientific: true },

      da: { name: 'da', value: 1e1, scientific: false },
      h: { name: 'h', value: 1e2, scientific: false },
      k: { name: 'k', value: 1e3, scientific: true },
      M: { name: 'M', value: 1e6, scientific: true },
      G: { name: 'G', value: 1e9, scientific: true },
      T: { name: 'T', value: 1e12, scientific: true },
      P: { name: 'P', value: 1e15, scientific: true },
      E: { name: 'E', value: 1e18, scientific: true },
      Z: { name: 'Z', value: 1e21, scientific: true },
      Y: { name: 'Y', value: 1e24, scientific: true },

      d: { name: 'd', value: 1e-1, scientific: false },
      c: { name: 'c', value: 1e-2, scientific: false },
      m: { name: 'm', value: 1e-3, scientific: true },
      u: { name: 'u', value: 1e-6, scientific: true },
      n: { name: 'n', value: 1e-9, scientific: true },
      p: { name: 'p', value: 1e-12, scientific: true },
      f: { name: 'f', value: 1e-15, scientific: true },
      a: { name: 'a', value: 1e-18, scientific: true },
      z: { name: 'z', value: 1e-21, scientific: true },
      y: { name: 'y', value: 1e-24, scientific: true }
    },
    LONG: {
      '': { name: '', value: 1, scientific: true },

      deca: { name: 'deca', value: 1e1, scientific: false },
      hecto: { name: 'hecto', value: 1e2, scientific: false },
      kilo: { name: 'kilo', value: 1e3, scientific: true },
      mega: { name: 'mega', value: 1e6, scientific: true },
      giga: { name: 'giga', value: 1e9, scientific: true },
      tera: { name: 'tera', value: 1e12, scientific: true },
      peta: { name: 'peta', value: 1e15, scientific: true },
      exa: { name: 'exa', value: 1e18, scientific: true },
      zetta: { name: 'zetta', value: 1e21, scientific: true },
      yotta: { name: 'yotta', value: 1e24, scientific: true },

      deci: { name: 'deci', value: 1e-1, scientific: false },
      centi: { name: 'centi', value: 1e-2, scientific: false },
      milli: { name: 'milli', value: 1e-3, scientific: true },
      micro: { name: 'micro', value: 1e-6, scientific: true },
      nano: { name: 'nano', value: 1e-9, scientific: true },
      pico: { name: 'pico', value: 1e-12, scientific: true },
      femto: { name: 'femto', value: 1e-15, scientific: true },
      atto: { name: 'atto', value: 1e-18, scientific: true },
      zepto: { name: 'zepto', value: 1e-21, scientific: true },
      yocto: { name: 'yocto', value: 1e-24, scientific: true }
    },
    SQUARED: {
      '': { name: '', value: 1, scientific: true },

      da: { name: 'da', value: 1e2, scientific: false },
      h: { name: 'h', value: 1e4, scientific: false },
      k: { name: 'k', value: 1e6, scientific: true },
      M: { name: 'M', value: 1e12, scientific: true },
      G: { name: 'G', value: 1e18, scientific: true },
      T: { name: 'T', value: 1e24, scientific: true },
      P: { name: 'P', value: 1e30, scientific: true },
      E: { name: 'E', value: 1e36, scientific: true },
      Z: { name: 'Z', value: 1e42, scientific: true },
      Y: { name: 'Y', value: 1e48, scientific: true },

      d: { name: 'd', value: 1e-2, scientific: false },
      c: { name: 'c', value: 1e-4, scientific: false },
      m: { name: 'm', value: 1e-6, scientific: true },
      u: { name: 'u', value: 1e-12, scientific: true },
      n: { name: 'n', value: 1e-18, scientific: true },
      p: { name: 'p', value: 1e-24, scientific: true },
      f: { name: 'f', value: 1e-30, scientific: true },
      a: { name: 'a', value: 1e-36, scientific: true },
      z: { name: 'z', value: 1e-42, scientific: true },
      y: { name: 'y', value: 1e-48, scientific: true }
    },
    CUBIC: {
      '': { name: '', value: 1, scientific: true },

      da: { name: 'da', value: 1e3, scientific: false },
      h: { name: 'h', value: 1e6, scientific: false },
      k: { name: 'k', value: 1e9, scientific: true },
      M: { name: 'M', value: 1e18, scientific: true },
      G: { name: 'G', value: 1e27, scientific: true },
      T: { name: 'T', value: 1e36, scientific: true },
      P: { name: 'P', value: 1e45, scientific: true },
      E: { name: 'E', value: 1e54, scientific: true },
      Z: { name: 'Z', value: 1e63, scientific: true },
      Y: { name: 'Y', value: 1e72, scientific: true },

      d: { name: 'd', value: 1e-3, scientific: false },
      c: { name: 'c', value: 1e-6, scientific: false },
      m: { name: 'm', value: 1e-9, scientific: true },
      u: { name: 'u', value: 1e-18, scientific: true },
      n: { name: 'n', value: 1e-27, scientific: true },
      p: { name: 'p', value: 1e-36, scientific: true },
      f: { name: 'f', value: 1e-45, scientific: true },
      a: { name: 'a', value: 1e-54, scientific: true },
      z: { name: 'z', value: 1e-63, scientific: true },
      y: { name: 'y', value: 1e-72, scientific: true }
    },
    BINARY_SHORT_SI: {
      '': { name: '', value: 1, scientific: true },
      k: { name: 'k', value: 1e3, scientific: true },
      M: { name: 'M', value: 1e6, scientific: true },
      G: { name: 'G', value: 1e9, scientific: true },
      T: { name: 'T', value: 1e12, scientific: true },
      P: { name: 'P', value: 1e15, scientific: true },
      E: { name: 'E', value: 1e18, scientific: true },
      Z: { name: 'Z', value: 1e21, scientific: true },
      Y: { name: 'Y', value: 1e24, scientific: true }
    },
    BINARY_SHORT_IEC: {
      '': { name: '', value: 1, scientific: true },
      Ki: { name: 'Ki', value: 1024, scientific: true },
      Mi: { name: 'Mi', value: Math.pow(1024, 2), scientific: true },
      Gi: { name: 'Gi', value: Math.pow(1024, 3), scientific: true },
      Ti: { name: 'Ti', value: Math.pow(1024, 4), scientific: true },
      Pi: { name: 'Pi', value: Math.pow(1024, 5), scientific: true },
      Ei: { name: 'Ei', value: Math.pow(1024, 6), scientific: true },
      Zi: { name: 'Zi', value: Math.pow(1024, 7), scientific: true },
      Yi: { name: 'Yi', value: Math.pow(1024, 8), scientific: true }
    },
    BINARY_LONG_SI: {
      '': { name: '', value: 1, scientific: true },
      kilo: { name: 'kilo', value: 1e3, scientific: true },
      mega: { name: 'mega', value: 1e6, scientific: true },
      giga: { name: 'giga', value: 1e9, scientific: true },
      tera: { name: 'tera', value: 1e12, scientific: true },
      peta: { name: 'peta', value: 1e15, scientific: true },
      exa: { name: 'exa', value: 1e18, scientific: true },
      zetta: { name: 'zetta', value: 1e21, scientific: true },
      yotta: { name: 'yotta', value: 1e24, scientific: true }
    },
    BINARY_LONG_IEC: {
      '': { name: '', value: 1, scientific: true },
      kibi: { name: 'kibi', value: 1024, scientific: true },
      mebi: { name: 'mebi', value: Math.pow(1024, 2), scientific: true },
      gibi: { name: 'gibi', value: Math.pow(1024, 3), scientific: true },
      tebi: { name: 'tebi', value: Math.pow(1024, 4), scientific: true },
      pebi: { name: 'pebi', value: Math.pow(1024, 5), scientific: true },
      exi: { name: 'exi', value: Math.pow(1024, 6), scientific: true },
      zebi: { name: 'zebi', value: Math.pow(1024, 7), scientific: true },
      yobi: { name: 'yobi', value: Math.pow(1024, 8), scientific: true }
    },
    BTU: {
      '': { name: '', value: 1, scientific: true },
      MM: { name: 'MM', value: 1e6, scientific: true }
    },

   SHORTLONG: {},
   BINARY_SHORT: {},
   BINARY_LONG: {}
  }

  PREFIXES.SHORTLONG = Object.assign({}, PREFIXES.SHORT, PREFIXES.LONG)
  PREFIXES.BINARY_SHORT = Object.assign({}, PREFIXES.BINARY_SHORT_SI, PREFIXES.BINARY_SHORT_IEC)
  PREFIXES.BINARY_LONG = Object.assign({}, PREFIXES.BINARY_LONG_SI, PREFIXES.BINARY_LONG_IEC)
