import * as d3Scale from 'd3-scale';

import { Scale } from './types';

export function getScale(scale: Scale): Function {
  switch (scale) {
    case Scale.Linear:
      return d3Scale.scaleLinear;
    case Scale.Log:
      return d3Scale.scaleLog;
    case Scale.Sqrt:
    default:
      return d3Scale.scaleSqrt;
  }
}

export function choose<T = number | string>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
