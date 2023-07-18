# NgPatThemeSwitcherService

## Description
By default, the theme switcher applies a theme css class to the body tag of the document. This can be changed by passing a custom element to the `create` method.   

## Usage

```typescript

  class AppComponent {

    themeSwitcher: NgPatThemeSwitcher;
    themeOptions: string[] = [
      'light-theme',
      'dark-theme'
    ];

    constructor(
      private _ref: ElmentRef,  
      private _themeService: NgPatThemeSwitcherService
    ) {
      this.themeSwitcher = this._themeService.create();
      
      // or
      this.themeSwitcher = this._themeService.create({
        target: _ref.nativeElement,
        localStorageKey: 'my-component-theme',
        saveToLocalStorage: true
      });
      
      
      this.themeSwitcher.addThemes(this.themeOptions);
    }

    /**
     * I.E. 'light-theme' or 'dark-theme' from themeOptions
     * @param theme
     */
    selectTheme(theme: string) {
      this.themeSwitcher.setTheme(theme);
    }
    
    removeTheme() {
      this.themeSwitcher.removeTheme();
    }
  }
  
  ## Methods
  
  ### create
  Creates a new theme switcher instance.
  
  ```typescript
  create(element?: HTMLElement): NgPatThemeSwitcher
  ```

  ### addThemes
  Adds themes to the theme switcher instance.
  
  ```typescript
  addThemes(themes: NgPatThemeSwitcherOption[]): void
  ```

  ### setTheme
  Sets the theme of the theme switcher instance.
  
  ```typescript
  setTheme(theme: string): void
  ```

  ### removeTheme
  Removes the theme of the theme switcher instance.
  
  ```typescript
  removeTheme(): void
   ```

  ### currentTheme
  Returns the current theme of the theme switcher instance.
  
  ```typescript
   currentTheme
  ```

  ### themes
  Returns all themes of the theme switcher instance.
  
  ```typescript
  themes
  ```

