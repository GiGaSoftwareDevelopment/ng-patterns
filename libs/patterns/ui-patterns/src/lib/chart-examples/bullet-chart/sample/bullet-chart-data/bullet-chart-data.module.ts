import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BulletChartDataComponent} from './bullet-chart-data.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [BulletChartDataComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSliderModule
    ],
  exports: [BulletChartDataComponent]
})
export class BulletChartDataModule {}
