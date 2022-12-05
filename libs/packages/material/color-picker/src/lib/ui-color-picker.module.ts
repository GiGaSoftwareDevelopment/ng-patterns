import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiColorPickerComponent} from './ui-color-picker.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [UiColorPickerComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [UiColorPickerComponent]
})
export class UiColorPickerModule {}
