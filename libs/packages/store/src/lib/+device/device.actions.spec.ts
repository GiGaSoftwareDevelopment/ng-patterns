import * as fromDevice from './device.actions';

describe('loadDevices', () => {
  it('should return an action', () => {
    expect(fromDevice.ngPatLoadDevices().type).toBe('[Device] Load Devices');
  });
});
