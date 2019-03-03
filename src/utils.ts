import * as d3Array from 'd3-array';
import * as d3Scale from 'd3-scale';

import { Scale, Word } from './types';

export function choose<T = number | string>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

const Scales = {
  [Scale.Linear]: d3Scale.scaleLinear,
  [Scale.Log]: d3Scale.scaleLinear,
  [Scale.Sqrt]: d3Scale.scaleLinear,
};

export function getFontSize(
  words: Word[],
  fontSizes: [number, number],
  scale: Scale,
): (word: Word) => number {
  return function(word: Word): number {
    const minSize = d3Array.min(words, word => word.count);
    const maxSize = d3Array.max(words, word => word.count);
    const fontScale = Scales[scale]()
      .domain([minSize, maxSize])
      .range(fontSizes);
    return fontScale(word.count);
  };
}
