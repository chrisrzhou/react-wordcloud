import * as d3 from 'd3';

import { Scale, Word } from './types';

const Scales = {
  [Scale.Linear]: d3.scaleLinear,
  [Scale.Log]: d3.scaleLinear,
  [Scale.Sqrt]: d3.scaleLinear,
};

export function choose<T = number | string>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getDefaultColors(): string[] {
  return d3
    .range(20)
    .map(number => number.toString())
    .map(d3.scaleOrdinal(d3.schemeCategory10));
}

export function getFontSize(
  words: Word[],
  fontSizes: [number, number],
  scale: Scale,
): (word: Word) => number {
  return function(word: Word): number {
    const minSize = d3.min(words, (word: Word) => word.count);
    const maxSize = d3.max(words, (word: Word) => word.count);
    const fontScale = Scales[scale]()
      .domain([minSize, maxSize])
      .range(fontSizes);
    return fontScale(word.count);
  };
}
