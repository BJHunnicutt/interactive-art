import React from 'react'
import { Link } from 'react-router-dom'

const Canvas = props => {
	// const player = PlayerAPI.get(parseInt(props.match.params.number, 10))
	// if (!player) {
	// 	return <div>Sorry, but the player was not found</div>
	// }
	return (
		<div>
			<h1>{props.match.params.number}</h1>
			<Link to="/canvas">Back</Link>
		</div>
	)
}

export default Canvas
