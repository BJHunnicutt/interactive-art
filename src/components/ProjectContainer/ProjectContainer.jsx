import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import P5Test from './P5Test'
import CameraTest from './CameraTest'
import PixelMotion from './PixelMotion'
import Ghosty from './Ghosty'

import './project-container.css'

/*
 ** To add a new project add here and in the Homepage
 */
class ProjectContainer extends Component {
	componentWillUnmount() {
		console.log('Unmount', this.props)
		// Doing this to turn off the camera because chrome has a bug where
		// stop() doesn't work...
		window.location.reload()
	}
	currentProject = () => {
		const { match: { params } } = this.props
		switch (params.project) {
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
	render() {
		return (
			<div>
				<span className="d-flex justify-content-center">
					{/* <h2 className="project-title mt-2">{props.match.params.project}</h2> */}
					{/* TODO: Only trigger window.location.reload() when navigating away from
						projects that use the camera, since this is just a hack to stop using
						the camera */}
				</span>
				<span className="w-100">{this.currentProject()}</span>
			</div>
		)
	}
}

export default ProjectContainer
