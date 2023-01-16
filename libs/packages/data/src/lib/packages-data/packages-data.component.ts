import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'uiux',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packages-data.component.html',
  styleUrls: ['./packages-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagesDataComponent {}
