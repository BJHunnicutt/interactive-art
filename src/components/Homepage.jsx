import React from 'react'
import { Link } from 'react-router-dom'

/*
 * Homepage iterates over all of the projects and creates
 * a link to it's page.
 *
 ** To add a new project add here and in ProjectContainer
 */
const Homepage = ({ project }) => {
	const projects = [
		'CameraTest',
		'Ghosty',
		'P5Test',
		'PixelMotion',
		'ThreeTest'
	]

	return (
		<div>
			<ul className="list-unstyled">
				{projects.map(p => (
					<li key={p}>
						<Link to={`/${p}`}>
							<h3>{`${p}-name`}</h3>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Homepage
