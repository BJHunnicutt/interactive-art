import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './components/App/App'
import rootReducer from './dux/index'
import registerServiceWorker from './registerServiceWorker'

/* eslint-disable no-underscore-dangle */
const store = createStore(
	rootReducer,
	/* preloadedState, */
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
/* eslint-enable */

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
