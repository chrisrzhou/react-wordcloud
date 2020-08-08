import { EnterElement, Selection as d3Selection } from 'd3-selection';
import { Props as TippyProps } from 'tippy.js';

/**
 * Types
 */
type AttributeValue = string | WordToStringCallback;

type MinMaxPair = [number, number];

type Scale = 'linear' | 'log' | 'sqrt';

type Selection = d3Selection<SVGElement, Word, SVGElement, Word>;

type Enter = d3Selection<EnterElement, Word, SVGElement, Word>;

type Spiral = 'archimedean' | 'rectangular';

type WordToStringCallback = (word: Word) => void;

type WordEventCallback = (word: Word, event?: MouseEvent) => void;

type Optional<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Public typings
 */
export interface Callbacks {
  /**
   * Set the word color using the word object.
   */
  getWordColor?: WordToStringCallback;
  /**
   * Set the word tooltip using the word object.
   */
  getWordTooltip: WordToStringCallback;
  /**
   * Capture the word and mouse event on click.
   */
  onWordClick?: WordEventCallback;
  /**
   * Capture the word and mouse event on mouse-out.
   */
  onWordMouseOut?: WordEventCallback;
  /**
   * Capture the word and mouse event on mouse over.
   */
  onWordMouseOver?: WordEventCallback;
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
   * (BETA) This feature is not formally supported.  For more details, refer to the docs.  Enables optimizations for rendering larger wordclouds.  Note that this uses a custom cloud layout that batches the data into smaller subsets.
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
   * Set an optional random seed when `deterministic` option is set to `true`.
   */
  randomSeed?: string;
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
   * Customizable attributes to set on the rendererd svg node
   */
  svgAttributes: Record<string, AttributeValue>;
  /**
   * Customizable attributes to set on the rendererd text nodes
   */
  textAttributes: Record<string, AttributeValue>;
  /**
   * Additional props object to pass to the tooltip library. For more details,
   * refer to the documentation for
   * [Tippy.js Props](https://atomiks.github.io/tippyjs/v6/all-props/).
   */
  tooltipOptions: Optional<TippyProps>;
  /**
   * Sets the animation transition time in milliseconds.
   */
  transitionDuration: number;
}

export type OptionsProp = Optional<Options>;

export interface Props {
  /**
   * Callbacks to control various word properties and behaviors.
   */
  callbacks?: CallbacksProp;
  /**
   * Maximum number of words to display.
   */
  maxWords?: number;
  /**
   * Set minimum [width, height] values for the SVG container.
   */
  minSize?: MinMaxPair;
  /**
   * Configure the wordcloud with various options.
   */
  options?: OptionsProp;
  /**
   * Set explicit [width, height] values for the SVG container.  This will disable responsive resizing.  If undefined, the wordcloud will responsively size to its parent container.
   */
  size?: MinMaxPair;
  /**
   * An array of word.  A word is an object that must contain the 'text' and 'value' keys.
   */
  words: Word[];
}

export interface Word {
  [key: string]: any;
  text: string;
  value: number;
}

/**
 * Public interfaces
 */
export const defaultCallbacks: CallbacksProp;

export const defaultOptions: OptionsProp;

export default function ReactWordcloud(props: Props): JSX.Element;
