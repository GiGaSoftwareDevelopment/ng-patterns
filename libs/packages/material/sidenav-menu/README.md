# @ngpat/material/sidenav-menu

Secondary entry point of `@ngpat/material`. It can be used by importing from `@ngpat/material/sidenav-menu`.

## Usage

For standalone usage, import the LocalStorage NgRX State  into your `app.config.ts`.

```typescript

import {
  provideLocalStorageReducer,
  provideLocalStorageInitialState,
  provideLocalStorageEffects
} from '@ngpat/store';


export const appConfig: ApplicationConfig = {
    
    providers: [
      provideStore(
        {
          ...provideLocalStorageReducer
        },
        initialState: {
          ...provideLocalStorageInitialState
        }
      ),
      provideEffects([ ...provideLocalStorageEffects ]),
    ]
    
}

```


```angular2html
<ng-pat-sidenav-menu [menuID]="menuID" [sidenavData]="sidenavData">
  <ng-pat-sidenav-header [height]="49">
    <img src="assets/ngrx.svg" ngPatLogo/>
    <span ngPatTitle>NgRx Research</span>
  </ng-pat-sidenav-header>
</ng-pat-sidenav-menu>
```

```typescript

import { NgPatSidenavData, NgPatSidenavMenuFactoryService, NgPatSidenavMenuModule } from '@ngpat/material/sidenav-menu';


@Component({
  standalone: true,
  imports: [ 
    RouterModule, 
    MatSidenavModule, 
    NgPatSidenavMenuModule // <-- Import the module
  ],
  selector: 'ngrx-research-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

  sidenavData: NgPatSidenavData = {
    home: {
      title: 'Home',
      route: [ '/' ],
      icon: 'home'
    },
    currentTitle: 'Shortcuts',
    menuTitle: 'Research',
    menuGroupItems: [
      {
        title: 'NgRx',
        items: [
          {
            title: 'NgRx Entity with Signals',
            route: [ 'ngrx-entity-with-signals' ],
            icon: 'table_rows'
          },
          {
            route: [ 'signal-entity-store' ],
            title: 'Signal Entity Store',
            icon: 'storage'
          }
        ]
      }
    ]
  };
  
  menuID = 'ngrxResearch';
  sideNavSvc = this.sideNavFactory.getService(this.menuID);
  
  constructor(public sideNavFactory: NgPatSidenavMenuFactoryService) {
    this.sideNavSvc.init();
  }

  /**
    * Open the side nav
    */
  openSideNav() {
    this.sideNavSvc.setIsOpen(true);
  }
}


