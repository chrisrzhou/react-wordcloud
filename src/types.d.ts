import { EnterElement, Selection as d3Selection } from 'd3-selection';

export interface Callbacks {
	/**
	 * Set the word color using the word object.
	 */
	getWordColor?: (word: Word) => string;
	/**
	 * Set the word tooltip using the word object.
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

export type MinMaxPair = [number, number];

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
	 * Sets the animation transition time in milliseconds.
	 */
	transitionDuration: number;
}

export type Scale = 'linear' | 'log' | 'sqrt';

export type Selection = d3Selection<SVGElement, Word, SVGElement, Word>;

export type Enter = d3Selection<EnterElement, Word, SVGElement, Word>;

export type Spiral = 'archimedean' | 'rectangular';

export interface Word {
	[key: string]: any;
	text: string;
	value: number;
}
