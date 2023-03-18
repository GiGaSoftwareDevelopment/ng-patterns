import {ngPatDeviceReducer, ngPatInitialDeviceState} from './device.reducer';

describe('Device Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = ngPatDeviceReducer(ngPatInitialDeviceState, action);

      expect(result).toBe(ngPatInitialDeviceState);
    });
  });
});
