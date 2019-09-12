import { Word as CloudWord } from 'd3-cloud';
import { EnterElement, Selection as d3Selection } from 'd3-selection';

type Optional<T> = {
  [P in keyof T]?: T[P];
};

export type MinMaxPair = [number, number];

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
}
export type OptionsProp = Optional<Options>;
