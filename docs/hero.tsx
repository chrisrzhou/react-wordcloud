import React, { useEffect, useState } from 'react';

import ReactWordcloud, { MinMaxPair, Scale, Spiral } from '..';
import { choose } from '../src/utils';
import words from './words';

const fontFamilies = ['Arial', 'Times New Roman', 'Impact'];
const fontSizes: MinMaxPair = [14, 40];
const rotationAngles = [
	[-90, 90],
	[-45, 45],
	[-180, 180],
];
const scales: Scale[] = ['linear', 'log', 'sqrt'];
const spirals: Spiral[] = ['rectangular', 'archimedean'];

function Hero(): JSX.Element {
	const [iteration, setIteration] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIteration(iteration + 1);
		}, 3000);
		return () => clearInterval(interval);
	}, [iteration]);

	const options = {
		fontFamily: choose(fontFamilies),
		fontSizes,
		scale: choose(scales),
		spiral: choose(spirals),
		rotationAngle: choose(rotationAngles),
	};

	return (
		<div style={{ height: 400, margin: '0 auto', minWidth: 600, width: '80%' }}>
			<ReactWordcloud maxWords={100} options={options} words={words} />
		</div>
	);
}

export default Hero;
