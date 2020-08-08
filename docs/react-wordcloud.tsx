import React from 'react';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import ReactWordcloudSrc, { Props } from '..';

export * from '..';

export default function ReactWordcloud(props: Props): JSX.Element {
  return <ReactWordcloudSrc {...props} />;
}
