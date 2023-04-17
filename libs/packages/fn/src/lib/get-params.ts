import { convertToParamMap, ParamMap } from '@angular/router';

export function getParamsByKey(params: ParamMap, keys: string[]) {
  const p: { [key: string]: any } = {};

  return keys.reduce((a: any, key: string) => {
    if (key !== null && params.has(key)) {
      a[key] = params.get(key);
    }

    return a;
  }, p);
}

/**
 * Transforms ParamMap object into basic javascript object
 *
 * @param params
 */
export function getAllParams(params: ParamMap): { [key: string]: any } {
  return params.keys.reduce((a: { [key: string]: any }, key: string) => {
    a[key] = params.get(key);

    return a;
  }, {});
}

export function parseUrlParams(url: string): { [key: string]: string } {
  const beginIndex = location.href.indexOf(';');
  const endIndex =
    location.href.lastIndexOf('?') > -1
      ? location.href.lastIndexOf('?')
      : location.href.length;

  if (beginIndex > 0) {
    return location.href
      .substring(beginIndex + 1, endIndex)
      .split(';')
      .reduce((a: { [key: string]: string }, param: string) => {
        const propValue: string[] = param.split('=');
        a[propValue[0]] = propValue[1];
        return a;
      }, {});
  }

  return {};
}

export function getAngularRouteUrl(url: string): string {
  const endQueryIndex =
    url.lastIndexOf('?') > -1 ? url.lastIndexOf('?') : url.length;

  const endParamIndex = url.indexOf(';') > -1 ? url.indexOf(';') : url.length;

  return url.substring(0, Math.min(endQueryIndex, endParamIndex));
}

export function parseUrlParamsMapbyKeys(url: string, keys: string[]): ParamMap {
  return getParamsByKey(convertToParamMap(parseUrlParams(url)), keys);
}
