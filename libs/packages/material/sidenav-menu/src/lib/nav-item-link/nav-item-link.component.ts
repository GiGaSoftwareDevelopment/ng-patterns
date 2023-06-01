import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GigaSidenavListItem } from '../sidenav-menu.model';
import { BehaviorSubject, combineLatestWith, ReplaySubject } from 'rxjs';
import { LetDirective, PushPipe } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgPatSidenavMenuFactoryService } from '../ng-pat-sidenav-menu-factory.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ng-pat-nav-item-link',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LetDirective,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    PushPipe
  ],
  templateUrl: './nav-item-link.component.html',
  styleUrls: ['./nav-item-link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ng-pat-nav-item-link',
    '[class.is-current-nav-item]': '_isCurrentNavItem'
  }
})
export class NavItemLinkComponent {
  routeItem$: ReplaySubject<GigaSidenavListItem> =
    new ReplaySubject<GigaSidenavListItem>(1);
  initial = '';
  useInitial = false;
  useIcon = false;
  useSvg = false;
  svgIcon = '';
  svgIconName = '';

  @Input()
  set routeItem(r: GigaSidenavListItem) {
    if (r == undefined && r == null) {
      return;
    }

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

  isCurrentNavItem$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  _isCurrentNavItem = false;

  @Input()
  set isCurrentNavItem(b: boolean) {
    this._isCurrentNavItem = b;
    this.isCurrentNavItem$.next(b);
  }

  menuID$: ReplaySubject<string> = new ReplaySubject<string>(1);

  @Input()
  set menuID(m: string | undefined) {
    if (m) {
      this.menuID$.next(m);
    }
  }

  @Output() selectNavItem: EventEmitter<GigaSidenavListItem> =
    new EventEmitter<GigaSidenavListItem>();
  @Output() removeNavItem: EventEmitter<GigaSidenavListItem> =
    new EventEmitter<GigaSidenavListItem>();

  tooltipDisabled$ = this.menuID$.pipe(
    switchMap((menuID: string) => {
      return this._menuFactorySvc.getService(menuID).isCollapsed$.pipe(
        combineLatestWith(this.isCurrentNavItem$),
        map(([isCollapsed, isCurrentNavItem]: [boolean, boolean]) => {
          return !(isCollapsed && isCurrentNavItem);
        })
      );
    })
  );

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private _menuFactorySvc: NgPatSidenavMenuFactoryService
  ) {}

  addCurrentNav(item: GigaSidenavListItem) {
    if (!this.isCurrentNavItem) {
      this.selectNavItem.emit(item);
    }
  }

  loadIcon(item: GigaSidenavListItem) {
    if (item.svgUrl) {
      this.svgIconName = <string>item.svgUrl.split('/').pop();
      this.iconRegistry.addSvgIcon(
        this.svgIconName,
        this.sanitizer.bypassSecurityTrustResourceUrl(item.svgUrl)
      );
    }
  }
}
