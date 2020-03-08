import { MinMaxPair, Scale, Word } from './types';

export function choose<T>(array: T[], randomFunction?: () => void): T;

export function getDefaultColors(): string;

export function getFontScale(
	words: Word[],
	fontSizes: MinMaxPair,
	scale: Scale,
): (value: number) => number;

export function getFontSize(word: Word): string;

export function getText(word: Word): string;

export function getTransform(word: Word): string;

export function rotate(
	rotations: number[],
	rotationAngles: MinMaxPair,
	randomFunction: () => void,
): number;
