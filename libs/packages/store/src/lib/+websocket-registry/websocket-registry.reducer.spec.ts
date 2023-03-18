import {ngPatWebSocketReducer} from './websocket-registry.reducer';
import {ngPatInitialWebsocketRegistryState} from './websocket-registry.models';

describe('WebsocketRegistry Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = ngPatWebSocketReducer(
        ngPatInitialWebsocketRegistryState,
        action
      );

      expect(result).toBe(ngPatInitialWebsocketRegistryState);
    });
  });
});
