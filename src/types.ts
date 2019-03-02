export enum Scale {
  Linear = 'linear',
  Log = 'log',
  Sqrt = 'sqrt',
}

export enum Spiral {
  Archimedean = 'archimedean',
  Rectangular = 'rectangular',
}

export interface Options {
  angles: [number, number];
  colors: string[];
  enableTooltip: boolean;
  fontFamily: string;
  fontSizes: [number, number];
  orientations: number;
  scale: Scale;
  spiral: Spiral;
  transitionDuration: number;
}
