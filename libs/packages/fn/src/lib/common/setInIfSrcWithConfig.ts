/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {setInIfSrc} from './setInIfSrc';

export interface ISetInSrcConfig {
  src: any;
  srcKeys: string | string[];
  target: any;
  targetKeys: string | string[];
  defaultValue?: any;
}

export function setInIfSrcWithConfig(config: ISetInSrcConfig): void {
  setInIfSrc(
    config.src,
    config.srcKeys,
    config.target,
    config.targetKeys,
    config.defaultValue
  );
}
