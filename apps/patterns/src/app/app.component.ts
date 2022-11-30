import { Component } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  selector: 'ng-patterns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NxWelcomeComponent,
  ]
})
export class AppComponent {
  title = 'patterns';
}
