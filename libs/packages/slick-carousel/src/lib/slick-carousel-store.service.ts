import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilKeyChanged,
  Observable,
  Subject
} from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  defaultSlickCarouselSettings,
  NgPatSlickCarouselSettings,
  TranslateTrackParams
} from './slick-carousel.model';

export interface UpdateSettings {
  breakpoint: number | null;
  settings: NgPatSlickCarouselSettings;
}

@Injectable()
export class SlickCarouselStore {
  private _onDestroy$: Subject<boolean> = new Subject();
  private _originalSettings: NgPatSlickCarouselSettings = {
    ...defaultSlickCarouselSettings
  };

  set originalSettings(s: Partial<NgPatSlickCarouselSettings>) {
    this._originalSettings = {
      ...this._originalSettings,
      ...s
    };
  }

  get originalSettings(): NgPatSlickCarouselSettings {
    return this._originalSettings;
  }

  updateSettings: Subject<UpdateSettings> = new Subject<UpdateSettings>();

  state$: BehaviorSubject<NgPatSlickCarouselSettings> =
    new BehaviorSubject<NgPatSlickCarouselSettings>({
      ...defaultSlickCarouselSettings
    });

  speed$: Observable<number> = this.state$.pipe(
    map((state: NgPatSlickCarouselSettings) => state.speed)
  );

  arrows$: Observable<boolean> = this.state$.pipe(
    map((state: NgPatSlickCarouselSettings) => state.arrows)
  );

  dots$: Observable<boolean> = this.state$.pipe(
    map((state: NgPatSlickCarouselSettings) => state.dots)
  );

  slidesToScroll$: Observable<number> = this.state$.pipe(
    map((state: NgPatSlickCarouselSettings) => state.slidesToScroll)
  );

  draggable$: Observable<boolean> = this.state$.pipe(
    map((state: NgPatSlickCarouselSettings) => state.draggable)
  );

  translateTrackParams$: Observable<TranslateTrackParams> = this.state$.pipe(
    map((state: NgPatSlickCarouselSettings) => {
      return {
        slidesToScroll: state.slidesToScroll,
        slidesToShow: state.slidesToShow
      };
    })
  );

  get infinite() {
    return this.state$.value.infinite;
  }

  get draggable() {
    return this.state$.value.draggable;
  }

  get speed() {
    return this.state$.value.speed;
  }

  constructor() {
    this.updateSettings
      .pipe(takeUntil(this._onDestroy$), distinctUntilKeyChanged('breakpoint'))
      .subscribe((u: UpdateSettings) => {
        console.log(u);
        this.next(u.settings);
      });
  }

  next(state: Partial<NgPatSlickCarouselSettings>): void {
    this.state$.next({
      ...this.state$.value,
      ...state
    });
  }

  destroy() {
    this._onDestroy$.next(true);
  }
}
