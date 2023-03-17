import {
  initialNgPatWebsocketRegistryState,
  ngPatWebSocketReducer
} from './websocket-registry.reducer';

describe('WebsocketRegistry Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = ngPatWebSocketReducer(
        initialWebsocketRegistryState,
        action
      );

      expect(result).toBe(initialWebsocketRegistryState);
    });
  });
});
