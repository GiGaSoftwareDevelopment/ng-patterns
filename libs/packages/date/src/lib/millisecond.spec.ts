/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {
  dayToMs,
  hourToMs,
  minToMs,
  msToDays,
  msToHours,
  msToMins,
  msToSec,
  secToMs
} from './millisecond';

describe('Time', () => {
  beforeEach(() => {
    // spyOn option
  });

  afterEach(() => {});

  it('should convert milliseconds to seconds', () => {
    const seconds: number = msToSec(5000);
    expect(seconds).toEqual(5);
  });

  it('should convert sec to ms', () => {
    const s: number = secToMs(5);
    expect(s).toEqual(5000);
  });

  it('should convert milliseconds to minutes', () => {
    const minutes: number = msToMins(120000);
    expect(minutes).toEqual(2);
  });

  it('should convert min to ms', () => {
    const m: number = minToMs(2);
    expect(m).toEqual(120000);
  });

  it('should convert milliseconds to hours', () => {
    const hours: number = msToHours(7200000);
    expect(hours).toEqual(2);
  });

  it('should convert hour to ms', () => {
    const h: number = hourToMs(2);
    expect(h).toEqual(7200000);
  });

  it('should convert milliseconds to days', () => {
    const days: number = msToDays(172800000);
    expect(days).toEqual(2);
  });

  it('should convert day to ms', () => {
    const d: number = dayToMs(2);
    expect(d).toEqual(172800000);
  });
});
