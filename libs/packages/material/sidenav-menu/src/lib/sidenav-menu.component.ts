import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ng-pat-sidenav-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ng-pat-sidenav-menu'
  }
})
export class SidenavMenuComponent {}
