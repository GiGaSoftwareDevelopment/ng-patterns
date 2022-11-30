import { removeAllBy } from './removeAllBy';

describe('removeAllBy', () => {
  let data: any[];

  beforeEach(() => {
    data = [{ x: '1', y: '1' }, { x: '2', y: '2' }, { x: '3', y: '3' }];
  });

  afterEach(() => {
    data = [];
  });

  it('should remove by string', () => {
    const result: any[] = removeAllBy(data, [{ x: '2' }, { x: '3' }], 'x');
    expect(result.length).toEqual(1);
    expect(result[0].x).toEqual('1');
  });

  it('should remove by function', () => {
    const removeFn = (dataItem: any, removeItem: any): boolean => {
      return dataItem.x === removeItem.x;
    };

    const result: any[] = removeAllBy(data, [{ x: '2' }, { x: '3' }], removeFn);
    expect(result.length).toEqual(1);
    expect(result[0].x).toEqual('1');
  });
});
