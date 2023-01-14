import {FileData, ProcessorFunctionConfig} from '../model';

/**
 * Remove ngDevMode
 * @param d
 */
export function replaceNgDevMode(d: FileData): FileData {
  d.content = d.content.replace(/&&.*\n[\s\S].*ngDevMode\)/gm, '');
  d.content = d.content.replace(/&&[\s\S]\(typeof[\s\S]ngDevMode.*ngDevMode\)/gm, '');
  // d.content = d.content.replace(/typeof\sngDevMode.*ngDevMode/gm, 'false');

  return d;
}

export const replaceNgDevModeConfig: ProcessorFunctionConfig = {
  name: 'replaceNgDevMode',
  func: replaceNgDevMode
};
