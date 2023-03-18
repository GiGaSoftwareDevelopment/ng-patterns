import {InjectionToken} from '@angular/core';

export const ngPatBrowserStoragesFeatureKey = 'ngPatBrowserStoragesFeatureKey';

export interface NgPatBrowserStorageItem {
  key: string;
  value: any;
}

export interface NgPatBrowserStorageConfiguration {
  enableEncryption: boolean;
  encryptionKey: string;

  excludeKeys?: string[];
}

export const ngPatDefaultKeysExcluded: string[] = ['firestore'];

/**
 * See https://angular.io/guide/dependency-injection-in-action
 *
 */
export const NG_PAT_BROWSER_STORAGE = new InjectionToken<Storage>(
  'Browser Storage',
  {
    providedIn: 'root',
    factory: () => localStorage
  }
);

export const ngPatBrowserStorageDefaultConfiguration: NgPatBrowserStorageConfiguration =
  {
    enableEncryption: false,
    encryptionKey: 'defaultKey',
    excludeKeys: []
  };

export const NG_PAT_BROWSER_STORAGE_CONFIGURATION =
  new InjectionToken<NgPatBrowserStorageConfiguration>(
    'Browser Storage Configuration',
    {
      providedIn: 'root',
      factory: () => {
        return <NgPatBrowserStorageConfiguration>{
          ...ngPatBrowserStorageDefaultConfiguration
        };
      }
    }
  );
