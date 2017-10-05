import React from 'react'

import P5Component from '../P5Component'

const CameraTest = () => {
	const name = 'camera-test'
	let videoActive = true

	const sketch = p => {
		let capture
		let w = 640,
			h = 480

		p.setup = () => {
			capture = p.getVideo(videoActive)
			p.createCanvas(w, h)
			capture.size(w, h)
			capture.hide()
		}

		p.getVideo = on => {
			return on ? p.createCapture(p.VIDEO) : null
		}

		// Trying to turn off the camera, but chrome has a bug where stop() doesn't work...
		p.mouseClicked = () => {
			p.toggleVideo()
			capture.stop()
		}

		p.toggleVideo = () => {
			videoActive = !videoActive
		}

		p.findBrightest = video => {
			let brightestValue = 0
			let brightestPosition = p.createVector(0, 0)
			let pixels = video.pixels
			let i = 0
			for (let y = 0; y < h; y++) {
				for (let x = 0; x < w; x++) {
					let r = pixels[i++]
					let g = pixels[i++]
					let b = pixels[i++]
					i++ // ignore a
					let brightness = r + g + b
					if (brightness > brightestValue) {
						brightestValue = brightness
						brightestPosition.set(x, y)
					}
				}
			}
			return brightestPosition
		}

		let lastPoint
		p.smoothPoint = (point, amt) => {
			if (!lastPoint) {
				lastPoint = point
			} else {
				lastPoint.lerp(point, 1 - amt)
			}
			return lastPoint.copy()
		}

		const trailPointsLength = 100
		let trailPoints = []
		p.drawTrail = nextPoint => {
			trailPoints.push(nextPoint)
			if (trailPoints.length > trailPointsLength) {
				trailPoints.shift()
			}
			p.beginShape()
			trailPoints.forEach(point => {
				p.vertex(point.x, point.y)
			})
			p.endShape()
		}

		p.clearTrail = () => {
			trailPoints = []
		}

		let anotherLastPoint
		p.draw = () => {
			// this acts as a background() or clear()
			p.image(capture, 0, 0, 640, 480)

			capture.loadPixels()
			if (capture.pixels.length > 0) {
				// don't forget this!
				let brightest = p.findBrightest(capture)

				// first step to try: uncomment the line below to enable smoothing
				// const smoothingAmount = p.select('#smoothingAmount').value() / 100.0
				const smoothingAmount = 50 / 100.0
				brightest = p.smoothPoint(brightest, smoothingAmount)

				// next step to try: ignore points that are too far from current point
				if (anotherLastPoint) {
					const dist = anotherLastPoint.dist(brightest)
					if (dist > 30) {
						// brightest = anotherLastPoint;
					}
				}

				const radius = 8
				p.noStroke()
				p.fill(255, 0, 0)
				p.ellipse(brightest.x, brightest.y, radius, radius)

				p.noFill()
				p.strokeWeight(4)
				p.stroke(255, 0, 0)
				p.drawTrail(brightest)

				anotherLastPoint = brightest.copy()
			}
		}

		p.closeVideo = () => {}
	} // Close sketch()

	return <P5Component id={name} sketch={sketch} />
}

export default CameraTest
