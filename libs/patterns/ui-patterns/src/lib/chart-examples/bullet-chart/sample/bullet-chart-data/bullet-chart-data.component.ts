import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output, ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { BulletChartData } from '@uiux/charts/bullet-chart';
import { toFloatOrDefault } from '@uiux/charts';
import { bulletChartDataInitial } from '../bullet-chart-data-initial';

@Component({
  selector: 'pat-bullet-chart-data',
  templateUrl: './bullet-chart-data.component.html',
  styleUrls: ['./bullet-chart-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BulletChartDataComponent implements OnInit {
  dataForm: FormGroup;

  @Output()
  dataChange: EventEmitter<BulletChartData> = new EventEmitter();

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
