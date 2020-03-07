import { EnterElement, Selection as d3Selection } from 'd3-selection';

type Optional<T> = {
  [P in keyof T]?: T[P];
};

export type Dictionary<T, K extends string | number = string> = {
  [key in K]: T;
};
export type Pair<T> = [T, T];
export type MinMaxPair = Pair<number>;

export interface Point {
  x: number;
  y: number;
}

export type CloudWord = Optional<
  Point & {
    font: string;
    style: string;
    weight: string | number;
    rotate: number;
    size: number;
    padding: number;
    width: number;
    height: number;
    xoff: number;
    yoff: number;
    x1: number;
    y1: number;
    x0: number;
    y0: number;
    hasText: boolean;
    sprite: number[];
  }
>;

export interface Word extends CloudWord {
  text: string;
  value: number;
}

export type Selection = d3Selection<SVGElement, Word, SVGElement, Word>;
export type Enter = d3Selection<EnterElement, Word, SVGElement, Word>;

export enum Scale {
  Linear = 'linear',
  Log = 'log',
  Sqrt = 'sqrt',
}

export enum Spiral {
  Archimedean = 'archimedean',
  Rectangular = 'rectangular',
}

export interface ContextAndRatio {
  ratio: number;
  context: CanvasRenderingContext2D;
}

export interface Callbacks {
  /**
   * Set the word color using the word datum.
   */
  getWordColor?: (word: Word) => string;
  /**
   * Set the word tooltip using the word datum.
   */
  getWordTooltip: (word: Word) => string;
  /**
   * Capture the word and mouse event on click.
   */
  onWordClick?: (word: Word, event?: MouseEvent) => void;
  /**
   * Capture the word and mouse event on mouse-out.
   */
  onWordMouseOut?: (word: Word, event?: MouseEvent) => void;
  /**
   * Capture the word and mouse event on mouse over.
   */
  onWordMouseOver?: (word: Word, event?: MouseEvent) => void;
}
export type CallbacksProp = Optional<Callbacks>;

export interface Options {
  /**
   * Allows the wordcloud to randomnly apply colors in the provided values.
   */
  colors: string[];
  /**
   * By default, words are randomly positioned and rotated.  If true, the wordcloud will produce the same rendering output for any input.
   */
  deterministic: boolean;
  /**
   * (BETA) Note that this feature is not formally supported.  For more details, refer to the docs.  Enable optimizations for rendering larger wordclouds.  Note that this uses a custom cloud layout (not d3-cloud) that batches the data into smaller subsets.
   */
  enableOptimizations: boolean;
  /**
   * Enables/disables the tooltip feature.
   */
  enableTooltip: boolean;
  /**
   * Customize the font family.
   */
  fontFamily: string;
  /**
   * Specify the minimum and maximum font size as a tuple.  Tweak these numbers to control the best visual appearance for the wordcloud.
   */
  fontSizes: MinMaxPair;
  /**
   * Accepts CSS values for font-styles (e.g. italic, oblique)
   */
  fontStyle: string;
  /**
   * Accepts CSS values for font-weights (e.g. bold, 400, 700)
   */
  fontWeight: string;
  /**
   * Controls the padding between words
   */
  padding: number;
  /**
   * Provide the minimum and maximum angles that words can be rotated.
   */
  rotationAngles: MinMaxPair;
  /**
   * By default, the wordcloud will apply random rotations if this is not specified.  When provided, it will use evenly-divided angles from the provided min/max rotation angles.
   */
  rotations?: number;
  /**
   * Control how words are spaced and laid out.
   */
  scale: Scale;
  /**
   * Control the spiral pattern on how words are laid out.
   */
  spiral: Spiral;
  /**
   * Sets the animation transition time in milliseconds.
   */
  transitionDuration: number;
  /**
   * Time window (ms) for grouping re-render attempts.
   * Helps to delay renders when container is resized.
   */
  renderDebounce?: number;
}
export type OptionsProp = Optional<Options>;

/*
  Extracted from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/d3-cloud
  With the following helpers: kill(), revive() for stopping and starting the wordcloud algorithm
 */
export interface Cloud<T extends CloudWord> {
  kill(): Cloud<T>;
  revive(): Cloud<T>;

  start(): Cloud<T>;
  stop(): Cloud<T>;

  timeInterval(): number;
  timeInterval(interval: number): Cloud<T>;

  words(): T[];
  words(words: T[]): Cloud<T>;

  size(): [number, number];
  size(size: [number, number]): Cloud<T>;

  font(): (datum: T, index: number) => string;
  font(font: string): Cloud<T>;
  font(font: (datum: T, index: number) => string): Cloud<T>;

  fontStyle(): (datum: T, index: number) => string;
  fontStyle(style: string): Cloud<T>;
  fontStyle(style: (datum: T, index: number) => string): Cloud<T>;

  fontWeight(): (datum: T, index: number) => string | number;
  fontWeight(weight: string | number): Cloud<T>;
  fontWeight(weight: (datum: T, index: number) => string | number): Cloud<T>;

  rotate(): (datum: T, index: number) => number;
  rotate(rotate: number): Cloud<T>;
  rotate(rotate: (datum: T, index: number) => number): Cloud<T>;

  text(): (datum: T, index: number) => string;
  text(text: string): Cloud<T>;
  text(text: (datum: T, index: number) => string): Cloud<T>;

  spiral(): (size: number) => (t: number) => [number, number];
  spiral(name: string): Cloud<T>;
  spiral(spiral: (size: number) => (t: number) => [number, number]): Cloud<T>;

  fontSize(): (datum: T, index: number) => number;
  fontSize(size: number): Cloud<T>;
  fontSize(size: (datum: T, index: number) => number): Cloud<T>;

  padding(): (datum: T, index: number) => number;
  padding(padding: number): Cloud<T>;
  padding(padding: (datum: T, index: number) => number): Cloud<T>;

  /**
   * If specified, sets the internal random number generator,used for selecting the initial position of each word,
   * and the clockwise/counterclockwise direction of the spiral for each word.
   *
   * @param randomFunction should return a number in the range [0, 1).The default is Math.random.
   */
  random(): Cloud<T>;
  random(randomFunction: () => number): Cloud<T>;

  /**
   * If specified, sets the canvas generator function, which is used internally to draw text.
   * When using Node.js, you will almost definitely override the default, e.g. using the canvas module.
   * @param canvasGenerator should return a HTMLCanvasElement.The default is:  ()=>{document.createElement("canvas");}
   *
   */
  canvas(): Cloud<T>;
  canvas(canvasGenerator: () => HTMLCanvasElement): Cloud<T>;

  on(type: 'word', listener: (word: T) => void): Cloud<T>;
  on(
    type: 'end',
    listener: (tags: T[], bounds: { x: number; y: number }[]) => void,
  ): Cloud<T>;
  on(type: string, listener: (...args: any[]) => void): Cloud<T>;

  on(type: 'word'): (word: T) => void;
  on(type: 'end'): (tags: T[], bounds: { x: number; y: number }[]) => void;
  on(type: string): (...args: any[]) => void;
}
