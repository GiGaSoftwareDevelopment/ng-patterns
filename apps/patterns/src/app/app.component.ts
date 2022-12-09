import {Component, OnInit, ViewChild} from '@angular/core';
import {AppNavbarComponent} from './components/app-navbar/app-navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {
  MatExpansionModule,
  MatExpansionPanel
} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {RouterFacadeService} from '@uiux/utils';
import {PushModule} from '@ngrx/component';

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
  @ViewChild('charts', {static: true}) private _chartsPanel!: MatExpansionPanel;
  constructor(public routerFacade: RouterFacadeService) {}

  ngOnInit() {
    this.routerFacade.url$.subscribe((url: string) => {
      if (url.includes('charts')) {
        this._chartsPanel.open();
      }
    });
  }
}
