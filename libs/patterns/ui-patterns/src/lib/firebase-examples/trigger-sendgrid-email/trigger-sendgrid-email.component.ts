import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowToLayoutModule } from '@ngpat/shared/ui-design-library';
import { LinkComponent } from '@ngpat/material/link';

@Component({
  selector: 'pat-trigger-sendgrid-email',
  standalone: true,
  imports: [CommonModule, HowToLayoutModule, LinkComponent],
  templateUrl: './trigger-sendgrid-email.component.html',
  styleUrls: ['./trigger-sendgrid-email.component.scss']
})
export class TriggerSendgridEmailComponent {}
