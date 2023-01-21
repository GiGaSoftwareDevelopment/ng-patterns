import { InjectionToken } from '@angular/core';

export interface BrowserStorageItem {
  key: string;
  value: any;
}

export interface BrowserStorageConfiguration {
  enableEncryption: boolean;
  encryptionKey: string;
}


/**
 * See https://angular.io/guide/dependency-injection-in-action
 *
 */
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage',
  {
    providedIn: 'root',
    factory: () => localStorage
  });

export const browserStorageDefaultConfiguration: BrowserStorageConfiguration = {
  enableEncryption: false,
  encryptionKey: 'defaultKey'
}


export const BROWSER_STORAGE_CONFIGURATION = new InjectionToken<BrowserStorageConfiguration>('Browser Storage Configuration',
  {
    providedIn: 'root',
    factory: () => {
      return <BrowserStorageConfiguration>{
        ...browserStorageDefaultConfiguration
      }
    }
  })
