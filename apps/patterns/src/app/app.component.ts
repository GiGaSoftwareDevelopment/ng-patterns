import {Component, NgZone, OnInit} from '@angular/core';
import {AppNavbarComponent} from './components/app-navbar/app-navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterOutlet} from '@angular/router';
import {RouterFacadeService} from '@uiux/utils';
import {PushModule} from '@ngrx/component';
import {zonePipe} from '@uiux/rxjs';

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
    PushModule
  ]
})
export class AppComponent implements OnInit {
  // @ViewChild('charts', {static: true}) private _chartsPanel!: MatExpansionPanel;

  chartsOpen$ = this.routerFacade
    .containsUrl$('charts')
    .pipe(zonePipe<boolean>(this._zone));

  componentsOpen$ = this.routerFacade
    .containsUrl$('component')
    .pipe(zonePipe<boolean>(this._zone));
  constructor(
    public routerFacade: RouterFacadeService,
    private _zone: NgZone
  ) {}

  ngOnInit() {
    this.routerFacade.url$.subscribe((url: string) => {
      if (url.includes('charts')) {
        // this._chartsPanel.open();
      }
    });

    this.routerFacade.containsUrl$('chart').subscribe(console.log);
  }
}
