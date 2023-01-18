import {RemoteConfigEntity} from './remote-config.model';
import {RemoteConfigState} from './remote-config.reducer';
import * as fromRemoteConfigReducer from './remote-config.reducer';
import * as fromRemoteConfigSelectors from './remote-config.selectors';

describe('RemoteConfigEntity Selectors', () => {
  let rootState: {
    [fromRemoteConfigReducer.remoteConfigFeatureKey]: RemoteConfigState;
  };

  const remoteConfig1: RemoteConfigEntity = {
    id: 'foo1',
    aProp: 'bar1'
  };

  const remoteConfig2: RemoteConfigEntity = {
    id: 'foo2',
    aProp: 'bar2'
  };

  beforeEach(() => {
    rootState = {
      [fromRemoteConfigReducer.remoteConfigFeatureKey]: {
        ids: [remoteConfig1.id, remoteConfig2.id],
        entities: {
          [remoteConfig1.id]: remoteConfig1,
          [remoteConfig2.id]: remoteConfig2
        }
      }
    };
  });

  it('should selectAllRemoteConfigs', () => {
    expect(
      fromRemoteConfigSelectors.selectAllRemoteConfigs(rootState).length
    ).toEqual(2);
  });

  it('should selectRemoteConfigEntities', () => {
    expect(
      fromRemoteConfigSelectors.selectRemoteConfigEntities(rootState)
    ).toEqual(
      rootState[fromRemoteConfigReducer.remoteConfigsFeatureKey].entities
    );
  });

  it('should selectRemoteConfigIds', () => {
    expect(fromRemoteConfigSelectors.selectRemoteConfigIds(rootState)).toEqual(
      rootState[fromRemoteConfigReducer.remoteConfigsFeatureKey].ids
    );
  });

  it('should selectRemoteConfigTotal', () => {
    expect(
      fromRemoteConfigSelectors.selectRemoteConfigTotal(rootState)
    ).toEqual(2);
  });
});
