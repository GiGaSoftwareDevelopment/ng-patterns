import { getFileName } from './getFileName';

describe('getFileName', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('should get name', () => {
    expect(getFileName('foo.mp3')).toBe('foo');
  });
});
