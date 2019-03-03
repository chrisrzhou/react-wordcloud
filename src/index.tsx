import * as React from 'react';
import * as d3Cloud from 'd3-cloud';
import * as d3Selection from 'd3-selection';
import * as d3SelectionMulti from 'd3-selection-multi';

import { Scale, Spiral, Options, Word } from './types';
import { choose, getFontSize } from './utils';

const d3 = {
  ...d3Selection,
  ...d3SelectionMulti,
};

const { useEffect, useRef } = React;

const MIN_HEIGHT = 300;
const MIN_WIDTH = 400;

function getText(word: Word): string {
  return word.text;
}

function getWordFontSize(word: Word): string {
  return `${word.size}px`;
}

function getTransform(word: Word): string {
  const translate = `translate(${word.x}, ${word.y})`;
  const rotate =
    typeof word.rotate === 'number' ? `rotate(${word.rotate})` : '';
  return translate + rotate;
}

interface Props {
  getWordColor?: (word: Word) => string;
  getWordTooltip?: (word: Word) => string;
  onWordClick?: (word: Word) => void;
  onWordMouseOver?: (word: Word) => void;
  onWordMouseOut?: (word: Word) => void;
  options: Options;
  size: [number, number];
  words: Word[];
}

function Wordcloud({
  getWordColor,
  getWordTooltip,
  onWordClick,
  onWordMouseOver,
  onWordMouseOut,
  options,
  size,
  words,
}: Props): React.ReactNode {
  const chartRef = useRef();

  function cleanup(): void {
    d3.select(chartRef.current)
      .selectAll('*')
      .remove();
  }

  function render(words: Word[], options: Options): void {
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
    const layout = d3Cloud();

    // update viz
    viz.attrs({
      transform: `translate(${MIN_WIDTH / 2}, ${MIN_HEIGHT / 2})`,
    });
    const {
      colors,
      fontFamily,
      fontSizes,
      fontStyle,
      fontWeight,
      rotationAngles,
      rotations,
      scale,
      spiral,
    } = options;

    // compute rotations based on orientations and angles
    if (rotations === 0) {
      layout.rotate(0);
    }
    if (rotations > 0) {
      let angles: number[] = [];
      if (rotations === 1) {
        angles = [rotationAngles[0]];
      } else {
        angles = rotationAngles;
        const increment =
          (rotationAngles[1] - rotationAngles[0]) / (rotations - 1);
        let angle = rotationAngles[0] + increment;
        while (angle < rotationAngles[1]) {
          angles.push(angle);
          angle += increment;
        }
      }
      layout.rotate((): number => choose(angles));
    }

    function getFill(word: Word, i: number): string {
      return getWordColor ? getWordColor(word, i) : choose(colors);
    }

    function draw(words: Word[]): void {
      console.log(words);
      const { fontFamily, transitionDuration } = options;
      const vizWords = viz.selectAll('text').data(words);

      // enter transition
      vizWords
        .enter()
        .append('text')
        .on('click', onWordClick)
        .on('mouseover', onWordMouseOver)
        .on('mouseout', onWordMouseOut)
        .attrs({
          cursor: onWordClick ? 'pointer' : 'default',
          fill: getFill,
          'font-family': fontFamily,
          'font-style': fontStyle,
          'font-weight': fontWeight,
          'text-anchor': 'middle',
          transform: 'translate(0, 0) rotate(0)',
        })
        .transition()
        .duration(transitionDuration)
        .attrs({
          'font-size': getWordFontSize,
          transform: getTransform,
        })
        .text(getText);

      // update transition
      vizWords
        .transition()
        .duration(transitionDuration)
        .attrs({
          fill: getFill,
          'font-family': fontFamily,
          'font-size': getWordFontSize,
          transform: getTransform,
        })
        .text(getText);

      // exit transition
      vizWords
        .exit()
        .transition()
        .duration(transitionDuration)
        .attr('fill-opacity', 0)
        .remove();
    }

    layout
      .size([MIN_WIDTH, MIN_HEIGHT])
      .padding(1)
      .words(words)
      .text(getText)
      .spiral(spiral)
      .font(fontFamily)
      .fontSize(getFontSize(words, fontSizes, scale))
      .fontStyle(fontStyle)
      .fontWeight(fontWeight)
      .on('end', draw)
      .start();
  }

  // render with d3
  useEffect(() => {
    console.log(words, options);
    render(words, options);
    return cleanup;
  }, [options, size, words]);

  return <div ref={chartRef} />;
}

export const defaultOptions: Options = {
  colors: ['red', 'blue', 'green', 'yellow', 'purple'],
  enableTooltip: true,
  fontFamily: 'impact',
  fontSizes: [10, 100],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 1,
  rotationAngles: [-90, 90],
  rotations: undefined,
  scale: Scale.Sqrt,
  size: [400, 300],
  spiral: Spiral.Archimedean,
  transitionDuration: 1000,
};

Wordcloud.defaultProps = {
  options: defaultOptions,
};

export default Wordcloud;
