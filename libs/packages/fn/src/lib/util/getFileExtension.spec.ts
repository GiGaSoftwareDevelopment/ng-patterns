import {getFileExtension} from './getFileExtension';

describe('getFileExtension', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('should get .mp3', () => {
    expect(getFileExtension('foo.mp3')).toBe('mp3');
  });
});
