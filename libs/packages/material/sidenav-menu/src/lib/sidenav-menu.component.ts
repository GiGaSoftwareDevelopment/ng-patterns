import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidenavHeaderComponent} from './sidenav-header/sidenav-header.component';
import {SidenavMenuFactoryService} from './sidenav-menu-factory.service';
import {MatIconModule} from '@angular/material/icon';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {
  GigaSidenavData,
  GigaSidenavListItem,
  NgPatSidenavParams
} from './sidenav-menu.model';
import {LetModule} from '@ngrx/component';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NavItemLinkComponent} from './nav-item-link/nav-item-link.component';
import {takeUntil} from 'rxjs/operators';

function currentSidenavKey(item: GigaSidenavListItem): string {
  return item.route.join('-');
}

@Component({
  selector: 'ng-pat-sidenav-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    LetModule,
    MatExpansionModule,
    RouterLink,
    RouterLinkActive,
    NavItemLinkComponent
  ],
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ng-pat-sidenav-menu',
    '[class.is-collapsed]': 'isCollapsed'
  }
})
export class SidenavMenuComponent implements OnInit, OnDestroy {
  private _onDestroy$: Subject<boolean> = new Subject();
  private _currentSidenavListItemDict: {[key: string]: GigaSidenavListItem} =
    {};

  isCollapsed = false;
  sidenavData$: ReplaySubject<GigaSidenavData> = new ReplaySubject(1);
  currentSidenavItems$: BehaviorSubject<GigaSidenavListItem[]> =
    new BehaviorSubject<GigaSidenavListItem[]>([]);

  @Input() menuID = 'default';

  @Input()
  set sidenavData(data: GigaSidenavData) {
    if (data) {
      this.sidenavData$.next(data);
    }
  }

  @ContentChild(SidenavHeaderComponent, {static: true}) header:
    | SidenavHeaderComponent
    | undefined;

  params: NgPatSidenavParams = {
    opened: true,
    expandWidth: 256,
    mode: 'side'
  };

  @Output() sidenavParams: EventEmitter<NgPatSidenavParams> =
    new EventEmitter<NgPatSidenavParams>();

  @ViewChild(MatAccordion) matAccordion!: MatAccordion;

  constructor(
    private _menuFactorySvc: SidenavMenuFactoryService,
    private _cd: ChangeDetectorRef
  ) {}

  addCurrentNav(item: GigaSidenavListItem) {
    const key = currentSidenavKey(item);

    if (!this._currentSidenavListItemDict[key]) {
      this._currentSidenavListItemDict[key] = item;
      this.currentSidenavItems$.next(
        Object.values(this._currentSidenavListItemDict)
      );
    }

    if (this.matAccordion) {
      this.matAccordion.closeAll();
    }
  }

  removeCurrentNav(item: GigaSidenavListItem) {
    const key = currentSidenavKey(item);
    delete this._currentSidenavListItemDict[key];
    this.currentSidenavItems$.next(
      Object.values(this._currentSidenavListItemDict)
    );
  }

  ngOnInit() {
    if (this.header) {
      this.header.menuServiceID = this.menuID;
    }

    this._menuFactorySvc
      .getService(this.menuID)
      .isCollapsed$.pipe(takeUntil(this._onDestroy$))
      .subscribe((isCollapsed: boolean) => {
        this.isCollapsed = isCollapsed;
        this._cd.detectChanges();
      });
  }

  toggleSidenav() {
    this._menuFactorySvc.getService(this.menuID).toggleSidenav();
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
  }
}
