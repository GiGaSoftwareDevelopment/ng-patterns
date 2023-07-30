import { Component, HostBinding } from '@angular/core';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import {
  NgPatSidenavData,
  NgPatSidenavMenuFactoryService,
  NgPatSidenavMenuModule
} from '@ngpat/material/sidenav-menu';
import { NgPatLogoComponent } from '@ngpat/shared/ui-design-library';

@Component({
  standalone: true,
  selector: 'ng-patterns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    MatSidenavModule,
    PushPipe,
    NgPatSidenavMenuModule,
    AppNavbarComponent,
    RouterOutlet,
    NgPatLogoComponent
  ]
})
export class AppComponent {
  @HostBinding('class.ng-patterns-root') rootClass = true;

  sidenavData: NgPatSidenavData = {
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
          },
          {
            route: ['material', 'tailwindcss'],
            title: 'Adding TailwindCSS',
            svgUrl: 'assets/material/tailwind-logo.svg'
          }
        ]
      },
      {
        title: 'Firebase',
        items: [
          {
            route: ['firebase', 'sendgrid'],
            title: 'Trigger SendGrid Email'
          }
        ]
      },
      {
        title: 'Slick Carousel',
        items: [
          {
            route: ['slick', 'carousel'],
            title: 'Slick Carousel'
          }
        ]
      }
    ]
  };

  // Unique ID for sidenav service
  menuID = 'ngPatterns';
  sideNavSvc = this.sideNavFactory.getService(this.menuID);

  constructor(public sideNavFactory: NgPatSidenavMenuFactoryService) {
    // Initialize sidenav
    this.sideNavSvc.init();
  }

  openSideNav() {
    this.sideNavSvc.setIsOpen(true);
  }
}
