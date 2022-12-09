import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {
  GithubLogoComponent,
  UiuxLogoComponent
} from '@uiux/shared/ui-design-library';

@Component({
  selector: 'ng-patterns-app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    UiuxLogoComponent,
    GithubLogoComponent
  ],
  providers: [],
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent {
  logoName = 'uiux-with-angular-logo';

  githubLink = 'https://github.com/UIUXEngineering/ng-patterns';
}
