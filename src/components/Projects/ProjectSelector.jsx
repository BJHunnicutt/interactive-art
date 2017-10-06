import React from 'react'

import P5Test from './P5test'
import CameraTest from './CameraTest'
import PixelMotion from './PixelMotion'
import Ghosty from './Ghosty'

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
		case 'Ghosty':
			return <Ghosty />
		default:
			return null
	}
}

export default ProjectSelector
