import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ng-pat-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './remote-login.component.html',
  styleUrls: ['./remote-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteLoginComponent {}
