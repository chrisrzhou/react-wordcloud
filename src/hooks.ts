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
    if (initialSize !== undefined) {
      // Use initialSize if it is provided
      [width, height] = initialSize;
    } else {
      // Use parentNode size if resized has not updated
      width = element.parentElement.offsetWidth;
      height = element.parentElement.offsetHeight;
    }
    width = Math.max(width, minSize[0]);
    height = Math.max(height, minSize[1]);
    updateSize(width, height);

    // update resize using a resize observer
    const resizeObserver = new ResizeObserver((entries): void => {
      if (!entries || !entries.length) {
        return;
      }
      if (initialSize === undefined) {
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
  }, [initialSize, minSize]);

  return [elementRef, selection, size];
}
