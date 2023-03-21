import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'design-library-highlight-html, highlight-html',
  templateUrl: './highlight-html.component.html',
  styleUrls: ['./highlight-html.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HighlightHtmlComponent {
  @Input() inline = false;
  @Input() highlight: string = '';
}
