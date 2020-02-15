export type Size = [number, number];

export interface Bound {
  x: number;
  y: number;
}

export function archimedeanSpiral(size: Size) {
  const e = size[0] / size[1];
  return (t: number): Size => [e * (t *= 0.1) * Math.cos(t), t * Math.sin(t)];
}

export function rectangularSpiral(size: Size) {
  var dy = 4,
    dx = (dy * size[0]) / size[1],
    x = 0,
    y = 0;
  return (t: number): Size => {
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

export const spirals = {
  archimedean: archimedeanSpiral,
  rectangular: rectangularSpiral,
};
