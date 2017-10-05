import React from 'react'

import P5Component from '../P5Component'
import { copyImage, same, Graph } from '../utils/p5-utils'
import FlowCalculator from '../utils/flow'

const PixelMotion = () => {
	const name = 'pixel-flow'

	const sketch = p => {
		let capture
		let previousPixels
		let flow
		const width = 640
		const height = 480
		const step = 8

		var uMotionGraph, vMotionGraph
		p.setup = () => {
			p.createCanvas(width, height)

			capture = p.createCapture(p.VIDEO)
			capture.size(width, height)
			capture.hide()

			flow = new FlowCalculator(step)
			uMotionGraph = new Graph(p, 100, -step / 2, +step / 2)
			vMotionGraph = new Graph(p, 100, -step / 2, +step / 2)
		}

		p.draw = () => {
			capture.loadPixels()
			if (capture.pixels.length > 0) {
				if (previousPixels) {
					// cheap way to ignore duplicate frames
					if (same(previousPixels, capture.pixels, 4, width)) {
						return
					}

					flow.calculate(
						previousPixels,
						capture.pixels,
						capture.width,
						capture.height
					)
				}
				previousPixels = copyImage(capture.pixels, previousPixels)

				// make a background image that covers old motion lines
				const coverOldLines = p.createCanvas(width, height)
				coverOldLines.background(0, 0, 0)
				p.image(coverOldLines, 0, 0, width, height)
				// p.image(capture, 0, 0, width, height);

				if (flow.flow && flow.flow.u !== 0 && flow.flow.v !== 0) {
					uMotionGraph.addSample(flow.flow.u)
					vMotionGraph.addSample(flow.flow.v)

					p.strokeWeight(2)
					flow.flow.zones.forEach(function(zone) {
						p.stroke(
							p.map(zone.u, -step, +step, 0, 255),
							p.map(zone.v, -step, +step, 0, 255),
							128
						)
						p.line(zone.x, zone.y, zone.x + zone.u, zone.y + zone.v)
						// p.ellipse(zone.x, zone.y, 5, 5)
					})
				}

				p.noFill()
				p.stroke(255)

				/*
				 *  draw left-right motion plot
				 */
				// uMotionGraph.draw(width, height / 2)
				// p.line(0, height / 4, width, height / 4)

				/*
				 *  draw up-down motion plot
				 */
				// p.translate(0, height / 2)
				// vMotionGraph.draw(width, height / 2)
				// p.line(0, height / 4, width, height / 4)
			}
		}
	} // Close sketch()

	return <P5Component id={name} sketch={sketch} />
}

export default PixelMotion
