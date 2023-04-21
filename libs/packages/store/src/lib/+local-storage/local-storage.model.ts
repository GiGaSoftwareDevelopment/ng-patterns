import { InjectionToken } from '@angular/core';

export const ngPatLocalStoragesFeatureKey = 'ngPatLocalStoragesFeatureKey';

export interface NgPatLocalStorageItem {
  key: string;
  value: any;
}

export interface NgPatLocalStorageConfiguration {
  enableEncryption: boolean;
  encryptionKey: string;

  excludeKeys?: string[];
}

export const ngPatDefaultKeysExcluded: string[] = ['firestore'];

/**
 * See https://angular.io/guide/dependency-injection-in-action
 *
 */
export const NG_PAT_LOCAL_STORAGE = new InjectionToken<Storage>(
  'Local Storage',
  {
    providedIn: 'root',
    factory: () => localStorage
  }
);

export const ngPatLocalStorageDefaultConfiguration: NgPatLocalStorageConfiguration =
  {
    enableEncryption: false,
    encryptionKey: 'defaultKey',
    excludeKeys: []
  };

export const NG_PAT_LOCAL_STORAGE_CONFIGURATION =
  new InjectionToken<NgPatLocalStorageConfiguration>(
    'Local Storage Configuration',
    {
      providedIn: 'root',
      factory: () => {
        return <NgPatLocalStorageConfiguration>{
          ...ngPatLocalStorageDefaultConfiguration
        };
      }
    }
  );
