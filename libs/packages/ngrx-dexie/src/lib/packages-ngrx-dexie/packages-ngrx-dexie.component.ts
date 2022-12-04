import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ng-patterns-packages-ngrx-dexie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packages-ngrx-dexie.component.html',
  styleUrls: ['./packages-ngrx-dexie.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagesNgrxDexieComponent {}
