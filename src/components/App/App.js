import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProjectContainer from '../ProjectContainer'
import Header from './Header'
import Homepage from '../Homepage'
import './app.css'

const App = () => {
	return (
		<div className="App">
			<Header />
			<main>
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/:project" component={ProjectContainer} />
				</Switch>
			</main>
		</div>
	)
}

export default App
