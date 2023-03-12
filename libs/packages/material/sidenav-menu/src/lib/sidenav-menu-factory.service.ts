import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {MatDrawerMode} from '@angular/material/sidenav';
import {combineLatestWith, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';

export interface SidenavMenuState {
  opened: boolean;

  isCollapsed: boolean;
  expandedWidth: number;
  collapsedWidth: number;
}

export class SidenavMenuService extends ComponentStore<SidenavMenuState> {
  readonly opened$: Observable<boolean> = this.select(state => state.opened);

  readonly setIsOpen = this.updater(
    (state, opened: boolean): SidenavMenuState => ({
      ...state,
      isCollapsed: false,
      opened
    })
  );
  readonly isCollapsed$: Observable<boolean> = this.select(
    state => state.isCollapsed
  );

  readonly setCollapsed = this.updater(
    (state, isCollapsed: boolean): SidenavMenuState => ({
      ...state,
      isCollapsed
    })
  );

  private isWithinBreakpointRange$: Observable<boolean> =
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        map((result: BreakpointState) => {
          return (
            result.breakpoints[Breakpoints.XSmall] ||
            result.breakpoints[Breakpoints.Small]
          );
        })
      );

  readonly expandedWidth$: Observable<number> =
    this.isWithinBreakpointRange$.pipe(
      combineLatestWith(this.state$),
      map(([isWithinBreakpointRange, state]: [boolean, SidenavMenuState]) => {
        if (isWithinBreakpointRange) {
          return 0;
        }

        return state.isCollapsed ? state.collapsedWidth : state.expandedWidth;
      })
    );

  readonly mode$: Observable<MatDrawerMode> = <Observable<MatDrawerMode>>(
    this.isWithinBreakpointRange$.pipe(
      map((isWithinBreakpointRange: boolean) => {
        return isWithinBreakpointRange ? 'over' : 'side';
      })
    )
  );

  readonly showNavBarOpenButton$: Observable<boolean> = this.mode$.pipe(
    map((mode: MatDrawerMode) => {
      return mode === 'over';
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {
    super();
  }

  init(state: Partial<SidenavMenuState> = {}): void {
    this.setState({
      opened: true,
      isCollapsed: false,
      expandedWidth: 256,
      collapsedWidth: 68,
      ...state
    });

    this.isWithinBreakpointRange$.subscribe(
      (isWithinBreakpointRange: boolean) => {
        if (!isWithinBreakpointRange) {
          this.setIsOpen(true);
        } else {
          this.setCollapsed(false);
        }
      }
    );
  }

  toggleSidenav(): void {
    this.isWithinBreakpointRange$
      .pipe(
        combineLatestWith(this.state$),
        take(1),
        map(([isWithinBreakpointRange, state]: [boolean, SidenavMenuState]) => {
          if (isWithinBreakpointRange) {
            return {
              ...state,
              opened: false,
              isCollapsed: false
            };
          } else {
            return {
              ...state,
              isCollapsed: !state.isCollapsed
            };
          }
        })
      )
      .subscribe((state: SidenavMenuState) => {
        this.setState(state);
      });
  }
}

@Injectable({
  providedIn: 'root'
})
export class SidenavMenuFactoryService {
  private _services: Map<string, SidenavMenuService> = new Map();

  constructor(private breakpointObserver: BreakpointObserver) {}

  getService(menuID: string = 'default'): SidenavMenuService {
    if (!this._services.has(menuID)) {
      this._services.set(
        menuID,
        new SidenavMenuService(this.breakpointObserver)
      );
    }

    return <SidenavMenuService>this._services.get(menuID);
  }
}
