import { reducer, initialPatternsUIState } from './ui.reducer';

describe('Ui Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialPatternsUIState, action);

      expect(result).toBe(initialPatternsUIState);
    });
  });
});
