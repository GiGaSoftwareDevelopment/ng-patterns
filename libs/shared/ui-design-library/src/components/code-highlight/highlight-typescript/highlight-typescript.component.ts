import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'design-library-highlight-typescript, highlight-typescript',
  templateUrl: './highlight-typescript.component.html',
  styleUrls: ['./highlight-typescript.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HighlightTypescriptComponent {
  @Input() inline = false;
  @Input() highlight: string = '';
}
