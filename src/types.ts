import * as d3 from 'd3';

export enum Scale {
  Linear = 'linear',
  Log = 'log',
  Sqrt = 'sqrt',
}

export enum Spiral {
  Archimedean = 'archimedean',
  Rectangular = 'rectangular',
}

export type Selection = d3.Selection<SVGElement, {}, SVGElement, {}>;

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
  fontSizes: [number, number];
  fontStyle: string;
  fontWeight: string;
  padding: number;
  rotationAngles: [number, number];
  rotations?: number;
  scale: Scale;
  size?: [number, number];
  spiral: Spiral;
  transitionDuration: number;
}

export interface Word {
  text: string;
  count: number;
  rotate?: number;
  size?: number;
  x?: number;
  y?: number;
}
