import { getContext, emptyCanvas, zeroArray } from './helpers';
import { archimedeanSpiral, spirals, SpiralFn } from './math';
import { Options, CloudWord, Word, Pair, Spiral } from '../types';
import {
  cloudSprite,
  cloudBounds,
  cloudCollide,
  collideRects,
  place,
} from './math';

type DoneCb = (word: Word[]) => void;

interface CloudSpec {
  random: () => number;
  spiral: Spiral;
  size: Pair<number>;
  words: Word[];
  onDone: DoneCb;
  // How many words should we calculate on each iteration
  step?: number;
}

export interface CloudHandlers {
  start: () => void;
  stop: () => void;
}

export function createCloud({
  random,
  spiral: spiralId,
  size,
  words,
  onDone,
  step = 200,
}: CloudSpec): CloudHandlers {
  const spiral = spirals[spiralId];
  let killed = false;

  function stop() {
    killed = true;
  }

  function start() {
    const contextAndRatio = getContext(emptyCanvas());
    const board = zeroArray((size[0] >> 5) * size[1]);
    let bounds = null;
    const tags = [];

    function multiStep(from: number, to: number) {
      for (let i = from; i < to; i += 1) {
        var d = words[i];
        d.x = (size[0] * (random() + 0.5)) >> 1;
        d.y = (size[1] * (random() + 0.5)) >> 1;
        cloudSprite(contextAndRatio, d, words, i);
        if (d.hasText && place(board, d, bounds, size, spiral, random)) {
          tags.push(d);
          if (bounds) cloudBounds(bounds, d);
          else
            bounds = [
              { x: d.x + d.x0, y: d.y + d.y0 },
              { x: d.x + d.x1, y: d.y + d.y1 },
            ];
          // Temporary hack
          d.x -= size[0] >> 1;
          d.y -= size[1] >> 1;
        }
      }
    }

    function loop(i: number) {
      const from = i * step;
      const to = Math.min((i + 1) * step, words.length);
      multiStep(from, to);
      if (to < words.length && !killed) {
        setTimeout(() => loop(i + 1), 0);
      } else {
        stop();
        onDone(tags);
      }
    }

    setTimeout(() => loop(0), 0);
  }

  return {
    start,
    stop,
  };
}
