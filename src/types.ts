import * as d3 from 'd3';
import { Word as CloudWord } from 'd3-cloud';

export type MinMaxPair = [number, number];

export type Selection = d3.Selection<SVGElement, {}, SVGElement, {}>;

export enum Scale {
  Linear = 'linear',
  Log = 'log',
  Sqrt = 'sqrt',
}

export enum Spiral {
  Archimedean = 'archimedean',
  Rectangular = 'rectangular',
}

export interface Callbacks {
  getWordColor?: (word: Word) => string;
  getWordTooltip?: (word: Word) => string;
  onWordClick?: (word: Word) => void;
  onWordMouseOut?: (word: Word) => void;
  onWordMouseOver?: (word: Word) => void;
}

export interface Options {
  colors: string[];
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
  transitionDuration: number;
}

export interface Word extends CloudWord {
  text: string;
  value: number;
}
