import React from 'react'
import { Link } from 'react-router-dom'

// import logo from './swift.png'
import './header.css'

const Header = () => (
	<header className="app-header bg-light p-4">
		<nav>
			<Link to="/" className="d-flex navbar-brand text-info">
				{/* <img src={logo} className="logo mr-2" alt="logo" /> */}
				<h3 className="m-0">interactive bits</h3>
			</Link>
			{/* <div className="d-flex justify-content-between">
				<a
					href="https://bjhunnicutt.github.io/"
					target="_"
					className="nav-link text-muted p-0"
				>
					<small> by jeannie hunnicutt</small>
				</a>
				<Link
					to="/"
					onMouseUp={() => window.location.reload()}
					className="text-info"
				>
					home
				</Link>
			</div> */}
		</nav>
	</header>
)

export default Header
