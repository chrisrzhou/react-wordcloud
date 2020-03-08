import { Callbacks, MinMaxPair, Options, Selection, Word } from './types';

export function layout({
	callbacks,
	maxWords,
	options,
	selection,
	size,
	words,
}: {
	callbacks: Callbacks;
	maxWords: number;
	options: Options;
	selection: Selection;
	size: MinMaxPair;
	words: Word[];
}): void;

export function render(
	selection: Selection,
	words: Word[],
	options: Options,
	callbacks: Callbacks,
): void;
