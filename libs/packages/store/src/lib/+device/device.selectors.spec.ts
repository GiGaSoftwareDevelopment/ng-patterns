import * as fromDevice from './device.reducer';
import {selectNgPatDeviceState} from './device.selectors';

describe('Device Selectors', () => {
  it('should select the feature state', () => {
    const result = selectNgPatDeviceState({
      [fromDevice.ngPatDeviceFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
