import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'design-library-page-header, page-header',
  templateUrl: './how-to-page-header.component.html',
  styleUrls: ['./how-to-page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'design-library-page-header'
  }
})
export class HowToPageHeaderComponent {}
