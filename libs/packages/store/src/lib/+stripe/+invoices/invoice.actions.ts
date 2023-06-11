import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';

import { Invoice } from './invoice.model';

export const ngPatAddStripeInvoice = createAction(
  '[Invoice/API] Add Invoice',
  props<{ invoice: Invoice }>()
);

export const ngPatSetStripeInvoice = createAction(
  '[Invoice/API] Set Invoice',
  props<{ invoice: Invoice }>()
);

export const ngPatUpsertStripeInvoice = createAction(
  '[Invoice/API] Upsert Invoice',
  props<{ invoice: Invoice }>()
);

export const ngPatAddStripeInvoices = createAction(
  '[Invoice/API] Add Invoices',
  props<{ invoices: Invoice[] }>()
);

export const ngPatUpsertStripeInvoices = createAction(
  '[Invoice/API] Upsert Invoices',
  props<{ invoices: Invoice[] }>()
);

export const ngPatUpdateStripeInvoice = createAction(
  '[Invoice/API] Update Invoice',
  props<{ invoice: Update<Invoice> }>()
);

export const ngPatUpdateStripeInvoices = createAction(
  '[Invoice/API] Update Invoices',
  props<{ invoices: Update<Invoice>[] }>()
);

export const ngPatMapStripeInvoice = createAction(
  '[Invoice/API] Map Invoice',
  props<{ entityMap: EntityMapOne<Invoice> }>()
);

export const ngPatMapStripeInvoices = createAction(
  '[Invoice/API] Map Invoices',
  props<{ entityMap: EntityMap<Invoice> }>()
);

export const ngPatDeleteStripeInvoice = createAction(
  '[Invoice/API] Delete Invoice',
  props<{ id: string }>()
);

export const ngPatDeleteStripeInvoiceFromfirestore = createAction(
  '[eInvoice/API] Delete eInvoice From Firestore',
  props<{ id: string }>()
);

export const ngPatDeleteStripeInvoices = createAction(
  '[Invoice/API] Delete Invoices',
  props<{ ids: string[] }>()
);

export const ngPatLoadStripeInvoices = createAction(
  '[Invoice/API] Load Invoices',
  props<{ invoices: Invoice[] }>()
);

export const setStripeInvoices = createAction(
  '[Invoice/API] Set Invoices',
  props<{ invoices: Invoice[] }>()
);

export const ngPatClearStripeInvoices = createAction(
  '[Invoice/API] Clear Invoices'
);

export const ngPatSelectStripeInvoiceID = createAction(
  '[Invoice/API] Select Invoice',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialStripeInvoice = createAction(
  '[Invoice/API] Save Partial Invoice',
  props<{ changes: Partial<Invoice>; invoice: Invoice }>()
);
