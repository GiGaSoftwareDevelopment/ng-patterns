import {NgPatRemoteConfigEntity} from './remote-config.model';
import {NgPatRemoteConfigState} from './remote-config.reducer';
import * as fromRemoteConfigReducer from './remote-config.reducer';
import * as fromRemoteConfigSelectors from './remote-config.selectors';

describe('NgPatRemoteConfigEntity Selectors', () => {
  let rootState: {
    [fromRemoteConfigReducer.ngPatRemoteConfigFeatureKey]: RemoteConfigState;
  };

  const remoteConfig1: NgPatRemoteConfigEntity = {
    id: 'foo1',
    aProp: 'bar1'
  };

  const remoteConfig2: NgPatRemoteConfigEntity = {
    id: 'foo2',
    aProp: 'bar2'
  };

  beforeEach(() => {
    rootState = {
      [fromRemoteConfigReducer.ngPatRemoteConfigFeatureKey]: {
        ids: [remoteConfig1.id, remoteConfig2.id],
        entities: {
          [remoteConfig1.id]: remoteConfig1,
          [remoteConfig2.id]: remoteConfig2
        }
      }
    };
  });

  it('should selectNgPatAllRemoteConfigs', () => {
    expect(
      fromRemoteConfigSelectors.selectNgPatAllRemoteConfigs(rootState).length
    ).toEqual(2);
  });

  it('should selectNgPatRemoteConfigEntities', () => {
    expect(
      fromRemoteConfigSelectors.selectNgPatRemoteConfigEntities(rootState)
    ).toEqual(
      rootState[fromRemoteConfigReducer.remoteConfigsFeatureKey].entities
    );
  });

  it('should selectNgPatRemoteConfigIds', () => {
    expect(
      fromRemoteConfigSelectors.selectNgPatRemoteConfigIds(rootState)
    ).toEqual(rootState[fromRemoteConfigReducer.remoteConfigsFeatureKey].ids);
  });

  it('should selectNgPatRemoteConfigTotal', () => {
    expect(
      fromRemoteConfigSelectors.selectNgPatRemoteConfigTotal(rootState)
    ).toEqual(2);
  });
});
