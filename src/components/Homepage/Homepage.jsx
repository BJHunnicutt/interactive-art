import React from 'react'
import { Link } from 'react-router-dom'

import './homepage.css'

/*
 * Homepage iterates over all of the projects and creates
 * a link to it's page.
 *
 ** To add a new p add here and in ProjectContainer
 */
const Homepage = ({ p }) => {
	const projects = [
		{ name: 'light tracker', file: 'CameraTest', img: './CameraTest.png' },
		{ name: 'ghosty', file: 'Ghosty', img: './Ghosty.png' },
		{ name: 'dots', file: 'P5Test', img: './P5Test.png' },
		{ name: 'motion lines', file: 'PixelMotion', img: './PixelMotion.png' },
		{ name: 'ThreeTest', file: 'ThreeTest' }
	]

	return (
		<div className="container-fluid mt-2">
			<div className="row justify-content-center">
				{projects.map(p => (
					// Fill this div & center the image inside
					<div className="tile-container position-relative m-2" key={p.file}>
						<Link to={`/${p.file}`}>
							<img
								className="tile-img"
								src={p.img ? p.img : 'http://fillmurray.com/g/300/300'}
								alt={`${p.name} link`}
								title={`${p.name}`}
							/>
						</Link>
						<h4 className="tile-title text-light">{p.name}</h4>
					</div>
				))}
			</div>
		</div>
	)
}

export default Homepage
