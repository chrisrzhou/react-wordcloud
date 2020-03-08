// @ts-nocheck
/**
 * Author: Augustinas (https://github.com/WhoAteDaCake)
 * Source: https://github.com/chrisrzhou/react-wordcloud/blob/166d0b0400a87647fe4e7855a26fe581ce38a502/src/cloud.ts
 * TEMPORARY workaround
 *
 * Implements the wordcloud algorithm based on: https://github.com/jasondavies/d3-cloud/tree/v1.2.5
 * Improvements:
 *  Use a setTimeout + batch sizes to calculate clouds in order to avoid blocking main thread for two long (87-101)
 *
 */

// Word cloud layout by Jason Davies, https://www.jasondavies.com/wordcloud/
// Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf

import { dispatch } from 'd3-dispatch';

const cloudRadians = Math.PI / 180,
  cw = (1 << 11) >> 5,
  ch = 1 << 11;

export default function Cloud() {
  let size = [256, 256],
    text = cloudText,
    font = cloudFont,
    fontSize = cloudFontSize,
    fontStyle = cloudFontNormal,
    fontWeight = cloudFontNormal,
    rotate = cloudRotate,
    padding = cloudPadding,
    spiral = archimedeanSpiral,
    words = [],
    timeInterval = Infinity,
    event = dispatch('word', 'end'),
    timer = null,
    random = Math.random,
    cloud = {},
    canvas = cloudCanvas;

  let killed = false;

  cloud.canvas = function(_) {
    return arguments.length ? ((canvas = functor(_)), cloud) : canvas;
  };

  cloud.start = function() {
    let contextAndRatio = getContext(canvas()),
      board = zeroArray((size[0] >> 5) * size[1]),
      bounds = null,
      n = words.length,
      i = -1,
      tags = [],
      data = words
        .map(function(d, i) {
          d.text = text.call(this, d, i);
          d.font = font.call(this, d, i);
          d.style = fontStyle.call(this, d, i);
          d.weight = fontWeight.call(this, d, i);
          d.rotate = rotate.call(this, d, i);
          d.size = ~~fontSize.call(this, d, i);
          d.padding = padding.call(this, d, i);
          return d;
        })
        .sort(function(a, b) {
          return b.size - a.size;
        });

    // Added by react-wordcloud
    // Allows to calculate a subset of data instead of all of the words at once
    function multiStep(from, to) {
      for (let i = from; i < to; i += 1) {
        const d = data[i];
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

    // Added by react-wordcloud
    // Iterates dataset using setTimeout in order to prevent blocking of the main thread
    function loop(i) {
      const step = 50;
      const from = i * step;
      const to = Math.min((i + 1) * step, words.length);
      multiStep(from, to);
      if (killed) {
        return;
      }
      if (to < words.length) {
        setTimeout(() => loop(i + 1), 0);
      } else {
        cloud.stop();
        event.call('end', cloud, tags, bounds);
      }
    }
    setTimeout(() => loop(0), 0);

    return cloud;
  };

  cloud.revive = () => {
    killed = false;
    return cloud;
  };

  cloud.stop = function() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    killed = true;
    return cloud;
  };

  function getContext(canvas) {
    canvas.width = canvas.height = 1;
    const ratio = Math.sqrt(
      canvas.getContext('2d').getImageData(0, 0, 1, 1).data.length >> 2,
    );
    canvas.width = (cw << 5) / ratio;
    canvas.height = ch / ratio;

    const context = canvas.getContext('2d');
    context.fillStyle = context.strokeStyle = 'red';
    context.textAlign = 'center';

    return { context: context, ratio: ratio };
  }

  function place(board, tag, bounds) {
    let perimeter = [{ x: 0, y: 0 }, { x: size[0], y: size[1] }],
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
          for (let j = 0; j < h; j++) {
            last = 0;
            for (let i = 0; i <= w; i++) {
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

  cloud.timeInterval = function(_) {
    return arguments.length
      ? ((timeInterval = _ == null ? Infinity : _), cloud)
      : timeInterval;
  };

  cloud.words = function(_) {
    return arguments.length ? ((words = _), cloud) : words;
  };

  cloud.size = function(_) {
    return arguments.length ? ((size = [+_[0], +_[1]]), cloud) : size;
  };

  cloud.font = function(_) {
    return arguments.length ? ((font = functor(_)), cloud) : font;
  };

  cloud.fontStyle = function(_) {
    return arguments.length ? ((fontStyle = functor(_)), cloud) : fontStyle;
  };

  cloud.fontWeight = function(_) {
    return arguments.length ? ((fontWeight = functor(_)), cloud) : fontWeight;
  };

  cloud.rotate = function(_) {
    return arguments.length ? ((rotate = functor(_)), cloud) : rotate;
  };

  cloud.text = function(_) {
    return arguments.length ? ((text = functor(_)), cloud) : text;
  };

  cloud.spiral = function(_) {
    return arguments.length ? ((spiral = spirals[_] || _), cloud) : spiral;
  };

  cloud.fontSize = function(_) {
    return arguments.length ? ((fontSize = functor(_)), cloud) : fontSize;
  };

  cloud.padding = function(_) {
    return arguments.length ? ((padding = functor(_)), cloud) : padding;
  };

  cloud.random = function(_) {
    return arguments.length ? ((random = _), cloud) : random;
  };

  cloud.on = function() {
    const value = event.on.apply(event, arguments);
    return value === event ? cloud : value;
  };

  return cloud;
}

function cloudText(d) {
  return d.text;
}

function cloudFont() {
  return 'serif';
}

function cloudFontNormal() {
  return 'normal';
}

function cloudFontSize(d) {
  return Math.sqrt(d.value);
}

function cloudRotate() {
  return (~~(Math.random() * 6) - 3) * 30;
}

function cloudPadding() {
  return 1;
}

// Fetches a monochrome sprite bitmap for the specified text.
// Load in batches for speed.
function cloudSprite(contextAndRatio, d, data, di) {
  if (d.sprite) return;
  const c = contextAndRatio.context,
    ratio = contextAndRatio.ratio;

  c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
  let x = 0,
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
      const sr = Math.sin(d.rotate * cloudRadians),
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
  const pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
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
    let seen = 0,
      seenRow = -1;
    for (let j = 0; j < h; j++) {
      for (var i = 0; i < w; i++) {
        const k = w32 * j + (i >> 5),
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
  let sprite = tag.sprite,
    w = tag.width >> 5,
    lx = tag.x - (w << 4),
    sx = lx & 0x7f,
    msx = 32 - sx,
    h = tag.y1 - tag.y0,
    x = (tag.y + tag.y0) * sw + (lx >> 5),
    last;
  for (let j = 0; j < h; j++) {
    last = 0;
    for (let i = 0; i <= w; i++) {
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
  const b0 = bounds[0],
    b1 = bounds[1];
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

function archimedeanSpiral(size) {
  const e = size[0] / size[1];
  return function(t) {
    return [e * (t *= 0.1) * Math.cos(t), t * Math.sin(t)];
  };
}

function rectangularSpiral(size) {
  let dy = 4,
    dx = (dy * size[0]) / size[1],
    x = 0,
    y = 0;
  return function(t) {
    const sign = t < 0 ? -1 : 1;
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

function zeroArray(n) {
  const a = new Uint32Array(n);
  return a;
}

function cloudCanvas() {
  return document.createElement('canvas');
}

function functor(d) {
  return typeof d === 'function'
    ? d
    : function() {
        return d;
      };
}

var spirals = {
  archimedean: archimedeanSpiral,
  rectangular: rectangularSpiral,
};
