import { descending } from 'd3';
import * as d3Cloud from 'd3-cloud';
import * as React from 'react';

import { useResponsiveSVGSelection } from './hooks';
import render from './render';
import { Callbacks, MinMaxPair, Options, Scale, Spiral, Word } from './types';
import { getDefaultColors, getFontScale, getText, rotate } from './utils';

const { useEffect } = React;

const d3 = { cloud: d3Cloud };

export const defaultCallbacks: Callbacks = {
  getWordTooltip: ({ text, value }: Word) => `${text} (${value})`,
};

export const defaultOptions: Options = {
  colors: getDefaultColors(),
  enableTooltip: true,
  fontFamily: 'times new roman',
  fontSizes: [5, 40],
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
    const layout = d3.cloud();
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
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `${fontSizes[1]}px ${fontFamily}`;

      if (rotations !== undefined) {
        layout.rotate(() => rotate(rotations, rotationAngles));
      }

      const sortedWords = words
        .concat()
        .sort((x, y) => descending(x.value, y.value))
        .slice(0, maxWords);

      layout
        .size(size)
        .padding(padding)
        .words(sortedWords)
        .spiral(spiral)
        .text(getText)
        .font(fontFamily)
        .fontStyle(fontStyle)
        .fontWeight(fontWeight);

      const draw = (fontSizes: MinMaxPair): void => {
        layout
          .fontSize((word: Word) => {
            const fontScale = getFontScale(words, fontSizes, scale);
            return fontScale(word.value);
          })
          .on('end', () => {
            // For each word, we derive the x/y width projections based on the
            // rotation angle.  Calculate the scale factor of the respective
            // width projections against the svg container width and height.
            // Apply a universal font-size scaling (maximum value = 1) in render
            let widthX = 0;
            let widthY = 0;
            sortedWords.forEach(word => {
              const wordWidth = ctx.measureText(word.text).width * 1.1;
              const angle = (word.rotate / 180) * Math.PI;
              widthX = Math.max(wordWidth * Math.cos(angle), widthX);
              widthY = Math.max(wordWidth * Math.sin(angle), widthY);
            });
            const scaleFactorX = size[0] / widthX;
            const scaleFactorY = size[1] / widthY;
            const scaleFactor = Math.min(1, scaleFactorX, scaleFactorY);
            render(
              selection,
              sortedWords,
              mergedOptions,
              mergedCallbacks,
              scaleFactor,
            );
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
  minSize: [200, 150],
  options: defaultOptions,
};

export default Wordcloud;
