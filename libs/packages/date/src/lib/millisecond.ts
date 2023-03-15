/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

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
export function msToSec(_ms: number | string): number {
  return parseInt(<string>_ms, 10) / 1000;
}

export function secToMs(_s: number | string): number {
  return parseInt(<string>_s, 10) * 1000;
}

export function msToMins(_ms: number | string): number {
  return msToSec(_ms) / 60;
}

export function minToMs(_m: number | string): number {
  return secToMs(_m) * 60;
}

export function msToHours(_ms: number | string): number {
  return msToMins(_ms) / 60;
}

export function hourToMs(_h: number | string): number {
  return minToMs(_h) * 60;
}

export function msToDays(_ms: number | string): number {
  return msToHours(_ms) / 24;
}

export function dayToMs(_d: number | string): number {
  return hourToMs(_d) * 24;
}
