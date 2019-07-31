import { Word as CloudWord } from 'd3-cloud';
import { Selection as d3Selection } from 'd3-selection';

export type MinMaxPair = [number, number];

export type Selection = d3Selection<SVGElement, {}, SVGElement, {}>;

export type Scale = 'linear' | 'log' | 'sqrt';

export type Spiral = 'archimedean' | 'rectangular';

export interface Callbacks {
  getWordColor?: (word: Word) => string;
  getWordTooltip: (word: Word) => string;
  onWordClick?: (word: Word) => void;
  onWordMouseOut?: (word: Word) => void;
  onWordMouseOver?: (word: Word) => void;
}

export interface Options {
  colors: string[];
  deterministic: boolean;
  enableTooltip: boolean;
  fontFamily: string;
  fontSizes: MinMaxPair;
  fontStyle: string;
  fontWeight: string;
  padding: number;
  rotationAngles: MinMaxPair;
  rotations?: number;
  scale: Scale;
  spiral: Spiral;
  enableTransition: boolean;
  transitionDuration: number;
}

export type Optional<T> = {
  [P in keyof T]?: T[P];
};

export interface Word extends CloudWord {
  text: string;
  value: number;
}
