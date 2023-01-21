import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BrowserStorageModule } from '@uiux/store';

@Component({
  selector: 'pat-browser-storage',
  standalone: true,
  imports: [CommonModule, BrowserStorageModule],
  templateUrl: './browser-storage.component.html',
  styleUrls: ['./browser-storage.component.scss'],
  host: {
    class: 'sample-page-layout'
  }
})
export class BrowserStorageComponent {}
