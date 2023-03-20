import {SecondsToMillisecondsPipe} from './seconds-to-milliseconds.pipe';

describe('SecondsToMillisecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new SecondsToMillisecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
