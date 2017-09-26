import React from 'react'
import { Link } from 'react-router-dom'

import ProjectCard from './ProjectCard'

// AllCanvases iterates over all of the projects and creates
// a link to it's page.
const AllCanvases = () => (
	<div>
		<ul>
			{[1, 2, 3].map(p => (
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
