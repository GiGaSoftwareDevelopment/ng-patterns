import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { NG_PAT_DIALOG_ITEM, NgPatDialogID } from '@ngpat/store';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ng-pat-app-idle-offline',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './ng-pat-app-idle-offline.component.html',
  styleUrls: ['./ng-pat-app-idle-offline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgPatAppIdleOfflineComponent {
  dialogID = NG_PAT_DIALOG_ITEM;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: NgPatDialogID
  ) {}

  onClose() {
    this._dialogRef.close(this.data);
  }
}
