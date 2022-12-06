import {Component} from '@angular/core';
import {AppNavbarComponent} from './components/app-navbar/app-navbar.component';

@Component({
  standalone: true,
  selector: 'ng-patterns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [AppNavbarComponent]
})
export class AppComponent {
  title = 'patterns';
}
