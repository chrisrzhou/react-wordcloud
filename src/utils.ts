import { max, min, range } from 'd3-array';
import { scaleLinear, scaleLog, scaleOrdinal, scaleSqrt } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

import { MinMaxPair, Scale, Word } from './types';

export function choose<T = number | string>(
  array: T[],
  random: () => number,
): T {
  return array[Math.floor(random() * array.length)];
}

export function getDefaultColors(): string[] {
  return range(20)
    .map(number => number.toString())
    .map(scaleOrdinal(schemeCategory10));
}

export function getFontScale(
  words: Word[],
  fontSizes: MinMaxPair,
  scale: Scale,
): (n: number) => number {
  const minSize = min(words, word => word.value);
  const maxSize = max(words, word => word.value);
  let scaleFunction;
  switch (scale) {
    case Scale.Log:
      scaleFunction = scaleLog;
      break;
    case Scale.Sqrt:
      scaleFunction = scaleSqrt;
      break;
    case Scale.Linear:
    default:
      scaleFunction = scaleLinear;
      break;
  }
  const fontScale = scaleFunction()
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

export function rotate(
  rotations: number,
  rotationAngles: MinMaxPair,
  random: () => number,
): number {
  if (rotations < 1) {
    return 0;
  }
  let angles = [];
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
  return choose(angles, random);
}
