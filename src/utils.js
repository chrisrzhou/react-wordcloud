import { max, min, range } from 'd3-array';
import { scaleLinear, scaleLog, scaleOrdinal, scaleSqrt } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

export function choose(array, random) {
  return array[Math.floor(random() * array.length)];
}

export function getDefaultColors() {
  return range(20)
    .map(number => number.toString())
    .map(scaleOrdinal(schemeCategory10));
}

export function getFontScale(words, fontSizes, scale) {
  const minSize = min(words, word => Number(word.value));
  const maxSize = max(words, word => Number(word.value));
  let scaleFunction;
  switch (scale) {
    case 'log':
      scaleFunction = scaleLog;
      break;
    case 'sqrt':
      scaleFunction = scaleSqrt;
      break;
    case 'linear':
    default:
      scaleFunction = scaleLinear;
      break;
  }

  const fontScale = scaleFunction()
    .domain([minSize, maxSize])
    .range(fontSizes);
  return fontScale;
}

export function getFontSize(word) {
  return `${word.size}px`;
}

export function getText(word) {
  return word.text;
}

export function getTransform(word) {
  const translate = `translate(${word.x}, ${word.y})`;
  const rotate =
    typeof word.rotate === 'number' ? `rotate(${word.rotate})` : '';
  return translate + rotate;
}

export function rotate(rotations, rotationAngles, random) {
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
