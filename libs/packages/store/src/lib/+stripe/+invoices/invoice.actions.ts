import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';

import { NgPatStripeInvoice } from './invoice.model';

export const ngPatAddStripeInvoice = createAction(
  '[NgPatStripeInvoice/API] Add NgPatStripeInvoice',
  props<{ invoice: NgPatStripeInvoice }>()
);

export const ngPatSetStripeInvoice = createAction(
  '[NgPatStripeInvoice/API] Set NgPatStripeInvoice',
  props<{ invoice: NgPatStripeInvoice }>()
);

export const ngPatUpsertStripeInvoice = createAction(
  '[NgPatStripeInvoice/API] Upsert NgPatStripeInvoice',
  props<{ invoice: NgPatStripeInvoice }>()
);

export const ngPatAddStripeInvoices = createAction(
  '[NgPatStripeInvoice/API] Add Invoices',
  props<{ invoices: NgPatStripeInvoice[] }>()
);

export const ngPatUpsertStripeInvoices = createAction(
  '[NgPatStripeInvoice/API] Upsert Invoices',
  props<{ invoices: NgPatStripeInvoice[] }>()
);

export const ngPatUpdateStripeInvoice = createAction(
  '[NgPatStripeInvoice/API] Update NgPatStripeInvoice',
  props<{ invoice: Update<NgPatStripeInvoice> }>()
);

export const ngPatUpdateStripeInvoices = createAction(
  '[NgPatStripeInvoice/API] Update Invoices',
  props<{ invoices: Update<NgPatStripeInvoice>[] }>()
);

export const ngPatMapStripeInvoice = createAction(
  '[NgPatStripeInvoice/API] Map NgPatStripeInvoice',
  props<{ entityMap: EntityMapOne<NgPatStripeInvoice> }>()
);

export const ngPatMapStripeInvoices = createAction(
  '[NgPatStripeInvoice/API] Map Invoices',
  props<{ entityMap: EntityMap<NgPatStripeInvoice> }>()
);

export const ngPatDeleteStripeInvoice = createAction(
  '[NgPatStripeInvoice/API] Delete NgPatStripeInvoice',
  props<{ id: string }>()
);

export const ngPatDeleteStripeInvoiceFromfirestore = createAction(
  '[eInvoice/API] Delete eInvoice From Firestore',
  props<{ id: string }>()
);

export const ngPatDeleteStripeInvoices = createAction(
  '[NgPatStripeInvoice/API] Delete Invoices',
  props<{ ids: string[] }>()
);

export const ngPatLoadStripeInvoices = createAction(
  '[NgPatStripeInvoice/API] Load Invoices',
  props<{ invoices: NgPatStripeInvoice[] }>()
);

export const setStripeInvoices = createAction(
  '[NgPatStripeInvoice/API] Set Invoices',
  props<{ invoices: NgPatStripeInvoice[] }>()
);

export const ngPatClearStripeInvoices = createAction(
  '[NgPatStripeInvoice/API] Clear Invoices'
);

export const ngPatSelectStripeInvoiceID = createAction(
  '[NgPatStripeInvoice/API] Select NgPatStripeInvoice',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialStripeInvoice = createAction(
  '[NgPatStripeInvoice/API] Save Partial NgPatStripeInvoice',
  props<{ changes: Partial<NgPatStripeInvoice>; invoice: NgPatStripeInvoice }>()
);
