import {
  ContextAndRatio,
  Word,
  Pair,
  Point,
  Dictionary,
  Spiral,
} from '../types';
import { cw, ch, cloudRadians } from './helpers';

// Word cloud layout by Jason Davies, https://www.jasondavies.com/wordcloud/
// Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf

export type SpiralFn = (size: Pair<number>) => (n: number) => Pair<number>;

export function archimedeanSpiral(size: Pair<number>) {
  const e = size[0] / size[1];
  return (t: number): Pair<number> => [
    e * (t *= 0.1) * Math.cos(t),
    t * Math.sin(t),
  ];
}

export function rectangularSpiral(size: Pair<number>) {
  var dy = 4,
    dx = (dy * size[0]) / size[1],
    x = 0,
    y = 0;
  return (t: number): Pair<number> => {
    var sign = t < 0 ? -1 : 1;
    // See triangular numbers: T_n = n * (n + 1) / 2.
    switch ((Math.sqrt(1 + 4 * sign * t) - sign) & 3) {
      case 0:
        x += dx;
        break;
      case 1:
        y += dy;
        break;
      case 2:
        x -= dx;
        break;
      default:
        y -= dy;
        break;
    }
    return [x, y];
  };
}

export const spirals: Dictionary<SpiralFn, Spiral> = {
  archimedean: archimedeanSpiral,
  rectangular: rectangularSpiral,
};

// Fetches a monochrome sprite bitmap for the specified text.
// Load in batches for speed.
export function cloudSprite(
  contextAndRatio: ContextAndRatio,
  d: Word,
  data: Word[],
  di: number,
) {
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

export function cloudBounds(bounds: Pair<Point>, d: Word) {
  const [b0, b1] = bounds;
  if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
  if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
  if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
  if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
}

export function collideRects(a: Word, b: Pair<Point>) {
  return (
    a.x + a.x1 > b[0].x &&
    a.x + a.x0 < b[1].x &&
    a.y + a.y1 > b[0].y &&
    a.y + a.y0 < b[1].y
  );
}

// Use mask-based collision detection.
export function cloudCollide(tag: Word, board: Uint32Array, sw: number) {
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

export function place(
  board: Uint32Array,
  tag: Word,
  bounds: Pair<Point>,
  size: Pair<number>,
  spiral: SpiralFn,
  random: () => number,
) {
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
