import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from '@ngpat/material/link';
import {
  CodeHighlightModule,
  HowToLayoutModule
} from '@ngpat/shared/ui-design-library';

@Component({
  selector: 'pat-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    LinkComponent,
    HowToLayoutModule,
    CodeHighlightModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
  install = `
    npm install @ngpat/material @ngpat/store

    # or

    yarn add @ngpat/material @ngpat/store

    `;

  configureStorage = `
import {
  BROWSER_STORAGE_CONFIGURATION,
  NGPAT_FIREBASE_ROOT_EFFECTS,
  NGPAT_FIREBASE_ROOT_REDUCERS,
  NGPAT_FIREBASE_ROOT_STATE_INITIALIZERS
} from '@ngpat/store';

 bootstrapApplication(AppComponent, {
  providers: [
    provideStore(NGPAT_FIREBASE_ROOT_REDUCERS, {
      initialState: {
        ...NGPAT_FIREBASE_ROOT_STATE_INITIALIZERS
      }
    }),
    provideEffects([...NGPAT_FIREBASE_ROOT_EFFECTS]),
    {
      provide: BROWSER_STORAGE_CONFIGURATION,
      useValue: {
        enableEncryption: true,
        encryptionKey: 'foo', // for demo only
        excludeKeys: []
      }
    },
  ]
}).catch(err => console.error(err));
`;

  sidenavConfiguration = `
<mat-sidenav-container>

  <mat-sidenav
    [mode]="(sideNavSvc.mode$ | ngrxPush) || 'side'"
    [opened]="sideNavSvc.opened$ | ngrxPush"
    (openedChange)="sideNavSvc.setIsOpen($event)">

    <ng-pat-sidenav-menu [menuID]="menuID" [sidenavData]="sidenavData">

      <ng-pat-sidenav-header [height]="64">

        <design-library-ng-pat-logo
          [height]="28"
          [width]="28"
          ngPatLogo></design-library-ng-pat-logo>
        <span ngPatTitle>Ng Patterns</span>

      </ng-pat-sidenav-header>

    </ng-pat-sidenav-menu>

  </mat-sidenav>

  <mat-sidenav-content
    [style.margin-left.px]="sideNavSvc.expandedWidth$ | ngrxPush">
    <ng-patterns-app-navbar
      [showSideOpenButton]="sideNavSvc.showNavBarOpenButton$ | ngrxPush"
      (openSidenav)="openSideNav()"></ng-patterns-app-navbar>

    <router-outlet></router-outlet>

  </mat-sidenav-content>

</mat-sidenav-container>
`;

  typescriptService = `

  menuID = 'ngPatterns';
  sideNavSvc = this.sideNavFactory.getService(this.menuID);

  constructor(public sideNavFactory: NgPatSidenavMenuFactoryService) {
    // Initialize sidenav
    this.sideNavSvc.init();
  }


  `;

  data = `
  sidenavData: GigaSidenavData = {
    home: {
      title: 'Home',
      route: ['/'],
      icon: 'home'
    },
    currentTitle: 'Shortcuts',
    menuTitle: 'Categories',
    menuGroupItems: [
      {
        title: 'Charts',
        items: [
          {
            route: ['charts', 'bullet-chart'],
            title: 'Bullet Chart',
            svgUrl: 'assets/charts/bullet-chart.svg'
          }
        ]
      },
      {
        title: 'Material Components',
        items: [
          {
            route: ['components', 'color-picker'],
            title: 'Color Picker',
            icon: 'format_color_fill'
          },
          {
            route: ['components', 'sidenav'],
            title: 'Sidenav',
            icon: 'list'
          }
        ]
      },
      {
        title: 'Material Techniques',
        items: [
          {
            route: ['material', 'density'],
            title: 'Set Density'
          },
          {
            route: ['material', 'background'],
            title: 'Background Override'
          }
        ]
      }
    ]
  };


  `;
}
