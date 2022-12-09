import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {LetModule} from '@ngrx/component';
import {MatButtonModule} from '@angular/material/button';
import {WINDOW_PROVIDERS, WindowService} from '@uiux/utils';

@Component({
  selector: 'design-library-github-logo',
  standalone: true,
  imports: [CommonModule, LetModule, MatButtonModule, MatIconModule],
  providers: [WINDOW_PROVIDERS, WindowService],
  templateUrl: './github-logo.component.html',
  styleUrls: ['./github-logo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubLogoComponent implements OnDestroy {
  private _onDestroy$: Subject<boolean> = new Subject();
  showIconButton$: Observable<boolean>;
  @HostBinding('class.design-library-github-logo') hostClass = true;

  @Input() githubLink = '';
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    breakpointObserver: BreakpointObserver,
    private _win: WindowService
  ) {
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/ui-design-library/github-circle-white-transparent.svg'
      )
    );

    this.showIconButton$ = breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(
        takeUntil(this._onDestroy$),
        map(result => {
          console.log(result);
          return result.matches;
        })
      );
  }

  openGithubLink() {
    if (this.githubLink && this.githubLink.length > 0) {
      this._win.open(this.githubLink, '_blank');
    }
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }
}
