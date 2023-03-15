import {Observable} from 'rxjs';

export abstract class NgPatChartBase<Data, Config> {
  abstract layout(el: HTMLElement, config: Config): void;

  abstract resize(
    el: HTMLElement,
    size: DOMRectReadOnly,
    config: Config
  ): Observable<DOMRectReadOnly>;

  abstract data(el: HTMLElement, data: Data, config: Config): void;
}
