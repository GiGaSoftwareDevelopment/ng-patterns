import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';

import { Invoice } from './invoice.model';

export const ngPatAddInvoice = createAction(
  '[Invoice/API] Add Invoice',
  props<{ invoice: Invoice }>()
);

export const ngPatSetInvoice = createAction(
  '[Invoice/API] Set Invoice',
  props<{ invoice: Invoice }>()
);

export const ngPatUpsertInvoice = createAction(
  '[Invoice/API] Upsert Invoice',
  props<{ invoice: Invoice }>()
);

export const ngPatAddInvoices = createAction(
  '[Invoice/API] Add Invoices',
  props<{ invoices: Invoice[] }>()
);

export const ngPatUpsertInvoices = createAction(
  '[Invoice/API] Upsert Invoices',
  props<{ invoices: Invoice[] }>()
);

export const ngPatUpdateInvoice = createAction(
  '[Invoice/API] Update Invoice',
  props<{ invoice: Update<Invoice> }>()
);

export const ngPatUpdateInvoices = createAction(
  '[Invoice/API] Update Invoices',
  props<{ invoices: Update<Invoice>[] }>()
);

export const ngPatMapInvoice = createAction(
  '[Invoice/API] Map Invoice',
  props<{ entityMap: EntityMapOne<Invoice> }>()
);

export const ngPatMapInvoices = createAction(
  '[Invoice/API] Map Invoices',
  props<{ entityMap: EntityMap<Invoice> }>()
);

export const ngPatDeleteInvoice = createAction(
  '[Invoice/API] Delete Invoice',
  props<{ id: string }>()
);

export const ngPatDeleteInvoiceFromfirestore = createAction(
  '[eInvoice/API] Delete eInvoice From Firestore',
  props<{ id: string }>()
);

export const ngPatDeleteInvoices = createAction(
  '[Invoice/API] Delete Invoices',
  props<{ ids: string[] }>()
);

export const ngPatLoadInvoices = createAction(
  '[Invoice/API] Load Invoices',
  props<{ invoices: Invoice[] }>()
);

export const setInvoices = createAction(
  '[Invoice/API] Set Invoices',
  props<{ invoices: Invoice[] }>()
);

export const ngPatClearInvoices = createAction('[Invoice/API] Clear Invoices');

export const ngPatSelectInvoiceID = createAction(
  '[Invoice/API] Select Invoice',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialInvoice = createAction(
  '[Invoice/API] Save Partial Invoice',
  props<{ changes: Partial<Invoice>; invoice: Invoice }>()
);
