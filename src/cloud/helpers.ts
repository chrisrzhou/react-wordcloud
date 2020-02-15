const cloudRadians = Math.PI / 180;
const cw = (1 << 11) >> 5;
const ch = 1 << 11;

export function getContext(
  canvas: HTMLCanvasElement,
): { context: CanvasRenderingContext2D; ratio: number } {
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d');
  const ratio = Math.sqrt(ctx.getImageData(0, 0, 1, 1).data.length >> 2);
  canvas.width = (cw << 5) / ratio;
  canvas.height = ch / ratio;

  // TODO: validate that these are needed
  ctx.fillStyle = ctx.strokeStyle = 'red';
  ctx.textAlign = 'center';

  return { context: ctx, ratio };
}

type Fn<T> = (...args: any[]) => T;

export function functor<T>(d: Function | T): Function {
  return typeof d === 'function' ? d : () => d;
}

// As mentioned by
// https://github.com/jasondavies/d3-cloud/issues/158
export function zeroArray(n: number) {
  return new Uint32Array(n);
}

export function emptyCanvas(): HTMLCanvasElement {
  return document.createElement('canvas');
}
