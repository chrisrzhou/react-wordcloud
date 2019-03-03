import * as React from 'react';

import { useSvg } from './hooks';
import render from './render';
import { Callbacks, Options, Scale, Spiral, Word } from './types';
import { getDefaultColors } from './utils';

const { useEffect } = React;

interface Props {
  callbacks: Callbacks;
  maxWords: number;
  options: Options;
  size: [number, number];
  words: Word[];
}

function Wordcloud({
  callbacks,
  maxWords,
  options,
  size,
  words,
}: Props): React.ReactNode {
  const [width, height] = size;
  const { ref, selection } = useSvg(width, height);

  useEffect(() => {
    if (selection) {
      const sortedWords = words
        .concat()
        .sort()
        .slice(0, maxWords);
      render(selection, size, sortedWords, options, callbacks);
    }
  }, [options, maxWords, selection, size, words]);

  return <div ref={ref} />;
}

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

Wordcloud.defaultProps = {
  callbacks: {},
  maxWords: 100,
  options: defaultOptions,
  size: [400, 300],
};

export default Wordcloud;
