/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {setIfSrc} from './setInIfSrc';

describe('setIfSrc', () => {
  let src: any = {};

  beforeEach(() => {
    src = {
      a: {
        b: [
          {
            c: {}
          }
        ]
      }
    };
  });

  afterEach(() => {
    src = null;
  });

  it('should not set value if source does not have value', () => {
    const target: any = {
      x: {
        y: null
      }
    };

    expect(target.x.y).toBeNull();

    setIfSrc(src, 'a.b[0].c', target, 'x.y');

    expect(target.x.y).toBeNull();
  });

  it('should set value with default value if source does not have value', () => {
    const target: any = {
      x: {
        y: null
      }
    };

    expect(target.x.y).toBeNull();

    // source does not exist
    setIfSrc(src, 'a.b[0].c', target, 'x.y', 'foo');

    expect(target.x.y).toEqual('foo');
  });
});
