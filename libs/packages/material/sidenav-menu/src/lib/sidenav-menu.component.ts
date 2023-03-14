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
import {
  BehaviorSubject,
  mergeMap,
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import {
  GigaSidenavData,
  GigaSidenavListItem,
  NgPatSidenavParams,
  SidenavMenuLocalStorageItem
} from './sidenav-menu.model';
import {LetModule} from '@ngrx/component';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NavItemLinkComponent} from './nav-item-link/nav-item-link.component';
import {map, take, takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {BrowserStorageItem, selectItemByKey} from '@ngpat/store';
import {createLocalStorageKey} from './sidenav-menu.fns';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray
} from '@angular/cdk/drag-drop';

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
    NavItemLinkComponent,
    DragDropModule
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

  isCollapsed = false;
  sidenavData$: ReplaySubject<GigaSidenavData> = new ReplaySubject(1);

  private _menuID$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'default'
  );

  @Input()
  set menuID(id: string) {
    if (id && id.length) {
      this._menuID$.next(id);
    }
  }

  currentSidenavItems$: Observable<GigaSidenavListItem[]> = this._menuID$.pipe(
    mergeMap((menuID: string) => {
      return this.store
        .select(selectItemByKey(createLocalStorageKey(menuID)))
        .pipe(
          // eslint-disable-next-line @ngrx/avoid-mapping-selectors
          map((browserStorageItem: BrowserStorageItem | undefined) => {
            if (browserStorageItem) {
              return (<SidenavMenuLocalStorageItem[]>(
                Object.values(browserStorageItem.value)
              ))
                .sort(
                  (
                    a: SidenavMenuLocalStorageItem,
                    b: SidenavMenuLocalStorageItem
                  ) => {
                    return a.sort - b.sort;
                  }
                )
                .map((b: SidenavMenuLocalStorageItem) => b.item);
            }

            return [];
          })
        );
    })
  );

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
    private _cd: ChangeDetectorRef,
    private store: Store
  ) {}

  addCurrentNav(item: GigaSidenavListItem) {
    this._menuFactorySvc
      .getService(this._menuID$.value)
      .addCurrentNavItem(item, this._menuID$.value);

    if (this.matAccordion) {
      this.matAccordion.closeAll();
    }
  }

  removeCurrentNav(item: GigaSidenavListItem) {
    this._menuFactorySvc
      .getService(this._menuID$.value)
      .removeCurrentNavItem(item, this._menuID$.value);
  }

  ngOnInit() {
    if (this.header) {
      this.header.menuServiceID = this._menuID$.value;
    }

    this._menuFactorySvc
      .getService(this._menuID$.value)
      .isCollapsed$.pipe(takeUntil(this._onDestroy$))
      .subscribe((isCollapsed: boolean) => {
        this.isCollapsed = isCollapsed;
        this._cd.detectChanges();
      });
  }

  toggleSidenav() {
    this._menuFactorySvc.getService(this._menuID$.value).toggleSidenav();
  }

  drop(event: CdkDragDrop<string[]>) {
    this._menuFactorySvc
      .getService(this._menuID$.value)
      .updateSortOnDrop(event, this._menuID$.value);
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
  }
}
