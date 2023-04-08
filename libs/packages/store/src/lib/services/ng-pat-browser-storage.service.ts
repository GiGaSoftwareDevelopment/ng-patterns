import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  NG_PAT_BROWSER_STORAGE,
  NG_PAT_BROWSER_STORAGE_CONFIGURATION,
  NgPatBrowserStorageConfiguration,
  NgPatBrowserStorageItem,
  ngPatDefaultKeysExcluded
} from '../+browser-storage';
import * as CryptoJS from 'crypto-js';
import { isString } from '@ngpat/fn';

@Injectable({
  providedIn: 'root'
})
export class NgPatBrowserStorageService {
  constructor(
    @Inject(NG_PAT_BROWSER_STORAGE) public storage: Storage,
    @Inject(NG_PAT_BROWSER_STORAGE_CONFIGURATION)
    private _config: NgPatBrowserStorageConfiguration
  ) {}

  getItem(key: string): string | null {
    const value = this.storage.getItem(key);
    if (this._config.enableEncryption && value) {
      return this._decrypt(value);
    }

    return value;
  }

  setItem(key: string, value: string): void {
    if (this._config.enableEncryption) {
      this.storage.setItem(key, this._encrypt(value));
    } else {
      this.storage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

  /**
   * See https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance
   */
  getAllLocalStorageItems(): Observable<NgPatBrowserStorageItem[]> {
    let exludedKeys = [...ngPatDefaultKeysExcluded];

    if (
      this._config &&
      this._config.excludeKeys &&
      this._config.excludeKeys.length
    ) {
      exludedKeys = [...this._config.excludeKeys, ...ngPatDefaultKeysExcluded];
    }

    let values: NgPatBrowserStorageItem[] = Object.entries(this.storage).reduce(
      (a: NgPatBrowserStorageItem[], [key, value]: [string, any]) => {
        const itemIsExcluded = exludedKeys.reduce(
          (isExcluded: boolean, excludedKey: string) => {
            if (!isExcluded) {
              isExcluded = key.includes(excludedKey);
            }
            return isExcluded;
          },
          false
        );

        if (!itemIsExcluded) {
          a.push({
            key,
            value
          });
        }

        return a;
      },
      []
    );

    if (this._config.enableEncryption) {
      values = values.map(({ key, value }: NgPatBrowserStorageItem) => {
        return {
          key,
          value: this._decrypt(value)
        };
      });
    }

    return of(values);
  }

  private _encrypt(value: any): string {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      this._config.encryptionKey
    ).toString();
  }

  private _decrypt(txtToDecrypt: string): any {
    if (isString(txtToDecrypt)) {
      return JSON.parse(
        CryptoJS.AES.decrypt(txtToDecrypt, this._config.encryptionKey).toString(
          CryptoJS.enc.Utf8
        )
      );
    }

    return txtToDecrypt;
  }
}
