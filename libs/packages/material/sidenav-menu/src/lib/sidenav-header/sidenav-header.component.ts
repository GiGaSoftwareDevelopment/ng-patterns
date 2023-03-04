import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ng-pat-sidenav-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav-header.component.html',
  styleUrls: ['./sidenav-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ng-pat-sidenav-header'
  }
})
export class SidenavHeaderComponent {}
