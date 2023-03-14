import {Component, HostBinding} from '@angular/core';
import {AppNavbarComponent} from './components/app-navbar/app-navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {LetModule, PushModule} from '@ngrx/component';
import {MatListModule} from '@angular/material/list';
import {GigaSidenavData, SidenavMenuModule} from '@ngpat/material/sidenav-menu';
import {NgPatLogoComponent} from '@ngpat/shared/ui-design-library';
import {SidenavMenuFactoryService} from '../../../../libs/packages/material/sidenav-menu/src/lib/sidenav-menu-factory.service';

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
    NgPatLogoComponent,
    LetModule
  ]
})
export class AppComponent {
  @HostBinding('class.ng-patterns-root') rootClass = true;

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

  // Unique ID for sidenav service
  menuID = 'ngPatterns';
  sideNavSvc = this.sideNavFactory.getService(this.menuID);

  constructor(public sideNavFactory: SidenavMenuFactoryService) {
    this.sideNavSvc.init();
  }

  openSideNav() {
    this.sideNavSvc.setIsOpen(true);
  }
}
