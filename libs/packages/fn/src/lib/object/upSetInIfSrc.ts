/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {setIfSrc} from './setInIfSrc';

export const upsetIfSrc: (
  srcObject: any,
  srcKeys: string | string[],
  targetObject: any,
  targetKeys: string | string[],
  defaultValue?: any
) => void = setIfSrc;
