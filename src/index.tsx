import { descending } from 'd3';
import * as d3Cloud from 'd3-cloud';
import * as React from 'react';

import { useResponsiveSVGSelection } from './hooks';
import render from './render';
import { Callbacks, MinMaxPair, Options, Scale, Spiral, Word } from './types';
import { getDefaultColors, getFontScale, getText, rotate } from './utils';

const { useEffect } = React;

const d3 = { cloud: d3Cloud };

const MAX_LAYOUT_ATTEMPTS = 10;
const SHRINK_FACTOR = 0.95;

export const defaultCallbacks: Callbacks = {
  getWordTooltip: ({ text, value }: Word) => `${text} (${value})`,
};

export const defaultOptions: Options = {
  colors: getDefaultColors(),
  enableTooltip: true,
  fontFamily: 'times new roman',
  fontSizes: [4, 32],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 1,
  rotationAngles: [-90, 90],
  rotations: undefined,
  scale: Scale.Sqrt,
  spiral: Spiral.Archimedean,
  transitionDuration: 600,
};

export interface Props {
  /**
   * Callbacks to control various word properties and behaviors (getWordColor,
   * getWordTooltip, onWordClick, onWordMouseOut, onWordMouseOver).
   */
  callbacks?: Callbacks;
  /**
   * Set minimum [width, height] values for the SVG container.
   */
  minSize?: MinMaxPair;
  /**
   * Maximum number of words to display.
   */
  maxWords?: number;
  /**
   * Configure wordcloud with various options (colors, enableTooltip,
   * fontFamily, fontSizes, fontStyle, fontWeight, padding, rotationAngles,
   * rotations, scale, spiral, transitionDuration).
   */
  options?: Options;
  /**
   * Set explicit [width, height] values for the SVG container.  This will
   * disable responsive resizing.
   */
  size?: MinMaxPair;
  /**
   * An array of word.  A word must contain the 'text' and 'value' keys.
   */
  words: Word[];
}

function Wordcloud({
  callbacks,
  maxWords,
  options,
  minSize,
  size: initialSize,
  words,
}: Props): React.ReactElement {
  const { ref, selections, size } = useResponsiveSVGSelection(
    minSize,
    initialSize,
  );
  const selection = selections.g;

  // render viz
  useEffect(() => {
    const mergedCallbacks = { ...defaultCallbacks, ...callbacks };
    const mergedOptions = { ...defaultOptions, ...options };

    if (selection) {
      const {
        fontFamily,
        fontStyle,
        fontSizes,
        fontWeight,
        padding,
        rotations,
        rotationAngles,
        spiral,
        scale,
      } = mergedOptions;

      const sortedWords = words
        .concat()
        .sort((x, y) => descending(x.value, y.value))
        .slice(0, maxWords);

      const layout = d3
        .cloud()
        .size(size)
        .padding(padding)
        .words(sortedWords)
        .rotate(() => {
          if (rotations === undefined) {
            // default rotation algorithm
            return (~~(Math.random() * 6) - 3) * 30;
          } else {
            return rotate(rotations, rotationAngles);
          }
        })
        .spiral(spiral)
        .text(getText)
        .font(fontFamily)
        .fontStyle(fontStyle)
        .fontWeight(fontWeight);

      const draw = (fontSizes: MinMaxPair, attempts: number = 1): void => {
        layout
          .fontSize((word: Word) => {
            const fontScale = getFontScale(sortedWords, fontSizes, scale);
            return fontScale(word.value);
          })
          .on('end', (computedWords: Word[]) => {
            if (
              sortedWords.length !== computedWords.length &&
              attempts <= MAX_LAYOUT_ATTEMPTS
            ) {
              // KNOWN ISSUE: Unable to render long words with high frequency.
              // (https://github.com/jasondavies/d3-cloud/issues/36)
              // Recursively layout and decrease font-sizes by a SHRINK_FACTOR.
              // Bail out with a warning message after MAX_LAYOUT_ATTEMPTS.
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
              render(selection, computedWords, mergedOptions, mergedCallbacks);
            }
          })
          .start();
      };
      draw(fontSizes);
    }
  }, [callbacks, maxWords, options, selection, size, words]);

  return <div ref={ref} />;
}

Wordcloud.defaultProps = {
  callbacks: defaultCallbacks,
  maxWords: 100,
  minSize: [300, 300],
  options: defaultOptions,
};

export default Wordcloud;
