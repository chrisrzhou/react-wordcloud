// @ts-nocheck

import { dispatch } from 'd3-dispatch';
import { getContext, emptyCanvas, zeroArray } from './helpers';
import { archimedeanSpiral, Size, spirals } from './math';
import { Options, CloudWord, Word } from '../types';

/**
 * TEMPORARY workaround:
 * Should re-write this in typescript in the future
 */

// Word cloud layout by Jason Davies, https://www.jasondavies.com/wordcloud/
// Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf

const cloudRadians = Math.PI / 180;
const cw = (1 << 11) >> 5;
const ch = 1 << 11;

interface CloudSpec<D>
  extends Pick<
    Options,
    'fontFamily' | 'fontStyle' | 'fontWeight' | 'padding' | 'spiral'
  > {
  text: (entry: D, index: number) => string;
  fontSize: (entry: D, index: number) => number;
  getCanvas?: () => HTMLCanvasElement;
  rotate: (item: D, index: number) => number;
  random: () => number;
  size: Size;
  words: D[];
}

export function createCloud({
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  padding,
  size,
  text,
  rotate,
  words,
  random,
  spiral: spiralId,
  getCanvas = emptyCanvas,
}: CloudSpec<Word>) {
  const spiral = spirals[spiralId];
  const event = dispatch('word', 'end'),
    timer = null,
    cloud = {};

  let killed = false;

  function stop() {
    killed = true;
  }

  function revive() {
    killed = false;
  }

  function start() {
    const wordDefaults = {
      padding,
      font: fontFamily,
      style: fontStyle,
      weight: fontWeight,
    };
    const contextAndRatio = getContext(getCanvas());
    const board = zeroArray((size[0] >> 5) * size[1]);
    const bounds = null;
    const tags = [];

    const data: Word[] = words
      .map((d, i) => {
        return Object.assign(
          {
            text: text(d, i),
            rotate: rotate(d, i),
            size: fontSize(d, i),
          },
          wordDefaults,
          d,
        );
      })
      .sort((a, b) => b.size - a.size);

    function multiStep(from: number, to: number) {
      for (let i = from; i < to; i += 1) {
        var d = data[i];
        d.x = (size[0] * (random() + 0.5)) >> 1;
        d.y = (size[1] * (random() + 0.5)) >> 1;
        cloudSprite(contextAndRatio, d, data, i);
        if (d.hasText && place(board, d, bounds)) {
          tags.push(d);
          event.call('word', cloud, d);
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
      const step = 50;
      const from = i * step;
      const to = Math.min((i + 1) * step, words.length);
      multiStep(from, to);
      if (to < words.length && !killed) {
        setTimeout(() => loop(i + 1), 0);
      } else {
        cloud.stop();
        event.call('end', cloud, tags, bounds);
      }
    }

    setTimeout(() => loop(0), 0);

    return cloud;
  }

  function place(board, tag, bounds) {
    var perimeter = [{ x: 0, y: 0 }, { x: size[0], y: size[1] }],
      startX = tag.x,
      startY = tag.y,
      maxDelta = Math.sqrt(size[0] * size[0] + size[1] * size[1]),
      s = spiral(size),
      dt = random() < 0.5 ? 1 : -1,
      t = -dt,
      dxdy,
      dx,
      dy;

    while ((dxdy = s((t += dt)))) {
      dx = ~~dxdy[0];
      dy = ~~dxdy[1];

      if (Math.min(Math.abs(dx), Math.abs(dy)) >= maxDelta) break;

      tag.x = startX + dx;
      tag.y = startY + dy;

      if (
        tag.x + tag.x0 < 0 ||
        tag.y + tag.y0 < 0 ||
        tag.x + tag.x1 > size[0] ||
        tag.y + tag.y1 > size[1]
      )
        continue;
      // TODO only check for collisions within current bounds.
      if (!bounds || !cloudCollide(tag, board, size[0])) {
        if (!bounds || collideRects(tag, bounds)) {
          var sprite = tag.sprite,
            w = tag.width >> 5,
            sw = size[0] >> 5,
            lx = tag.x - (w << 4),
            sx = lx & 0x7f,
            msx = 32 - sx,
            h = tag.y1 - tag.y0,
            x = (tag.y + tag.y0) * sw + (lx >> 5),
            last;
          for (var j = 0; j < h; j++) {
            last = 0;
            for (var i = 0; i <= w; i++) {
              board[x + i] |=
                (last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0);
            }
            x += sw;
          }
          delete tag.sprite;
          return true;
        }
      }
    }
    return false;
  }

  cloud.on = function() {
    var value = event.on.apply(event, arguments);
    return value === event ? cloud : value;
  };

  return cloud;
}

function cloudFont() {
  return 'serif';
}

// Fetches a monochrome sprite bitmap for the specified text.
// Load in batches for speed.
function cloudSprite(contextAndRatio, d, data, di) {
  if (d.sprite) return;
  var c = contextAndRatio.context,
    ratio = contextAndRatio.ratio;

  c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
  var x = 0,
    y = 0,
    maxh = 0,
    n = data.length;
  --di;
  while (++di < n) {
    d = data[di];
    c.save();
    c.font =
      d.style +
      ' ' +
      d.weight +
      ' ' +
      ~~((d.size + 1) / ratio) +
      'px ' +
      d.font;
    var w = c.measureText(d.text + 'm').width * ratio,
      h = d.size << 1;
    if (d.rotate) {
      var sr = Math.sin(d.rotate * cloudRadians),
        cr = Math.cos(d.rotate * cloudRadians),
        wcr = w * cr,
        wsr = w * sr,
        hcr = h * cr,
        hsr = h * sr;
      w =
        ((Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 0x1f) >> 5) << 5;
      h = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
    } else {
      w = ((w + 0x1f) >> 5) << 5;
    }
    if (h > maxh) maxh = h;
    if (x + w >= cw << 5) {
      x = 0;
      y += maxh;
      maxh = 0;
    }
    if (y + h >= ch) break;
    c.translate((x + (w >> 1)) / ratio, (y + (h >> 1)) / ratio);
    if (d.rotate) c.rotate(d.rotate * cloudRadians);
    c.fillText(d.text, 0, 0);

    if (d.padding) {
      c.lineWidth = 2 * d.padding;
      c.strokeText(d.text, 0, 0);
    }
    c.restore();
    d.width = w;
    d.height = h;
    d.xoff = x;
    d.yoff = y;
    d.x1 = w >> 1;
    d.y1 = h >> 1;
    d.x0 = -d.x1;
    d.y0 = -d.y1;
    d.hasText = true;
    x += w;
  }
  var pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
    sprite = [];
  while (--di >= 0) {
    d = data[di];
    if (!d.hasText) continue;
    var w = d.width,
      w32 = w >> 5,
      h = d.y1 - d.y0;
    // Zero the buffer
    for (var i = 0; i < h * w32; i++) sprite[i] = 0;
    x = d.xoff;
    if (x == null) return;
    y = d.yoff;
    var seen = 0,
      seenRow = -1;
    for (var j = 0; j < h; j++) {
      for (var i = 0; i < w; i++) {
        var k = w32 * j + (i >> 5),
          m = pixels[((y + j) * (cw << 5) + (x + i)) << 2]
            ? 1 << (31 - (i % 32))
            : 0;
        sprite[k] |= m;
        seen |= m;
      }
      if (seen) seenRow = j;
      else {
        d.y0++;
        h--;
        j--;
        y++;
      }
    }
    d.y1 = d.y0 + seenRow;
    d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
  }
}

// Use mask-based collision detection.
function cloudCollide(tag, board, sw) {
  sw >>= 5;
  var sprite = tag.sprite,
    w = tag.width >> 5,
    lx = tag.x - (w << 4),
    sx = lx & 0x7f,
    msx = 32 - sx,
    h = tag.y1 - tag.y0,
    x = (tag.y + tag.y0) * sw + (lx >> 5),
    last;
  for (var j = 0; j < h; j++) {
    last = 0;
    for (var i = 0; i <= w; i++) {
      if (
        ((last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0)) &
        board[x + i]
      )
        return true;
    }
    x += sw;
  }
  return false;
}

function cloudBounds(bounds, d) {
  const [b0, b1] = bounds;
  if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
  if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
  if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
  if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
}

function collideRects(a, b) {
  return (
    a.x + a.x1 > b[0].x &&
    a.x + a.x0 < b[1].x &&
    a.y + a.y1 > b[0].y &&
    a.y + a.y0 < b[1].y
  );
}
