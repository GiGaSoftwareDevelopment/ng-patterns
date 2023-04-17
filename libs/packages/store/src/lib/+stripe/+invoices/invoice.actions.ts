import {createAction, props} from '@ngrx/store';
import {Update, EntityMap, EntityMapOne} from '@ngrx/entity';

import {Invoice} from './invoice.model';

export const addInvoice = createAction(
  '[Invoice/API] Add Invoice',
  props<{invoice: Invoice}>()
);

export const setInvoice = createAction(
  '[Invoice/API] Set Invoice',
  props<{invoice: Invoice}>()
);

export const upsertInvoice = createAction(
  '[Invoice/API] Upsert Invoice',
  props<{invoice: Invoice}>()
);

export const addInvoices = createAction(
  '[Invoice/API] Add Invoices',
  props<{invoices: Invoice[]}>()
);

export const upsertInvoices = createAction(
  '[Invoice/API] Upsert Invoices',
  props<{invoices: Invoice[]}>()
);

export const updateInvoice = createAction(
  '[Invoice/API] Update Invoice',
  props<{invoice: Update<Invoice>}>()
);

export const updateInvoices = createAction(
  '[Invoice/API] Update Invoices',
  props<{invoices: Update<Invoice>[]}>()
);

export const mapInvoice = createAction(
  '[Invoice/API] Map Invoice',
  props<{entityMap: EntityMapOne<Invoice>}>()
);

export const mapInvoices = createAction(
  '[Invoice/API] Map Invoices',
  props<{entityMap: EntityMap<Invoice>}>()
);

export const deleteInvoice = createAction(
  '[Invoice/API] Delete Invoice',
  props<{id: string}>()
);

export const deleteInvoiceFromfirestore = createAction(
  '[eInvoice/API] Delete eInvoice From Firestore',
  props<{id: string}>()
);

export const deleteInvoices = createAction(
  '[Invoice/API] Delete Invoices',
  props<{ids: string[]}>()
);

export const loadInvoices = createAction(
  '[Invoice/API] Load Invoices',
  props<{invoices: Invoice[]}>()
);

export const setInvoices = createAction(
  '[Invoice/API] Set Invoices',
  props<{invoices: Invoice[]}>()
);

export const clearInvoices = createAction('[Invoice/API] Clear Invoices');

export const selectInvoiceID = createAction(
  '[Invoice/API] Select Invoice',
  props<{id: string}>()
);

export const updateFirestorePartialInvoice = createAction(
  '[Invoice/API] Save Partial Invoice',
  props<{changes: Partial<Invoice>; invoice: Invoice}>()
);
