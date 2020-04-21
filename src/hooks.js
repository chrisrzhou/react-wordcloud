import { select } from 'd3-selection';
import { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export function useResponsiveSvgSelection(minSize, initialSize) {
	const elementRef = useRef();
	const [size, setSize] = useState(initialSize);
	const [selection, setSelection] = useState(null);

	useEffect(() => {
		const element = elementRef.current;

		// Set svg selection
		const svg = select(element).append('svg').style('display', 'block'); // Native inline svg leaves undesired white space
		const selection = svg.append('g');
		setSelection(selection);

		function updateSize(width, height) {
			svg.attr('height', height).attr('width', width);
			selection.attr('transform', `translate(${width / 2}, ${height / 2})`);
			setSize([width, height]);
		}

		let width = 0;
		let height = 0;
		if (initialSize === undefined) {
			// Use parentNode size if resized has not occurred
			width = element.parentElement.offsetWidth;
			height = element.parentElement.offsetHeight;
		} else {
			// Use initialSize if it is provided
			[width, height] = initialSize;
		}

		width = Math.max(width, minSize[0]);
		height = Math.max(height, minSize[1]);
		updateSize(width, height);

		// Update resize using a resize observer
		const resizeObserver = new ResizeObserver((entries) => {
			if (!entries || entries.length === 0) {
				return;
			}

			if (initialSize === undefined) {
				const { width, height } = entries[0].contentRect;
				updateSize(width, height);
			}
		});
		resizeObserver.observe(element);

		// Cleanup
		return () => {
			resizeObserver.unobserve(element);
			select(element).selectAll('*').remove();
		};
	}, [initialSize, minSize]);

	return [elementRef, selection, size];
}
