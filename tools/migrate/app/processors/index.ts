import {toPropertyName} from '@nrwl/workspace/src/devkit-reexport';
import {ProcessorFunctionConfig} from '../model';
import {componentList} from './component-list';
import {removeLicenseConfig} from './remove-license';
import {replaceCssExtensionConfig} from './replace-css-extension';
import {replaceNgDevModeConfig} from './replace-ng-dev-mode';
// import {replacePrivateWithProtectedConfig} from './replace-private-with-protected';

// const componentFunctions: ProcessorFunctionConfig[] = componentList.map((componentName: string) => {
//   return require(`./${componentName}/${componentName}`)[`${toPropertyName(componentName)}ComponentConfig`];
// });

const moduleFunctions: ProcessorFunctionConfig[] = componentList.map((componentName: string) => {
  return require(`./${componentName}/${componentName}`)[`${toPropertyName(componentName)}ModuleConfig`];
});

export const fileProcessors: ProcessorFunctionConfig[] = [
  // These must be called first
  // replacePrivateWithProtectedConfig,
  removeLicenseConfig,
  // replaceAngularCorePathConfig,
  replaceNgDevModeConfig,
  replaceCssExtensionConfig,
  // replaceAngularCDKPathConfig,
  // replaceCDKVersionConfig,

  // These must be called last
  // ...componentFunctions,
  ...moduleFunctions
];
