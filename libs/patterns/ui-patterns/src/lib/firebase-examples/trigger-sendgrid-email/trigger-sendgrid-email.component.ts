import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CodeHighlightModule,
  HowToLayoutModule
} from '@ngpat/shared/ui-design-library';
import { ButtonLinkComponent, LinkComponent } from '@ngpat/material/link';
import { contactHtmlForm } from './contact-html-form';

@Component({
  selector: 'pat-trigger-sendgrid-email',
  standalone: true,
  imports: [
    CommonModule,
    HowToLayoutModule,
    ButtonLinkComponent,
    LinkComponent,
    CodeHighlightModule
  ],
  templateUrl: './trigger-sendgrid-email.component.html',
  styleUrls: ['./trigger-sendgrid-email.component.scss']
})
export class TriggerSendgridEmailComponent {
  contactTsForm = `
this.formGroup = this.fb.group({
      firstName: ['', { validators: [Validators.required], updateOn: 'blur' }],
      lastName: [''],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur'
        }
      ],
      message: ['', { validators: [Validators.required], updateOn: 'blur' }]
    });

`;

  sendEmail = `
  onSubmit() {
    if (this.formGroup.valid) {
      this.showProgress$.next(true);
      const contactFormData: ContactFormData = this.formGroup.value;

      const queryMessageConfig: NgPatTriggerEmailConfig =
        ngPatCreateTriggerObject();

      // queryMessageConfig.from = contactFormData.email;
      // triggerConfig.to.push(contactFormData.email);
      queryMessageConfig.to.push('questions@gigasoftware.io');

      const queryMessage = \`
      \${contactFormData.message}\\n

      Name: \${contactFormData.firstName} \${contactFormData.lastName}
      Email: \${contactFormData.email}
      \`;

      queryMessageConfig.message = {
        subject: 'GigaSoftware Services Inquiry',
        text: queryMessage
        // html: queryMessage
      };

      this.trigger.sendMessage(queryMessageConfig).subscribe(() => {
        // noop
      });

      const replyConfig: NgPatTriggerEmailConfig = ngPatCreateTriggerObject();

      replyConfig.to.push(contactFormData.email);

      const replyMessage = \`
      Thank you for your inquiry. We will get back to you as soon as possible.\\n

      Your Inquiry:
      \${queryMessageConfig.message.text}\\n

      Regards,
      GigaSoftware
      \`;

      replyConfig.message = {
        subject: 'Thank you for your inquiry.',
        text: replyMessage
        // html: replyMessage
      };

      this.trigger.sendMessage(replyConfig).subscribe(() => {
        this.showProgress$.next(false);
        this.formGroup.reset(
          {
            firstName: '',
            lastName: '',
            email: '',
            message: ''
          },
          { emitEvent: false, onlySelf: false }
        );

        for (const key in this.formGroup.controls) {
          this.formGroup.controls[key].markAsUntouched();
          this.formGroup.controls[key].markAsPristine();
        }

        this.formGroup.markAsUntouched();
        this.formGroup.markAsPristine();

        this.dialog.open(ContactSuccessDialogComponent);
      });
    }
  }
  `;

  contactHtmlForm = contactHtmlForm;
}
