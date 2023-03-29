import { Route } from '@angular/router';
import { TriggerSendgridEmailComponent } from './trigger-sendgrid-email/trigger-sendgrid-email.component';

export const FIREBASE_ROUTES: Route[] = [
  {
    path: 'sendgrid',
    component: TriggerSendgridEmailComponent
  }
];
