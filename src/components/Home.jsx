import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
	<div>
		<h1>Welcome!</h1>
		<Link to="/canvas">Projects</Link>
	</div>
)

export default Home
