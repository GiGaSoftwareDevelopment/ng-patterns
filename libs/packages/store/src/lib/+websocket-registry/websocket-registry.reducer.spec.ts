import {
  initialWebsocketRegistryState,
  reducer
} from './websocket-registry.reducer';

describe('WebsocketRegistry Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialWebsocketRegistryState, action);

      expect(result).toBe(initialWebsocketRegistryState);
    });
  });
});
