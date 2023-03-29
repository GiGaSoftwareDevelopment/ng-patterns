import { Injectable } from '@angular/core';
import { NgPatFirestoreService } from './ng-pat-firestore.service';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

export interface NgPatTriggerEmailMessageConfig {
  /**
   * Email Subject
   */
  subject: string;

  /**
   * Text format of email message.
   */
  text: string;

  /**
   * HTML format of email message.
   */
  // html: string;
}

/**
 * See https://firebase.google.com/docs/extensions/official/firestore-send-email
 */
export interface NgPatTriggerEmailConfig {
  /**
   * A single recipient email address
   * or an array containing multiple
   * recipient email addresses.
   */
  to: string[];

  /**
   * An array containing the BCC recipient UIDs.
   */
  // bccUids: string[];

  message: NgPatTriggerEmailMessageConfig;
}

export function ngPatCreateTriggerObject(): NgPatTriggerEmailConfig {
  return {
    to: [],
    message: {
      subject: '',
      text: ''
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class NgPatTriggerEmailFromFirestoreService {
  constructor(private fs: NgPatFirestoreService) {}

  sendMessage(
    config: NgPatTriggerEmailConfig,
    collection = 'mail'
  ): Observable<NgPatTriggerEmailConfig> {
    return this.fs.set$<NgPatTriggerEmailConfig>(
      `${collection}/${uuidv4()}`,
      config
    );
  }
}
