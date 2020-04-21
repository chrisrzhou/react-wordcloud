import React, { useEffect, useState } from 'react';

import ReactWordcloud from '..';
import { choose } from '../src/utils';
import words from './words';

const fontFamilies = ['Arial', 'Times New Roman', 'Impact'];
const rotationAngles = [
	[-90, 90],
	[-45, 45],
	[-180, 180],
];
const scales = ['linear', 'log', 'sqrt'];
const spirals = ['rectangular', 'archimedean'];

const Hero = () => {
	const [iteration, setIteration] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIteration(iteration + 1);
		}, 3000);
		return () => clearInterval(interval);
	}, [iteration]);

	const options = {
		fontFamily: choose(fontFamilies),
		fontSizes: [14, 40],
		scales: choose(scales),
		spiral: choose(spirals),
		rotationAngle: choose(rotationAngles),
	};

	return (
		<div style={{ height: 400, margin: '0 auto', minWidth: 600, width: '80%' }}>
			<ReactWordcloud maxWords={100} options={options} words={words} />
		</div>
	);
};

export default Hero;
