import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NgPatBrowserStorageItem,
  BrowserStorageModule,
  ngPatSetBrowserStorageItem
} from '@ngpat/store';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {debounceTime} from 'rxjs';
import {Store} from '@ngrx/store';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'pat-browser-storage',
  standalone: true,
  imports: [
    CommonModule,
    BrowserStorageModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './browser-storage.component.html',
  styleUrls: ['./browser-storage.component.scss'],
  host: {
    class: 'sample-page-layout'
  }
})
export class BrowserStorageComponent implements OnInit {
  storageItemFormGroup: FormGroup;

  constructor(private _fb: FormBuilder, private store: Store) {
    this.storageItemFormGroup = this._fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  ngOnInit() {
    // stubb
  }

  resetStorageFormControl(controlName: string) {
    this.storageItemFormGroup.controls[controlName].reset();
  }

  submit() {
    if (this.storageItemFormGroup.valid) {
      this.store.dispatch(
        ngPatSetBrowserStorageItem({
          browserStorageItem: this.storageItemFormGroup.value
        })
      );
    }
  }
}
