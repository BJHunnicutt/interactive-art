import React from 'react'
import { Link } from 'react-router-dom'

import P5Test from './P5Test'
import CameraTest from './CameraTest'
import PixelMotion from './PixelMotion'
import Ghosty from './Ghosty'

/*
 ** To add a new project add here and in the Homepage
 */
const ProjectContainer = ({ project }) => {
	const currentProject = () => {
		switch (project) {
			case 'CameraTest':
				return <CameraTest />
			case 'Ghosty':
				return <Ghosty />
			case 'P5Test':
				return <P5Test />
			case 'PixelMotion':
				return <PixelMotion />
			case 'ThreeTest':
				return <P5Test />
			default:
				return null
		}
	}

	return (
		<div>
			<h1>{project}</h1>
			<Link exact to="/">
				Back
			</Link>
			{currentProject()}
		</div>
	)
}

export default ProjectContainer
