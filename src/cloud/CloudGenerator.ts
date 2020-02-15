import { Word, Options } from '../types';
import { Size } from './math';

type CloudGeneratorSpec = Pick<
  Options,
  'fontFamily' | 'fontStyle' | 'fontWeight' | 'padding' | 'spiral'
>;

export class CloudGenerator {
  _killed: boolean;
  // Accessors
  _text: (entry: Word, index: number) => string;
  _rotate: (entry: Word, index: number) => number;
  _fontSize: (entry: Word, index: number) => number;
  // Generic
  _getCanvas: () => HTMLCanvasElement;
  _spiral: (size: Size) => (t: number) => number;
  // Variables
  _size: Size;
  _words: Word[];

  constructor({
    fontFamily,
    fontStyle,
    fontWeight,
    padding,
    spiral,
  }: CloudGeneratorSpec) {
    this._killed = false;
  }
}
