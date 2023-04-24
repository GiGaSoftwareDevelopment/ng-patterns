import { Injectable } from '@angular/core';
import { NgPatFirestoreService } from './ng-pat-firestore.service';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { FirestoreWriteEmailConfig } from '../models/firestore.model';

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
export interface NgPatFirestoreTriggerEmailDoc {
  id?: string;
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

export function ngPatCreateTriggerObject(): NgPatFirestoreTriggerEmailDoc {
  return {
    to: [],
    message: {
      subject: '',
      text: ''
    }
  };
}

export function createFirestoreWriteEmailConfig(
  doc: NgPatFirestoreTriggerEmailDoc,
  id: string | null | undefined = null
): FirestoreWriteEmailConfig {
  return {
    id: id && id.length > 0 ? id : uuidv4(),
    doc
  };
}

/**
 *
 * @param docs: NgPatFirestoreTriggerEmailDoc
 * @param id: id of firestore document in mail ( trigger email ) collection
 */
export function createFirestoreWriteEmailConfigs(
  docs: NgPatFirestoreTriggerEmailDoc[]
): FirestoreWriteEmailConfig[] {
  return docs.map(
    (doc: NgPatFirestoreTriggerEmailDoc): FirestoreWriteEmailConfig =>
      createFirestoreWriteEmailConfig(doc, doc.id)
  );
}

@Injectable({
  providedIn: 'root'
})
export class NgPatTriggerEmailFromFirestoreService {
  constructor(private fs: NgPatFirestoreService) {}

  sendMessage$(
    config: FirestoreWriteEmailConfig,
    collection = 'mail'
  ): Observable<NgPatFirestoreTriggerEmailDoc> {
    return this.fs.set$<NgPatFirestoreTriggerEmailDoc>(
      `${collection}/${config.id}`,
      config.doc
    );
  }

  createConfigAndSendMessage$(
    config: NgPatFirestoreTriggerEmailDoc,
    collection = 'mail'
  ): Observable<NgPatFirestoreTriggerEmailDoc> {
    return this.sendMessage$(
      createFirestoreWriteEmailConfig(config, config.id),
      collection
    );
  }

  sendMessages$(
    docs: FirestoreWriteEmailConfig[],
    collection = 'mail'
  ): Observable<NgPatFirestoreTriggerEmailDoc> {
    return this.fs.writeDocs$<NgPatFirestoreTriggerEmailDoc>(collection, docs);
  }

  createConfigAndSendMessages$(
    docs: NgPatFirestoreTriggerEmailDoc[],
    collection = 'mail'
  ): Observable<NgPatFirestoreTriggerEmailDoc> {
    const _configs: FirestoreWriteEmailConfig[] =
      createFirestoreWriteEmailConfigs(docs);

    return this.sendMessages$(_configs, collection);
  }
}
