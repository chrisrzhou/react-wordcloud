import tippy from 'tippy.js';

import { Callbacks, Options, Selection, Word } from './types';
import { choose, getFontSize, getText, getTransform } from './utils';

const TIPPY_CLASS = 'react-wordcloud-word';

export default function render(
  selection: Selection,
  words: Word[],
  options: Options,
  callbacks: Callbacks,
): void {
  const {
    getWordColor,
    getWordTooltip,
    onWordClick,
    onWordMouseOver,
    onWordMouseOut,
  } = callbacks;
  const { colors, enableTooltip, fontStyle, fontWeight } = options;
  const { fontFamily, transitionDuration } = options;

  function getFill(word: Word): string {
    return getWordColor ? getWordColor(word) : choose(colors);
  }

  // load data
  const vizWords = selection.selectAll('text').data(words);

  // enter transition
  vizWords
    .enter()
    .append('text')
    .on('click', onWordClick)
    .on('mouseover', onWordMouseOver)
    .on('mouseout', onWordMouseOut)
    .attr('data-tippy-content', getWordTooltip)
    .attr('class', TIPPY_CLASS)
    .attr('cursor', onWordClick ? 'pointer' : 'default')
    .attr('fill', getFill)
    .attr('font-family', fontFamily)
    .attr('font-style', fontStyle)
    .attr('font-weight', fontWeight)
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(0, 0) rotate(0)')
    .transition()
    .duration(transitionDuration)
    .attr('font-size', getFontSize)
    .attr('transform', getTransform)
    .text(getText);

  // update transition
  vizWords
    .transition()
    .duration(transitionDuration)
    .attr('fill', getFill)
    .attr('font-family', fontFamily)
    .attr('font-size', getFontSize)
    .attr('transform', getTransform)
    .text(getText);

  // exit transition
  vizWords
    .exit()
    .transition()
    .duration(transitionDuration)
    .attr('fill-opacity', 0)
    .remove();

  if (enableTooltip) {
    tippy(`.${TIPPY_CLASS}`, { animation: 'scale', arrow: true });
  }
}
