import { MinMaxPair, Selection } from './types';

export function useResponsiveSvgSelection<T>(
  minSize: MinMaxPair,
  initialSize?: MinMaxPair,
  svgAttributes?: Record<string, string>,
): [React.MutableRefObject<HTMLDivElement>, Selection, MinMaxPair];
