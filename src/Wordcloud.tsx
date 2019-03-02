import * as React from 'react';
import * as d3Array from 'd3-array';
import * as d3Cloud from 'd3-cloud';
import * as d3Scale from 'd3-scale';
import * as d3Selection from 'd3-selection';
import * as d3SelectionMulti from 'd3-selection-multi';

import { Word } from 'd3-cloud';
import { Scale, Spiral, Options } from './types';
import { getScale, choose } from './lib';

const d3 = {
  cloud: d3Cloud,
  ...d3Array,
  ...d3Scale,
  ...d3Selection,
  ...d3SelectionMulti,
};

const { useEffect, useRef } = React;

const MIN_HEIGHT = 150;
const MIN_WIDTH = 200;

interface Props {
  height?: number;
  onSetColor: (word: Word, i: number) => string;
  onSetTooltip?: (word: Word) => string;
  onWordClick?: (word: Word) => void;
  options: Options;
  width?: number;
  words: Word[];
}

function Wordcloud({
  height,
  onSetColor,
  onSetTooltip,
  onWordClick,
  options,
  width,
  words,
}: Props): React.ReactNode {
  const chartRef = useRef();

  function cleanup(): void {
    d3.select(chartRef.current)
      .selectAll('*')
      .remove();
  }

  function draw(words: Word[]) {
    console.log(words);
  }

  function render(): void {
    // cleanup
    cleanup();

    // define nodes
    const chartNode = chartRef.current;
    const svg = d3
      .select(chartNode)
      .append('svg')
      .attrs({
        height: MIN_HEIGHT,
        width: MIN_WIDTH,
      });
    const viz = svg.append('g');
    const layout = d3.cloud();

    // update viz
    viz.attrs({
      transform: `translate(${MIN_WIDTH / 2}, ${MIN_HEIGHT / 2})`,
    });
    const {
      angles,
      fontFamily,
      fontSizes,
      orientations,
      scale,
      spiral,
    } = options;
    const fontScale = getScale(scale)().range(fontSizes);

    // compute rotations based on orientations and angles
    if (orientations > 0) {
      let rotations: number[] = [];
      if (orientations === 1) {
        rotations = [angles[0]];
      } else {
        rotations = angles;
        const increment = (angles[1] - angles[0]) / (orientations - 1);
        let rotation = angles[0] + increment;
        while (rotation < angles[1]) {
          rotations.push(rotation);
          rotation += increment;
        }
      }
      layout.rotate((): number => choose(rotations));
    }

    layout
      .size([MIN_WIDTH, MIN_HEIGHT])
      .words(words)
      .padding(1)
      .text((word: Word): string => word.text)
      .font(fontFamily)
      .fontSize((word: Word): number => fontScale(word.weight))
      .spiral(spiral)
      .on('end', draw)
      .start();
    console.log(viz, layout, fontScale);
  }

  // render with d3
  useEffect(() => {
    render();
    return cleanup;
  }, [height, options, width, words]);

  return (
    <div>
      <div ref={chartRef} />
    </div>
  );
}

export const defaultOptions: Options = {
  angles: [-90, 90],
  colors: ['red', 'blue'],
  enableTooltip: true,
  fontFamily: 'impact',
  fontSizes: [10, 100],
  orientations: 0,
  scale: Scale.Linear,
  spiral: Spiral.Archimedean,
  transitionDuration: 1000,
};

Wordcloud.defaultProps = {
  words: [{ text: 'aadfadf', weight: 25 }, { text: 'aaddd', weight: 15 }],
  options: defaultOptions,
};

export default Wordcloud;
