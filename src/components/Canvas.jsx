import React from 'react'
import { Link } from 'react-router-dom'

import ProjectSelector from './Projects/ProjectSelector'

const Canvas = props => {
	// const player = PlayerAPI.get(parseInt(props.match.params.number, 10))
	// if (!player) {
	// 	return <div>Sorry, but the player was not found</div>
	// }
	return (
		<div>
			<h1>{props.match.params.project}</h1>
			<Link to="/canvas">Back</Link>
			<ProjectSelector project={props.match.params.project} />
		</div>
	)
}

export default Canvas
