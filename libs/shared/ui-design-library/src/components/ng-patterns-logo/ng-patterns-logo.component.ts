import {
  ChangeDetectionStrategy,
  Component, EventEmitter, HostBinding, OnDestroy, Output,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { map, takeUntil } from 'rxjs/operators';
import { LetModule } from '@ngrx/component';

enum breakpointKeysEnum {
  XSmall = 'XSmall',
  Small = 'Small',
  GTSmall = 'GTSmall'
}

@Component({
  selector: 'design-library-ng-patterns-logo',
  standalone: true,
  imports: [CommonModule, MatIconModule, LayoutModule, LetModule],
  templateUrl: './ng-patterns-logo.component.html',
  styleUrls: ['./ng-patterns-logo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgPatternsLogoComponent implements OnDestroy {
  private _onDestroy$: Subject<boolean> = new Subject();

  @HostBinding('class.design-library-ng-patterns-logo') hostClass = true;

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

  @Output() clickAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    breakpointObserver: BreakpointObserver
  ) {
    iconRegistry.addSvgIcon(
      this.smallLogo,
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/ui-design-library/ngpat_logo.svg'
      )
    );
    iconRegistry.addSvgIcon(
      this.mediumLogo,
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/ui-design-library/ngpat_with_angular_logo.svg'
      )
    );
    iconRegistry.addSvgIcon(
      this.largeLogo,
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/ui-design-library/ng_patterns_with_angular_logo.svg'
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
    this._onDestroy$.complete();
  }
}
