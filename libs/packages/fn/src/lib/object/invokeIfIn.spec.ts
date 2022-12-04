/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import {invokeIfIn} from './invokeIfIn';

describe('invokeIfIn', () => {
  let test: any;

  beforeEach(() => {
    test = {
      a: {
        b: {
          c: 'foo',
          d: []
        }
      }
    };
  });

  afterEach(() => {
    test = null;
  });

  it('should invoke function if value is valid with hasValue', () => {
    let _value: any;

    const invokee: (result: any) => any = function (_result: any) {
      _value = _result;
    };

    invokeIfIn(test, 'a.b.c', invokee);

    expect(_value).toEqual('foo');
  });

  it('should not invoke function if value is valid with hasValue', () => {
    let _value: any;

    const invokee: (result: any) => any = function (_result: any) {
      _value = _result;
    };

    invokeIfIn(test, 'a.b.e', invokee);

    expect(_value).toBeUndefined();
  });

  it('should not invoke function if value is valid with hasValue', () => {
    let _value: any;

    const invokee: (result: any) => any = function (_result: any) {
      _value = _result;
    };

    invokeIfIn(test, 'a.b.d', invokee);

    expect(_value).toBeUndefined();
  });

  it('should invoke inside of class with valid value', () => {
    class TestInvoke {
      value: any;

      constructor(testInject: any) {
        // 'this' is required to pass context of class
        invokeIfIn(testInject, 'a.b.c', this.invokee, this);
      }

      invokee(_result: any): void {
        this.setValue(_result);
      }

      // testing context of method calls
      setValue(_value: any): void {
        this.value = _value;
      }
    }

    const testObject = new TestInvoke(test);

    expect(testObject.value).toEqual('foo');
  });

  it('should not invoke inside of class with valid value', () => {
    class TestInvoke {
      value: any;

      constructor(testInject: any) {
        // 'this' is required to pass context of class
        invokeIfIn(testInject, 'a.b.d', this.invokee, this);
      }

      invokee(_result: any): void {
        this.setValue(_result);
      }

      // testing context of method calls
      setValue(_value: any): void {
        this.value = _value;
      }
    }

    const testObject = new TestInvoke(test);

    expect(testObject.value).toBeUndefined();
  });
});
