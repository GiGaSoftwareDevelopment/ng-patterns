import {FileData, ProcessorFunctionConfig} from '../model';

/**
 * Replace @angular/material imports to relative path
 * @param d
 */
export function replaceAngularCorePath(d: FileData): FileData {
  let replaceValue = '../';

  if (d.path.includes('/testing/')) {
    replaceValue = '../../';
  }

  d.content = d.content.replace(/@angular\/material\//g, replaceValue);

  return d;
}

export const replaceAngularCorePathConfig: ProcessorFunctionConfig = {
  name: 'replaceAngularCorePath',
  func: replaceAngularCorePath
};
