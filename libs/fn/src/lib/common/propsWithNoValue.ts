/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { hasValue } from './hasValue';

export function propsWithNoValue(obj: any): any {
  const r: any = {};

  Object.keys(obj).forEach((key: any) => {
    if (!hasValue(obj[key])) {
      r[key] = obj[key];
    }
  });

  return r;
}
