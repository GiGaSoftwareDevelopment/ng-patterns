import { PREFIXES } from './prefixes';
import { UNIT_NONE, UNITS } from './base';

/**
 * A unit system is a set of dimensionally independent base units plus a set of derived units, formed by multiplication and division of the base units, that are by convention used with the unit system.
 * A user perhaps could issue a command to select a preferred unit system, or use the default (see below).
 * Auto unit system: The default unit system is updated on the fly anytime a unit is parsed. The corresponding unit in the default unit system is updated, so that answers are given in the same units the user supplies.
 */
const UNIT_SYSTEMS = {
  si: {
    // Base units
    NONE: { unit: UNIT_NONE, prefix: PREFIXES.NONE[''] },
    LENGTH: { unit: UNITS.m, prefix: PREFIXES.SHORT[''] },
    MASS: { unit: UNITS.g, prefix: PREFIXES.SHORT.k },
    TIME: { unit: UNITS.s, prefix: PREFIXES.SHORT[''] },
    CURRENT: { unit: UNITS.A, prefix: PREFIXES.SHORT[''] },
    TEMPERATURE: { unit: UNITS.K, prefix: PREFIXES.SHORT[''] },
    LUMINOUS_INTENSITY: { unit: UNITS.cd, prefix: PREFIXES.SHORT[''] },
    AMOUNT_OF_SUBSTANCE: { unit: UNITS.mol, prefix: PREFIXES.SHORT[''] },
    ANGLE: { unit: UNITS.rad, prefix: PREFIXES.SHORT[''] },
    BIT: { unit: UNITS.bits, prefix: PREFIXES.SHORT[''] },

    // Derived units
    FORCE: { unit: UNITS.N, prefix: PREFIXES.SHORT[''] },
    ENERGY: { unit: UNITS.J, prefix: PREFIXES.SHORT[''] },
    POWER: { unit: UNITS.W, prefix: PREFIXES.SHORT[''] },
    PRESSURE: { unit: UNITS.Pa, prefix: PREFIXES.SHORT[''] },
    ELECTRIC_CHARGE: { unit: UNITS.C, prefix: PREFIXES.SHORT[''] },
    ELECTRIC_CAPACITANCE: { unit: UNITS.F, prefix: PREFIXES.SHORT[''] },
    ELECTRIC_POTENTIAL: { unit: UNITS.V, prefix: PREFIXES.SHORT[''] },
    ELECTRIC_RESISTANCE: { unit: UNITS.ohm, prefix: PREFIXES.SHORT[''] },
    ELECTRIC_INDUCTANCE: { unit: UNITS.H, prefix: PREFIXES.SHORT[''] },
    ELECTRIC_CONDUCTANCE: { unit: UNITS.S, prefix: PREFIXES.SHORT[''] },
    MAGNETIC_FLUX: { unit: UNITS.Wb, prefix: PREFIXES.SHORT[''] },
    MAGNETIC_FLUX_DENSITY: { unit: UNITS.T, prefix: PREFIXES.SHORT[''] },
    FREQUENCY: { unit: UNITS.Hz, prefix: PREFIXES.SHORT[''] }
  }
}
