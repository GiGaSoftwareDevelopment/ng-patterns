import {Component} from '@angular/core';
import {AppNavbarComponent} from './components/app-navbar/app-navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  standalone: true,
  selector: 'ng-patterns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [AppNavbarComponent, MatSidenavModule]
})
export class AppComponent {
  title = 'patterns';
}
