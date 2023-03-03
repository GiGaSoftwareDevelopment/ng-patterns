import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'pat-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundComponent {}
