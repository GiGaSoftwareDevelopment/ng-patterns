import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  colorBackground,
  ColorConfig,
  UiColorPickerModule
} from '@ngpat/material/color-picker';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {PushModule} from '@ngrx/component';
import {NgPatPopoverModule} from '@ngpat/material/popover';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkOverlayOrigin} from '@angular/cdk/overlay';

@Component({
  selector: 'pat-color-picker',
  standalone: true,
  imports: [
    CommonModule,
    UiColorPickerModule,
    PushModule,
    NgPatPopoverModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CdkOverlayOrigin
  ],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'sample-page-layout'
  }
})
export class ColorPickerComponent {
  colorOutput$: ReplaySubject<ColorConfig> = new ReplaySubject<ColorConfig>();

  backgroundColorCss$: Observable<string> = this.colorOutput$.pipe(
    map(colorBackground)
  );
}
