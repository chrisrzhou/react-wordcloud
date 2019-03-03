import * as d3Cloud from 'd3-cloud';

import { Callbacks, Options, Selection, Word } from './types';
import { choose, getFontSize } from './utils';

// rollup thinks we are calling the module otherwise
const d3 = { cloud: d3Cloud };

function getText(word: Word): string {
  return word.text;
}

function getWordFontSize(word: Word): string {
  return `${word.size}px`;
}

function getTransform(word: Word): string {
  const translate = `translate(${word.x}, ${word.y})`;
  const rotate =
    typeof word.rotate === 'number' ? `rotate(${word.rotate})` : '';
  return translate + rotate;
}
export default function render(
  selection: Selection,
  size: [number, number],
  words: Word[],
  options: Options,
  callbacks: Callbacks,
): void {
  const {
    getWordColor,
    onWordClick,
    onWordMouseOver,
    onWordMouseOut,
  } = callbacks;
  const {
    colors,
    fontFamily,
    fontSizes,
    fontStyle,
    fontWeight,
    rotationAngles,
    rotations,
    scale,
    spiral,
  } = options;

  const layout = d3.cloud();

  // compute rotations based on orientations and angles
  if (rotations === 0) {
    layout.rotate(0);
  }
  if (rotations > 0) {
    let angles: number[] = [];
    if (rotations === 1) {
      angles = [rotationAngles[0]];
    } else {
      angles = rotationAngles;
      const increment =
        (rotationAngles[1] - rotationAngles[0]) / (rotations - 1);
      let angle = rotationAngles[0] + increment;
      while (angle < rotationAngles[1]) {
        angles.push(angle);
        angle += increment;
      }
    }
    layout.rotate((): number => choose(angles));
  }

  function getFill(word: Word): string {
    return getWordColor ? getWordColor(word) : choose(colors);
  }

  function draw(words: Word[]): void {
    const { fontFamily, transitionDuration } = options;
    const vizWords = selection.selectAll('text').data(words);

    // enter transition
    vizWords
      .enter()
      .append('text')
      .on('click', onWordClick)
      .on('mouseover', onWordMouseOver)
      .on('mouseout', onWordMouseOut)
      .attr('cursor', onWordClick ? 'pointer' : 'default')
      .attr('fill', getFill)
      .attr('font-family', fontFamily)
      .attr('font-style', fontStyle)
      .attr('font-weight', fontWeight)
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(0, 0) rotate(0)')
      .transition()
      .duration(transitionDuration)
      .attr('font-size', getWordFontSize)
      .attr('transform', getTransform)
      .text(getText);

    // update transition
    vizWords
      .transition()
      .duration(transitionDuration)
      .attr('fill', getFill)
      .attr('font-family', fontFamily)
      .attr('font-size', getWordFontSize)
      .attr('transform', getTransform)
      .text(getText);

    // exit transition
    vizWords
      .exit()
      .transition()
      .duration(transitionDuration)
      .attr('fill-opacity', 0)
      .remove();
  }

  layout
    .size(size)
    .padding(1)
    .words(words)
    .text(getText)
    .spiral(spiral)
    .font(fontFamily)
    .fontSize(getFontSize(words, fontSizes, scale))
    .fontStyle(fontStyle)
    .fontWeight(fontWeight)
    .on('end', draw)
    .start();
}
