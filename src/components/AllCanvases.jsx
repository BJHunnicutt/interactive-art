import React from 'react'
import { Link } from 'react-router-dom'

import ProjectCard from './ProjectCard'

// AllCanvases iterates over all of the projects and creates
// a link to it's page.
//
// ** To add a new project add to the list below and ProjectSelector.jsx
const AllCanvases = () => (
	<div>
		<ul>
			{['P5Test', 'ThreeTest', 'CameraTest', 'PixelMotion', 'Ghosty'].map(p => (
				<li key={p}>
					<Link to={`/canvas/${p}`}>
						<ProjectCard name={`${p}-name`} />
					</Link>
				</li>
			))}
		</ul>
	</div>
)

export default AllCanvases
