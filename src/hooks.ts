import * as d3 from 'd3';
import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { MinMaxPair, Selection } from './types';

const { useEffect, useRef, useState } = React;

export function useResize(ref: React.RefObject<HTMLDivElement>): MinMaxPair {
  const [size, setSize] = useState<MinMaxPair>([0, 0]);

  useEffect(() => {
    const element = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries || !entries.length) {
        return;
      }
      const { width, height } = entries[0].contentRect;
      setSize([width, height]);
    });
    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, []);
  return size;
}

export function useResponsiveSVG<T>(
  minSize: MinMaxPair,
  initialSize?: MinMaxPair,
): [React.RefObject<HTMLDivElement>, Selection, MinMaxPair] {
  const ref = useRef();
  const [selection, setSelection] = useState();
  const [size, setSize] = useState(initialSize);
  const resized = useResize(ref);

  useEffect(() => {
    const element = ref.current;
    const {
      offsetWidth: parentWidth,
      offsetHeight: parentHeight,
    } = element.parentNode;

    // Update size with the following logic:
    // - Use initialSize if it is provided
    // - Use parentNode size if resized has not updated
    // - Use resized when there are resize changes
    // - Ensure that minSize is always applied/handled before updating size
    let width;
    let height;
    if (initialSize !== undefined) {
      [width, height] = initialSize;
    } else {
      if (resized[0] === 0 && resized[0] === 0) {
        width = parentWidth;
        height = parentHeight;
      } else {
        [width, height] = resized;
      }
    }
    width = Math.max(width, minSize[0]);
    height = Math.max(height, minSize[1]);
    setSize([width, height]);

    if (size !== undefined) {
      setSelection(
        d3
          .select(element)
          .append('svg')
          .attr('height', height)
          .attr('width', width)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`),
      );
    }

    return () => {
      d3.select(ref.current)
        .selectAll('*')
        .remove();
    };
  }, [initialSize, initialSize === undefined && (resized[0] || resized[1])]);

  return [ref, selection, size];
}
