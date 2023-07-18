import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface NgPatThemeSwitcherOptionsRequired {
  /**
   *  The target element to apply the theme to. Defaults to the document body.
   */
  target: HTMLElement;

  /**
   * The prefix to use for the LocalStorage key. Defaults to 'app-theme'.
   */
  localStorageKey: string;

  /**
   * Whether to save the selected theme to LocalStorage. Defaults to true.
   */
  saveToLocalStorage: boolean;
}

export interface NgPatThemeSwitcherOptions {
  /**
   *  The target element to apply the theme to. Defaults to the document body.
   */
  target?: HTMLElement;

  /**
   * The prefix to use for the LocalStorage key. Defaults to 'app-theme'.
   */
  localStorageKey?: string;

  /**
   * Whether to save the selected theme to LocalStorage. Defaults to true.
   */
  saveToLocalStorage?: boolean;
}

export class NgPatThemeSwitcher {
  private _isInitialized = false;
  private _themes: string[] = [];

  get themes(): string[] {
    return this._themes;
  }

  private _currentTheme: string | undefined;

  get currentTheme(): string | undefined {
    return this._currentTheme;
  }

  constructor(private options: NgPatThemeSwitcherOptionsRequired) {
    const savedTheme: string | null = localStorage.getItem(
      options.localStorageKey
    );

    if (savedTheme) {
      this._currentTheme = savedTheme;
    }
  }

  addTheme(theme: string) {
    this._themes.push(theme);
    if (!this._isInitialized) {
      this._isInitialized = true;
      if (this._currentTheme) {
        this.setTheme(this._currentTheme);
      }
    }
  }

  addThemes(themes: string[]) {
    this._themes.push(...themes);
    if (!this._isInitialized) {
      this._isInitialized = true;
      if (this._currentTheme) {
        this.setTheme(this._currentTheme);
      }
    }
  }
  setTheme(name: string) {
    this._themes.forEach((t: string) => {
      this.options.target.classList.remove(t);
    });

    const theme: string | undefined = this._themes.find(
      (t: string): boolean => t === name
    );

    if (theme) {
      this.options.target.classList.add(theme);
      this._currentTheme = theme;
      if (this.options.saveToLocalStorage) {
        localStorage.setItem(this.options.localStorageKey, theme);
      }
    }
  }

  removeTheme() {
    this._themes.forEach((t: string) => {
      this.options.target.classList.remove(t);
    });

    this._currentTheme = undefined;
    localStorage.removeItem(this.options.localStorageKey);
  }
}

@Injectable({
  providedIn: 'root'
})
export class NgPatThemeSwitcherService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  create(options?: NgPatThemeSwitcherOptions): NgPatThemeSwitcher {
    return new NgPatThemeSwitcher({
      target: options && options.target ? options.target : this.document.body,
      localStorageKey:
        options && options.localStorageKey
          ? options.localStorageKey
          : 'app-theme',
      saveToLocalStorage:
        options && options.saveToLocalStorage !== undefined
          ? options.saveToLocalStorage
          : true
    });
  }
}
