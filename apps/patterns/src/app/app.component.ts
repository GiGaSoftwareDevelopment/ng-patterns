import { Component, HostBinding, NgZone } from '@angular/core';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RouterFacadeService } from '@ngpat/utils';
import { PushModule } from '@ngrx/component';
import { zonePipe } from '@ngpat/rxjs';
import { filter } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { GigaSidenavData, GigaSidenavListGroup, SidenavMenuModule } from '@ngpat/material/sidenav-menu';
import { NgPatLogoComponent } from '@ngpat/shared/ui-design-library';

@Component({
  standalone: true,
  selector: 'ng-patterns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    AppNavbarComponent,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    PushModule,
    RouterLinkActive,
    MatListModule,
    SidenavMenuModule,
    NgPatLogoComponent
  ]
})
export class AppComponent {
  // @ViewChild('charts', {static: true}) private _chartsPanel!: MatExpansionPanel;

  @HostBinding('class.ng-patterns-root') rootClass = true;

  matContentMarginLeft = 256;

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
            svgUrl: 'assets/charts/bullet-chart.svg',
          }
        ]
      },
      {
        title: 'Components',
        items: [
          {
            route: ['components','color-picker'],
            title: 'Color Picker',
            icon: 'format_color_fill'
          }
        ]
      },
      {
        title: 'Material',
        items: [
          {
            route: ['material', 'density'],
            title: 'Density'
          },
          {
            route: ['material', 'background'],
            title: 'Background'
          }
        ]
      }

    ]
  }


  chartsOpen$ = this.routerFacade.containsUrl$('charts').pipe(
    filter((isOpen: boolean) => isOpen),
    zonePipe<boolean>(this._zone)
  );

  componentsOpen$ = this.routerFacade.containsUrl$('component').pipe(
    filter((isOpen: boolean) => isOpen),
    zonePipe<boolean>(this._zone)
  );

  materialOpen$ = this.routerFacade.containsUrl$('material').pipe(
    filter((isOpen: boolean) => isOpen),
    zonePipe<boolean>(this._zone)
  );

  rxjsOpen$ = this.routerFacade.containsUrl$('rxjs').pipe(
    filter((isOpen: boolean) => isOpen),
    zonePipe<boolean>(this._zone)
  );


  storeOpen$ = this.routerFacade.containsUrl$('store').pipe(
    filter((isOpen: boolean) => isOpen),
    zonePipe<boolean>(this._zone)
  );

  constructor(
    public routerFacade: RouterFacadeService,
    private _zone: NgZone
  ) {}
}
