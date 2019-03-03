import * as d3 from 'd3';
import * as React from 'react';

import { Selection } from './types';

const { useEffect, useRef, useState } = React;

export function useSvg<T>(
  width: number,
  height: number,
): {
  ref: React.RefObject<HTMLDivElement>;
  selection: Selection;
} {
  const ref = useRef();
  const [selection, setSelection] = useState();

  useEffect(() => {
    setSelection(
      d3
        .select(ref.current)
        .append('svg')
        .attr('height', height)
        .attr('width', width)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`),
    );
    return () => {
      d3.select(ref.current)
        .selectAll('*')
        .remove();
    };
  }, []);

  return {
    ref,
    selection,
  };
}
