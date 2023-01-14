import {FileData, ProcessorFunctionConfig} from '../model';

/**
 * Replace @angular/cdk imports to relative path
 * @param d
 */
export function replaceAngularCDKPath(d: FileData): FileData {
  let replaceValue = '../../cdk/';

  if (d.path.includes('/testing/')) {
    replaceValue = '../../../cdk/';
  }

  if (d.path.includes('/core/')) {
    replaceValue = '../../../cdk/';
  }

  if (d.path.includes('/cdk/')) {
    const numParentDirectories = d.path.substring(d.path.lastIndexOf('cdk/') + 4).split('/').length - 1;

    replaceValue = '';

    for (let i = 0; i < numParentDirectories; i++) {
      replaceValue += '../';
    }
  }

  d.content = d.content.replace(/@angular\/cdk\//g, replaceValue);

  return d;
}

export const replaceAngularCDKPathConfig: ProcessorFunctionConfig = {
  name: 'replaceAngularCDKPath',
  func: replaceAngularCDKPath
};
