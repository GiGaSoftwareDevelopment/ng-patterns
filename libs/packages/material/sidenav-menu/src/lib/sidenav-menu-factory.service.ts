import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface SidenavMenuState {

  mode: MatDrawerMode;
  isOpen: boolean;

  isCollapsed: boolean;

}

export class SidenavMenuService extends ComponentStore<SidenavMenuState> {



  constructor() {
    super({
      mode: 'side',
      isOpen: true,
      isCollapsed: false
    });
  }

  readonly setMode = this.updater((state: SidenavMenuState, mode: MatDrawerMode): SidenavMenuState => ({
    ...state,
    mode
  }));

  readonly mode$: Observable<MatDrawerMode> = this.select(state => state.mode);

  readonly setIsOpen = this.updater((state: SidenavMenuState, isOpen: boolean): SidenavMenuState => ({
    ...state,
    isOpen
  }));

  readonly isOpen$: Observable<boolean> = this.select(state => state.isOpen);

  readonly setIsCollapsed = this.updater((state: SidenavMenuState, isCollapsed: boolean): SidenavMenuState => ({
    ...state,
    isCollapsed
  }));

  readonly isCollapsed$: Observable<boolean> = this.select(state => state.isCollapsed);
  readonly notCollapsed$: Observable<boolean> = this.select(state => !state.isCollapsed);


  toggleSidenav(): void {
    this.state$.pipe(
      take(1),
      map((state: SidenavMenuState) => {
        if (state.mode === 'side') {
          return {
            ...state,
            isCollapsed: !state.isCollapsed
          }
        } else {
          return {
            ...state,
            isOpen: !state.isOpen
          }
        }
      })
    ).subscribe((state: SidenavMenuState) => {
      this.setState(state);
    })
  }

}

@Injectable({
  providedIn: 'root'
})
export class SidenavMenuFactoryService {

  private _services: Map<string, SidenavMenuService> = new Map();

  service(menuID: string): SidenavMenuService {

    if (!this._services.has(menuID)) {
      this._services.set(menuID, new SidenavMenuService());
    }

    return <SidenavMenuService>this._services.get(menuID);
  }

}
