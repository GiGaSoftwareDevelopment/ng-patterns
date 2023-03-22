import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'design-library-highlight-scss, highlight-scss',
  templateUrl: './highlight-scss.component.html',
  styleUrls: ['./highlight-scss.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'design-library-highlight-scss'
  }
})
export class HighlightScssComponent {
  @Input() inline = false;
  @Input() highlight: string = '';
}
