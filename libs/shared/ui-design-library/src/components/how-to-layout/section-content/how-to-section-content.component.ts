import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'design-library-how-to-section-content, section-content',
  templateUrl: './how-to-section-content.component.html',
  styleUrls: ['./how-to-section-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'design-library-how-to-section-content'
  }
})
export class HowToSectionContentComponent {}
