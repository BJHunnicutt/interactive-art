import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import logo from './swift.png'

import Main from '../Main'
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
						<NavLink to="/canvas">Projects</NavLink>
					</nav>
				</header>
				<Main />
			</div>
		)
	}
}

export default App
