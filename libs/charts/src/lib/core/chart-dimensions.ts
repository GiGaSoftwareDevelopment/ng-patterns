import {D3CanvasDimension} from './chart.models';

export class ChartDimensions {
  private _dimensions: D3CanvasDimension = {
    width: 0,
    height: 0,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  };

  get dimensions() {
    return this._dimensions;
  }

  wrapper = null;
  bounds = null;

  // Values must be greater than or equal to 0 to prevent any issues
  // if a DOM container element outputs a negative value in dimensions
  // for some reason. This is rare, but occasionally happens during
  // angular render phase.
  //
  static atLeastZero(v: number): number {
    return v >= 0 ? v : 0;
  }

  get width() {
    return this._dimensions.width;
  }

  get height() {
    return this._dimensions.height;
  }

  get margin() {
    return this._dimensions.margin;
  }

  get boundedWidth() {
    return ChartDimensions.atLeastZero(
      this._dimensions.width -
        this._dimensions.margin.left -
        this._dimensions.margin.right
    );
  }

  get boundedHeight() {
    return ChartDimensions.atLeastZero(
      this._dimensions.height -
        this._dimensions.margin.top -
        this._dimensions.margin.bottom
    );
  }

  get centerBoundsWidth() {
    return this.boundedWidth / 2;
  }

  get centerBoundsHeight() {
    return this.boundedHeight / 2;
  }

  constructor(config: D3CanvasDimension) {
    this.config(config);
  }

  resize(d: DOMRectReadOnly) {
    this._dimensions.width = ChartDimensions.atLeastZero(d.width);
    this._dimensions.height = ChartDimensions.atLeastZero(d.height);
  }

  private config(d: D3CanvasDimension) {
    this._dimensions.margin.top = ChartDimensions.atLeastZero(d.margin.top);
    this._dimensions.margin.right = ChartDimensions.atLeastZero(d.margin.right);
    this._dimensions.margin.bottom = ChartDimensions.atLeastZero(
      d.margin.bottom
    );
    this._dimensions.margin.left = ChartDimensions.atLeastZero(d.margin.left);
  }
}
