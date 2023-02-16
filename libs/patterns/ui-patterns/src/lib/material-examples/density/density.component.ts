import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'pat-density',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule ],
  templateUrl: './density.component.html',
  styleUrls: [ './density.component.scss' ],
  host: {
    class: 'sample-page-layout'
  }
})
export class DensityComponent {
}
