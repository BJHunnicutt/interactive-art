import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import ProjectContainer from '../ProjectContainer'
import Homepage from '../Homepage'

import logo from './swift.png'
import './App.css'

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Playing with Interaction</h2>
					<nav>
						<NavLink exact to="/">
							Home
						</NavLink>
					</nav>
				</header>
				<main>
					<Switch>
						<Route exact path="/" component={Homepage} />
						<Route path="/:project" component={ProjectContainer} />
					</Switch>
				</main>
			</div>
		)
	}
}

export default App
