import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout, selectIsLoggedIn } from '@ngpat/store';
import { LetModule } from '@ngrx/component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'ng-pat-user-account-menu',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatIconModule, LetModule, MatMenuModule ],
  templateUrl: './user-account-menu.component.html',
  styleUrls: ['./user-account-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ng-pat-user-account-menu'
  }
})
export class UserAccountMenuComponent {

  isLoggedIn$: Observable<boolean>;

  @Output() doLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn)
  }

  logout() {
    this.store.dispatch(logout())
  }

}
