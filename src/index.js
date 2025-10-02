import debounce from 'lodash.debounce';
import React, { useEffect, useMemo, useRef } from 'react';

import { useResponsiveSvgSelection } from './hooks';
import { layout } from './layout';
import { getDefaultColors } from './utils';

export const defaultCallbacks = {
  getWordTooltip: ({ text, value }) => `${text} (${value})`,
};

const defaultColors = getDefaultColors();

export const defaultOptions = {
  colors: defaultColors,
  deterministic: false,
  enableOptimizations: false,
  enableTooltip: true,
  fontFamily: 'times new roman',
  fontSizes: [4, 32],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 1,
  rotationAngles: [-90, 90],
  scale: 'sqrt',
  spiral: 'rectangular',
  tooltipOptions: {},
  transitionDuration: 600,
};

const DEFAULT_MIN_SIZE = [300, 300];

function ReactWordCloud({
  callbacks = defaultCallbacks,
  maxWords = 100,
  minSize: minSizeProp,
  options = defaultOptions,
  size: initialSize,
  words,
  ...rest
}) {
  const minSize = useMemo(() => minSizeProp || DEFAULT_MIN_SIZE, [minSizeProp]);

  const svgAttributes = useMemo(() => options.svgAttributes, [
    options.svgAttributes,
  ]);

  const [ref, selection, size] = useResponsiveSvgSelection(
    minSize,
    initialSize,
    svgAttributes,
  );

  const render = useRef(debounce(layout, 100));

  useEffect(() => {
    if (selection) {
      const mergedCallbacks = { ...defaultCallbacks, ...callbacks };
      const mergedOptions = { ...defaultOptions, ...options };

      render.current({
        callbacks: mergedCallbacks,
        maxWords,
        options: mergedOptions,
        selection,
        size,
        words,
      });
    }
    // Note: 'size' is intentionally excluded from dependencies to prevent
    // potential infinite loops, as it's updated by useResponsiveSvgSelection.
    // The debounced render function will use the latest size value via closure.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callbacks, maxWords, options, selection, words]);

  return <div ref={ref} style={{ height: '100%', width: '100%' }} {...rest} />;
}

export default ReactWordCloud;
