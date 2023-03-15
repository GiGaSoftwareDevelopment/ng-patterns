import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgPatColorPickerComponent} from './ng-pat-color-picker.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [NgPatColorPickerComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [NgPatColorPickerComponent]
})
export class UiColorPickerModule {}
