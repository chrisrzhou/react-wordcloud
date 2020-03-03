import debounce from 'lodash.debounce';
import React, { useEffect, useRef } from 'react';

import { useResponsiveSVGSelection } from './hooks';
import { layout } from './layout';
import * as types from './types';
import { getDefaultColors } from './utils';

export * from './types';

export const defaultCallbacks: types.Callbacks = {
  getWordTooltip: ({ text, value }) => `${text} (${value})`,
};

export const defaultOptions: types.Options = {
  colors: getDefaultColors(),
  deterministic: false,
  enableOptimizations: false,
  enableTooltip: true,
  fontFamily: 'times new roman',
  fontSizes: [4, 32],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 1,
  rotationAngles: [-90, 90],
  scale: types.Scale.Sqrt,
  spiral: types.Spiral.Rectangular,
  transitionDuration: 600,
};

export interface Props {
  /**
   * Callbacks to control various word properties and behaviors.
   */
  callbacks?: types.CallbacksProp;
  /**
   * Maximum number of words to display.
   */
  maxWords?: number;
  /**
   * Set minimum [width, height] values for the SVG container.
   */
  minSize?: types.MinMaxPair;
  /**
   * Configure wordcloud with various options.
   */
  options?: types.OptionsProp;
  /**
   * Set explicit [width, height] values for the SVG container.  This will disable responsive resizing.
   */
  size?: types.MinMaxPair;
  /**
   * An array of word.  A word is an object that must contain the 'text' and 'value' keys.
   */
  words: types.Word[];
}

export default function Wordcloud({
  callbacks,
  maxWords = 100,
  minSize,
  options,
  size: initialSize,
  words,
}: Props): JSX.Element {
  const mergedCallbacks = { ...defaultCallbacks, ...callbacks };
  const mergedOptions = { ...defaultOptions, ...options };

  const [ref, selection, size] = useResponsiveSVGSelection(
    minSize,
    initialSize,
  );

  const render = useRef(debounce(layout, 100));

  useEffect(() => {
    if (selection) {
      render.current({
        callbacks: mergedCallbacks,
        maxWords,
        options: mergedOptions,
        selection,
        size,
        words,
      });
    }
  }, [maxWords, mergedCallbacks, mergedOptions, selection, size, words]);

  return <div ref={ref} />;
}

Wordcloud.defaultProps = {
  callbacks: defaultCallbacks,
  maxWords: 100,
  minSize: [300, 300],
  options: defaultOptions,
};
