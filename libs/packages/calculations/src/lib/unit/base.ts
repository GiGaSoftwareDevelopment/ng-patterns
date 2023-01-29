import { PREFIXES } from './prefixes';
import { Complex } from '../complex/complex';


export const BASE_DIMENSIONS = ['MASS', 'LENGTH', 'TIME', 'CURRENT', 'TEMPERATURE', 'LUMINOUS_INTENSITY', 'AMOUNT_OF_SUBSTANCE', 'ANGLE', 'BIT']

export interface IBaseUnit {
  dimensions: number[],
  key: string;
}

export interface IBaseUnits {
  NONE: IBaseUnit;
  MASS: IBaseUnit;
  LENGTH: IBaseUnit;
  TIME: IBaseUnit;
  CURRENT: IBaseUnit;
  TEMPERATURE: IBaseUnit;
  LUMINOUS_INTENSITY: IBaseUnit;
  AMOUNT_OF_SUBSTANCE: IBaseUnit;
  FORCE: IBaseUnit;
  SURFACE: IBaseUnit;
  VOLUME: IBaseUnit;
  ENERGY: IBaseUnit;
  POWER: IBaseUnit;
  PRESSURE: IBaseUnit;
  ELECTRIC_CHARGE: IBaseUnit;
  ELECTRIC_CAPACITANCE: IBaseUnit;
  ELECTRIC_POTENTIAL: IBaseUnit;
  ELECTRIC_RESISTANCE: IBaseUnit;
  ELECTRIC_INDUCTANCE: IBaseUnit;
  ELECTRIC_CONDUCTANCE: IBaseUnit;
  MAGNETIC_FLUX: IBaseUnit;
  MAGNETIC_FLUX_DENSITY: IBaseUnit;
  FREQUENCY: IBaseUnit;
  ANGLE: IBaseUnit;
  BIT: IBaseUnit;
}

export const BASE_UNITS: IBaseUnits = {
  NONE: {
    dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    key: 'NONE'
  },
  MASS: {
    dimensions: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    key: 'MASS'
  },
  LENGTH: {
    dimensions: [0, 1, 0, 0, 0, 0, 0, 0, 0],
    key: 'LENGTH'
  },
  TIME: {
    dimensions: [0, 0, 1, 0, 0, 0, 0, 0, 0],
    key: 'TIME'
  },
  CURRENT: {
    dimensions: [0, 0, 0, 1, 0, 0, 0, 0, 0],
    key: 'CURRENT'
  },
  TEMPERATURE: {
    dimensions: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    key: 'TEMPERATURE'
  },
  LUMINOUS_INTENSITY: {
    dimensions: [0, 0, 0, 0, 0, 1, 0, 0, 0],
    key: 'LUMINOUS_INTENSITY'
  },
  AMOUNT_OF_SUBSTANCE: {
    dimensions: [0, 0, 0, 0, 0, 0, 1, 0, 0],
    key: 'AMOUNT_OF_SUBSTANCE'
  },

  FORCE: {
    dimensions: [1, 1, -2, 0, 0, 0, 0, 0, 0],
    key: 'FORCE'
  },
  SURFACE: {
    dimensions: [0, 2, 0, 0, 0, 0, 0, 0, 0],
    key: 'SURFACE'
  },
  VOLUME: {
    dimensions: [0, 3, 0, 0, 0, 0, 0, 0, 0],
    key: 'VOLUME'
  },
  ENERGY: {
    dimensions: [1, 2, -2, 0, 0, 0, 0, 0, 0],
    key: 'ENERGY'
  },
  POWER: {
    dimensions: [1, 2, -3, 0, 0, 0, 0, 0, 0],
    key: 'POWER'
  },
  PRESSURE: {
    dimensions: [1, -1, -2, 0, 0, 0, 0, 0, 0],
    key: 'PRESSURE'
  },

  ELECTRIC_CHARGE: {
    dimensions: [0, 0, 1, 1, 0, 0, 0, 0, 0],
    key: 'ELECTRIC_CHARGE'
  },
  ELECTRIC_CAPACITANCE: {
    dimensions: [-1, -2, 4, 2, 0, 0, 0, 0, 0],
    key: 'ELECTRIC_CAPACITANCE'
  },
  ELECTRIC_POTENTIAL: {
    dimensions: [1, 2, -3, -1, 0, 0, 0, 0, 0],
    key: 'ELECTRIC_POTENTIAL'
  },
  ELECTRIC_RESISTANCE: {
    dimensions: [1, 2, -3, -2, 0, 0, 0, 0, 0],
    key: 'ELECTRIC_RESISTANCE'
  },
  ELECTRIC_INDUCTANCE: {
    dimensions: [1, 2, -2, -2, 0, 0, 0, 0, 0],
    key: 'ELECTRIC_INDUCTANCE'
  },
  ELECTRIC_CONDUCTANCE: {
    dimensions: [-1, -2, 3, 2, 0, 0, 0, 0, 0],
    key: 'ELECTRIC_CONDUCTANCE'
  },
  MAGNETIC_FLUX: {
    dimensions: [1, 2, -2, -1, 0, 0, 0, 0, 0],
    key: 'MAGNETIC_FLUX'
  },
  MAGNETIC_FLUX_DENSITY: {
    dimensions: [1, 0, -2, -1, 0, 0, 0, 0, 0],
    key: 'MAGNETIC_FLUX_DENSITY'
  },

  FREQUENCY: {
    dimensions: [0, 0, -1, 0, 0, 0, 0, 0, 0],
    key: 'FREQUENCY'
  },
  ANGLE: {
    dimensions: [0, 0, 0, 0, 0, 0, 0, 1, 0],
    key: 'ANGLE'
  },
  BIT: {
    dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 1],
    key: 'BIT'
  }
}

