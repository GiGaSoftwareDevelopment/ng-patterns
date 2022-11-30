import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

import {Browser} from '@capacitor/browser';
import {Capacitor} from '@capacitor/core';
import { WINDOW, WindowDimensions } from './window.factory';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  onWindowResize$: BehaviorSubject<WindowDimensions> =
    new BehaviorSubject<WindowDimensions>({width: 0, height: 0});
  onDocumentResize$: BehaviorSubject<WindowDimensions> =
    new BehaviorSubject<WindowDimensions>({width: 0, height: 0});
  onResizeEvent$: Subject<boolean> = new Subject();

  innerWidth = 0;
  innerHeight = 0;

  clientWidth = 0;
  clientHeight = 0;

  constructor(@Inject(WINDOW) private _win: Window) {
    this.onWindowResize$.next({
      width: this._win.innerWidth,
      height: this._win.innerHeight
    });

    this.onDocumentResize$.next({
      width: this._win.document.documentElement.clientWidth,
      height: this._win.document.documentElement.clientHeight
    });

    this.innerWidth = this._win.innerWidth;
    this.innerHeight = this._win.innerHeight;

    this.clientWidth = this._win.document.documentElement.clientWidth;
    this.clientHeight = this._win.document.documentElement.clientHeight;

    this._win.addEventListener('resize', () => {
      this.onWindowResize$.next({
        width: this._win.innerWidth,
        height: this._win.innerHeight
      });

      this.onDocumentResize$.next({
        width: this._win.document.documentElement.clientWidth,
        height: this._win.document.documentElement.clientHeight
      });

      this.onResizeEvent$.next(true);
    });
  }

  open(url: string, target: string = '_blank'): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    /**
     * Open auth app in new browser with One Time Login ID as
     * query param
     */
    if (Capacitor.isNativePlatform()) {
      Browser.open({url}).then(() => {
        /* noop */
      });
    } else {
      that._win.open(url, target);
    }
  }
}
