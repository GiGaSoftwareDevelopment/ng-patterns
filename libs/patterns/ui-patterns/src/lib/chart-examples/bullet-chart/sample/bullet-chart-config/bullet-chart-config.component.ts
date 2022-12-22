import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { BulletChartConfig } from '@uiux/charts/bullet-chart';
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
  templateUrl: './bullet-chart-config.component.html',
  styleUrls: ['./bullet-chart-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class BulletChartConfigComponent implements OnInit {
  configForm: FormGroup;

  @Output()
  configChange: EventEmitter<BulletChartConfig> = new EventEmitter();

  @Output() reversedChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  reversed = false;

  constructor(private _fb: FormBuilder, private _cd: ChangeDetectorRef) {
    this.configForm = this._fb.group({
      title: new FormControl(bulletChartConfigInitial.title),
      maxTooltipWidth: new FormControl(bulletChartConfigInitial.maxTooltipWidth),
      description: new FormControl(bulletChartConfigInitial.description)
    });
  }

  onReverseChange(c: MatCheckboxChange) {
    this.reversedChange.emit(c.checked);
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
