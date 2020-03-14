import { Callbacks, MinMaxPair, Options, Word } from './types';

export * from './types';

export type Optional<T> = {
	[P in keyof T]?: T[P];
};

export type CallbacksProp = Optional<Callbacks>;

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

export const defaultCallbacks: CallbacksProp;

export const defaultOptions: OptionsProp;

export default function ReactWordcloud(props: Props): JSX.Element;