export const BASE_UNIT_NONE = {}

export const UNIT_NONE = { name: '', base: BASE_UNIT_NONE, value: 1, offset: 0, dimensions: BASE_DIMENSIONS.map(x => 0) }

export const UNITS = {
  // length
  meter: {
    name: 'meter',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  inch: {
    name: 'inch',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 0.0254,
    offset: 0
  },
  foot: {
    name: 'foot',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 0.3048,
    offset: 0
  },
  yard: {
    name: 'yard',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 0.9144,
    offset: 0
  },
  mile: {
    name: 'mile',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 1609.344,
    offset: 0
  },
  link: {
    name: 'link',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 0.201168,
    offset: 0
  },
  rod: {
    name: 'rod',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 5.0292,
    offset: 0
  },
  chain: {
    name: 'chain',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 20.1168,
    offset: 0
  },
  angstrom: {
    name: 'angstrom',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 1e-10,
    offset: 0
  },

  m: {
    name: 'm',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  in: {
    name: 'in',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 0.0254,
    offset: 0
  },
  ft: {
    name: 'ft',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 0.3048,
    offset: 0
  },
  yd: {
    name: 'yd',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 0.9144,
    offset: 0
  },
  mi: {
    name: 'mi',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 1609.344,
    offset: 0
  },
  li: {
    name: 'li',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 0.201168,
    offset: 0
  },
  rd: {
    name: 'rd',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 5.029210,
    offset: 0
  },
  ch: {
    name: 'ch',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 20.1168,
    offset: 0
  },
  mil: {
    name: 'mil',
    base: BASE_UNITS.LENGTH,
    prefixes: PREFIXES.NONE,
    value: 0.0000254,
    offset: 0
  }, // 1/1000 inch

  // Surface
  m2: {
    name: 'm2',
    base: BASE_UNITS.SURFACE,
    prefixes: PREFIXES.SQUARED,
    value: 1,
    offset: 0
  },
  sqin: {
    name: 'sqin',
    base: BASE_UNITS.SURFACE,
    prefixes: PREFIXES.NONE,
    value: 0.00064516,
    offset: 0
  }, // 645.16 mm2
  sqft: {
    name: 'sqft',
    base: BASE_UNITS.SURFACE,
    prefixes: PREFIXES.NONE,
    value: 0.09290304,
    offset: 0
  }, // 0.09290304 m2
  sqyd: {
    name: 'sqyd',
    base: BASE_UNITS.SURFACE,
    prefixes: PREFIXES.NONE,
    value: 0.83612736,
    offset: 0
  }, // 0.83612736 m2
  sqmi: {
    name: 'sqmi',
    base: BASE_UNITS.SURFACE,
    prefixes: PREFIXES.NONE,
    value: 2589988.110336,
    offset: 0
  }, // 2.589988110336 km2
  sqrd: {
    name: 'sqrd',
    base: BASE_UNITS.SURFACE,
    prefixes: PREFIXES.NONE,
    value: 25.29295,
    offset: 0
  }, // 25.29295 m2
  sqch: {
    name: 'sqch',
    base: BASE_UNITS.SURFACE,
    prefixes: PREFIXES.NONE,
    value: 404.6873,
    offset: 0
  }, // 404.6873 m2
  sqmil: {
    name: 'sqmil',
    base: BASE_UNITS.SURFACE,
    prefixes: PREFIXES.NONE,
    value: 6.4516e-10,
    offset: 0
  }, // 6.4516 * 10^-10 m2
  acre: {
    name: 'acre',
    base: BASE_UNITS.SURFACE,
    prefixes: PREFIXES.NONE,
    value: 4046.86,
    offset: 0
  }, // 4046.86 m2
  hectare: {
    name: 'hectare',
    base: BASE_UNITS.SURFACE,
    prefixes: PREFIXES.NONE,
    value: 10000,
    offset: 0
  }, // 10000 m2

  // Volume
  m3: {
    name: 'm3',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.CUBIC,
    value: 1,
    offset: 0
  },
  L: {
    name: 'L',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.SHORT,
    value: 0.001,
    offset: 0
  }, // litre
  l: {
    name: 'l',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.SHORT,
    value: 0.001,
    offset: 0
  }, // litre
  litre: {
    name: 'litre',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.LONG,
    value: 0.001,
    offset: 0
  },
  cuin: {
    name: 'cuin',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 1.6387064e-5,
    offset: 0
  }, // 1.6387064e-5 m3
  cuft: {
    name: 'cuft',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.028316846592,
    offset: 0
  }, // 28.316 846 592 L
  cuyd: {
    name: 'cuyd',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.764554857984,
    offset: 0
  }, // 764.554 857 984 L
  teaspoon: {
    name: 'teaspoon',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.000005,
    offset: 0
  }, // 5 mL
  tablespoon: {
    name: 'tablespoon',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.000015,
    offset: 0
  }, // 15 mL
  // {name: 'cup', base: BASE_UNITS.VOLUME, prefixes: PREFIXES.NONE, value: 0.000240, offset: 0}, // 240 mL  // not possible, we have already another cup
  drop: {
    name: 'drop',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 5e-8,
    offset: 0
  }, // 0.05 mL = 5e-8 m3
  gtt: {
    name: 'gtt',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 5e-8,
    offset: 0
  }, // 0.05 mL = 5e-8 m3

  // Liquid volume
  minim: {
    name: 'minim',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.00000006161152,
    offset: 0
  }, // 0.06161152 mL
  fluiddram: {
    name: 'fluiddram',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.0000036966911,
    offset: 0
  }, // 3.696691 mL
  fluidounce: {
    name: 'fluidounce',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.00002957353,
    offset: 0
  }, // 29.57353 mL
  gill: {
    name: 'gill',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.0001182941,
    offset: 0
  }, // 118.2941 mL
  cc: {
    name: 'cc',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 1e-6,
    offset: 0
  }, // 1e-6 L
  cup: {
    name: 'cup',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.0002365882,
    offset: 0
  }, // 236.5882 mL
  pint: {
    name: 'pint',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.0004731765,
    offset: 0
  }, // 473.1765 mL
  quart: {
    name: 'quart',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.0009463529,
    offset: 0
  }, // 946.3529 mL
  gallon: {
    name: 'gallon',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.003785412,
    offset: 0
  }, // 3.785412 L
  beerbarrel: {
    name: 'beerbarrel',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.1173478,
    offset: 0
  }, // 117.3478 L
  oilbarrel: {
    name: 'oilbarrel',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.1589873,
    offset: 0
  }, // 158.9873 L
  hogshead: {
    name: 'hogshead',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.2384810,
    offset: 0
  }, // 238.4810 L

  // {name: 'min', base: BASE_UNITS.VOLUME, prefixes: PREFIXES.NONE, value: 0.00000006161152, offset: 0}, // 0.06161152 mL // min is already in use as minute
  fldr: {
    name: 'fldr',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.0000036966911,
    offset: 0
  }, // 3.696691 mL
  floz: {
    name: 'floz',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.00002957353,
    offset: 0
  }, // 29.57353 mL
  gi: {
    name: 'gi',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.0001182941,
    offset: 0
  }, // 118.2941 mL
  cp: {
    name: 'cp',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.0002365882,
    offset: 0
  }, // 236.5882 mL
  pt: {
    name: 'pt',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.0004731765,
    offset: 0
  }, // 473.1765 mL
  qt: {
    name: 'qt',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.0009463529,
    offset: 0
  }, // 946.3529 mL
  gal: {
    name: 'gal',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.003785412,
    offset: 0
  }, // 3.785412 L
  bbl: {
    name: 'bbl',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.1173478,
    offset: 0
  }, // 117.3478 L
  obl: {
    name: 'obl',
    base: BASE_UNITS.VOLUME,
    prefixes: PREFIXES.NONE,
    value: 0.1589873,
    offset: 0
  }, // 158.9873 L
  // {name: 'hogshead', base: BASE_UNITS.VOLUME, prefixes: PREFIXES.NONE, value: 0.2384810, offset: 0}, // 238.4810 L // TODO: hh?

  // Mass
  g: {
    name: 'g',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.SHORT,
    value: 0.001,
    offset: 0
  },
  gram: {
    name: 'gram',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.LONG,
    value: 0.001,
    offset: 0
  },

  ton: {
    name: 'ton',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.SHORT,
    value: 907.18474,
    offset: 0
  },
  t: {
    name: 't',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.SHORT,
    value: 1000,
    offset: 0
  },
  tonne: {
    name: 'tonne',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.LONG,
    value: 1000,
    offset: 0
  },

  grain: {
    name: 'grain',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 64.79891e-6,
    offset: 0
  },
  dram: {
    name: 'dram',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 1.7718451953125e-3,
    offset: 0
  },
  ounce: {
    name: 'ounce',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 28.349523125e-3,
    offset: 0
  },
  poundmass: {
    name: 'poundmass',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 453.59237e-3,
    offset: 0
  },
  hundredweight: {
    name: 'hundredweight',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 45.359237,
    offset: 0
  },
  stick: {
    name: 'stick',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 115e-3,
    offset: 0
  },
  stone: {
    name: 'stone',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 6.35029318,
    offset: 0
  },

  gr: {
    name: 'gr',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 64.79891e-6,
    offset: 0
  },
  dr: {
    name: 'dr',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 1.7718451953125e-3,
    offset: 0
  },
  oz: {
    name: 'oz',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 28.349523125e-3,
    offset: 0
  },
  lbm: {
    name: 'lbm',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 453.59237e-3,
    offset: 0
  },
  cwt: {
    name: 'cwt',
    base: BASE_UNITS.MASS,
    prefixes: PREFIXES.NONE,
    value: 45.359237,
    offset: 0
  },

  // Time
  s: {
    name: 's',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  min: {
    name: 'min',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.NONE,
    value: 60,
    offset: 0
  },
  h: {
    name: 'h',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.NONE,
    value: 3600,
    offset: 0
  },
  second: {
    name: 'second',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  sec: {
    name: 'sec',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  minute: {
    name: 'minute',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.NONE,
    value: 60,
    offset: 0
  },
  hour: {
    name: 'hour',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.NONE,
    value: 3600,
    offset: 0
  },
  day: {
    name: 'day',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.NONE,
    value: 86400,
    offset: 0
  },
  week: {
    name: 'week',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.NONE,
    value: 7 * 86400,
    offset: 0
  },
  month: {
    name: 'month',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.NONE,
    value: 2629800, // 1/12th of Julian year
    offset: 0
  },
  year: {
    name: 'year',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.NONE,
    value: 31557600, // Julian year
    offset: 0
  },
  decade: {
    name: 'decade',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.NONE,
    value: 315576000, // Julian decade
    offset: 0
  },
  century: {
    name: 'century',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.NONE,
    value: 3155760000, // Julian century
    offset: 0
  },
  millennium: {
    name: 'millennium',
    base: BASE_UNITS.TIME,
    prefixes: PREFIXES.NONE,
    value: 31557600000, // Julian millennium
    offset: 0
  },

  // Frequency
  hertz: {
    name: 'Hertz',
    base: BASE_UNITS.FREQUENCY,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0,
    reciprocal: true
  },
  Hz: {
    name: 'Hz',
    base: BASE_UNITS.FREQUENCY,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0,
    reciprocal: true
  },

  // Angle
  rad: {
    name: 'rad',
    base: BASE_UNITS.ANGLE,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  radian: {
    name: 'radian',
    base: BASE_UNITS.ANGLE,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  // deg = rad / (2*pi) * 360 = rad / 0.017453292519943295769236907684888
  deg: {
    name: 'deg',
    base: BASE_UNITS.ANGLE,
    prefixes: PREFIXES.SHORT,
    value: null, // will be filled in by calculateAngleValues()
    offset: 0
  },
  degree: {
    name: 'degree',
    base: BASE_UNITS.ANGLE,
    prefixes: PREFIXES.LONG,
    value: null, // will be filled in by calculateAngleValues()
    offset: 0
  },
  // grad = rad / (2*pi) * 400  = rad / 0.015707963267948966192313216916399
  grad: {
    name: 'grad',
    base: BASE_UNITS.ANGLE,
    prefixes: PREFIXES.SHORT,
    value: null, // will be filled in by calculateAngleValues()
    offset: 0
  },
  gradian: {
    name: 'gradian',
    base: BASE_UNITS.ANGLE,
    prefixes: PREFIXES.LONG,
    value: null, // will be filled in by calculateAngleValues()
    offset: 0
  },
  // cycle = rad / (2*pi) = rad / 6.2831853071795864769252867665793
  cycle: {
    name: 'cycle',
    base: BASE_UNITS.ANGLE,
    prefixes: PREFIXES.NONE,
    value: null, // will be filled in by calculateAngleValues()
    offset: 0
  },
  // arcsec = rad / (3600 * (360 / 2 * pi)) = rad / 0.0000048481368110953599358991410235795
  arcsec: {
    name: 'arcsec',
    base: BASE_UNITS.ANGLE,
    prefixes: PREFIXES.NONE,
    value: null, // will be filled in by calculateAngleValues()
    offset: 0
  },
  // arcmin = rad / (60 * (360 / 2 * pi)) = rad / 0.00029088820866572159615394846141477
  arcmin: {
    name: 'arcmin',
    base: BASE_UNITS.ANGLE,
    prefixes: PREFIXES.NONE,
    value: null, // will be filled in by calculateAngleValues()
    offset: 0
  },

  // Electric current
  A: {
    name: 'A',
    base: BASE_UNITS.CURRENT,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  ampere: {
    name: 'ampere',
    base: BASE_UNITS.CURRENT,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },

  // Temperature
  // K(C) = °C + 273.15
  // K(F) = (°F + 459.67) / 1.8
  // K(R) = °R / 1.8
  K: {
    name: 'K',
    base: BASE_UNITS.TEMPERATURE,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  degC: {
    name: 'degC',
    base: BASE_UNITS.TEMPERATURE,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 273.15
  },
  degF: {
    name: 'degF',
    base: BASE_UNITS.TEMPERATURE,
    prefixes: PREFIXES.SHORT,
    value: 1 / 1.8,
    offset: 459.67
  },
  degR: {
    name: 'degR',
    base: BASE_UNITS.TEMPERATURE,
    prefixes: PREFIXES.SHORT,
    value: 1 / 1.8,
    offset: 0
  },
  kelvin: {
    name: 'kelvin',
    base: BASE_UNITS.TEMPERATURE,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  celsius: {
    name: 'celsius',
    base: BASE_UNITS.TEMPERATURE,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 273.15
  },
  fahrenheit: {
    name: 'fahrenheit',
    base: BASE_UNITS.TEMPERATURE,
    prefixes: PREFIXES.LONG,
    value: 1 / 1.8,
    offset: 459.67
  },
  rankine: {
    name: 'rankine',
    base: BASE_UNITS.TEMPERATURE,
    prefixes: PREFIXES.LONG,
    value: 1 / 1.8,
    offset: 0
  },

  // amount of substance
  mol: {
    name: 'mol',
    base: BASE_UNITS.AMOUNT_OF_SUBSTANCE,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  mole: {
    name: 'mole',
    base: BASE_UNITS.AMOUNT_OF_SUBSTANCE,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },

  // luminous intensity
  cd: {
    name: 'cd',
    base: BASE_UNITS.LUMINOUS_INTENSITY,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  candela: {
    name: 'candela',
    base: BASE_UNITS.LUMINOUS_INTENSITY,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  // TODO: units STERADIAN
  // {name: 'sr', base: BASE_UNITS.STERADIAN, prefixes: PREFIXES.NONE, value: 1, offset: 0},
  // {name: 'steradian', base: BASE_UNITS.STERADIAN, prefixes: PREFIXES.NONE, value: 1, offset: 0},

  // Force
  N: {
    name: 'N',
    base: BASE_UNITS.FORCE,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  newton: {
    name: 'newton',
    base: BASE_UNITS.FORCE,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  dyn: {
    name: 'dyn',
    base: BASE_UNITS.FORCE,
    prefixes: PREFIXES.SHORT,
    value: 0.00001,
    offset: 0
  },
  dyne: {
    name: 'dyne',
    base: BASE_UNITS.FORCE,
    prefixes: PREFIXES.LONG,
    value: 0.00001,
    offset: 0
  },
  lbf: {
    name: 'lbf',
    base: BASE_UNITS.FORCE,
    prefixes: PREFIXES.NONE,
    value: 4.4482216152605,
    offset: 0
  },
  poundforce: {
    name: 'poundforce',
    base: BASE_UNITS.FORCE,
    prefixes: PREFIXES.NONE,
    value: 4.4482216152605,
    offset: 0
  },
  kip: {
    name: 'kip',
    base: BASE_UNITS.FORCE,
    prefixes: PREFIXES.LONG,
    value: 4448.2216,
    offset: 0
  },
  kilogramforce: {
    name: 'kilogramforce',
    base: BASE_UNITS.FORCE,
    prefixes: PREFIXES.NONE,
    value: 9.80665,
    offset: 0
  },

  // Energy
  J: {
    name: 'J',
    base: BASE_UNITS.ENERGY,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  joule: {
    name: 'joule',
    base: BASE_UNITS.ENERGY,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  erg: {
    name: 'erg',
    base: BASE_UNITS.ENERGY,
    prefixes: PREFIXES.NONE,
    value: 1e-7,
    offset: 0
  },
  Wh: {
    name: 'Wh',
    base: BASE_UNITS.ENERGY,
    prefixes: PREFIXES.SHORT,
    value: 3600,
    offset: 0
  },
  BTU: {
    name: 'BTU',
    base: BASE_UNITS.ENERGY,
    prefixes: PREFIXES.BTU,
    value: 1055.05585262,
    offset: 0
  },
  eV: {
    name: 'eV',
    base: BASE_UNITS.ENERGY,
    prefixes: PREFIXES.SHORT,
    value: 1.602176565e-19,
    offset: 0
  },
  electronvolt: {
    name: 'electronvolt',
    base: BASE_UNITS.ENERGY,
    prefixes: PREFIXES.LONG,
    value: 1.602176565e-19,
    offset: 0
  },

  // Power
  W: {
    name: 'W',
    base: BASE_UNITS.POWER,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  watt: {
    name: 'watt',
    base: BASE_UNITS.POWER,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  hp: {
    name: 'hp',
    base: BASE_UNITS.POWER,
    prefixes: PREFIXES.NONE,
    value: 745.6998715386,
    offset: 0
  },

  // Electrical power units
  VAR: {
    name: 'VAR',
    base: BASE_UNITS.POWER,
    prefixes: PREFIXES.SHORT,
    value: Complex.I,
    offset: 0
  },

  VA: {
    name: 'VA',
    base: BASE_UNITS.POWER,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },

  // Pressure
  Pa: {
    name: 'Pa',
    base: BASE_UNITS.PRESSURE,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  psi: {
    name: 'psi',
    base: BASE_UNITS.PRESSURE,
    prefixes: PREFIXES.NONE,
    value: 6894.75729276459,
    offset: 0
  },
  atm: {
    name: 'atm',
    base: BASE_UNITS.PRESSURE,
    prefixes: PREFIXES.NONE,
    value: 101325,
    offset: 0
  },
  bar: {
    name: 'bar',
    base: BASE_UNITS.PRESSURE,
    prefixes: PREFIXES.SHORTLONG,
    value: 100000,
    offset: 0
  },
  torr: {
    name: 'torr',
    base: BASE_UNITS.PRESSURE,
    prefixes: PREFIXES.NONE,
    value: 133.322,
    offset: 0
  },
  mmHg: {
    name: 'mmHg',
    base: BASE_UNITS.PRESSURE,
    prefixes: PREFIXES.NONE,
    value: 133.322,
    offset: 0
  },
  mmH2O: {
    name: 'mmH2O',
    base: BASE_UNITS.PRESSURE,
    prefixes: PREFIXES.NONE,
    value: 9.80665,
    offset: 0
  },
  cmH2O: {
    name: 'cmH2O',
    base: BASE_UNITS.PRESSURE,
    prefixes: PREFIXES.NONE,
    value: 98.0665,
    offset: 0
  },

  // Electric charge
  coulomb: {
    name: 'coulomb',
    base: BASE_UNITS.ELECTRIC_CHARGE,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  C: {
    name: 'C',
    base: BASE_UNITS.ELECTRIC_CHARGE,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  // Electric capacitance
  farad: {
    name: 'farad',
    base: BASE_UNITS.ELECTRIC_CAPACITANCE,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  F: {
    name: 'F',
    base: BASE_UNITS.ELECTRIC_CAPACITANCE,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  // Electric potential
  volt: {
    name: 'volt',
    base: BASE_UNITS.ELECTRIC_POTENTIAL,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  V: {
    name: 'V',
    base: BASE_UNITS.ELECTRIC_POTENTIAL,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  // Electric resistance
  ohm: {
    name: 'ohm',
    base: BASE_UNITS.ELECTRIC_RESISTANCE,
    prefixes: PREFIXES.SHORTLONG, // Both Mohm and megaohm are acceptable
    value: 1,
    offset: 0
  },
  /*
   * Unicode breaks in browsers if charset is not specified
  Ω: {
    name: 'Ω',
    base: BASE_UNITS.ELECTRIC_RESISTANCE,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  */
  // Electric inductance
  henry: {
    name: 'henry',
    base: BASE_UNITS.ELECTRIC_INDUCTANCE,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  H: {
    name: 'H',
    base: BASE_UNITS.ELECTRIC_INDUCTANCE,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  // Electric conductance
  siemens: {
    name: 'siemens',
    base: BASE_UNITS.ELECTRIC_CONDUCTANCE,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  S: {
    name: 'S',
    base: BASE_UNITS.ELECTRIC_CONDUCTANCE,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  // Magnetic flux
  weber: {
    name: 'weber',
    base: BASE_UNITS.MAGNETIC_FLUX,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  Wb: {
    name: 'Wb',
    base: BASE_UNITS.MAGNETIC_FLUX,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },
  // Magnetic flux density
  tesla: {
    name: 'tesla',
    base: BASE_UNITS.MAGNETIC_FLUX_DENSITY,
    prefixes: PREFIXES.LONG,
    value: 1,
    offset: 0
  },
  T: {
    name: 'T',
    base: BASE_UNITS.MAGNETIC_FLUX_DENSITY,
    prefixes: PREFIXES.SHORT,
    value: 1,
    offset: 0
  },

  // Binary
  b: {
    name: 'b',
    base: BASE_UNITS.BIT,
    prefixes: PREFIXES.BINARY_SHORT,
    value: 1,
    offset: 0
  },
  bits: {
    name: 'bits',
    base: BASE_UNITS.BIT,
    prefixes: PREFIXES.BINARY_LONG,
    value: 1,
    offset: 0
  },
  B: {
    name: 'B',
    base: BASE_UNITS.BIT,
    prefixes: PREFIXES.BINARY_SHORT,
    value: 8,
    offset: 0
  },
  bytes: {
    name: 'bytes',
    base: BASE_UNITS.BIT,
    prefixes: PREFIXES.BINARY_LONG,
    value: 8,
    offset: 0
  }
}
