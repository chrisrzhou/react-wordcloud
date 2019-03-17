import * as d3 from 'd3';

import { MinMaxPair, Scale, Word } from './types';

export function choose<T = number | string>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getDefaultColors(): string[] {
  return d3
    .range(20)
    .map(number => number.toString())
    .map(d3.scaleOrdinal(d3.schemeCategory10));
}

export function getFontScale(
  words: Word[],
  fontSizes: MinMaxPair,
  scale: Scale,
): (n: number) => number {
  const minSize = d3.min(words, (word: Word) => word.value);
  const maxSize = d3.max(words, (word: Word) => word.value);
  const Scales = {
    [Scale.Linear]: d3.scaleLinear,
    [Scale.Log]: d3.scaleLog,
    [Scale.Sqrt]: d3.scaleSqrt,
  };
  const fontScale = (Scales[scale] || d3.scaleLinear)()
    .domain([minSize, maxSize])
    .range(fontSizes);
  return fontScale;
}

export function getText(word: Word): string {
  return word.text;
}

export function getFontSize(word: Word): string {
  return `${word.size}px`;
}

export function getTransform(word: Word): string {
  const translate = `translate(${word.x}, ${word.y})`;
  const rotate =
    typeof word.rotate === 'number' ? `rotate(${word.rotate})` : '';
  return translate + rotate;
}

export function rotate(rotations: number, rotationAngles: MinMaxPair): number {
  if (rotations < 1) {
    return 0;
  }
  let angles: number[] = [];
  if (rotations === 1) {
    angles = [rotationAngles[0]];
  } else {
    angles = [...rotationAngles];
    const increment = (rotationAngles[1] - rotationAngles[0]) / (rotations - 1);
    let angle = rotationAngles[0] + increment;
    while (angle < rotationAngles[1]) {
      angles.push(angle);
      angle += increment;
    }
  }
  return choose(angles);
}
