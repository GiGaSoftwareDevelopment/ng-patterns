import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'pat-zone-pipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zone-pipe.component.html',
  styleUrls: ['./zone-pipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'sample-page-layout'
  }
})
export class ZonePipeComponent {}
