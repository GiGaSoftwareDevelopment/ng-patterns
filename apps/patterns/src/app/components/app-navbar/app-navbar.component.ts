import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'pat-app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent {}
