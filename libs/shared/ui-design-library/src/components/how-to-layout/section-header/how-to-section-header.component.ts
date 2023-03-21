import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'design-library-how-to-section-header, section-header',
  templateUrl: './how-to-section-header.component.html',
  styleUrls: ['./how-to-section-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'design-library-how-to-section-header'
  }
})
export class HowToSectionHeaderComponent {}
