import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { WindowDimensions } from './window.factory';

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

  public get nativeWindow(): Window {
    return this._win ? this._win : window;
  }

  get isMobileDevice() {
    return Capacitor.isNativePlatform();
  }

  get isBrowser() {
    return !Capacitor.isNativePlatform();
  }

  constructor(@Optional() private _win: Window) {
    this.onWindowResize$.next({
      width: this.nativeWindow.innerWidth,
      height: this.nativeWindow.innerHeight
    });

    this.onDocumentResize$.next({
      width: this.nativeWindow.document.documentElement.clientWidth,
      height: this.nativeWindow.document.documentElement.clientHeight
    });

    this.innerWidth = this.nativeWindow.innerWidth;
    this.innerHeight = this.nativeWindow.innerHeight;

    this.clientWidth = this.nativeWindow.document.documentElement.clientWidth;
    this.clientHeight = this.nativeWindow.document.documentElement.clientHeight;

    this.nativeWindow.addEventListener('resize', () => {
      this.onWindowResize$.next({
        width: this.nativeWindow.innerWidth,
        height: this.nativeWindow.innerHeight
      });

      this.onDocumentResize$.next({
        width: this.nativeWindow.document.documentElement.clientWidth,
        height: this.nativeWindow.document.documentElement.clientHeight
      });

      this.onResizeEvent$.next(true);
    });
  }

  open(url: string, target = '_blank'): void {
    /**
     * Open auth app in new browser with One Time Login ID as
     * query param
     */
    if (Capacitor.isNativePlatform()) {
      Browser.open({url}).then(() => {
        /* noop */
      });
    } else {
      this.nativeWindow.open(url, target);
    }
  }
}
