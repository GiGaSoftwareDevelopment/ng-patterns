import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BulletChartConfig } from '@ngpat/charts/bullet-chart';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { bulletChartConfigInitial } from '../bullet-chart-data-initial';

@Component({
  standalone: true,
  selector: 'pat-bullet-chart-config',
  templateUrl: './sample-bullet-chart-config.component.html',
  styleUrls: ['./sample-bullet-chart-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class SampleBulletChartConfigComponent implements OnInit {
  configForm: FormGroup;

  @Output()
  configChange: EventEmitter<BulletChartConfig> = new EventEmitter();

  @Output() reversedChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private _fb: FormBuilder, private _cd: ChangeDetectorRef) {
    this.configForm = this._fb.group({
      title: new FormControl(bulletChartConfigInitial.title),
      maxTooltipWidth: new FormControl(bulletChartConfigInitial.maxTooltipWidth),
      description: new FormControl(bulletChartConfigInitial.description),
      tooltipReversed: new FormControl(bulletChartConfigInitial.tooltipReversed)
    });
  }


  ngOnInit(): void {

    // this.configChange.emit(this.configForm.value);

    this.configForm.valueChanges.subscribe((c: BulletChartConfig) => {
      this.configChange.emit(c);
    });
  }


  clearValue(prop: string): void {
    const value = {...this.configForm.value};
    value[prop] = null;

    this.configForm.setValue(value, {emitEvent: false});
  }
}
