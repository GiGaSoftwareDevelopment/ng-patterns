import {
  AfterViewInit,
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
import {BulletChartConfig} from '@uiux/charts/bullet-chart';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
export class BulletChartConfigComponent implements OnInit, AfterViewInit {
  configForm: FormGroup;

  @Output()
  configChange: EventEmitter<Partial<BulletChartConfig>> = new EventEmitter();

  @Output() reversedChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  reversed = false;

  constructor(private _fb: FormBuilder, private _cd: ChangeDetectorRef) {
    this.configForm = this._fb.group({
      title: new FormControl(''),
      maxTooltipWidth: new FormControl(50),
      description: new FormControl('')
    });
  }

  onReverseChange(c: MatCheckboxChange) {
    this.reversedChange.emit(c.checked);
  }

  ngOnInit(): void {
    this.configForm.valueChanges.subscribe((c: Partial<BulletChartConfig>) => {
      this.configChange.emit(c);
    });
  }

  ngAfterViewInit() {
    this.configForm.reset({
      title: 'Storage Used',
      description:
        'Based on files in the projects you own. Projects assigned you as a collaborator are not counted.',
      maxTooltipWidth: 50
    });
  }

  clearValue(prop: string): void {
    const value = {...this.configForm.value};
    value[prop] = null;

    this.configForm.setValue(value, {emitEvent: false});
  }
}
