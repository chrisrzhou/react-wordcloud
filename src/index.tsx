import * as d3Cloud from 'd3-cloud';
import * as React from 'react';

import { useResponsiveSVG } from './hooks';
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
  fontFamily: 'impact',
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

interface Props {
  callbacks: Callbacks;
  minSize: MinMaxPair;
  maxWords: number;
  options: Options;
  size: MinMaxPair;
  words: Word[];
}

function Wordcloud({
  callbacks,
  maxWords,
  options,
  minSize,
  size: initialSize,
  words,
}: Props): React.ReactNode {
  const [ref, selection, size] = useResponsiveSVG(minSize, initialSize);

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
        rotations,
        rotationAngles,
        spiral,
        scale,
      } = mergedOptions;

      const sortedWords = words
        .concat()
        .sort()
        .slice(0, maxWords);

      if (rotations !== undefined) {
        layout.rotate(() => rotate(rotations, rotationAngles));
      }

      layout
        .size(size)
        .padding(1)
        .words(words)
        .spiral(spiral)
        .text(getText)
        .font(fontFamily)
        .fontSize((word: Word) => {
          const fontScale = getFontScale(words, fontSizes, scale);
          return fontScale(word.value);
        })
        .fontStyle(fontStyle)
        .fontWeight(fontWeight)
        .on('end', () => {
          render(selection, sortedWords, mergedOptions, mergedCallbacks);
        })
        .start();
    }
  }, [callbacks, maxWords, options, selection, size, words]);

  // outer div is the parent container while inner div houses the wordcloud svg
  return (
    <div>
      <div ref={ref} />
    </div>
  );
}

Wordcloud.defaultProps = {
  callbacks: defaultCallbacks,
  maxWords: 100,
  minSize: [200, 150],
  options: defaultOptions,
};

export default Wordcloud;
