import {FileData, ProcessorFunctionConfig} from '../model';

/**
 * Remove @license block at top of files
 * @param d
 */
export function removeLicense(d: FileData): FileData {
  d.content = d.content.replace(/^\/\*\*.*@license(.*?)\*\/$/gms, '');
  return d;
}

export const removeLicenseConfig: ProcessorFunctionConfig = {
  name: 'removeLicense',
  func: removeLicense
};
