import { Action, createReducer, on } from '@ngrx/store';
import {
  ngPatAddDialog,
  ngPatAddDialogs,
  ngPatcClearDialogs,
  ngPatCloseDialog,
  ngPatDeleteDialog,
  ngPatDeleteDialogs,
  ngPatLoadDialogs,
  ngPatOpenDialog,
  ngPatUpdateDialog,
  ngPatUpdateDialogs,
  ngPatUpsertDialog,
  ngPatUpsertDialogs
} from './dialog-queue.actions';
import {
  NgPatDialog,
  dialogEntityAdapter,
  NgPatDialogState,
  ngPatInitialDialogState
} from './dialog-queue.model';

export const ngPatDialogueQueueReducer = createReducer(
  ngPatInitialDialogState,
  on(ngPatAddDialog, (state, action) =>
    dialogEntityAdapter.addOne(action.dialog, state)
  ),
  on(ngPatUpsertDialog, (state, action) =>
    dialogEntityAdapter.upsertOne(action.dialog, state)
  ),
  on(ngPatAddDialogs, (state, action) =>
    dialogEntityAdapter.addMany(action.dialogs, state)
  ),
  on(ngPatUpsertDialogs, (state, action) =>
    dialogEntityAdapter.upsertMany(action.dialogs, state)
  ),
  on(ngPatUpdateDialog, (state, action) =>
    dialogEntityAdapter.updateOne(action.dialog, state)
  ),
  on(ngPatUpdateDialogs, (state, action) =>
    dialogEntityAdapter.updateMany(action.dialogs, state)
  ),
  on(ngPatDeleteDialog, (state, action) =>
    dialogEntityAdapter.removeOne(action.id, state)
  ),
  on(ngPatDeleteDialogs, (state, action) =>
    dialogEntityAdapter.removeMany(action.ids, state)
  ),
  on(ngPatLoadDialogs, (state, action) => {
    return {
      ...dialogEntityAdapter.upsertMany(action.dialogs, state),
      isLoaded: true
    };
  }),
  on(ngPatcClearDialogs, state => dialogEntityAdapter.removeAll(state)),
  on(ngPatOpenDialog, (state, action): NgPatDialogState => {
    const _state = {
      ...state,
      entities: {
        ...state.entities
      }
    };

    if (_state.entities[action.id]) {
      _state.entities[action.id] = {
        ...(<NgPatDialog>_state.entities[action.id]),
        isOpen: true
      };
    }

    return _state;
  }),
  on(ngPatCloseDialog, (state, action): NgPatDialogState => {
    const _state = {
      ...state,
      entities: {
        ...state.entities
      }
    };

    if (_state.entities[action.id]) {
      _state.entities[action.id] = {
        ...(<NgPatDialog>_state.entities[action.id]),
        isOpen: false
      };
    }

    return _state;
  })
);
