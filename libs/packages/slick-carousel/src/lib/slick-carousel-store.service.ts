import { Injectable } from '@angular/core';
import {
  defaultSlickCarouselSettings,
  NgPatSlickCarouselSettings,
  TranslateTrackParams
} from '@ngpat/slick-carousel';
import {
  BehaviorSubject,
  distinctUntilKeyChanged,
  Observable,
  Subject
} from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

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

  destroy() {}
}
