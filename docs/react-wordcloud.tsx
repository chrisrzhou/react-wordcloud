import React from 'react';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import ReactWordcloudSrc, { Props } from '..';

export * from '..';

export default function ReactWordcloud(props: Props): JSX.Element {
  let entries = [];

  if (typeof window !== 'undefined') {
    window.performance.mark('check');
    entries = window.performance.getEntries();
  }

  if (entries.length === 0) {
    return (
      <p>
        React wordcloud requires access to canvas image data. Please allow
        access in your browser and try again.
      </p>
    );
  }

  return <ReactWordcloudSrc {...props} />;
}
