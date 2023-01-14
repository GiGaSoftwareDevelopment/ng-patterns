import {FileData, ProcessorFunctionConfig} from '../model';

/**
 * Remove ngDevMode
 * @param d
 */
export function replacePrivateWithProtected(d: FileData): FileData {
  d.content = d.content.replace(/private/gm, 'protected');
  return d;
}

export const replacePrivateWithProtectedConfig: ProcessorFunctionConfig = {
  name: 'replacePrivateWithProtected',
  func: replacePrivateWithProtected
};
