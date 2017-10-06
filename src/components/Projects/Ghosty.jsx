import React from 'react'

import P5Component from '../P5Component'
import { copyImage, same } from '../utils/p5-utils'
import FlowCalculator from '../utils/flow'
import ParticleSystem from '../utils/particle'

const particle_texture_img = require('./particle_texture.png')

const Ghosty = () => {
	const name = 'ghosty'

	const sketch = p => {
		let capture
		let previousPixels
		let flow
		const width = 640
		const height = 480
		const step = 8

		// texture for the particle
		let particle_texture = null
		// variable for particle system
		let ps = null

		p.preload = () => {
			particle_texture = p.loadImage(particle_texture_img)
		}

		p.setup = () => {
			p.createCanvas(width, height)

			//initialize the particle system
			ps = new ParticleSystem(
				p,
				0,
				p.createVector(width / 2, height - 60),
				particle_texture
			)

			// capture = p.createCapture(p.VIDEO)
			// capture.size(width, height)
			// capture.hide()
			//
			// flow = new FlowCalculator(step)
		}

		p.draw = () => {
			p.background(0)

			const dx = p.map(p.mouseX, 0, width, -0.2, 0.2)
			const wind = p.createVector(dx, 0)

			ps.applyForce(wind)
			ps.run()
			for (let i = 0; i < 2; i++) {
				ps.addParticle()
			}

			// Draw an arrow representing the wind force
			p.drawVector(wind, p.createVector(width / 2, 50, 0), 500)

			// capture.loadPixels()
			// if (capture.pixels.length > 0) {
			// 	if (previousPixels) {
			// 		// cheap way to ignore duplicate frames
			// 		if (same(previousPixels, capture.pixels, 4, width)) {
			// 			return
			// 		}
			//
			// 		flow.calculate(
			// 			previousPixels,
			// 			capture.pixels,
			// 			capture.width,
			// 			capture.height
			// 		)
			// 	}
			// 	previousPixels = copyImage(capture.pixels, previousPixels)
			//
			// 	// make a background image that covers old motion lines
			// 	const coverOldLines = p.createCanvas(width, height)
			// 	coverOldLines.background(0, 0, 0)
			// 	p.image(coverOldLines, 0, 0, width, height)
			// 	// p.image(capture, 0, 0, width, height);
			//
			// 	if (flow.flow && flow.flow.u !== 0 && flow.flow.v !== 0) {
			// 		p.strokeWeight(2)
			// 		flow.flow.zones.forEach(function(zone) {
			// 			p.stroke(
			// 				p.map(zone.u, -step, +step, 0, 255),
			// 				p.map(zone.v, -step, +step, 0, 255),
			// 				128
			// 			)
			// 			p.line(zone.x, zone.y, zone.x + zone.u, zone.y + zone.v)
			// 			// p.ellipse(zone.x, zone.y, 5, 5)
			// 		})
			// 	}
			//
			// 	p.noFill()
			// 	p.stroke(255)
			// }
		} // close draw()

		/**
		 *  This function draws an arrow showing the direction the "wind" is blowing.
		 */
		p.drawVector = (v, loc, scale) => {
			p.push()
			const arrowsize = 4
			p.translate(loc.x, loc.y)
			p.stroke(255)
			p.rotate(v.heading())

			const len = v.mag() * scale
			p.line(0, 0, len, 0)
			p.line(len, 0, len - arrowsize, +arrowsize / 2)
			p.line(len, 0, len - arrowsize, -arrowsize / 2)
			p.pop()
		}
	} // Close sketch()

	return <P5Component id={name} sketch={sketch} />
}

export default Ghosty
