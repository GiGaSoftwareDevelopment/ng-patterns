import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BROWSER_STORAGE, BROWSER_STORAGE_CONFIGURATION, BrowserStorageConfiguration, BrowserStorageItem } from './index';
import * as CryptoJS from 'crypto-js';
import { isString } from '@uiux/fn';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  constructor(
     @Inject(BROWSER_STORAGE) public storage: Storage,
     @Inject(BROWSER_STORAGE_CONFIGURATION) private _config: BrowserStorageConfiguration
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
  getAllLocalStorageItems(): Observable<BrowserStorageItem[]> {

    const values: BrowserStorageItem[] = Object.entries(localStorage).map(([key, value]: [ string, any]) => {
      return {
        key,
        value
      }
    });

    if (this._config.enableEncryption) {
      return of(values.map(({ key, value }: BrowserStorageItem) => {
        return {
          key,
          value: this._decrypt(value)
        }
      }))
    }

    return of(values);
  }

  private _encrypt(value: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(value), this._config.encryptionKey).toString();
  }

  private _decrypt(txtToDecrypt: string): any {
    if (isString(txtToDecrypt)) {
      return JSON.parse(CryptoJS.AES.decrypt(txtToDecrypt, this._config.encryptionKey).toString(CryptoJS.enc.Utf8));
    }

    return txtToDecrypt;
  }
}
