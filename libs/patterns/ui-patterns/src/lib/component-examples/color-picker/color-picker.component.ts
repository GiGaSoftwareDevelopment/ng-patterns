import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import { colorBackground, ColorConfig, UiColorPickerModule } from '@uiux/material/color-picker';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PushModule } from '@ngrx/component';
import { UiPopoverModule } from '@uiux/material/popover';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'pat-color-picker',
  standalone: true,
  imports: [ CommonModule, UiColorPickerModule, PushModule, UiPopoverModule, MatIconModule ],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent {
  colorOutput$: ReplaySubject<ColorConfig> = new ReplaySubject<ColorConfig>();

  backgroundColorCss$: Observable<string> = this.colorOutput$.pipe(map(colorBackground));
}
