import React from 'react';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import ReactWordcloudSrc, { Props } from '..';

export * from '..';

export default function ReactWordcloud(props: Props): JSX.Element {
  const canvasAllowed =
    typeof document !== 'undefined' &&
    document
      .createElement('canvas')
      .getContext('2d')
      .getImageData(0, 0, 1, 1)
      .data.every(v => v === 0);

  if (!canvasAllowed) {
    return (
      <p>
        React wordcloud requires access to canvas image data. Please allow
        access in your browser and reload the page.
      </p>
    );
  }

  return <ReactWordcloudSrc {...props} />;
}
