import React from 'react'

import P5Wrapper from '../Wrappers/P5Wrapper'

const P5Test = () => {
	const name = 'p5-test'

	const sketch = p => {
		// Constants
		const width = () => window.innerWidth
		const height = () => window.innerHeight
		let r = 255
		let g = 215
		let b = 0

		p.setup = () => {
			p.createCanvas(width(), height())

			// p.createImg("http://th07.deviantart.net/fs70/PRE/i/2011/260/3/5/dash_hooray_by_rainbowcrab-d49xk0d.png");
			//
			// img.position(190, 50);
			// img.size(200, 200);
			p.canvas.id = 'sky'
			// Only draw once
			p.noLoop()
		}

		p.draw = () => {
			p.fill(r, g, b)
			p.strokeWeight(0)
			p.ellipse(p.mouseX, p.mouseY, 80, 80)
		}

		p.mouseMoved = () => {
			r = p.random(200, 255)
			g = p.random(175, 255)
			b = p.random(0, 0)

			p.draw()
		}

		// TODO: Move this into P5Wrapper
		p.windowResized = () => {
			console.log('sketch window resize:', window.innerWidth)
			p.resizeCanvas(window.innerWidth, window.innerHeight, p.noRedraw)
			// p.background(123, 163, 176);
		}
	} // Close sketch()

	return <P5Wrapper id={name} sketch={sketch} />
}

export default P5Test
