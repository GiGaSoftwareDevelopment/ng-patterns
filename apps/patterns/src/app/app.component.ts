import {Component, HostBinding, NgZone, OnInit} from '@angular/core';
import {AppNavbarComponent} from './components/app-navbar/app-navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {RouterFacadeService} from '@uiux/utils';
import {PushModule} from '@ngrx/component';
import {zonePipe} from '@uiux/rxjs';
import {distinctUntilChanged, filter, tap} from 'rxjs';

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
    RouterLinkActive
  ]
})
export class AppComponent {
  // @ViewChild('charts', {static: true}) private _chartsPanel!: MatExpansionPanel;

  @HostBinding('class.ng-patterns-root') rootClass = true;

  chartsOpen$ = this.routerFacade.containsUrl$('charts').pipe(
    filter((isOpen: boolean) => isOpen),
    zonePipe<boolean>(this._zone)
  );

  componentsOpen$ = this.routerFacade.containsUrl$('component').pipe(
    filter((isOpen: boolean) => isOpen),
    zonePipe<boolean>(this._zone)
  );

  rxjsOpen$ = this.routerFacade.containsUrl$('rxjs').pipe(
    filter((isOpen: boolean) => isOpen),
    zonePipe<boolean>(this._zone)
  );

  constructor(
    public routerFacade: RouterFacadeService,
    private _zone: NgZone
  ) {}
}
