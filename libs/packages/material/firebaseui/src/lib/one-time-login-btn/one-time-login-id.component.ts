import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtlidAppService } from './otlid-app.service';
import { AccountState, selectAccountState, selectIsLoggedIn, logout } from '@ngpat/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LetModule, PushModule } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ng-pat-one-time-login-id',
  standalone: true,
  imports: [ CommonModule, PushModule, LetModule, MatButtonModule ],
  templateUrl: './one-time-login-id.component.html',
  styleUrls: [ './one-time-login-id.component.scss' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ng-pat-one-time-login-id'
  }
})
export class OneTimeLoginIdComponent {
  @Input() loginBtnText = 'Login';

  @Output() showProgress: EventEmitter<boolean> = new EventEmitter<boolean>();
  account$: Observable<AccountState>;
  isLoggedIn$: Observable<boolean>;

  constructor(public appLogin: OtlidAppService, private store: Store) {
    this.account$ = this.store.select(selectAccountState);
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  onLoginBrowser() {
    this.showProgress.emit(true);
    this.appLogin.launchAuthSite().subscribe(() => {
      this.showProgress.emit(false);
    });
  }

  logout() {
    this.store.dispatch(logout());
  }

}
