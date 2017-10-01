import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AllCanvases from './AllCanvases'
import Canvas from './Canvas'

// The CanvasCollection component matches one of two different routes
// depending on the full pathname
const CanvasCollection = () => (
	<Switch>
		<Route exact path="/canvas" component={AllCanvases} />
		<Route path="/canvas/:project" component={Canvas} />
	</Switch>
)

export default CanvasCollection
