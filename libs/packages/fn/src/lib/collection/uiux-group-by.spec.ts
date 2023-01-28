import { uiuxGroupBy } from './uiux-group-by';

describe('uiuxGroupBy', () => {

  it('should group odd or even', () => {
    const arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    const expected = { odd: [ 1, 3, 5, 7, 9 ], even: [ 2, 4, 6, 8 ] };
    expect(uiuxGroupBy(arr, v => (v % 2 ? 'odd' : 'even'))).toEqual(expected)
  })

  it('should group by first letter', () => {
    const colors = [
      'Apricot',
      'Brown',
      'Burgundy',
      'Cerulean',
      'Peach',
      'Pear',
      'Red'
    ];

    const expected = {
      A: [ 'Apricot' ],
      B: [ 'Brown', 'Burgundy' ],
      C: [ 'Cerulean' ],
      P: [ 'Peach', 'Pear' ],
      R: [ 'Red' ]
    };

    expect(uiuxGroupBy(colors, v => v[0])).toEqual(expected);
  })

  it('should group by length of string', () => {
    const colors = [
      'Apricot',
      'Brown',
      'Burgundy',
      'Cerulean',
      'Peach',
      'Pear',
      'Red'
    ];

    const expected =
      {
        3: [ 'Red' ],
        4: [ 'Pear' ],
        5: [ 'Brown', 'Peach' ],
        7: [ 'Apricot' ],
        8: [ 'Burgundy', 'Cerulean' ]
      }

    expect(uiuxGroupBy(colors, (v: string) => v.length.toString(10))).toEqual(expected);
  })

  it('should group by property', () => {

    const data = [
      { comment: 'abc', forItem: 1, inModule: 1 },
      { comment: 'pqr', forItem: 1, inModule: 1 },
      { comment: 'klm', forItem: 1, inModule: 2 },
      { comment: 'xyz', forItem: 1, inModule: 2 }
    ];

    const expected =
      {
        1: [
          { comment: 'abc', forItem: 1, inModule: 1 },
          { comment: 'pqr', forItem: 1, inModule: 1 }
        ],
        2: [
          { comment: 'klm', forItem: 1, inModule: 2 },
          { comment: 'xyz', forItem: 1, inModule: 2 }
        ]
      }

    expect(uiuxGroupBy(data, v => v.inModule.toString(10))).toEqual(expected)

  })

  it('should concat group key', () => {
    const data = [
      { comment: 'abc', forItem: 1, inModule: 1 },
      { comment: 'pqr', forItem: 1, inModule: 1 },
      { comment: 'klm', forItem: 1, inModule: 2 },
      { comment: 'xyz', forItem: 1, inModule: 2 }
    ];

    const expected =
      {
        '1-1': [
          { comment: 'abc', forItem: 1, inModule: 1 },
          { comment: 'pqr', forItem: 1, inModule: 1 }
        ],
        '1-2': [
          { comment: 'klm', forItem: 1, inModule: 2 },
          { comment: 'xyz', forItem: 1, inModule: 2 }
        ]
      }

      expect(uiuxGroupBy(data,  x => x.forItem + "-" + x.inModule)).toEqual(expected)
  })


})
