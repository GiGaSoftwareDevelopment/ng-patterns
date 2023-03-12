import {
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output
} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {
  GithubLogoComponent,
  NgPatternsLogoWithTextComponent
} from '@ngpat/shared/ui-design-library';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {Router} from '@angular/router';
import {UserAccountMenuComponent} from '@ngpat/material/firebaseui';
import {MatDrawerMode} from '@angular/material/sidenav';

@Component({
  selector: 'ng-patterns-app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    GithubLogoComponent,
    MatButtonModule,
    MatMenuModule,
    NgPatternsLogoWithTextComponent,
    UserAccountMenuComponent
  ],
  providers: [],
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent {
  @HostBinding('class.mat-elevation-z4') elevation = true;

  private _showSideOpenButton = false;

  @Input() mode: MatDrawerMode = 'over';
  @Input()
  set showSideOpenButton(value: boolean | undefined) {
    if (this._showSideOpenButton !== undefined) {
      this._showSideOpenButton = <boolean>value;
    }
  }

  get showSideOpenButton() {
    return this._showSideOpenButton;
  }

  @Output() openSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();

  githubLink = 'https://github.com/GiGaSoftwareDevelopment/ng-patterns';

  currentTheme = 'dark-theme';

  constructor(
    private _router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  selectTheme(theme: string) {
    if (theme === 'remove') {
      document.body.classList.remove('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.remove(this.currentTheme);
      this.currentTheme = theme;
      document.body.classList.add(theme);
    }
  }

  doLogin() {
    this._router.navigate(['login']);
  }
}
