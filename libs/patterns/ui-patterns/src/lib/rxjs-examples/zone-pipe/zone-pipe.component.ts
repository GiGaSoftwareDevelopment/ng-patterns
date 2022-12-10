import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'patterns-zone-pipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zone-pipe.component.html',
  styleUrls: ['./zone-pipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZonePipeComponent {}
