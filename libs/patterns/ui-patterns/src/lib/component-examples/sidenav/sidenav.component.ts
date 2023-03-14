import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HighlightModule} from 'ngx-highlightjs';

@Component({
  selector: 'pat-sidenav',
  standalone: true,
  imports: [CommonModule, HighlightModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'sample-page-layout'
  }
})
export class SidenavComponent {
  install = `
    npm install @ngpat/material @ngpat/store

    # or

    yarn add @ngpat/material @ngpat/store

    `;
}
