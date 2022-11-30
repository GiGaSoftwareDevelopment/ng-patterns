/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { ISetInSrcConfig, setInIfSrcWithConfig } from './setInIfSrcWithConfig';

describe('setInIfSrc', () => {
  let src: any = {};

  beforeEach(() => {
    src = {
      a: {
        b: [
          {
            c: {},
          },
        ],
      },
    };
  });

  afterEach(() => {
    src = null;
  });

  it('should not set value if source does not have value', () => {
    const target: any = {
      x: {
        y: null,
      },
    };

    expect(target.x.y).toBeNull();

    const config: ISetInSrcConfig = {
      src: src,
      srcKeys: 'a.b[0].c',
      target: target,
      targetKeys: 'x.y',
    };

    setInIfSrcWithConfig(config);

    expect(target.x.y).toBeNull();
  });

  it('should set value with default value if source does not have value', () => {
    const target: any = {
      x: {
        y: null,
      },
    };

    expect(target.x.y).toBeNull();

    const config: ISetInSrcConfig = {
      src: src,
      srcKeys: 'a.b[0].c',
      target: target,
      targetKeys: 'x.y',
      defaultValue: 'foo',
    };

    // source does not exist
    setInIfSrcWithConfig(config);

    expect(target.x.y).toEqual('foo');
  });
});
