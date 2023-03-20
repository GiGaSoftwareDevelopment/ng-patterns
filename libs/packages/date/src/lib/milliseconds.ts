/*
x = ms / 1000
seconds = x % 60
x /= 60
minutes = x % 60
x /= 60
hours = x % 24
x /= 24
days = x
 */

/**
 * Convert milliseconds to seconds
 * @param _ms
 */
export function msToSec(_ms: number | string): number {
  return parseInt(<string>_ms, 10) / 1000;
}

/**
 * Convert seconds to milliseconds
 * @param _s
 */
export function secToMs(_s: number | string): number {
  return parseInt(<string>_s, 10) * 1000;
}

/**
 * Convert milliseconds to minutes
 * @param _ms
 */
export function msToMins(_ms: number | string): number {
  return msToSec(_ms) / 60;
}

/**
 * Convert minutes to milliseconds
 * @param _m
 */
export function minToMs(_m: number | string): number {
  return secToMs(_m) * 60;
}

/**
 * Convert milliseconds to hours
 * @param _ms
 */
export function msToHours(_ms: number | string): number {
  return msToMins(_ms) / 60;
}

/**
 * Convert hours to milliseconds
 * @param _h
 */
export function hourToMs(_h: number | string): number {
  return minToMs(_h) * 60;
}

/**
 * Convert milliseconds to days
 * @param _ms
 */
export function msToDays(_ms: number | string): number {
  return msToHours(_ms) / 24;
}

/**
 * Convert days to milliseconds
 * @param _d
 */
export function dayToMs(_d: number | string): number {
  return hourToMs(_d) * 24;
}
