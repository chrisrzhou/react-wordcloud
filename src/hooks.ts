import { select } from 'd3-selection';
import { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { MinMaxPair, Selection } from './types';

export function useResponsiveSVGSelection<T>(
  minSize: MinMaxPair,
  initialSize?: MinMaxPair,
): [React.MutableRefObject<HTMLDivElement>, Selection, MinMaxPair] {
  const elementRef = useRef<HTMLDivElement>();
  const [size, setSize] = useState(initialSize);
  const [selection, setSelection] = useState(null);
  const [minWidth, minHeight] = minSize;
  const [initialWidth, initialHeight] = initialSize
    ? initialSize
    : [null, null];

  useEffect(() => {
    const element = elementRef.current;

    // set svg selection
    const svg = select(element)
      .append('svg')
      .style('display', 'block'); // native inline svg leaves undesired white space
    const selection = svg.append('g');
    setSelection(selection);

    function updateSize(width: number, height: number): void {
      svg.attr('height', height).attr('width', width);
      selection.attr('transform', `translate(${width / 2}, ${height / 2})`);
      setSize([width, height]);
    }

    let width = 0;
    let height = 0;
    const isInitialSizeUndefined =
      initialWidth == null || initialHeight == null;
    if (isInitialSizeUndefined) {
      width = initialWidth;
      height = initialHeight;
    } else {
      // Use parentNode size if resized has not updated
      width = element.parentElement.offsetWidth;
      height = element.parentElement.offsetHeight;
    }
    width = Math.max(width, minWidth);
    height = Math.max(height, minHeight);
    updateSize(width, height);

    // update resize using a resize observer
    const resizeObserver = new ResizeObserver((entries): void => {
      if (!entries || !entries.length) {
        return;
      }
      if (isInitialSizeUndefined) {
        const { width, height } = entries[0].contentRect;
        updateSize(width, height);
      }
    });
    resizeObserver.observe(element);

    // cleanup
    return (): void => {
      resizeObserver.unobserve(element);
      select(element)
        .selectAll('*')
        .remove();
    };
  }, [initialHeight, initialWidth, minHeight, minWidth]);

  return [elementRef, selection, size];
}
