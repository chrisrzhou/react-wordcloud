import * as d3 from 'd3';
import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { MinMaxPair, Selection } from './types';

const { useEffect, useRef, useReducer } = React;

interface State {
  ref: React.RefObject<HTMLDivElement>;
  selections: {
    g: Selection;
    svg: Selection;
  };
  size: MinMaxPair;
}

interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

function reducer(state: State, action: Action): State {
  const { type, payload } = action;
  switch (type) {
    case 'SET_SIZE':
      return {
        ...state,
        size: payload,
      };
    case 'SET_SELECTIONS':
      return {
        ...state,
        selections: payload,
      };
    default:
      return state;
  }
}

export function useResponsiveSVGSelection<T>(
  minSize: MinMaxPair,
  initialSize?: MinMaxPair,
): State {
  const ref = useRef<HTMLDivElement>();
  const svg = useRef<Selection>();
  const g = useRef<Selection>();
  const [state, dispatch] = useReducer(reducer, {
    ref,
    selections: {
      g: null,
      svg: null,
    },
    size: initialSize,
  });

  // set initial svg and size
  useEffect(() => {
    function updateSize(width: number, height: number): void {
      svg.current.attr('height', height).attr('width', width);
      g.current.attr('transform', `translate(${width / 2}, ${height / 2})`);
      dispatch({
        type: 'SET_SIZE',
        payload: [width, height],
      });
    }

    // set svg selections
    const element = ref.current;
    svg.current = d3
      .select(element)
      .append('svg')
      .style('display', 'block'); // inline svg leave white space
    g.current = svg.current.append('g');
    dispatch({
      type: 'SET_SELECTIONS',
      payload: {
        g: g.current,
        svg: svg.current,
      },
    });

    // update initial size
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
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries || !entries.length) {
        return;
      }
      if (initialSize === undefined) {
        let { width, height } = entries[0].contentRect;
        updateSize(width, height);
      }
    });
    resizeObserver.observe(element);

    // cleanup
    return () => {
      resizeObserver.unobserve(element);
      d3.select(element)
        .selectAll('*')
        .remove();
    };
  }, [initialSize, minSize]);

  return state;
}
