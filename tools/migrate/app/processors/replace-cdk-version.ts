import {FileData, ProcessorFunctionConfig} from '../model';

export function replaceCDKVersion(d: FileData): FileData {
  d.content = d.content.replace(
    "import {VERSION as CDK_VERSION} from '@angular/cdk';",
    "import {VERSION as CDK_VERSION} from '../../../cdk';"
  );
  return d;
}

export const replaceCDKVersionConfig: ProcessorFunctionConfig = {
  name: 'replaceCDKVersion',
  func: replaceCDKVersion
};
