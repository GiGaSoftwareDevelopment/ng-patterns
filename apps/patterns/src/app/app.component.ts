import {Component, NgZone, OnInit} from '@angular/core';
import {AppNavbarComponent} from './components/app-navbar/app-navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterOutlet} from '@angular/router';
import {RouterFacadeService} from '@uiux/utils';
import {PushModule} from '@ngrx/component';
import {Observable} from 'rxjs';

export function zonePipe<T>(zone: NgZone) {
  return (observable: Observable<T>) =>
    new Observable<T>(subscriber => {
      // this function will be called each time this
      // Observable is subscribed to.
      const subscription = observable.subscribe({
        next(value) {
          // trigger change detection
          zone.run(() => {
            console.log('run zone', value);
            subscriber.next(value);
          });
        },
        error(err) {
          // We need to make sure we're propagating our errors through.
          // trigger change detection
          zone.run(() => {
            subscriber.error(err);
          });
        },
        complete() {
          subscriber.complete();
        }
      });

      // Return the finalization logic. This will be invoked when
      // the result errors, completes, or is unsubscribed.
      return () => {
        subscription.unsubscribe();
        // clean up
      };
    });
}

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
