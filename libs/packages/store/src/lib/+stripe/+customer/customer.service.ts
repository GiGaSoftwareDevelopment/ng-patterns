import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(protected store: Store, private _zone: NgZone) {}
}
