import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GigaSidenavListItem } from '../sidenav-menu.model';
import { ReplaySubject } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ng-pat-nav-item-link',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive, LetModule, MatButtonModule, MatIconModule ],
  templateUrl: './nav-item-link.component.html',
  styleUrls: ['./nav-item-link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ng-pat-nav-item-link',
    '[class.is-current-nav-item]': 'isCurrentNavItem'
  }
})
export class NavItemLinkComponent {

  routeItem$: ReplaySubject<GigaSidenavListItem> = new ReplaySubject<GigaSidenavListItem>(1);

  @Input()
  set routeItem(r: GigaSidenavListItem) {
    this.routeItem$.next(r);
  }

  @Input()
  isCurrentNavItem = false;

  @Output() selectNavItem: EventEmitter<GigaSidenavListItem> = new EventEmitter<GigaSidenavListItem>();
  @Output() removeNavItem: EventEmitter<GigaSidenavListItem> = new EventEmitter<GigaSidenavListItem>();

  addCurrentNav(item: GigaSidenavListItem) {
    if (!this.isCurrentNavItem) {
      this.selectNavItem.emit(item);
    }
  }



}
