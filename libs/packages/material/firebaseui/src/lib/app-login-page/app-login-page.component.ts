import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import { OneTimeLoginIdComponent } from '../one-time-login-btn/one-time-login-id.component';
import { WindowService } from '@ngpat/utils';
import { FirebaseUiComponent } from '../firebase-ui/firebase-ui.component';

@Component({
  selector: 'ng-pat-app-login-page',
  standalone: true,
  imports: [ CommonModule, OneTimeLoginIdComponent, FirebaseUiComponent ],
  templateUrl: './app-login-page.component.html',
  styleUrls: ['./app-login-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ng-pat-app-login-page'
  }
})
export class AppLoginPageComponent {

  constructor(public win: WindowService) {
  }

}
