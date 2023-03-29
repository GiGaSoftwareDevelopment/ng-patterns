import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLinkComponent } from '@ngpat/material/link';

@Component({
  selector: 'ng-patterns-home',
  standalone: true,
  imports: [CommonModule, ButtonLinkComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  @HostBinding('class.ng-patterns-home') bind = true;
}
