import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pat-adding-tailwindcss',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adding-tailwindcss.component.html',
  styleUrls: ['./adding-tailwindcss.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'sample-page-layout'
  }
})
export class AddingTailwindcssComponent {}
