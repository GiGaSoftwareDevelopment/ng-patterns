import {Action, createReducer, on} from '@ngrx/store';
import {
  ngPatAddDialogQueue,
  ngPatAddDialogQueues,
  ngPatcClearDialogQueues,
  ngPatCloseDialog,
  ngPatDeleteDialogQueue,
  ngPatDeleteDialogQueues,
  ngPatLoadDialogQueues,
  ngPatOpenDialog,
  ngPatUpdateDialogQueue,
  ngPatUpdateDialogQueues,
  ngPatUpsertDialogQueue,
  ngPatUpsertDialogQueues
} from './dialog-queue.actions';
import {
  NgPatDialogQueue,
  dialogQueueEntityAdapter,
  NgPatDialogQueueState,
  ngPatInitialDialogQueueState
} from './dialog-queue.model';

export const ngPatDialogueQueueReducer = createReducer(
  ngPatInitialDialogQueueState,
  on(ngPatAddDialogQueue, (state, action) =>
    dialogQueueEntityAdapter.addOne(action.dialogQueue, state)
  ),
  on(ngPatUpsertDialogQueue, (state, action) =>
    dialogQueueEntityAdapter.upsertOne(action.dialogQueue, state)
  ),
  on(ngPatAddDialogQueues, (state, action) =>
    dialogQueueEntityAdapter.addMany(action.dialogQueues, state)
  ),
  on(ngPatUpsertDialogQueues, (state, action) =>
    dialogQueueEntityAdapter.upsertMany(action.dialogQueues, state)
  ),
  on(ngPatUpdateDialogQueue, (state, action) =>
    dialogQueueEntityAdapter.updateOne(action.dialogQueue, state)
  ),
  on(ngPatUpdateDialogQueues, (state, action) =>
    dialogQueueEntityAdapter.updateMany(action.dialogQueues, state)
  ),
  on(ngPatDeleteDialogQueue, (state, action) =>
    dialogQueueEntityAdapter.removeOne(action.id, state)
  ),
  on(ngPatDeleteDialogQueues, (state, action) =>
    dialogQueueEntityAdapter.removeMany(action.ids, state)
  ),
  on(ngPatLoadDialogQueues, (state, action) => {
    return {
      ...dialogQueueEntityAdapter.setAll(action.dialogQueues, state),
      isLoaded: true
    };
  }),
  on(ngPatcClearDialogQueues, state =>
    dialogQueueEntityAdapter.removeAll(state)
  ),
  on(ngPatOpenDialog, (state, action): NgPatDialogQueueState => {
    const _state = {
      ...state,
      entities: {
        ...state.entities
      }
    };

    if (_state.entities[action.id]) {
      _state.entities[action.id] = {
        ...(<NgPatDialogQueue>_state.entities[action.id]),
        isOpen: true
      };
    }

    return _state;
  }),
  on(ngPatCloseDialog, (state, action): NgPatDialogQueueState => {
    const _state = {
      ...state,
      entities: {
        ...state.entities
      }
    };

    if (_state.entities[action.id]) {
      _state.entities[action.id] = {
        ...(<NgPatDialogQueue>_state.entities[action.id]),
        isOpen: false
      };
    }

    return _state;
  })
);
