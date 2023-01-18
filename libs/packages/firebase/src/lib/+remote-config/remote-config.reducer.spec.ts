import {Update} from '@ngrx/entity/src/models';
import {RemoteConfigEntity} from './remote-config.model';
import {
  reducer,
  initialRemoteConfigState,
  RemoteConfigState
} from './remote-config.reducer';
import * as RemoteConfigActions from './remote-config.actions';

describe('RemoteConfigEntity Reducer', () => {
  it('should addRemoteConfig', () => {
    const remoteConfig: RemoteConfigEntity = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: RemoteConfigState = reducer(
      initialRemoteConfigState,
      RemoteConfigActions.addRemoteConfig({remoteConfig})
    );

    expect(state.entities[remoteConfig.id]).toEqual(remoteConfig);
    expect(state.ids[0]).toEqual(remoteConfig.id);
  });

  it('should upsertRemoteConfig', () => {
    const remoteConfig: RemoteConfigEntity = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: RemoteConfigState = reducer(
      initialRemoteConfigState,
      RemoteConfigActions.addRemoteConfig({remoteConfig})
    );

    // RemoteConfigActions.upsertRemoteConfig
    //

    const upsert: RemoteConfigEntity = {
      ...remoteConfig,
      aProp: 'baz'
    };

    state = reducer(
      state,
      RemoteConfigActions.upsertRemoteConfig({remoteConfig: upsert})
    );

    expect(state.entities[remoteConfig.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(remoteConfig.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should addRemoteConfigs', () => {
    const remoteConfig1: RemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: RemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: RemoteConfigState = reducer(
      initialRemoteConfigState,
      RemoteConfigActions.addRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(remoteConfig1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);
  });

  it('should upsertRemoteConfigs', () => {
    const remoteConfig1: RemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: RemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: RemoteConfigState = reducer(
      initialRemoteConfigState,
      RemoteConfigActions.addRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    // RemoteConfigActions.upsertRemoteConfigs
    //

    const upsert1: RemoteConfigEntity = {
      ...remoteConfig1,
      aProp: 'baz1'
    };

    const upsert2: RemoteConfigEntity = {
      ...remoteConfig2,
      aProp: 'baz2'
    };

    state = reducer(
      state,
      RemoteConfigActions.upsertRemoteConfigs({
        remoteConfigs: [upsert1, upsert2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should updateRemoteConfig', () => {
    const remoteConfig: RemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: RemoteConfigState = reducer(
      initialRemoteConfigState,
      RemoteConfigActions.addRemoteConfig({remoteConfig})
    );

    // updateRemoteConfig
    //
    const update: RemoteConfigEntity = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      RemoteConfigActions.updateRemoteConfig({
        remoteConfig: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[remoteConfig.id]).toEqual(update);
  });

  it('should updateRemoteConfigs', () => {
    const remoteConfig1: RemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: RemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: RemoteConfigState = reducer(
      initialRemoteConfigState,
      RemoteConfigActions.addRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    // RemoteConfigActions.upsertRemoteConfigs
    //

    const update1: RemoteConfigEntity = {
      ...remoteConfig1,
      aProp: 'baz1'
    };

    const update2: RemoteConfigEntity = {
      ...remoteConfig2,
      aProp: 'baz2'
    };

    const updatesPayload: Update<RemoteConfigEntity>[] = [
      {
        id: update1.id,
        changes: update1
      },
      {
        id: update2.id,
        changes: update2
      }
    ];

    state = reducer(
      state,
      RemoteConfigActions.updateRemoteConfigs({remoteConfigs: updatesPayload})
    );

    expect(state.entities[remoteConfig1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should deleteRemoteConfig', () => {
    const remoteConfig1: RemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: RemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: RemoteConfigState = reducer(
      initialRemoteConfigState,
      RemoteConfigActions.addRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(remoteConfig1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);

    state = reducer(
      state,
      RemoteConfigActions.deleteRemoteConfig({id: remoteConfig1.id})
    );

    expect(state.entities[remoteConfig1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(false);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);
  });

  it('should deleteRemoteConfigs', () => {
    const remoteConfig1: RemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: RemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: RemoteConfigState = reducer(
      initialRemoteConfigState,
      RemoteConfigActions.addRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(remoteConfig1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);

    state = reducer(
      state,
      RemoteConfigActions.deleteRemoteConfigs({
        ids: [remoteConfig1.id, remoteConfig2.id]
      })
    );

    expect(state.entities[remoteConfig1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(false);

    expect(state.entities[remoteConfig2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(false);
  });

  it('should loadRemoteConfigs', () => {
    const remoteConfig1: RemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: RemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: RemoteConfigState = reducer(
      initialRemoteConfigState,
      RemoteConfigActions.loadRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(remoteConfig1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);
  });

  it('should clearRemoteConfigs', () => {
    const remoteConfig1: RemoteConfigEntity = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const remoteConfig2: RemoteConfigEntity = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: RemoteConfigState = reducer(
      initialRemoteConfigState,
      RemoteConfigActions.loadRemoteConfigs({
        remoteConfigs: [remoteConfig1, remoteConfig2]
      })
    );

    expect(state.entities[remoteConfig1.id]).toEqual(remoteConfig1);
    expect((<string[]>state.ids).includes(remoteConfig1.id)).toBe(true);

    expect(state.entities[remoteConfig2.id]).toEqual(remoteConfig2);
    expect((<string[]>state.ids).includes(remoteConfig2.id)).toBe(true);

    // clearRemoteConfigs
    //
    state = reducer(state, RemoteConfigActions.clearRemoteConfigs());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
