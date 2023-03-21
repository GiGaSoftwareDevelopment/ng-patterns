import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'design-library-how-to-page-title, page-title',
  templateUrl: './how-to-page-title.component.html',
  styleUrls: ['./how-to-page-title.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'design-library-how-to-page-title'
  }
})
export class HowToPageTitleComponent {}
