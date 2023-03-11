import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavHeaderComponent } from './sidenav-header/sidenav-header.component';
import { SidenavMenuFactoryService, SidenavMenuState } from './sidenav-menu-factory.service';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { GigaSidenavData, GigaSidenavListItem } from './sidenav-menu.model';
import { LetModule } from '@ngrx/component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItemLinkComponent } from './nav-item-link/nav-item-link.component';

function currentSidenavKey(item: GigaSidenavListItem): string {
  return item.route.join('-');
}

@Component({
  selector: 'ng-pat-sidenav-menu',
  standalone: true,
  imports: [ CommonModule, MatIconModule, LetModule, MatExpansionModule, RouterLink, RouterLinkActive, NavItemLinkComponent ],
  templateUrl: './sidenav-menu.component.html',
  styleUrls: [ './sidenav-menu.component.scss' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ng-pat-sidenav-menu',
    '[class.is-collapsed]': 'isCollapsed',
    '[style.width,px]': '_width'
  }
})
export class SidenavMenuComponent implements OnInit, AfterViewInit {

  @Input() menuID = 'default';

  @Input() expandedWidth = 256;
  @Input() collapsedWidth = 48;


  sidenavData$: ReplaySubject<GigaSidenavData> = new ReplaySubject(1)
  currentSidenavItems$: BehaviorSubject<GigaSidenavListItem[]> = new BehaviorSubject<GigaSidenavListItem[]>([]);

  @Input()
  set sidenavData(data: GigaSidenavData) {
    if (data) {
      this.sidenavData$.next(data);
    }
  }

  _width = 256;
  isCollapsed = false;

  private _currentSidenavListItemDict: { [key: string]: GigaSidenavListItem } = {}

  @ContentChild(SidenavHeaderComponent, { static: true }) header: SidenavHeaderComponent | undefined;


  @Output() expandWidth: EventEmitter<number> = new EventEmitter<number>();


  @ViewChild(MatAccordion) matAccordion!: MatAccordion;

  constructor(private _menuFactorySvc: SidenavMenuFactoryService, private _cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._menuFactorySvc.service(this.menuID).state$.subscribe((menuState: SidenavMenuState) => {
      this.isCollapsed = menuState.isCollapsed;

      if (menuState.isCollapsed) {
        this._width = this.collapsedWidth;
      } else {
        this._width = this.expandedWidth;
      }

      this.expandWidth.emit(this._width);

      this._cd.detectChanges();
      this._cd.markForCheck();
    })
  }

  addCurrentNav(item: GigaSidenavListItem) {

    const key = currentSidenavKey(item);

    if (!this._currentSidenavListItemDict[key]) {
      this._currentSidenavListItemDict[key] = item;
      this.currentSidenavItems$.next(Object.values(this._currentSidenavListItemDict));
    }

    if (this.matAccordion) {
      this.matAccordion.closeAll();
    }
  }

  removeCurrentNav(item: GigaSidenavListItem) {
    const key = currentSidenavKey(item);
    delete  this._currentSidenavListItemDict[key];
    this.currentSidenavItems$.next(Object.values(this._currentSidenavListItemDict));
  }

  ngAfterViewInit() {
    if (this.header) {
      this.header.menuServiceID = this.menuID;
    }
  }

  toggleSidenav() {
    this._menuFactorySvc.service(this.menuID).toggleSidenav();
  }
}
