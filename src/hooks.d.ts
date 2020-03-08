import { MinMaxPair, Selection } from './types';

export function useResponsiveSvgSelection<T>(
	minSize: MinMaxPair,
	initialSize?: MinMaxPair,
): [React.MutableRefObject<HTMLDivElement>, Selection, MinMaxPair];
