import React from 'react'

import P5Test from './P5test'
import CameraTest from './CameraTest'
import PixelMotion from './PixelMotion'

const ProjectSelector = props => {
	switch (props.project) {
		case 'P5Test':
			return <P5Test />
		case 'ThreeTest':
			return <P5Test />
		case 'CameraTest':
			return <CameraTest />
		case 'PixelMotion':
			return <PixelMotion />
		default:
			return null
	}
}

export default ProjectSelector
