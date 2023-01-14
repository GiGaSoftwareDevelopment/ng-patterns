import {FileData, ProcessorFunctionConfig} from '../model';

/**
 * Replace .css in styleURLs with .scss
 * @param d
 */
export function replaceCssExtension(d: FileData): FileData {
  if (!d.path.includes('.spec')) {
    d.content = d.content.replace(/\.css/gs, '.scss');

    // const regex = /styleUrls: \['.*\.scss/gs;
    // const m = regex.exec(d.content);
    // if (m && m[0]) {
    //   console.log(`${m[0]}, tq-${d.path.substr(d.path.lastIndexOf('/'), d.path.lastIndexOf('.'))}-override.scss`);
    // }
  }

  return d;
}

export const replaceCssExtensionConfig: ProcessorFunctionConfig = {
  name: 'replaceCssExtension',
  func: replaceCssExtension
};
