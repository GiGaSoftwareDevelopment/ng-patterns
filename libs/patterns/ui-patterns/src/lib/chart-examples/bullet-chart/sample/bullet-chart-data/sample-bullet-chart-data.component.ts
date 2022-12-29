import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BulletChartData } from '@uiux/charts/bullet-chart';
import { toFloatOrDefault } from '@uiux/charts';
import { bulletChartDataInitial } from '../bullet-chart-data-initial';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  standalone: true,
  selector: 'pat-bullet-chart-data',
  templateUrl: './sample-bullet-chart-data.component.html',
  styleUrls: ['./sample-bullet-chart-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule
  ]
})
export class SampleBulletChartDataComponent implements OnInit {
  dataForm: FormGroup;

  @Output()
  dataChange: EventEmitter<BulletChartData> = new EventEmitter();

  min = bulletChartDataInitial.min;
  max = bulletChartDataInitial.max;


  constructor(private _fb: FormBuilder, private _cd: ChangeDetectorRef) {
    this.dataForm = this._fb.group({
      max: new FormControl(bulletChartDataInitial.max),
      min: new FormControl(bulletChartDataInitial.min),
      progress: new FormControl(bulletChartDataInitial.progress),
      units: new FormControl(bulletChartDataInitial.units)
    });
  }

  ngOnInit(): void {
    this.dataForm.valueChanges.subscribe((c: BulletChartData) => {
      this.dataChange.emit({
        min: toFloatOrDefault(c.min),
        max: toFloatOrDefault(c.max),
        progress: toFloatOrDefault(c.progress),
        units: c.units,
        chartDataState: null,
      });

      this.min = c.min;
      this.max = c.max;
      this._cd.detectChanges();
    });
  }

  // ngAfterViewInit() {
  //   this.dataForm.reset({
  //     max: 2,
  //     min: 0,
  //     progress: 1,
  //     units: 'GB'
  //   });
  // }

  clearValue(prop: string): void {
    const value = {...this.dataForm.value};
    value[prop] = null;

    this.dataForm.setValue(value, {emitEvent: false});
  }
}
