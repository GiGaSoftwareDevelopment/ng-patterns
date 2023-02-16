

export class Unit {




  /**
   *
   * @param _value of unit
   * @param _prefix = 'KM, M, S' etc
   * @param _exp = exponent of unit
   */
  constructor(private _value: number, private _prefix: string, _exp: number) {

    // TODO get base prefix see
    // src/type/unit/Unit.js:544
  }

}
