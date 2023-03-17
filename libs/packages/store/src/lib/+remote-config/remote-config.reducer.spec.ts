import {Update} from '@ngrx/entity/src/models';
import {NgPatRemoteConfigEntity} from './remote-config.model';
import {
  ngPatRemoteConfigReducer,
  initialNgPatRemoteConfigState,
  NgPatRemoteConfigState
} from './remote-config.reducer';
import * as RemoteConfigActions from './remote-config.actions';

describe('NgPatRemoteConfigEntity Reducer', () => {
  it('should ngPatAddRemoteConfig', () => {
    const remoteConfig: NgPatRemoteConfigEntity = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: RemoteConfigState = ngPatRemoteConfigReducer(
      initialNgPatRemoteConfigState,
      RemoteConfigActions.ngPatAddRemoteConfig({remoteConfig})
    );

    expect(state.entities[remoteConfig.id]).toEqual(remoteConfig);
    expect(state.ids[0]).toEqual(remoteConfig.id);
  });

  it('should ngPatUpsertRemoteConfig', () => {
    const remoteConfig: NgPatRemoteConfigEntity = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: RemoteConfigState = ngPatRemoteConfigReducer(
      initialNgPatRemoteConfigState,
      RemoteConfigActions.ngPatAddRemoteConfig({remoteConfig})
    );

    // RemoteConfigActions.ngPatUpsertRemoteConfig
    //

    const upsert: NgPatRemoteConfigEntity = {
      ...remoteConfig,
      aProp: 'baz'
    };

    state = ngPatRemoteConfigReducer(
      state,
      RemoteConfigActions.ngPatUpsertRemoteConfig({remoteConfig: upsert})
    );

    expect(state.entities[remoteConfig.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(remoteConfig.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddRemoteConfigs', () => {
    const remoteConfig1: NgPatRemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: NgPatRemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: RemoteConfigState = ngPatRemoteConfigReducer(
      initialNgPatRemoteConfigState,
      RemoteConfigActions.ngPatAddRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(remoteConfig1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);
  });

  it('should ngPatUpsertRemoteConfigs', () => {
    const remoteConfig1: NgPatRemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: NgPatRemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: RemoteConfigState = ngPatRemoteConfigReducer(
      initialNgPatRemoteConfigState,
      RemoteConfigActions.ngPatAddRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    // RemoteConfigActions.ngPatUpsertRemoteConfigs
    //

    const upsert1: NgPatRemoteConfigEntity = {
      ...remoteConfig1,
      aProp: 'baz1'
    };

    const upsert2: NgPatRemoteConfigEntity = {
      ...remoteConfig2,
      aProp: 'baz2'
    };

    state = ngPatRemoteConfigReducer(
      state,
      RemoteConfigActions.ngPatUpsertRemoteConfigs({
        remoteConfigs: [upsert1, upsert2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdateRemoteConfig', () => {
    const remoteConfig: NgPatRemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: RemoteConfigState = ngPatRemoteConfigReducer(
      initialNgPatRemoteConfigState,
      RemoteConfigActions.ngPatAddRemoteConfig({remoteConfig})
    );

    // ngPatUpdateRemoteConfig
    //
    const update: NgPatRemoteConfigEntity = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = ngPatRemoteConfigReducer(
      state,
      RemoteConfigActions.ngPatUpdateRemoteConfig({
        remoteConfig: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[remoteConfig.id]).toEqual(update);
  });

  it('should ngPatUpdateRemoteConfigs', () => {
    const remoteConfig1: NgPatRemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: NgPatRemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: RemoteConfigState = ngPatRemoteConfigReducer(
      initialNgPatRemoteConfigState,
      RemoteConfigActions.ngPatAddRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    // RemoteConfigActions.ngPatUpsertRemoteConfigs
    //

    const update1: NgPatRemoteConfigEntity = {
      ...remoteConfig1,
      aProp: 'baz1'
    };

    const update2: NgPatRemoteConfigEntity = {
      ...remoteConfig2,
      aProp: 'baz2'
    };

    const updatesPayload: Update<NgPatRemoteConfigEntity>[] = [
      {
        id: update1.id,
        changes: update1
      },
      {
        id: update2.id,
        changes: update2
      }
    ];

    state = ngPatRemoteConfigReducer(
      state,
      RemoteConfigActions.ngPatUpdateRemoteConfigs({
        remoteConfigs: updatesPayload
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeleteRemoteConfig', () => {
    const remoteConfig1: NgPatRemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: NgPatRemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: RemoteConfigState = ngPatRemoteConfigReducer(
      initialNgPatRemoteConfigState,
      RemoteConfigActions.ngPatAddRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(remoteConfig1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);

    state = ngPatRemoteConfigReducer(
      state,
      RemoteConfigActions.ngPatDeleteRemoteConfig({id: remoteConfig1.id})
    );

    expect(state.entities[remoteConfig1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(false);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);
  });

  it('should ngPatDeleteRemoteConfigs', () => {
    const remoteConfig1: NgPatRemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: NgPatRemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: RemoteConfigState = ngPatRemoteConfigReducer(
      initialNgPatRemoteConfigState,
      RemoteConfigActions.ngPatAddRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(remoteConfig1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);

    state = ngPatRemoteConfigReducer(
      state,
      RemoteConfigActions.ngPatDeleteRemoteConfigs({
        ids: [remoteConfig1.id, remoteConfig2.id]
      })
    );

    expect(state.entities[remoteConfig1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(false);

    expect(state.entities[remoteConfig2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(false);
  });

  it('should ngPatLoadRemoteConfigs', () => {
    const remoteConfig1: NgPatRemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: NgPatRemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: RemoteConfigState = ngPatRemoteConfigReducer(
      initialNgPatRemoteConfigState,
      RemoteConfigActions.ngPatLoadRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(remoteConfig1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);
  });

  it('should ngPatClearRemoteConfigs', () => {
    const remoteConfig1: NgPatRemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: NgPatRemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: RemoteConfigState = ngPatRemoteConfigReducer(
      initialNgPatRemoteConfigState,
      RemoteConfigActions.ngPatLoadRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(remoteConfig1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);

    // ngPatClearRemoteConfigs
    //
    state = ngPatRemoteConfigReducer(
      state,
      RemoteConfigActions.ngPatClearRemoteConfigs()
    );

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
