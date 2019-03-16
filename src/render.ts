import * as d3 from 'd3';
import tippy, { Instance } from 'tippy.js';

import { Callbacks, Options, Selection, Word } from './types';
import { choose, getFontSize, getText, getTransform } from './utils';

let tooltipInstance: Instance;

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

  // load words
  const vizWords = selection.selectAll('text').data(words);

  // enter transition
  vizWords
    .enter()
    .append('text')
    .on('click', onWordClick)
    .on('mouseover', word => {
      if (enableTooltip) {
        tooltipInstance = tippy(d3.event.target, {
          animation: 'scale',
          arrow: true,
          content: () => {
            return getWordTooltip(word);
          },
        }) as Instance;
      }
      onWordMouseOver && onWordMouseOver(word);
    })
    .on('mouseout', word => {
      if (tooltipInstance) {
        tooltipInstance.destroy();
      }
      onWordMouseOut && onWordMouseOut(word);
    })
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
}
