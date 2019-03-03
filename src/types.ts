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
