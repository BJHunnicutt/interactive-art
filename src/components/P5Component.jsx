import React, { Component } from 'react'
import { func, string } from 'prop-types'

import p5 from 'p5'
// import 'p5/lib/addons/p5.sound'
import 'p5/lib/addons/p5.dom'

class P5Component extends Component {
	static propTypes = {
		id: string,
		sketch: func
	}

	static defaultProps = {
		id: 'emptyP5Element'
	}

	componentDidMount() {
		this.canvas = new p5(this.props.sketch, this.p5Container)
	}

	render() {
		const { id } = this.props

		return (
			<div
				id={id}
				ref={input => {
					this.p5Container = input
				}}
				className="p5Container"
			/>
		)
	}
}

export default P5Component
