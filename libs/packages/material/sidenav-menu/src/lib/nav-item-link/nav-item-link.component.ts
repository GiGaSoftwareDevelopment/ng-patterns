import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GigaSidenavListItem } from '../sidenav-menu.model';
import { ReplaySubject } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ng-pat-nav-item-link',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive, LetModule, MatButtonModule, MatIconModule ],
  templateUrl: './nav-item-link.component.html',
  styleUrls: [ './nav-item-link.component.scss' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ng-pat-nav-item-link',
    '[class.is-current-nav-item]': 'isCurrentNavItem'
  }
})
export class NavItemLinkComponent {

  routeItem$: ReplaySubject<GigaSidenavListItem> = new ReplaySubject<GigaSidenavListItem>(1);
  initial = '';
  useInitial = false;
  useIcon = false;
  useSvg = false;
  svgIcon = '';
  svgIconName = '';

  @Input()
  set routeItem(r: GigaSidenavListItem) {

    if (r.title && r.title.length) {
      this.initial = r.title.substring(0, 1).toUpperCase();
    }

    if (r.icon && r.icon.length) {
      this.useIcon = true;
    } else if (r.svgUrl && r.svgUrl.length) {
      this.useSvg = true;
      this.loadIcon(r);
    } else {
      this.useInitial = true;
    }

    this.routeItem$.next(r);
  }

  @Input()
  isCurrentNavItem = false;

  @Output() selectNavItem: EventEmitter<GigaSidenavListItem> = new EventEmitter<GigaSidenavListItem>();
  @Output() removeNavItem: EventEmitter<GigaSidenavListItem> = new EventEmitter<GigaSidenavListItem>();


  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
  }

  addCurrentNav(item: GigaSidenavListItem) {
    if (!this.isCurrentNavItem) {
      this.selectNavItem.emit(item);
    }
  }

  loadIcon(item: GigaSidenavListItem) {
    if (item.svgUrl) {
      this.svgIconName = <string>item.svgUrl.split('/').pop();
      this.iconRegistry.addSvgIcon(this.svgIconName, this.sanitizer.bypassSecurityTrustResourceUrl(item.svgUrl));
    }
  }


}
