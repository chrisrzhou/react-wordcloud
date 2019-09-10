import 'd3-transition';

import { event } from 'd3-selection';
import tippy, { Instance } from 'tippy.js';

import { Callbacks, Enter, Options, Selection, Word } from './types';
import { choose, getFontSize, getText, getTransform } from './utils';

let tooltipInstance: Instance;

export default function render(
  selection: Selection,
  words: Word[],
  options: Options,
  callbacks: Callbacks,
  random: () => number,
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
    return getWordColor ? getWordColor(word) : choose(colors, random);
  }

  // load words
  const vizWords = selection.selectAll('text').data(words);

  vizWords.join(
    (enter: Enter): Selection => {
      return enter
        .append('text')
        .on('click', (word): void => {
          onWordClick(word, event);
        })
        .on('mouseover', (word): void => {
          if (enableTooltip) {
            tooltipInstance = tippy(event.target, {
              animation: 'scale',
              arrow: true,
              content: (): string => {
                return getWordTooltip(word);
              },
            }) as Instance;
          }
          onWordMouseOver && onWordMouseOver(word, event);
        })
        .on('mouseout', (word): void => {
          if (tooltipInstance) {
            tooltipInstance.destroy();
          }
          onWordMouseOut && onWordMouseOut(word, event);
        })
        .attr('cursor', onWordClick ? 'pointer' : 'default')
        .attr('fill', getFill)
        .attr('font-family', fontFamily)
        .attr('font-style', fontStyle)
        .attr('font-weight', fontWeight)
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(0, 0) rotate(0)')
        .call(enter =>
          enter
            .transition()
            .duration(transitionDuration)
            .attr('font-size', getFontSize)
            .attr('transform', getTransform)
            .text(getText),
        );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (update: Selection): any => {
      return update
        .transition()
        .duration(transitionDuration)
        .attr('fill', getFill)
        .attr('font-family', fontFamily)
        .attr('font-size', getFontSize)
        .attr('transform', getTransform)
        .text(getText);
    },
    (exit: Selection): void => {
      exit
        .transition()
        .duration(transitionDuration)
        .attr('fill-opacity', 0)
        .remove();
    },
  );
}
