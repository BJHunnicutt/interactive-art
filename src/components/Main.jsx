import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import CanvasCollection from './CanvasCollection'

// The Main component renders one of the provided Routes (provided
// that one matches). Both the /canvas route will match any pathname
// that starts with /canvas. The / route will only match when the
// pathname is exactly the string "/"
const Main = () => (
	<main>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/canvas" component={CanvasCollection} />
		</Switch>
	</main>
)

export default Main