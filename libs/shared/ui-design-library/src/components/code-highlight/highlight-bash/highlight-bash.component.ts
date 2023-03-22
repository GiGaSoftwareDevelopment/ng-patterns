import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'design-library-highlight-bash, highlight-bash',
  templateUrl: './highlight-bash.component.html',
  styleUrls: ['./highlight-bash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'design-library-highlight-bash'
  }
})
export class HighlightBashComponent {
  @Input() inline = false;
  @Input() highlight: string = '';
}
