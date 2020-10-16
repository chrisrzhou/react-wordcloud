import 'd3-transition';

import { descending } from 'd3-array';
import d3Cloud from 'd3-cloud';
import { event } from 'd3-selection';
import clonedeep from 'lodash.clonedeep';
import seedrandom from 'seedrandom';
import tippy from 'tippy.js';

import optimizedD3Cloud from './optimized-d3-cloud';
import {
  choose,
  getFontScale,
  getFontSize,
  getText,
  getTransform,
  rotate,
} from './utils';

export function render({ callbacks, options, random, selection, words }) {
  const {
    getWordColor,
    getWordTooltip,
    onWordClick,
    onWordMouseOver,
    onWordMouseOut,
  } = callbacks;
  const {
    colors,
    enableTooltip,
    fontStyle,
    fontWeight,
    textAttributes,
    tooltipOptions,
  } = options;
  const { fontFamily, transitionDuration } = options;

  function getFill(word) {
    return getWordColor ? getWordColor(word) : choose(colors, random);
  }

  // Load words
  let tooltipInstance;
  const vizWords = selection.selectAll('text').data(words);
  vizWords.join(
    enter => {
      let text = enter
        .append('text')
        .on('click', word => {
          if (onWordClick) {
            onWordClick(word, event);
          }
        })
        .on('mouseover', word => {
          if (
            enableTooltip &&
            (!tooltipInstance || tooltipInstance.isDestroyed)
          ) {
            tooltipInstance = tippy(event.target, {
              animation: 'scale',
              arrow: true,
              content: () => getWordTooltip(word),
              onHidden: (instance) => {
                instance.destroy();
                tooltipInstance = null;
              },
              ...tooltipOptions,
            });
          }

          if (onWordMouseOver) {
            onWordMouseOver(word, event);
          }
        })
        .on('mouseout', word => {
          if (tooltipInstance && !tooltipInstance.state.isVisible) {
            tooltipInstance.destroy();
          }

          if (onWordMouseOut) {
            onWordMouseOut(word, event);
          }
        })
        .attr('cursor', onWordClick ? 'pointer' : 'default')
        .attr('fill', getFill)
        .attr('font-family', fontFamily)
        .attr('font-style', fontStyle)
        .attr('font-weight', fontWeight)
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(0, 0) rotate(0)');

      if (typeof textAttributes === 'object') {
        Object.keys(textAttributes).forEach(key => {
          text = text.attr(key, textAttributes[key]);
        });
      }

      text = text.call(enter =>
        enter
          .transition()
          .duration(transitionDuration)
          .attr('font-size', getFontSize)
          .attr('transform', getTransform)
          .text(getText),
      );
    },
    update => {
      update
        .transition()
        .duration(transitionDuration)
        .attr('fill', getFill)
        .attr('font-family', fontFamily)
        .attr('font-size', getFontSize)
        .attr('transform', getTransform)
        .text(getText);
    },
    exit => {
      exit
        .transition()
        .duration(transitionDuration)
        .attr('fill-opacity', 0)
        .remove();
    },
  );
}

export function layout({
  callbacks,
  maxWords,
  options,
  selection,
  size,
  words,
}) {
  const MAX_LAYOUT_ATTEMPTS = 10;
  const SHRINK_FACTOR = 0.95;
  const {
    deterministic,
    enableOptimizations,
    fontFamily,
    fontStyle,
    fontSizes,
    fontWeight,
    padding,
    randomSeed,
    rotations,
    rotationAngles,
    spiral,
    scale,
  } = options;

  const sortedWords = words
    .concat()
    .sort((x, y) => descending(x.value, y.value))
    .slice(0, maxWords);

  const random = seedrandom(
    deterministic ? randomSeed || 'deterministic' : null,
  );

  let cloud;
  if (enableOptimizations) {
    cloud = optimizedD3Cloud();
  } else {
    cloud = d3Cloud();
  }

  cloud
    .size(size)
    // @ts-ignore
    .padding(padding)
    .words(clonedeep(sortedWords))
    .rotate(() => {
      if (rotations === undefined) {
        // Default rotation algorithm
        return (~~(random() * 6) - 3) * 30;
      }

      return rotate(rotations, rotationAngles, random);
    })
    .spiral(spiral)
    .random(random)
    .text(getText)
    .font(fontFamily)
    .fontStyle(fontStyle)
    .fontWeight(fontWeight);

  function draw(fontSizes, attempts = 1) {
    if (enableOptimizations) {
      cloud.revive();
    }

    cloud
      .fontSize(word => {
        const fontScale = getFontScale(sortedWords, fontSizes, scale);
        return fontScale(word.value);
      })
      .on('end', computedWords => {
        /** KNOWN ISSUE: https://github.com/jasondavies/d3-cloud/issues/36
         * Recursively layout and decrease font-sizes by a SHRINK_FACTOR.
         * Bail out with a warning message after MAX_LAYOUT_ATTEMPTS.
         */
        if (
          sortedWords.length !== computedWords.length &&
          attempts <= MAX_LAYOUT_ATTEMPTS
        ) {
          if (attempts === MAX_LAYOUT_ATTEMPTS) {
            console.warn(
              `Unable to layout ${sortedWords.length -
                computedWords.length} word(s) after ${attempts} attempts.  Consider: (1) Increasing the container/component size. (2) Lowering the max font size. (3) Limiting the rotation angles.`,
            );
          }

          const minFontSize = Math.max(fontSizes[0] * SHRINK_FACTOR, 1);
          const maxFontSize = Math.max(
            fontSizes[1] * SHRINK_FACTOR,
            minFontSize,
          );

          draw([minFontSize, maxFontSize], attempts + 1);
        } else {
          render({
            callbacks,
            options,
            random,
            selection,
            words: computedWords,
          });
        }
      })
      .start();
  }

  draw(fontSizes);
}
