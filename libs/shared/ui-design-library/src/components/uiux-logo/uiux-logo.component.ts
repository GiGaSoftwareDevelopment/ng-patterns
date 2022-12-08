import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule
} from '@angular/cdk/layout';
import {map, takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {LetModule} from '@ngrx/component';

enum breakpointKeysEnum {
  XSmall = 'XSmall',
  Small = 'Small',
  GTSmall = 'GTSmall'
}

@Component({
  selector: 'design-library-uiux-logo',
  standalone: true,
  imports: [CommonModule, MatIconModule, LayoutModule, LetModule],
  templateUrl: './uiux-logo.component.html',
  styleUrls: ['./uiux-logo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiuxLogoComponent implements OnDestroy {
  private _onDestroy$: Subject<boolean> = new Subject();

  @HostBinding('class.design-library-uiux-logo') hostClass = true;

  smallLogo = 'UiUx_logo';
  mediumLogo = 'UiUx_with_Angular_logo';
  largeLogo = 'UiUx_patterns_with_Angular_logo';

  breakpointKeys = breakpointKeysEnum;

  breakpointQueryParams: {[key: string]: string} = {
    [breakpointKeysEnum.XSmall]: Breakpoints.XSmall,
    [breakpointKeysEnum.Small]: Breakpoints.Small,
    [breakpointKeysEnum.GTSmall]: '(min-width: 960px)'
  };

  breakpointQuery$: Observable<string>;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    breakpointObserver: BreakpointObserver
  ) {
    iconRegistry.addSvgIcon(
      this.smallLogo,
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/ui-design-library/UiUx_logo.svg'
      )
    );
    iconRegistry.addSvgIcon(
      this.mediumLogo,
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/ui-design-library/UiUx_with_Angular_logo.svg'
      )
    );
    iconRegistry.addSvgIcon(
      this.largeLogo,
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/ui-design-library/UiUx_patterns_with_Angular_logo.svg'
      )
    );

    this.breakpointQuery$ = breakpointObserver
      .observe(Object.values(this.breakpointQueryParams))
      .pipe(
        takeUntil(this._onDestroy$),
        map(result => {
          for (const query of Object.keys(this.breakpointQueryParams)) {
            if (result.breakpoints[this.breakpointQueryParams[query]]) {
              return query;
            }
          }

          return 'XSmall';
        })
      );
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
  }
}
