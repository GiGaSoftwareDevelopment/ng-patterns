/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import {invokeIfElseInConfig, IInvokeIfElseIn} from './invokeIfElseInConfig';

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

    const invokee: (_result: any) => any = function (_result: any) {
      _value = _result;
    };

    const config: IInvokeIfElseIn = {
      src: test,
      keys: 'a.b.c',
      elseValue: 'bar',
      fn: invokee
    };

    invokeIfElseInConfig(config);

    expect(_value).toEqual('foo');
  });

  it('should  invoke function with else value if value is not valid with hasValue', () => {
    let _value: any;

    const invokee: (_result: any) => any = function (_result: any) {
      _value = _result;
    };

    const config: IInvokeIfElseIn = {
      src: test,
      keys: 'a.b.e',
      elseValue: 'bar',
      fn: invokee
    };

    invokeIfElseInConfig(config);

    expect(_value).toEqual('bar');
  });

  it('should  invoke function with else value if value is not valid with hasValue', () => {
    let _value: any;

    const invokee: (_result: any) => any = function (_result: any) {
      _value = _result;
    };

    const config: IInvokeIfElseIn = {
      src: test,
      keys: 'a.b.d',
      elseValue: 'bar',
      fn: invokee
    };

    invokeIfElseInConfig(config);

    expect(_value).toEqual('bar');
  });

  it('should invoke inside of class with valid value', () => {
    class TestInvoke {
      value: any;

      constructor(testInject: any) {
        const config: IInvokeIfElseIn = {
          src: testInject,
          keys: 'a.b.c',
          elseValue: 'bar',
          fn: this.invokee,
          context: this
        };

        // 'this' is required to pass context of class
        invokeIfElseInConfig(config);
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
        const config: IInvokeIfElseIn = {
          src: testInject,
          keys: 'a.b.d',
          elseValue: 'bar',
          fn: this.invokee,
          context: this
        };

        // 'this' is required to pass context of class
        invokeIfElseInConfig(config);
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

    expect(testObject.value).toEqual('bar');
  });
});
