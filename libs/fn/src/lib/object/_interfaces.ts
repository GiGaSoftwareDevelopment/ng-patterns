export type predicateFn = (...args: any[]) => boolean;

export interface ISearchObjectByKeysResult {
  key: string;
  path: string;
  data: any;
}
