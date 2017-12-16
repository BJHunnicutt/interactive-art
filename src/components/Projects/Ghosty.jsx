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
		const step = 40 // Determines the number of pixels (8 is highish but still fast)

		// texture for the particle
		let particle_texture = null
		// variable for particle system (Whisp)
		let ps = null

		p.preload = () => {
			particle_texture = p.loadImage(particle_texture_img)
		}

		p.setup = () => {
			p.createCanvas(width, height)

			// // initialize the particle system
			ps = new ParticleSystem(
				p,
				0,
				p.createVector(width / 2, height - 160),
				particle_texture
			)

			// direction of the vector
			const dx = p.map(p.mouseX, 0, width, -0.2, 0.2)
			// The vector determines the speed the particles move as well as direction
			// i.e. bigger number => move faster, then the x/y vector determines direction
			// - if the vector changes, do this in draw()
			p.wind = p.createVector(-1, 0.5)

			// -------- For directional lines ---------
			capture = p.createCapture(p.VIDEO)
			capture.size(width, height)
			p.pixelDensity(1) // To deal with variable display resolutions <--  Makes it much faster on retina display
			capture.hide()

			flow = new FlowCalculator(step)
		}

		// Draw the canvas
		p.draw = () => {
			p.background(0)

			// ------------- For directional lines -------------
			capture.loadPixels()

			// for (var y = 0; y < capture.height; y++) {
			// 	for (var x = 0; x < capture.width; x++) {
			// 		var index = (x + y * capture.width) * 4
			// 		capture.pixels[index + 0] = x
			// 		capture.pixels[index + 1] = p.random(255)
			// 		capture.pixels[index + 2] = y
			// 		capture.pixels[index + 3] = 255
			// 	}
			// }
			// capture.updatePixels()

			// Draw the motion directed lines
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
				// const coverOldLines = p.createCanvas(width, height)
				// coverOldLines.background(0)
				// p.image(coverOldLines, 0, 0, width, height)
				// p.image(capture, 0, 0, width, height)

				if (flow.flow && flow.flow.u !== 0 && flow.flow.v !== 0) {
					/*
					 * Create the Whisps
					 */
					p.strokeWeight(2)
					flow.flow.zones.forEach(function(zone) {
						// Set the position of each whisp
						ps.origin.x = zone.x + step
						ps.origin.y = zone.y + step
						// Set the direction of each whisp
						ps.applyForce(
							p.createVector(
								capture.width -
									zone.x +
									1 +
									zone.u -
									(capture.width - zone.x + 1),
								zone.y + zone.v - zone.y
							)
						)
						// create each whisp
						ps.run()
						ps.addParticle()

						/*
						 * Create the lines
						 */
						// Set the color stroke(r,g,b) based on the direction of flow
						p.stroke(
							p.map(zone.u, -step, +step, 0, 255),
							p.map(zone.v, -step, +step, 0, 255),
							128
						)
						// Draw the line in the direction of flow
						// * Real orientation
						// p.line(zone.x, zone.y, zone.x + zone.u, zone.y + zone.v)
						// OR
						// * MIRROR orientation (just switch x to width-x+1)
						p.line(
							capture.width - zone.x + 1,
							zone.y,
							capture.width - zone.x + 1 + zone.u,
							zone.y + zone.v
						)

						// COOL ellipses (Mirrored) <-- To be used instead of p.line()
						// p.ellipse(capture.width - zone.x + 1, zone.y, zone.u, zone.v)
					})
				}

				p.noFill()
				p.stroke(255)
			} // end drawing pixels

			// ------------- For ghosty -------------

			// const dx = p.map(p.mouseX, 0, width, -0.2, 0.2)
			// const wind = p.createVector(dx, 0.2)

			ps.applyForce(p.wind)
			ps.run()
			ps.addParticle()

			p.frameRate(20)

			// Draw an arrow representing the wind force
			// p.drawVector(wind, p.createVector(width / 2, 50, 0), 500)
		} // close draw()

		/**
		 *  This function draws an arrow showing the direction the "wind" is blowing.
		 */
		// p.drawVector = (v, loc, scale) => {
		// 	p.push()
		// 	const arrowsize = 4
		// 	p.translate(loc.x, loc.y)
		// 	p.stroke(255)
		// 	p.rotate(v.heading())
		//
		// 	const len = v.mag() * scale
		// 	p.line(0, 0, len, 0)
		// 	p.line(len, 0, len - arrowsize, +arrowsize / 2)
		// 	p.line(len, 0, len - arrowsize, -arrowsize / 2)
		// 	p.pop()
		// }
	} // Close sketch()

	return <P5Component id={name} sketch={sketch} />
}

export default Ghosty
